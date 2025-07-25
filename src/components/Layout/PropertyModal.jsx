// Layout/PropertyModal.jsx
import { X } from "lucide-react";
import React from "react";

const PropertyModal = ({
  isOpen,
  onClose,
  propertyData,
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
            {isEditing ? "Edit Property" : "Add New Property"}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Property Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500"
              value={propertyData.name}
              onChange={(e) => onChange("name", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Number of Units
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500"
              value={propertyData.units}
              onChange={(e) => onChange("units", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Status
            </label>
            <select
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500"
              value={propertyData.status}
              onChange={(e) => onChange("status", e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Occupancy Rate
            </label>
            <input
              type="text"
              placeholder="e.g. 92%"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500"
              value={propertyData.occupancy}
              onChange={(e) => onChange("occupancy", e.target.value)}
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
              className="flex-1 px-4 py-2 bg-slate-900 text-white cursor-pointer rounded-md hover:bg-slate-800 transition-colors"
            >
              {isEditing ? "Update Property" : "Add Property"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyModal;
