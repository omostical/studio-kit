#!/usr/bin/env bash
# Registers Figma Console MCP (github.com/southleft/figma-console-mcp) with
# Claude Code on THIS computer. Run it on your own machine, not in the cloud:
#
#   bash scripts/setup-figma-console-mcp.sh
#
# Your Figma token is typed hidden here and goes straight into Claude Code's
# config. It is never printed or written to this repo.
set -euo pipefail

say()  { printf '\n\033[1m%s\033[0m\n' "$1"; }
fail() { printf '\n✗ %s\n' "$1" >&2; exit 1; }

say "1/4  Checking tools on this computer"
command -v node   >/dev/null || fail "Node.js not found. Install it from https://nodejs.org (LTS), then re-run."
command -v npx    >/dev/null || fail "npx not found (it ships with Node.js). Reinstall Node.js, then re-run."
command -v claude >/dev/null || fail "Claude Code CLI not found. Install: npm install -g @anthropic-ai/claude-code"
echo "✓ node $(node -v), claude $(claude --version 2>/dev/null | head -1)"

say "2/4  Checking the figma-console-mcp package exists"
VERSION=$(npm view figma-console-mcp version 2>/dev/null) || fail "Could not find figma-console-mcp on npm. Check the project's README for the current package name."
echo "✓ figma-console-mcp $VERSION"

say "3/4  Figma personal access token"
echo "Create one in Figma: Settings → Security → Personal access tokens."
echo "Paste it below (input is hidden), then press Enter."
read -r -s FIGMA_TOKEN; echo
[ -n "$FIGMA_TOKEN" ] || fail "No token entered."

say "4/4  Registering with Claude Code (user scope = all your projects)"
claude mcp remove figma-console -s user >/dev/null 2>&1 || true
claude mcp add figma-console -s user -e FIGMA_ACCESS_TOKEN="$FIGMA_TOKEN" -- npx -y figma-console-mcp@latest
unset FIGMA_TOKEN

claude mcp list | grep -i figma-console || fail "Registration didn't show up in 'claude mcp list'."

cat <<'EOF'

✓ Done. Next:
  • Step 3: install the Desktop Bridge plugin in Figma (see the project's README),
    open your "Studio Kit 2.0" copy and run the plugin there.
  • Start Claude Code in your studio-kit folder (`claude`), and paste the prompt
    from figma-plugins/studio-kit-rebrand/README.md → "Run with Figma Console MCP".
EOF
