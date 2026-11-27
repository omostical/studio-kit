# Design system gaps

What Studio Kit doesn't have yet, written down when someone needed it. Agents add lines here; the team closes them
by building the component or token (in Figma first, then code).

One line per gap: `- <Name>: <what it must do> — needed by <file or screen>`. The name is what a stand-in in code
points at (`// stand-in: <Name>`), and `npm run lint:tokens` fails on a stand-in whose name has no line here.

To close a gap, delete its line in the pull request that ships the component or token, and add a `create` or `extend`
line to `CHANGELOG.md`.

## Components

- Avatar Orb: the animated gradient orb variant of Avatar (Figma `Variant=Orb`, e.g. an AI assistant) — needed by `src/components/Avatar/Avatar.tsx`; Figma builds it from images and blurs, with no tokens
- Dropdown Menu search: the Figma Search, Select All and Create slots of Dropdown Menu (Type=Selection) — needed by `src/components/DropdownMenu/DropdownMenu.tsx`; long option lists use Select until then
- Menu Item progress: the Figma Progress menu-item type (an item with a progress bar) — needed by `src/components/DropdownMenu/DropdownMenu.tsx`
- Textarea: multi-line text field with label, helper text and error — needed by any form with a message or note field. Catalog: `planned`
- Select clear option: reset a filter Select back to "All" without picking a value — needed by the Phase 3 re-test filters
- Toast warning status: a warning-level confirmation (e.g. "Saved, but 2 rows were skipped") — needed by the Phase 3 re-test
- Side Panel keyboard footer: the Details/Task footer of keyboard hints ("Navigate", "Return to parent", "Close") — needed by `src/components/SidePanel/SidePanel.tsx`; the panel has no keyboard navigation between items to hint at yet
- Side Panel task header: the Task type's 64px action bar above the title and its progress tracker (Form type) — needed by `src/components/SidePanel/SidePanel.tsx`; compose with Button/IconButton in the header children until then
- Notifications unread dot colour: Figma binds the 6px unread dot to the primitive `Colors/Light/Blue/600`, not a semantic variable — needed by `src/components/Notifications/Notifications.tsx`; code uses `Dynamic/Fill/Primary/Default` until Figma binds a semantic token

## Tokens

- Container widths: fixed widths for Modal (400, 600, 800), Toast (400, 460), Dropdown Menu (320), Side Panel (560, 704, 960), Pop-up (492) and Notifications (420) — needed by `src/components/Modal/Modal.tsx`, `src/components/Toast/Toast.tsx`, `src/components/DropdownMenu/DropdownMenu.tsx`, `src/components/SidePanel/SidePanel.tsx`, `src/components/Popup/Popup.tsx`, `src/components/Notifications/Notifications.tsx` (recorded as `token-lint-ignore` exceptions)
- Layer order: a z-index scale so toasts sit above modals — needed by `src/components/Toast/Toast.tsx` (`z-[60]` exception)
