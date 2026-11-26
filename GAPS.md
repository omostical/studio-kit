# Design system gaps

What Studio Kit doesn't have yet, written down when someone needed it. Agents add lines here; the team closes them
by building the component or token (in Figma first, then code).

One line per gap: `- <Name>: <what it must do> — needed by <file or screen>`. The name is what a stand-in in code
points at (`// stand-in: <Name>`), and `npm run lint:tokens` fails on a stand-in whose name has no line here.

To close a gap, delete its line in the pull request that ships the component or token, and add a `create` or `extend`
line to `CHANGELOG.md`.

## Components

- Avatar Orb: the animated gradient orb variant of Avatar (Figma `Variant=Orb`, e.g. an AI assistant) — needed by `src/components/Avatar/Avatar.tsx`; Figma builds it from images and blurs, with no tokens
- Dropdown Menu: several row actions behind one "more" button — needed by the team-members prototype (same branch, two buttons per row instead). Catalog: `planned`
- Textarea: multi-line text field with label, helper text and error — needed by any form with a message or note field. Catalog: `planned`
- Select clear option: reset a filter Select back to "All" without picking a value — needed by the Phase 3 re-test filters
- Toast warning status: a warning-level confirmation (e.g. "Saved, but 2 rows were skipped") — needed by the Phase 3 re-test

## Tokens

- Container widths: fixed widths for Modal (400, 600, 800) and Toast (400, 460) — needed by `src/components/Modal/Modal.tsx`, `src/components/Toast/Toast.tsx` (recorded as `token-lint-ignore` exceptions)
- Layer order: a z-index scale so toasts sit above modals — needed by `src/components/Toast/Toast.tsx` (`z-[60]` exception)
