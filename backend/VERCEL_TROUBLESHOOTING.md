# Troubleshooting Vercel Deployment

## Lỗi phổ biến và cách xử lý

### 1. FUNCTION_INVOCATION_FAILED

**Nguyên nhân:**
- Export handler không đúng format
- Database connection fail và crash function
- Module import/export lỗi
- Thiếu environment variables

**Cách xử lý:**
1. Kiểm tra `api/index.js` export đúng format:
   ```js
   export default (req, res) => {
     return app(req, res);
   };
   ```

2. Kiểm tra database connection không crash function:
   - Đã cập nhật `config/database.js` để không `process.exit(1)` trong serverless
   - Connection được xử lý async trong `server.js`

3. Kiểm tra environment variables trên Vercel Dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `ALLOWED_ORIGINS`
   - Các biến khác cần thiết

4. Kiểm tra logs trên Vercel Dashboard để xem lỗi cụ thể

### 2. Database Connection Timeout

**Nguyên nhân:**
- MongoDB URI không đúng
- IP whitelist trên MongoDB Atlas
- Network timeout

**Cách xử lý:**
1. Kiểm tra MongoDB URI format:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
   ```

2. Trên MongoDB Atlas:
   - Network Access: Thêm `0.0.0.0/0` (allow all IPs) hoặc Vercel IP ranges
   - Database Access: Kiểm tra user có quyền truy cập

3. Thêm connection options trong `config/database.js`:
   ```js
   {
     serverSelectionTimeoutMS: 5000,
     socketTimeoutMS: 45000,
   }
   ```

### 3. CORS Errors

**Nguyên nhân:**
- `ALLOWED_ORIGINS` không đúng
- Frontend domain không được whitelist

**Cách xử lý:**
1. Kiểm tra `ALLOWED_ORIGINS` trên Vercel:
   ```
   https://your-frontend.vercel.app,https://your-domain.com
   ```

2. Cập nhật CORS trong `server.js` nếu cần

### 4. Module Import Errors

**Nguyên nhân:**
- ES modules không được hỗ trợ đúng
- Path resolution lỗi

**Cách xử lý:**
1. Kiểm tra `package.json` có `"type": "module"`
2. Sử dụng relative imports: `./config/database.js`
3. Kiểm tra tất cả imports đều có extension `.js`

### 5. Timeout Errors

**Nguyên nhân:**
- Function execution quá lâu
- Database queries chậm

**Cách xử lý:**
1. Tối ưu database queries
2. Sử dụng indexes
3. Upgrade Vercel plan nếu cần timeout dài hơn

## Kiểm tra logs

1. Vào Vercel Dashboard
2. Chọn project
3. Vào tab "Functions" hoặc "Deployments"
4. Click vào deployment mới nhất
5. Xem "Function Logs" để debug

## Test locally với Vercel CLI

```bash
cd backend
vercel dev
```

Sẽ chạy local với môi trường giống Vercel production.

