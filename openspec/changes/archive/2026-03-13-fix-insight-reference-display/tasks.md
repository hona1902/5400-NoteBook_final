## 1. Source Chat Update

- [x] 1.1 In `frontend/src/app/(dashboard)/sources/[id]/page.tsx`, update the `titleMap` generation logic to include mappings for all source insights.
- [x] 1.2 Map both the raw insight ID and `source_insight:` prefixed ID to the parent `sourceData.title`.

## 2. Notebook Chat Update

- [x] 2.1 In `frontend/src/lib/hooks/useNotebookChat.ts` (or `frontend/src/app/(dashboard)/notebooks/[id]/page.tsx`), add mapping logic to ensure that insights returned via `response.context` have their IDs mapped to the corresponding source's `title`.
- [x] 2.2 Verify that `titleMap` (which is passed to the citation renderer) properly includes `source_insight:xyz` mappings for Notebook Chat.
