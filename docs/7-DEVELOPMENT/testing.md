#Hướng dẫn kiểm tra

Tài liệu này cung cấp hướng dẫn viết bài kiểm tra trong Open Notebook. Kiểm tra là rất quan trọng để duy trì chất lượng mã và ngăn ngừa hồi quy.

## Triết lý kiểm thử

### Kiểm tra cái gì

Tập trung vào việc kiểm tra những điều quan trọng nhất:

- **Logic nghiệp vụ** - Các mô hình miền cốt lõi và hoạt động của chúng
- **Hợp đồng API** - Hành vi và xử lý lỗi của điểm cuối HTTP
- **Quy trình quan trọng** - Quy trình từ đầu đến cuối mà người dùng phụ thuộc vào
- **Tính ổn định của dữ liệu** - Hoạt động của cơ sở dữ liệu và tính toàn vẹn của dữ liệu
- **Điều kiện lỗi** - Cách hệ thống xử lý lỗi một cách khéo léo

### Điều KHÔNG nên kiểm tra

Đừng lãng phí thời gian kiểm tra mã khung:

- Chức năng khung (FastAPI, React, v.v.)
- Triển khai thư viện của bên thứ ba
- Getters/setters đơn giản không có logic
- Hiển thị lớp xem/trình bày (trừ khi nó chứa logic)

## Cấu trúc kiểm tra

Chúng tôi sử dụng **pytest** với sự hỗ trợ không đồng bộ cho tất cả các bài kiểm tra Python:



```python
import pytest
from httpx import AsyncClient
from open_notebook.domain.notebook import Notebook

@pytest.mark.asyncio
async def test_create_notebook():
    """Test notebook creation."""
    notebook = Notebook(name="Test Notebook", description="Test description")
    await notebook.save()

    assert notebook.id is not None
    assert notebook.name == "Test Notebook"
    assert notebook.created is not None

@pytest.mark.asyncio
async def test_api_create_notebook():
    """Test notebook creation via API."""
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post(
            "/api/notebooks",
            json={"name": "Test Notebook", "description": "Test description"}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["name"] == "Test Notebook"
```



## Hạng mục kiểm tra

### 1. Kiểm tra đơn vị

Kiểm tra các chức năng và phương pháp riêng lẻ một cách riêng biệt:



```python
@pytest.mark.asyncio
async def test_notebook_validation():
    """Test that notebook name validation works."""
    with pytest.raises(InvalidInputError):
        Notebook(name="", description="test")

@pytest.mark.asyncio
async def test_notebook_archive():
    """Test notebook archiving."""
    notebook = Notebook(name="Test", description="")
    notebook.archive()
    assert notebook.archived is True
```



**Vị trí**: `tests/unit/`

### 2. Kiểm tra tích hợp

Kiểm tra các tương tác thành phần và hoạt động cơ sở dữ liệu:



```python
@pytest.mark.asyncio
async def test_create_notebook_with_sources():
    """Test creating a notebook and adding sources."""
    notebook = await create_notebook(name="Research", description="")
    source = await add_source(notebook_id=notebook.id, url="https://example.com")

    retrieved = await get_notebook_with_sources(notebook.id)
    assert len(retrieved.sources) == 1
    assert retrieved.sources[0].id == source.id
```



**Vị trí**: `kiểm tra/tích hợp/`

### 3. Kiểm tra API

Kiểm tra điểm cuối HTTP và phản hồi lỗi:



```python
@pytest.mark.asyncio
async def test_get_notebooks_endpoint():
    """Test GET /notebooks endpoint."""
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.get("/api/notebooks")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)

@pytest.mark.asyncio
async def test_create_notebook_validation():
    """Test that invalid input is rejected."""
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post(
            "/api/notebooks",
            json={"name": "", "description": ""}
        )
        assert response.status_code == 400
```



**Vị trí**: `tests/api/`

### 4. Kiểm tra cơ sở dữ liệu

Kiểm tra tính bền vững của dữ liệu và tính chính xác của truy vấn:



```python
@pytest.mark.asyncio
async def test_save_and_retrieve_notebook():
    """Test saving and retrieving a notebook from database."""
    notebook = Notebook(name="Test", description="desc")
    await notebook.save()

    retrieved = await Notebook.get(notebook.id)
    assert retrieved.name == "Test"
    assert retrieved.description == "desc"

@pytest.mark.asyncio
async def test_query_by_criteria():
    """Test querying notebooks by criteria."""
    await create_notebook("Active", "")
    await create_notebook("Archived", "")

    active = await repo_query(
        "SELECT * FROM notebook WHERE archived = false"
    )
    assert len(active) >= 1
```



**Vị trí**: `tests/database/`

## Đang chạy thử nghiệm

### Chạy tất cả các bài kiểm tra



```bash
uv run pytest
```



### Chạy file test cụ thể



```bash
uv run pytest tests/test_notebooks.py
```



### Chạy chức năng kiểm tra cụ thể



```bash
uv run pytest tests/test_notebooks.py::test_create_notebook
```



### Chạy với Báo cáo Bảo hiểm



```bash
uv run pytest --cov=open_notebook
```



### Chỉ chạy thử nghiệm đơn vị



```bash
uv run pytest tests/unit/
```



### Chỉ chạy thử nghiệm tích hợp



```bash
uv run pytest tests/integration/
```



### Chạy thử nghiệm ở chế độ dài dòng



```bash
uv run pytest -v
```



### Chạy thử nghiệm với đầu ra



```bash
uv run pytest -s
```



## Lịch thi đấu thử nghiệm

Sử dụng đồ đạc pytest để thiết lập và tháo dỡ chung:



```python
import pytest

@pytest.fixture
async def test_notebook():
    """Create a test notebook."""
    notebook = Notebook(name="Test Notebook", description="Test description")
    await notebook.save()
    yield notebook
    await notebook.delete()

@pytest.fixture
async def api_client():
    """Create an API test client."""
    async with AsyncClient(app=app, base_url="http://test") as client:
        yield client

@pytest.fixture
async def test_notebook_with_sources(test_notebook):
    """Create a test notebook with sample sources."""
    source1 = Source(notebook_id=test_notebook.id, url="https://example.com")
    source2 = Source(notebook_id=test_notebook.id, url="https://example.org")
    await source1.save()
    await source2.save()

    test_notebook.sources = [source1, source2]
    yield test_notebook

    # Cleanup
    await source1.delete()
    await source2.delete()
```



## Các phương pháp hay nhất

### 1. Viết tên bài thi mang tính mô tả



```python
# Good - clearly describes what is being tested
async def test_create_notebook_with_valid_name_succeeds():
    ...

# Bad - vague about what's being tested
async def test_notebook():
    ...
```



### 2. Sử dụng chuỗi tài liệu



```python
@pytest.mark.asyncio
async def test_vector_search_returns_sorted_results():
    """Test that vector search results are sorted by relevance score."""
    # Implementation
```



### 3. Các trường hợp kiểm tra cạnh



```python
@pytest.mark.asyncio
async def test_search_with_empty_query():
    """Test that empty query raises error."""
    with pytest.raises(InvalidInputError):
        await vector_search("")

@pytest.mark.asyncio
async def test_search_with_very_long_query():
    """Test that very long query is handled."""
    long_query = "x" * 10000
    results = await vector_search(long_query)
    assert isinstance(results, list)

@pytest.mark.asyncio
async def test_search_with_special_characters():
    """Test that special characters are handled."""
    results = await vector_search("@#$%^&*()")
    assert isinstance(results, list)
```



### 4. Sử dụng Assertions hiệu quả



```python
# Good - specific assertions
assert notebook.name == "Test"
assert len(notebook.sources) == 3
assert notebook.created is not None

# Less good - too broad
assert notebook is not None
assert notebook  # ambiguous what's being tested
```



### 5. Kiểm tra cả trường hợp thành công và thất bại



```python
@pytest.mark.asyncio
async def test_create_notebook_success():
    """Test successful notebook creation."""
    notebook = await create_notebook(name="Research", description="AI")
    assert notebook.id is not None
    assert notebook.name == "Research"

@pytest.mark.asyncio
async def test_create_notebook_empty_name_fails():
    """Test that empty name raises error."""
    with pytest.raises(InvalidInputError):
        await create_notebook(name="", description="")

@pytest.mark.asyncio
async def test_create_notebook_duplicate_fails():
    """Test that duplicate names are handled."""
    await create_notebook(name="Research", description="")
    with pytest.raises(DuplicateError):
        await create_notebook(name="Research", description="")
```



### 6. Giữ các bài kiểm tra độc lập



```python
# Good - test is self-contained
@pytest.mark.asyncio
async def test_archive_notebook():
    notebook = Notebook(name="Test", description="")
    await notebook.save()
    await notebook.archive()
    assert notebook.archived is True

# Bad - depends on another test's state
@pytest.mark.asyncio
async def test_archive_existing_notebook():
    # Assumes test_create_notebook ran first
    await notebook.archive()  # notebook undefined
```



### 7. Sử dụng Fixtures để thiết lập có thể tái sử dụng



```python
# Instead of repeating setup:
@pytest.fixture
async def client_with_auth(api_client, mock_auth):
    """Client with authentication set up."""
    api_client.headers.update({"Authorization": f"Bearer {mock_auth.token}"})
    yield api_client

@pytest.mark.asyncio
async def test_protected_endpoint(client_with_auth):
    """Test protected endpoint."""
    response = await client_with_auth.get("/api/protected")
    assert response.status_code == 200
```



## Mục tiêu phủ sóng

- Mục tiêu bao phủ tổng thể trên 70%
- Mức độ bao phủ hơn 90% cho logic kinh doanh quan trọng
- Đừng ám ảnh quá 100% - hãy tập trung vào những bài kiểm tra có ý nghĩa
- Sử dụng cờ `--cov` để kiểm tra mức độ phù hợp: `uv run pytest --cov=open_notebook`

## Mẫu thử nghiệm không đồng bộ

### Kiểm tra các hàm không đồng bộ



```python
@pytest.mark.asyncio
async def test_async_operation():
    """Test async function."""
    result = await some_async_function()
    assert result is not None
```



### Kiểm tra các hoạt động đồng thời



```python
@pytest.mark.asyncio
async def test_concurrent_notebook_creation():
    """Test creating multiple notebooks concurrently."""
    tasks = [
        create_notebook(f"Notebook {i}", "")
        for i in range(10)
    ]
    notebooks = await asyncio.gather(*tasks)
    assert len(notebooks) == 10
    assert all(n.id for n in notebooks)
```



## Các lỗi kiểm tra thường gặp

### Lỗi: "vòng lặp sự kiện đã đóng"

Giải pháp: Sử dụng lịch thi đấu không đồng bộ đúng cách:

```python
@pytest.fixture
async def notebook():  # Use async fixture
    notebook = Notebook(name="Test", description="")
    await notebook.save()
    yield notebook
    await notebook.delete()
```



### Lỗi: "đối tượng không thể chờ được"

Giải pháp: Đảm bảo bạn đang sử dụng chờ đợi:

```python
# Wrong
result = create_notebook("Test", "")

# Right
result = await create_notebook("Test", "")
```



---

**Xem thêm:**
- [Tiêu chuẩn mã](code-standards.md) - Định dạng và kiểu mã
- [Hướng dẫn đóng góp](contributing.md) - Quy trình đóng góp tổng thể