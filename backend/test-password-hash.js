// Test script để kiểm tra hash mật khẩu
import bcrypt from "bcryptjs";

const testPasswords = [
  "123456",
  "password123",
  "0123456789", // Số điện thoại
  "admin123",
  "customer_password",
];

console.log("🔐 Testing Password Hashing\n");

for (const password of testPasswords) {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    console.log(`Original: ${password}`);
    console.log(`Hashed:   ${hashedPassword}`);
    console.log(`Length:   ${hashedPassword.length} characters`);

    // Test verification
    const isValid = await bcrypt.compare(password, hashedPassword);
    console.log(`Verify:   ${isValid ? "✅ Valid" : "❌ Invalid"}`);
    console.log("─".repeat(60));
  } catch (error) {
    console.error(`❌ Error hashing password "${password}":`, error.message);
  }
}

console.log("\n📝 Notes:");
console.log("- Salt rounds: 10 (recommended for production)");
console.log("- Hash length: ~60 characters");
console.log("- Each hash is unique even for same password");
console.log("- Use bcrypt.compare() to verify passwords");
