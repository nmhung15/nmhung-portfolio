# Hướng dẫn cập nhật và deploy portfolio lên Vercel

Repository GitHub này đã được kết nối với project Vercel. Nhánh production là `main`; mỗi lần push commit lên nhánh này, Vercel sẽ tự deploy production. Không cần chạy `deploy.ps1`, `deploy.sh` hoặc lệnh Vercel CLI cho các lần cập nhật thông thường.

## Mỗi lần cập nhật website

1. Sửa các file cần thiết, ví dụ `index.html`, `style.css`, `script.js` hoặc nội dung trong `images/`.
2. Mở PowerShell tại thư mục project và xem các file đã thay đổi:

   ```powershell
   git status
   ```

3. Stage đúng các file muốn đưa lên GitHub. Thay đường dẫn mẫu bằng các file thực tế đã sửa:

   ```powershell
   git add index.html style.css
   ```

4. Tạo commit:

   ```powershell
   git commit -m "Update portfolio"
   ```

5. Push lên nhánh production:

   ```powershell
   git push origin main
   ```

6. Vào Vercel → project → **Deployments** để theo dõi deployment mới. Khi trạng thái là **Ready**, mở domain production để kiểm tra website.

> Chỉ push những file cần thiết. Không commit `.env`, token, hoặc thông tin bí mật.

## Preview trước khi đưa lên production (tuỳ chọn)

Nếu push lên một nhánh khác `main`, Vercel thường tạo Preview Deployment thay vì cập nhật production. Có thể kiểm tra preview trước, sau đó merge nhánh đó vào `main` để deploy bản production.

## Nếu push mà Vercel không deploy

1. Kiểm tra commit đã được push lên GitHub:

   ```powershell
   git status
   git log -1 --oneline
   ```

2. Trong Vercel, mở project → **Settings → Git**. Kiểm tra đúng repository đã kết nối, nhánh **Production Branch** là `main`, và Vercel vẫn có quyền truy cập repository private.
3. Mở **Deployments** và xem deployment bị lỗi. Chọn deployment để đọc build/deploy logs và xử lý lỗi hiển thị.
4. Sau khi sửa lỗi, commit và push lại lên `main`.

Các script CLI trong thư mục này chỉ dành cho deploy thủ công khi cần; không dùng chúng trong quy trình cập nhật Git thông thường.
