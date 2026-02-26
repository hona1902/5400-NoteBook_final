import asyncio
import httpx
import sys

API_URL = "http://localhost:5055/api"

async def main():
    print("Testing open-notebook backend stability with 40 chats...")
    
    async with httpx.AsyncClient(timeout=120.0) as client:
        # 1. Get notebooks
        r = await client.get(f"{API_URL}/notebooks")
        if r.status_code != 200:
            print(f"Failed to get notebooks: {r.status_code} - {r.text}")
            return
        
        notebooks = r.json()
        if not notebooks:
            print("No notebooks found to test against. Create one first.")
            return
            
        notebook_id = notebooks[0]["id"]
        print(f"Using notebook: {notebook_id} ({notebooks[0].get('title', 'Unknown')})")
        
        # 2. To avoid crashing via one massive loop, maybe we do batches of 5
        # or just 40 requests in parallel? The prompt says "Tạo khoảng 40 lệnh chat... để test thử xem có bị crash backend không"
        # Since we want to test crashes, we can run them in a loop, or parallel.
        # Let's run concurrently in batches.
        session_ids = []
        
        # We will create 1 session and send 40 chats? Or 40 sessions with 1 chat?
        # The prompt says "khoảng 40 lệnh chat" (around 40 chat commands). 
        # Creating 1 session and sending 40 messages concurrently to the same session might cause LangGraph state issues due to concurrent state updates.
        # Let's create 40 separate sessions and send 1 chat to each, running them concurrently to stress test the backend memory/LLM handling.
        
        print("Creating 40 sessions...")
        for i in range(40):
            r_sess = await client.post(f"{API_URL}/chat/sessions", json={
                "notebook_id": notebook_id, 
                "title": f"Stress Test {i+1}"
            })
            if r_sess.status_code == 200:
                session_ids.append(r_sess.json()["id"])
            else:
                print(f"Failed to create session {i+1}: {r_sess.text}")
                
        if not session_ids:
            print("Failed to create any sessions.")
            return
            
        print(f"Created {len(session_ids)} sessions. Sending chats concurrently...")
        
        # Function to send a single chat
        async def send_chat(idx, sid):
            print(f"[{idx}] Sending chat to session {sid}...")
            payload = {
                "session_id": sid,
                "message": f"Hello, this is a test message {idx}. Can you summarize what you know about the sources?",
                "context": {"sources": [], "notes": []}  # empty context is fine, or we can fetch true context. Let's fetch context first.
            }
            
            # Actually, backend execute_chat takes context from the request.
            # Building context:
            r_ctx = await client.post(f"{API_URL}/chat/context", json={
                "notebook_id": notebook_id,
                "context_config": {"sources": {}, "notes": {}} # defaults to short context of everything
            })
            
            if r_ctx.status_code == 200:
                payload["context"] = r_ctx.json()["context"]
            else:
                print(f"[{idx}] Context fetch failed: {r_ctx.text}")
            
            try:
                r_chat = await client.post(f"{API_URL}/chat/execute", json=payload, timeout=200.0)
                if r_chat.status_code == 200:
                    print(f"[{idx}] Success: {len(r_chat.json()['messages'])} messages returned.")
                    return True
                else:
                    print(f"[{idx}] Failed with {r_chat.status_code}: {r_chat.text}")
                    return False
            except Exception as e:
                print(f"[{idx}] Exception: {str(e)}")
                return False

        # Run them in batches of 10 to not overwhelm standard API rate limits (like OpenAI limits)
        tasks = []
        success_count = 0
        
        for i, sid in enumerate(session_ids):
            tasks.append(send_chat(i+1, sid))
            if len(tasks) >= 5: # 5 concurrent
                results = await asyncio.gather(*tasks)
                success_count += sum(1 for r in results if r)
                tasks = []
                
        if tasks:
            results = await asyncio.gather(*tasks)
            success_count += sum(1 for r in results if r)
            
        print(f"\n--- Stress Test Completed ---")
        print(f"Successful chats: {success_count}/{len(session_ids)}")
        
        # 3. Cleanup
        print(f"\nCleaning up {len(session_ids)} test sessions...")
        for sid in session_ids:
            try:
                r_del = await client.delete(f"{API_URL}/chat/sessions/{sid}")
                if r_del.status_code != 200:
                    print(f"Failed to delete {sid}: {r_del.text}")
            except Exception as e:
                print(f"Exception deleting {sid}: {e}")
                
        print("Cleanup completed.")

if __name__ == "__main__":
    asyncio.run(main())
