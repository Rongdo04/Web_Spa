import React, { useCallback, useMemo, useState, useRef } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
  Handle,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import { tableDescriptions } from "./MongoDBSchemaDiagram.data";

const nodeTypes = {
  custom: ({ data }) => (
    <div className="bg-white border-2 border-gray-300 rounded-lg shadow-lg p-4 min-w-[300px] cursor-pointer transition-all duration-200 hover:shadow-xl hover:border-blue-500 relative">
      {/* Handles for connections - can be both source and target */}
      <Handle
        type="source"
        position={Position.Right}
        id="right-source"
        style={{ background: "#3B82F6", width: 10, height: 10 }}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="right"
        style={{ background: "#10B981", width: 10, height: 10 }}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left-source"
        style={{ background: "#3B82F6", width: 10, height: 10 }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        style={{ background: "#10B981", width: 10, height: 10 }}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="top-source"
        style={{ background: "#3B82F6", width: 10, height: 10 }}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        style={{ background: "#10B981", width: 10, height: 10 }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom-source"
        style={{ background: "#3B82F6", width: 10, height: 10 }}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="bottom"
        style={{ background: "#10B981", width: 10, height: 10 }}
      />

      <div className="bg-blue-600 text-white px-3 py-2 rounded-t-lg -mx-4 -mt-4 mb-3">
        <h3 className="font-bold text-lg">{data.label}</h3>
      </div>
      <div className="space-y-2">
        {data.fields.map((field, index) => (
          <div key={index} className="flex items-center text-sm">
            <span
              className={`w-2 h-2 rounded-full mr-2 ${
                field.type === "PK"
                  ? "bg-red-500"
                  : field.type === "FK"
                  ? "bg-blue-500"
                  : field.type === "UK"
                  ? "bg-green-500"
                  : "bg-gray-400"
              }`}
            ></span>
            <span className="font-mono text-gray-600">{field.name}</span>
            <span className="ml-auto text-gray-500">{field.dataType}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

const MongoDBSchemaDiagram = () => {
  const initialNodes = useMemo(
    () => [
      {
        id: "user",
        type: "custom",
        position: { x: 100, y: 100 },
        data: {
          label: "USER",
          fields: [
            { name: "_id", dataType: "ObjectId", type: "PK" },
            { name: "name", dataType: "String", type: "field" },
            { name: "email", dataType: "String", type: "UK" },
            { name: "phone", dataType: "String", type: "field" },
            { name: "role", dataType: "String", type: "field" },
            { name: "level", dataType: "String", type: "field" },
          ],
        },
      },
      {
        id: "staff",
        type: "custom",
        position: { x: 500, y: 100 },
        data: {
          label: "STAFF",
          fields: [
            { name: "_id", dataType: "ObjectId", type: "PK" },
            { name: "userId", dataType: "ObjectId", type: "FK" },
            { name: "employeeId", dataType: "String", type: "UK" },
            { name: "name", dataType: "String", type: "field" },
            { name: "role", dataType: "String", type: "field" },
            { name: "isActive", dataType: "Boolean", type: "field" },
          ],
        },
      },
      {
        id: "category",
        type: "custom",
        position: { x: 100, y: 400 },
        data: {
          label: "CATEGORY",
          fields: [
            { name: "_id", dataType: "ObjectId", type: "PK" },
            { name: "name", dataType: "String", type: "field" },
            { name: "slug", dataType: "String", type: "UK" },
            { name: "parentCategory", dataType: "ObjectId", type: "FK" },
            { name: "isActive", dataType: "Boolean", type: "field" },
            { name: "createdBy", dataType: "ObjectId", type: "FK" },
          ],
        },
      },
      {
        id: "service",
        type: "custom",
        position: { x: 500, y: 400 },
        data: {
          label: "SERVICE",
          fields: [
            { name: "_id", dataType: "ObjectId", type: "PK" },
            { name: "name", dataType: "String", type: "field" },
            { name: "category", dataType: "ObjectId", type: "FK" },
            { name: "duration", dataType: "Number", type: "field" },
            { name: "price", dataType: "Number", type: "field" },
            { name: "isActive", dataType: "Boolean", type: "field" },
          ],
        },
      },
      {
        id: "appointment",
        type: "custom",
        position: { x: 900, y: 250 },
        data: {
          label: "APPOINTMENT",
          fields: [
            { name: "_id", dataType: "ObjectId", type: "PK" },
            { name: "appointmentNumber", dataType: "String", type: "UK" },
            { name: "customerId", dataType: "ObjectId", type: "FK" },
            { name: "serviceId", dataType: "ObjectId", type: "FK" },
            { name: "staffId", dataType: "ObjectId", type: "FK" },
            { name: "appointmentDate", dataType: "Date", type: "field" },
            { name: "status", dataType: "String", type: "field" },
            { name: "paymentStatus", dataType: "String", type: "field" },
          ],
        },
      },
      {
        id: "notification_template",
        type: "custom",
        position: { x: 100, y: 700 },
        data: {
          label: "NOTIFICATION_TEMPLATE",
          fields: [
            { name: "_id", dataType: "ObjectId", type: "PK" },
            { name: "name", dataType: "String", type: "field" },
            { name: "type", dataType: "String", type: "field" },
            { name: "trigger", dataType: "String", type: "field" },
            { name: "isActive", dataType: "Boolean", type: "field" },
            { name: "createdBy", dataType: "ObjectId", type: "FK" },
          ],
        },
      },
      {
        id: "notification_log",
        type: "custom",
        position: { x: 500, y: 700 },
        data: {
          label: "NOTIFICATION_LOG",
          fields: [
            { name: "_id", dataType: "ObjectId", type: "PK" },
            { name: "templateId", dataType: "ObjectId", type: "FK" },
            { name: "userId", dataType: "ObjectId", type: "FK" },
            { name: "appointmentId", dataType: "ObjectId", type: "FK" },
            { name: "channel", dataType: "String", type: "field" },
            { name: "status", dataType: "String", type: "field" },
          ],
        },
      },
      {
        id: "contact",
        type: "custom",
        position: { x: 900, y: 700 },
        data: {
          label: "CONTACT",
          fields: [
            { name: "_id", dataType: "ObjectId", type: "PK" },
            { name: "businessName", dataType: "String", type: "field" },
            { name: "phone", dataType: "String", type: "field" },
            { name: "email", dataType: "String", type: "field" },
            { name: "isActive", dataType: "Boolean", type: "field" },
          ],
        },
      },
    ],
    []
  );

  const initialEdges = useMemo(
    () => [
      {
        id: "user-appointment",
        source: "user",
        target: "appointment",
        sourceHandle: "right-source",
        targetHandle: "left",
        label: "customerId",
        type: "smoothstep",
        animated: false,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: "#3B82F6",
        },
        style: { stroke: "#3B82F6", strokeWidth: 2 },
      },
      {
        id: "staff-appointment",
        source: "staff",
        target: "appointment",
        sourceHandle: "right-source",
        targetHandle: "left",
        label: "staffId",
        type: "smoothstep",
        animated: false,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: "#3B82F6",
        },
        style: { stroke: "#3B82F6", strokeWidth: 2 },
      },
      {
        id: "service-appointment",
        source: "service",
        target: "appointment",
        sourceHandle: "right-source",
        targetHandle: "left",
        label: "serviceId",
        type: "smoothstep",
        animated: false,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: "#3B82F6",
        },
        style: { stroke: "#3B82F6", strokeWidth: 2 },
      },
      {
        id: "category-service",
        source: "category",
        target: "service",
        sourceHandle: "right-source",
        targetHandle: "left",
        label: "category",
        type: "smoothstep",
        animated: false,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: "#10B981",
        },
        style: { stroke: "#10B981", strokeWidth: 2 },
      },
      {
        id: "category-self",
        source: "category",
        target: "category",
        sourceHandle: "bottom-source",
        targetHandle: "top",
        label: "parentCategory",
        type: "smoothstep",
        animated: false,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: "#F59E0B",
        },
        style: { stroke: "#F59E0B", strokeWidth: 2 },
      },
      {
        id: "user-staff",
        source: "user",
        target: "staff",
        sourceHandle: "right-source",
        targetHandle: "left",
        label: "userId",
        type: "smoothstep",
        animated: false,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: "#8B5CF6",
        },
        style: { stroke: "#8B5CF6", strokeWidth: 2 },
      },
      {
        id: "template-log",
        source: "notification_template",
        target: "notification_log",
        sourceHandle: "right-source",
        targetHandle: "left",
        label: "templateId",
        type: "smoothstep",
        animated: false,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: "#EF4444",
        },
        style: { stroke: "#EF4444", strokeWidth: 2 },
      },
      {
        id: "user-log",
        source: "user",
        target: "notification_log",
        sourceHandle: "bottom-source",
        targetHandle: "top",
        label: "userId",
        type: "smoothstep",
        animated: false,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: "#EF4444",
        },
        style: { stroke: "#EF4444", strokeWidth: 2 },
      },
      {
        id: "appointment-log",
        source: "appointment",
        target: "notification_log",
        sourceHandle: "bottom-source",
        targetHandle: "top",
        label: "appointmentId",
        type: "smoothstep",
        animated: false,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: "#EF4444",
        },
        style: { stroke: "#EF4444", strokeWidth: 2 },
      },
      {
        id: "category-createdby",
        source: "user",
        target: "category",
        sourceHandle: "bottom-source",
        targetHandle: "top",
        label: "createdBy",
        type: "smoothstep",
        animated: false,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: "#10B981",
        },
        style: { stroke: "#10B981", strokeWidth: 2 },
      },
      {
        id: "template-createdby",
        source: "user",
        target: "notification_template",
        sourceHandle: "bottom-source",
        targetHandle: "top",
        label: "createdBy",
        type: "smoothstep",
        animated: false,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: "#EF4444",
        },
        style: { stroke: "#EF4444", strokeWidth: 2 },
      },
    ],
    []
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedTable, setSelectedTable] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [highlightedNode, setHighlightedNode] = useState(null);
  const reactFlowInstance = useRef(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleNodeClick = useCallback((event, node) => {
    setSelectedTable(node.id);
    setIsModalOpen(true);
    setHighlightedNode(node.id);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedTable(null);
    setHighlightedNode(null);
  }, []);

  const handleBackdropClick = useCallback(
    (event) => {
      if (event.target === event.currentTarget) {
        handleCloseModal();
      }
    },
    [handleCloseModal]
  );

  const handleNavigateToTable = useCallback((targetTableId) => {
    setSelectedTable(targetTableId);
    setHighlightedNode(targetTableId);
    setIsModalOpen(true);

    // Scroll to node if ReactFlow instance is available
    setTimeout(() => {
      if (reactFlowInstance.current) {
        const node = reactFlowInstance.current.getNode(targetTableId);
        if (node) {
          reactFlowInstance.current.setCenter(
            node.position.x,
            node.position.y,
            {
              zoom: 1.2,
              duration: 800,
            }
          );
        }
      }
    }, 100);
  }, []);

  // Update nodes with highlight styling
  const nodesWithHighlight = useMemo(() => {
    return nodes.map((node) => ({
      ...node,
      style: {
        ...node.style,
        border: highlightedNode === node.id ? "3px solid #3B82F6" : undefined,
        boxShadow:
          highlightedNode === node.id
            ? "0 0 20px rgba(59, 130, 246, 0.5)"
            : undefined,
        transition: "all 0.3s ease",
      },
    }));
  }, [nodes, highlightedNode]);

  return (
    <div className="w-full h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">
          MongoDB Schema Diagram
        </h1>
        <p className="text-gray-600 mt-1">
          Hệ thống quản lý Spa - 8 Collections
        </p>
      </div>

      <div className="flex items-center justify-center space-x-8 py-4 bg-gray-100 border-b">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Primary Key</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Foreign Key</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Unique Key</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
          <span className="text-sm text-gray-600">Field</span>
        </div>
      </div>

      <div className="h-[calc(100vh-140px)]">
        <ReactFlow
          nodes={nodesWithHighlight}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={handleNodeClick}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-left"
          onInit={(instance) => {
            reactFlowInstance.current = instance;
          }}
          defaultEdgeOptions={{
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 20,
              height: 20,
            },
            style: { strokeWidth: 2 },
          }}
        >
          <Controls />
          <MiniMap
            nodeColor={(node) => {
              if (node.type === "custom") return "#3B82F6";
              return "#94A3B8";
            }}
            nodeStrokeWidth={3}
            zoomable
            pannable
          />
          <Background color="#f1f5f9" gap={20} />
        </ReactFlow>
      </div>

      <TableInfoModal
        isOpen={isModalOpen}
        tableId={selectedTable}
        onClose={handleCloseModal}
        onBackdropClick={handleBackdropClick}
        onNavigateToTable={handleNavigateToTable}
      />
    </div>
  );
};

const TableInfoModal = ({
  isOpen,
  tableId,
  onClose,
  onBackdropClick,
  onNavigateToTable,
}) => {
  if (!isOpen || !tableId) return null;

  const tableInfo = tableDescriptions[tableId];

  if (!tableInfo) {
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center backdrop-blur-sm"
        onClick={onBackdropClick}
      >
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <p className="text-gray-600">Không tìm thấy thông tin bảng này.</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Đóng
          </button>
        </div>
      </div>
    );
  }

  const getKeyTypeColor = (type) => {
    switch (type) {
      case "PK":
        return "bg-red-100 text-red-800 border-red-300";
      case "FK":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "UK":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getKeyTypeLabel = (type) => {
    switch (type) {
      case "PK":
        return "Primary Key";
      case "FK":
        return "Foreign Key";
      case "UK":
        return "Unique Key";
      default:
        return "Field";
    }
  };

  const getRelationshipIcon = (type) => {
    switch (type) {
      case "one-to-many":
        return "→";
      case "many-to-one":
        return "←";
      case "many-to-many":
        return "↔";
      case "one-to-one":
        return "⇄";
      case "self-reference":
        return "↻";
      default:
        return "→";
    }
  };

  const getRelationshipColor = (type) => {
    switch (type) {
      case "one-to-many":
        return "text-blue-600";
      case "many-to-one":
        return "text-purple-600";
      case "many-to-many":
        return "text-green-600";
      case "one-to-one":
        return "text-orange-600";
      case "self-reference":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center backdrop-blur-sm p-4 transition-opacity duration-300"
      onClick={onBackdropClick}
    >
      <div
        className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">{tableId.toUpperCase()}</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors text-2xl font-bold"
            aria-label="Đóng modal"
          >
            ×
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="overflow-y-auto flex-1 p-6">
          {/* Section 1: Mục đích bảng */}
          <section className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
              <span className="w-1 h-6 bg-blue-600 mr-3"></span>
              Mục đích bảng
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {tableInfo.description}
            </p>
          </section>

          {/* Section 2: Các trường dữ liệu */}
          <section className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
              <span className="w-1 h-6 bg-blue-600 mr-3"></span>
              Các trường dữ liệu
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                      Field
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                      Data Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                      Key Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                      Mô tả
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                      Required
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tableInfo.fields.map((field, index) => {
                    // Find related table for FK fields
                    const relatedTable =
                      field.type === "FK"
                        ? tableInfo.relationships?.find(
                            (rel) => rel.field === field.name
                          )?.target
                        : null;

                    const isClickable = field.type === "FK" && relatedTable;

                    return (
                      <tr
                        key={index}
                        className={`hover:bg-gray-50 ${
                          isClickable ? "cursor-pointer" : ""
                        }`}
                      >
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`font-mono text-sm font-medium ${
                              isClickable
                                ? "text-blue-600 hover:text-blue-800 hover:underline"
                                : "text-gray-900"
                            }`}
                            onClick={
                              isClickable
                                ? () => onNavigateToTable(relatedTable)
                                : undefined
                            }
                            title={
                              isClickable
                                ? `Click để xem bảng ${relatedTable.toUpperCase()}`
                                : undefined
                            }
                          >
                            {field.name}
                            {isClickable && " →"}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          {field.dataType}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getKeyTypeColor(
                              field.type
                            )}`}
                          >
                            {getKeyTypeLabel(field.type)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 max-w-md">
                          {field.description}
                          {isClickable && (
                            <span className="ml-2 text-blue-600 text-xs">
                              (Click để xem bảng {relatedTable.toUpperCase()})
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-center">
                          {field.required ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Bắt buộc
                            </span>
                          ) : (
                            <span className="text-gray-400 text-xs">
                              Tùy chọn
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3: Mối quan hệ */}
          {tableInfo.relationships && tableInfo.relationships.length > 0 && (
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                <span className="w-1 h-6 bg-blue-600 mr-3"></span>
                Mối quan hệ
              </h3>
              <div className="space-y-3">
                {tableInfo.relationships.map((rel, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer hover:border-blue-400"
                    onClick={() => onNavigateToTable(rel.target)}
                    title={`Click để xem bảng ${rel.target.toUpperCase()}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`text-2xl font-bold ${getRelationshipColor(
                              rel.type
                            )}`}
                          >
                            {getRelationshipIcon(rel.type)}
                          </span>
                          <span className="font-semibold text-gray-800">
                            {rel.type.replace(/-/g, " ").toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-10">
                          <p className="text-sm text-gray-600 mb-1">
                            <span className="font-medium">Bảng đích:</span>{" "}
                            <span className="font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200 transition-colors">
                              {rel.target.toUpperCase()} →
                            </span>
                          </p>
                          <p className="text-sm text-gray-600 mb-2">
                            <span className="font-medium">
                              Field tham chiếu:
                            </span>{" "}
                            <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                              {rel.field}
                            </span>
                          </p>
                          <p className="text-sm text-gray-700">
                            {rel.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default MongoDBSchemaDiagram;
