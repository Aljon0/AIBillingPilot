import { Edit, Plus, Search, Trash2, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import DeleteAlert from "../Layout/DeleteAlert";

const InvoiceManagement = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [dateFilter, setDateFilter] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    tenant: "",
    property: "",
    amount: "",
    date: "",
  });
  const [deleteAlert, setDeleteAlert] = useState({
    isOpen: false,
    invoiceId: null,
  });

  // Example data for invoices
  const exampleInvoices = [
    {
      id: "INV-001",
      tenant: "John Smith",
      property: "Sunset Apartments",
      amount: "$1,200",
      status: "Paid",
      date: "2024-01-15",
    },
    {
      id: "INV-002",
      tenant: "Sarah Johnson",
      property: "Downtown Plaza",
      amount: "$1,500",
      status: "Pending",
      date: "2024-01-16",
    },
    {
      id: "INV-003",
      tenant: "Mike Wilson",
      property: "Garden View Complex",
      amount: "$980",
      status: "Overdue",
      date: "2024-01-10",
    },
    {
      id: "INV-004",
      tenant: "Emily Davis",
      property: "Riverside Condos",
      amount: "$1,350",
      status: "Pending",
      date: "2024-01-17",
    },
    {
      id: "INV-005",
      tenant: "David Brown",
      property: "Oak Street Residences",
      amount: "$1,100",
      status: "Paid",
      date: "2024-01-18",
    },
    {
      id: "INV-006",
      tenant: "Lisa Garcia",
      property: "Sunset Apartments",
      amount: "$1,050",
      status: "Paid",
      date: "2024-01-19",
    },
    {
      id: "INV-007",
      tenant: "Robert Lee",
      property: "Downtown Plaza",
      amount: "$1,750",
      status: "Pending",
      date: "2024-01-20",
    },
  ];

  // Load invoices on component mount
  useEffect(() => {
    try {
      const storedInvoices = JSON.parse(
        localStorage.getItem("invoices") || "null"
      );
      // If no stored invoices exist, use example data
      if (!storedInvoices || storedInvoices.length === 0) {
        setInvoices(exampleInvoices);
        // Save example data to localStorage for future use
        localStorage.setItem("invoices", JSON.stringify(exampleInvoices));
      } else {
        setInvoices(storedInvoices);
      }
    } catch (error) {
      // If there's an error parsing localStorage, fall back to example data
      console.error("Error loading invoices from localStorage:", error);
      setInvoices(exampleInvoices);
      localStorage.setItem("invoices", JSON.stringify(exampleInvoices));
    }
  }, []);

  // Save invoices to localStorage whenever they change (but not on initial load)
  useEffect(() => {
    if (invoices.length > 0) {
      localStorage.setItem("invoices", JSON.stringify(invoices));
    }
  }, [invoices]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.id) {
      // Update existing invoice
      setInvoices(
        invoices.map((invoice) =>
          invoice.id === formData.id
            ? {
                ...invoice,
                tenant: formData.tenant,
                property: formData.property,
                amount: `$${formData.amount}`,
                date: formData.date,
              }
            : invoice
        )
      );
    } else {
      // Create new invoice
      const newInvoice = {
        id: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
        tenant: formData.tenant,
        property: formData.property,
        amount: `$${formData.amount}`,
        status: "Pending",
        date: formData.date,
      };
      setInvoices([newInvoice, ...invoices]);
    }

    // Reset form and close modal
    setFormData({
      id: "",
      tenant: "",
      property: "",
      amount: "",
      date: "",
    });
    setShowCreateModal(false);
  };

  const deleteInvoice = (id) => {
    setInvoices(invoices.filter((invoice) => invoice.id !== id));
    setDeleteAlert({ isOpen: false, invoiceId: null });
  };

  const updateInvoiceStatus = (id, newStatus) => {
    setInvoices(
      invoices.map((invoice) =>
        invoice.id === id ? { ...invoice, status: newStatus } : invoice
      )
    );
  };

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.property.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All Status" || invoice.status === statusFilter;
    const matchesDate = dateFilter === "" || invoice.date === dateFilter;

    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Invoice Management
          </h1>
          <p className="text-slate-600">
            Track and manage all invoices (Admin Mode)
          </p>
        </div>
        <button
          onClick={() => {
            setFormData({
              id: "",
              tenant: "",
              property: "",
              amount: "",
              date: "",
            });
            setShowCreateModal(true);
          }}
          className="flex items-center space-x-2 px-4 py-2 cursor-pointer bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Create Invoice</span>
        </button>
      </div>

      <div className="bg-white rounded-lg border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search invoices..."
                  className="pl-10 pr-4 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option>All Status</option>
                <option>Paid</option>
                <option>Pending</option>
                <option>Overdue</option>
              </select>
              <input
                type="date"
                className="px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Invoice ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Tenant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-900">
                      {invoice.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                      {invoice.tenant}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                      {invoice.property}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-900">
                      {invoice.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={invoice.status}
                        onChange={(e) =>
                          updateInvoiceStatus(invoice.id, e.target.value)
                        }
                        className={`px-2 py-1 text-xs font-semibold rounded-full border ${
                          invoice.status === "Paid"
                            ? "bg-green-100 text-green-800 border-green-200"
                            : invoice.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                            : "bg-red-100 text-red-800 border-red-200"
                        }`}
                      >
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                        <option value="Overdue">Overdue</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                      {invoice.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          className="text-slate-600 hover:text-slate-900 cursor-pointer"
                          onClick={() => {
                            setFormData({
                              id: invoice.id,
                              tenant: invoice.tenant,
                              property: invoice.property,
                              amount: invoice.amount.replace("$", ""),
                              date: invoice.date,
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
                              invoiceId: invoice.id,
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
                    colSpan="7"
                    className="px-6 py-4 text-center text-slate-500"
                  >
                    No invoices found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Invoice Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">
                {formData.id ? "Edit Invoice" : "Create New Invoice"}
              </h3>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setFormData({
                    id: "",
                    tenant: "",
                    property: "",
                    amount: "",
                    date: "",
                  });
                }}
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
                  onChange={handleInputChange}
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
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500"
                  required
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setFormData({
                      id: "",
                      tenant: "",
                      property: "",
                      amount: "",
                      date: "",
                    });
                  }}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 cursor-pointer rounded-md hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-2 bg-slate-900 text-white rounded-md cursor-pointer hover:bg-slate-800 transition-colors"
                >
                  {formData.id ? "Update Invoice" : "Create Invoice"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Alert */}
      <DeleteAlert
        isOpen={deleteAlert.isOpen}
        onClose={() => setDeleteAlert({ isOpen: false, invoiceId: null })}
        onConfirm={() => deleteInvoice(deleteAlert.invoiceId)}
        title="Delete Invoice"
        message="Are you sure you want to delete this invoice? This action cannot be undone."
        itemName={
          invoices.find((i) => i.id === deleteAlert.invoiceId)?.id || ""
        }
      />
    </div>
  );
};

export default InvoiceManagement;
