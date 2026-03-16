## Why

Currently, when the chat references a source insight, the citation displays the source document's title. However, users cannot distinguish whether the citation came from the main source document or from a specific insight extracted from that document. We need to prepend an indicating label (e.g. "Phân tích: ") to the title for source insight citations to make this distinction clear, while also supporting language localization.

## What Changes

- Update the title mapping logic for `source_insight:xyz` references to prepend a localized "Insight: " label (e.g. "Phân tích: ") to the parent document's title.
- Ensure the localization library (`useTranslation` or equivalent) is used to translate the "Insight" label dynamically.
- Modify the component where the `titleMap` or `dynamicTitleMap` is constructed to apply this formatting.

## Capabilities

### New Capabilities

### Modified Capabilities
- `chat-citations`: Update the citation display requirement for source insights to include a localized "Insight" prefix before the document title.

## Impact

- `frontend/src/app/(dashboard)/sources/[id]/page.tsx`
- `frontend/src/lib/hooks/useNotebookChat.ts`
- Translation files (e.g. `frontend/src/locales/...` or wherever `i18n` strings are stored)
