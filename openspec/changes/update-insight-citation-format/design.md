## Context

When a source insight is cited in the chat (Notebook Chat or Source Chat), it currently displays the title of the parent source document. While this correctly traces the citation back to the original document, users cannot distinguish whether the citation was drawn from the main document content itself or from an AI-extracted insight. This change aims to add a localized prefix (e.g., "Insight:", "Phân tích:") to the source document title when the citation corresponds to a `source_insight` reference.

## Goals / Non-Goals

**Goals:**
- Clearly differentiate citations of whole document sources from specific insights in the chat UI.
- Prepend a localized prefix like "Phân tích: " (or "Insight: " in English) to the title mapping of source insights.
- Ensure the translation updates dynamically when the user changes their language setting.

**Non-Goals:**
- Changes to how the chat backend formats references or citations.
- Modifying the underlying citation rendering component structure (we just update the input `titleMap`).

## Decisions

- **Translation in React component vs API:** The backend API provides raw context nodes. The frontend constructs a `titleMap` grouping IDs to display names in `useNotebookChat.ts` (for Notebook Chat) and `sources/[id]/page.tsx` (for Source Chat). Since `useTranslation` can only be used inside React components (or hooks), we will retrieve the translated string for "Insight" and apply it during the titleMap generation loop.

## Risks / Trade-offs

- [Risk] Localization keys might not be defined for the "Insight" prefix -> Mitigation: Ensure translation files are updated across the supported languages with a fallback string like "Insight: " during development.
