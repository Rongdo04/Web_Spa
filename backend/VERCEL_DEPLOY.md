# Hướng dẫn Deploy Backend lên Vercel

## Cấu trúc đã được setup

1. **`api/index.js`**: Export Express app như serverless function cho Vercel
2. **`vercel.json`**: Cấu hình Vercel để build và route requests
3. **`.vercelignore`**: Loại trừ các file không cần thiết khi deploy

## Các bước deploy

### 1. Cài đặt Vercel CLI (nếu chưa có)
```bash
npm i -g vercel
```

### 2. Login vào Vercel
```bash
vercel login
```

### 3. Deploy từ folder backend
```bash
cd backend
vercel
```

Hoặc deploy production:
```bash
vercel --prod
```

### 4. Cấu hình Environment Variables

Trên Vercel Dashboard, thêm các biến môi trường sau:

- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key cho JWT
- `JWT_REFRESH_SECRET`: Secret key cho refresh token
- `EMAIL_HOST`: SMTP host
- `EMAIL_PORT`: SMTP port
- `EMAIL_USER`: Email user
- `EMAIL_PASS`: Email password
- `EMAIL_FROM`: Email from address
- `ALLOWED_ORIGINS`: Các origin được phép (comma-separated)
- `NODE_ENV`: `production`

### 5. Kiểm tra deployment

Sau khi deploy, Vercel sẽ cung cấp URL như:
- `https://your-project.vercel.app`

Test API:
```bash
curl https://your-project.vercel.app/api/health
```

## Lưu ý quan trọng

1. **MongoDB Connection**: Đảm bảo MongoDB URI có thể truy cập từ internet (không phải localhost)
2. **CORS**: Cấu hình `ALLOWED_ORIGINS` để cho phép frontend domain
3. **Cold Start**: Lần đầu tiên request có thể chậm hơn do cold start của serverless function
4. **Timeout**: Vercel có giới hạn timeout (10s cho Hobby plan, 60s cho Pro)

## Troubleshooting

### Lỗi kết nối MongoDB
- Kiểm tra MongoDB URI có đúng format không
- Đảm bảo MongoDB có thể truy cập từ internet
- Kiểm tra IP whitelist trên MongoDB Atlas (nếu dùng Atlas)

### Lỗi CORS
- Kiểm tra `ALLOWED_ORIGINS` trong environment variables
- Đảm bảo frontend domain được thêm vào danh sách

### Timeout errors
- Kiểm tra database queries có tối ưu không
- Cân nhắc upgrade plan nếu cần timeout dài hơn

