#!/usr/bin/env python3
"""
Atelier Enterprise Server with Native Claude Code CLI Bridge & MCP Dispatcher
Serves demo web assets on port 8000 and exposes endpoints for side-by-side Claude CLI execution.
"""

import os
import sys
import json
import subprocess
import shutil
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
import urllib.parse

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
WORKSPACE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DEMO_DIR = os.path.abspath(os.path.dirname(__file__))

CLAUDE_PATH = "/Users/favl/.local/bin/claude"
if not os.path.exists(CLAUDE_PATH):
    which_claude = shutil.which("claude")
    if which_claude:
        CLAUDE_PATH = which_claude

class AtelierHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DEMO_DIR, **kwargs)

    def end_headers(self):
        # Enable CORS and caching headers
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        
        # Claude CLI status endpoint
        if parsed.path == "/api/claude-cli/status":
            installed = os.path.exists(CLAUDE_PATH)
            version = "2.1.226"
            if installed:
                try:
                    res = subprocess.run([CLAUDE_PATH, "--version"], capture_output=True, text=True, timeout=3)
                    if res.returncode == 0:
                        version = res.stdout.strip().split()[0]
                except Exception:
                    pass
            
            data = {
                "installed": installed,
                "path": CLAUDE_PATH,
                "version": version,
                "workspace": WORKSPACE_DIR,
                "platform": sys.platform,
                "mcpServer": os.path.join(WORKSPACE_DIR, "mcp", "harness_mcp_server.py"),
                "claudeMd": os.path.exists(os.path.join(WORKSPACE_DIR, "CLAUDE.md"))
            }
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(data).encode("utf-8"))
            return

        # MCP Tools endpoint
        if parsed.path == "/api/mcp/tools":
            tools_data = [
                {
                    "name": "verify_harness_drc",
                    "description": "Performs physical Design Rule Checks (DRC) against USCAR-21, AS50881, and IP68 standards.",
                    "status": "active"
                },
                {
                    "name": "calculate_derating",
                    "description": "Calculates wire bundle outer diameter, ambient temperature derating, and continuous current limits.",
                    "status": "active"
                },
                {
                    "name": "remediate_harness",
                    "description": "Applies automated deterministic remediation to harness nodes to satisfy all DRC invariants.",
                    "status": "active"
                },
                {
                    "name": "grade_capstone",
                    "description": "Evaluates candidate harness architecture, defense report, and telemetry against the 100-point rubric.",
                    "status": "active"
                }
            ]
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"server": "atelier-harness", "tools": tools_data}).encode("utf-8"))
            return

        # Fallback to static files
        super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        content_len = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_len).decode("utf-8") if content_len > 0 else "{}"
        
        try:
            payload = json.loads(body)
        except Exception:
            payload = {}

        # Launch macOS Terminal running Claude Code side-by-side
        if parsed.path == "/api/claude-cli/open-terminal":
            cmd = f'cd "{WORKSPACE_DIR}" && echo "⚡ ATELIER // CLAUDE CODE CLI v2.1.226 SIDE-BY-SIDE" && "{CLAUDE_PATH}"'
            script = f'''
            tell application "Terminal"
                do script "{cmd}"
                activate
            end tell
            '''
            try:
                subprocess.Popen(["osascript", "-e", script])
                resp = {
                    "success": True,
                    "message": "macOS Terminal opened side-by-side running Claude Code CLI",
                    "path": CLAUDE_PATH,
                    "workspace": WORKSPACE_DIR
                }
            except Exception as e:
                resp = {
                    "success": False,
                    "message": f"Failed to open Terminal: {str(e)}",
                    "fallbackCommand": f'cd "{WORKSPACE_DIR}" && claude'
                }
                
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(resp).encode("utf-8"))
            return

        # Execute Claude command or local simulator
        if parsed.path == "/api/claude-cli/exec":
            command = payload.get("command", "").strip()
            prompt = payload.get("prompt", "").strip()
            
            # Non-interactive print execution if prompt provided
            if prompt and os.path.exists(CLAUDE_PATH):
                try:
                    res = subprocess.run(
                        [CLAUDE_PATH, "-p", prompt],
                        cwd=WORKSPACE_DIR,
                        capture_output=True,
                        text=True,
                        timeout=15
                    )
                    out = res.stdout if res.returncode == 0 else (res.stderr or res.stdout)
                    resp = {"success": True, "output": out.strip()}
                except Exception as e:
                    resp = {"success": False, "output": f"Execution error: {str(e)}"}
            else:
                resp = {"success": True, "output": f"Command received: {command}"}

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(resp).encode("utf-8"))
            return

        self.send_response(404)
        self.end_headers()

def run_server():
    server = ThreadingHTTPServer(("0.0.0.0", PORT), AtelierHandler)
    print(f"⚡ Atelier Server running at http://localhost:{PORT}")
    print(f"📁 Serving static files from: {DEMO_DIR}")
    print(f"🤖 Claude Code CLI bridged from: {CLAUDE_PATH}")
    server.serve_forever()

if __name__ == "__main__":
    run_server()
