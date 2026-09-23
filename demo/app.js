// ATELIER: Claude Architect Enterprise Digital Operating System
import { 
  QUESTION_BANK, 
  AGENTS_CATALOG, 
  CASE_STUDIES, 
  SKILLS, 
  CAPSTONE_SPEC, 
  CURRICULUM_DOMAINS, 
  APPLIED_TRACKS, 
  VIDEO_MODULES 
} from './data.js';

class ClaudeArchitectPlatform {
  constructor() {
    this.currentView = 'atelier';
    this.activeVideoModule = VIDEO_MODULES[0];
    this.isPlaying = false;
    this.videoTime = 0; // seconds
    this.videoInterval = null;
    this.soundEnabled = true;
    
    // Exam state
    this.examSession = null;
    this.examTimeRemaining = 120 * 60; // 120 minutes in seconds
    this.examTimerInterval = null;
    this.currentQuestionIndex = 0;
    this.userAnswers = {}; // { questionId: ['A'] or ['A', 'B'] }
    this.flaggedQuestions = new Set();
    this.examSubmitted = false;
    
    // Learner telemetry
    this.learnerState = {
      name: 'Frank Van Laarhoven',
      role: 'Enterprise AI Architect',
      rank: 'Lead Architect',
      points: 1420,
      streak: 7,
      completedLessons: ['mod-1-cp1', 'cli-init', 'mcp-error-spec'],
      caseFailuresHandled: 3
    };

    // Terminal state
    this.termHistory = [
      { type: 'out', text: 'Claude Code Agent Harness v2.4 initialized.' },
      { type: 'out', text: 'Project root: /Users/enterprise/claude-system (CLAUDE.md detected)' },
      { type: 'prompt', text: 'Type a command below or click a quick action.' }
    ];

    this.audioCtx = null;
    this.init();
  }

  init() {
    this.bindEvents();
    this.initAudio();
    this.render();
    this.setupShortcuts();
  }

  initAudio() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    } catch (e) {
      console.warn('Web Audio not supported');
    }
  }

  playHaptic(type = 'click') {
    if (!this.soundEnabled || !this.audioCtx) return;
    try {
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      
      const now = this.audioCtx.currentTime;
      if (type === 'click') {
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.04);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === 'success') {
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(554.37, now + 0.06);
        osc.frequency.setValueAtTime(659.25, now + 0.12);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'warn') {
        osc.frequency.setValueAtTime(240, now);
        osc.frequency.linearRampToValueAtTime(180, now + 0.08);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      }
    } catch (e) {
      // Audio playback ignore error
    }
  }

  bindEvents() {
    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const view = item.dataset.view;
        if (view) {
          this.switchView(view);
          this.playHaptic('click');
        }
      });
    });

    // Theme toggle
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('theme-editorial');
        this.playHaptic('click');
      });
    }

    // Sound toggle
    const soundBtn = document.getElementById('soundToggle');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        this.soundEnabled = !this.soundEnabled;
        soundBtn.style.opacity = this.soundEnabled ? '1' : '0.4';
        this.playHaptic('click');
      });
    }

    // Command palette trigger
    const cmdTrigger = document.getElementById('cmdTrigger');
    const cmdModal = document.getElementById('cmdModal');
    if (cmdTrigger && cmdModal) {
      cmdTrigger.addEventListener('click', () => this.openCommandPalette());
      cmdModal.addEventListener('click', (e) => {
        if (e.target === cmdModal) this.closeCommandPalette();
      });
    }

    const cmdInput = document.getElementById('cmdInput');
    if (cmdInput) {
      cmdInput.addEventListener('input', (e) => this.filterCommands(e.target.value));
      cmdInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') this.closeCommandPalette();
      });
    }
  }

  setupShortcuts() {
    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        this.openCommandPalette();
        return;
      }
      if (this.currentView === 'exam-engine' && this.examSession && !this.examSubmitted) {
        if (['1', '2', '3', '4'].includes(e.key)) {
          const index = parseInt(e.key) - 1;
          const currentQ = this.examSession.items[this.currentQuestionIndex];
          const keys = Object.keys(currentQ.options);
          if (keys[index]) {
            this.toggleAnswer(currentQ.id, keys[index]);
          }
        } else if (e.key.toLowerCase() === 'j') {
          this.prevQuestion();
        } else if (e.key.toLowerCase() === 'k') {
          this.nextQuestion();
        } else if (e.key.toLowerCase() === 'f') {
          this.toggleFlagCurrent();
        }
      }
    });
  }

  switchView(viewName) {
    this.currentView = viewName;
    document.querySelectorAll('.nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.view === viewName);
    });

    const breadcrumb = document.getElementById('activeBreadcrumb');
    if (breadcrumb) {
      const titles = {
        'atelier': 'Studio Atelier / Dashboard',
        'video-masterclass': 'Veo 3 Pro Video Masterclasses',
        'curriculum': 'Curriculum Map & Domains',
        'cli-simulator': 'Claude Code CLI Simulator',
        'mcp-lab': 'MCP Inspector & Tool Playground',
        'agent-graph': 'Multi-Agent Topology Visualizer',
        'slides-studio': 'Executive Slide & Design Studio',
        'case-studies': 'Case Studies & Failure Injection',
        'exam-engine': 'Timed Mock Exam & Drills',
        'capstone': 'Capstone & Defense Studio'
      };
      breadcrumb.textContent = titles[viewName] || 'Enterprise Studio';
    }

    this.render();
  }

  openCommandPalette() {
    const modal = document.getElementById('cmdModal');
    const input = document.getElementById('cmdInput');
    if (modal && input) {
      modal.classList.add('active');
      input.value = '';
      this.filterCommands('');
      input.focus();
      this.playHaptic('click');
    }
  }

  closeCommandPalette() {
    const modal = document.getElementById('cmdModal');
    if (modal) {
      modal.classList.remove('active');
    }
  }

  filterCommands(query) {
    const list = document.getElementById('cmdList');
    if (!list) return;

    const commands = [
      { title: 'Start 60-Item Timed Mock Exam', sub: 'Domain quotas: D1(16), D2(11), D3(12), D4(12), D5(9)', action: () => { this.switchView('exam-engine'); this.startMockExam(); } },
      { title: 'Open Veo 3 Pro Masterclass (Domain 1)', sub: 'Agentic loops & subagent orchestration', action: () => { this.switchView('video-masterclass'); this.selectVideoModule('mod-1'); } },
      { title: 'Open MCP Tool & JSON-RPC Playground', sub: 'Test error taxonomy and structured contracts', action: () => { this.switchView('mcp-lab'); } },
      { title: 'Launch Claude Code CLI Sandbox', sub: 'Interactive terminal with CLAUDE.md rules', action: () => { this.switchView('cli-simulator'); } },
      { title: 'Multi-Agent Context Bloat Simulator', sub: 'Visualize coordinator token growth', action: () => { this.switchView('agent-graph'); } },
      { title: 'Executive Slide & Design Studio', sub: 'Create on-brand presentation with claim provenance', action: () => { this.switchView('slides-studio'); } },
      { title: 'Case Study 1: Regulated Support Refund Agent', sub: 'Failure injection & policy gates', action: () => { this.switchView('case-studies'); } },
      { title: 'Capstone 100-Point Rubric & Oral Defense', sub: 'Submit deliverables and defend invariants', action: () => { this.switchView('capstone'); } },
      { title: 'Toggle Warm Editorial Theme', sub: 'Switch to Keyline stone/cream palette', action: () => { document.body.classList.toggle('theme-editorial'); } }
    ];

    const q = query.toLowerCase().trim();
    const filtered = commands.filter(c => c.title.toLowerCase().includes(q) || c.sub.toLowerCase().includes(q));

    list.innerHTML = filtered.map((c, i) => `
      <div class="cmd-item" data-idx="${i}">
        <div>
          <div style="font-weight: 500; color: #fff;">${c.title}</div>
          <div style="font-size: 11px; color: var(--ink-tertiary);">${c.sub}</div>
        </div>
        <span class="kbd">↵</span>
      </div>
    `).join('');

    list.querySelectorAll('.cmd-item').forEach((item, idx) => {
      item.addEventListener('click', () => {
        filtered[idx].action();
        this.closeCommandPalette();
        this.playHaptic('click');
      });
    });
  }

  // =========================================================================
  // VIEW RENDERERS
  // =========================================================================

  render() {
    const container = document.getElementById('viewport');
    if (!container) return;

    switch (this.currentView) {
      case 'atelier':
        container.innerHTML = this.renderAtelierView();
        this.attachAtelierEvents();
        break;
      case 'video-masterclass':
        container.innerHTML = this.renderVideoMasterclassView();
        this.attachVideoEvents();
        break;
      case 'curriculum':
        container.innerHTML = this.renderCurriculumView();
        this.attachCurriculumEvents();
        break;
      case 'cli-simulator':
        container.innerHTML = this.renderCliSimulatorView();
        this.attachCliEvents();
        break;
      case 'mcp-lab':
        container.innerHTML = this.renderMcpLabView();
        this.attachMcpEvents();
        break;
      case 'agent-graph':
        container.innerHTML = this.renderAgentGraphView();
        this.attachAgentGraphEvents();
        break;
      case 'slides-studio':
        container.innerHTML = this.renderSlidesStudioView();
        this.attachSlidesEvents();
        break;
      case 'case-studies':
        container.innerHTML = this.renderCaseStudiesView();
        this.attachCaseStudyEvents();
        break;
      case 'exam-engine':
        container.innerHTML = this.renderExamEngineView();
        this.attachExamEvents();
        break;
      case 'capstone':
        container.innerHTML = this.renderCapstoneView();
        this.attachCapstoneEvents();
        break;
      default:
        container.innerHTML = `<div class="card"><h2 class="card-title">View Under Construction</h2></div>`;
    }
  }

  // 1. ATELIER HOME VIEW
  renderAtelierView() {
    return `
      <div class="editorial-hero">
        <div class="hero-kicker">Claude Certified Architect — Foundations (CCAR-F)</div>
        <h1 class="hero-headline">Specify the model.<br/>Defend the invariant.</h1>
        <p class="hero-desc">
          Atelier is the enterprise operating ground where architects, software engineers, and system leaders master 
          multi-agent loops, Model Context Protocol integration, Claude Code harnesses, and governed executive deliverables.
          Practice on 90 original scenario evaluations, controlled failure injections, and defend your 100-point capstone.
        </p>

        <div class="action-pills">
          <button class="pill-btn primary" id="btnQuickExam">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Launch 60-Item Timed Mock
          </button>
          <button class="pill-btn" id="btnQuickVideo">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
            Veo 3 Pro Masterclasses
          </button>
          <button class="pill-btn" id="btnQuickCli">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            Claude Code Sandbox
          </button>
          <button class="pill-btn" id="btnQuickMcp">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
            MCP Protocol Lab
          </button>
          <button class="pill-btn" id="btnQuickCase">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            Failure Injections
          </button>
          <button class="pill-btn" id="btnQuickCapstone">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
            100-Pt Capstone
          </button>
        </div>
      </div>

      <!-- Video Masterclass Hero Banner -->
      <div class="video-player-container" style="margin-bottom: 28px;">
        <div class="video-screen" style="aspect-ratio: 21/9; max-height: 380px;">
          <img src="assets/hero.jpg" class="video-poster-img" alt="Masterclass Hero"/>
          <div class="video-badge-pill">SOTA Enterprise Stream • Veo 3 Pro 4K HDR</div>
          <div class="video-center-play" id="btnHeroPlay">
            <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
          <div style="position: absolute; bottom: 20px; left: 24px; z-index: 4; max-width: 600px;">
            <div style="font-family: var(--font-mono); font-size: 11px; color: var(--accent-cyan); text-transform: uppercase;">Featured Masterclass</div>
            <h2 style="font-family: var(--font-serif); font-size: 28px; color: #fff; margin: 4px 0 8px;">The Governed Multi-Surface Operating System</h2>
            <p style="font-size: 13px; color: #cbd5e1;">How leading enterprises architect coordinator-subagent loops, enforce deterministic pre-tool gates, and defend production systems.</p>
          </div>
        </div>
      </div>

      <!-- Progress & Curriculum Grid -->
      <div class="progress-grid">
        <div class="card">
          <div class="card-kicker">
            <span>Certification Readiness</span>
            <span style="color: var(--accent-cyan);">68% Prepared</span>
          </div>
          <h3 class="card-title">CCAR-F Blueprint Progress</h3>
          <p class="card-body">Your diagnostic shows strong performance in Domain 3 (Claude Code) and Domain 1 (Orchestration), with key growth targets in Domain 2 (Structured Errors).</p>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: 68%;"></div>
          </div>
          <div style="margin-top: 18px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 11px; font-family: var(--font-mono); color: var(--ink-tertiary);">90 Questions Bank</span>
            <button class="card-btn" id="btnAtelierExam">Resume Drill →</button>
          </div>
        </div>

        <div class="card">
          <div class="card-kicker">
            <span>Live Case Studies</span>
            <span style="color: var(--accent-amber);">1 / 3 Injected</span>
          </div>
          <h3 class="card-title">Regulated Support Refund Agent</h3>
          <p class="card-body">A customer requests a $350 refund after payment gateway timeout. Test identity validation gates and prevent ambiguous customer account collisions.</p>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: 33%; background: linear-gradient(90deg, var(--accent-amber), var(--accent-rose));"></div>
          </div>
          <div style="margin-top: 18px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 11px; font-family: var(--font-mono); color: var(--ink-tertiary);">Fault Injection Active</span>
            <button class="card-btn" id="btnAtelierCase">Inspect Case →</button>
          </div>
        </div>

        <div class="card">
          <div class="card-kicker">
            <span>Capstone Rubric</span>
            <span style="color: var(--accent-emerald);">85/100 Target</span>
          </div>
          <h3 class="card-title">Production Capstone Defense</h3>
          <p class="card-body">10 deliverables required: architecture diagram, tool contracts, 15-case eval suite, 3 failure recovery reports, and 10-slide executive readout.</p>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: 50%; background: linear-gradient(90deg, var(--accent-emerald), var(--accent-cyan));"></div>
          </div>
          <div style="margin-top: 18px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 11px; font-family: var(--font-mono); color: var(--ink-tertiary);">Oral Defense Ready</span>
            <button class="card-btn" id="btnAtelierCapstone">Review Rubric →</button>
          </div>
        </div>
      </div>
    `;
  }

  attachAtelierEvents() {
    document.getElementById('btnQuickExam')?.addEventListener('click', () => {
      this.switchView('exam-engine');
      this.startMockExam();
    });
    document.getElementById('btnAtelierExam')?.addEventListener('click', () => {
      this.switchView('exam-engine');
      this.startMockExam();
    });
    document.getElementById('btnQuickVideo')?.addEventListener('click', () => this.switchView('video-masterclass'));
    document.getElementById('btnHeroPlay')?.addEventListener('click', () => this.switchView('video-masterclass'));
    document.getElementById('btnQuickCli')?.addEventListener('click', () => this.switchView('cli-simulator'));
    document.getElementById('btnQuickMcp')?.addEventListener('click', () => this.switchView('mcp-lab'));
    document.getElementById('btnQuickCase')?.addEventListener('click', () => this.switchView('case-studies'));
    document.getElementById('btnAtelierCase')?.addEventListener('click', () => this.switchView('case-studies'));
    document.getElementById('btnQuickCapstone')?.addEventListener('click', () => this.switchView('capstone'));
    document.getElementById('btnAtelierCapstone')?.addEventListener('click', () => this.switchView('capstone'));
  }

  // 2. VEO 3 PRO / NANO BANANA VIDEO MASTERCLASS VIEW
  renderVideoMasterclassView() {
    const mod = this.activeVideoModule;
    return `
      <div style="max-width: 1040px; margin-bottom: 24px;">
        <div class="hero-kicker">${mod.tag} • ${mod.badge}</div>
        <h1 style="font-family: var(--font-serif); font-size: 36px; margin: 4px 0 10px; color: #fff;">${mod.title}</h1>
        <p style="font-size: 14px; color: var(--ink-secondary); line-height: 1.5;">${mod.description}</p>
      </div>

      <!-- Module Selector Carousel Row -->
      <div class="module-switcher">
        ${VIDEO_MODULES.map(m => `
          <div class="module-pill ${m.id === mod.id ? 'active' : ''}" data-mod-id="${m.id}">
            <div class="module-pill-top">
              <span>${m.duration}</span>
              <span style="color: var(--accent-cyan);">${m.weight}</span>
            </div>
            <div class="module-pill-title">${m.title}</div>
          </div>
        `).join('')}
      </div>

      <!-- Cinematic Video Player -->
      <div class="video-player-container">
        <div class="video-screen">
          <img src="${mod.poster}" class="video-poster-img" id="videoPoster" alt="Poster"/>
          <canvas class="video-canvas-overlay" id="videoCanvasOverlay"></canvas>
          <div class="video-badge-pill">${mod.badge} • Synced Checkpoints</div>
          
          <div class="video-center-play" id="btnVideoPlay">
            <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24" id="playIcon">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>

          <!-- Interactive Code Checkpoint Modal -->
          <div class="video-checkpoint-modal" id="videoCheckpointModal">
            <div class="checkpoint-card">
              <div class="checkpoint-badge">Live Checkpoint Paused • Step-by-Step Architecture</div>
              <h3 class="checkpoint-title" id="checkpointTitle">Context Scoping Challenge</h3>
              <p class="checkpoint-prompt" id="checkpointPrompt">A subagent was spawned with full parent history. Edit the code below to pass only task-relevant evidence.</p>
              <div class="checkpoint-code" id="checkpointCode">// Code snippet</div>
              <div style="display: flex; gap: 10px; justify-content: flex-end;">
                <button class="pill-btn" id="btnCheckpointHint">Show Hint</button>
                <button class="pill-btn primary" id="btnCheckpointSolve">Apply Architectural Fix & Resume</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Video Control Bar -->
        <div class="video-controls">
          <div class="video-scrub-bar" id="videoScrubBar">
            <div class="video-scrub-progress" id="videoScrubProgress" style="width: 0%;"></div>
            ${mod.checkpoints.map(cp => `
              <div class="video-scrub-marker" style="left: ${(cp.time / (18 * 60)) * 100}%;" title="${cp.title}"></div>
            `).join('')}
          </div>

          <div class="video-controls-bottom">
            <div class="video-btn-group">
              <button class="video-ctrl-btn" id="btnPlayBottom">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                <span id="playBottomText">Play</span>
              </button>
              <span class="video-time-display" id="videoTimeDisplay">00:00 / ${mod.duration}</span>
            </div>

            <div class="video-btn-group">
              <span style="font-size: 11px; color: var(--ink-tertiary);">Speed:</span>
              <button class="video-ctrl-btn" id="btnSpeed">1.0x</button>
              <button class="video-ctrl-btn" id="btnFullscreen">
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Chapters & Live Transcript Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; max-width: 1040px;">
        <div class="card">
          <div class="card-kicker">Interactive Chapters</div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${mod.chapters.map(ch => `
              <div class="cmd-item chapter-row" data-sec="${ch.seconds}">
                <span style="font-family: var(--font-mono); color: var(--accent-cyan); font-size: 11px;">${ch.time}</span>
                <span style="font-size: 13px; color: var(--ink-primary);">${ch.title}</span>
                <span style="font-size: 10px; color: var(--ink-tertiary);">Jump →</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="card">
          <div class="card-kicker">Source-Grounded Video Transcript</div>
          <div style="max-height: 220px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; font-size: 13px; color: var(--ink-secondary);">
            ${mod.transcript.map(t => `
              <div>
                <span style="font-family: var(--font-mono); font-size: 11px; color: var(--accent-gold); margin-right: 6px;">[${Math.floor(t.start/60)}:${(t.start%60).toString().padStart(2, '0')}]</span>
                <span>${t.text}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  attachVideoEvents() {
    // Module selector
    document.querySelectorAll('.module-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const id = pill.dataset.modId;
        this.selectVideoModule(id);
      });
    });

    const playBtn = document.getElementById('btnVideoPlay');
    const playBottom = document.getElementById('btnPlayBottom');
    if (playBtn) playBtn.addEventListener('click', () => this.toggleVideoPlay());
    if (playBottom) playBottom.addEventListener('click', () => this.toggleVideoPlay());

    // Chapter jumping
    document.querySelectorAll('.chapter-row').forEach(row => {
      row.addEventListener('click', () => {
        const sec = parseInt(row.dataset.sec) || 0;
        this.videoTime = sec;
        this.updateVideoProgress();
        this.playHaptic('click');
      });
    });

    // Solve checkpoint
    document.getElementById('btnCheckpointSolve')?.addEventListener('click', () => {
      const modal = document.getElementById('videoCheckpointModal');
      if (modal) modal.classList.remove('active');
      this.playHaptic('success');
      this.toggleVideoPlay(true);
    });

    // Checkpoint hint
    document.getElementById('btnCheckpointHint')?.addEventListener('click', () => {
      alert('Hint: Hard invariants belong in deterministic code hooks. Pass explicit output schemas to eliminate ambiguity.');
      this.playHaptic('click');
    });

    // Canvas animation loop
    this.startCanvasVisualizer();
  }

  selectVideoModule(id) {
    const mod = VIDEO_MODULES.find(m => m.id === id);
    if (mod) {
      this.activeVideoModule = mod;
      this.videoTime = 0;
      this.isPlaying = false;
      if (this.videoInterval) clearInterval(this.videoInterval);
      this.render();
      this.playHaptic('click');
    }
  }

  toggleVideoPlay(forcePlay = null) {
    this.isPlaying = forcePlay !== null ? forcePlay : !this.isPlaying;
    const playBtn = document.getElementById('btnVideoPlay');
    const playText = document.getElementById('playBottomText');
    const icon = document.getElementById('playIcon');

    if (this.isPlaying) {
      if (playBtn) playBtn.style.opacity = '0';
      if (playText) playText.textContent = 'Pause';
      if (icon) icon.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
      this.videoInterval = setInterval(() => {
        this.videoTime += 1;
        this.updateVideoProgress();
        this.checkVideoCheckpoints();
      }, 1000);
      this.playHaptic('click');
    } else {
      if (playBtn) playBtn.style.opacity = '1';
      if (playText) playText.textContent = 'Play';
      if (icon) icon.innerHTML = '<path d="M8 5v14l11-7z"/>';
      if (this.videoInterval) clearInterval(this.videoInterval);
      this.playHaptic('click');
    }
  }

  updateVideoProgress() {
    const totalSec = 18 * 60; // normalized duration
    const pct = Math.min(100, (this.videoTime / totalSec) * 100);
    const scrub = document.getElementById('videoScrubProgress');
    const display = document.getElementById('videoTimeDisplay');
    if (scrub) scrub.style.width = `${pct}%`;
    if (display) {
      const m = Math.floor(this.videoTime / 60);
      const s = this.videoTime % 60;
      display.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')} / ${this.activeVideoModule.duration}`;
    }
  }

  checkVideoCheckpoints() {
    const cps = this.activeVideoModule.checkpoints || [];
    for (const cp of cps) {
      if (this.videoTime === cp.time) {
        this.toggleVideoPlay(false);
        this.showCheckpointModal(cp);
        break;
      }
    }
  }

  showCheckpointModal(cp) {
    const modal = document.getElementById('videoCheckpointModal');
    const title = document.getElementById('checkpointTitle');
    const prompt = document.getElementById('checkpointPrompt');
    const code = document.getElementById('checkpointCode');

    if (modal && title && prompt && code) {
      title.textContent = cp.title;
      prompt.textContent = cp.prompt;
      code.textContent = cp.code_initial;
      modal.classList.add('active');
      this.playHaptic('warn');
    }
  }

  startCanvasVisualizer() {
    const canvas = document.getElementById('videoCanvasOverlay');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let step = 0;
    const draw = () => {
      if (!document.getElementById('videoCanvasOverlay')) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (this.isPlaying) {
        // Draw subtle neural wave streams
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 10) {
          const y = (canvas.height / 2) + Math.sin((x * 0.015) + (step * 0.05)) * 25 * Math.sin(step * 0.02);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        ctx.strokeStyle = 'rgba(226, 179, 111, 0.2)';
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 12) {
          const y = (canvas.height / 2) + Math.cos((x * 0.01) + (step * 0.04)) * 35;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        step++;
      }
      requestAnimationFrame(draw);
    };
    draw();
  }

  // 3. CURRICULUM & DOMAINS VIEW
  renderCurriculumView() {
    return `
      <div style="max-width: 1040px; margin-bottom: 24px;">
        <div class="hero-kicker">Official Syllabus & Exam Blueprint Taxonomy</div>
        <h1 style="font-family: var(--font-serif); font-size: 36px; margin: 4px 0 10px; color: #fff;">Curriculum Architecture</h1>
        <p style="font-size: 14px; color: var(--ink-secondary); line-height: 1.5;">
          5 Core Exam Domains (100% CCAR-F Blueprint weighting) + 5 Applied Extended Tracks covering Chat, Cowork, Claude Code, Agent/Skill Engineering, and Executive Slide Design.
        </p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 24px; max-width: 1040px; margin-bottom: 40px;">
        ${CURRICULUM_DOMAINS.map(d => `
          <div class="card" style="padding: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <div>
                <span class="exam-tag">DOMAIN ${d.domain}</span>
                <span style="font-family: var(--font-mono); font-size: 12px; color: var(--accent-gold); margin-left: 8px;">Weight: ${d.weight}</span>
              </div>
              <span style="font-size: 11px; font-family: var(--font-mono); color: var(--ink-tertiary);">${d.tasks.length} Task Statements</span>
            </div>
            <h2 style="font-family: var(--font-serif); font-size: 26px; color: #fff; margin-bottom: 6px;">${d.title}</h2>
            <p style="font-size: 13px; color: var(--ink-secondary); margin-bottom: 18px;">${d.desc}</p>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 10px;">
              ${d.tasks.map(t => `
                <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--line-dim); padding: 12px 14px; border-radius: var(--radius-sm);">
                  <div style="font-family: var(--font-mono); font-size: 11px; color: var(--accent-cyan);">${t.id}</div>
                  <div style="font-size: 13px; font-weight: 500; color: #fff; margin: 3px 0 4px;">${t.title}</div>
                  <div style="font-size: 11px; color: var(--ink-tertiary);">${t.sub}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>

      <div style="max-width: 1040px; margin-bottom: 16px;">
        <h2 style="font-family: var(--font-serif); font-size: 28px; color: #fff; margin-bottom: 14px;">Applied Enterprise Tracks</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px;">
          ${APPLIED_TRACKS.map(tr => `
            <div class="card" style="padding: 18px;">
              <span class="exam-tag" style="background: rgba(226, 179, 111, 0.12); color: var(--accent-gold);">${tr.code}</span>
              <h3 style="font-size: 16px; font-weight: 600; color: #fff; margin: 10px 0 6px;">${tr.title}</h3>
              <p style="font-size: 12px; color: var(--ink-secondary); line-height: 1.5;">${tr.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  attachCurriculumEvents() {}

  // 4. CLAUDE CODE CLI SIMULATOR
  renderCliSimulatorView() {
    return `
      <div style="max-width: 1040px; margin-bottom: 24px;">
        <div class="hero-kicker">Interactive Terminal Sandbox</div>
        <h1 style="font-family: var(--font-serif); font-size: 36px; margin: 4px 0 10px; color: #fff;">Claude Code CLI Harness</h1>
        <p style="font-size: 14px; color: var(--ink-secondary); line-height: 1.5;">
          Experience how Claude Code executes in enterprise environments. Inspect modular <span class="kbd">CLAUDE.md</span>, 
          trigger deterministic pre-tool hooks, test Plan Mode vs Direct Execution, and run headless CI review runs.
        </p>
      </div>

      <div class="terminal-window">
        <div class="terminal-header">
          <div class="terminal-dots">
            <div class="terminal-dot dot-red"></div>
            <div class="terminal-dot dot-yellow"></div>
            <div class="terminal-dot dot-green"></div>
          </div>
          <div class="terminal-title">claude-code-session — zsh — 80x24</div>
          <div class="terminal-actions">
            <span class="terminal-badge">Deterministic Hooks: ACTIVE</span>
          </div>
        </div>

        <div class="terminal-body" id="termBody">
          ${this.termHistory.map(line => `
            <div class="term-line ${line.type === 'prompt' ? 'term-prompt' : line.type === 'cmd' ? 'term-cmd' : line.type === 'err' ? 'term-err' : line.type === 'warn' ? 'term-warn' : 'term-out'}">
              ${line.type === 'cmd' ? '$ ' : ''}${line.text}
            </div>
          `).join('')}
          <div class="term-input-row">
            <span class="term-prompt">claude-architect $</span>
            <input type="text" class="term-input" id="cliInput" placeholder="Type command (e.g. claude /plan, cat CLAUDE.md, claude config)..." autofocus/>
          </div>
        </div>

        <div class="term-quick-btns">
          <span style="font-size: 11px; font-family: var(--font-mono); color: var(--ink-tertiary); display: flex; align-items: center;">Quick Exec:</span>
          <button class="term-quick-btn" data-cmd="cat CLAUDE.md">cat CLAUDE.md</button>
          <button class="term-quick-btn" data-cmd="claude /plan 'Refactor auth to MCP'">claude /plan</button>
          <button class="term-quick-btn" data-cmd="claude --headless --ci-review">claude --ci-review</button>
          <button class="term-quick-btn" data-cmd="claude test-hook-violation">test-hook-violation</button>
          <button class="term-quick-btn" data-cmd="claude skills list">skills list</button>
          <button class="term-quick-btn" data-cmd="clear">clear</button>
        </div>
      </div>
    `;
  }

  attachCliEvents() {
    const input = document.getElementById('cliInput');
    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          this.executeCliCommand(input.value);
          input.value = '';
        }
      });
    }

    document.querySelectorAll('.term-quick-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cmd = btn.dataset.cmd;
        if (cmd) this.executeCliCommand(cmd);
      });
    });
  }

  executeCliCommand(cmd) {
    if (!cmd.trim()) return;
    this.playHaptic('click');
    this.termHistory.push({ type: 'cmd', text: cmd });

    const c = cmd.trim().toLowerCase();
    if (c === 'clear') {
      this.termHistory = [];
    } else if (c === 'cat claude.md') {
      this.termHistory.push({
        type: 'out',
        text: `# Enterprise CLAUDE.md (Root Guidelines)\n- Invariant: Never commit credentials.\n- Tool Policy: Read before Edit; always run test fixtures before commit.\n- Plan Mode: Required for multi-file changes (>3 files).\n- Modular Rules: .claude/rules/security.md, .claude/rules/testing.md`
      });
    } else if (c.includes('/plan')) {
      this.termHistory.push({
        type: 'warn',
        text: `[PLAN MODE ACTIVATED] Uncertainty: HIGH | Blast Radius: 4 modules\n1. Inspecting /mcp/contracts/auth.json\n2. Defining JSON-RPC token validation interface\n3. Verifying deterministic pre-tool gate in hooks.py\nProposal ready for human sign-off.`
      });
    } else if (c.includes('--ci-review')) {
      this.termHistory.push({
        type: 'out',
        text: `[CI NON-INTERACTIVE RUNNER]\n> Validating against JSON Schema: review_contract_v2.json\n> Findings: 0 security errors, 1 architectural suggestion (Domain 2.2)\n> Exit Code: 0 (Machine-readable payload emitted to stdout)`
      });
    } else if (c.includes('test-hook-violation')) {
      this.termHistory.push({
        type: 'err',
        text: `[AGENT SDK HOOK INTERCEPTED] Attempted unrestricted write to /etc/credentials.json\nPreToolUse Hook Policy Gate: REJECTED (Violation: Least-Privilege Rule 4.1)\nIncident logged to immutable audit ledger.`
      });
      this.playHaptic('warn');
    } else if (c.includes('skills list')) {
      this.termHistory.push({
        type: 'out',
        text: `Registered Skills (Progressive Disclosure):\n- harness-builder (v1.2)\n- slide-deck-builder (v2.0)\n- source-verifier (v1.0)\n- cowork-workflow (v1.1)\n- exam-item-author (v1.0)`
      });
    } else {
      this.termHistory.push({
        type: 'out',
        text: `Command executed: "${cmd}". Status: OK. Session state checkpointed.`
      });
    }

    this.render();
    const body = document.getElementById('termBody');
    if (body) body.scrollTop = body.scrollHeight;
  }

  // 5. MCP PLAYGROUND & INSPECTOR
  renderMcpLabView() {
    return `
      <div style="max-width: 1040px; margin-bottom: 24px;">
        <div class="hero-kicker">Domain 2 • Model Context Protocol</div>
        <h1 style="font-family: var(--font-serif); font-size: 36px; margin: 4px 0 10px; color: #fff;">MCP Tool Inspector & Error Taxonomy</h1>
        <p style="font-size: 14px; color: var(--ink-secondary); line-height: 1.5;">
          Model Context Protocol replaces ad-hoc API scraping with standardized JSON-RPC tools, resources, and prompts. 
          Test how structured error attributes (<span class="kbd">is_retryable</span>, <span class="kbd">suggested_action</span>) govern agent behavior.
        </p>
      </div>

      <div class="mcp-grid">
        <div class="code-panel">
          <div class="code-panel-head">
            <span>JSON-RPC Tool Contract Definition</span>
            <span style="color: var(--accent-cyan); font-family: var(--font-mono);">schema: refund_tool.json</span>
          </div>
          <textarea class="code-textarea" id="mcpToolSchema" spellcheck="false">{
  "name": "process_refund",
  "description": "Issues a customer refund up to policy limit. Requires verified customer_id.",
  "parameters": {
    "type": "object",
    "properties": {
      "customer_id": { "type": "string" },
      "order_id": { "type": "string" },
      "amount": { "type": "number", "maximum": 250.00 }
    },
    "required": ["customer_id", "order_id", "amount"]
  }
}</textarea>
          <div style="padding: 12px; background: rgba(0,0,0,0.5); border-top: 1px solid var(--line-dim); display: flex; justify-content: flex-end;">
            <button class="pill-btn primary" id="btnValidateMcpSchema">Validate Schema</button>
          </div>
        </div>

        <div class="code-panel">
          <div class="code-panel-head">
            <span>Structured Error Response Simulator</span>
            <span style="color: var(--accent-amber); font-family: var(--font-mono);">error_taxonomy_v1</span>
          </div>
          <textarea class="code-textarea" id="mcpErrorOutput" spellcheck="false">{
  "jsonrpc": "2.0",
  "id": "req-89102",
  "error": {
    "code": -32001,
    "message": "Gateway timeout during refund authorization",
    "data": {
      "is_retryable": true,
      "backoff_seconds": 4,
      "suggested_action": "RETRY_WITH_IDEMPOTENCY_KEY",
      "idempotency_key": "ref_90a88bf2"
    }
  }
}</textarea>
          <div style="padding: 12px; background: rgba(0,0,0,0.5); border-top: 1px solid var(--line-dim); display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 11px; color: var(--ink-tertiary);" id="mcpSimStatus">Status: Idle</span>
            <button class="pill-btn" id="btnSimulateError">Inject MCP Error</button>
          </div>
        </div>
      </div>
    `;
  }

  attachMcpEvents() {
    document.getElementById('btnValidateMcpSchema')?.addEventListener('click', () => {
      try {
        const val = JSON.parse(document.getElementById('mcpToolSchema').value);
        alert('MCP Tool Schema Validated! Conforms to Model Context Protocol specification.');
        this.playHaptic('success');
      } catch (e) {
        alert('JSON Syntax Error: ' + e.message);
        this.playHaptic('warn');
      }
    });

    document.getElementById('btnSimulateError')?.addEventListener('click', () => {
      const status = document.getElementById('mcpSimStatus');
      if (status) {
        status.textContent = 'Agent Decision: Backing off 4s & retrying with idempotency key ref_90a88bf2.';
        status.style.color = 'var(--accent-emerald)';
      }
      this.playHaptic('success');
    });
  }

  // 6. MULTI-AGENT GRAPH VISUALIZER
  renderAgentGraphView() {
    return `
      <div style="max-width: 1040px; margin-bottom: 24px;">
        <div class="hero-kicker">Domain 1 • Orchestration & Telemetry</div>
        <h1 style="font-family: var(--font-serif); font-size: 36px; margin: 4px 0 10px; color: #fff;">Multi-Agent Topology & Context Bloat Meter</h1>
        <p style="font-size: 14px; color: var(--ink-secondary); line-height: 1.5;">
          Observe how the <span class="kbd">curriculum_orchestrator</span> coordinates specialized subagents (<span class="kbd">item_author</span>, <span class="kbd">item_adversary</span>, <span class="kbd">source_verifier</span>).
          Notice how passing scoped evidence prevents token context bloat and prevents hallucination.
        </p>
      </div>

      <div class="agent-graph-container">
        <svg class="agent-svg-canvas" viewBox="0 0 900 300">
          <!-- Connectors -->
          <line x1="450" y1="50" x2="200" y2="180" stroke="rgba(56, 189, 248, 0.4)" stroke-width="2" stroke-dasharray="4"/>
          <line x1="450" y1="50" x2="450" y2="180" stroke="rgba(56, 189, 248, 0.4)" stroke-width="2" stroke-dasharray="4"/>
          <line x1="450" y1="50" x2="700" y2="180" stroke="rgba(56, 189, 248, 0.4)" stroke-width="2" stroke-dasharray="4"/>

          <!-- Coordinator Node -->
          <circle cx="450" cy="50" r="32" fill="#0e1017" stroke="var(--accent-cyan)" stroke-width="3"/>
          <text x="450" y="46" text-anchor="middle" fill="#fff" font-size="11" font-weight="600">COORDINATOR</text>
          <text x="450" y="60" text-anchor="middle" fill="var(--accent-cyan)" font-size="9" font-family="JetBrains Mono">Curriculum</text>

          <!-- Subagent 1 -->
          <circle cx="200" cy="180" r="26" fill="#0e1017" stroke="var(--accent-gold)" stroke-width="2"/>
          <text x="200" y="176" text-anchor="middle" fill="#fff" font-size="10" font-weight="600">item_author</text>
          <text x="200" y="190" text-anchor="middle" fill="var(--accent-gold)" font-size="8" font-family="JetBrains Mono">Drafts Item</text>

          <!-- Subagent 2 -->
          <circle cx="450" cy="180" r="26" fill="#0e1017" stroke="var(--accent-rose)" stroke-width="2"/>
          <text x="450" y="176" text-anchor="middle" fill="#fff" font-size="10" font-weight="600">item_adversary</text>
          <text x="450" y="190" text-anchor="middle" fill="var(--accent-rose)" font-size="8" font-family="JetBrains Mono">Stress Tests</text>

          <!-- Subagent 3 -->
          <circle cx="700" cy="180" r="26" fill="#0e1017" stroke="var(--accent-emerald)" stroke-width="2"/>
          <text x="700" y="176" text-anchor="middle" fill="#fff" font-size="10" font-weight="600">source_verifier</text>
          <text x="700" y="190" text-anchor="middle" fill="var(--accent-emerald)" font-size="8" font-family="JetBrains Mono">Docs Check</text>
        </svg>

        <div class="graph-telemetry">
          <div class="stat-box">
            <div class="stat-label">Coordinator Context</div>
            <div class="stat-value" style="color: var(--accent-cyan);">4,120 tok</div>
          </div>
          <div class="stat-box">
            <div class="stat-label">Scoped Subagent Window</div>
            <div class="stat-value" style="color: var(--accent-emerald);">840 tok</div>
          </div>
          <div class="stat-box">
            <div class="stat-label">Token Savings</div>
            <div class="stat-value" style="color: var(--accent-gold);">79.6%</div>
          </div>
          <div class="stat-box">
            <div class="stat-label">Reasoning Accuracy</div>
            <div class="stat-value" style="color: #fff;">99.4%</div>
          </div>
        </div>
      </div>
    `;
  }

  attachAgentGraphEvents() {}

  // 7. SLIDES & DESIGN STUDIO
  renderSlidesStudioView() {
    return `
      <div style="max-width: 1040px; margin-bottom: 24px;">
        <div class="hero-kicker">Track E • Executive Presentations</div>
        <h1 style="font-family: var(--font-serif); font-size: 36px; margin: 4px 0 10px; color: #fff;">Claude Slides & Design Studio</h1>
        <p style="font-size: 14px; color: var(--ink-secondary); line-height: 1.5;">
          Transform verified data synthesis into on-brand executive presentations with strict claim-to-source footnotes and zero hallucinated metrics.
        </p>
      </div>

      <div class="slide-studio-grid">
        <div class="code-panel">
          <div class="code-panel-head">
            <span>Storyboard Markdown Definition</span>
            <span style="font-family: var(--font-mono); color: var(--accent-cyan);">deck_spec.md</span>
          </div>
          <textarea class="code-textarea" id="slideMarkdown" spellcheck="false"># SLIDE 1: Executive Architecture Readout
## TITLE: Multi-Agent Support Automation Architecture
## AUDIENCE: Chief Technology Officer & Operations Committee

- Problem: High customer support wait times with strict refund governance rules.
- System Design: Coordinator-Subagent architecture with Agent SDK deterministic hooks.
- Provenance: 100% of claims verified against Q3 Stripe API ledger [SR-2026-09].
- Measurable Result: First-contact resolution improved by 38% while maintaining zero unverified refunds.</textarea>
          <div style="padding: 12px; background: rgba(0,0,0,0.5); border-top: 1px solid var(--line-dim); display: flex; justify-content: flex-end;">
            <button class="pill-btn primary" id="btnRenderSlide">Update Slide Preview</button>
          </div>
        </div>

        <div class="slide-preview-frame" id="slidePreviewFrame">
          <div>
            <div style="font-size: 10px; font-family: var(--font-mono); color: var(--accent-gold); text-transform: uppercase; margin-bottom: 6px;">BOARD OF DIRECTORS READOUT</div>
            <h2 class="slide-preview-title" id="slidePrevTitle">Multi-Agent Support Automation Architecture</h2>
          </div>
          <div class="slide-preview-body" id="slidePrevBody">
            <p style="margin-bottom: 10px;">• Problem: High customer support wait times with strict refund governance rules.</p>
            <p style="margin-bottom: 10px;">• System Design: Coordinator-Subagent architecture with Agent SDK deterministic hooks.</p>
            <p style="margin-bottom: 10px;">• Measurable Result: First-contact resolution improved by 38% with 0 unverified refunds.</p>
          </div>
          <div class="slide-preview-footer">
            <span>Source: Q3 Stripe API Ledger [SR-2026-09]</span>
            <span>Slide 1 of 8 • Governed Deck</span>
          </div>
        </div>
      </div>
    `;
  }

  attachSlidesEvents() {
    document.getElementById('btnRenderSlide')?.addEventListener('click', () => {
      const text = document.getElementById('slideMarkdown').value;
      const titleMatch = text.match(/## TITLE:\s*(.*)/);
      if (titleMatch) {
        document.getElementById('slidePrevTitle').textContent = titleMatch[1];
      }
      this.playHaptic('success');
    });
  }

  // 8. CASE STUDIES & FAILURE INJECTION
  renderCaseStudiesView() {
    return `
      <div style="max-width: 1040px; margin-bottom: 24px;">
        <div class="hero-kicker">Applied Architectural Scenarios</div>
        <h1 style="font-family: var(--font-serif); font-size: 36px; margin: 4px 0 10px; color: #fff;">Failure-Injection & Telemetry Labs</h1>
        <p style="font-size: 14px; color: var(--ink-secondary); line-height: 1.5;">
          Real systems fail in messy, non-deterministic ways. Practice identifying and mitigating edge cases, 
          recovering from payment timeouts, and resolving identity collisions.
        </p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 20px; max-width: 1040px;">
        <div class="card">
          <div class="card-kicker">
            <span>CASE STUDY 1</span>
            <span style="color: var(--accent-amber);">Regulated Support Refund Agent</span>
          </div>
          <h2 class="card-title">Customer Support Resolution & Idempotency</h2>
          <p class="card-body">
            A customer requests a $240 refund. The payment gateway tool authorizes the charge but the network socket closes before returning. 
            Does your agent blindly re-execute the charge or trigger an idempotent compensation check?
          </p>
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <button class="pill-btn primary" id="btnInjectTimeout">Inject Gateway Timeout</button>
            <button class="pill-btn" id="btnInjectAmbiguity">Inject Customer Name Ambiguity</button>
            <button class="pill-btn" id="btnInjectHumanReq">Inject Explicit Human Handoff</button>
          </div>
          <div id="caseStudyLog" style="margin-top: 14px; padding: 12px; background: #060709; border-radius: var(--radius-sm); font-family: var(--font-mono); font-size: 12px; color: var(--accent-cyan); min-height: 48px;">
            System status: Nominal. Ready for failure injection.
          </div>
        </div>

        <div class="card">
          <div class="card-kicker">
            <span>CASE STUDY 2</span>
            <span style="color: var(--accent-cyan);">Enterprise Code Delivery Harness</span>
          </div>
          <h2 class="card-title">Monorepo Context Compaction & Path Scoping</h2>
          <p class="card-body">
            A developer subagent traverses the root <span class="kbd">node_modules/</span> directory, blowing through 128k context tokens in 2 seconds.
            Enforce path-exclusion hooks and scratch manifest state.
          </p>
        </div>

        <div class="card">
          <div class="card-kicker">
            <span>CASE STUDY 3</span>
            <span style="color: var(--accent-gold);">Executive Operations & Cowork</span>
          </div>
          <h2 class="card-title">Conflicting Financial Data Synthesis</h2>
          <p class="card-body">
            Salesforce CRM reports $4.2M Q3 ARR while QuickBooks reports $3.8M cash collections due to accrual timing.
            Ensure Claude surfaces the cutoff discrepancy rather than averaging the figures.
          </p>
        </div>
      </div>
    `;
  }

  attachCaseStudyEvents() {
    const log = document.getElementById('caseStudyLog');
    document.getElementById('btnInjectTimeout')?.addEventListener('click', () => {
      if (log) {
        log.textContent = `[FAULT INJECTED] Stripe API Gateway ETIMEDOUT after auth. Agent checked idempotent request key -> Status: PENDING_CONFIRMATION. No duplicate refund created. Invariant PRESERVED.`;
        log.style.color = 'var(--accent-emerald)';
      }
      this.playHaptic('success');
    });

    document.getElementById('btnInjectAmbiguity')?.addEventListener('click', () => {
      if (log) {
        log.textContent = `[FAULT INJECTED] Query "John Smith" matched 2 active accounts. Agent halted auto-action and returned clarifying question: "Please provide account email or last 4 of card."`;
        log.style.color = 'var(--accent-cyan)';
      }
      this.playHaptic('warn');
    });

    document.getElementById('btnInjectHumanReq')?.addEventListener('click', () => {
      if (log) {
        log.textContent = `[FAULT INJECTED] User said "Let me talk to a person". Agent bypassed auto-resolution loop and routed session to Tier 2 support queue with case history ledger.`;
        log.style.color = 'var(--accent-gold)';
      }
      this.playHaptic('success');
    });
  }

  // 9. EXAM ENGINE (60-Item Timed Mock & Drills)
  renderExamEngineView() {
    if (!this.examSession) {
      return `
        <div style="max-width: 900px; margin: 40px auto; text-align: center;">
          <div class="hero-kicker" style="justify-content: center;">Claude Certified Architect — Foundations</div>
          <h1 style="font-family: var(--font-serif); font-size: 44px; color: #fff; margin-bottom: 14px;">Timed Practice Examination</h1>
          <p style="font-size: 15px; color: var(--ink-secondary); max-width: 640px; margin: 0 auto 28px; line-height: 1.6;">
            60 scenario-based questions aligned to the official CCAR-F blueprint quotas. 
            Time limit: 120 minutes. Explanations and domain heatmaps are revealed upon submission.
          </p>

          <div class="card" style="max-width: 500px; margin: 0 auto 28px; text-align: left;">
            <div class="card-kicker">Exam Blueprint Composition</div>
            <div style="display: flex; flex-direction: column; gap: 8px; font-size: 13px;">
              <div style="display: flex; justify-content: space-between;"><span>Domain 1: Agentic Orchestration</span><span style="font-family: var(--font-mono); color: var(--accent-cyan);">16 questions (27%)</span></div>
              <div style="display: flex; justify-content: space-between;"><span>Domain 2: Tool Design & MCP</span><span style="font-family: var(--font-mono); color: var(--accent-cyan);">11 questions (18%)</span></div>
              <div style="display: flex; justify-content: space-between;"><span>Domain 3: Claude Code Configuration</span><span style="font-family: var(--font-mono); color: var(--accent-cyan);">12 questions (20%)</span></div>
              <div style="display: flex; justify-content: space-between;"><span>Domain 4: Prompt Engineering & Output</span><span style="font-family: var(--font-mono); color: var(--accent-cyan);">12 questions (20%)</span></div>
              <div style="display: flex; justify-content: space-between;"><span>Domain 5: Context & Reliability</span><span style="font-family: var(--font-mono); color: var(--accent-cyan);">9 questions (15%)</span></div>
            </div>
          </div>

          <button class="pill-btn primary" id="btnBeginExam" style="font-size: 15px; padding: 12px 28px; margin: 0 auto;">
            Begin 60-Question Mock Exam (120:00)
          </button>
        </div>
      `;
    }

    if (this.examSubmitted) {
      return this.renderExamReport();
    }

    const q = this.examSession.items[this.currentQuestionIndex];
    const isFlagged = this.flaggedQuestions.has(q.id);
    const answers = this.userAnswers[q.id] || [];

    const minutes = Math.floor(this.examTimeRemaining / 60);
    const seconds = this.examTimeRemaining % 60;
    const timeStr = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return `
      <div class="exam-layout">
        <div class="exam-main">
          <div class="exam-meta-row">
            <div>
              <span class="exam-tag">DOMAIN ${q.domain} • TASK ${q.task}</span>
              <span style="margin-left: 10px; font-size: 12px; color: var(--ink-secondary); font-family: var(--font-mono);">${q.task_title}</span>
            </div>
            <span class="exam-scenario-badge">Scenario: ${q.scenario_title}</span>
          </div>

          <div style="font-size: 11px; font-family: var(--font-mono); color: var(--ink-tertiary); margin-bottom: 8px;">
            Question ${this.currentQuestionIndex + 1} of ${this.examSession.items.length} • ${q.type === 'multiple' ? `SELECT ${q.select_n}` : 'SINGLE CHOICE'}
          </div>

          <h2 class="exam-stem">${q.stem}</h2>

          <div class="exam-options-list">
            ${Object.entries(q.options).map(([letter, text]) => {
              const isSelected = answers.includes(letter);
              return `
                <div class="exam-option-card ${isSelected ? 'selected' : ''}" data-letter="${letter}">
                  <div class="option-letter">${letter}</div>
                  <div class="option-text">${text}</div>
                </div>
              `;
            }).join('')}
          </div>

          <div class="exam-nav-bar">
            <button class="pill-btn" id="btnPrevQ" ${this.currentQuestionIndex === 0 ? 'disabled' : ''}>← Previous (J)</button>
            <div style="display: flex; gap: 8px;">
              <button class="pill-btn" id="btnFlagQ" style="${isFlagged ? 'border-color: var(--accent-amber); color: var(--accent-amber);' : ''}">
                ${isFlagged ? '★ Flagged' : '☆ Flag (F)'}
              </button>
            </div>
            <button class="pill-btn primary" id="btnNextQ">
              ${this.currentQuestionIndex === this.examSession.items.length - 1 ? 'Review Exam →' : 'Next (K) →'}
            </button>
          </div>
        </div>

        <aside class="exam-side">
          <div class="timer-box">
            <div class="timer-label">Time Remaining</div>
            <div class="timer-value" id="examTimerVal">${timeStr}</div>
          </div>

          <div style="font-size: 11px; font-family: var(--font-mono); color: var(--ink-tertiary); margin-bottom: 8px; text-transform: uppercase;">
            Question Navigator
          </div>
          <div class="q-grid">
            ${this.examSession.items.map((item, idx) => {
              const answered = (this.userAnswers[item.id] || []).length > 0;
              const flagged = this.flaggedQuestions.has(item.id);
              const current = idx === this.currentQuestionIndex;
              return `
                <div class="q-cell ${current ? 'current' : ''} ${answered ? 'answered' : ''} ${flagged ? 'flagged' : ''}" data-idx="${idx}">
                  ${idx + 1}
                </div>
              `;
            }).join('')}
          </div>

          <button class="pill-btn primary" id="btnSubmitExam" style="margin-top: auto; width: 100%; justify-content: center;">
            Submit Examination
          </button>
        </aside>
      </div>
    `;
  }

  attachExamEvents() {
    document.getElementById('btnBeginExam')?.addEventListener('click', () => {
      this.startMockExam();
    });

    document.querySelectorAll('.exam-option-card').forEach(card => {
      card.addEventListener('click', () => {
        const letter = card.dataset.letter;
        const currentQ = this.examSession.items[this.currentQuestionIndex];
        this.toggleAnswer(currentQ.id, letter);
      });
    });

    document.getElementById('btnPrevQ')?.addEventListener('click', () => this.prevQuestion());
    document.getElementById('btnNextQ')?.addEventListener('click', () => this.nextQuestion());
    document.getElementById('btnFlagQ')?.addEventListener('click', () => this.toggleFlagCurrent());
    document.getElementById('btnSubmitExam')?.addEventListener('click', () => this.submitExam());

    document.querySelectorAll('.q-cell').forEach(cell => {
      cell.addEventListener('click', () => {
        const idx = parseInt(cell.dataset.idx);
        this.currentQuestionIndex = idx;
        this.render();
        this.playHaptic('click');
      });
    });
  }

  startMockExam() {
    // Generate 60-question mock using blueprint quotas: D1: 16, D2: 11, D3: 12, D4: 12, D5: 9
    const quotas = { 1: 16, 2: 11, 3: 12, 4: 12, 5: 9 };
    const chosen = [];
    for (const [domain, count] of Object.entries(quotas)) {
      const pool = QUESTION_BANK.filter(q => q.domain === parseInt(domain));
      // Shuffle pool
      const shuffled = [...pool].sort(() => 0.5 - Math.random());
      chosen.push(...shuffled.slice(0, count));
    }
    // Shuffle chosen 60
    chosen.sort(() => 0.5 - Math.random());

    this.examSession = { items: chosen };
    this.currentQuestionIndex = 0;
    this.userAnswers = {};
    this.flaggedQuestions = new Set();
    this.examSubmitted = false;
    this.examTimeRemaining = 120 * 60;

    if (this.examTimerInterval) clearInterval(this.examTimerInterval);
    this.examTimerInterval = setInterval(() => {
      if (this.examTimeRemaining > 0) {
        this.examTimeRemaining--;
        const val = document.getElementById('examTimerVal');
        if (val) {
          const m = Math.floor(this.examTimeRemaining / 60);
          const s = this.examTimeRemaining % 60;
          val.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        }
      } else {
        this.submitExam();
      }
    }, 1000);

    this.render();
    this.playHaptic('success');
  }

  toggleAnswer(qId, letter) {
    const q = this.examSession.items.find(x => x.id === qId);
    if (!q) return;

    if (q.type === 'single') {
      this.userAnswers[qId] = [letter];
    } else {
      const current = this.userAnswers[qId] || [];
      if (current.includes(letter)) {
        this.userAnswers[qId] = current.filter(x => x !== letter);
      } else {
        if (current.length < q.select_n) {
          this.userAnswers[qId] = [...current, letter];
        } else {
          this.userAnswers[qId] = [...current.slice(1), letter];
        }
      }
    }
    this.playHaptic('click');
    this.render();
  }

  prevQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.render();
      this.playHaptic('click');
    }
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.examSession.items.length - 1) {
      this.currentQuestionIndex++;
      this.render();
      this.playHaptic('click');
    }
  }

  toggleFlagCurrent() {
    const currentQ = this.examSession.items[this.currentQuestionIndex];
    if (this.flaggedQuestions.has(currentQ.id)) {
      this.flaggedQuestions.delete(currentQ.id);
    } else {
      this.flaggedQuestions.add(currentQ.id);
    }
    this.render();
    this.playHaptic('click');
  }

  submitExam() {
    if (this.examTimerInterval) clearInterval(this.examTimerInterval);
    this.examSubmitted = true;
    this.render();
    this.playHaptic('success');
  }

  renderExamReport() {
    // Calculate domain scores
    let totalCorrect = 0;
    const domainScores = { 1: { c: 0, t: 0 }, 2: { c: 0, t: 0 }, 3: { c: 0, t: 0 }, 4: { c: 0, t: 0 }, 5: { c: 0, t: 0 } };

    this.examSession.items.forEach(q => {
      domainScores[q.domain].t++;
      const user = (this.userAnswers[q.id] || []).sort().join(',');
      const correct = q.correct.sort().join(',');
      if (user === correct) {
        totalCorrect++;
        domainScores[q.domain].c++;
      }
    });

    const percent = Math.round((totalCorrect / this.examSession.items.length) * 100);
    const passed = percent >= 72; // standard benchmark

    return `
      <div class="report-card">
        <div class="score-hero-row">
          <div>
            <div class="hero-kicker">Diagnostic Assessment Report</div>
            <h1 style="font-family: var(--font-serif); font-size: 38px; color: #fff;">
              ${passed ? 'Examination Passed' : 'Remediation Required'}
            </h1>
            <p style="font-size: 13px; color: var(--ink-secondary);">
              Completed ${this.examSession.items.length} items in ${120 - Math.floor(this.examTimeRemaining / 60)} minutes.
            </p>
          </div>
          <div style="text-align: right;">
            <div class="score-big ${passed ? 'score-pass' : 'score-fail'}">${percent}%</div>
            <div style="font-size: 12px; color: var(--ink-tertiary);">${totalCorrect} / ${this.examSession.items.length} Correct</div>
          </div>
        </div>

        <h3 style="font-family: var(--font-serif); font-size: 20px; color: #fff; margin-bottom: 16px;">Domain Competency Breakdown</h3>
        <div class="domain-bars-list">
          ${[1, 2, 3, 4, 5].map(d => {
            const sc = domainScores[d];
            const p = sc.t > 0 ? Math.round((sc.c / sc.t) * 100) : 0;
            const names = {
              1: 'Domain 1: Agentic Architecture & Orchestration (27%)',
              2: 'Domain 2: Tool Design & MCP Integration (18%)',
              3: 'Domain 3: Claude Code Configuration & Workflows (20%)',
              4: 'Domain 4: Prompt Engineering & Structured Output (20%)',
              5: 'Domain 5: Context Management & Reliability (15%)'
            };
            return `
              <div class="domain-bar-row">
                <div class="domain-bar-label">
                  <span style="color: #fff; font-weight: 500;">${names[d]}</span>
                  <span style="font-family: var(--font-mono); color: ${p >= 70 ? 'var(--accent-emerald)' : 'var(--accent-rose)'};">${p}% (${sc.c}/${sc.t})</span>
                </div>
                <div class="progress-bar-container">
                  <div class="progress-bar-fill" style="width: ${p}%; background: ${p >= 70 ? 'var(--accent-emerald)' : 'var(--accent-rose)'};"></div>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <div style="margin-top: 32px; display: flex; gap: 12px;">
          <button class="pill-btn primary" id="btnRetakeExam">Take Another Mock Exam</button>
          <button class="pill-btn" id="btnInspectQuestions">Review Answer Rationales</button>
        </div>
      </div>
    `;
  }

  // 10. CAPSTONE & ORAL DEFENSE STUDIO
  renderCapstoneView() {
    return `
      <div style="max-width: 1040px; margin-bottom: 24px;">
        <div class="hero-kicker">Culminating Assessment</div>
        <h1 style="font-family: var(--font-serif); font-size: 36px; margin: 4px 0 10px; color: #fff;">Governed Multi-Surface Operating System</h1>
        <p style="font-size: 14px; color: var(--ink-secondary); line-height: 1.5;">
          The Capstone tests whether you can build a production Claude system from customer brief to executive presentation.
          Self-score your deliverables against the 100-point rubric, simulate the faculty oral defense, and generate your certificate.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; max-width: 1040px; margin-bottom: 32px;">
        <div class="card">
          <div class="card-kicker">10 Deliverables Checklist</div>
          <div style="display: flex; flex-direction: column; gap: 10px; font-size: 13px;">
            <label style="display: flex; align-items: center; gap: 8px; color: #fff;"><input type="checkbox" checked/> 1. Problem statement & success criteria</label>
            <label style="display: flex; align-items: center; gap: 8px; color: #fff;"><input type="checkbox" checked/> 2. Architecture & trust-boundary diagram</label>
            <label style="display: flex; align-items: center; gap: 8px; color: #fff;"><input type="checkbox" checked/> 3. Tool/MCP contracts & permission matrix</label>
            <label style="display: flex; align-items: center; gap: 8px; color: #fff;"><input type="checkbox" checked/> 4. Agent/skill/harness configuration</label>
            <label style="display: flex; align-items: center; gap: 8px; color: #fff;"><input type="checkbox" checked/> 5. Working demonstration trace</label>
            <label style="display: flex; align-items: center; gap: 8px; color: #fff;"><input type="checkbox" checked/> 6. 15-case evaluation suite with negative tests</label>
            <label style="display: flex; align-items: center; gap: 8px; color: #fff;"><input type="checkbox" checked/> 7. Failure-recovery report for 3 injected faults</label>
            <label style="display: flex; align-items: center; gap: 8px; color: #fff;"><input type="checkbox" checked/> 8. Immutable provenance ledger</label>
            <label style="display: flex; align-items: center; gap: 8px; color: #fff;"><input type="checkbox" checked/> 9. 1-page executive decision memo</label>
            <label style="display: flex; align-items: center; gap: 8px; color: #fff;"><input type="checkbox" checked/> 10. 10-slide final executive presentation</label>
          </div>
        </div>

        <div class="card">
          <div class="card-kicker">100-Point Scoring Rubric</div>
          <div style="display: flex; flex-direction: column; gap: 8px; font-size: 12px;">
            <div style="display: flex; justify-content: space-between;"><span>Architecture & Decomposition</span><span style="font-family: var(--font-mono); color: var(--accent-gold);">15 / 15 pts</span></div>
            <div style="display: flex; justify-content: space-between;"><span>Tool/MCP Design & Least Privilege</span><span style="font-family: var(--font-mono); color: var(--accent-gold);">10 / 10 pts</span></div>
            <div style="display: flex; justify-content: space-between;"><span>Claude Code / Agent SDK</span><span style="font-family: var(--font-mono); color: var(--accent-gold);">10 / 10 pts</span></div>
            <div style="display: flex; justify-content: space-between;"><span>Skills, Hooks & Harness Quality</span><span style="font-family: var(--font-mono); color: var(--accent-gold);">10 / 10 pts</span></div>
            <div style="display: flex; justify-content: space-between;"><span>Context, Provenance & Reliability</span><span style="font-family: var(--font-mono); color: var(--accent-gold);">15 / 15 pts</span></div>
            <div style="display: flex; justify-content: space-between;"><span>Evaluation Suite & Regression</span><span style="font-family: var(--font-mono); color: var(--accent-gold);">15 / 15 pts</span></div>
            <div style="display: flex; justify-content: space-between;"><span>Human Oversight & Governance</span><span style="font-family: var(--font-mono); color: var(--accent-gold);">10 / 10 pts</span></div>
            <div style="display: flex; justify-content: space-between;"><span>Deliverable Quality & Traceability</span><span style="font-family: var(--font-mono); color: var(--accent-gold);">5 / 5 pts</span></div>
            <div style="display: flex; justify-content: space-between;"><span>Slide Narrative & Design</span><span style="font-family: var(--font-mono); color: var(--accent-gold);">5 / 5 pts</span></div>
            <div style="display: flex; justify-content: space-between;"><span>Demonstration & Defense</span><span style="font-family: var(--font-mono); color: var(--accent-gold);">5 / 5 pts</span></div>
          </div>
          <div style="margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--line-dim); display: flex; justify-content: space-between; font-weight: 600;">
            <span>Total Score</span>
            <span style="color: var(--accent-emerald); font-family: var(--font-mono);">90 / 100 (Band 1: Production Ready)</span>
          </div>
        </div>
      </div>

      <!-- Oral Defense Simulator -->
      <div class="card" style="max-width: 1040px; margin-bottom: 32px;">
        <div class="card-kicker">Oral Defense Simulator</div>
        <h3 class="card-title">Adversarial Faculty Defense</h3>
        <p class="card-body">Faculty Question: <em>"Which invariant in your capstone is enforced in deterministic code rather than via prompt text, and what failure does that prevent?"</em></p>
        <div style="background: rgba(0,0,0,0.4); border: 1px solid var(--line-dim); border-radius: var(--radius-sm); padding: 14px; font-size: 13px; color: #cbd5e1; margin-bottom: 14px;">
          <strong>Candidate Defense:</strong> "The refund monetary ceiling ($250.00) is enforced programmatically inside the PreToolUse Agent SDK hook. Relying on prompt instructions allows catastrophic edge-case bypass under prompt injection or high token pressure. A hard code invariant guarantees 0 unverified refunds regardless of probabilistic drift."
        </div>
        <button class="pill-btn primary" id="btnIssueCert">Verify Defense & Issue Certificate</button>
      </div>

      <div id="certContainer"></div>
    `;
  }

  attachCapstoneEvents() {
    document.getElementById('btnIssueCert')?.addEventListener('click', () => {
      const container = document.getElementById('certContainer');
      if (container) {
        container.innerHTML = `
          <div class="cert-card">
            <div class="cert-watermark">CLAUDE ARCHITECT ACADEMY</div>
            <div class="cert-title">Certificate of Architectural Competence</div>
            <p style="font-size: 14px; color: var(--ink-secondary);">This is to certify that</p>
            <div class="cert-recipient">${this.learnerState.name}</div>
            <p style="font-size: 14px; color: var(--ink-secondary); max-width: 520px; margin: 0 auto;">
              has successfully architected, implemented, evaluated, and defended a production-ready 
              Governed Multi-Surface Claude Operating System aligned to the CCAR-F Blueprint.
            </p>
            <div class="cert-id">CREDENTIAL ID: CCAR-F-2026-0923-88B9 • VERIFIED ON-CHAIN</div>
          </div>
        `;
        container.scrollIntoView({ behavior: 'smooth' });
        this.playHaptic('success');
      }
    });
  }
}

// Instantiate on load
window.addEventListener('DOMContentLoaded', () => {
  window.claudePlatform = new ClaudeArchitectPlatform();
});
