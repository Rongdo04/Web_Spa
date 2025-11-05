import Staff from "../../models/Staff.js";

// GET /api/public/staff - Lấy danh sách nhân viên công khai
export const getPublicStaff = async (req, res) => {
  try {
    const { role = "", limit = 20 } = req.query;

    // Build filter object - chỉ lấy nhân viên active
    const filter = {
      isActive: true,
    };

    if (role) {
      filter.role = role;
    }

    // Debug logging
    console.log("🔍 Staff Query - Filter:", JSON.stringify(filter));
    console.log("🔍 Staff Query - Limit:", limit);

    // Execute query
    const staff = await Staff.find(filter)
      .populate({
        path: "userId",
        select: "name email",
        options: { strictPopulate: false },
      })
      .select("name role image skills hireDate")
      .sort({ hireDate: -1 })
      .limit(parseInt(limit));

    console.log(`✅ Staff Query Result: ${staff.length} staff members found`);

    // Transform data for public display
    const transformedStaff = staff.map((member) => {
      // Tính số năm kinh nghiệm
      const hireDate = new Date(member.hireDate);
      const currentDate = new Date();
      const yearsOfExperience = Math.floor(
        (currentDate - hireDate) / (365.25 * 24 * 60 * 60 * 1000)
      );

      return {
        id: member._id,
        name: member.name,
        position: member.role,
        experience: `${yearsOfExperience} năm kinh nghiệm`,
        specialty: member.skills && member.skills.length > 0 
          ? member.skills.join(", ") 
          : "Chăm sóc khách hàng chuyên nghiệp",
        image: member.image || "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
        description: `Chuyên gia ${member.role.toLowerCase()} với ${yearsOfExperience} năm kinh nghiệm, mang đến dịch vụ chăm sóc chất lượng cao cho khách hàng.`,
      };
    });

    res.json({
      success: true,
      data: transformedStaff,
      total: transformedStaff.length,
    });
  } catch (error) {
    console.error("Error getting public staff:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách nhân viên",
      error: error.message,
    });
  }
};

// GET /api/public/staff/:id - Lấy chi tiết nhân viên công khai
export const getPublicStaffById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const member = await Staff.findById(id)
      .populate({
        path: "userId",
        select: "name email",
        options: { strictPopulate: false },
      })
      .select("name role image skills hireDate");

    if (!member || !member.isActive) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy nhân viên",
      });
    }

    // Tính số năm kinh nghiệm
    const hireDate = new Date(member.hireDate);
    const currentDate = new Date();
    const yearsOfExperience = Math.floor(
      (currentDate - hireDate) / (365.25 * 24 * 60 * 60 * 1000)
    );

    const transformedStaff = {
      id: member._id,
      name: member.name,
      position: member.role,
      experience: `${yearsOfExperience} năm kinh nghiệm`,
      specialty: member.skills && member.skills.length > 0 
        ? member.skills.join(", ") 
        : "Chăm sóc khách hàng chuyên nghiệp",
      image: member.image || "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      description: `Chuyên gia ${member.role.toLowerCase()} với ${yearsOfExperience} năm kinh nghiệm, mang đến dịch vụ chăm sóc chất lượng cao cho khách hàng.`,
    };

    res.json({
      success: true,
      data: transformedStaff,
    });
  } catch (error) {
    console.error("Error getting public staff member:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy chi tiết nhân viên",
      error: error.message,
    });
  }
};
