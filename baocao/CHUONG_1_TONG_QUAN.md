# CHƯƠNG 1: TỔNG QUAN

## 1.1. Giới thiệu đề tài

### 1.1.1. Tên đề tài

**"Xây dựng hệ thống quản lý Spa trực tuyến"**

### 1.1.2. Bối cảnh và lý do chọn đề tài

Trong thời đại công nghệ số hiện nay, việc ứng dụng công nghệ thông tin vào quản lý kinh doanh đã trở thành xu hướng tất yếu. Ngành dịch vụ Spa và làm đẹp đang phát triển mạnh mẽ với nhu cầu ngày càng cao của người dân về chăm sóc sức khỏe và làm đẹp.

Tuy nhiên, hầu hết các cơ sở Spa hiện tại vẫn đang sử dụng phương pháp quản lý truyền thống như:

- Ghi chép lịch hẹn bằng sổ sách
- Quản lý khách hàng thủ công
- Khó khăn trong việc theo dõi doanh thu và thống kê
- Thiếu hệ thống thông báo tự động
- Không có giao diện trực tuyến cho khách hàng

Điều này dẫn đến nhiều hạn chế trong việc quản lý và phục vụ khách hàng, đặc biệt là trong bối cảnh dịch bệnh COVID-19 khi khách hàng có xu hướng đặt lịch trực tuyến để tránh tiếp xúc.

### 1.1.3. Ý nghĩa thực tiễn

Hệ thống quản lý Spa trực tuyến sẽ mang lại nhiều lợi ích:

**Đối với chủ cơ sở Spa:**

- Quản lý lịch hẹn hiệu quả, tránh xung đột
- Theo dõi doanh thu và thống kê chi tiết
- Quản lý thông tin khách hàng và nhân viên
- Tự động hóa quy trình thông báo
- Tăng hiệu quả kinh doanh

**Đối với khách hàng:**

- Đặt lịch trực tuyến 24/7
- Xem lịch sử dịch vụ và đánh giá
- Nhận thông báo nhắc nhở tự động
- Trải nghiệm dịch vụ tốt hơn

**Đối với nhân viên:**

- Quản lý lịch làm việc rõ ràng
- Theo dõi hiệu suất công việc
- Giao diện thân thiện, dễ sử dụng

## 1.2. Mục tiêu nghiên cứu

### 1.2.1. Mục tiêu chính

Xây dựng một hệ thống quản lý Spa trực tuyến hoàn chỉnh, đáp ứng nhu cầu quản lý của các cơ sở Spa hiện đại.

### 1.2.2. Mục tiêu cụ thể

1. **Phân tích và thiết kế hệ thống:**

   - Nghiên cứu yêu cầu thực tế của ngành Spa
   - Thiết kế kiến trúc hệ thống phù hợp
   - Xây dựng cơ sở dữ liệu tối ưu

2. **Phát triển các chức năng chính:**

   - Hệ thống đăng ký/đăng nhập và phân quyền
   - Quản lý thông tin khách hàng và nhân viên
   - Quản lý dịch vụ và danh mục
   - Hệ thống đặt lịch hẹn trực tuyến
   - Quản lý lịch hẹn và trạng thái
   - Hệ thống thông báo tự động
   - Dashboard báo cáo và thống kê

3. **Xây dựng giao diện người dùng:**

   - Giao diện admin quản lý
   - Giao diện khách hàng đặt lịch
   - Thiết kế responsive, thân thiện với người dùng

4. **Đảm bảo chất lượng:**
   - Kiểm thử chức năng
   - Đảm bảo bảo mật thông tin
   - Tối ưu hiệu suất hệ thống

## 1.3. Đối tượng và phạm vi nghiên cứu

### 1.3.1. Đối tượng nghiên cứu

- Hệ thống quản lý Spa trực tuyến
- Các quy trình nghiệp vụ trong ngành Spa
- Công nghệ web hiện đại (Node.js, React, MongoDB)

### 1.3.2. Phạm vi nghiên cứu

**Phạm vi chức năng:**

- Quản lý người dùng (khách hàng, nhân viên, admin)
- Quản lý dịch vụ và danh mục
- Hệ thống đặt lịch hẹn
- Quản lý lịch hẹn và trạng thái
- Hệ thống thông báo
- Báo cáo và thống kê

**Phạm vi kỹ thuật:**

- Backend: Node.js, Express.js, MongoDB
- Frontend: React.js, HTML5, CSS3, JavaScript
- Authentication: JWT (JSON Web Token)
- API: RESTful API

**Phạm vi đối tượng sử dụng:**

- Admin: Quản lý toàn bộ hệ thống
- Nhân viên: Quản lý lịch hẹn và khách hàng
- Khách hàng: Đặt lịch và xem thông tin

## 1.4. Phương pháp nghiên cứu

### 1.4.1. Phương pháp thu thập dữ liệu

- **Nghiên cứu tài liệu:** Tìm hiểu các hệ thống quản lý Spa hiện có
- **Khảo sát thực tế:** Phân tích quy trình hoạt động của các cơ sở Spa
- **Nghiên cứu công nghệ:** Tìm hiểu các công nghệ web hiện đại

### 1.4.2. Phương pháp phát triển

- **Phương pháp hướng đối tượng:** Thiết kế và phát triển theo hướng đối tượng
- **Phương pháp Agile:** Phát triển theo từng giai đoạn, linh hoạt thay đổi
- **Phương pháp kiểm thử:** Kiểm thử từng module và toàn bộ hệ thống

### 1.4.3. Công cụ sử dụng

- **Phát triển:** Visual Studio Code, Git
- **Database:** MongoDB Compass
- **API Testing:** Postman
- **Design:** Figma, Adobe XD

## 1.5. Kết quả đạt được

### 1.5.1. Sản phẩm chính

Hệ thống quản lý Spa trực tuyến hoàn chỉnh với các tính năng:

1. **Hệ thống xác thực và phân quyền**

   - Đăng ký/đăng nhập an toàn
   - Phân quyền Admin/User
   - Bảo mật thông tin người dùng

2. **Quản lý người dùng**

   - Quản lý thông tin khách hàng
   - Quản lý nhân viên và lịch làm việc
   - Phân loại khách hàng theo mức độ VIP

3. **Quản lý dịch vụ**

   - CRUD dịch vụ và danh mục
   - Quản lý gói combo và add-ons
   - Hiển thị dịch vụ cho khách hàng

4. **Hệ thống đặt lịch hẹn**

   - Đặt lịch trực tuyến 24/7
   - Kiểm tra xung đột lịch tự động
   - Quản lý trạng thái lịch hẹn

5. **Hệ thống thông báo**

   - Thông báo email tự động
   - SMS nhắc nhở (tích hợp sẵn)
   - Quản lý template thông báo

6. **Dashboard và báo cáo**
   - Hiển thị KPI quan trọng
   - Thống kê doanh thu
   - Báo cáo hiệu suất nhân viên

### 1.5.2. Đóng góp khoa học

- Ứng dụng công nghệ web hiện đại vào quản lý Spa
- Thiết kế kiến trúc hệ thống tối ưu
- Xây dựng quy trình nghiệp vụ chuẩn hóa

### 1.5.3. Ý nghĩa thực tiễn

- Giải pháp hoàn chỉnh cho các cơ sở Spa
- Tăng hiệu quả quản lý và kinh doanh
- Cải thiện trải nghiệm khách hàng
- Dễ dàng triển khai và mở rộng

## 1.6. Cấu trúc đồ án

Đồ án được chia thành 4 chương chính:

**Chương 1: Tổng quan**

- Giới thiệu đề tài, mục tiêu, phạm vi nghiên cứu
- Phương pháp nghiên cứu và kết quả đạt được

**Chương 2: Cơ sở lý thuyết**

- Lý thuyết về hệ thống quản lý Spa
- Công nghệ sử dụng và kiến trúc hệ thống
- Các mô hình thiết kế phần mềm

**Chương 3: Thiết kế hệ thống**

- Kiến trúc tổng thể hệ thống
- Thiết kế cơ sở dữ liệu
- Thiết kế giao diện người dùng
- Sơ đồ luồng nghiệp vụ

**Chương 4: Phân tích hệ thống**

- Phân tích yêu cầu chức năng và phi chức năng
- Phân tích các module chính
- Đánh giá và kiểm thử
- Hướng phát triển tương lai

## 1.7. Kết luận chương

Chương 1 đã trình bày tổng quan về đề tài "Xây dựng hệ thống quản lý Spa trực tuyến". Đề tài được lựa chọn dựa trên nhu cầu thực tế của ngành Spa trong việc hiện đại hóa quy trình quản lý.

Hệ thống được thiết kế với mục tiêu đáp ứng đầy đủ các yêu cầu quản lý của một cơ sở Spa hiện đại, từ quản lý khách hàng, nhân viên, dịch vụ đến hệ thống đặt lịch hẹn trực tuyến và báo cáo thống kê.

Với việc sử dụng các công nghệ web hiện đại như Node.js, React và MongoDB, hệ thống đảm bảo tính hiệu quả, bảo mật và khả năng mở rộng trong tương lai.

Kết quả đạt được là một hệ thống quản lý Spa hoàn chỉnh, sẵn sàng triển khai trong thực tế và có thể đáp ứng nhu cầu của các cơ sở Spa từ quy mô nhỏ đến lớn.
