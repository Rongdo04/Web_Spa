# Hướng dẫn Deploy Frontend lên Vercel

## Tổng quan

Frontend được build bằng Vite và deploy như static site trên Vercel. Tất cả routes được serve thông qua `index.html` để hỗ trợ React Router (SPA routing).

## Cấu trúc đã được setup

1. **`vercel.json`**: Cấu hình Vercel với build command và output directory
2. **`vite.config.js`**: Base path đã được config là `/` cho production
3. **`package.json`**: Đã có build script `npm run build`

## Các bước deploy

### 1. Cài đặt Vercel CLI (nếu chưa có)
```bash
npm i -g vercel
```

### 2. Login vào Vercel
```bash
vercel login
```

### 3. Deploy từ folder client
```bash
cd client
vercel
```

Hoặc deploy production:
```bash
vercel --prod
```

### 4. Cấu hình Environment Variables

Trên Vercel Dashboard, thêm các biến môi trường sau:

#### Bắt buộc:
- `VITE_API_URL`: Backend API URL (ví dụ: `https://your-backend.vercel.app/api`)
  - **Lưu ý**: Phải có `/api` ở cuối nếu backend của bạn mount routes tại `/api`

#### Tùy chọn (có giá trị mặc định):
- `VITE_API_TIMEOUT`: Timeout cho API requests (mặc định: `10000` ms)
- `VITE_APP_NAME`: Tên ứng dụng (mặc định: `MERN Authentication`)
- `VITE_APP_VERSION`: Phiên bản ứng dụng (mặc định: `1.0.0`)
- `VITE_TOKEN_KEY`: Key để lưu token trong localStorage (mặc định: `token`)
- `VITE_USER_KEY`: Key để lưu user data trong localStorage (mặc định: `user`)
- `VITE_STORAGE_PREFIX`: Prefix cho storage keys (mặc định: `Web_spa_`)

#### Features flags:
- `VITE_ENABLE_NOTIFICATIONS`: Enable notifications (mặc định: `false`)
- `VITE_ENABLE_ANALYTICS`: Enable analytics (mặc định: `false`)
- `VITE_ENABLE_PWA`: Enable PWA features (mặc định: `false`)

Xem thêm tất cả environment variables trong `src/config/environment.js`.

## Build process

1. Vercel tự động chạy `npm install` để cài dependencies
2. Vercel chạy `npm run build` (theo `buildCommand` trong `vercel.json`)
3. Vite build output vào folder `dist/`
4. Vercel serve static files từ `dist/`
5. Routes được config để serve `index.html` cho mọi route (SPA routing)

## Cấu hình CORS

Đảm bảo backend đã được cấu hình CORS để cho phép frontend domain:

Trên Backend, trong `ALLOWED_ORIGINS` environment variable, thêm frontend URL:
```
https://your-frontend.vercel.app,https://your-domain.com
```

## Kiểm tra deployment

Sau khi deploy, Vercel sẽ cung cấp URL như:
- `https://your-project.vercel.app`

Test frontend:
1. Truy cập URL được cung cấp
2. Kiểm tra console browser để xem có lỗi không
3. Test các chức năng chính: login, register, navigation

## Troubleshooting

### Lỗi build failed

**Nguyên nhân:**
- Thiếu dependencies
- Build script lỗi
- Environment variables không đúng

**Cách xử lý:**
1. Kiểm tra logs trên Vercel Dashboard
2. Test build local: `npm run build`
3. Kiểm tra `package.json` có đúng build script không

### Lỗi API calls fail

**Nguyên nhân:**
- `VITE_API_URL` không đúng
- Backend chưa được deploy hoặc chưa config CORS
- Network issues

**Cách xử lý:**
1. Kiểm tra `VITE_API_URL` trên Vercel Dashboard
2. Test backend API trực tiếp: `curl https://your-backend.vercel.app/api/health`
3. Kiểm tra CORS config trên backend
4. Kiểm tra console browser để xem lỗi cụ thể

### Lỗi 404 khi refresh trang

**Nguyên nhân:**
- Routes không được config đúng trong `vercel.json`

**Cách xử lý:**
1. Kiểm tra `vercel.json` có route `{ "src": "/(.*)", "dest": "/index.html" }` không
2. Đảm bảo route này là route cuối cùng

### Assets không load được

**Nguyên nhân:**
- Base path không đúng
- Assets path không match với routes

**Cách xử lý:**
1. Kiểm tra `vite.config.js` có `base: "/"` không
2. Kiểm tra assets được build vào `dist/assets/` không
3. Kiểm tra route `/assets/(.*)` trong `vercel.json`

## Lưu ý quan trọng

1. **Frontend và Backend deploy riêng biệt**:
   - Frontend: Static site trên Vercel
   - Backend: Serverless functions trên Vercel
   - Mỗi project có URL riêng

2. **Environment Variables**:
   - Tất cả biến môi trường bắt đầu với `VITE_` sẽ được inject vào build
   - Sau khi thay đổi env vars, cần redeploy

3. **Build caching**:
   - Vercel cache node_modules và build artifacts
   - Nếu có vấn đề, có thể clear cache trong Vercel Dashboard

4. **Preview deployments**:
   - Mỗi PR/commit sẽ tạo preview deployment
   - Preview có URL riêng để test trước khi merge

## Continuous Deployment

Vercel tự động deploy khi:
- Push code lên main/master branch
- Merge pull request
- Manual trigger từ Vercel Dashboard

Để setup automatic deployment:
1. Connect GitHub repository trong Vercel Dashboard
2. Chọn branch để auto-deploy (thường là `main` hoặc `master`)
3. Configure build settings (đã có trong `vercel.json`)

