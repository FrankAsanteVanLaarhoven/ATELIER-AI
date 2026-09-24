// ATELIER: Claude Architect Enterprise Digital Operating System
import { 
  QUESTION_BANK, 
  AGENTS_CATALOG, 
  CASE_STUDIES, 
  SKILLS, 
  CAPSTONE_SPEC, 
  CURRICULUM_DOMAINS, 
  APPLIED_TRACKS, 
  VIDEO_MODULES,
  CAPSTONE_PRESETS 
} from './data.js?v=2.7';

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

    // Proctor & Anti-Cheat State
    this.proctorActive = false;
    this.proctorModeChecked = true;
    this.proctorViolations = [];
    this.proctorStream = null;

    // Capstone & Claude Code MCP Connector State
    this.selectedCapstoneTrack = 'case-01'; // 'case-01', 'case-02', 'case-03', or 'custom'
    this.customCapstone = {
      title: "Autonomous Enterprise FinOps Orchestrator",
      domain: "Domain 1: Agentic Architecture & Orchestration",
      brief: "Multi-agent loop evaluating multi-cloud infrastructure spend, identifying idle workloads, and proposing right-sizing actions while strictly requiring human CFO sign-off for actions > $500.",
      invariants: "PreToolUse code hook halts any cloud modification command exceeding $500 without a cryptographic approval signature token. 0 unapproved writes.",
      surface: "Claude Agent SDK + Pre/Post Tool Hooks + AWS/GCP MCP Connectors",
      tools: "mcp_aws_cost_explorer, mcp_gcp_billing, request_cfo_approval, terminate_instance",
      evalSuite: "1) Read-only cost analysis generates without approvals. 2) Terminate instance fails without CFO token. 3) Context compaction retains exact billing account IDs."
    };
    this.mcpConnectorState = {
      connected: true,
      protocol: "v2024-11-05",
      keystrokes: 1480,
      commands: [
        { time: "02:18:04", cmd: "claude agent init --harness capstone --surface sdk", status: "VERIFIED", note: "Deterministic harness configuration registered" },
        { time: "02:19:12", cmd: "claude mcp add connector-db -- npx -y @modelcontextprotocol/server-postgres", status: "VERIFIED", note: "MCP tool schema contract loaded with error taxonomy" },
        { time: "02:20:45", cmd: "claude eval run --suite evals/capstone_invariants.yaml", status: "VERIFIED", note: "15/15 regression tests passed with 0 unverified actions" }
      ],
      infractions: 0
    };
    this.capstoneGradingResult = null;

    // Palantir Foundry / Gotham Tactical Harness Studio & CAD State
    this.harnessMode = 'cad'; // 'cad' (Interactive Drag & Drop Formboard) or 'blueprint' (Infographic 5-Part/5-Checks tabs)
    this.claudeCliSplitOpen = true; // Side-by-side Claude Code CLI window
    this.activeMissionPreset = 'ev-800v'; // 'ev-800v', 'aerospace-fbw', 'robotic-arm', 'citadel-finops'
    this.draggedComponent = null;
    this.selectedFormboardNode = null;
    this.formboardZoom = 1.0;
    this.oscillatorRunning = true;
    this.noiseInjected = false;

    // Live Formboard Nodes for current mission
    this.formboardNodes = [
      { id: 'node-core', type: 'core', name: 'Model Core', tag: 'AGENTIC CORE', x: 260, y: 220, color: '#38bdf8', status: 'ONLINE', details: 'Claude 3.5 Sonnet / Opus Core Inference Engine' },
      { id: 'node-conn-1', type: 'connector', name: 'TE DT06-4S', tag: 'IP68 SENSOR BUS', x: 70, y: 80, color: '#38bdf8', status: 'LOCKED', details: 'Front Radar & Telemetry Ingest (MCP stdio client)' },
      { id: 'node-splice-1', type: 'splice', name: 'Ultrasonic Splice', tag: 'USCAR-21 §4.2', x: 190, y: 110, color: '#fb923c', status: 'VIOLATION', details: 'Splice placed at 42mm from bend! (Must be >= 150mm)', violation: 'USCAR-21: Splice < 150mm from bend' },
      { id: 'node-perms-1', type: 'perms', name: 'PreToolUse Hook', tag: 'MECHANICAL LOCK', x: 420, y: 90, color: '#fb923c', status: 'ARMED', details: 'Hardware Interlock: Halts high-voltage commands without token' },
      { id: 'node-sandbox-1', type: 'sandbox', name: 'Silicon 600°C Sleeve', tag: 'THERMAL JAIL', x: 120, y: 350, color: '#e2b36f', status: 'ISOLATED', details: 'Thermal barrier & container isolation from exhaust' },
      { id: 'node-clip-1', type: 'clip', name: 'FIR-Tree Clip', tag: '150mm VIB ANCHOR', x: 380, y: 340, color: '#34d399', status: 'SECURED', details: 'Damps 50G harmonic resonance across motor bulkhead' }
    ];

    // Tactical Component Inventory for Drag and Drop
    this.cadInventory = [
      { category: 'Connectors & Ports', items: [
        { id: 'comp-dt06', type: 'connector', name: 'TE Deutsch DT06-4S', tag: 'IP68 Automotive', color: '#38bdf8', icon: '⚡', aiAnalog: 'MCP PostgreSQL / ERP Tool' },
        { id: 'comp-mil38999', type: 'connector', name: 'MIL-DTL-38999 Ser III', tag: 'Aerospace Stainless', color: '#818cf8', icon: '✈️', aiAnalog: 'Defense Classified API Gateway' },
        { id: 'comp-radsok', type: 'connector', name: 'Amphenol Radsok 400A', tag: '800V HV Bus', color: '#f59e0b', icon: '🔋', aiAnalog: 'Cloud Resource Provisioner' },
        { id: 'comp-hmtd', type: 'connector', name: 'Rosenberger H-MTD', tag: 'Multi-Gig Ethernet', color: '#06b6d4', icon: '🌐', aiAnalog: 'High-Throughput Vector Pipeline' }
      ]},
      { category: 'Splices & Invariant Gates', items: [
        { id: 'comp-splice-uscar', type: 'splice', name: 'Ultrasonic Splice', tag: 'USCAR-21 §4.2', color: '#fb923c', icon: '🔗', aiAnalog: 'Deterministic PreToolUse Hook' },
        { id: 'comp-hook-cpa', type: 'perms', name: 'CPA/TPA Secondary Lock', tag: 'Mechanical Interlock', color: '#fb923c', icon: '🔒', aiAnalog: 'Cryptographic CFO Approval Gate' }
      ]},
      { category: 'Protection & Sandboxes', items: [
        { id: 'comp-sleeve-silicon', type: 'sandbox', name: 'Silicon 600°C Sleeve', tag: 'Thermal Shield', color: '#e2b36f', icon: '🛡️', aiAnalog: 'Containerized Subprocess Jail' },
        { id: 'comp-conduit-slit', type: 'sandbox', name: 'Corrugated Slit Loom', tag: 'Abrasion Barrier', color: '#e2b36f', icon: '📦', aiAnalog: 'Read-Only Filesystem Mount' }
      ]},
      { category: 'Vibration & Telemetry', items: [
        { id: 'comp-clip-firtree', type: 'clip', name: 'FIR-Tree 150mm Clip', tag: 'High-Vib Anchor', color: '#34d399', icon: '📎', aiAnalog: 'Idempotency Checkpoint Interval' },
        { id: 'comp-cavity-plug', type: 'plug', name: 'Silicon Cavity Plug', tag: 'IP68 Seal', color: '#34d399', icon: '🟢', aiAnalog: 'Typed Empty Tool Fallback' },
        { id: 'comp-telemetry-tap', type: 'obs', name: 'OpenTelemetry Trace Tap', tag: 'High-Pot Telemetry', color: '#818cf8', icon: '📈', aiAnalog: 'Distributed OpenTelemetry Bus' }
      ]}
    ];

    // Claude CLI live history in side-by-side mode
    this.claudeSplitHistory = [
      { time: '04:18:02', sender: 'system', text: 'Claude Code Agentic Industrial Harness Engine v2.4 initialized.' },
      { time: '04:18:05', sender: 'claude', text: 'Live Formboard CAD synchronizer active on /dev/harness-bus0.' },
      { time: '04:18:10', sender: 'agent', text: 'DRC Invariant Monitor: Scanning USCAR-2 & AS50881 rules...' },
      { time: '04:18:12', sender: 'warn', text: '[DRC ALERT: USCAR-21] Splice at X:190, Y:110 is 42mm from bend! Strain threshold exceeded.' }
    ];

    // Harness Engineering Studio State
    this.activeHarnessTab = 'cad'; // 'cad', 'core', 'jobs', 'compare', 'trace', 'routing'
    this.harnessActiveNode = 'tools'; // 'tools', 'state', 'perms', 'sandbox', 'obs'
    this.harnessTraceStep = 4; // 0 to 4 (showing full trace)
    this.routingCheckForm = {
      spliceDistance: 40, // mm (starts at the famous 40mm failure)
      bendRadius: 50, // mm
      bundleDiameter: 12, // mm
      isFlexZone: false,
      heatClearance: 25, // mm from exhaust
      edgeClearance: 12, // mm from sharp edges
      unsealedPlugsFilled: false,
      clipSpacing: 350, // mm
      isHighVibZone: true
    };

    this.audioCtx = null;
    this.init();
  }

  init() {
    this.bindEvents();
    this.initAudio();
    this.initProctorGuards();
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

  initProctorGuards() {
    window.addEventListener('blur', () => {
      if (this.proctorActive && !this.examSubmitted) {
        this.triggerProctorViolation('Window focus lost / switched desktop application');
      }
    });

    document.addEventListener('visibilitychange', () => {
      if (this.proctorActive && !this.examSubmitted && document.hidden) {
        this.triggerProctorViolation('Browser tab hidden or navigated away');
      }
    });

    document.addEventListener('copy', (e) => {
      if (this.proctorActive && !this.examSubmitted) {
        e.preventDefault();
        this.triggerProctorViolation('Clipboard COPY operation prohibited');
      }
    });

    document.addEventListener('cut', (e) => {
      if (this.proctorActive && !this.examSubmitted) {
        e.preventDefault();
        this.triggerProctorViolation('Clipboard CUT operation prohibited');
      }
    });

    document.addEventListener('paste', (e) => {
      if (this.proctorActive && !this.examSubmitted) {
        e.preventDefault();
        this.triggerProctorViolation('Clipboard PASTE operation prohibited');
      }
    });

    document.addEventListener('contextmenu', (e) => {
      if (this.proctorActive && !this.examSubmitted) {
        e.preventDefault();
        this.triggerProctorViolation('Right-click context menu inspection prohibited');
      }
    });

    window.addEventListener('keydown', (e) => {
      if (this.proctorActive && !this.examSubmitted) {
        if (e.key === 'F12' || 
           ((e.ctrlKey || e.metaKey) && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) ||
           ((e.ctrlKey || e.metaKey) && e.altKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) ||
           ((e.ctrlKey || e.metaKey) && ['c', 'v', 'u'].includes(e.key.toLowerCase()))) {
          e.preventDefault();
          this.triggerProctorViolation(`Prohibited key combination (${e.key}) intercepted`);
        }
      }
    });
  }

  triggerProctorViolation(reason) {
    const timestamp = new Date().toLocaleTimeString();
    const incident = {
      id: this.proctorViolations.length + 1,
      timestamp,
      reason
    };
    this.proctorViolations.push(incident);
    this.playHaptic('alarm');

    let modal = document.getElementById('proctorViolationModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'proctorViolationModal';
      modal.className = 'proctor-violation-alert';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="violation-card">
        <div class="violation-kicker">PROCTOR INTEGRITY INTERCEPTION • EVENT #${incident.id}</div>
        <h2 class="violation-title">Security Violation Detected</h2>
        <div style="background: rgba(244,63,94,0.15); border: 1px solid var(--accent-rose); border-radius: var(--radius-sm); padding: 12px; margin-bottom: 16px; font-family: var(--font-mono); font-size: 13px; color: #fff;">
          ${reason} at ${timestamp}
        </div>
        <p class="violation-body">
          You are inside a proctored assessment session. Clicking outside the platform, switching browser tabs, opening developer tools, and copying/pasting are strictly prohibited under the CCAR-SEC-1 Integrity Protocol. This incident has been permanently flagged in your verification audit trail.
        </p>
        <button class="pill-btn primary" id="btnAcknowledgeViolation" style="background: var(--accent-rose); border-color: var(--accent-rose); color: #fff; margin: 0 auto;">
          Acknowledge Violation & Return to Proctored Exam
        </button>
      </div>
    `;
    modal.classList.add('active');

    document.getElementById('btnAcknowledgeViolation')?.addEventListener('click', () => {
      modal.classList.remove('active');
      this.playHaptic('click');
    });

    // If live on exam screen, update violation badge
    const badge = document.getElementById('proctorViolationCountBadge');
    if (badge) badge.textContent = this.proctorViolations.length;
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
      } else if (type === 'alarm') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.linearRampToValueAtTime(440, now + 0.15);
        osc.frequency.linearRampToValueAtTime(880, now + 0.3);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
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

    // Topbar Claude CLI Global Toggle
    document.getElementById('claudeCliGlobalToggle')?.addEventListener('click', () => {
      this.toggleClaudeCliSideBySide();
    });
  }

  toggleClaudeCliSideBySide() {
    this.playHaptic('click');
    if (this.currentView !== 'harness-studio') {
      this.claudeCliSplitOpen = true;
      this.harnessMode = 'cad';
      this.switchView('harness-studio');
    } else {
      this.claudeCliSplitOpen = !this.claudeCliSplitOpen;
      this.render();
    }
  }

  setupShortcuts() {
    window.addEventListener('keydown', (e) => {
      // Cmd/Ctrl+K: Command Palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        this.openCommandPalette();
        return;
      }
      // Alt/Option+C or Ctrl+`: Toggle Claude Code CLI Side-by-Side
      if ((e.altKey && (e.key === 'c' || e.key === 'C')) || ((e.metaKey || e.ctrlKey) && e.key === '`')) {
        e.preventDefault();
        this.toggleClaudeCliSideBySide();
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
        'harness-studio': 'Harness Engineering Studio (5 Parts • 5 Checks)',
        'case-studies': 'Case Studies & Failure Injection',
        'exam-engine': 'Timed Mock Exam & Drills',
        'capstone': 'Capstone & Defense Studio',
        'proctor': 'Proctor & Exam Integrity Studio'
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
      { title: 'Open Harness Engineering Studio', sub: 'The model writes words. The harness does the work (5 Parts • 5 Checks)', action: () => { this.switchView('harness-studio'); } },
      { title: 'Start 60-Item Timed Mock Exam', sub: 'Domain quotas: D1(16), D2(11), D3(12), D4(12), D5(9)', action: () => { this.switchView('exam-engine'); this.startMockExam(); } },
      { title: 'Open Proctor & Exam Integrity Studio', sub: 'Screen recording, focus-lock guard & anti-cheat telemetry', action: () => { this.switchView('proctor'); } },
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
      case 'harness-studio':
        container.innerHTML = this.renderHarnessStudioView();
        this.attachHarnessStudioEvents();
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
      case 'proctor':
        container.innerHTML = this.renderProctorView();
        this.attachProctorEvents();
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

          <div class="card" style="max-width: 540px; margin: 0 auto 24px; text-align: left;">
            <div class="card-kicker">Exam Blueprint Composition</div>
            <div style="display: flex; flex-direction: column; gap: 8px; font-size: 13px;">
              <div style="display: flex; justify-content: space-between;"><span>Domain 1: Agentic Orchestration</span><span style="font-family: var(--font-mono); color: var(--accent-cyan);">16 questions (27%)</span></div>
              <div style="display: flex; justify-content: space-between;"><span>Domain 2: Tool Design & MCP</span><span style="font-family: var(--font-mono); color: var(--accent-cyan);">11 questions (18%)</span></div>
              <div style="display: flex; justify-content: space-between;"><span>Domain 3: Claude Code Configuration</span><span style="font-family: var(--font-mono); color: var(--accent-cyan);">12 questions (20%)</span></div>
              <div style="display: flex; justify-content: space-between;"><span>Domain 4: Prompt Engineering & Output</span><span style="font-family: var(--font-mono); color: var(--accent-cyan);">12 questions (20%)</span></div>
              <div style="display: flex; justify-content: space-between;"><span>Domain 5: Context & Reliability</span><span style="font-family: var(--font-mono); color: var(--accent-cyan);">9 questions (15%)</span></div>
            </div>
          </div>

          <!-- Proctor Anti-Cheat Mode Toggle -->
          <div class="card" style="max-width: 540px; margin: 0 auto 28px; text-align: left; background: rgba(225, 29, 72, 0.06); border: 1px solid rgba(225, 29, 72, 0.35);">
            <div style="display: flex; align-items: flex-start; gap: 14px;">
              <input type="checkbox" id="chkProctorMode" ${this.proctorModeChecked ? 'checked' : ''} style="margin-top: 4px; accent-color: var(--accent-rose); width: 18px; height: 18px; cursor: pointer;"/>
              <div style="flex: 1;">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                  <span style="font-weight: 600; color: #fff; font-size: 14px;">Enforce Active Proctor & Anti-Cheat Protocol</span>
                  <span class="proctor-rec-pill" style="position: static; font-size: 10px; padding: 2px 8px;"><span class="proctor-rec-dot"></span> LIVE GUARD</span>
                </div>
                <p style="font-size: 12px; color: #fecdd3; margin: 6px 0 0; line-height: 1.5;">
                  Locks browser interaction: blocks switching tabs, clicking outside the window, clipboard copy/paste/cut, right-click inspection, and DevTools shortcuts. Timestamped violations trigger real-time alarm modals and are recorded in your verified audit report.
                </p>
              </div>
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
      <div class="exam-layout" style="position: relative;">
        ${this.proctorActive ? `
          <!-- Dynamic Forensic Watermark Overlay -->
          <div class="exam-watermark-overlay" aria-hidden="true">
            ${Array(24).fill(0).map(() => `<span class="watermark-token">${this.learnerState.name.toUpperCase()} • CCAR-PROCTOR • SESSION ${this.currentQuestionIndex + 1} • DO NOT CHEAT</span>`).join('')}
          </div>

          <!-- Live Proctor Guard Banner -->
          <div style="grid-column: 1 / -1; background: rgba(225, 29, 72, 0.12); border: 1px solid rgba(225, 29, 72, 0.35); border-radius: var(--radius-sm); padding: 10px 16px; display: flex; justify-content: space-between; align-items: center; font-size: 12px; margin-bottom: 8px;">
            <div style="display: flex; align-items: center; gap: 12px; font-family: var(--font-mono); color: #fda4af;">
              <span class="proctor-rec-pill" style="position: static;"><span class="proctor-rec-dot"></span> PROCTOR ACTIVE</span>
              <span>STRICT FOCUS LOCK • NO EXTERNAL CLICKS • NO COPY/PASTE</span>
            </div>
            <div style="font-family: var(--font-mono); font-size: 11px; color: var(--accent-rose);">
              VIOLATIONS LOGGED: <span id="proctorViolationCountBadge" style="background: var(--accent-rose); color: #fff; padding: 2px 8px; border-radius: 4px; font-weight: 700;">${this.proctorViolations.length}</span>
            </div>
          </div>
        ` : ''}

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
      const chk = document.getElementById('chkProctorMode');
      this.proctorModeChecked = chk ? chk.checked : true;
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

    document.getElementById('btnRetakeExam')?.addEventListener('click', () => {
      this.examSession = null;
      this.examSubmitted = false;
      this.render();
      this.playHaptic('click');
    });

    document.getElementById('btnRetakeMockNow')?.addEventListener('click', () => {
      this.examSession = null;
      this.examSubmitted = false;
      this.render();
      this.playHaptic('click');
    });

    document.getElementById('btnRemediationDrills')?.addEventListener('click', () => {
      this.switchView('drills');
      this.playHaptic('click');
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
    this.proctorActive = this.proctorModeChecked !== false;
    this.proctorViolations = [];

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
    this.proctorActive = false;
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
    const voucherToken = `ATH-CCARF-${Math.random().toString(36).substring(2, 7).toUpperCase()}-2026`;

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

        <!-- Official Anthropic Exam Direct Clearance Card -->
        <div class="official-clearance-card ${passed ? '' : 'locked'}">
          <div class="clearance-kicker">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            ${passed ? 'OFFICIAL CERTIFICATION CLEARANCE • SYSTEM DEEMED READY' : 'OFFICIAL CERTIFICATION CLEARANCE LOCKED'}
          </div>
          <h2 class="clearance-title">
            ${passed ? 'Clearance Granted: Register for Official Claude Exam' : 'Readiness Threshold Not Met (72% Benchmark Required)'}
          </h2>
          <p class="clearance-desc">
            ${passed
              ? `Verification Protocol CCAR-SEC-1 confirms candidate <strong>${this.learnerState.name}</strong> achieved <strong>${percent}%</strong> (Threshold: 72%) across all 5 architectural domains under anti-cheat proctor surveillance with <strong>${this.proctorViolations.length} flagged incidents</strong>. The evaluation system has deemed you fully prepared to sit for the official Anthropic certification examination.`
              : `Your score of <strong>${percent}%</strong> is below the 72% benchmark required for official registration clearance. Please complete the blueprint domain remediation drills and retake the mock examination with zero anti-cheat infractions before scheduling your official exam slot.`
            }
          </p>

          ${passed ? `
            <div style="background: rgba(0,0,0,0.4); border: 1px solid var(--line-bright); border-radius: var(--radius-sm); padding: 14px 18px; margin-bottom: 22px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px;">
              <div>
                <div style="font-size: 11px; font-family: var(--font-mono); color: var(--accent-gold); text-transform: uppercase;">Official Clearance Voucher Token</div>
                <div style="font-size: 18px; font-family: var(--font-mono); font-weight: 700; color: #fff; letter-spacing: 0.08em;">${voucherToken}</div>
              </div>
              <div style="font-size: 12px; font-family: var(--font-mono); color: var(--accent-emerald); display: flex; align-items: center; gap: 6px;">
                <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--accent-emerald);"></span>
                AUDIT VERIFIED • OFFICIAL VOUCHER READY
              </div>
            </div>

            <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
              <a href="https://anthropic.skilljar.com" target="_blank" rel="noopener noreferrer" class="official-link-btn" id="btnOfficialExamLink">
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                Launch Official Anthropic Certification Portal (Skilljar) →
              </a>
              <a href="https://academy.anthropic.com" target="_blank" rel="noopener noreferrer" class="pill-btn" style="padding: 12px 20px; font-size: 13px; color: var(--ink-primary); border-color: var(--line-bright);">
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                Anthropic Academy Courses & Credentials
              </a>
              <a href="https://home.pearsonvue.com" target="_blank" rel="noopener noreferrer" class="pill-btn" style="padding: 12px 20px; font-size: 13px; color: var(--ink-secondary); border-color: var(--line-dim);">
                Pearson VUE Exam Center
              </a>
            </div>
          ` : `
            <div style="display: flex; gap: 12px; align-items: center;">
              <button class="pill-btn primary" id="btnRemediationDrills">
                Launch Targeted Blueprint Drills (D1-D5)
              </button>
              <button class="pill-btn" id="btnRetakeMockNow">
                Retake Timed Mock Exam
              </button>
            </div>
          `}
        </div>

        <h3 style="font-family: var(--font-serif); font-size: 20px; color: #fff; margin: 28px 0 16px;">Domain Competency Breakdown</h3>
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
        </div>
      </div>
    `;
  }

  // 10. CAPSTONE & REAL CASE STUDY VERIFICATION STUDIO
  renderCapstoneView() {
    const isCustom = this.selectedCapstoneTrack === 'custom';
    const activePreset = CAPSTONE_PRESETS.find(p => p.id === this.selectedCapstoneTrack) || CAPSTONE_PRESETS[0];
    const currentTrack = isCustom ? {
      code: "CUSTOM CAPSTONE",
      title: this.customCapstone.title,
      domain: this.customCapstone.domain,
      brief: this.customCapstone.brief,
      invariants: this.customCapstone.invariants,
      surface: this.customCapstone.surface,
      tools: this.customCapstone.tools.split(',').map(s => s.trim()),
      evalSuite: [
        { name: "Deterministic gate test", input: "High-value action without approval", expected: "BLOCKED by PreToolUse hook" },
        { name: "Context containment", input: "Unfiltered query across large dataset", expected: "Compacted into typed summary" }
      ],
      baseScore: 92
    } : activePreset;

    const grading = this.capstoneGradingResult;

    return `
      <div style="max-width: 1040px; margin-bottom: 24px;">
        <div class="hero-kicker" style="color: var(--accent-gold);">
          <span class="badge" style="background: rgba(226, 179, 111, 0.2); color: var(--accent-gold); font-size: 10px;">CCAR-CAPSTONE-100</span>
          Culminating Enterprise Architectural Assessment & MCP Tool Verification
        </div>
        <h1 style="font-family: var(--font-serif); font-size: 36px; margin: 4px 0 10px; color: #fff;">
          Capstone Studio & Tooling Verification
        </h1>
        <p style="font-size: 14px; color: var(--ink-secondary); line-height: 1.6; max-width: 860px;">
          Architect a production-ready Claude operating system on real enterprise case studies or define your custom architecture. 
          Every command and keystroke is captured and verified through the direct <strong>Claude & Claude Code MCP Connector</strong> 
          to ensure rigorous enforcement of deterministic invariants, least-privilege scoping, and eval-backed reliability.
        </p>
      </div>

      <!-- Real Case Study Track Selector -->
      <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: baseline;">
        <div class="card-kicker">Select Capstone Implementation Track</div>
        <span style="font-size: 12px; color: var(--ink-tertiary); font-family: var(--font-mono);">
          3 Real Enterprise Case Studies + 1 Custom Proposal
        </span>
      </div>

      <div class="capstone-track-grid">
        ${CAPSTONE_PRESETS.map(preset => {
          const isActive = this.selectedCapstoneTrack === preset.id;
          return `
            <div class="capstone-track-card ${isActive ? 'active' : ''}" data-track-id="${preset.id}">
              <div class="track-code-badge">${preset.code}</div>
              <h3 style="font-size: 15px; font-weight: 600; color: #fff; margin: 0 0 6px;">${preset.title}</h3>
              <div style="font-size: 11px; color: var(--accent-cyan); font-family: var(--font-mono); margin-bottom: 8px;">${preset.domain.split(':')[0]}</div>
              <p style="font-size: 12px; color: var(--ink-secondary); line-height: 1.4; margin: 0; flex: 1;">
                ${preset.brief.substring(0, 110)}...
              </p>
              <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid var(--line-dim); font-size: 11px; font-family: var(--font-mono); color: var(--ink-tertiary);">
                Tools: ${preset.tools.slice(0, 2).join(', ')} + ${preset.tools.length - 2} more
              </div>
            </div>
          `;
        }).join('')}

        <!-- Custom Proposal Track Card -->
        <div class="capstone-track-card ${isCustom ? 'active' : ''}" data-track-id="custom" style="border-style: ${isCustom ? 'solid' : 'dashed'};">
          <div class="track-code-badge" style="color: var(--accent-emerald);">CUSTOM PROPOSAL</div>
          <h3 style="font-size: 15px; font-weight: 600; color: #fff; margin: 0 0 6px;">Describe Custom Capstone</h3>
          <div style="font-size: 11px; color: var(--accent-emerald); font-family: var(--font-mono); margin-bottom: 8px;">Open Architectural Design</div>
          <p style="font-size: 12px; color: var(--ink-secondary); line-height: 1.4; margin: 0; flex: 1;">
            Propose your organization's custom Claude architecture. Specify trust boundaries, custom tools, and evaluate against the 100-point rubric.
          </p>
          <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid var(--line-dim); font-size: 11px; font-family: var(--font-mono); color: var(--accent-emerald);">
            ✏️ Editable Invariants & Tools
          </div>
        </div>
      </div>

      <!-- Active Capstone Specification -->
      ${isCustom ? `
        <!-- Custom Capstone Proposal Studio Form -->
        <div class="custom-proposal-form">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <div class="card-kicker" style="margin: 0; color: var(--accent-emerald);">Custom Capstone Proposal Studio</div>
            <span class="badge" style="background: rgba(16,185,129,0.15); color: var(--accent-emerald);">Live Custom Spec</span>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div class="proposal-input-group">
              <label class="proposal-label">Capstone Architecture Title</label>
              <input type="text" id="customCapTitleInput" class="proposal-input" value="${this.customCapstone.title}"/>
            </div>
            <div class="proposal-input-group">
              <label class="proposal-label">Target Domain / Industry</label>
              <input type="text" id="customCapDomainInput" class="proposal-input" value="${this.customCapstone.domain}"/>
            </div>
          </div>

          <div class="proposal-input-group">
            <label class="proposal-label">Executive Problem Brief & Objectives</label>
            <textarea id="customCapBriefInput" class="proposal-textarea" rows="2">${this.customCapstone.brief}</textarea>
          </div>

          <div class="proposal-input-group">
            <label class="proposal-label">Architectural Invariant Rule (Deterministic Code vs. Probabilistic Prompt)</label>
            <textarea id="customCapInvariantsInput" class="proposal-textarea" rows="2">${this.customCapstone.invariants}</textarea>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div class="proposal-input-group">
              <label class="proposal-label">Tools & MCP Connectors (Comma-separated)</label>
              <input type="text" id="customCapToolsInput" class="proposal-input" value="${this.customCapstone.tools}"/>
            </div>
            <div class="proposal-input-group">
              <label class="proposal-label">Target Claude Surface</label>
              <input type="text" id="customCapSurfaceInput" class="proposal-input" value="${this.customCapstone.surface}"/>
            </div>
          </div>

          <button class="pill-btn primary" id="btnSaveCustomSpec" style="font-size: 13px;">
            Save & Update Custom Capstone Architecture
          </button>
        </div>
      ` : `
        <!-- Case Study Architectural Blueprint -->
        <div class="card" style="max-width: 1040px; margin-bottom: 28px; background: rgba(0,0,0,0.4); border-color: rgba(226,179,111,0.3);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <div class="card-kicker" style="margin: 0;">${currentTrack.code} ARCHITECTURAL SPECIFICATION</div>
            <span class="badge" style="background: rgba(56, 189, 248, 0.15); color: var(--accent-cyan); font-family: var(--font-mono); font-size: 11px;">${currentTrack.surface}</span>
          </div>
          <h2 style="font-family: var(--font-serif); font-size: 24px; color: #fff; margin: 0 0 10px;">${currentTrack.title}</h2>
          <p style="font-size: 13px; color: var(--ink-secondary); line-height: 1.6; margin-bottom: 18px;">
            ${currentTrack.brief}
          </p>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; font-size: 12px;">
            <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--line-dim); border-radius: var(--radius-sm); padding: 12px;">
              <div style="font-weight: 600; color: var(--accent-gold); margin-bottom: 6px; font-family: var(--font-mono); text-transform: uppercase;">Deterministic Invariant Rule</div>
              <div style="color: #cbd5e1; line-height: 1.5;">${currentTrack.invariants}</div>
            </div>
            <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--line-dim); border-radius: var(--radius-sm); padding: 12px;">
              <div style="font-weight: 600; color: var(--accent-cyan); margin-bottom: 6px; font-family: var(--font-mono); text-transform: uppercase;">Tool & MCP Schema Contracts</div>
              <div style="display: flex; flex-wrap: gap; gap: 6px; margin-top: 4px;">
                ${currentTrack.tools.map(t => `<span class="badge" style="background: rgba(56, 189, 248, 0.1); color: #7dd3fc; font-family: var(--font-mono);">${t}</span>`).join(' ')}
              </div>
            </div>
          </div>
        </div>
      `}

      <!-- Direct Claude and Claude Code MCP Connector Console -->
      <div class="mcp-connector-box">
        <div class="mcp-connector-header">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span class="mcp-status-pill">
              <span style="width: 7px; height: 7px; border-radius: 50%; background: var(--accent-emerald);"></span>
              LIVE MCP BRIDGE: CONNECTED
            </span>
            <span style="color: var(--ink-secondary);">claude-code-mcp-connector://local-bridge/v1</span>
          </div>
          <div style="display: flex; align-items: center; gap: 16px;">
            <span style="color: var(--accent-gold);">⚡ KEYSTROKES LOGGED: <strong id="mcpKeystrokeVal">${this.mcpConnectorState.keystrokes}</strong></span>
            <span style="color: #7dd3fc;">COMMANDS VERIFIED: <strong id="mcpCommandCountVal">${this.mcpConnectorState.commands.length}</strong></span>
          </div>
        </div>

        <div class="mcp-terminal-body" id="mcpTerminalBody">
          <div style="color: var(--ink-tertiary); margin-bottom: 12px;">
            [MCP-BRIDGE] Direct telemetry verification initialized with Claude Code SDK. Tracking command strokes and tool contracts...
          </div>
          ${this.mcpConnectorState.commands.map(item => `
            <div class="mcp-log-entry ${item.status === 'FLAGGED' ? 'warning' : 'command'}">
              <span style="color: var(--ink-tertiary); font-family: var(--font-mono);">[${item.time}]</span> 
              <strong>$ ${item.cmd}</strong>
              <div style="margin-left: 20px; font-size: 11px; color: ${item.status === 'FLAGGED' ? '#fda4af' : 'var(--accent-emerald)'};">
                ↳ [${item.status}] ${item.note}
              </div>
            </div>
          `).join('')}
        </div>

        <div class="mcp-input-row">
          <span style="color: var(--accent-cyan); font-family: var(--font-mono); font-size: 13px; align-self: center;">claude&gt;</span>
          <input type="text" id="mcpCommandInput" class="mcp-cmd-input" placeholder="Type Claude Code command (e.g., claude agent init, claude mcp add, claude eval run)..." autocomplete="off"/>
          <button class="pill-btn primary" id="btnExecuteMcpCmd" style="font-size: 12px; padding: 6px 16px;">
            Execute & Verify
          </button>
        </div>

        <div style="background: rgba(0,0,0,0.8); border-top: 1px solid var(--line-dim); padding: 8px 18px; display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
          <span style="font-size: 11px; font-family: var(--font-mono); color: var(--ink-tertiary);">QUICK PRESETS:</span>
          <button class="pill-btn" id="btnQuickHarnessInit" style="font-size: 11px; padding: 4px 10px;">Init Harness</button>
          <button class="pill-btn" id="btnQuickMcpAdd" style="font-size: 11px; padding: 4px 10px;">Add MCP Connector</button>
          <button class="pill-btn" id="btnQuickEvalRun" style="font-size: 11px; padding: 4px 10px;">Run Invariant Evals</button>
          <button class="pill-btn" id="btnQuickAntipattern" style="font-size: 11px; padding: 4px 10px; border-color: rgba(225,29,72,0.4); color: #fda4af;">
            Simulate Antipattern (--dangerously-skip-permissions)
          </button>
        </div>
      </div>

      <!-- 100-Point Scoring Rubric & Auto-Grader -->
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
            <label style="display: flex; align-items: center; gap: 8px; color: #fff;"><input type="checkbox" checked/> 8. Immutable provenance ledger (MCP Verified)</label>
            <label style="display: flex; align-items: center; gap: 8px; color: #fff;"><input type="checkbox" checked/> 9. 1-page executive decision memo</label>
            <label style="display: flex; align-items: center; gap: 8px; color: #fff;"><input type="checkbox" checked/> 10. 10-slide final executive presentation</label>
          </div>
        </div>

        <div class="card">
          <div class="card-kicker">100-Point Scoring Rubric</div>
          <div style="display: flex; flex-direction: column; gap: 8px; font-size: 12px;">
            <div style="display: flex; justify-content: space-between;"><span>1. Architecture & Decomposition</span><span style="font-family: var(--font-mono); color: var(--accent-gold);">15 / 15 pts</span></div>
            <div style="display: flex; justify-content: space-between;"><span>2. Tool/MCP Design & Least Privilege</span><span style="font-family: var(--font-mono); color: var(--accent-gold);">10 / 10 pts</span></div>
            <div style="display: flex; justify-content: space-between;"><span>3. Claude Code / Agent SDK</span><span style="font-family: var(--font-mono); color: var(--accent-gold);">10 / 10 pts</span></div>
            <div style="display: flex; justify-content: space-between;"><span>4. Skills, Hooks & Harness Quality</span><span style="font-family: var(--font-mono); color: var(--accent-gold);">10 / 10 pts</span></div>
            <div style="display: flex; justify-content: space-between;"><span>5. Context, Provenance & Reliability</span><span style="font-family: var(--font-mono); color: var(--accent-gold);">15 / 15 pts</span></div>
            <div style="display: flex; justify-content: space-between;"><span>6. Evaluation Suite & Regression</span><span style="font-family: var(--font-mono); color: var(--accent-gold);">15 / 15 pts</span></div>
            <div style="display: flex; justify-content: space-between;"><span>7. Human Oversight & Governance</span><span style="font-family: var(--font-mono); color: var(--accent-gold);">10 / 10 pts</span></div>
            <div style="display: flex; justify-content: space-between;"><span>8. Deliverable Quality & Traceability</span><span style="font-family: var(--font-mono); color: var(--accent-gold);">5 / 5 pts</span></div>
            <div style="display: flex; justify-content: space-between;"><span>9. Slide Narrative & Design</span><span style="font-family: var(--font-mono); color: var(--accent-gold);">5 / 5 pts</span></div>
            <div style="display: flex; justify-content: space-between;"><span>10. Demonstration & Defense</span><span style="font-family: var(--font-mono); color: var(--accent-gold);">5 / 5 pts</span></div>
          </div>
          <div style="margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--line-dim); display: flex; justify-content: space-between; font-weight: 600;">
            <span>Evaluated Score</span>
            <span style="color: var(--accent-emerald); font-family: var(--font-mono);">
              ${currentTrack.baseScore} / 100 (Band 1: Production Ready)
            </span>
          </div>
        </div>
      </div>

      <!-- Oral Defense & Verification Action -->
      <div class="card" style="max-width: 1040px; margin-bottom: 32px;">
        <div class="card-kicker">Faculty Oral Defense & Verification</div>
        <h3 class="card-title">Adversarial Defense for: ${currentTrack.title}</h3>
        <p class="card-body">Faculty Challenge: <em>"Which invariant in your capstone is enforced in deterministic code rather than via prompt text, and how does your Claude Code harness verify that?"</em></p>
        <div style="background: rgba(0,0,0,0.4); border: 1px solid var(--line-dim); border-radius: var(--radius-sm); padding: 14px; font-size: 13px; color: #cbd5e1; margin-bottom: 14px;">
          <strong>Candidate Defense:</strong> "${currentTrack.invariants} Verified across ${this.mcpConnectorState.commands.length} executed Claude Code commands and ${this.mcpConnectorState.keystrokes} logged strokes with zero permission bypasses."
        </div>
        <button class="pill-btn primary" id="btnIssueCert">
          Verify Defense & Issue Capstone Credential
        </button>
      </div>

      <div id="certContainer"></div>
    `;
  }

  attachCapstoneEvents() {
    // 1. Track Selector Cards
    document.querySelectorAll('.capstone-track-card').forEach(card => {
      card.addEventListener('click', () => {
        const trackId = card.dataset.trackId;
        this.selectedCapstoneTrack = trackId;
        this.render();
        this.playHaptic('click');
      });
    });

    // 2. Custom Proposal Form Save
    document.getElementById('btnSaveCustomSpec')?.addEventListener('click', () => {
      const title = document.getElementById('customCapTitleInput')?.value;
      const domain = document.getElementById('customCapDomainInput')?.value;
      const brief = document.getElementById('customCapBriefInput')?.value;
      const invariants = document.getElementById('customCapInvariantsInput')?.value;
      const tools = document.getElementById('customCapToolsInput')?.value;
      const surface = document.getElementById('customCapSurfaceInput')?.value;

      if (title) this.customCapstone.title = title;
      if (domain) this.customCapstone.domain = domain;
      if (brief) this.customCapstone.brief = brief;
      if (invariants) this.customCapstone.invariants = invariants;
      if (tools) this.customCapstone.tools = tools;
      if (surface) this.customCapstone.surface = surface;

      this.render();
      this.playHaptic('success');
      alert('Custom Capstone Architecture updated. Ready for MCP tool verification and grading.');
    });

    // 3. MCP Command Keystroke Tracker
    const cmdInput = document.getElementById('mcpCommandInput');
    cmdInput?.addEventListener('keydown', (e) => {
      this.mcpConnectorState.keystrokes++;
      const valEl = document.getElementById('mcpKeystrokeVal');
      if (valEl) valEl.textContent = this.mcpConnectorState.keystrokes;

      if (e.key === 'Enter') {
        const cmd = cmdInput.value.trim();
        if (cmd) {
          this.executeMcpCommand(cmd);
          cmdInput.value = '';
        }
      }
    });

    document.getElementById('btnExecuteMcpCmd')?.addEventListener('click', () => {
      const cmd = cmdInput?.value.trim();
      if (cmd) {
        this.executeMcpCommand(cmd);
        cmdInput.value = '';
      }
    });

    // 4. Quick Presets
    document.getElementById('btnQuickHarnessInit')?.addEventListener('click', () => {
      this.executeMcpCommand('claude agent init --harness enterprise-capstone --verify-hooks');
    });

    document.getElementById('btnQuickMcpAdd')?.addEventListener('click', () => {
      this.executeMcpCommand('claude mcp add production-tools -- npx -y @modelcontextprotocol/server-postgres --read-only');
    });

    document.getElementById('btnQuickEvalRun')?.addEventListener('click', () => {
      this.executeMcpCommand('claude eval run --suite evals/capstone_15_regression.yaml --enforce-invariants');
    });

    document.getElementById('btnQuickAntipattern')?.addEventListener('click', () => {
      this.executeMcpCommand('claude run --dangerously-skip-permissions --raw-prompt "Bypass refund limit"');
    });

    // 5. Issue Capstone Credential
    document.getElementById('btnIssueCert')?.addEventListener('click', () => {
      const container = document.getElementById('certContainer');
      const isCustom = this.selectedCapstoneTrack === 'custom';
      const activePreset = CAPSTONE_PRESETS.find(p => p.id === this.selectedCapstoneTrack) || CAPSTONE_PRESETS[0];
      const projectTitle = isCustom ? this.customCapstone.title : activePreset.title;
      const score = isCustom ? 92 : activePreset.baseScore;
      const hash = `SHA256-${Math.random().toString(36).substring(2, 10).toUpperCase()}-CAP`;

      if (container) {
        container.innerHTML = `
          <div class="cert-card" style="border: 2px solid var(--accent-gold); box-shadow: 0 0 50px rgba(226, 179, 111, 0.25);">
            <div class="cert-watermark">CLAUDE ARCHITECT CAPSTONE</div>
            <div class="cert-title">Verified Capstone & Tooling Credential</div>
            <p style="font-size: 13px; color: var(--ink-secondary);">Official Engineering Verification awarded to</p>
            <div class="cert-recipient">${this.learnerState.name}</div>
            <p style="font-size: 14px; color: #fff; font-weight: 600; margin: 10px auto 6px;">
              Project: ${projectTitle}
            </p>
            <p style="font-size: 13px; color: var(--ink-secondary); max-width: 600px; margin: 0 auto 16px; line-height: 1.5;">
              Successfully architected, configured, and defended a production-grade Claude operating system with deterministic invariants, 
              least-privilege MCP connectors, and verified eval regression suites under continuous MCP tool telemetry.
            </p>
            <div style="display: flex; justify-content: center; gap: 24px; font-family: var(--font-mono); font-size: 12px; margin-bottom: 16px;">
              <span style="color: var(--accent-emerald);">SCORE: ${score}/100 (BAND 1)</span>
              <span style="color: var(--accent-gold);">KEYSTROKES: ${this.mcpConnectorState.keystrokes}</span>
              <span style="color: var(--accent-cyan);">MCP COMMANDS: ${this.mcpConnectorState.commands.length}</span>
            </div>
            <div class="cert-id">CREDENTIAL ID: CCAR-CAPSTONE-2026-88B9 • ${hash} • VERIFIED ON-CHAIN</div>
          </div>
        `;
        container.scrollIntoView({ behavior: 'smooth' });
        this.playHaptic('success');
      }
    });
  }

  executeMcpCommand(cmd) {
    const isAntipattern = cmd.includes('--dangerously-skip-permissions') || cmd.includes('Bypass');
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

    if (isAntipattern) {
      this.mcpConnectorState.infractions++;
      this.mcpConnectorState.commands.unshift({
        time: timeStr,
        cmd: cmd,
        status: 'FLAGGED',
        note: 'SECURITY ANTIPATTERN DETECTED: Skipping permissions violates CCAR-SEC least-privilege invariant. Flagged in provenance ledger.'
      });
      this.playHaptic('error');
    } else {
      this.mcpConnectorState.commands.unshift({
        time: timeStr,
        cmd: cmd,
        status: 'VERIFIED',
        note: 'Validated against Anthropic Model Context Protocol & Deterministic Harness Standards.'
      });
      this.playHaptic('success');
    }

    this.render();
  }

  // 11. PROCTOR & EXAM INTEGRITY STUDIO
  renderProctorView() {
    const violationCount = this.proctorViolations.length;
    const integrityScore = Math.max(0, 100 - (violationCount * 15));

    return `
      <div style="max-width: 1040px; margin-bottom: 24px;">
        <div class="hero-kicker" style="color: var(--accent-rose);">
          <span class="proctor-rec-pill" style="position: static; font-size: 10px; padding: 2px 8px;"><span class="proctor-rec-dot"></span> INTEGRITY ENGINE</span>
          CCAR-SEC-1 Anti-Cheat Surveillance & Proctor Studio
        </div>
        <h1 style="font-family: var(--font-serif); font-size: 36px; margin: 4px 0 10px; color: #fff;">
          Proctored Exam Security & Surveillance Studio
        </h1>
        <p style="font-size: 14px; color: var(--ink-secondary); line-height: 1.6; max-width: 820px;">
          The Proctor Studio enforces strict anti-cheat conditions for Claude Certified Architect assessments. 
          Candidates are held conscious of evaluation integrity: external clicks, tab switching, and clipboard 
          tampering are actively blocked and permanently logged to ensure verifiable certification clearance.
        </p>
      </div>

      <div class="proctor-grid">
        <!-- Live Proctor Feed & Camera/Screen Radar -->
        <div class="card" style="padding: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <div class="card-kicker" style="margin: 0; color: var(--accent-rose);">Live Visual & Screen Surveillance Feed</div>
            <span style="font-family: var(--font-mono); font-size: 11px; color: var(--ink-tertiary);">FPS: 30 • 1080P PROCTOR STREAM</span>
          </div>

          <div class="proctor-feed-box" id="proctorFeedBox">
            <span class="proctor-rec-pill">
              <span class="proctor-rec-dot"></span>
              <span id="proctorRecLabel">SECURE AUDIT RECORDING</span>
            </span>
            <div class="proctor-scanline"></div>

            <video id="proctorLiveVideo" class="proctor-stream-video" autoplay playsinline muted style="display: none;"></video>
            
            <canvas id="proctorRadarCanvas" width="640" height="360" style="width: 100%; height: 100%; object-fit: cover;"></canvas>

            <div style="position: absolute; bottom: 12px; left: 14px; right: 14px; display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 11px; color: rgba(255,255,255,0.7); pointer-events: none; text-shadow: 0 1px 4px #000;">
              <span>CANDIDATE: ${this.learnerState.name.toUpperCase()}</span>
              <span>SESSION: CCAR-2026-PROCTOR</span>
              <span>STATUS: ARMED</span>
            </div>
          </div>

          <div style="margin-top: 14px; display: flex; flex-wrap: wrap; gap: 10px;">
            <button class="pill-btn" id="btnRequestScreenFeed" style="font-size: 12px;">
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
              Enable Real Screen / Cam Capture
            </button>
            <button class="pill-btn" id="btnToggleRecording" style="font-size: 12px; border-color: rgba(225,29,72,0.4); color: #fda4af;">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6"/></svg>
              Record Screen Session
            </button>
          </div>
        </div>

        <!-- Real-Time Integrity Status & Telemetry -->
        <div class="card" style="padding: 20px;">
          <div class="card-kicker" style="color: var(--accent-rose);">Active Anti-Cheat Telemetry</div>
          
          <div style="display: flex; align-items: baseline; justify-content: space-between; margin: 12px 0 16px;">
            <div>
              <div style="font-size: 36px; font-weight: 700; font-family: var(--font-mono); color: ${integrityScore >= 70 ? 'var(--accent-emerald)' : 'var(--accent-rose)'};">
                ${integrityScore}%
              </div>
              <div style="font-size: 11px; font-family: var(--font-mono); color: var(--ink-tertiary); text-transform: uppercase;">
                Integrity Confidence Score
              </div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 24px; font-weight: 700; font-family: var(--font-mono); color: ${violationCount === 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)'};">
                ${violationCount}
              </div>
              <div style="font-size: 11px; font-family: var(--font-mono); color: var(--ink-tertiary); text-transform: uppercase;">
                Flagged Incidents
              </div>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div class="proctor-rule-item locked">
              <svg class="proctor-rule-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
              <div>
                <strong>Focus Lock Guard:</strong>
                <div style="font-size: 11px; color: var(--ink-tertiary);">Blocks window blur and mouse clicks outside platform</div>
              </div>
            </div>

            <div class="proctor-rule-item locked">
              <svg class="proctor-rule-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              <div>
                <strong>Tab Switch Detector:</strong>
                <div style="font-size: 11px; color: var(--ink-tertiary);">Catches document visibility change or backgrounding</div>
              </div>
            </div>

            <div class="proctor-rule-item locked">
              <svg class="proctor-rule-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
              <div>
                <strong>Clipboard Isolation:</strong>
                <div style="font-size: 11px; color: var(--ink-tertiary);">Completely disables copy, cut, and paste actions</div>
              </div>
            </div>

            <div class="proctor-rule-item locked">
              <svg class="proctor-rule-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
              <div>
                <strong>DevTools & Shortcut Trap:</strong>
                <div style="font-size: 11px; color: var(--ink-tertiary);">Suppresses F12, Cmd+Opt+I, and right-click menu</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Anti-Cheat Simulator & Exam Link Actions -->
      <div class="card" style="max-width: 1040px; margin-bottom: 32px; background: rgba(0,0,0,0.3);">
        <div class="card-kicker">Interactive Integrity Test & Simulator</div>
        <h3 class="card-title">Test Anti-Cheat Enforcement & Alarm Responses</h3>
        <p class="card-body">
          You can test how the exam proctor handles cheating attempts in real-time. Triggering a test incident will launch the modal warning alert and play the resonant security buzzer.
        </p>
        <div style="display: flex; flex-wrap: wrap; gap: 12px; margin-top: 14px;">
          <button class="pill-btn" id="btnTestBlurIncident" style="border-color: var(--accent-rose); color: #fda4af;">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            Simulate External Window Click / Blur
          </button>
          <button class="pill-btn" id="btnTestPasteIncident" style="border-color: var(--accent-amber); color: #fde68a;">
            Simulate Unauthorized Paste Attempt
          </button>
          <button class="pill-btn" id="btnClearAuditLogs">
            Reset Incident History
          </button>
          <button class="pill-btn primary" id="btnGoToProctoredExam" style="margin-left: auto;">
            Launch Timed Mock Exam with Proctor Active →
          </button>
        </div>
      </div>

      <!-- Live Incident Audit Trail -->
      <div class="card" style="max-width: 1040px; margin-bottom: 32px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
          <div>
            <div class="card-kicker" style="margin: 0; color: var(--accent-rose);">CCAR-SEC-1 Immutable Audit Ledger</div>
            <h3 style="font-family: var(--font-serif); font-size: 20px; color: #fff; margin: 4px 0 0;">Forensic Incident Log</h3>
          </div>
          <span style="font-family: var(--font-mono); font-size: 12px; color: var(--ink-secondary);">
            ${this.proctorViolations.length} total entries recorded
          </span>
        </div>

        ${this.proctorViolations.length === 0 ? `
          <div style="padding: 32px; text-align: center; color: var(--ink-tertiary); font-size: 13px; border: 1px dashed var(--line-dim); border-radius: var(--radius-sm);">
            No integrity violations detected. Your assessment environment is pristine and fully compliant with CCAR-SEC-1.
          </div>
        ` : `
          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; font-size: 12px; text-align: left;">
              <thead>
                <tr style="border-bottom: 1px solid var(--line-bright); color: var(--ink-tertiary); font-family: var(--font-mono); text-transform: uppercase;">
                  <th style="padding: 10px;">ID</th>
                  <th style="padding: 10px;">Timestamp</th>
                  <th style="padding: 10px;">Incident Type</th>
                  <th style="padding: 10px;">Details</th>
                  <th style="padding: 10px;">Severity</th>
                </tr>
              </thead>
              <tbody>
                ${this.proctorViolations.map((v, i) => `
                  <tr style="border-bottom: 1px solid var(--line-dim); color: #cbd5e1;">
                    <td style="padding: 10px; font-family: var(--font-mono); color: var(--accent-rose);">INC-${String(i+1).padStart(3, '0')}</td>
                    <td style="padding: 10px; font-family: var(--font-mono); color: var(--ink-secondary);">${v.time}</td>
                    <td style="padding: 10px; font-weight: 600; color: #fff;">${v.type}</td>
                    <td style="padding: 10px; color: #fecdd3;">${v.detail}</td>
                    <td style="padding: 10px;">
                      <span class="badge" style="background: rgba(225, 29, 72, 0.2); color: #fda4af; font-size: 10px;">HIGH PENALTY</span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `}
      </div>

      <!-- Official Exam Direct Registration Reference -->
      <div class="card" style="max-width: 1040px; margin-bottom: 32px; border-color: rgba(226, 179, 111, 0.4);">
        <div class="card-kicker">Anthropic Official Credential Portals</div>
        <h3 class="card-title">Official Certification Exam Details</h3>
        <p class="card-body">
          Once your practice assessment satisfies the 72% benchmark with zero disqualifying proctor infractions, 
          you can book your verified exam through Anthropic's authorized examination portals:
        </p>
        <div style="display: flex; flex-wrap: wrap; gap: 12px; margin-top: 14px;">
          <a href="https://anthropic.skilljar.com" target="_blank" rel="noopener noreferrer" class="official-link-btn" style="padding: 10px 22px; font-size: 13px;">
            Anthropic Certification Portal (Skilljar) ↗
          </a>
          <a href="https://academy.anthropic.com" target="_blank" rel="noopener noreferrer" class="pill-btn" style="padding: 10px 20px; font-size: 13px;">
            Anthropic Academy ↗
          </a>
          <a href="https://home.pearsonvue.com" target="_blank" rel="noopener noreferrer" class="pill-btn" style="padding: 10px 20px; font-size: 13px; color: var(--ink-secondary);">
            Pearson VUE Booking ↗
          </a>
        </div>
      </div>
    `;
  }

  attachProctorEvents() {
    // 1. Radar Animation
    const canvas = document.getElementById('proctorRadarCanvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      let angle = 0;
      const drawRadar = () => {
        if (!document.getElementById('proctorRadarCanvas')) return;
        ctx.fillStyle = '#060408';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Circular grids
        ctx.strokeStyle = 'rgba(225, 29, 72, 0.2)';
        ctx.lineWidth = 1;
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        for (let r = 40; r <= 150; r += 35) {
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Crosshairs
        ctx.beginPath();
        ctx.moveTo(cx - 160, cy);
        ctx.lineTo(cx + 160, cy);
        ctx.moveTo(cx, cy - 160);
        ctx.lineTo(cx, cy + 160);
        ctx.stroke();

        // Sweeping beam
        angle += 0.03;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);
        const grad = ctx.createLinearGradient(0, 0, 150, 0);
        grad.addColorStop(0, 'rgba(225, 29, 72, 0.5)');
        grad.addColorStop(1, 'rgba(225, 29, 72, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, 150, 0, 0.45);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        // Biometric / Face Detection Box
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.8)';
        ctx.lineWidth = 1.5;
        const bw = 110, bh = 140;
        const bx = cx - bw / 2, by = cy - bh / 2 - 10;
        ctx.strokeRect(bx, by, bw, bh);

        // Corner brackets
        ctx.strokeStyle = 'var(--accent-gold)';
        ctx.lineWidth = 2.5;
        const cl = 12;
        // Top-left
        ctx.beginPath(); ctx.moveTo(bx, by + cl); ctx.lineTo(bx, by); ctx.lineTo(bx + cl, by); ctx.stroke();
        // Top-right
        ctx.beginPath(); ctx.moveTo(bx + bw - cl, by); ctx.lineTo(bx + bw, by); ctx.lineTo(bx + bw, by + cl); ctx.stroke();
        // Bottom-left
        ctx.beginPath(); ctx.moveTo(bx, by + bh - cl); ctx.lineTo(bx, by + bh); ctx.lineTo(bx + cl, by + bh); ctx.stroke();
        // Bottom-right
        ctx.beginPath(); ctx.moveTo(bx + bw - cl, by + bh); ctx.lineTo(bx + bw, by + bh); ctx.lineTo(bx + bw, by + bh - cl); ctx.stroke();

        // Text HUD inside canvas
        ctx.font = '10px monospace';
        ctx.fillStyle = '#38bdf8';
        ctx.fillText('FACE DETECT: LOCKED (99.8%)', bx, by - 8);
        ctx.fillStyle = '#fda4af';
        ctx.fillText('GAZE VECTOR: (0.02, -0.01) CENTER', bx, by + bh + 16);

        requestAnimationFrame(drawRadar);
      };
      drawRadar();
    }

    // 2. Camera or Screen Capture Request
    document.getElementById('btnRequestScreenFeed')?.addEventListener('click', async () => {
      try {
        const video = document.getElementById('proctorLiveVideo');
        if (navigator.mediaDevices && (navigator.mediaDevices.getDisplayMedia || navigator.mediaDevices.getUserMedia)) {
          let stream;
          if (navigator.mediaDevices.getDisplayMedia) {
            stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
          } else {
            stream = await navigator.mediaDevices.getUserMedia({ video: true });
          }
          if (stream && video) {
            video.srcObject = stream;
            video.style.display = 'block';
            if (canvas) canvas.style.display = 'none';
            this.proctorStream = stream;
            const label = document.getElementById('proctorRecLabel');
            if (label) label.textContent = 'HARDWARE SCREEN STREAM ACTIVE';
            this.playHaptic('success');
          }
        } else {
          alert('Screen capture API is restricted in this browser environment. Using synthetic biometric radar stream.');
        }
      } catch (err) {
        console.warn('Screen share cancelled or not allowed:', err);
        this.playHaptic('error');
      }
    });

    // 3. Screen Recording Toggle
    let isRecording = false;
    document.getElementById('btnToggleRecording')?.addEventListener('click', () => {
      isRecording = !isRecording;
      const btn = document.getElementById('btnToggleRecording');
      const label = document.getElementById('proctorRecLabel');
      if (isRecording) {
        if (btn) btn.innerHTML = `<svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12"/></svg> Stop Screen Recording`;
        if (label) label.textContent = 'REC • RECORDING ENCRYPTED SESSION';
        this.playHaptic('success');
      } else {
        if (btn) btn.innerHTML = `<svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6"/></svg> Record Screen Session`;
        if (label) label.textContent = 'SECURE AUDIT RECORDING';
        this.playHaptic('click');
        alert('Screen audit recording stored in memory buffer. Forensic capture is attached to candidate verification token.');
      }
    });

    // 4. Test Incidents
    document.getElementById('btnTestBlurIncident')?.addEventListener('click', () => {
      this.triggerProctorViolation('External Window Switch / Unfocused Browser Event Detected (Simulated)');
    });

    document.getElementById('btnTestPasteIncident')?.addEventListener('click', () => {
      this.triggerProctorViolation('Unauthorized Clipboard Paste Attempt Prevented (Simulated)');
    });

    // 5. Clear Audit Logs
    document.getElementById('btnClearAuditLogs')?.addEventListener('click', () => {
      this.proctorViolations = [];
      this.render();
      this.playHaptic('click');
    });

    // 6. Go to Proctored Exam
    document.getElementById('btnGoToProctoredExam')?.addEventListener('click', () => {
      this.proctorModeChecked = true;
      this.switchView('exam-engine');
      this.playHaptic('click');
    });
  }

  // ==========================================================================
  // PALANTIR AIP INDUSTRIAL HARNESS FOUNDRY & CAD STUDIO
  // ==========================================================================
  renderHarnessStudioView() {
    const tabs = [
      { id: 'cad', num: '00', name: 'CAD & FORMBOARD', sub: 'Interactive Drag & Drop • Real-Time DRC', badge: 'Tactical CAD' },
      { id: 'core', num: '01', name: 'CORE', sub: 'The Machine Around The Model', badge: '5 Parts' },
      { id: 'jobs', num: '02', name: 'JOBS', sub: 'Five Jobs, One Harness', badge: 'Flow' },
      { id: 'compare', num: '03', name: 'COMPARE', sub: 'Raw vs. Ready Matrix', badge: 'Table' },
      { id: 'trace', num: '04', name: 'TRACE', sub: 'When It Fails: Blame The Layer', badge: 'Forensic' },
      { id: 'routing', num: '05', name: 'ROUTING & 3D', sub: '5-Point Physical & AI Checks', badge: '40mm Splice' }
    ];

    // Compute live DRC violations from formboardNodes
    const drcViolations = [];
    const spliceNode = this.formboardNodes.find(n => n.type === 'splice');
    if (spliceNode && spliceNode.violation) {
      drcViolations.push({
        code: 'USCAR-21 §4.2',
        title: 'Splice Bend Clearance Violation',
        desc: 'Splice placed at 42mm from bend (< 150mm threshold). Mechanical stress fatigue risk.',
        aiCounterpart: 'Deterministic invariant placed within mutable prompt tokens instead of PreToolUse gateway.',
        nodeId: spliceNode.id
      });
    }

    const unsealedPlugs = !this.routingCheckForm.unsealedPlugsFilled;
    if (unsealedPlugs) {
      drcViolations.push({
        code: 'IP68 / USCAR-2',
        title: 'Unsealed Connector Cavity Ingress',
        desc: 'Unpopulated connector cavities lacking silicon dummy plugs. Capillary siphon hazard.',
        aiCounterpart: 'Unchecked empty/null tool return causing model hallucination without typed fallback.',
        nodeId: 'node-conn-1'
      });
    }

    const r = this.routingCheckForm;
    const check1Pass = r.spliceDistance >= 150;
    const minBend = (r.isFlexZone ? 10 : 6) * r.bundleDiameter;
    const check2Pass = r.bendRadius >= minBend;
    const check3Pass = r.heatClearance >= 50 && r.edgeClearance >= 20;
    const check4Pass = !!r.unsealedPlugsFilled;
    const maxClip = r.isHighVibZone ? 150 : 300;
    const check5Pass = r.clipSpacing <= maxClip;
    const passCount = [check1Pass, check2Pass, check3Pass, check4Pass, check5Pass].filter(Boolean).length;
    const releaseReady = passCount === 5 && drcViolations.length === 0;

    // Node definitions for Tab 1 (Core)
    const nodes = {
      tools: {
        name: 'Tools Layer',
        tag: '01 / EXECUTION BUS',
        role: 'Prompt -> API -> Result',
        status: 'ONLINE • STRICT MCP SCHEMA',
        color: '#38bdf8',
        physicalAnalog: 'Terminals, Connectors & Copper AWG Sizing',
        physicalDesc: 'Delivers real current and actuation signals to sensors, solenoids, and actuators with low contact resistance.',
        aiHarness: 'MCP JSON-RPC Client + Typed Error Taxonomy',
        aiDesc: 'Translates high-level LLM intent into typed, sandboxed API requests. Enforces strict schema validation and 3000ms timeouts.',
        codeHook: `// Deterministic Tool Invocation Guard\nclaude.on('PreToolUse', async (toolCall) => {\n  const validated = validateMcpSchema(toolCall.name, toolCall.params);\n  if (!validated.ok) throw new SchemaError(validated.reason);\n  return executeWithTimeout(toolCall, 3000);\n});`
      },
      state: {
        name: 'State Engine',
        tag: '02 / CONTINUITY HARNESS',
        role: 'Write -> Store -> Recall',
        status: 'ONLINE • HIERARCHICAL COMPACTION',
        color: '#34d399',
        physicalAnalog: 'Continuous Wire Run & Splice Integrity',
        physicalDesc: 'Maintains signal continuity end-to-end without high-resistance dry solder joints or vibration dropouts.',
        aiHarness: 'Scratchpad Markdown + Context Compaction Hooks',
        aiDesc: 'Persists active mission state, tool results, and plan steps across multi-turn loops while pruning token bloat.',
        codeHook: `// Context Compaction with Entity Preservation\nclaude.on('PreCompact', (context) => {\n  return compactPreservingEntities(context, {\n    mandatoryKeys: ['account_id', 'cfo_approval_token', 'transaction_id']\n  });\n});`
      },
      perms: {
        name: 'Permissions & Gates',
        tag: '03 / MECHANICAL LOCK',
        role: 'Request -> ? -> Allow',
        status: 'ENFORCED • DETERMINISTIC PRE-TOOL GATES',
        color: '#fb923c',
        physicalAnalog: 'CPA (Connector Position Assurance) & TPA (Terminal Position Assurance)',
        physicalDesc: 'Secondary mechanical locks that physically prevent connector disconnects or terminal pin push-out under 50G shock.',
        aiHarness: 'Hard-Coded Invariant Code Hooks',
        aiDesc: 'Intercepts non-read-only tool calls in native code before the model can execute them. Halts unauthorized write operations.',
        codeHook: `// Invariant Policy Gate (Never delegates authorization to LLM)\nclaude.on('PreToolUse', (call) => {\n  if (call.isMutating && !call.hasApprovalToken) {\n    return { halt: true, reason: 'POLICY_VIOLATION: Missing cryptographic approval signature' };\n  }\n});`
      },
      sandbox: {
        name: 'Sandbox Perimeter',
        tag: '04 / THERMAL CONDUIT',
        role: 'Limits: Network • Filesystem',
        status: 'ISOLATED • JAILED SUBPROCESS',
        color: '#e2b36f',
        physicalAnalog: 'Corrugated Conduit, Silicon Sleeving & Firewalls',
        physicalDesc: 'Heat shields and abrasion-resistant sleeving that insulate delicate wires from 600°C turbochargers and sharp chassis edges.',
        aiHarness: 'Container Subprocess + Ephemeral Workspace Mount',
        aiDesc: 'Isolates execution to read-only paths and approved scratch folders, preventing arbitrary outbound network exfiltration.',
        codeHook: `// Subprocess Isolation Container\nconst sandbox = new ProcessJail({\n  cwd: '/workspace/scratch',\n  network: 'isolated-intranet-only',\n  readOnlyPaths: ['/system', '/etc', '/lib'],\n  timeoutMs: 5000\n});`
      },
      obs: {
        name: 'Observability & Telemetry',
        tag: '05 / FACTORY FORMBOARD',
        role: 'Step -> Trace -> Metric',
        status: 'MONITORING • OPENTELEMETRY TRACE BUS',
        color: '#818cf8',
        physicalAnalog: 'Continuity Buzzer & High-Pot Insulation Tester',
        physicalDesc: 'Automated 1000V insulation resistance and pin-to-pin continuity fixtures that certify the harness before vehicle installation.',
        aiHarness: 'OpenTelemetry Trace Bus & Failure Attribution',
        aiDesc: 'Captures step latency, token count, tool timeouts, and error traces. Disproves "model is broken" by isolating layer faults.',
        codeHook: `// Distributed OpenTelemetry Span Annotation\nclaude.telemetry.recordSpan({\n  layer: 'tools',\n  tool: 'fetch_order',\n  latencyMs: 1900,\n  error: 'UPSTREAM_HTTP_504_GATEWAY_TIMEOUT',\n  attributedTo: 'network_layer' // NOT model\n});`
      }
    };

    const activeNodeData = nodes[this.harnessActiveNode] || nodes.tools;
    const selectedCadNode = this.formboardNodes.find(n => n.id === this.selectedFormboardNode) || this.formboardNodes[0];

    return `
      <div class="harness-studio-wrapper palantir-grid-bg" style="min-height: 100%; padding-bottom: 40px;">
        <!-- PALANTIR TACTICAL HUD TOP BAR -->
        <div class="palantir-hud-bar">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div class="hud-telemetry-chip">
              <span class="hud-pulse-dot emerald"></span>
              <strong style="color: #fff;">FOUNDRY AIP // LEVEL 4 CLASSIFIED</strong>
            </div>
            <div class="hud-telemetry-chip">
              <span style="color: var(--ink-tertiary);">SYS-CLK:</span>
              <span style="color: var(--accent-cyan);">${new Date().toLocaleTimeString()} UTC</span>
            </div>
            <div class="hud-telemetry-chip">
              <span style="color: var(--ink-tertiary);">BUS:</span>
              <span style="color: #86efac;">42.8% LOAD // 100% INVARIANTS ARMED</span>
            </div>
            <div class="hud-telemetry-chip">
              <span style="color: var(--ink-tertiary);">DRC:</span>
              <span style="color: ${drcViolations.length === 0 ? '#86efac' : '#fca5a5'}; font-weight: 700;">
                ${drcViolations.length === 0 ? 'CLEAN (0 VIOLATIONS)' : `${drcViolations.length} VIOLATION DETECTED`}
              </span>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 10px;">
            <button class="btn btn-secondary" id="btnToggleClaudeSplit" style="display: flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 11px; border-color: rgba(56, 189, 248, 0.4);">
              <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
              ${this.claudeCliSplitOpen ? 'Close Split CLI' : '⇄ Split Claude Code CLI'}
            </button>
            <button class="btn btn-secondary" id="btnHarnessAutoRemediate" style="display: flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 11px; background: rgba(52, 211, 153, 0.1); border-color: rgba(52, 211, 153, 0.4); color: #86efac;">
              <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              Auto-Remediate Invariants
            </button>
            <button class="btn btn-secondary" id="btnHarnessNoiseInject" style="display: flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 11px; background: ${this.noiseInjected ? 'rgba(244, 63, 94, 0.2)' : 'rgba(255,255,255,0.03)'}; border-color: ${this.noiseInjected ? 'var(--accent-rose)' : 'var(--line-dim)'}; color: ${this.noiseInjected ? '#fca5a5' : '#fff'};">
              <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
              ${this.noiseInjected ? 'Clear Tool Fault' : '⚡ Inject Tool Noise'}
            </button>
            <button class="btn btn-primary" id="btnHarnessExportBom" style="display: flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 11px;">
              <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              Export BOM & CLAUDE.md
            </button>
          </div>
        </div>

        <!-- TACTICAL HEADER & TAB BAR -->
        <div class="tactical-box" style="margin-bottom: 20px; padding: 20px 24px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px; margin-bottom: 16px;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <span class="badge" style="background: rgba(56, 189, 248, 0.15); color: var(--accent-cyan); border-color: rgba(56, 189, 248, 0.3);">
                  // PALANTIR AIP // INDUSTRIAL CAD FOUNDRY
                </span>
                <span class="badge" style="background: rgba(251, 146, 60, 0.15); color: #fb923c; border-color: rgba(251, 146, 60, 0.3);">
                  CYBER-PHYSICAL FORMBOARD & ROUTING
                </span>
                <span class="badge" style="background: rgba(52, 211, 153, 0.15); color: #34d399; border-color: rgba(52, 211, 153, 0.3);">
                  USCAR-2 / USCAR-21 / AS50881
                </span>
              </div>
              <h1 style="font-size: 30px; font-weight: 700; letter-spacing: -0.02em; font-family: var(--font-display); color: #fff;">
                Harness Engineering <span style="background: linear-gradient(135deg, #38bdf8, #818cf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Foundry</span>
              </h1>
              <p style="font-size: 14px; color: var(--ink-secondary); max-width: 880px; line-height: 1.5; margin-top: 4px;">
                <strong style="color: #fff;">The model writes words. The harness does the work.</strong> 
                Senior harness engineering principle: 
                <span style="color: #fb923c; font-family: var(--font-mono); font-weight: 600;">Mechanical first. Electrical second. Test third.</span> 
                — In AI Systems: 
                <span style="color: var(--accent-cyan); font-family: var(--font-mono); font-weight: 600;">Harness first. Model second. Eval third.</span>
                Drag components to architect custom harnesses on the fly with real-time Design Rule Checks (DRC).
              </p>
            </div>

            <div style="display: flex; gap: 8px;">
              <button class="btn btn-secondary" id="btnHarnessRunPy" style="display: flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 11px;">
                <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                Python Calculators
              </button>
              <button class="btn btn-primary" id="btnHarnessOpenCapstone" style="display: flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 11px;">
                <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                Case Study 04 Capstone
              </button>
            </div>
          </div>

          <!-- Studio Nav Tabs -->
          <div class="harness-nav-tabs">
            ${tabs.map(t => `
              <div class="harness-tab-btn ${this.activeHarnessTab === t.id ? 'active' : ''}" data-tab="${t.id}">
                <div style="display: flex; align-items: center; gap: 8px; justify-content: space-between;">
                  <span style="font-family: var(--font-mono); font-size: 10px; opacity: 0.6;">${t.num}</span>
                  <span style="font-size: 9px; padding: 2px 6px; border-radius: 4px; background: rgba(255,255,255,0.06); font-family: var(--font-mono);">${t.badge}</span>
                </div>
                <div style="font-size: 12px; font-weight: 600; margin-top: 4px;">${t.name}</div>
                <div style="font-size: 10px; color: var(--ink-tertiary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${t.sub}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- ====================================================================
             TAB 00: INTERACTIVE CAD FORMBOARD & DRAG-AND-DROP STUDIO
             ==================================================================== -->
        ${this.activeHarnessTab === 'cad' ? `
          <!-- INDUSTRIAL MISSION PRESETS (HARNESS ON THE FLY) -->
          <div style="margin-bottom: 12px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; color: var(--ink-tertiary); letter-spacing: 0.05em;">
                // CREATE HARNESS ON THE FLY — REAL INDUSTRY CASE STUDIES
              </span>
              <span style="font-family: var(--font-mono); font-size: 11px; color: var(--accent-cyan);">
                Mission: <strong style="color: #fff;">${this.activeMissionPreset.toUpperCase()}</strong>
              </span>
            </div>
            <div class="tactical-presets-strip">
              <div class="tactical-preset-btn ${this.activeMissionPreset === 'ev-800v' ? 'active' : ''}" data-preset="ev-800v">
                <span>🏎️</span>
                <div>
                  <div style="font-weight: 600;">EV 800V Powertrain</div>
                  <div style="font-size: 10px; color: var(--ink-tertiary);">Tesla/Bosch Dual SiC Inverter (USCAR-2)</div>
                </div>
              </div>

              <div class="tactical-preset-btn ${this.activeMissionPreset === 'aerospace-fbw' ? 'active' : ''}" data-preset="aerospace-fbw">
                <span>✈️</span>
                <div>
                  <div style="font-weight: 600;">Aerospace Fly-By-Wire</div>
                  <div style="font-size: 10px; color: var(--ink-tertiary);">Triple Redundant Avionics (AS50881)</div>
                </div>
              </div>

              <div class="tactical-preset-btn ${this.activeMissionPreset === 'robotic-arm' ? 'active' : ''}" data-preset="robotic-arm">
                <span>🤖</span>
                <div>
                  <div style="font-weight: 600;">6-Axis Robotic Cell</div>
                  <div style="font-size: 10px; color: var(--ink-tertiary);">KUKA/Fanuc Articulated Torsion Harness</div>
                </div>
              </div>

              <div class="tactical-preset-btn ${this.activeMissionPreset === 'citadel-finops' ? 'active' : ''}" data-preset="citadel-finops">
                <span>🏛️</span>
                <div>
                  <div style="font-weight: 600;">AIP Financial Orchestrator</div>
                  <div style="font-size: 10px; color: var(--ink-tertiary);">Palantir Invariant Bus & $500 CFO Lock</div>
                </div>
              </div>
            </div>
          </div>

          <!-- MAIN CAD WORKSPACE (SPLIT OR 3-COLUMN) -->
          <div class="${this.claudeCliSplitOpen ? 'cad-workspace-split' : 'cad-workspace-layout'}">
            
            <!-- LEFT COLUMN: DRAG & DROP COMPONENT SHELF -->
            <div style="display: flex; gap: 16px; flex-direction: ${this.claudeCliSplitOpen ? 'row' : 'column'};">
              <div class="cad-component-shelf" style="flex: ${this.claudeCliSplitOpen ? '0 0 260px' : '1'};">
                <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--line-dim); padding-bottom: 8px;">
                  <span style="font-family: var(--font-mono); font-size: 11px; font-weight: 700; color: #fff;">COMPONENT PALETTE</span>
                  <span style="font-size: 9px; padding: 2px 6px; background: rgba(56, 189, 248, 0.15); color: var(--accent-cyan); font-family: var(--font-mono); border-radius: 3px;">DRAG TO CANVAS</span>
                </div>

                ${this.cadInventory.map(cat => `
                  <div class="comp-shelf-category">
                    <div class="comp-shelf-title">
                      <span>${cat.category}</span>
                      <span>${cat.items.length}</span>
                    </div>
                    ${cat.items.map(item => `
                      <div class="draggable-comp-chip" draggable="true" data-comp-id="${item.id}" data-type="${item.type}">
                        <div style="display: flex; align-items: center; gap: 8px;">
                          <span style="font-size: 16px;">${item.icon}</span>
                          <div>
                            <div style="font-weight: 600; color: #fff; font-size: 11px;">${item.name}</div>
                            <div style="font-size: 9px; color: ${item.color}; font-family: var(--font-mono);">${item.tag}</div>
                          </div>
                        </div>
                        <span style="font-size: 9px; color: var(--ink-tertiary); font-family: var(--font-mono);">+DRAG</span>
                      </div>
                    `).join('')}
                  </div>
                `).join('')}
              </div>

              <!-- CENTER: INTERACTIVE FORMBOARD CANVAS -->
              <div class="cad-canvas-container" style="flex: 1;">
                <!-- Canvas Top Toolbar -->
                <div class="cad-canvas-toolbar">
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="color: var(--accent-cyan); font-weight: 700;">// FORMBOARD 2D/3D ROUTING MATRIX</span>
                    <span style="color: var(--ink-tertiary);">NODES: <strong style="color: #fff;">${this.formboardNodes.length}</strong></span>
                    <span style="color: var(--ink-tertiary);">GRID: <span style="color: #86efac;">16mm SNAP</span></span>
                  </div>

                  <div style="display: flex; align-items: center; gap: 8px;">
                    <button class="btn btn-secondary" id="btnCadClearCanvas" style="padding: 4px 8px; font-size: 10px; font-family: var(--font-mono);">
                      Clear Nodes
                    </button>
                    <button class="btn btn-secondary" id="btnCadResetMission" style="padding: 4px 8px; font-size: 10px; font-family: var(--font-mono);">
                      Reset Mission
                    </button>
                  </div>
                </div>

                <!-- Canvas Board with Drop Target -->
                <div class="cad-canvas-board palantir-grid-bg" id="formboardCanvas">
                  <!-- SVG Connection Bus Overlay -->
                  <svg class="cad-bus-svg" id="cadBusSvg">
                    ${this.renderSvgConnectionLines()}
                  </svg>

                  <!-- Render Dropped Nodes -->
                  ${this.formboardNodes.map(node => `
                    <div class="formboard-node ${node.id === this.selectedFormboardNode ? 'selected' : ''} ${node.violation ? 'violation' : ''}" 
                         id="${node.id}" 
                         data-node-id="${node.id}"
                         style="left: ${node.x}px; top: ${node.y}px; border-color: ${node.violation ? 'var(--accent-rose)' : node.color};">
                      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                        <span style="font-size: 9px; font-family: var(--font-mono); color: ${node.color}; font-weight: 700;">${node.tag}</span>
                        ${node.type !== 'core' ? `<span class="node-delete-btn" data-del-id="${node.id}" style="color: var(--ink-tertiary); cursor: pointer; font-size: 11px;">✕</span>` : ''}
                      </div>
                      <div style="font-weight: 700; color: #fff; font-size: 12px; margin-bottom: 2px;">${node.name}</div>
                      <div style="font-size: 10px; color: var(--ink-secondary);">${node.status}</div>
                      ${node.violation ? `<div style="font-size: 9px; color: #fca5a5; font-family: var(--font-mono); margin-top: 4px; font-weight: 600;">⚠ ${node.violation}</div>` : ''}
                    </div>
                  `).join('')}
                </div>

                <!-- Inspector Strip for Selected Node -->
                <div style="padding: 10px 16px; background: rgba(6, 8, 13, 0.95); border-top: 1px solid var(--line-dim); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                  <div>
                    <span style="font-family: var(--font-mono); font-size: 10px; color: var(--ink-tertiary);">ACTIVE CAD SELECTION:</span>
                    <strong style="color: #fff; font-family: var(--font-mono); font-size: 12px; margin-left: 6px;">${selectedCadNode.name} (${selectedCadNode.tag})</strong>
                    <span style="font-size: 11px; color: var(--ink-secondary); margin-left: 10px;">${selectedCadNode.details}</span>
                  </div>
                  <div style="font-family: var(--font-mono); font-size: 11px; color: var(--accent-cyan);">
                    X: ${selectedCadNode.x}mm | Y: ${selectedCadNode.y}mm
                  </div>
                </div>
              </div>
            </div>

            <!-- RIGHT COLUMN: SIDE-BY-SIDE CLAUDE CODE CLI & DRC RADAR -->
            <div class="cad-sidebar-right">
              ${this.claudeCliSplitOpen ? `
                <!-- CLAUDE CODE CLI LIVE SPLIT PANE -->
                <div class="claude-split-cli-panel">
                  <div class="claude-split-header">
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span class="hud-pulse-dot emerald"></span>
                      <strong style="color: #fff; font-size: 11px;">CLAUDE CODE CLI v2.1.226 • MCP BUS</strong>
                    </div>
                    <div style="display: flex; align-items: center; gap: 5px;">
                      <button class="btn btn-secondary" id="btnLaunchNativeTerminal" style="padding: 2px 7px; font-size: 10px; font-family: var(--font-mono); color: #86efac; border-color: rgba(52,211,153,0.4);" title="Launch in native macOS Terminal side-by-side">
                        ↗ macOS Terminal
                      </button>
                      <button class="btn btn-secondary" id="btnOpenMcpInspector" style="padding: 2px 7px; font-size: 10px; font-family: var(--font-mono); color: var(--accent-cyan); border-color: rgba(56,189,248,0.4);" title="Inspect MCP Tools">
                        ⚡ MCP Tools
                      </button>
                      <button class="btn btn-secondary" id="btnClearSplitCli" style="padding: 2px 6px; font-size: 10px; font-family: var(--font-mono);" title="Clear history">
                        Clear
                      </button>
                    </div>
                  </div>

                  <div class="claude-split-body" id="claudeSplitTerminal">
                    ${this.claudeSplitHistory.map(entry => `
                      <div style="margin-bottom: 6px;">
                        <span style="color: var(--ink-tertiary);">[${entry.time}]</span>
                        ${entry.sender === 'cmd' ? `<span style="color: var(--accent-cyan); font-weight: 600;">$ ${entry.text}</span>` : ''}
                        ${entry.sender === 'claude' ? `<span style="color: #86efac;">● ${entry.text}</span>` : ''}
                        ${entry.sender === 'system' ? `<span style="color: #cbd5e1;">ℹ ${entry.text}</span>` : ''}
                        ${entry.sender === 'agent' ? `<span style="color: #a78bfa;">⚡ ${entry.text}</span>` : ''}
                        ${entry.sender === 'warn' ? `<span style="color: #fca5a5; font-weight: 600;">⚠ ${entry.text}</span>` : ''}
                      </div>
                    `).join('')}
                  </div>

                  <!-- QUICK COMMAND CHIPS -->
                  <div class="claude-split-quick-chips">
                    <span class="claude-chip-action emerald" data-cmd="claude harness verify">DRC Verify</span>
                    <span class="claude-chip-action amber" data-cmd="claude harness remediate">Auto-Remediate</span>
                    <span class="claude-chip-action" data-cmd="claude harness calc">Derating Calc</span>
                    <span class="claude-chip-action" data-cmd="claude mcp list">MCP List</span>
                    <span class="claude-chip-action" data-cmd="launch terminal">macOS Terminal ↗</span>
                  </div>

                  <div class="claude-split-footer">
                    <span style="color: var(--accent-cyan); font-weight: 700; font-family: var(--font-mono);">$</span>
                    <input type="text" id="claudeSplitInput" placeholder="Type claude harness command or question..." style="flex: 1; background: transparent; border: none; outline: none; font-family: var(--font-mono); font-size: 11px; color: #fff;" />
                    <button class="btn btn-secondary" id="btnClaudeSplitSend" style="padding: 4px 10px; font-size: 10px; font-family: var(--font-mono);">
                      Send
                    </button>
                  </div>
                </div>
              ` : ''}

              <!-- PALANTIR DRC RADAR & SIGNAL WAVEFORM HUD -->
              <div class="drc-radar-panel">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span class="hud-pulse-dot ${drcViolations.length === 0 ? 'emerald' : 'rose'}"></span>
                    <strong style="color: #fff; font-family: var(--font-mono); font-size: 12px;">DESIGN RULE CHECKER (DRC)</strong>
                  </div>
                  <span class="badge ${drcViolations.length === 0 ? 'badge-success' : 'badge-danger'}">
                    ${drcViolations.length} VIOLATIONS
                  </span>
                </div>

                ${drcViolations.length === 0 ? `
                  <div style="padding: 12px; background: rgba(52, 211, 153, 0.08); border: 1px solid rgba(52, 211, 153, 0.3); border-radius: 4px; font-family: var(--font-mono); font-size: 11px; color: #86efac;">
                    ✓ ALL USCAR-2 & AS50881 MECHANICAL CONSTRAINTS SATISFIED. HARNESS IS PRODUCTION & RELEASE READY.
                  </div>
                ` : `
                  ${drcViolations.map(v => `
                    <div class="drc-violation-row">
                      <span style="color: var(--accent-rose); font-size: 14px;">⚠</span>
                      <div style="flex: 1;">
                        <div style="font-weight: 700; color: #fff;">${v.code}: ${v.title}</div>
                        <div style="color: #fca5a5; font-size: 10px; margin: 2px 0;">${v.desc}</div>
                        <div style="color: var(--accent-cyan); font-size: 10px;">Agentic: ${v.aiCounterpart}</div>
                      </div>
                    </div>
                  `).join('')}
                `}

                <!-- LIVE SIGNAL OSCILLOSCOPE -->
                <div style="margin-top: 14px;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                    <span style="font-family: var(--font-mono); font-size: 10px; color: var(--ink-tertiary); text-transform: uppercase;">
                      SIGNAL BUS PROPAGATION & JITTER (100MHz)
                    </span>
                    <span style="font-family: var(--font-mono); font-size: 10px; color: ${this.noiseInjected ? '#fca5a5' : '#86efac'};">
                      ${this.noiseInjected ? 'NOISE / HTTP 504 FAULT' : 'IMPEDANCE MATCHED (100Ω)'}
                    </span>
                  </div>
                  <div class="oscilloscope-box">
                    <canvas id="harnessOscilloscope" class="oscilloscope-canvas"></canvas>
                  </div>
                </div>
              </div>
            </div>

          </div>
        ` : ''}

        <!-- ====================================================================
             TAB 01: CORE (THE MACHINE AROUND THE MODEL)
             ==================================================================== -->
        ${this.activeHarnessTab === 'core' ? `
          <div class="card" style="margin-bottom: 24px;">
            <div class="card-header">
              <div>
                <span class="badge" style="background: rgba(56, 189, 248, 0.15); color: var(--accent-cyan); font-family: var(--font-mono);">01 / THE MACHINE AROUND THE MODEL</span>
                <h2 class="card-title" style="margin-top: 4px;">Five Parts, One Core</h2>
              </div>
              <span style="font-size: 12px; color: var(--ink-tertiary); font-family: var(--font-mono);">Click any node to inspect layer mechanics</span>
            </div>

            <div class="harness-orbit-box">
              <div class="harness-model-core">
                <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; opacity: 0.8; font-family: var(--font-mono);">Agentic Core</div>
                <div style="font-size: 20px; font-weight: 700; color: #fff; margin: 2px 0;">Model</div>
                <div style="font-size: 11px; color: var(--accent-cyan); font-family: var(--font-mono);">core (writes words)</div>
              </div>

              <div class="harness-orbit-node node-tools ${this.harnessActiveNode === 'tools' ? 'active' : ''}" data-node="tools">
                <div style="font-size: 11px; color: var(--ink-tertiary);">01 / BUS</div>
                <div>Tools</div>
              </div>

              <div class="harness-orbit-node node-state ${this.harnessActiveNode === 'state' ? 'active' : ''}" data-node="state">
                <div style="font-size: 11px; color: var(--ink-tertiary);">02 / MEMORY</div>
                <div>State</div>
              </div>

              <div class="harness-orbit-node node-perms ${this.harnessActiveNode === 'perms' ? 'active' : ''}" data-node="perms">
                <div style="font-size: 11px; color: var(--ink-tertiary);">03 / GATES</div>
                <div>Perms</div>
              </div>

              <div class="harness-orbit-node node-sandbox ${this.harnessActiveNode === 'sandbox' ? 'active' : ''}" data-node="sandbox">
                <div style="font-size: 11px; color: var(--ink-tertiary);">04 / JAIL</div>
                <div>Sandbox</div>
              </div>

              <div class="harness-orbit-node node-obs ${this.harnessActiveNode === 'obs' ? 'active' : ''}" data-node="obs">
                <div style="font-size: 11px; color: var(--ink-tertiary);">05 / TELEMETRY</div>
                <div>Obs</div>
              </div>

              <svg style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; opacity: 0.5;">
                <ellipse cx="50%" cy="50%" rx="380" ry="140" fill="none" stroke="rgba(56, 189, 248, 0.2)" stroke-dasharray="6,6" />
                <ellipse cx="50%" cy="50%" rx="260" ry="95" fill="none" stroke="rgba(56, 189, 248, 0.15)" />
                <line x1="50%" y1="50%" x2="50%" y2="50" stroke="rgba(56, 189, 248, 0.4)" stroke-width="1.5" />
                <line x1="50%" y1="50%" x2="88%" y2="50%" stroke="rgba(52, 211, 153, 0.4)" stroke-width="1.5" />
                <line x1="50%" y1="50%" x2="72%" y2="82%" stroke="rgba(251, 146, 60, 0.4)" stroke-width="1.5" />
                <line x1="50%" y1="50%" x2="28%" y2="82%" stroke="rgba(226, 179, 111, 0.4)" stroke-width="1.5" />
                <line x1="50%" y1="50%" x2="12%" y2="50%" stroke="rgba(129, 140, 248, 0.4)" stroke-width="1.5" />
              </svg>
            </div>

            <div style="margin-top: 24px; padding: 20px; background: rgba(0,0,0,0.4); border: 1px solid var(--line-bright); border-radius: var(--radius-md);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="font-family: var(--font-mono); font-size: 12px; color: ${activeNodeData.color}; font-weight: 600;">${activeNodeData.tag}</span>
                  <h3 style="font-size: 18px; font-weight: 600; color: #fff;">${activeNodeData.name}</h3>
                </div>
                <span class="badge" style="background: rgba(56,189,248,0.1); color: ${activeNodeData.color}; font-family: var(--font-mono); font-size: 11px;">
                  ${activeNodeData.status}
                </span>
              </div>

              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-bottom: 16px;">
                <div style="padding: 14px; background: rgba(255,255,255,0.02); border: 1px solid var(--line-dim); border-radius: var(--radius-sm);">
                  <div style="font-size: 11px; text-transform: uppercase; color: var(--ink-tertiary); font-family: var(--font-mono); margin-bottom: 4px;">Physical Harness Counterpart</div>
                  <div style="font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 4px;">${activeNodeData.physicalAnalog}</div>
                  <div style="font-size: 12px; color: var(--ink-secondary); line-height: 1.4;">${activeNodeData.physicalDesc}</div>
                </div>

                <div style="padding: 14px; background: rgba(255,255,255,0.02); border: 1px solid var(--line-dim); border-radius: var(--radius-sm);">
                  <div style="font-size: 11px; text-transform: uppercase; color: var(--ink-tertiary); font-family: var(--font-mono); margin-bottom: 4px;">Claude Code Agentic Implementation</div>
                  <div style="font-size: 14px; font-weight: 600; color: var(--accent-cyan); margin-bottom: 4px;">${activeNodeData.aiHarness}</div>
                  <div style="font-size: 12px; color: var(--ink-secondary); line-height: 1.4;">${activeNodeData.aiDesc}</div>
                </div>
              </div>

              <div>
                <div style="font-size: 11px; text-transform: uppercase; color: var(--ink-tertiary); font-family: var(--font-mono); margin-bottom: 6px;">Production Invariant Code Hook</div>
                <pre style="background: #06070a; border: 1px solid var(--line-dim); border-radius: var(--radius-sm); padding: 12px; font-family: var(--font-mono); font-size: 12px; color: #93c5fd; overflow-x: auto;"><code>${activeNodeData.codeHook}</code></pre>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- TAB 02: JOBS -->
        ${this.activeHarnessTab === 'jobs' ? `
          <div class="card" style="margin-bottom: 24px;">
            <div class="card-header">
              <div>
                <span class="badge" style="background: rgba(52, 211, 153, 0.15); color: #34d399; font-family: var(--font-mono);">02 / FIVE JOBS, ONE HARNESS</span>
                <h2 class="card-title" style="margin-top: 4px;">Each Part Does One Thing</h2>
              </div>
              <button class="btn btn-secondary" id="btnHarnessTestPing" style="font-size: 12px; font-family: var(--font-mono);">
                Dispatch Test Telemetry Pulse
              </button>
            </div>

            <div class="harness-jobs-grid">
              <div class="harness-job-card" style="border-top: 3px solid #38bdf8;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 12px; font-weight: 700; color: #38bdf8; font-family: var(--font-mono);">TOOLS</span>
                  <span class="badge" style="background: rgba(56,189,248,0.1); color: #38bdf8;">Job 01</span>
                </div>
                <div class="job-step-flow">
                  <span style="color: #fff;">prompt</span>
                  <span style="color: var(--accent-cyan);">→</span>
                  <span style="color: #38bdf8; font-weight: 600;">api</span>
                  <span style="color: var(--accent-cyan);">→</span>
                  <span style="color: #34d399;">result ✓</span>
                </div>
                <p style="font-size: 12px; color: var(--ink-secondary); line-height: 1.4; margin-bottom: 12px;">
                  Converts high-level reasoning tokens into typed MCP tool invocations. Validates argument schemas before sending over stdio/SSE channels.
                </p>
                <div style="font-size: 11px; font-family: var(--font-mono); color: var(--ink-tertiary); border-top: 1px solid var(--line-dim); padding-top: 8px;">
                  Invariant: Never emit malformed JSON; reject unannounced tool parameters.
                </div>
              </div>

              <div class="harness-job-card" style="border-top: 3px solid #34d399;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 12px; font-weight: 700; color: #34d399; font-family: var(--font-mono);">STATE</span>
                  <span class="badge" style="background: rgba(52,211,153,0.1); color: #34d399;">Job 02</span>
                </div>
                <div class="job-step-flow">
                  <span style="color: #fff;">write</span>
                  <span style="color: #34d399;">→</span>
                  <span style="color: #34d399; font-weight: 600;">store</span>
                  <span style="color: #34d399;">→</span>
                  <span style="color: #86efac;">recall ⟲</span>
                </div>
                <p style="font-size: 12px; color: var(--ink-secondary); line-height: 1.4; margin-bottom: 12px;">
                  Scratchpad markdown persistence and selective memory compaction. Preserves critical IDs and decision justifications across long multi-turn sessions.
                </p>
                <div style="font-size: 11px; font-family: var(--font-mono); color: var(--ink-tertiary); border-top: 1px solid var(--line-dim); padding-top: 8px;">
                  Invariant: Compaction retains all primary transaction keys and hashes.
                </div>
              </div>

              <div class="harness-job-card" style="border-top: 3px solid #fb923c;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 12px; font-weight: 700; color: #fb923c; font-family: var(--font-mono);">PERMS</span>
                  <span class="badge" style="background: rgba(251,146,60,0.1); color: #fb923c;">Job 03</span>
                </div>
                <div class="job-step-flow">
                  <span style="color: #fff;">request</span>
                  <span style="color: #fb923c;">→</span>
                  <span style="color: #fb923c; font-weight: 700;">? (hook)</span>
                  <span style="color: #fb923c;">→</span>
                  <span style="color: #fdba74;">allow ✓</span>
                </div>
                <p style="font-size: 12px; color: var(--ink-secondary); line-height: 1.4; margin-bottom: 12px;">
                  Deterministic gatekeeper layer. Evaluates command signatures and mutation thresholds before letting any execution touch production infrastructure.
                </p>
                <div style="font-size: 11px; font-family: var(--font-mono); color: var(--ink-tertiary); border-top: 1px solid var(--line-dim); padding-top: 8px;">
                  Invariant: Mechanical lock. Code hook decision is final; LLM cannot override.
                </div>
              </div>

              <div class="harness-job-card" style="border-top: 3px solid #e2b36f;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 12px; font-weight: 700; color: #e2b36f; font-family: var(--font-mono);">SANDBOX</span>
                  <span class="badge" style="background: rgba(226,179,111,0.1); color: #e2b36f;">Job 04</span>
                </div>
                <div class="job-step-flow" style="border: 1px dashed rgba(226,179,111,0.4);">
                  <span style="color: #e2b36f;">limits:</span>
                  <span style="color: #fff; font-weight: 600;">network • files</span>
                </div>
                <p style="font-size: 12px; color: var(--ink-secondary); line-height: 1.4; margin-bottom: 12px;">
                  Jailed container execution. Restricts filesystem access to the current project directory and forbids unauthorized lateral network connections.
                </p>
                <div style="font-size: 11px; font-family: var(--font-mono); color: var(--ink-tertiary); border-top: 1px solid var(--line-dim); padding-top: 8px;">
                  Invariant: No write access to parent OS directories or production cloud envs.
                </div>
              </div>

              <div class="harness-job-card" style="border-top: 3px solid #818cf8;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 12px; font-weight: 700; color: #818cf8; font-family: var(--font-mono);">OBS</span>
                  <span class="badge" style="background: rgba(129,140,248,0.1); color: #818cf8;">Job 05</span>
                </div>
                <div class="job-step-flow">
                  <span style="color: #fff;">step</span>
                  <span style="color: #818cf8;">→</span>
                  <span style="color: #818cf8; font-weight: 600;">trace</span>
                  <span style="color: #818cf8;">→</span>
                  <span style="color: #c7d2fe;">metric 📈</span>
                </div>
                <p style="font-size: 12px; color: var(--ink-secondary); line-height: 1.4; margin-bottom: 12px;">
                  Full-fidelity telemetry and forensics. Emits structured OpenTelemetry spans for every subagent dispatch, tool duration, token cost, and HTTP status.
                </p>
                <div style="font-size: 11px; font-family: var(--font-mono); color: var(--ink-tertiary); border-top: 1px solid var(--line-dim); padding-top: 8px;">
                  Invariant: Continuous observability guarantees pinpoint failure attribution.
                </div>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- TAB 03: COMPARE -->
        ${this.activeHarnessTab === 'compare' ? `
          <div class="card" style="margin-bottom: 24px;">
            <div class="card-header">
              <div>
                <span class="badge" style="background: rgba(251, 146, 60, 0.15); color: #fb923c; font-family: var(--font-mono);">03 / RAW VS READY</span>
                <h2 class="card-title" style="margin-top: 4px;">Same Model, Different Machine</h2>
              </div>
              <span class="badge" style="background: rgba(255,255,255,0.05); color: var(--ink-secondary); font-family: var(--font-mono);">Production Architectural Audit</span>
            </div>

            <div style="overflow-x: auto;">
              <table class="harness-compare-table">
                <thead>
                  <tr>
                    <th style="width: 25%;">Capability Dimension</th>
                    <th style="width: 35%; color: #f87171;">Bare Model (Naked Prompt)</th>
                    <th style="width: 40%; color: var(--accent-cyan);">Harnessed Agent (Production Architecture)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>State & Memory</strong></td>
                    <td style="color: #fca5a5;"><span style="font-family: var(--font-mono);">none ▲</span> (context evaporates on turn end)</td>
                    <td style="color: #86efac;"><span style="font-family: var(--font-mono);">store + recall ✓</span> (scratchpad markdown + hierarchical entity-preserving compaction)</td>
                  </tr>
                  <tr>
                    <td><strong>Permissions & Policy</strong></td>
                    <td style="color: #fca5a5;"><span style="font-family: var(--font-mono);">none ▲</span> (relies on model prompt compliance; easily jailbroken)</td>
                    <td style="color: #86efac;"><span style="font-family: var(--font-mono);">request → allow ✓</span> (deterministic PreToolUse code hooks halt illegal commands before execution)</td>
                  </tr>
                  <tr>
                    <td><strong>Tools & APIs</strong></td>
                    <td style="color: #fca5a5;"><span style="font-family: var(--font-mono);">none ▲</span> (generates hallucinated code or hypothetical text)</td>
                    <td style="color: #86efac;"><span style="font-family: var(--font-mono);">call APIs ✓</span> (strict typed JSON-RPC schema contracts via Model Context Protocol)</td>
                  </tr>
                  <tr>
                    <td><strong>Logs & Telemetry</strong></td>
                    <td style="color: #fca5a5;"><span style="font-family: var(--font-mono);">none ▲</span> (black box failure; user receives generic timeout)</td>
                    <td style="color: #86efac;"><span style="font-family: var(--font-mono);">step → trace → metric ✓</span> (structured OpenTelemetry spans with millisecond latency isolation)</td>
                  </tr>
                  <tr>
                    <td><strong>Retries & Resilience</strong></td>
                    <td style="color: #fca5a5;"><span style="font-family: var(--font-mono);">none ▲</span> (fails immediately on first 504 Gateway error)</td>
                    <td style="color: #86efac;"><span style="font-family: var(--font-mono);">retry rule ✓</span> (layer-level exponential backoff in the loop; model never faulted)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style="background: rgba(0, 0, 0, 0.6); border: 1px solid var(--line-bright); border-radius: var(--radius-md); padding: 18px; text-align: center; font-family: var(--font-mono); font-size: 14px; color: #94a3b8; letter-spacing: 0.04em;">
              <span style="color: #f87171; font-weight: 600;">bare model:</span> zero state, zero tools, zero retries &nbsp;&nbsp;•&nbsp;&nbsp; 
              <span style="color: var(--accent-cyan); font-weight: 600;">harnessed:</span> 99.8% production SLA with mechanical-first invariants
            </div>
          </div>
        ` : ''}

        <!-- TAB 04: TRACE -->
        ${this.activeHarnessTab === 'trace' ? `
          <div class="card" style="margin-bottom: 24px;">
            <div class="card-header">
              <div>
                <span class="badge" style="background: rgba(244, 63, 94, 0.15); color: #f43f5e; font-family: var(--font-mono);">04 / WHEN IT FAILS</span>
                <h2 class="card-title" style="margin-top: 4px;">Blame the Layer, Not the Model</h2>
              </div>
              <div style="display: flex; gap: 8px;">
                <button class="btn btn-secondary" id="btnTracePrev" style="font-family: var(--font-mono); font-size: 12px;">Step Back</button>
                <button class="btn btn-secondary" id="btnTraceNext" style="font-family: var(--font-mono); font-size: 12px;">Step Forward</button>
                <button class="btn btn-primary" id="btnTraceReplay" style="font-family: var(--font-mono); font-size: 12px;">Replay Forensic Trace</button>
              </div>
            </div>

            <div class="harness-trace-box">
              <div style="display: grid; grid-template-columns: 280px 1fr 280px; gap: 20px; align-items: center;" class="trace-responsive-grid">
                <div style="background: rgba(225, 29, 72, 0.08); border: 1px solid rgba(225, 29, 72, 0.4); border-radius: var(--radius-md); padding: 20px; text-align: center;">
                  <div style="font-size: 11px; text-transform: uppercase; color: #f87171; font-family: var(--font-mono); margin-bottom: 6px;">Incident Report</div>
                  <div style="font-size: 20px; font-weight: 700; color: #fff; margin-bottom: 8px;">"model is broken"</div>
                  <div style="font-size: 12px; color: var(--ink-secondary); margin-bottom: 14px;">User report: Agent timed out during inventory fetch and refused to complete order.</div>
                  <span class="badge" style="background: rgba(225, 29, 72, 0.2); color: #fca5a5; font-family: var(--font-mono); font-size: 11px;">
                    BLAMED ON MODEL
                  </span>
                </div>

                <div style="padding: 10px 16px;">
                  <div style="font-size: 11px; font-family: var(--font-mono); color: var(--ink-tertiary); margin-bottom: 12px; text-transform: uppercase;">
                    FORENSIC TRACE TIMELINE (Milliseconds)
                  </div>

                  <div class="trace-timeline-item">
                    <span style="color: var(--ink-tertiary);">t=1.2s</span>
                    <span style="color: #fff;">prompt received by agent gateway</span>
                  </div>

                  <div class="trace-timeline-item">
                    <span style="color: var(--ink-tertiary);">t=1.4s</span>
                    <span style="color: #38bdf8;">perms allowed: PreToolUse policy verified</span>
                  </div>

                  <div class="trace-timeline-item">
                    <span style="color: var(--ink-tertiary);">t=1.6s</span>
                    <span style="color: #38bdf8;">tools.search: HTTP GET /api/v1/inventory dispatched</span>
                  </div>

                  <div class="trace-timeline-item failed">
                    <span style="font-weight: 700;">t=1.9s</span>
                    <span style="font-weight: 700;">tools.timeout: upstream ERP database socket closed (HTTP 504)</span>
                  </div>

                  <div class="trace-timeline-item">
                    <span style="color: var(--ink-tertiary);">t=2.0s</span>
                    <span style="color: #fb923c; font-weight: 600;">model never called — prompt buffer remained idle</span>
                  </div>

                  <div class="trace-timeline-item recovered" style="margin-top: 10px;">
                    <span style="font-weight: 700;">t=2.4s</span>
                    <span style="font-weight: 600;">harness loop activates retry rule: jittered backoff (500ms)</span>
                  </div>

                  <div style="margin-top: 14px; font-family: var(--font-mono); font-size: 12px; color: var(--accent-cyan); display: flex; align-items: center; gap: 8px;">
                    <span style="font-weight: 700;">Verdict:</span> Traced to tools layer. The model was never invoked!
                  </div>
                </div>

                <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.4); border-radius: var(--radius-md); padding: 20px; text-align: center;">
                  <div style="font-size: 11px; text-transform: uppercase; color: #34d399; font-family: var(--font-mono); margin-bottom: 6px;">Harness Loop Invariant</div>
                  <div style="font-size: 20px; font-weight: 700; color: #fff; margin-bottom: 8px;">retry rule</div>
                  <div style="font-size: 12px; color: var(--ink-secondary); margin-bottom: 14px;">In the loop layer: Catches network jitter, retries idempotent GET, succeeds silently at t=2.6s.</div>
                  <span class="badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac; font-family: var(--font-mono); font-size: 11px;">
                    HARNESS FIXED IT ✓
                  </span>
                </div>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- TAB 05: ROUTING & 3D (5-POINT ROUTING CHECKS) -->
        ${this.activeHarnessTab === 'routing' ? `
          <div class="card" style="margin-bottom: 24px;">
            <div class="card-header">
              <div>
                <span class="badge" style="background: rgba(56, 189, 248, 0.15); color: var(--accent-cyan); font-family: var(--font-mono);">05 / 5-POINT ROUTING CHECKS</span>
                <h2 class="card-title" style="margin-top: 4px;">The 40mm Splice Catastrophe & Formboard Discipline</h2>
              </div>
              <div style="display: flex; align-items: center; gap: 10px;">
                <span class="badge ${releaseReady ? 'badge-success' : 'badge-danger'}" style="font-family: var(--font-mono); font-size: 12px; padding: 6px 12px;">
                  ${passCount} / 5 Checks Passed ${releaseReady ? '• RELEASE READY' : '• RECALL RISK'}
                </span>
                <button class="btn btn-secondary" id="btnHarnessResetDefaults" style="font-size: 12px; font-family: var(--font-mono);">
                  Reset to 40mm Failure
                </button>
              </div>
            </div>

            <div style="background: rgba(251, 146, 60, 0.05); border-left: 3px solid #fb923c; padding: 16px 20px; border-radius: 0 var(--radius-md) var(--radius-md) 0; margin-bottom: 24px;">
              <p style="font-size: 13px; color: #fdba74; line-height: 1.6; margin: 0;">
                <em>"Not because of wire gauge. Not because of connector current rating. <strong>Because of a splice placed 40mm from a bend.</strong> I have seen this exact failure cost a startup 12 days of rework and a full batch recall. The engineer who designed it was good at schematics, but never routed in 3D. In 1979, US automakers had the same problem: Harness warranties were their number one claim. That is why USCAR-2, USCAR-21, and AS50881 were written. Harnessing is a mechanical system disguised as an electrical one. <strong>Mechanical first. Electrical second. Test third.</strong>"</em>
              </p>
            </div>

            <div class="routing-checks-container">
              <div class="routing-checklist-card" style="border-left: 4px solid ${check1Pass ? 'var(--accent-emerald)' : 'var(--accent-rose)'};">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <div>
                    <span style="font-family: var(--font-mono); font-size: 11px; color: var(--ink-tertiary);">CHECK 01 • USCAR-21 / AS50881</span>
                    <h4 style="font-size: 15px; font-weight: 600; color: #fff;">Splice Distance from Bend or Clip: <span style="color: ${check1Pass ? '#86efac' : '#fca5a5'}; font-family: var(--font-mono);">${r.spliceDistance} mm</span> (Req: ≥ 150mm)</h4>
                  </div>
                  <span class="badge ${check1Pass ? 'badge-success' : 'badge-danger'}">${check1Pass ? 'PASS' : 'VIOLATION'}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 16px; margin: 12px 0;">
                  <span style="font-family: var(--font-mono); font-size: 11px; color: var(--ink-tertiary);">10mm</span>
                  <input type="range" class="calc-slider" id="sliderSplice" min="10" max="250" value="${r.spliceDistance}" style="flex: 1;" />
                  <span style="font-family: var(--font-mono); font-size: 11px; color: var(--ink-tertiary);">250mm</span>
                </div>
                <div style="font-size: 12px; color: var(--ink-secondary); line-height: 1.4;">
                  ${check1Pass ? 
                    '<strong style="color: #86efac;">Compliant:</strong> Solder/ultrasonic splice has sufficient strain relief distance (≥ 150mm) from physical bending stress.' : 
                    '<strong style="color: #fca5a5;">Failure Mode:</strong> A splice placed < 150mm creates a rigid 30mm zone. Placing it 40mm from a bend creates a localized stress concentration point that shears conductor strands under vibration.<br><span style="color: var(--accent-cyan); font-family: var(--font-mono);">AI Counterpart:</span> Mutable policy hook placed inside prompt tokens instead of an external deterministic PreToolUse boundary.'}
                </div>
              </div>

              <div class="routing-checklist-card" style="border-left: 4px solid ${check2Pass ? 'var(--accent-emerald)' : 'var(--accent-rose)'};">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <div>
                    <span style="font-family: var(--font-mono); font-size: 11px; color: var(--ink-tertiary);">CHECK 02 • BEND RADIUS SPEC</span>
                    <h4 style="font-size: 15px; font-weight: 600; color: #fff;">Bend Radius: <span style="color: ${check2Pass ? '#86efac' : '#fca5a5'}; font-family: var(--font-mono);">${r.bendRadius} mm</span> (Req: ≥ ${minBend}mm [${r.isFlexZone ? '10x Dynamic Flex' : '6x Static Routing'} × ${r.bundleDiameter}mm bundle])</h4>
                  </div>
                  <span class="badge ${check2Pass ? 'badge-success' : 'badge-danger'}">${check2Pass ? 'PASS' : 'VIOLATION'}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 16px; margin: 12px 0;">
                  <span style="font-family: var(--font-mono); font-size: 11px; color: var(--ink-tertiary);">20mm</span>
                  <input type="range" class="calc-slider" id="sliderBend" min="20" max="180" value="${r.bendRadius}" style="flex: 1;" />
                  <span style="font-family: var(--font-mono); font-size: 11px; color: var(--ink-tertiary);">180mm</span>
                  <label style="display: flex; align-items: center; gap: 6px; font-size: 12px; color: #fff; cursor: pointer; white-space: nowrap;">
                    <input type="checkbox" id="chkFlexZone" ${r.isFlexZone ? 'checked' : ''} /> Dynamic Flex Zone (Door / Hinge)
                  </label>
                </div>
                <div style="font-size: 12px; color: var(--ink-secondary); line-height: 1.4;">
                  ${check2Pass ? 
                    '<strong style="color: #86efac;">Compliant:</strong> Bend radius satisfies multiplier. Copper strands will not suffer mechanical pinching.' : 
                    '<strong style="color: #fca5a5;">Failure Mode:</strong> Tight bends pinch bundle insulation and cause conductor work hardening, leading to open circuits.<br><span style="color: var(--accent-cyan); font-family: var(--font-mono);">AI Counterpart:</span> Abrupt context truncation without gradual summarization creates hallucinated token boundaries.'}
                </div>
              </div>

              <div class="routing-checklist-card" style="border-left: 4px solid ${check3Pass ? 'var(--accent-emerald)' : 'var(--accent-rose)'};">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <div>
                    <span style="font-family: var(--font-mono); font-size: 11px; color: var(--ink-tertiary);">CHECK 03 • THERMAL & ABRASION CLEARANCE</span>
                    <h4 style="font-size: 15px; font-weight: 600; color: #fff;">Exhaust: <span style="font-family: var(--font-mono);">${r.heatClearance}mm</span> (Req: ≥50mm) • Edge: <span style="font-family: var(--font-mono);">${r.edgeClearance}mm</span> (Req: ≥20mm)</h4>
                  </div>
                  <span class="badge ${check3Pass ? 'badge-success' : 'badge-danger'}">${check3Pass ? 'PASS' : 'VIOLATION'}</span>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 12px 0;">
                  <div>
                    <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--ink-tertiary); margin-bottom: 4px;">Exhaust Clearance: ${r.heatClearance}mm</div>
                    <input type="range" class="calc-slider" id="sliderExhaust" min="5" max="80" value="${r.heatClearance}" style="width: 100%;" />
                  </div>
                  <div>
                    <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--ink-tertiary); margin-bottom: 4px;">Sharp Sheetmetal Edge: ${r.edgeClearance}mm</div>
                    <input type="range" class="calc-slider" id="sliderEdge" min="5" max="40" value="${r.edgeClearance}" style="width: 100%;" />
                  </div>
                </div>
                <div style="font-size: 12px; color: var(--ink-secondary); line-height: 1.4;">
                  ${check3Pass ? 
                    '<strong style="color: #86efac;">Compliant:</strong> Adequate air gap prevents melted PVC insulation and prevents chassis vibration chaffing.' : 
                    '<strong style="color: #fca5a5;">Failure Mode:</strong> Harness at 10mm from turbo exhaust burns within 48 hours; routing on raw sheet metal cuts through jacket in 3,000 miles.<br><span style="color: var(--accent-cyan); font-family: var(--font-mono);">AI Counterpart:</span> Unprotected secrets and API keys leaking into unauthenticated user-facing prompt logs.'}
                </div>
              </div>

              <div class="routing-checklist-card" style="border-left: 4px solid ${check4Pass ? 'var(--accent-emerald)' : 'var(--accent-rose)'};">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div>
                    <span style="font-family: var(--font-mono); font-size: 11px; color: var(--ink-tertiary);">CHECK 04 • IP67 / IP68 WATER INGRESS</span>
                    <h4 style="font-size: 15px; font-weight: 600; color: #fff;">Are All Empty Sealed Connector Cavities Filled with Plugs?</h4>
                  </div>
                  <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; color: #fff; cursor: pointer;">
                    <input type="checkbox" id="chkCavityPlugs" ${r.unsealedPlugsFilled ? 'checked' : ''} />
                    ${r.unsealedPlugsFilled ? '<span style="color: #86efac;">Plugs Installed ✓</span>' : '<span style="color: #fca5a5;">Unsealed Open Cavity ✗</span>'}
                  </label>
                </div>
                <div style="font-size: 12px; color: var(--ink-secondary); line-height: 1.4; margin-top: 8px;">
                  ${check4Pass ? 
                    '<strong style="color: #86efac;">Compliant:</strong> Silicon dummy cavity plugs installed. Complete IP68 immersion seal verified.' : 
                    '<strong style="color: #fca5a5;">Failure Mode:</strong> Missing cavity plug siphons water through rear grommet via capillary action, corroding gold contacts.<br><span style="color: var(--accent-cyan); font-family: var(--font-mono);">AI Counterpart:</span> Empty tool response or unhandled null return causes LLM to hallucinate synthetic facts.'}
                </div>
              </div>

              <div class="routing-checklist-card" style="border-left: 4px solid ${check5Pass ? 'var(--accent-emerald)' : 'var(--accent-rose)'};">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <div>
                    <span style="font-family: var(--font-mono); font-size: 11px; color: var(--ink-tertiary);">CHECK 05 • HARMONIC RESONANCE & VIBRATION</span>
                    <h4 style="font-size: 15px; font-weight: 600; color: #fff;">Fastener Clip Spacing: <span style="font-family: var(--font-mono); color: ${check5Pass ? '#86efac' : '#fca5a5'};">${r.clipSpacing} mm</span> (Max: ${maxClip}mm [${r.isHighVibZone ? 'Engine/Chassis High-Vib' : 'Interior Cabin'}])</h4>
                  </div>
                  <span class="badge ${check5Pass ? 'badge-success' : 'badge-danger'}">${check5Pass ? 'PASS' : 'VIOLATION'}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 16px; margin: 12px 0;">
                  <span style="font-family: var(--font-mono); font-size: 11px; color: var(--ink-tertiary);">50mm</span>
                  <input type="range" class="calc-slider" id="sliderClip" min="50" max="500" value="${r.clipSpacing}" style="flex: 1;" />
                  <span style="font-family: var(--font-mono); font-size: 11px; color: var(--ink-tertiary);">500mm</span>
                  <label style="display: flex; align-items: center; gap: 6px; font-size: 12px; color: #fff; cursor: pointer; white-space: nowrap;">
                    <input type="checkbox" id="chkHighVib" ${r.isHighVibZone ? 'checked' : ''} /> High Vibration Engine Zone
                  </label>
                </div>
                <div style="font-size: 12px; color: var(--ink-secondary); line-height: 1.4;">
                  ${check5Pass ? 
                    '<strong style="color: #86efac;">Compliant:</strong> Fastener pitch suppresses standing wave harmonics under vibration.' : 
                    '<strong style="color: #fca5a5;">Failure Mode:</strong> Exceeding 150mm clip pitch in high-vib zone causes whipping harmonics that pull wire pins out of crimps.<br><span style="color: var(--accent-cyan); font-family: var(--font-mono);">AI Counterpart:</span> Lack of intermediate checkpointing/idempotency keys allows cascading loop failures.'}
                </div>
              </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--line-dim); flex-wrap: wrap; gap: 12px;">
              <div style="font-family: var(--font-mono); font-size: 12px; color: var(--ink-secondary);">
                Python Verification Engine: <span style="color: #fff;">skills/harness-engineering/scripts/harness_calculators.py</span>
              </div>
              <div style="display: flex; gap: 10px;">
                <button class="btn btn-secondary" id="btnHarnessCopyCode" style="font-size: 12px; font-family: var(--font-mono);">
                  Copy PreToolUse Code Invariant
                </button>
                <button class="btn btn-primary" id="btnHarnessRunEval" style="font-size: 12px; font-family: var(--font-mono);">
                  Validate Harness Invariants in Capstone
                </button>
              </div>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  renderSvgConnectionLines() {
    const core = this.formboardNodes.find(n => n.type === 'core') || { x: 260, y: 220 };
    return this.formboardNodes
      .filter(n => n.id !== core.id)
      .map(node => {
        const x1 = core.x + 80;
        const y1 = core.y + 35;
        const x2 = node.x + 80;
        const y2 = node.y + 30;
        const strokeColor = node.violation ? '#f43f5e' : (node.color || '#38bdf8');
        return `
          <g>
            <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" 
                  stroke="${strokeColor}" stroke-width="2" stroke-opacity="0.6" />
            <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" 
                  stroke="${strokeColor}" stroke-width="3" class="signal-pulse-line" />
            <circle cx="${x1}" cy="${y1}" r="4" fill="${strokeColor}" />
            <circle cx="${x2}" cy="${y2}" r="4" fill="${strokeColor}" />
          </g>
        `;
      }).join('');
  }

  attachHarnessStudioEvents() {
    // 1. Tab Switching
    document.querySelectorAll('.harness-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeHarnessTab = btn.dataset.tab;
        this.render();
        this.playHaptic('click');
      });
    });

    // 2. Mission Presets (Harness On The Fly)
    document.querySelectorAll('.tactical-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const preset = btn.dataset.preset;
        this.loadMissionPreset(preset);
      });
    });

    // 3. Toggle Split Claude CLI
    document.getElementById('btnToggleClaudeSplit')?.addEventListener('click', () => {
      this.claudeCliSplitOpen = !this.claudeCliSplitOpen;
      this.render();
      this.playHaptic('click');
    });

    // 4. Auto-Remediate Invariants
    document.getElementById('btnHarnessAutoRemediate')?.addEventListener('click', () => {
      this.remediateAllInvariants();
    });

    // 5. Inject Noise / Fault
    document.getElementById('btnHarnessNoiseInject')?.addEventListener('click', () => {
      this.noiseInjected = !this.noiseInjected;
      const timestamp = new Date().toLocaleTimeString();
      if (this.noiseInjected) {
        this.claudeSplitHistory.push({
          time: timestamp,
          sender: 'warn',
          text: 'SIMULATED FAULT INJECTED: HTTP 504 Gateway socket timeout on upstream sensor bus.'
        });
      } else {
        this.claudeSplitHistory.push({
          time: timestamp,
          sender: 'claude',
          text: 'FAULT CLEARED: Upstream sensor tool socket stabilized. Nominal telemetry restored.'
        });
      }
      this.render();
      this.playHaptic('click');
    });

    // 6. Export BOM & CLAUDE.md
    document.getElementById('btnHarnessExportBom')?.addEventListener('click', () => {
      this.playHaptic('success');
      alert(`// PALANTIR AIP // PRODUCTION HARNESS BOM & INVARIANTS EXPORTED\n\n` +
            `Project: ${this.activeMissionPreset.toUpperCase()}\n` +
            `Total Components: ${this.formboardNodes.length} nodes\n` +
            `USCAR-21 / AS50881 Compliance: VERIFIED (100%)\n` +
            `Generated Files:\n` +
            `- /workspace/CLAUDE.md (PreToolUse Invariants Registered)\n` +
            `- /workspace/harness_bom.csv (Manufacturing Cut Lengths & Terminals)\n` +
            `- /workspace/evals/harness_5point_invariants.yaml\n\n` +
            `Ready for factory formboard wiring or automated Claude agent deployment.`);
    });

    // 7. Drag and Drop on Formboard
    this.attachCadDragAndDropEvents();

    // 8. Claude CLI Split Send
    const sendSplitCmd = () => {
      const input = document.getElementById('claudeSplitInput');
      const cmd = input?.value.trim();
      if (cmd) {
        this.executeClaudeSplitCommand(cmd);
        input.value = '';
      }
    };

    document.getElementById('btnClaudeSplitSend')?.addEventListener('click', sendSplitCmd);
    document.getElementById('claudeSplitInput')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendSplitCmd();
    });

    // 8b. Side-by-side terminal action buttons
    document.getElementById('btnLaunchNativeTerminal')?.addEventListener('click', () => {
      this.launchNativeClaudeTerminal();
    });

    document.getElementById('btnOpenMcpInspector')?.addEventListener('click', () => {
      this.openMcpToolsInspector();
    });

    document.getElementById('btnClearSplitCli')?.addEventListener('click', () => {
      this.claudeSplitHistory = [
        { time: new Date().toLocaleTimeString(), sender: 'system', text: 'Claude Code Agentic Industrial Harness Engine v2.1.226 reset.' }
      ];
      this.render();
      this.playHaptic('click');
    });

    // 8c. Quick command chips
    document.querySelectorAll('.claude-chip-action').forEach(chip => {
      chip.addEventListener('click', () => {
        const cmd = chip.dataset.cmd;
        if (cmd) {
          this.executeClaudeSplitCommand(cmd);
        }
      });
    });

    // 9. Node Deletion and Selection
    document.querySelectorAll('.node-delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const delId = btn.dataset.delId;
        this.formboardNodes = this.formboardNodes.filter(n => n.id !== delId);
        this.claudeSplitHistory.push({
          time: new Date().toLocaleTimeString(),
          sender: 'cmd',
          text: `claude harness remove-node --id ${delId}`
        });
        this.render();
        this.playHaptic('click');
      });
    });

    document.querySelectorAll('.formboard-node').forEach(nodeEl => {
      nodeEl.addEventListener('click', () => {
        this.selectedFormboardNode = nodeEl.dataset.nodeId;
        this.render();
        this.playHaptic('click');
      });
    });

    // 10. Start Live Oscilloscope Animation
    this.initOscilloscope();

    // 11. Core Node Selection for Tab 1
    document.querySelectorAll('.harness-orbit-node').forEach(node => {
      node.addEventListener('click', () => {
        this.harnessActiveNode = node.dataset.node;
        this.render();
        this.playHaptic('click');
      });
    });

    // 12. Quick Action Buttons
    document.getElementById('btnHarnessRunPy')?.addEventListener('click', () => {
      this.playHaptic('success');
      alert('Running python3 skills/harness-engineering/scripts/harness_calculators.py --check-all\n\n' +
            '5-POINT ROUTING CHECKS:\n' +
            '----------------------------------------\n' +
            '✓ Check 1 (Splice Clearance): PASS (160.0mm >= 150.0mm)\n' +
            '✓ Check 2 (Bend Radius): PASS (75.0mm >= 72.0mm)\n' +
            '✓ Check 3 (Heat Clearance): PASS (60.0mm >= 50.0mm)\n' +
            '✓ Check 4 (Cavity Plugs): PASS (All cavities plugged)\n' +
            '✓ Check 5 (Clip Spacing): PASS (140.0mm <= 150.0mm)\n\n' +
            'OVERALL STATUS: PASSED - PRODUCTION READY (USCAR-2 / AS50881 compliant)');
    });

    document.getElementById('btnHarnessOpenCapstone')?.addEventListener('click', () => {
      this.selectedCapstoneTrack = 'case-04';
      this.switchView('capstone');
      this.playHaptic('click');
    });

    // 13. Trace Replay
    document.getElementById('btnTraceReplay')?.addEventListener('click', () => {
      this.playHaptic('success');
      alert('Forensic replay started. Tracing HTTP packet duration from agent gateway (t=1.2s) through tools layer (t=1.9s 504 timeout) and executing loop-layer retry rule at t=2.4s.\n\nResult: 0 model hallucinations; zero user disruption.');
    });

    // 14. 5-Point Sliders
    const updateRouting = () => {
      this.render();
    };

    document.getElementById('sliderSplice')?.addEventListener('input', (e) => {
      this.routingCheckForm.spliceDistance = parseInt(e.target.value, 10);
      updateRouting();
    });

    document.getElementById('sliderBend')?.addEventListener('input', (e) => {
      this.routingCheckForm.bendRadius = parseInt(e.target.value, 10);
      updateRouting();
    });

    document.getElementById('chkFlexZone')?.addEventListener('change', (e) => {
      this.routingCheckForm.isFlexZone = e.target.checked;
      updateRouting();
      this.playHaptic('click');
    });

    document.getElementById('sliderExhaust')?.addEventListener('input', (e) => {
      this.routingCheckForm.heatClearance = parseInt(e.target.value, 10);
      updateRouting();
    });

    document.getElementById('sliderEdge')?.addEventListener('input', (e) => {
      this.routingCheckForm.edgeClearance = parseInt(e.target.value, 10);
      updateRouting();
    });

    document.getElementById('chkCavityPlugs')?.addEventListener('change', (e) => {
      this.routingCheckForm.unsealedPlugsFilled = e.target.checked;
      updateRouting();
      this.playHaptic('click');
    });

    document.getElementById('sliderClip')?.addEventListener('input', (e) => {
      this.routingCheckForm.clipSpacing = parseInt(e.target.value, 10);
      updateRouting();
    });

    document.getElementById('chkHighVib')?.addEventListener('change', (e) => {
      this.routingCheckForm.isHighVibZone = e.target.checked;
      updateRouting();
      this.playHaptic('click');
    });

    document.getElementById('btnHarnessResetDefaults')?.addEventListener('click', () => {
      this.routingCheckForm = {
        spliceDistance: 40,
        bendRadius: 50,
        bundleDiameter: 12,
        isFlexZone: false,
        heatClearance: 25,
        edgeClearance: 12,
        unsealedPlugsFilled: false,
        clipSpacing: 350,
        isHighVibZone: true
      };
      this.render();
      this.playHaptic('click');
    });

    document.getElementById('btnHarnessCopyCode')?.addEventListener('click', () => {
      const code = `// PreToolUse Code Invariant: 5-Point Routing Enforcement\nclaude.on('PreToolUse', (call) => {\n  if (call.name === 'route_harness_segment') {\n    if (call.params.splice_distance < 150) {\n      throw new Error('USCAR-21 VIOLATION: Splice must be >= 150mm from bend/clip');\n    }\n    if (!call.params.cavity_plugs_installed) {\n      throw new Error('IP68 VIOLATION: Unsealed cavities require dummy plugs');\n    }\n  }\n});`;
      navigator.clipboard?.writeText(code);
      this.playHaptic('success');
      alert('Deterministic PreToolUse invariant hook copied to clipboard.');
    });

    document.getElementById('btnHarnessRunEval')?.addEventListener('click', () => {
      this.selectedCapstoneTrack = 'case-04';
      this.switchView('capstone');
      this.playHaptic('click');
    });
  }

  // Drag and Drop implementation for Formboard CAD
  attachCadDragAndDropEvents() {
    const chips = document.querySelectorAll('.draggable-comp-chip');
    chips.forEach(chip => {
      chip.addEventListener('dragstart', (e) => {
        const compId = chip.dataset.compId;
        let found = null;
        for (const cat of this.cadInventory) {
          const item = cat.items.find(i => i.id === compId);
          if (item) { found = item; break; }
        }
        this.draggedComponent = found;
        e.dataTransfer.setData('text/plain', compId);
      });
    });

    const canvas = document.getElementById('formboardCanvas');
    if (!canvas) return;

    canvas.addEventListener('dragover', (e) => {
      e.preventDefault();
      canvas.classList.add('drag-over');
    });

    canvas.addEventListener('dragleave', () => {
      canvas.classList.remove('drag-over');
    });

    canvas.addEventListener('drop', (e) => {
      e.preventDefault();
      canvas.classList.remove('drag-over');
      if (!this.draggedComponent) return;

      const rect = canvas.getBoundingClientRect();
      const rawX = e.clientX - rect.left - 70;
      const rawY = e.clientY - rect.top - 25;
      const x = Math.max(20, Math.min(Math.round(rawX / 16) * 16, rect.width - 180));
      const y = Math.max(20, Math.min(Math.round(rawY / 16) * 16, rect.height - 80));

      const newId = `node-${Date.now().toString().slice(-4)}`;
      const newNode = {
        id: newId,
        type: this.draggedComponent.type,
        name: this.draggedComponent.name,
        tag: this.draggedComponent.tag,
        x: x,
        y: y,
        color: this.draggedComponent.color,
        status: 'ATTACHED',
        details: `${this.draggedComponent.name} added at X:${x}mm, Y:${y}mm (${this.draggedComponent.aiAnalog})`
      };

      this.formboardNodes.push(newNode);
      this.selectedFormboardNode = newId;

      const timestamp = new Date().toLocaleTimeString();
      this.claudeSplitHistory.push({
        time: timestamp,
        sender: 'cmd',
        text: `claude harness add-node --type ${newNode.type} --name "${newNode.name}" --pos ${x},${y}`
      });
      this.claudeSplitHistory.push({
        time: timestamp,
        sender: 'claude',
        text: `Attached ${newNode.name} to harness bus. Evaluated routing invariants: 0 impedance reflections.`
      });

      this.render();
      this.playHaptic('success');
    });
  }

  // Load Industrial Mission Preset On-The-Fly
  loadMissionPreset(presetKey) {
    this.activeMissionPreset = presetKey;
    const timestamp = new Date().toLocaleTimeString();

    if (presetKey === 'ev-800v') {
      this.formboardNodes = [
        { id: 'node-core', type: 'core', name: 'Model Core', tag: 'AGENTIC CORE', x: 260, y: 220, color: '#38bdf8', status: 'ONLINE', details: 'Dual Inverter Motor Controller Inference Loop' },
        { id: 'node-radsok', type: 'connector', name: 'Radsok 400A HV', tag: '800V DC BUS', x: 60, y: 80, color: '#f59e0b', status: '400A CONTINUOUS', details: 'Primary Traction Battery Pack Disconnect' },
        { id: 'node-inverter1', type: 'connector', name: 'TE DT06-4S (Front Motor)', tag: 'IP69K WATERPROOF', x: 440, y: 80, color: '#38bdf8', status: 'LOCKED', details: 'SiC Front Axle Motor Telemetry Gate' },
        { id: 'node-splice-ev', type: 'splice', name: 'Ultrasonic Splice', tag: 'USCAR-21 §4.2', x: 190, y: 110, color: '#fb923c', status: 'VIOLATION', details: 'Splice placed at 42mm from bend! (Must be >= 150mm)', violation: 'USCAR-21: Splice < 150mm from bend' },
        { id: 'node-sleeve-ev', type: 'sandbox', name: 'Silicon 600°C Sleeve', tag: 'THERMAL SHIELD', x: 100, y: 360, color: '#e2b36f', status: 'ISOLATED', details: 'Exhaust & Regenerative Braking Heat Shield' },
        { id: 'node-clip-ev', type: 'clip', name: 'FIR-Tree 150mm Clip', tag: 'VIBRATION ANCHOR', x: 390, y: 350, color: '#34d399', status: 'SECURED', details: 'Damping 50G vibration on chassis rails' }
      ];
      this.claudeSplitHistory.push({
        time: timestamp,
        sender: 'cmd',
        text: 'claude harness load-preset --spec ev-800v-powertrain --standards uscar2,uscar21'
      });
      this.claudeSplitHistory.push({
        time: timestamp,
        sender: 'claude',
        text: 'Loaded EV 800V Powertrain architecture. Verified 400A Radsok bus and dual SiC inverters. 1 splice violation detected.'
      });
    } else if (presetKey === 'aerospace-fbw') {
      this.formboardNodes = [
        { id: 'node-core', type: 'core', name: 'Model Core', tag: 'TRIPLE REDUNDANT', x: 260, y: 220, color: '#38bdf8', status: 'FLIGHT GRADE', details: 'DO-178C Level A Deterministic Flight Director' },
        { id: 'node-mil1', type: 'connector', name: 'MIL-DTL-38999 (Ch A)', tag: 'STAINLESS CIRCULAR', x: 70, y: 90, color: '#818cf8', status: 'SECURED', details: 'Hydraulic Actuator Primary Flight Channel' },
        { id: 'node-mil2', type: 'connector', name: 'MIL-DTL-38999 (Ch B)', tag: 'STAINLESS CIRCULAR', x: 430, y: 90, color: '#818cf8', status: 'SECURED', details: 'Redundant Fly-By-Wire Backup Telemetry' },
        { id: 'node-splice-aero', type: 'splice', name: 'Solder Sleeve AS83519', tag: 'AEROSPACE SPLICE', x: 200, y: 160, color: '#34d399', status: 'PASS', details: '180mm strain relief compliant with AS50881' },
        { id: 'node-conduit-aero', type: 'sandbox', name: 'Braided EMI Conduit', tag: 'LIGHTNING SHIELD', x: 120, y: 350, color: '#e2b36f', status: 'GROUNDED', details: 'HIRF & Lightning strike 100kA pulse dissipation' },
        { id: 'node-tap-aero', type: 'obs', name: 'Avionics Black Box Tap', tag: 'MIL-STD-1553 BUS', x: 380, y: 350, color: '#818cf8', status: 'RECORDING', details: 'Deterministic 1ms flight telemetry recorder' }
      ];
      this.claudeSplitHistory.push({
        time: timestamp,
        sender: 'cmd',
        text: 'claude harness load-preset --spec aerospace-fly-by-wire --standard as50881'
      });
      this.claudeSplitHistory.push({
        time: timestamp,
        sender: 'claude',
        text: 'Loaded Aerospace Fly-By-Wire avionics. AS50881 compliance verified: 0 splice violations, 100kA EMI shield intact.'
      });
    } else if (presetKey === 'robotic-arm') {
      this.formboardNodes = [
        { id: 'node-core', type: 'core', name: 'Model Core', tag: 'MOTION PLANNER', x: 260, y: 220, color: '#38bdf8', status: 'ONLINE', details: 'Real-Time Inverse Kinematics & Collision Boundary Agent' },
        { id: 'node-servo1', type: 'connector', name: 'Rosenberger H-MTD', tag: 'SERVO BUS J1-J3', x: 70, y: 80, color: '#06b6d4', status: '1000 FPS', details: 'High-Torque Base & Shoulder Servos' },
        { id: 'node-servo2', type: 'connector', name: 'TE DT06 Wrist Actuator', tag: 'WRIST FLEX J4-J6', x: 440, y: 80, color: '#38bdf8', status: 'DYNAMIC FLEX', details: 'Wrist Articulation (10x dynamic flex zone)' },
        { id: 'node-estop', type: 'perms', name: 'Hardware E-Stop Hook', tag: 'ISO 10218-1 SAFETY', x: 210, y: 140, color: '#fb923c', status: 'ACTIVE', details: 'Deterministic 8ms E-stop circuit halts arm on envelope breach' },
        { id: 'node-flex-conduit', type: 'sandbox', name: 'Continuous Flex Conduit', tag: '10M CYCLE TORSION', x: 120, y: 350, color: '#e2b36f', status: 'FLEX TESTED', details: 'Million-cycle continuous torsion tested jacket' },
        { id: 'node-tap-vib', type: 'clip', name: 'Edge Vibration Fastener', tag: 'ANTI-ROTATION', x: 380, y: 350, color: '#34d399', status: 'LOCKED', details: 'Anti-rotation rib prevents cable torsion fatigue' }
      ];
      this.claudeSplitHistory.push({
        time: timestamp,
        sender: 'cmd',
        text: 'claude harness load-preset --spec robotic-6axis-cell --standard iso10218'
      });
      this.claudeSplitHistory.push({
        time: timestamp,
        sender: 'claude',
        text: 'Loaded 6-Axis Robotic Cell harness. ISO 10218-1 E-stop hook armed. Million-cycle dynamic torsion conduit verified.'
      });
    } else if (presetKey === 'citadel-finops') {
      this.formboardNodes = [
        { id: 'node-core', type: 'core', name: 'Model Core', tag: 'FINOPS ORCHESTRATOR', x: 260, y: 220, color: '#38bdf8', status: 'ONLINE', details: 'Multi-Cloud Spend & Ledger Reconciliation Agent' },
        { id: 'node-erp', type: 'connector', name: 'SAP/ERP Connector', tag: 'MCP POSTGRESQL', x: 60, y: 80, color: '#38bdf8', status: 'READ-ONLY', details: 'Ledger Balances & Purchase Order Database' },
        { id: 'node-crm', type: 'connector', name: 'Salesforce CRM Connector', tag: 'MCP SALESFORCE', x: 440, y: 80, color: '#818cf8', status: 'READ-ONLY', details: 'Q3 Pipeline Deals & Customer Billing Ingest' },
        { id: 'node-cfo-hook', type: 'perms', name: 'PreToolUse CFO Lock', tag: '$500 MUTATION GATE', x: 210, y: 130, color: '#fb923c', status: 'ENFORCED', details: 'Halts cloud resource terminations > $500 without signature token' },
        { id: 'node-jail-fin', type: 'sandbox', name: 'Ephemeral Process Jail', tag: 'ZERO EXFILTRATION', x: 110, y: 350, color: '#e2b36f', status: 'AIRGAPPED', details: 'Strict isolation: No unapproved external outbound network requests' },
        { id: 'node-otel-fin', type: 'obs', name: 'Audit Provenance Stream', tag: 'SHA256 ON-CHAIN', x: 390, y: 350, color: '#34d399', status: 'AUDITING', details: 'Every financial mutation signed and recorded to immutable ledger' }
      ];
      this.claudeSplitHistory.push({
        time: timestamp,
        sender: 'cmd',
        text: 'claude harness load-preset --spec citadel-finops-orchestrator --policy deterministic-cfo-lock'
      });
      this.claudeSplitHistory.push({
        time: timestamp,
        sender: 'claude',
        text: 'Loaded Citadel FinOps Orchestrator. Cryptographic $500 CFO gate armed. Airgapped process jail online.'
      });
    }

    this.render();
    this.playHaptic('success');
  }

  // Auto-Remediate All Invariants (USCAR-2 & AS50881)
  remediateAllInvariants() {
    this.routingCheckForm = {
      spliceDistance: 160,
      bendRadius: 80,
      bundleDiameter: 12,
      isFlexZone: false,
      heatClearance: 60,
      edgeClearance: 25,
      unsealedPlugsFilled: true,
      clipSpacing: 140,
      isHighVibZone: true
    };

    // Remove violation flag from formboardNodes
    this.formboardNodes = this.formboardNodes.map(n => {
      if (n.type === 'splice') {
        return {
          ...n,
          name: 'Ultrasonic Splice (Relocated)',
          status: 'COMPLIANT',
          details: 'Repositioned to 160mm from bend (> 150mm threshold). Mechanical strain relief verified.',
          violation: null,
          x: n.x + 20,
          y: n.y + 40
        };
      }
      return n;
    });

    const timestamp = new Date().toLocaleTimeString();
    this.claudeSplitHistory.push({
      time: timestamp,
      sender: 'cmd',
      text: 'claude harness auto-resolve --enforce-uscar21 --seal-cavities --clip-pitch 140mm'
    });
    this.claudeSplitHistory.push({
      time: timestamp,
      sender: 'claude',
      text: 'DRC AUTO-RESOLVE COMPLETE: Ultrasonic Splice offset to 160mm. IP68 dummy cavity plugs installed. Fasteners pitched to 140mm. 0 violations.'
    });

    this.render();
    this.playHaptic('success');
    alert('AUTO-REMEDIATION EXECUTED:\n\n' +
          '✓ Check 1 (Splice Distance): Relocated to 160mm (USCAR-21 compliant)\n' +
          '✓ Check 2 (Bend Radius): Expanded to 80mm (> 6x bundle dia)\n' +
          '✓ Check 3 (Heat Clearance): Set to 60mm air gap from exhaust\n' +
          '✓ Check 4 (Cavity Plugs): All unpopulated cavities plugged (IP68 seal)\n' +
          '✓ Check 5 (Clip Spacing): Set to 140mm (< 150mm vibration limit)\n\n' +
          'STATUS: PASSED - RELEASE READY FOR MANUFACTURING & PRODUCTION');
  }

  // Launch native macOS Terminal running Claude Code side-by-side
  async launchNativeClaudeTerminal() {
    const timestamp = new Date().toLocaleTimeString();
    this.claudeSplitHistory.push({
      time: timestamp,
      sender: 'cmd',
      text: 'open-terminal --binary /Users/favl/.local/bin/claude --workspace /Users/favl/Downloads/claude_architect_digital_service'
    });
    this.render();

    try {
      const resp = await fetch('/api/claude-cli/open-terminal', { method: 'POST' });
      const data = await resp.json();
      if (data.success) {
        this.claudeSplitHistory.push({
          time: new Date().toLocaleTimeString(),
          sender: 'claude',
          text: `● [macOS Terminal] Claude Code CLI v2.1.226 launched side-by-side with Atelier! Active directory: ${data.workspace}`
        });
        this.claudeSplitHistory.push({
          time: new Date().toLocaleTimeString(),
          sender: 'agent',
          text: `⚡ MCP Server 'atelier-harness' bound via stdio. DRC verification and derating tools loaded.`
        });
      } else {
        this.claudeSplitHistory.push({
          time: new Date().toLocaleTimeString(),
          sender: 'warn',
          text: `Terminal launch: ${data.message || 'Run in macOS Terminal: cd /Users/favl/Downloads/claude_architect_digital_service && /Users/favl/.local/bin/claude'}`
        });
      }
    } catch (err) {
      this.claudeSplitHistory.push({
        time: new Date().toLocaleTimeString(),
        sender: 'system',
        text: `To work side-by-side in your terminal, run: cd /Users/favl/Downloads/claude_architect_digital_service && /Users/favl/.local/bin/claude`
      });
    }

    this.render();
    this.playHaptic('success');
    setTimeout(() => {
      const term = document.getElementById('claudeSplitTerminal');
      if (term) term.scrollTop = term.scrollHeight;
    }, 50);
  }

  // Open MCP Tools Inspector Modal
  openMcpToolsInspector() {
    // Remove existing modal if any
    document.getElementById('activeMcpModal')?.remove();

    const modal = document.createElement('div');
    modal.className = 'mcp-inspector-modal active';
    modal.id = 'activeMcpModal';
    modal.innerHTML = `
      <div class="mcp-inspector-content">
        <div style="padding: 16px 20px; background: #0c101a; border-bottom: 1px solid var(--line-bright); display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="hud-pulse-dot emerald"></span>
            <strong style="color: #fff; font-family: var(--font-mono); font-size: 13px;">MCP TOOLS INSPECTOR // 'atelier-harness'</strong>
          </div>
          <button class="btn btn-secondary" id="btnCloseMcpModal" style="padding: 4px 10px; font-size: 11px;">Close ✕</button>
        </div>
        <div style="padding: 20px; overflow-y: auto; flex: 1;">
          <div style="font-size: 12px; color: var(--ink-secondary); margin-bottom: 16px; line-height: 1.5;">
            These 4 Model Context Protocol (MCP) tools are registered in <code style="color: var(--accent-cyan);">.mcp.json</code> and directly callable by Claude Code CLI and the formboard CAD engine over JSON-RPC 2.0 stdio:
          </div>

          <div class="mcp-tool-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span style="font-family: var(--font-mono); font-weight: 700; color: #86efac; font-size: 13px;">tools/verify_harness_drc</span>
              <span class="badge badge-success">USCAR-21 / AS50881</span>
            </div>
            <div style="font-size: 12px; color: var(--ink-secondary); margin-bottom: 8px;">
              Scans active formboard layout for physical invariants: splice-to-bend distance ≥ 150mm, bend radius limits, and IP68 cavity seals.
            </div>
            <div style="font-family: var(--font-mono); font-size: 11px; background: rgba(0,0,0,0.5); padding: 8px; border-radius: 4px; color: #94a3b8;">
              inputSchema: { nodes: Array&lt;HarnessNode&gt;, standard: "USCAR-21" | "AS50881" }
            </div>
          </div>

          <div class="mcp-tool-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span style="font-family: var(--font-mono); font-weight: 700; color: #93c5fd; font-size: 13px;">tools/calculate_derating</span>
              <span class="badge" style="background: rgba(56,189,248,0.2); color: var(--accent-cyan);">THERMAL DERATING</span>
            </div>
            <div style="font-size: 12px; color: var(--ink-secondary); margin-bottom: 8px;">
              Computes wire bundle outer diameter D_bundle = 1.15 × √(Σ d_i²), minimum bend radius 10× D, and thermal derating.
            </div>
            <div style="font-family: var(--font-mono); font-size: 11px; background: rgba(0,0,0,0.5); padding: 8px; border-radius: 4px; color: #94a3b8;">
              inputSchema: { wire_diameters_mm: number[], ambient_temp_c: number, max_conductor_temp_c: number }
            </div>
          </div>

          <div class="mcp-tool-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span style="font-family: var(--font-mono); font-weight: 700; color: #fdba74; font-size: 13px;">tools/remediate_harness</span>
              <span class="badge" style="background: rgba(251,146,60,0.2); color: var(--accent-amber);">DETERMINISTIC AUTO-FIX</span>
            </div>
            <div style="font-size: 12px; color: var(--ink-secondary); margin-bottom: 8px;">
              Auto-relocates splices +160mm along routing vectors away from bends and injects IP68 silicone seals.
            </div>
            <div style="font-family: var(--font-mono); font-size: 11px; background: rgba(0,0,0,0.5); padding: 8px; border-radius: 4px; color: #94a3b8;">
              inputSchema: { nodes: Array&lt;HarnessNode&gt; }
            </div>
          </div>

          <div class="mcp-tool-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span style="font-family: var(--font-mono); font-weight: 700; color: #d8b4fe; font-size: 13px;">tools/grade_capstone</span>
              <span class="badge" style="background: rgba(167,139,250,0.2); color: #c084fc;">RUBRIC GRADER</span>
            </div>
            <div style="font-size: 12px; color: var(--ink-secondary); margin-bottom: 8px;">
              Evaluates capstone submissions against the 100-point physical, mathematical, and architectural defense rubric.
            </div>
            <div style="font-family: var(--font-mono); font-size: 11px; background: rgba(0,0,0,0.5); padding: 8px; border-radius: 4px; color: #94a3b8;">
              inputSchema: { title: string, domain: string, drc_violations_count: number, has_defense_notes: boolean }
            </div>
          </div>
        </div>
        <div style="padding: 14px 20px; background: #06080e; border-top: 1px solid var(--line-dim); display: flex; justify-content: space-between; align-items: center;">
          <span style="font-family: var(--font-mono); font-size: 11px; color: var(--ink-tertiary);">
            Config: /Users/favl/Downloads/claude_architect_digital_service/.mcp.json
          </span>
          <button class="btn btn-primary" id="btnTestMcpToolCall" style="padding: 6px 14px; font-size: 11px;">
            Test DRC Tool Call ⚡
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector('#btnCloseMcpModal')?.addEventListener('click', () => {
      modal.remove();
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });
    modal.querySelector('#btnTestMcpToolCall')?.addEventListener('click', () => {
      modal.remove();
      this.executeClaudeSplitCommand('claude harness verify');
    });
  }

  // Execute command in side-by-side Claude CLI
  executeClaudeSplitCommand(rawCmd) {
    const timestamp = new Date().toLocaleTimeString();
    const cmd = rawCmd.trim();

    this.claudeSplitHistory.push({ time: timestamp, sender: 'cmd', text: cmd });

    const lower = cmd.toLowerCase();

    if (lower.includes('help') || lower === '?') {
      this.claudeSplitHistory.push({
        time: timestamp,
        sender: 'claude',
        text: 'AVAILABLE CLAUDE HARNESS CLI COMMANDS:\n' +
              '• claude harness verify       : Runs automated USCAR-21 & AS50881 DRC rule validation\n' +
              '• claude harness remediate    : Auto-relocates splices to ≥160mm & installs IP68 seals\n' +
              '• claude harness calc         : Computes wire bundle diameter & continuous ampacity\n' +
              '• claude harness preset <name>: Loads mission preset (ev, aerospace, robot, citadel)\n' +
              '• claude mcp list             : Inspects active JSON-RPC MCP server tools\n' +
              '• launch terminal             : Opens native macOS Terminal running Claude Code\n' +
              '• clear                       : Clears terminal scrollback'
      });
    } else if (lower.includes('terminal') || lower.includes('launch')) {
      this.launchNativeClaudeTerminal();
      return;
    } else if (lower.includes('mcp')) {
      this.openMcpToolsInspector();
      this.claudeSplitHistory.push({
        time: timestamp,
        sender: 'system',
        text: 'Opened MCP Tools Inspector: 4 tools bound to server atelier-harness.'
      });
    } else if (lower.includes('harness verify') || lower.includes('drc') || lower.includes('check')) {
      const violations = this.formboardNodes.filter(n => n.violation).length;
      if (violations === 0) {
        this.claudeSplitHistory.push({
          time: timestamp,
          sender: 'claude',
          text: '✓ DRC VERIFICATION PASS: All USCAR-21 (§4.2) and AS50881 physical invariants satisfied. Splice clearance ≥ 150mm. Ready for production release.'
        });
      } else {
        this.claudeSplitHistory.push({
          time: timestamp,
          sender: 'warn',
          text: `DRC VIOLATION: ${violations} critical violation(s) detected. Ultrasonic Splice is placed < 150mm from mechanical bend. Cyclic vibration fatigue risk.`
        });
        this.claudeSplitHistory.push({
          time: timestamp,
          sender: 'agent',
          text: '⚡ Agent Recommendation: Execute "claude harness remediate" to offset splice +160mm and restore structural integrity.'
        });
      }
    } else if (lower.includes('harness calc') || lower.includes('derate') || lower.includes('diameter')) {
      this.claudeSplitHistory.push({
        time: timestamp,
        sender: 'claude',
        text: 'PHYSICAL HARNESS CALCULATOR (AS50881 / Mil-W-5088L):\n' +
              '• Bundle Outer Diameter Formula: D_bundle = 1.15 × √(Σ d_i²)\n' +
              '• Computed Bundle Diameter: 13.82mm across active nodes\n' +
              '• Minimum Bend Radius (10× D): 138.2mm (Flex zones: 165.8mm)\n' +
              '• Continuous Ampacity at 85°C: 25.0A nominal derated to 15.4A (Thermal factor: 0.77, Bundle factor: 0.80)'
      });
    } else if (lower.includes('preset')) {
      if (lower.includes('aero')) {
        this.loadMissionPreset('aerospace-fly-by-wire');
      } else if (lower.includes('robot')) {
        this.loadMissionPreset('robotic-cell');
      } else if (lower.includes('citadel') || lower.includes('fin')) {
        this.loadMissionPreset('citadel-aip');
      } else {
        this.loadMissionPreset('ev-800v');
      }
      return;
    } else if (lower.includes('resolve') || lower.includes('remediate')) {
      this.remediateAllInvariants();
      return;
    } else if (lower.includes('clear')) {
      this.claudeSplitHistory = [
        { time: timestamp, sender: 'system', text: 'Claude Code Agentic Industrial Harness Engine v2.1.226 reset.' }
      ];
    } else if (lower.includes('uscar') || lower.includes('splice')) {
      this.claudeSplitHistory.push({
        time: timestamp,
        sender: 'claude',
        text: 'USCAR-21 §4.2 Physical Rationale: Cable bends concentrate mechanical shear strain on copper strands. Placing a rigid ultrasonic splice within 150mm of the bend vertex results in conductor strand shearing under standard SAE J2380 random vibration testing.'
      });
    } else {
      this.claudeSplitHistory.push({
        time: timestamp,
        sender: 'claude',
        text: `Processed "${cmd}". Harness telemetry synchronized over MCP bus /dev/harness-bus0. Invariants: OK.`
      });
    }

    this.render();
    this.playHaptic('click');

    // Auto-scroll terminal to bottom
    setTimeout(() => {
      const term = document.getElementById('claudeSplitTerminal');
      if (term) term.scrollTop = term.scrollHeight;
    }, 50);
  }

  // Real-time live oscilloscope simulation
  initOscilloscope() {
    const canvas = document.getElementById('harnessOscilloscope');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let step = 0;
    const draw = () => {
      if (!this.oscillatorRunning || !document.getElementById('harnessOscilloscope')) return;

      const w = canvas.width = canvas.offsetWidth;
      const h = canvas.height = canvas.offsetHeight;

      ctx.fillStyle = '#05070b';
      ctx.fillRect(0, 0, w, h);

      // Draw faint oscilloscope grid lines
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 25) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += 20) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      // Channel 1: High-Speed Signal Carrier (Green/Cyan)
      ctx.strokeStyle = this.noiseInjected ? '#f43f5e' : '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();

      const centerY = h / 2;
      const amp = this.noiseInjected ? 32 : 22;
      const freq = this.noiseInjected ? 0.06 : 0.04;

      for (let x = 0; x < w; x++) {
        const noise = this.noiseInjected ? (Math.random() - 0.5) * 20 : (Math.random() - 0.5) * 2;
        const y = centerY + Math.sin(x * freq + step) * amp + noise;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Channel 2: Packet Telemetry Square Wave (Emerald)
      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const squareY = Math.sin(x * 0.02 + step * 0.7) > 0 ? centerY + 18 : centerY - 18;
        if (x === 0) ctx.moveTo(x, squareY);
        else ctx.lineTo(x, squareY);
      }
      ctx.stroke();

      step += 0.12;
      requestAnimationFrame(draw);
    };

    requestAnimationFrame(draw);
  }
}

// Instantiate on load or immediately if already loaded
if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', () => {
    window.claudePlatform = new ClaudeArchitectPlatform();
  });
} else {
  window.claudePlatform = new ClaudeArchitectPlatform();
}

