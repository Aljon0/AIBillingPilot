import { Building, FileText, Home, Settings, Users, X } from "lucide-react";
import React from "react";

const Sidebar = ({ isOpen, onClose, currentPage, onPageChange }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "properties", label: "Properties", icon: Building },
    { id: "invoices", label: "Invoices", icon: FileText },
    { id: "tenants", label: "Tenants", icon: Users },
    { id: "automation", label: "Automation", icon: Settings },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        h-screen lg:h-[100vh] // Ensure full viewport height
      `}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-200 lg:hidden">
          <span className="text-lg font-semibold text-slate-900">Menu</span>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="h-[calc(100%-57px)] overflow-y-auto">
          {" "}
          {/* Subtract header height */}
          <div className="px-4 space-y-2 py-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onPageChange(item.id);
                  onClose();
                }}
                className={`
                  w-full flex items-center space-x-3 px-3 py-2 cursor-pointer rounded-md text-sm font-medium transition-colors duration-150 ease-in-out
                  ${
                    currentPage === item.id
                      ? "bg-slate-100 text-slate-900"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }
                `}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
