// components/layout/Footer.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { contactAPI } from "../../services";

const Footer = ({ className = "", ...props }) => {
  const [contactInfo, setContactInfo] = useState(null);

  useEffect(() => {
    const loadContactInfo = async () => {
      try {
        const response = await contactAPI.getContactInfo();
        setContactInfo(response.data);
      } catch (err) {
        console.error("Error loading contact info for footer:", err);
      }
    };

    loadContactInfo();
  }, []);

  // Default values if contactInfo is not available
  const defaultContactInfo = {
    businessName: "Spa & Beauty Center",
    businessDescription:
      "Trải nghiệm sự thư giãn và phục hồi tuyệt đối tại spa sang trọng của chúng tôi.",
    phone: "0123456789",
    email: "info@spa.com",
    address: {
      street: "123 Đường ABC",
      city: "Hồ Chí Minh",
      state: "TP.HCM",
      zipCode: "70000",
      country: "Việt Nam",
    },
    socialMedia: {
      facebook: "",
      instagram: "",
      tiktok: "",
      youtube: "",
      zalo: "",
    },
  };

  const info = contactInfo || defaultContactInfo;

  return (
    <footer
      className={`bg-neutral-900 dark:bg-neutral-950 text-white ${className}`}
      {...props}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="inline-block">
              <div className="bg-brand text-white px-4 py-2 rounded-lg font-bold text-xl inline-block mb-4">
                {info.businessName}
              </div>
            </Link>
            <p className="text-neutral-300 mb-4 max-w-md">
              {info.businessDescription}
            </p>
            <div className="flex space-x-4">
              {info.socialMedia.facebook && (
                <a
                  href={info.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
              )}
              {info.socialMedia.instagram && (
                <a
                  href={info.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                  </svg>
                </a>
              )}
              {info.socialMedia.youtube && (
                <a
                  href={info.socialMedia.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors"
                  aria-label="YouTube"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Dịch vụ</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/services?category=Massage"
                  className="text-neutral-300 hover:text-white transition-colors"
                >
                  Massage Therapy
                </Link>
              </li>
              <li>
                <Link
                  to="/services?category=Facial"
                  className="text-neutral-300 hover:text-white transition-colors"
                >
                  Facial Treatments
                </Link>
              </li>
              <li>
                <Link
                  to="/services?category=Body"
                  className="text-neutral-300 hover:text-white transition-colors"
                >
                  Body Treatments
                </Link>
              </li>
              <li>
                <Link
                  to="/services?category=Nail"
                  className="text-neutral-300 hover:text-white transition-colors"
                >
                  Nail Art
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Thông tin</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-neutral-300 hover:text-white transition-colors"
                >
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-neutral-300 hover:text-white transition-colors"
                >
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-neutral-300 hover:text-white transition-colors"
                >
                  Câu hỏi thường gặp
                </Link>
              </li>
              <li>
                <Link
                  to="/staff"
                  className="text-neutral-300 hover:text-white transition-colors"
                >
                  Đội ngũ nhân viên
                </Link>
              </li>
              <li>
                <Link
                  to="/database-schema"
                  className="text-neutral-300 hover:text-white transition-colors text-sm"
                >
                  Database Schema
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
            <div className="space-y-2 text-neutral-300">
              <p>{info.address.street}</p>
              <p>
                {info.address.city}, {info.address.state} {info.address.zipCode}
              </p>
              <p>Điện thoại: {info.phone}</p>
              <p>Email: {info.email}</p>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Giờ mở cửa</h4>
              <div className="text-sm text-neutral-300 space-y-1">
                <p>T2-T6: 8:00 - 20:00</p>
                <p>T7-CN: 8:00 - 20:00</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm">
            © 2024 Spa. Tất cả quyền được bảo lưu.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              to="/privacy"
              className="text-neutral-400 hover:text-white text-sm transition-colors"
            >
              Chính sách bảo mật
            </Link>
            <Link
              to="/terms"
              className="text-neutral-400 hover:text-white text-sm transition-colors"
            >
              Điều khoản sử dụng
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
