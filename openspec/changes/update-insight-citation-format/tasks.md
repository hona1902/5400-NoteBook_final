## 1. Localization Update

- [x] 1.1 Identify the localization files (e.g., `frontend/src/locales/en` and `vi`) or translation dictionary used in the frontend.
- [x] 1.2 Add a new key (e.g., `t.chat.insightPrefix`) with values "Insight: " (English) and "Phân tích: " (Vietnamese).

## 2. Notebook Chat Citation Implementation

- [x] 2.1 In `frontend/src/lib/hooks/useNotebookChat.ts`, retrieve the translated string for the insight prefix.
- [x] 2.2 In the context builder where `dynamicTitleMap` is populated, prepend the translated prefix to the document title ONLY for IDs that correspond to an insight (e.g., `source_insight:xyz`). Do NOT prepend it for the main document ID.
- [x] 2.3 Ensure the updated `dynamicTitleMap` is returned and correctly merged with the static `titleMap` in `ChatColumn`.

## 3. Source Chat Citation Implementation

- [x] 3.1 Unify the logic for Source Chat citation mappings (`frontend/src/app/(dashboard)/sources/[id]/page.tsx`) if applicable.
- [x] 3.2 Update its `titleMap` generation loop to prepend the same localized prefix for insight citations.

## 4. Verification

- [x] 4.1 Run TypeScript type checking (`npm run typecheck` or `npx tsc --noEmit`).
- [x] 4.2 Switch the app language to Vietnamese and verify the chat citation says "Phân tích: [Title]".
- [x] 4.3 Switch to English and verify it says "Insight: [Title]".
