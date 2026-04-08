# SeaFoam Photo 🌊📸

SeaFoam Photo là một ứng dụng Web tương tác hiện đại, được xây dựng trên nền tảng **React 19** kết hợp với kiến trúc **WordPress Plugin**. Dự án được thiết kế với giao diện đẹp mắt, linh hoạt cùng các hiệu ứng chuyển động mượt mà, đồng thời tích hợp sức mạnh của Trí tuệ Nhân tạo (Google GenAI) để nâng cao trải nghiệm người dùng.

Đặc biệt, dự án sử dụng kỹ thuật "Direct React serving" (triển khai trực tiếp luồng React build vào WordPress), bỏ qua hoàn toàn giao diện theme mặc định của WordPress để tận dụng tối đa sức mạnh tốc độ của Single Page Application (SPA).

---

## 🚀 Tính năng nổi bật

- **Giao diện người dùng hiện đại:** Ứng dụng Framer Motion và Tailwind CSS v4 mang lại trải nghiệm tương tác mượt mà, responsive, và tối ưu cảm quan.
- **Tích hợp Trí tuệ nhân tạo (AI):** Gọi API qua thư viện `@google/genai` để tự động hóa xử lý/mô tả dữ liệu hình ảnh nâng cao.
- **Tích hợp sâu WordPress (WordPress Deployment):** Gói mã nguồn của React được biên dịch thành một file duy nhất bằng `vite-plugin-singlefile` để triển khai gọn nhẹ dạng một Plugin PHP (`seafoam-wp-plugin`).
- **Hiệu suất cao:** Frontend không bị cản trở bởi Theme WordPress cổ điển, mang lại Performance tải cực nhanh.

## 🛠 Công nghệ sử dụng

- **Môi trường & Framework:** React (v19) / TypeScript / Vite 
- **Thiết kế & Styling:** TailwindCSS v4, Framer Motion, Lucide React
- **Trí tuệ nhân tạo:** Google Gemini API (`@google/genai`)
- **Tích hợp Backend:** WordPress Plugin (PHP)
- **Tự động hóa triển khai:** PowerShell Script (`wp-upload.ps1`)

---

## 📦 Kiến trúc & Triển khai

Không giống như các dự án Headless WordPress thông thường (dùng REST API/GraphQL ở 2 domain khác nhau), **SeaFoam Photo** chọn một đường lối tiếp cận khác để tiết kiệm tài nguyên Server:
1. Vite biên dịch toàn bộ React component thành một Bundle gọn nhẹ (Single File).
2. Mã nguồn biên dịch này được nhúng thẳng vào `seafoam-wp-plugin.php` thông qua Filter API của WordPress.
3. Người dùng truy cập WordPress sẽ thấy ngay giao diện React mượt mà trong khi Database, Dashboard và Asset Upload vẫn được quản trị thông qua WordPress.

### Hướng dẫn cài đặt

#### 1. Chạy trên môi trường Local (Dev)
Yêu cầu: Node.js > 20.x, npm hoặc yarn.
```bash
# Cài đặt thư viện
npm install

# Khởi chạy máy chủ nội bộ
npm run dev
```

#### 2. Triển khai lên WordPress
Để triển khai module lên website WordPress:
```bash
# Biên dịch dự án React
npm run build

# Chạy tệp script để đẩy plugin
./wp-upload.ps1
```

---

## 📄 Tài liệu Đồ án

Dự án này nằm trong khuôn khổ **Đồ án** nghiên cứu ứng dụng web. Các bạn có thể xem chi tiết kiến trúc, thiết kế và báo cáo tại thư mục `docs/`:

- [Báo cáo Đồ án (.pdf/pptx)](./docs/)

---
*Dự án được xây dựng và phát triển bởi Nguyễn Việt Dũng (nvietdung2k4-dot)*
