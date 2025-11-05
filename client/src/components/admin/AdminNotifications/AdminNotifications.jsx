// components/admin/AdminNotifications/AdminNotifications.jsx
import React, { useState, useEffect } from "react";
import { Card, Button } from "../../ui";
import { adminNotificationsAPI } from "../../../services";
import { message } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  BellOutlined,
  SettingOutlined,
  HistoryOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import NotificationTemplates from "./components/NotificationTemplates";
import TemplateEditor from "./components/TemplateEditor";
import NotificationLogs from "./components/NotificationLogs";

const AdminNotifications = () => {
  const [activeTab, setActiveTab] = useState("templates");
  const [templates, setTemplates] = useState([]);
  const [logs, setLogs] = useState([]);
  const [templatesPagination, setTemplatesPagination] = useState(null);
  const [logsPagination, setLogsPagination] = useState(null);
  const [templatesStats, setTemplatesStats] = useState(null);
  const [logsStats, setLogsStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [togglingTemplates, setTogglingTemplates] = useState(new Set());

  // Filter states
  const [templatesFilters, setTemplatesFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    type: "",
    status: "",
  });

  const [logsFilters, setLogsFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    status: "",
    channel: "",
  });

  useEffect(() => {
    loadTemplates();
    loadLogs();
  }, []);

  const loadTemplates = async (filters = templatesFilters) => {
    setLoading(true);
    try {
      const response = await adminNotificationsAPI.listTemplates(filters);
      if (response.success) {
        setTemplates(response.data.templates || []);
        setTemplatesPagination(response.data.pagination || null);
        setTemplatesStats(response.data.stats || null);
      } else {
        message.error("Lỗi khi tải danh sách mẫu thông báo");
      }
    } catch (error) {
      console.error("Error loading templates:", error);
      message.error("Lỗi khi tải danh sách mẫu thông báo");
    } finally {
      setLoading(false);
    }
  };

  const loadLogs = async (filters = logsFilters) => {
    try {
      const response = await adminNotificationsAPI.listLogs(filters);
      if (response.success) {
        setLogs(response.data.logs || []);
        setLogsPagination(response.data.pagination || null);
        setLogsStats(response.data.stats || null);
      } else {
        message.error("Lỗi khi tải nhật ký thông báo");
      }
    } catch (error) {
      console.error("Error loading logs:", error);
      message.error("Lỗi khi tải nhật ký thông báo");
    }
  };

  // Pagination handlers
  const handleTemplatesPageChange = (page, pageSize) => {
    const newFilters = { ...templatesFilters, page, limit: pageSize };
    setTemplatesFilters(newFilters);
    loadTemplates(newFilters);
  };

  const handleLogsPageChange = (page, pageSize) => {
    const newFilters = { ...logsFilters, page, limit: pageSize };
    setLogsFilters(newFilters);
    loadLogs(newFilters);
  };

  // Search handlers
  const handleTemplatesSearch = (search) => {
    const newFilters = { ...templatesFilters, search, page: 1 };
    setTemplatesFilters(newFilters);
    loadTemplates(newFilters);
  };

  const handleLogsSearch = (search) => {
    const newFilters = { ...logsFilters, search, page: 1 };
    setLogsFilters(newFilters);
    loadLogs(newFilters);
  };

  // Filter handlers
  const handleTemplatesFilterChange = (filters) => {
    const newFilters = { ...templatesFilters, ...filters, page: 1 };
    setTemplatesFilters(newFilters);
    loadTemplates(newFilters);
  };

  const handleLogsFilterChange = (filters) => {
    const newFilters = { ...logsFilters, ...filters, page: 1 };
    setLogsFilters(newFilters);
    loadLogs(newFilters);
  };

  const handleCreateTemplate = () => {
    setEditingTemplate(null);
    setShowEditor(true);
  };

  const handleEditTemplate = (template) => {
    setEditingTemplate(template);
    setShowEditor(true);
  };

  const handleDeleteTemplate = async (templateId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa mẫu thông báo này?")) {
      try {
        const response = await adminNotificationsAPI.deleteTemplate(templateId);
        if (response.success) {
          setTemplates(templates.filter((t) => t.id !== templateId));
        } else {
        }
      } catch (error) {}
    }
  };

  const handleSaveTemplate = async (templateData) => {
    try {
      if (editingTemplate) {
        // Update existing template
        const response = await adminNotificationsAPI.updateTemplate(
          editingTemplate.id,
          templateData
        );
        if (response.success) {
          setTemplates(
            templates.map((t) =>
              t.id === editingTemplate.id ? response.data : t
            )
          );
        } else {
          return;
        }
      } else {
        // Create new template
        const response = await adminNotificationsAPI.createTemplate(
          templateData
        );
        if (response.success) {
          setTemplates([...templates, response.data]);
        } else {
          return;
        }
      }
      setShowEditor(false);
      setEditingTemplate(null);
    } catch (error) {}
  };

  const handleToggleTemplate = async (templateId) => {
    // Add to toggling set
    setTogglingTemplates((prev) => new Set(prev).add(templateId));

    try {
      const response = await adminNotificationsAPI.toggleTemplate(templateId);
      if (response.success) {
        setTemplates(
          templates.map((t) => (t.id === templateId ? response.data : t))
        );
        message.success(response.message || "Cập nhật trạng thái thành công");
      } else {
        message.error(response.message || "Cập nhật trạng thái thất bại");
      }
    } catch (error) {
      message.error("Lỗi khi cập nhật trạng thái");
    } finally {
      // Remove from toggling set
      setTogglingTemplates((prev) => {
        const newSet = new Set(prev);
        newSet.delete(templateId);
        return newSet;
      });
    }
  };

  const handleSendTest = async (templateId, email) => {
    try {
      const response = await adminNotificationsAPI.sendTest(templateId, email);
      if (response.success) {
        message.success("Gửi thông báo test thành công!");
      } else {
        message.error(response.message || "Gửi thông báo test thất bại");
      }
    } catch (error) {
      message.error("Lỗi khi gửi thông báo test");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Quản lý thông báo
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Quản lý mẫu thông báo và nhật ký gửi
          </p>
        </div>
        {activeTab === "templates" && (
          <Button
            onClick={handleCreateTemplate}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <PlusOutlined className="mr-2" />
            Tạo mẫu mới
          </Button>
        )}
      </div>

      {/* How it works */}
      <Card className="p-6 mb-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <BellOutlined className="text-2xl text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Cách hệ thống gửi thông báo hoạt động
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800 dark:text-blue-200">
              <div>
                <h4 className="font-medium mb-2">📧 Email (Hoạt động)</h4>
                <ul className="space-y-1 ml-4">
                  <li>
                    • Tự động gửi khi có sự kiện (tạo lịch, hủy lịch, etc.)
                  </li>
                  <li>• Sử dụng template có sẵn với biến động</li>
                  <li>• Ghi log kết quả gửi</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">📱 SMS (Hoạt động)</h4>
                <ul className="space-y-1 ml-4">
                  <li>
                    • Tự động gửi khi có sự kiện (tạo lịch, hủy lịch, etc.)
                  </li>
                  <li>• Sử dụng template có sẵn với biến động</li>
                  <li>• Ghi log kết quả gửi</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("templates")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "templates"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <FileTextOutlined className="mr-2" />
              Mẫu thông báo
            </button>
            <button
              onClick={() => setActiveTab("logs")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "logs"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <HistoryOutlined className="mr-2" />
              Nhật ký gửi
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      {activeTab === "templates" && (
        <NotificationTemplates
          templates={templates}
          pagination={templatesPagination}
          stats={templatesStats}
          loading={loading}
          togglingTemplates={togglingTemplates}
          onEdit={handleEditTemplate}
          onDelete={handleDeleteTemplate}
          onToggle={handleToggleTemplate}
          onSendTest={handleSendTest}
          onPageChange={handleTemplatesPageChange}
          onPageSizeChange={handleTemplatesPageChange}
          onSearch={handleTemplatesSearch}
          onFilterChange={handleTemplatesFilterChange}
        />
      )}

      {activeTab === "logs" && (
        <NotificationLogs
          logs={logs}
          pagination={logsPagination}
          stats={logsStats}
          loading={loading}
          onPageChange={handleLogsPageChange}
          onPageSizeChange={handleLogsPageChange}
          onSearch={handleLogsSearch}
          onFilterChange={handleLogsFilterChange}
        />
      )}

      {/* Template Editor Modal */}
      {showEditor && (
        <TemplateEditor
          template={editingTemplate}
          onSave={handleSaveTemplate}
          onClose={() => {
            setShowEditor(false);
            setEditingTemplate(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminNotifications;
