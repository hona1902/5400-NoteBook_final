import asyncio
from open_notebook.database.connection import get_db
from open_notebook.database.repository import repo_query, ensure_record_id
import json

async def main():
    db = await get_db()
    # Get all notebooks
    notebooks = await repo_query("SELECT id FROM notebook")
    if not notebooks:
        print("No notebooks found.")
        return
    nb_id = notebooks[0]["id"]
    print(f"Testing with notebook: {nb_id}")

    # Raw inner query
    inner_query = """
        select
        <- chat_session as chat_session
        from refers_to
        where out=$id
        fetch chat_session
    """
    inner_res = await repo_query(inner_query, {"id": ensure_record_id(nb_id)})
    print("Inner query result:")
    print(json.dumps(inner_res, indent=2))

    # Test filtering user_id = admin
    f1 = await repo_query(f"select * from ({inner_query}) where chat_session[0].user_id = 'admin'", {"id": ensure_record_id(nb_id)})
    print("Filter 'admin' result count:", len(f1))

    # Test filtering user_id = user:22
    f2 = await repo_query(f"select * from ({inner_query}) where chat_session[0].user_id = 'user:22'", {"id": ensure_record_id(nb_id)})
    print("Filter 'user:22' result count:", len(f2))

if __name__ == "__main__":
    asyncio.run(main())
