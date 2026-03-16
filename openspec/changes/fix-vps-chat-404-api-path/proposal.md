## Why

When chatting with a single source on the VPS deployment, the frontend sends a POST request to `/sources/.../messages` instead of `/api/sources/.../messages`, resulting in a 404 Not Found error. This prevents users from chatting with individual sources in the production environment. The fix is required immediately to restore core chat functionality on the VPS.

## What Changes

- Modify the frontend API call for chatting with a single source to correctly include the `/api` prefix (or use the configured base URL/path) so that the request is routed to the backend successfully.

## Capabilities

*(No new capabilities are added; this is a bug fix for existing functionality.)*

## Modified Requirements

*(No requirements changed.)*

## Impact

- Frontend chat service/API logic for single-source chat.
- Restores chat functionality on the VPS deployment without affecting the working local environment.
