## Context

There is an inconsistency in how the frontend calls the notebook chat API versus the source chat API. `apiClient` dynamically resolves the base URL using `getApiUrl()` and appends `/api`, which ensures the requests correctly reach the FastAPI backend at `/api/...`. However, `sendMessage` in `frontend/src/lib/api/source-chat.ts` uses `fetch()` with a hardcoded relative path `` `/api/sources/...` ``. 

On the VPS deployment, this results in the `fetch` request reaching the backend as `POST /sources/...` (without the `/api` prefix), leading to a 404 Not Found error because the FastAPI router is mounted with the `/api` prefix. The `get` requests using `apiClient` work correctly because they use the dynamically constructed base URL. 

## Goals / Non-Goals

**Goals:**
- Unify the URL construction for `fetch` streaming requests in `frontend/src/lib/api/source-chat.ts` to match the robust setup in `apiClient`.
- Fix the 404 error on the VPS by ensuring the streaming `POST` request hits the correct `/api/sources/...` endpoint.

**Non-Goals:**
- Refactoring the entire `apiClient` or changing how streaming is handled natively.
- Updating backend FastAPI routes.

## Decisions

1. **Dynamic URL Resolution for `fetch`:** Instead of hardcoding the relative path `` `/api/sources/...` ``, we will await `getApiUrl()` and construct the full URL just like `apiClient` does (i.e. `` `${apiUrl}/api/sources/...` ``). This bypasses the Next.js rewrites abstraction mismatch on the VPS entirely and guarantees the request goes to the correct backend endpoint.
2. **Async `sendMessage` Method:** Because `getApiUrl()` is potentially asynchronous or requires dynamic configuration resolution, the `sendMessage` function will be updated to be `async` (or internally resolving the promise before returning the fetch).

## Risks / Trade-offs

- Minimal risk. The `fetch` calls will just use the exact same base URL logic as the rest of the application.
