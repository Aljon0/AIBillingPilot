import { X } from "lucide-react";
import React from "react";

const TenantModal = ({
  isOpen,
  onClose,
  formData,
  onChange,
  onSubmit,
  isEditing,
}) => {
  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">
            {isEditing ? "Edit Tenant" : "Add New Tenant"}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Tenant Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Unit
            </label>
            <input
              type="text"
              name="unit"
              value={formData.unit}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Property
            </label>
            <select
              name="property"
              value={formData.property}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500"
              required
            >
              <option value="">Select property...</option>
              <option>Sunset Apartments</option>
              <option>Downtown Plaza</option>
              <option>Garden View Complex</option>
              <option>Riverside Condos</option>
              <option>Oak Street Residences</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Balance
            </label>
            <input
              type="number"
              name="balance"
              placeholder="0.00"
              value={formData.balance}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500"
            >
              <option value="Active">Active</option>
              <option value="Overdue">Overdue</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-slate-300 cursor-pointer text-slate-700 rounded-md hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-slate-900 cursor-pointer text-white rounded-md hover:bg-slate-800 transition-colors"
            >
              {isEditing ? "Update Tenant" : "Add Tenant"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TenantModal;
