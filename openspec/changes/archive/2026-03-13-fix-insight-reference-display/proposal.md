## Why

When users chat with a single source, any insights referenced in the response display as their raw alphanumeric ID (e.g., `source_insight:ywux2ub...`) rather than a human-readable name. This prevents users from easily identifying the context of the citation, making the chat experience confusing and less user-friendly.

## What Changes

- Update `titleMap` generation in the Source Chat page (`frontend/src/app/(dashboard)/sources/[id]/page.tsx`) to map all insight IDs to the title of their parent source.
- Update `titleMap` generation in the Notebook Chat page (`frontend/src/app/(dashboard)/notebooks/[id]/page.tsx` or related hooks) so that when insights are extracted from the context response in `useNotebookChat.ts`, their IDs are mapped to the corresponding source's title for proper citation display.

## Capabilities

### New Capabilities

### Modified Capabilities
- `chat-citations`: Modifying the display resolution of `source_insight:` references to map to their source document titles.

## Impact

- **UI/UX**: Citations of `source_insight` inside the chat will now properly display the name of the source (e.g., "Quy Chế số 579- ngày 28-06-2024").
- **Code**: Minor updates to `frontend/src/app/(dashboard)/sources/[id]/page.tsx` and `frontend/src/lib/hooks/useNotebookChat.ts`.
