import { Edit, Plus, Search, Trash2, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import DeleteAlert from "../Layout/DeleteAlert";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [newProperty, setNewProperty] = useState({
    name: "",
    units: "",
    status: "Active",
    occupancy: "",
  });

  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    propertyId: null,
    propertyName: "",
  });

  useEffect(() => {
    const storedProperties =
      JSON.parse(localStorage.getItem("properties")) || [];
    if (storedProperties.length > 0) {
      setProperties(storedProperties);
    } else {
      // Use example data if nothing in localStorage
      const exampleData = [
        {
          id: 1,
          name: "Sunset Apartments",
          units: 24,
          status: "Active",
          occupancy: "92%",
        },
        {
          id: 2,
          name: "Downtown Plaza",
          units: 18,
          status: "Active",
          occupancy: "100%",
        },
        {
          id: 3,
          name: "Garden View Complex",
          units: 32,
          status: "Active",
          occupancy: "87%",
        },
        {
          id: 4,
          name: "Riverside Condos",
          units: 16,
          status: "Maintenance",
          occupancy: "75%",
        },
        {
          id: 5,
          name: "Oak Street Residences",
          units: 28,
          status: "Active",
          occupancy: "96%",
        },
      ];
      setProperties(exampleData);
      localStorage.setItem("properties", JSON.stringify(exampleData));
    }
  }, []);

  const filteredProperties = properties.filter((property) => {
    const matchesSearch = property.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || property.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddProperty = () => {
    const propertyToAdd = {
      ...newProperty,
      id: Date.now(),
      units: parseInt(newProperty.units),
    };

    const updatedProperties = [...properties, propertyToAdd];
    setProperties(updatedProperties);
    localStorage.setItem("properties", JSON.stringify(updatedProperties));
    setShowAddModal(false);
    setNewProperty({ name: "", units: "", status: "Active", occupancy: "" });
  };

  const handleUpdateProperty = () => {
    const updatedProperties = properties.map((property) =>
      property.id === editingProperty.id ? editingProperty : property
    );

    setProperties(updatedProperties);
    localStorage.setItem("properties", JSON.stringify(updatedProperties));
    setEditingProperty(null);
  };

  const handleDeleteProperty = (id) => {
    const updatedProperties = properties.filter(
      (property) => property.id !== id
    );
    setProperties(updatedProperties);
    localStorage.setItem("properties", JSON.stringify(updatedProperties));
  };

  const handleDeleteClick = (property) => {
    setDeleteConfirmation({
      isOpen: true,
      propertyId: property.id,
      propertyName: property.name,
    });
  };

  const handleDeleteConfirm = () => {
    const updatedProperties = properties.filter(
      (property) => property.id !== deleteConfirmation.propertyId
    );
    setProperties(updatedProperties);
    localStorage.setItem("properties", JSON.stringify(updatedProperties));
    setDeleteConfirmation({
      isOpen: false,
      propertyId: null,
      propertyName: "",
    });
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmation({
      isOpen: false,
      propertyId: null,
      propertyName: "",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Properties</h1>
          <p className="text-slate-600">Manage your property portfolio</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 cursor-pointer bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Property</span>
        </button>
      </div>

      <div className="bg-white rounded-lg border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search properties..."
                className="pl-10 pr-4 py-2 w-full border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Property Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Units
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Occupancy
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredProperties.map((property) => (
                <tr key={property.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-slate-900">
                      {property.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                    {property.units}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        property.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {property.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                    {property.occupancy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        className="text-slate-600 hover:text-slate-900 cursor-pointer"
                        onClick={() => setEditingProperty(property)}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900 cursor-pointer"
                        onClick={() => handleDeleteClick(property)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Property Modal */}
      {showAddModal && (
        <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">
                Add New Property
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
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
                  value={newProperty.name}
                  onChange={(e) =>
                    setNewProperty({ ...newProperty, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Number of Units
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500"
                  value={newProperty.units}
                  onChange={(e) =>
                    setNewProperty({ ...newProperty, units: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Status
                </label>
                <select
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500"
                  value={newProperty.status}
                  onChange={(e) =>
                    setNewProperty({ ...newProperty, status: e.target.value })
                  }
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
                  value={newProperty.occupancy}
                  onChange={(e) =>
                    setNewProperty({
                      ...newProperty,
                      occupancy: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 cursor-pointer rounded-md hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddProperty}
                  className="flex-1 px-4 py-2 bg-slate-900 text-white cursor-pointer rounded-md hover:bg-slate-800 transition-colors"
                >
                  Add Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Property Modal */}
      {editingProperty && (
        <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">
                Edit Property
              </h3>
              <button
                onClick={() => setEditingProperty(null)}
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
                  value={editingProperty.name}
                  onChange={(e) =>
                    setEditingProperty({
                      ...editingProperty,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Number of Units
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500"
                  value={editingProperty.units}
                  onChange={(e) =>
                    setEditingProperty({
                      ...editingProperty,
                      units: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Status
                </label>
                <select
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500"
                  value={editingProperty.status}
                  onChange={(e) =>
                    setEditingProperty({
                      ...editingProperty,
                      status: e.target.value,
                    })
                  }
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
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500"
                  value={editingProperty.occupancy}
                  onChange={(e) =>
                    setEditingProperty({
                      ...editingProperty,
                      occupancy: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingProperty(null)}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 cursor-pointer rounded-md hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpdateProperty}
                  className="flex-1 px-4 py-2 bg-slate-900 text-white cursor-pointer rounded-md hover:bg-slate-800 transition-colors"
                >
                  Update Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <DeleteAlert
        isOpen={deleteConfirmation.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        itemName={deleteConfirmation.propertyName}
        title="Delete Property"
        message="Are you sure you want to delete this property? This action cannot be undone."
      />
    </div>
  );
};

export default PropertyList;
