import { Edit, Plus, Search, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import TenantModal from "../Layout/TenantModal";
import DeleteAlert from "../Layout/DeleteAlert";

const TenantList = () => {
  const [tenants, setTenants] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyFilter, setPropertyFilter] = useState("All Properties");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    unit: "",
    property: "",
    balance: "",
    status: "Active",
  });
  const [deleteAlert, setDeleteAlert] = useState({
    isOpen: false,
    tenantId: null,
  });

  // Function to load tenants from localStorage
  const loadTenantsFromStorage = () => {
    const storedTenants = JSON.parse(localStorage.getItem("tenants")) || [];
    setTenants(storedTenants);
  };

  // Load tenants from localStorage on component mount
  useEffect(() => {
    loadTenantsFromStorage();
  }, []);

  // Listen for localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      loadTenantsFromStorage();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const balanceValue = formData.balance.startsWith("$")
      ? formData.balance
      : `$${formData.balance}`;

    if (formData.id) {
      // Update existing tenant
      const updatedTenants = tenants.map((tenant) =>
        tenant.id === formData.id
          ? {
              ...tenant,
              name: formData.name,
              unit: formData.unit,
              property: formData.property,
              balance: balanceValue,
              status: formData.status,
            }
          : tenant
      );
      setTenants(updatedTenants);
      localStorage.setItem("tenants", JSON.stringify(updatedTenants));
    } else {
      // Add new tenant
      const newTenant = {
        id: Date.now(),
        name: formData.name,
        unit: formData.unit,
        property: formData.property,
        balance: balanceValue,
        status: formData.status,
      };
      const updatedTenants = [newTenant, ...tenants];
      setTenants(updatedTenants);
      localStorage.setItem("tenants", JSON.stringify(updatedTenants));
    }

    resetForm();
    setShowCreateModal(false);
  };

  const deleteTenant = (id) => {
    const updatedTenants = tenants.filter((tenant) => tenant.id !== id);
    setTenants(updatedTenants);
    localStorage.setItem("tenants", JSON.stringify(updatedTenants));
    setDeleteAlert({ isOpen: false, tenantId: null });
  };

  const updateTenantStatus = (id, newStatus) => {
    const updatedTenants = tenants.map((tenant) =>
      tenant.id === id ? { ...tenant, status: newStatus } : tenant
    );
    setTenants(updatedTenants);
    localStorage.setItem("tenants", JSON.stringify(updatedTenants));
  };

  const resetForm = () => {
    setFormData({
      id: null,
      name: "",
      unit: "",
      property: "",
      balance: "",
      status: "Active",
    });
  };

  const filteredTenants = tenants.filter((tenant) => {
    const matchesSearch = tenant.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesProperty =
      propertyFilter === "All Properties" || tenant.property === propertyFilter;
    const matchesStatus =
      statusFilter === "All Status" || tenant.status === statusFilter;

    return matchesSearch && matchesProperty && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tenants</h1>
          <p className="text-slate-600">
            Manage tenant information and balances
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowCreateModal(true);
          }}
          className="flex items-center space-x-2 px-4 cursor-pointer py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Tenant</span>
        </button>
      </div>

      <div className="bg-white rounded-lg border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search tenants..."
                className="pl-10 pr-4 py-2 w-full border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500"
              value={propertyFilter}
              onChange={(e) => setPropertyFilter(e.target.value)}
            >
              <option>All Properties</option>
              <option>Sunset Apartments</option>
              <option>Downtown Plaza</option>
              <option>Garden View Complex</option>
              <option>Riverside Condos</option>
              <option>Oak Street Residences</option>
            </select>
            <select
              className="px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Overdue</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Tenant Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Unit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Balance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredTenants.length > 0 ? (
                filteredTenants.map((tenant) => (
                  <tr key={tenant.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-slate-900">
                        {tenant.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                      {tenant.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                      {tenant.property}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`font-medium ${
                          tenant.balance === "$0"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {tenant.balance}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={tenant.status}
                        onChange={(e) =>
                          updateTenantStatus(tenant.id, e.target.value)
                        }
                        className={`px-2 py-1 text-xs font-semibold rounded-full border ${
                          tenant.status === "Active"
                            ? "bg-green-100 text-green-800 border-green-200"
                            : tenant.status === "Overdue"
                            ? "bg-red-100 text-red-800 border-red-200"
                            : "bg-gray-100 text-gray-800 border-gray-200"
                        }`}
                      >
                        <option value="Active">Active</option>
                        <option value="Overdue">Overdue</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          className="text-slate-600 hover:text-slate-900 cursor-pointer"
                          onClick={() => {
                            setFormData({
                              id: tenant.id,
                              name: tenant.name,
                              unit: tenant.unit,
                              property: tenant.property,
                              balance: tenant.balance.replace("$", ""),
                              status: tenant.status,
                            });
                            setShowCreateModal(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900 cursor-pointer"
                          onClick={() =>
                            setDeleteAlert({
                              isOpen: true,
                              tenantId: tenant.id,
                            })
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-slate-500"
                  >
                    No tenants found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <TenantModal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          resetForm();
        }}
        formData={formData}
        onChange={(field, value) => {
          setFormData({
            ...formData,
            [field]: value,
          });
        }}
        onSubmit={handleSubmit}
        isEditing={!!formData.id}
      />

      {/* Delete Alert */}
      <DeleteAlert
        isOpen={deleteAlert.isOpen}
        onClose={() => setDeleteAlert({ isOpen: false, tenantId: null })}
        onConfirm={() => deleteTenant(deleteAlert.tenantId)}
        title="Delete Tenant"
        message="Are you sure you want to delete this tenant? This action cannot be undone."
        itemName={
          tenants.find((t) => t.id === deleteAlert.tenantId)?.name || ""
        }
      />
    </div>
  );
};

export default TenantList;
