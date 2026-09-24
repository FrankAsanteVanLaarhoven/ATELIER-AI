/**
 * @file server.ts
 * Assessment Service HTTP API Server.
 * Exposes endpoints for session creation, recovery, autosave, and authoritative scoring.
 */

import http from 'node:http';
import { URL } from 'node:url';
import { QuestionBankStore } from './question-bank-store.ts';
import { SessionStore } from './session-store.ts';
import type { SessionConfig, OptionKey } from '../../../packages/schemas/src/index.ts';

const PORT = Number(process.env.ASSESSMENT_PORT || 8010);
const bank = new QuestionBankStore();
const sessionStore = new SessionStore(bank);

function sendJson(res: http.ServerResponse, statusCode: number, data: unknown): void {
  const payload = JSON.stringify(data);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });
  res.end(payload);
}

export function createAssessmentHttpServer(): http.Server {
  return http.createServer(async (req, res) => {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      });
      res.end();
      return;
    }

    const reqUrl = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
    const pathname = reqUrl.pathname;

    // Helper to read JSON body
    const readBody = async (): Promise<any> => {
      return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => (body += chunk));
        req.on('end', () => {
          try {
            resolve(body ? JSON.parse(body) : {});
          } catch (e) {
            reject(new Error('Invalid JSON payload'));
          }
        });
        req.on('error', reject);
      });
    };

    try {
      // 1. Health check
      if (req.method === 'GET' && pathname === '/api/assessment/health') {
        sendJson(res, 200, {
          status: 'ok',
          service: 'assessment-service',
          questionBankSize: bank.size(),
          timestamp: new Date().toISOString(),
        });
        return;
      }

      // 2. Create new session
      if (req.method === 'POST' && pathname === '/api/assessment/sessions') {
        const body = await readBody();
        const config: SessionConfig = {
          mode: body.mode || 'timed_mock',
          timeLimitMinutes: body.timeLimitMinutes || 120,
          questionCount: body.questionCount || 60,
          seed: body.seed,
          candidateId: body.candidateId || `cand_${Math.random().toString(36).substring(2, 8)}`,
          candidateName: body.candidateName || 'Architect Candidate',
        };

        const publicSession = sessionStore.createSession(config);
        sendJson(res, 201, publicSession);
        return;
      }

      // 3. Get / recover session: GET /api/assessment/sessions/:id
      const sessionMatch = pathname.match(/^\/api\/assessment\/sessions\/([^/]+)$/);
      if (req.method === 'GET' && sessionMatch) {
        const sessionId = sessionMatch[1];
        const session = sessionStore.getPublicSession(sessionId);
        if (!session) {
          sendJson(res, 404, { error: `Session ${sessionId} not found` });
          return;
        }
        sendJson(res, 200, session);
        return;
      }

      // 4. Autosave response: PATCH /api/assessment/sessions/:id/responses/:itemId
      const autosaveMatch = pathname.match(/^\/api\/assessment\/sessions\/([^/]+)\/responses\/([^/]+)$/);
      if (req.method === 'PATCH' && autosaveMatch) {
        const sessionId = autosaveMatch[1];
        const itemId = autosaveMatch[2];
        const body = await readBody();

        const result = sessionStore.saveResponse(
          sessionId,
          itemId,
          (body.selectedOptions || []) as OptionKey[],
          body.timeSpentSeconds || 0,
          body.flaggedForReview || false
        );

        sendJson(res, 200, result);
        return;
      }

      // 5. Submit session: POST /api/assessment/sessions/:id/submit
      const submitMatch = pathname.match(/^\/api\/assessment\/sessions\/([^/]+)\/submit$/);
      if (req.method === 'POST' && submitMatch) {
        const sessionId = submitMatch[1];
        const body = await readBody();

        const scoredResult = sessionStore.submitSession(
          sessionId,
          body.responses,
          body.telemetry
        );

        sendJson(res, 200, scoredResult);
        return;
      }

      sendJson(res, 404, { error: 'Route not found' });
    } catch (err: any) {
      sendJson(res, 400, { error: err.message || 'Internal server error' });
    }
  });
}

// Start standalone if executed directly
if (process.argv[1] && process.argv[1].endsWith('server.ts')) {
  const server = createAssessmentHttpServer();
  server.listen(PORT, () => {
    console.log(`⚡ Atelier Assessment Service listening on http://localhost:${PORT}`);
    console.log(`📚 Loaded ${bank.size()} protected questions from question bank`);
  });
}
