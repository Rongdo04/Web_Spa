// seed.js - Populate MongoDB with mock data from seeders
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/database.js";
import {
  User,
  Service,
  Staff,
  Appointment,
  Category,
  NotificationTemplate,
  NotificationLog,
} from "./models/index.js";

// Mock seeders (in-memory) - we'll transform to DB docs
import { services as seedServices } from "./seeders/servicesSeeder.js";
import { staff as seedStaff } from "./seeders/staffSeeder.js";
import { appointments as seedAppointments } from "./seeders/appointmentsSeeder.js";
// import { customers as seedCustomers } from "./seeders/customersSeeder.js"; // No longer needed
import { categories as seedCategories } from "./seeders/categoriesSeeder.js";
import {
  templates as seedTemplates,
  notificationLogs as seedLogs,
} from "./seeders/notificationsSeeder.js";

dotenv.config();

const run = async () => {
  try {
    await connectDB();

    // Handle legacy or incorrect indexes that may conflict with seeding
    try {
      // Drop potential legacy unique index on users.phone if it exists
      // This avoids E11000 duplicate key on { phone: null }
      await User.collection.dropIndex("phone_1");
      console.log("ℹ️ Dropped legacy index users.phone_1");
    } catch (e) {
      // Ignore if index does not exist
    }

    try {
      // Drop legacy text indexes that might use language override 'language'
      await NotificationTemplate.collection.dropIndexes();
      await NotificationTemplate.syncIndexes();
      console.log("ℹ️ Reset NotificationTemplate indexes");
    } catch (e) {
      // Ignore if cannot drop (e.g., no indexes yet)
    }

    // Clear collections
    await Promise.all([
      User.deleteMany({}),
      Service.deleteMany({}),
      Staff.deleteMany({}),
      Appointment.deleteMany({}),
      Category.deleteMany({}),
      NotificationTemplate.deleteMany({}),
      NotificationLog.deleteMany({}),
    ]);

    // 1) Users (create one admin and 5 users)
    const adminUser = await User.create({
      name: "Ngoc Anh",
      email: "ngocanh@gmail.com",
      password: "123456",
      role: "admin",
      isEmailVerified: true,
    });

    const userDocs = await User.insertMany(
      Array.from({ length: 5 }).map((_, idx) => ({
        name: `User ${idx + 1}`,
        email: `user${idx + 1}@example.com`,
        password: "password123",
        role: "user",
        isEmailVerified: true,
        phone: `012345678${idx}`,
        totalSpent: Math.floor(Math.random() * 5000000),
        totalAppointments: Math.floor(Math.random() * 20),
        level: ["Thường", "Loyal", "Premium", "VIP"][
          Math.floor(Math.random() * 4)
        ],
        points: Math.floor(Math.random() * 1000),
        preferences: {
          communication: {
            email: true,
            sms: true,
            phone: false,
          },
        },
      }))
    );

    // 2) Categories (create hierarchical categories)
    console.log("📁 Seeding categories...");

    // First create root categories
    const rootCategories = seedCategories.filter(
      (cat) => cat.parentCategory === null
    );
    const categoryDocs = await Category.insertMany(
      rootCategories.map((cat) => ({
        name: cat.name,
        description: cat.description,
        slug: cat.slug,
        icon: cat.icon,
        color: cat.color,
        displayOrder: cat.displayOrder,
        isActive: cat.isActive,
        parentCategory: null,
        level: 0,
        path: "",
        serviceCount: 0,
        seoTitle: cat.seoTitle,
        seoDescription: cat.seoDescription,
        createdBy: adminUser._id,
      }))
    );

    // Create a map for easy lookup
    const categoryMap = new Map();
    rootCategories.forEach((cat, index) => {
      categoryMap.set(cat.id, categoryDocs[index]._id);
    });

    // Then create subcategories
    const subCategories = seedCategories.filter(
      (cat) => cat.parentCategory !== null
    );
    const subCategoryDocs = await Category.insertMany(
      subCategories.map((cat) => ({
        name: cat.name,
        description: cat.description,
        slug: cat.slug,
        icon: cat.icon,
        color: cat.color,
        displayOrder: cat.displayOrder,
        isActive: cat.isActive,
        parentCategory: categoryMap.get(cat.parentCategory),
        level: 1,
        path: cat.path,
        serviceCount: 0,
        seoTitle: cat.seoTitle,
        seoDescription: cat.seoDescription,
        createdBy: adminUser._id,
      }))
    );

    // Add subcategories to map
    subCategories.forEach((cat, index) => {
      categoryMap.set(cat.id, subCategoryDocs[index]._id);
    });

    console.log(
      `✅ Created ${categoryDocs.length} root categories and ${subCategoryDocs.length} subcategories`
    );

    // 3) Services (link to categories)
    const serviceDocs = await Service.insertMany(
      seedServices.map((s, i) => ({
        name: s.name,
        category: categoryMap.get(s.category) || categoryDocs[0]._id, // Use first category as fallback
        duration: s.duration,
        price: s.price,
        description: s.description || "",
        addOns: s.addOns || [],
        combo: s.combo || [],
        displayOrder: s.displayOrder || i + 1,
        isActive: s.isActive !== false,
      }))
    );

    // 3) Staff (link to a user each)
    const staffDocs = await Staff.insertMany(
      seedStaff.map((st, i) => {
        const img = st.image;
        const safeImage =
          img && /^https?:\/\//.test(img)
            ? img
            : `https://via.placeholder.com/300x300.png?text=${encodeURIComponent(
                st.name || "Staff"
              )}`;

        return {
          userId: userDocs[i % userDocs.length]._id,
          employeeId: `EMP${(i + 1).toString().padStart(4, "0")}`,
          name: st.name,
          image: safeImage,
          role: st.role,
          skills: st.skills || [],
          workSchedule: st.workSchedule,
          daysOff: (st.daysOff || []).map((d) => new Date(d)),
          revenueShare: st.revenueShare ?? 0.3,
          isActive: st.isActive !== false,
        };
      })
    );

    // 5) Appointments (link to created users/services/staff)
    console.log("📅 Seeding appointments...");
    console.log("Seed appointments count:", seedAppointments.length);
    console.log("User docs count:", userDocs.length);
    console.log("Service docs count:", serviceDocs.length);
    console.log("Staff docs count:", staffDocs.length);

    const appointmentDocs = await Appointment.insertMany(
      seedAppointments.map((a, i) => ({
        appointmentNumber: `APT${(i + 1).toString().padStart(6, "0")}`,
        customerId: userDocs[(a.customerId - 1) % userDocs.length]._id,
        serviceId: serviceDocs[(a.serviceId - 1) % serviceDocs.length]._id,
        staffId: staffDocs[(a.staffId - 1) % staffDocs.length]._id,
        appointmentDate: new Date(a.appointmentDate),
        startTime: a.startTime,
        endTime: a.endTime,
        duration: a.duration,
        status: a.status,
        totalAmount: a.totalAmount,
        discount: 0,
        finalAmount: a.totalAmount,
        paymentStatus: "paid",
        paymentMethod: "cash",
        notes: a.notes || "",
      }))
    );

    console.log(`✅ Created ${appointmentDocs.length} appointments`);

    // 7) Notification Templates
    const templateDocs = await NotificationTemplate.insertMany(
      seedTemplates.map((t) => ({
        name: t.name,
        type: t.type,
        trigger: t.trigger,
        subject: t.subject,
        content: t.content,
        channels: t.channels,
        isActive: t.isActive !== false,
        createdBy: adminUser._id,
        priority: 1,
        language: "vi",
      }))
    );

    // 8) Notification Logs (link to first customer/appointment where possible)
    await NotificationLog.insertMany(
      seedLogs.map((l, i) => ({
        templateId: templateDocs[(l.templateId - 1) % templateDocs.length]._id,
        userId: userDocs[i % userDocs.length]._id,
        appointmentId: appointmentDocs[i % appointmentDocs.length]?._id,
        channel:
          l.channel === "sms" || l.channel === "email" ? l.channel : "sms",
        recipient: {
          name: l.customerName,
          phone: l.customerPhone || undefined,
          email: l.customerEmail || undefined,
        },
        content: {
          subject: l.templateName,
          body: l.content,
        },
        status: ["pending", "sent", "failed"].includes(l.status)
          ? l.status
          : "sent",
        sentAt: l.sentAt ? new Date(l.sentAt) : undefined,
        createdAt: l.createdAt ? new Date(l.createdAt) : undefined,
        updatedAt: new Date(),
      }))
    );

    console.log("✅ Seeding completed successfully");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

run();
