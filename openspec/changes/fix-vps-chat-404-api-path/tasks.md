## Tasks

1. Update chat streaming API calls
   - [x] Import `getApiUrl` from `@/lib/config` into `frontend/src/lib/api/source-chat.ts`.
   - [x] Change `sendMessage` to be `async` in `source-chat.ts` if it is not already. (Or handle the promise chain appropriately to avoid changing the caller signature if possible). Wait, `sendMessage` returns a Promise. If we make it `async`, it still returns a Promise.
   - [x] Await `getApiUrl()` and construct the `url` as `` `${apiUrl}/api/sources/${sourceId}/chat/sessions/${sessionId}/messages` `` in `sendMessage`.
