## Context
When a user chats with a notebook or a single source, the AI provides references to insights extracted from the documents. The frontend currently has a `titleMap` mapping source IDs (e.g. `source:xyz`) to their human-readable document titles. However, insights identified as `source_insight:xyz` are not mapped in this dictionary. As a result, they display their raw alphanumeric IDs instead of a human-readable title, resulting in confusing citations like `[1] - source_insight:xyz` instead of `[1] - Quy Chế...`.

## Goals / Non-Goals

**Goals:**
- Present human-readable document titles instead of raw IDs for `source_insight` citations in both Source-specific and Notebook chats.

**Non-Goals:**
- Changing the backend API logic for generating insights or referencing them.
- Restructuring the chat UI's reference design.

## Decisions

- **Title Mapping Update:** We will populate the existing `titleMap` rendering mechanisms so that `source_insight` references map to the parent source's title (`sourceData.title`) in `frontend/src/app/(dashboard)/sources/[id]/page.tsx` for Source Chat and when building context in `frontend/src/lib/hooks/useNotebookChat.ts` for Notebook Chat.

## Risks / Trade-offs

- **Risk:** Missing mappings if the API changes the prefix.
  **Mitigation:** We'll strip prefixes (`source_insight:`) defensively just like existing code does for `source:` and map both the prefixed and raw IDs to the title.
