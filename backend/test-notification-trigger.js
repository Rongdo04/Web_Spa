// Test script để kiểm tra trigger notification
import { sendNotification } from "./services/notificationService.js";

// Test data mẫu
const testCustomerData = {
  id: "507f1f77bcf86cd799439011", // ID giả
  name: "Nguyễn Văn Test",
  phone: "0123456789",
  email: "test@example.com",
};

const testAppointmentData = {
  serviceName: "Massage thư giãn",
  appointmentDate: "2024-01-20",
  startTime: "09:00",
  endTime: "10:00",
  staffName: "Nguyễn Thị A",
  totalAmount: "500000",
  appointmentNumber: "APT240120001",
  branchName: "Chi nhánh chính",
};

// Test các trigger khác nhau
const testTriggers = [
  "appointment_created",
  "appointment_cancelled",
  "appointment_completed",
  "appointment_rescheduled",
];

async function testNotifications() {
  console.log("🧪 Testing notification triggers...\n");

  for (const trigger of testTriggers) {
    try {
      console.log(`📤 Testing trigger: ${trigger}`);
      const result = await sendNotification(
        trigger,
        testCustomerData,
        testAppointmentData
      );

      if (result.success) {
        console.log(`✅ ${trigger}: SUCCESS`);
        console.log(`   Message: ${result.message}`);
        if (result.results) {
          result.results.forEach((r) => {
            console.log(
              `   Channel ${r.channel}: ${r.success ? "Sent" : "Failed"}`
            );
          });
        }
      } else {
        console.log(`❌ ${trigger}: FAILED`);
        console.log(`   Error: ${result.message}`);
      }
    } catch (error) {
      console.log(`💥 ${trigger}: ERROR`);
      console.log(`   Error: ${error.message}`);
    }
    console.log(""); // Empty line
  }

  console.log("🏁 Test completed!");
}

// Chạy test
testNotifications().catch(console.error);
