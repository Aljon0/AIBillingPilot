// Layout/InvoiceModal.jsx
import { X } from "lucide-react";
import React from "react";

const InvoiceModal = ({
  isOpen,
  onClose,
  formData,
  onChange,
  onSubmit,
  isEditing,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">
            {isEditing ? "Edit Invoice" : "Create New Invoice"}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Tenant
            </label>
            <select
              name="tenant"
              value={formData.tenant}
              onChange={(e) => onChange("tenant", e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500"
              required
            >
              <option value="">Select tenant...</option>
              <option>John Smith</option>
              <option>Sarah Johnson</option>
              <option>Mike Wilson</option>
              <option>Emily Davis</option>
              <option>David Brown</option>
              <option>Lisa Garcia</option>
              <option>Robert Lee</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Property
            </label>
            <select
              name="property"
              value={formData.property}
              onChange={(e) => onChange("property", e.target.value)}
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
              Amount
            </label>
            <input
              type="number"
              name="amount"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) => onChange("amount", e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={(e) => onChange("date", e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500"
              required
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 cursor-pointer rounded-md hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onSubmit}
              className="flex-1 px-4 py-2 bg-slate-900 text-white rounded-md cursor-pointer hover:bg-slate-800 transition-colors"
            >
              {isEditing ? "Update Invoice" : "Create Invoice"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
