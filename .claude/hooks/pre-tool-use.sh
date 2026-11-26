#!/bin/sh
# Claude Code PreToolUse hook (registered in .claude/settings.json). Refuses actions that are expensive to get
# wrong and says what to do instead. Exit 2 blocks the call; stderr goes back to the agent.
# Adapted from the grounded-design-system template. Other agents meet the same rules in CI (.github/workflows).

set -eu

PROTECTED_BRANCHES="main master"

input=$(cat)

# Read a string field from the hook's JSON input (jq when present, node otherwise).
field() {
  if command -v jq >/dev/null 2>&1; then
    printf '%s' "$input" | jq -r "$1 // empty"
  else
    printf '%s' "$input" | node -e '
      let s = ""; process.stdin.on("data", d => s += d).on("end", () => {
        const v = process.argv[1].split(".").filter(Boolean).reduce((o, k) => o == null ? o : o[k], JSON.parse(s));
        process.stdout.write(v == null ? "" : String(v));
      });' "$1"
  fi
}

block() {
  printf 'Blocked: %s\n' "$1" >&2
  exit 2
}

tool=$(field .tool_name)
project=${CLAUDE_PROJECT_DIR:-$(field .cwd)}

case "$tool" in
  Edit|Write|MultiEdit|NotebookEdit)
    path=$(field .tool_input.file_path)
    [ -n "$path" ] || exit 0
    case "$path" in
      "$project"/*) rel=${path#"$project"/} ;;
      /*) exit 0 ;; # outside the project (scratch files, memory): not this hook's business
      *) rel=$path ;;
    esac
    case "$rel" in
      tokens/figma/*)
        block "$rel is the Figma token export. Change the variable in Figma, export it, then run npm run tokens:build (tokens/README.md)." ;;
      src/styles/generated/*|src/tokens/generated.ts)
        block "$rel is generated from tokens/figma/ by npm run tokens:build. Change the token in Figma, then rebuild." ;;
      DESIGN.md)
        block "DESIGN.md is generated. Usage text lives in tokens/usage.json, values in Figma; edit those, then run npm run design:build." ;;
      docs/figma-descriptions/button.md|docs/figma-descriptions/input.md)
        ;; # hand-written descriptions (scripts/build-descriptions.mjs skips them)
      docs/figma-descriptions/*.md|docs/figma-descriptions/index.json)
        block "$rel is generated. Edit docs/figma-descriptions/components.json (prose, status) or figma-properties.json, then run npm run descriptions:build." ;;
      .claude/skills/*|.claude/rules/*|.cursor/rules/*)
        top=$(printf '%s' "$rel" | cut -d/ -f1-3)
        [ -L "$project/$top" ] || block "rules and skills live in .agents/ and are symlinked into each tool's folder, so every agent sees them. Create $top under .agents/ (rules/ or skills/), then link it: see the Agent files section of AGENTS.md." ;;
    esac
    ;;
  Bash)
    cmd=$(field .tool_input.command)
    # Match the flag on git commands only, so `git log --grep=--no-verify` passes.
    if printf '%s' "$cmd" | grep -Eq '(^|[;&|[:space:]])git[[:space:]]+(commit|push|merge|rebase)([[:space:]][^;&|]*)?[[:space:]]--no-verify([[:space:]]|$)'; then
      block "--no-verify skips the checks that protect main. Fix the failing check, then commit again."
    fi
    if printf '%s' "$cmd" | grep -Eq '(^|[;&|[:space:]])git[[:space:]]+commit([[:space:]]|$)'; then
      branch=$(git -C "$project" branch --show-current 2>/dev/null || true)
      for b in $PROTECTED_BRANCHES; do
        [ "$branch" = "$b" ] && block "commits on $b are refused: main is protected and changes land through pull requests. Create a branch first (git switch -c <type>/<topic>), then commit."
      done
    fi
    ;;
esac

exit 0
