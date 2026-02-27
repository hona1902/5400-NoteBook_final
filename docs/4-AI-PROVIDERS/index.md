# Nhà cung cấp AI - Hướng dẫn so sánh và lựa chọn

Open Notebook hỗ trợ hơn 15 nhà cung cấp AI. Hướng dẫn này giúp bạn **chọn nhà cung cấp phù hợp** cho nhu cầu của bạn.

> 💡 **Chỉ muốn thiết lập nhà cung cấp?** Hãy chuyển đến [Hướng dẫn cấu hình](../5-CONFIGUration/ai-providers.md) để biết hướng dẫn thiết lập chi tiết.

---

## Quyết định nhanh: Nhà cung cấp nào?

### Nhà cung cấp đám mây (Dễ nhất)

**OpenAI (Được khuyến nghị)**
- Chi phí: ~0,03-0,15 USD cho mỗi 1K mã thông báo
- Tốc độ: Rất nhanh
- Chất lượng: Tuyệt vời
- Tốt nhất cho: Hầu hết người dùng (cân bằng chất lượng/giá cả tốt nhất)

→ [Hướng dẫn thiết lập](../5-CONFIGUTURE/ai-providers.md#openai)

**Nhân loại (Claude)**
- Chi phí: ~$0,80-3,00 cho mỗi 1M token
- Tốc độ: Nhanh
- Chất lượng: Tuyệt vời
- Tốt nhất cho: Ngữ cảnh dài (200K token), lý luận, AI mới nhất
- Ưu điểm: Xử lý ngữ cảnh dài vượt trội

→ [Hướng dẫn thiết lập](../5-CONFIGUTURE/ai-providers.md#anthropic-claude)

**Google Song Tử**
- Chi phí: ~ 0,075-0,30 USD cho mỗi 1K mã thông báo
- Tốc độ: Rất nhanh
- Chất lượng: Tốt đến xuất sắc
- Tốt nhất cho: Đa phương thức (hình ảnh, âm thanh, video)
- Ưu điểm: Bối cảnh dài nhất (lên tới 2 triệu token)

→ [Hướng dẫn thiết lập](../5-CONFIGUTURE/ai-providers.md#google-gemini)

**Groq (Siêu nhanh)**
- Chi phí: ~0,05 USD cho mỗi 1 triệu token (rẻ nhất)
- Tốc độ: Cực nhanh (nhanh nhất hiện có)
- Chất lượng: Tốt
- Tốt nhất cho: Có ý thức về ngân sách, chuyển đổi, các nhiệm vụ quan trọng về tốc độ
- Nhược điểm: Lựa chọn mẫu mã hạn chế

→ [Hướng dẫn thiết lập](../5-CONFIGUTURE/ai-providers.md#groq)

**OpenRouter (Hơn 100 mẫu)**
- Chi phí: Trả tiền cho mỗi mô hình (rất khác nhau)
- Tốc độ: Khác nhau tùy theo model
- Chất lượng: Tùy từng mẫu
- Tốt nhất cho: So sánh mô hình, thử nghiệm, thanh toán thống nhất
- Ưu điểm: Một khóa API cho hơn 100 mô hình từ các nhà cung cấp khác nhau

→ [Hướng dẫn thiết lập](../5-CONFIGUration/ai-providers.md#openrouter)

### Cục bộ / Tự lưu trữ (Miễn phí)

**Ollama (Được đề xuất cho địa phương)**
- Chi phí: Miễn phí (chỉ tiền điện)
- Tốc độ: Phụ thuộc vào phần cứng (chậm CPU, nhanh GPU)
- Chất lượng: Tốt (mô hình mã nguồn mở)
- Thiết lập: 10 phút
- Tốt nhất cho: Sử dụng ngoại tuyến, ưu tiên quyền riêng tư
- Quyền riêng tư: 100% cục bộ, không có gì rời khỏi máy của bạn

→ [Hướng dẫn thiết lập](../5-CONFIGUration/ai-providers.md#ollama-recommends-for-local)

**LM Studio (Thay thế)**
- Chi phí: Miễn phí (chỉ tiền điện)
- Tốc độ: Phụ thuộc vào phần cứng
- Chất lượng: Tốt (cùng model với Ollama)
- Thiết lập: 15 phút (giao diện GUI)
- Tốt nhất cho: Người dùng không rành về kỹ thuật thích GUI hơn CLI
- Quyền riêng tư: 100% địa phương

→ [Hướng dẫn thiết lập](../5-CONFIGUration/ai-providers.md#lm-studio-local-alternative)

###Doanh nghiệp

**Azure OpenAI**
- Chi phí: Tương tự như OpenAI (dựa trên mức sử dụng)
- Tốc độ: Rất nhanh
- Chất lượng: Xuất sắc (cùng model với OpenAI)
- Thiết lập: 10 phút (phức tạp hơn)
- Tốt nhất cho: Doanh nghiệp, tuân thủ (HIPAA, SOC2), tích hợp VPC

→ [Hướng dẫn thiết lập](../5-CONFIGUration/ai-providers.md#azure-openai)

---

## Bảng so sánh

| Nhà cung cấp | Tốc độ | Chi phí | Chất lượng | Quyền riêng tư | Thiết lập | Bối cảnh |
|----------|-------|------|----------|--------|-------|--------|
| **OpenAI** | Rất nhanh | $$ | Xuất sắc | Thấp | 5 phút | 128K |
| **Nhân loại** | Nhanh | $$ | Xuất sắc | Thấp | 5 phút | 200K |
| **Google** | Rất nhanh | $$ | Tốt-Xuất sắc | Thấp | 5 phút | 2 triệu |
| **Ngớ ngẩn** | Cực Nhanh | $ | Tốt | Thấp | 5 phút | 32K |
| **OpenRouter** | Khác nhau | Khác nhau | Khác nhau | Thấp | 5 phút | Khác nhau |
| **Ollama** | Chậm-Trung bình | Miễn phí | Tốt | Tối đa | 10 phút | Khác nhau |
| **LM Studio** | Chậm-Trung bình | Miễn phí | Tốt | Tối đa | 15 phút | Khác nhau |
| **Azure** | Rất nhanh | $$ | Xuất sắc | Cao | 10 phút | 128K |

---

## Chọn nhà cung cấp của bạn

### Tôi muốn thiết lập dễ dàng nhất
→ **OpenAI** — Phổ biến nhất, hỗ trợ cộng đồng tốt nhất

### Tôi có ngân sách không giới hạn
→ **OpenAI** — Chất lượng tốt nhất

### Tôi muốn tiết kiệm tiền
→ **Groq** — Đám mây rẻ nhất ($0,05 trên 1M token)

### Tôi muốn quyền riêng tư/ngoại tuyến
→ **Ollama** — Miễn phí, địa phương, riêng tư

### Tôi muốn có GUI (không phải CLI)
→ **LM Studio** — Ứng dụng dành cho máy tính để bàn

### Tôi đang ở doanh nghiệp
→ **Azure OpenAI** — Tuân thủ, hỗ trợ

### Tôi cần ngữ cảnh dài (hơn 200K mã thông báo)
→ **Nhân loại** — Mô hình ngữ cảnh dài tốt nhất

### Tôi cần đa phương thức (hình ảnh, âm thanh, video)
→ **Google Gemini** — Hỗ trợ đa phương thức tốt nhất

### Tôi muốn truy cập vào nhiều mô hình bằng một khóa API
→ **OpenRouter** — Hơn 100 mẫu, thanh toán thống nhất

---

## Bạn đã sẵn sàng thiết lập nhà cung cấp của mình chưa?

Bây giờ bạn đã chọn nhà cung cấp, hãy làm theo hướng dẫn thiết lập chi tiết:

→ **[Hướng dẫn cấu hình nhà cung cấp AI](../5-CONFIGUration/ai-providers.md)**

Hướng dẫn này bao gồm:
- Hướng dẫn thiết lập từng bước cho từng nhà cung cấp thông qua Giao diện người dùng Cài đặt
- Cách thêm thông tin xác thực, kiểm tra kết nối và khám phá mô hình
- Lựa chọn mô hình và đề xuất
- Khắc phục sự cố dành riêng cho nhà cung cấp
- Yêu cầu phần cứng (đối với nhà cung cấp địa phương)
- Mẹo tối ưu hóa chi phí

---

## Công cụ ước tính chi phí

### OpenAI

```
Light use (10 chats/day): $1-5/month
Medium use (50 chats/day): $10-30/month
Heavy use (all-day use): $50-100+/month
```



### Nhân học

```
Light use: $1-3/month
Medium use: $5-20/month
Heavy use: $20-50+/month
```



### Groq

```
Light use: $0-1/month
Medium use: $2-5/month
Heavy use: $5-20/month
```



###Ollama

```
Any use: Free (electricity only)
8GB GPU running 24/7: ~$10/month electricity
```



---

## Các bước tiếp theo

1. **Bạn đã chọn nhà cung cấp** (từ hướng dẫn so sánh này)
2. **Làm theo hướng dẫn thiết lập**: [Cấu hình nhà cung cấp AI](../5-CONFIGUration/ai-providers.md)
3. **Thêm thông tin xác thực của bạn** trong Cài đặt → Khóa API
4. **Kiểm tra kết nối của bạn** và khám phá các mô hình
5. **Bắt đầu sử dụng Open Notebook!**

---

## Cần trợ giúp?

- **Vấn đề về thiết lập?** Xem [Cấu hình nhà cung cấp AI](../5-CONFIGUTURE/ai-providers.md) để biết cách khắc phục sự cố chi tiết cho mỗi nhà cung cấp
- **Các vấn đề chung?** Kiểm tra [Hướng dẫn khắc phục sự cố](../6-KHẮC PHỤC SỰ CỐ/index.md)
- **Câu hỏi?** Tham gia [cộng đồng Discord](https://discord.gg/37XJPXfz2w)