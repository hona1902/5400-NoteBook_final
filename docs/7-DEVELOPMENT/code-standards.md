# Tiêu chuẩn mã

Tài liệu này phác thảo các tiêu chuẩn mã hóa và các phương pháp thực hành tốt nhất cho các đóng góp của Open Notebook. Tất cả mã phải tuân theo các nguyên tắc này để đảm bảo tính nhất quán, dễ đọc và dễ bảo trì.

## Tiêu chuẩn Python

### Định dạng mã

Chúng tôi tuân theo **PEP 8** với một số nguyên tắc cụ thể:

- Sử dụng **Ruff** để linting và định dạng
- Độ dài dòng tối đa: **88 ký tự**- Sử dụng**dấu ngoặc kép** cho chuỗi
- Sử dụng **dấu phẩy** trong cấu trúc nhiều dòng

### Gợi ý gõ

Luôn sử dụng gợi ý kiểu cho các tham số hàm và giá trị trả về:



```python
from typing import List, Optional, Dict, Any
from pydantic import BaseModel

async def process_content(
    content: str,
    options: Optional[Dict[str, Any]] = None
) -> ProcessedContent:
    """Process content with optional configuration."""
    # Implementation
```



### Mẫu không đồng bộ/Đang chờ

Sử dụng async/await một cách nhất quán trong toàn bộ codebase:



```python
# Good
async def fetch_data(url: str) -> Dict[str, Any]:
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.json()

# Bad - mixing sync and async
def fetch_data(url: str) -> Dict[str, Any]:
    loop = asyncio.get_event_loop()
    return loop.run_until_complete(async_fetch(url))
```



### Xử lý lỗi

Sử dụng xử lý lỗi có cấu trúc với các ngoại lệ tùy chỉnh:



```python
from open_notebook.exceptions import DatabaseOperationError, InvalidInputError

async def create_notebook(name: str, description: str) -> Notebook:
    """Create a new notebook with validation."""
    if not name.strip():
        raise InvalidInputError("Notebook name cannot be empty")

    try:
        notebook = Notebook(name=name, description=description)
        await notebook.save()
        return notebook
    except Exception as e:
        raise DatabaseOperationError(f"Failed to create notebook: {str(e)}")
```



### Tài liệu (Chuỗi tài liệu kiểu Google)

Sử dụng chuỗi tài liệu kiểu Google cho tất cả các hàm, lớp và mô-đun:



```python
async def vector_search(
    query: str,
    limit: int = 10,
    minimum_score: float = 0.2
) -> List[SearchResult]:
    """Perform vector search across embedded content.

    Args:
        query: Search query string
        limit: Maximum number of results to return
        minimum_score: Minimum similarity score for results

    Returns:
        List of search results sorted by relevance score

    Raises:
        InvalidInputError: If query is empty or limit is invalid
        DatabaseOperationError: If search operation fails
    """
    # Implementation
```



#### Chuỗi tài liệu mô-đun

```python
"""
Notebook domain model and operations.

This module contains the core Notebook class and related operations for
managing research notebooks within the Open Notebook system.
"""
```



#### Chuỗi tài liệu lớp

```python
class Notebook(BaseModel):
    """A research notebook containing sources, notes, and chat sessions.

    Notebooks are the primary organizational unit in Open Notebook, allowing
    users to group related research materials and maintain separate contexts
    for different projects.

    Attributes:
        name: The notebook's display name
        description: Optional description of the notebook's purpose
        archived: Whether the notebook is archived (default: False)
        created: Timestamp of creation
        updated: Timestamp of last update
    """
```



#### Chuỗi tài liệu hàm

```python
async def create_notebook(
    name: str,
    description: str = "",
    user_id: Optional[str] = None
) -> Notebook:
    """Create a new notebook with validation.

    Args:
        name: The notebook name (required, non-empty)
        description: Optional notebook description
        user_id: Optional user ID for multi-user deployments

    Returns:
        The created notebook instance

    Raises:
        InvalidInputError: If name is empty or invalid
        DatabaseOperationError: If creation fails

    Example:
        ```

trăn
        sổ ghi chép = đang chờ create_notebook(
            name="Nghiên cứu AI",
            description="Nghiên cứu về ứng dụng AI"
        )

```
    """
```



## Tiêu chuẩn FastAPI

### Tổ chức bộ định tuyến

Sắp xếp điểm cuối theo miền:



```python
# api/routers/notebooks.py
from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional

router = APIRouter()

@router.get("/notebooks", response_model=List[NotebookResponse])
async def get_notebooks(
    archived: Optional[bool] = Query(None, description="Filter by archived status"),
    order_by: str = Query("updated desc", description="Order by field and direction"),
):
    """Get all notebooks with optional filtering and ordering."""
    # Implementation
```



### Mô hình yêu cầu/phản hồi

Sử dụng mô hình Pydantic để xác nhận:



```python
from pydantic import BaseModel, Field
from typing import Optional

class NotebookCreate(BaseModel):
    name: str = Field(..., description="Name of the notebook", min_length=1)
    description: str = Field(default="", description="Description of the notebook")

class NotebookResponse(BaseModel):
    id: str
    name: str
    description: str
    archived: bool
    created: str
    updated: str
```



### Xử lý lỗi

Sử dụng phản hồi lỗi nhất quán:



```python
from fastapi import HTTPException
from loguru import logger

try:
    result = await some_operation()
    return result
except InvalidInputError as e:
    raise HTTPException(status_code=400, detail=str(e))
except DatabaseOperationError as e:
    logger.error(f"Database error: {str(e)}")
    raise HTTPException(status_code=500, detail="Internal server error")
```



### Tài liệu API

Sử dụng các tính năng tài liệu tự động của FastAPI:



```python
@router.post(
    "/notebooks",
    response_model=NotebookResponse,
    summary="Create a new notebook",
    description="Create a new notebook with the specified name and description.",
    responses={
        201: {"description": "Notebook created successfully"},
        400: {"description": "Invalid input data"},
        500: {"description": "Internal server error"}
    }
)
async def create_notebook(notebook: NotebookCreate):
    """Create a new notebook."""
    # Implementation
```



## Tiêu chuẩn cơ sở dữ liệu

### Mẫu DB siêu thực

Sử dụng mẫu kho lưu trữ một cách nhất quán:



```python
from open_notebook.database.repository import repo_create, repo_query, repo_update

# Create records
async def create_notebook(data: Dict[str, Any]) -> Dict[str, Any]:
    """Create a new notebook record."""
    return await repo_create("notebook", data)

# Query with parameters
async def find_notebooks_by_user(user_id: str) -> List[Dict[str, Any]]:
    """Find notebooks for a specific user."""
    return await repo_query(
        "SELECT * FROM notebook WHERE user_id = $user_id",
        {"user_id": user_id}
    )

# Update records
async def update_notebook(notebook_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
    """Update a notebook record."""
    return await repo_update("notebook", notebook_id, data)
```



### Quản lý lược đồ

Sử dụng di chuyển để thay đổi lược đồ:



```surrealql
-- migrations/8.surrealql
DEFINE TABLE IF NOT EXISTS new_feature SCHEMAFULL;
DEFINE FIELD IF NOT EXISTS name ON TABLE new_feature TYPE string;
DEFINE FIELD IF NOT EXISTS description ON TABLE new_feature TYPE option<string>;
DEFINE FIELD IF NOT EXISTS created ON TABLE new_feature TYPE datetime DEFAULT time::now();
DEFINE FIELD IF NOT EXISTS updated ON TABLE new_feature TYPE datetime DEFAULT time::now();
```



## Tiêu chuẩn TypeScript

### Nguyên tắc cơ bản

Thực hiện theo các phương pháp hay nhất của TypeScript:

- Sử dụng chế độ nghiêm ngặt được bật trong `tsconfig.json`
- Sử dụng chú thích kiểu thích hợp cho tất cả các biến và hàm
- Tránh sử dụng kiểu `any` trừ khi thực sự cần thiết
- Sử dụng `giao diện` cho hình dạng đối tượng, `type` cho công đoàn và các loại nâng cao khác

### Cấu trúc thành phần

- Sử dụng các thành phần chức năng có móc
- Giữ các thành phần tập trung và chịu trách nhiệm duy nhất
- Trích xuất logic có thể tái sử dụng vào các móc tùy chỉnh
- Sử dụng các loại TypeScript thích hợp cho đạo cụ

### Xử lý lỗi

- Xử lý lỗi rõ ràng
- Cung cấp thông báo lỗi có ý nghĩa
- Ghi lại lỗi một cách thích hợp
- Đừng âm thầm ngăn chặn lỗi

## Công cụ chất lượng mã

Chúng tôi sử dụng những công cụ này để duy trì chất lượng mã:

- **Ruff**: Linting và định dạng mã
  - Chạy với: `uv run ruff check . --sửa`
  - Format với: `uv run ruff format .`

- **MyPy**: Kiểm tra kiểu tĩnh
  - Chạy với: `uv run python -m mypy .`

- **Pytest**: Khung thử nghiệm
  - Chạy với: `uv run pytest`

## Các mẫu phổ biến

### Hoạt động cơ sở dữ liệu không đồng bộ



```python
async def get_notebook_with_sources(notebook_id: str) -> Notebook:
    """Retrieve notebook with all related sources."""
    notebook_data = await repo_query(
        "SELECT * FROM notebook WHERE id = $id",
        {"id": notebook_id}
    )
    if not notebook_data:
        raise InvalidInputError(f"Notebook {notebook_id} not found")

    sources_data = await repo_query(
        "SELECT * FROM source WHERE notebook_id = $notebook_id",
        {"notebook_id": notebook_id}
    )

    return Notebook(
        **notebook_data[0],
        sources=[Source(**s) for s in sources_data]
    )
```



### Xác thực mô hình



```python
from pydantic import BaseModel, validator

class NotebookInput(BaseModel):
    name: str
    description: str = ""

    @validator('name')
    def name_not_empty(cls, v):
        if not v.strip():
            raise ValueError('Name cannot be empty')
        return v.strip()
```



## Danh sách kiểm tra đánh giá mã

Trước khi gửi mã để xem xét, hãy đảm bảo:

- [ ] Mã tuân theo các phương pháp hay nhất về PEP 8 / TypeScript
- [ ] Gợi ý loại có sẵn cho tất cả các chức năng
- [] Chuỗi tài liệu đầy đủ và chính xác
- [ ] Xử lý lỗi phù hợp
- [ ] Các bài kiểm tra được bao gồm và vượt qua
- [] Không để lại mã gỡ lỗi (console.logs, câu lệnh in)
- [ ] Thông điệp cam kết rõ ràng và tuân theo các quy ước
- [ ] Tài liệu được cập nhật nếu cần

---

**Xem thêm:**
- [Hướng dẫn kiểm tra](testing.md) - Cách viết bài kiểm tra
- [Hướng dẫn đóng góp](contributing.md) - Quy trình đóng góp tổng thể