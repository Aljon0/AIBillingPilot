// Dashboard.jsx
import {
  Activity,
  Building,
  DollarSign,
  FileText,
  Plus,
  Users,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import InvoiceModal from "../Layout/InvoiceModal";
import PropertyModal from "../Layout/PropertyModal";
import TenantModal from "../Layout/TenantModal";

const Dashboard = () => {
  const [properties, setProperties] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [recentActivities, setRecentActivities] = useState([
    { id: 1, action: "Invoice #INV-001 sent to Tenant A", time: "2 hours ago" },
    {
      id: 2,
      action: 'Property "Sunset Apartments" added',
      time: "4 hours ago",
    },
    { id: 3, action: "Payment received from Tenant B", time: "1 day ago" },
    { id: 4, action: "Automation rule updated", time: "2 days ago" },
  ]);
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showTenantModal, setShowTenantModal] = useState(false);
  const [propertyForm, setPropertyForm] = useState({
    name: "",
    units: "",
    status: "Active",
    occupancy: "",
  });
  const [invoiceForm, setInvoiceForm] = useState({
    id: "",
    tenant: "",
    property: "",
    amount: "",
    date: "",
  });
  const [tenantForm, setTenantForm] = useState({
    name: "",
    unit: "",
    property: "",
    balance: "",
    status: "Active",
  });

  useEffect(() => {
    // Load data from localStorage
    const storedProperties =
      JSON.parse(localStorage.getItem("properties")) || [];
    const storedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];
    const storedTenants = JSON.parse(localStorage.getItem("tenants")) || [];

    setProperties(
      storedProperties.length
        ? storedProperties
        : [
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
          ]
    );

    setInvoices(
      storedInvoices.length
        ? storedInvoices
        : [
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
          ]
    );

    setTenants(
      storedTenants.length
        ? storedTenants
        : [
            {
              id: 1,
              name: "John Smith",
              unit: "A-101",
              property: "Sunset Apartments",
              balance: "$0",
              status: "Active",
            },
            {
              id: 2,
              name: "Sarah Johnson",
              unit: "B-205",
              property: "Downtown Plaza",
              balance: "$1,500",
              status: "Active",
            },
            {
              id: 3,
              name: "Mike Wilson",
              unit: "C-302",
              property: "Garden View Complex",
              balance: "$980",
              status: "Overdue",
            },
            {
              id: 4,
              name: "Emily Davis",
              unit: "D-401",
              property: "Riverside Condos",
              balance: "$1,350",
              status: "Active",
            },
            {
              id: 5,
              name: "David Brown",
              unit: "E-105",
              property: "Oak Street Residences",
              balance: "$0",
              status: "Active",
            },
            {
              id: 6,
              name: "Lisa Garcia",
              unit: "F-203",
              property: "Sunset Apartments",
              balance: "$750",
              status: "Active",
            },
          ]
    );
  }, []);

  const activeProperties = properties.filter(
    (p) => p.status === "Active"
  ).length;
  const pendingInvoices = invoices.filter((i) => i.status === "Pending").length;
  const activeTenants = tenants.filter((t) => t.status === "Active").length;
  const totalRevenue = invoices
    .filter((i) => i.status === "Paid")
    .reduce(
      (sum, invoice) => sum + parseInt(invoice.amount.replace(/[^0-9]/g, "")),
      0
    );

  const summaryCards = [
    {
      title: "Active Properties",
      value: activeProperties,
      change: "+2 this month",
      icon: Building,
      color: "text-blue-600",
    },
    {
      title: "Pending Invoices",
      value: pendingInvoices,
      change: "-3 from last week",
      icon: FileText,
      color: "text-orange-600",
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      change: "+12% this month",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Active Tenants",
      value: activeTenants,
      change: "+5 this month",
      icon: Users,
      color: "text-purple-600",
    },
  ];

  const addActivity = (action) => {
    const newActivity = {
      id: Date.now(),
      action,
      time: "Just now",
    };
    setRecentActivities([newActivity, ...recentActivities.slice(0, 3)]);
  };

  const handleAddProperty = () => {
    const propertyToAdd = {
      ...propertyForm,
      id: Date.now(),
      units: parseInt(propertyForm.units),
    };

    const updatedProperties = [...properties, propertyToAdd];
    setProperties(updatedProperties);
    localStorage.setItem("properties", JSON.stringify(updatedProperties));
    setShowPropertyModal(false);
    setPropertyForm({ name: "", units: "", status: "Active", occupancy: "" });
    addActivity(`Added property "${propertyForm.name}"`);
  };

  const handleAddInvoice = () => {
    const newInvoice = {
      id: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
      tenant: invoiceForm.tenant,
      property: invoiceForm.property,
      amount: `$${invoiceForm.amount}`,
      status: "Pending",
      date: invoiceForm.date,
    };

    const updatedInvoices = [newInvoice, ...invoices];
    setInvoices(updatedInvoices);
    localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
    setShowInvoiceModal(false);
    setInvoiceForm({
      id: "",
      tenant: "",
      property: "",
      amount: "",
      date: "",
    });
    addActivity(`Created invoice ${newInvoice.id} for ${newInvoice.tenant}`);
  };

  const handlePropertyChange = (field, value) => {
    setPropertyForm({
      ...propertyForm,
      [field]: value,
    });
  };

  const handleInvoiceChange = (field, value) => {
    setInvoiceForm({
      ...invoiceForm,
      [field]: value,
    });
  };

  const handleTenantChange = (field, value) => {
    setTenantForm({
      ...tenantForm,
      [field]: value,
    });
  };

  const handleAddTenant = (e) => {
    e.preventDefault();
    const newTenant = {
      id: Date.now(),
      name: tenantForm.name,
      unit: tenantForm.unit,
      property: tenantForm.property,
      balance: `$${tenantForm.balance}`,
      status: tenantForm.status,
    };

    const updatedTenants = [newTenant, ...tenants];
    setTenants(updatedTenants);
    localStorage.setItem("tenants", JSON.stringify(updatedTenants));
    setShowTenantModal(false);
    setTenantForm({
      name: "",
      unit: "",
      property: "",
      balance: "",
      status: "Active",
    });
    addActivity(`Added tenant "${tenantForm.name}"`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600">
          Welcome back! Here's what's happening with your properties.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-slate-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  {card.title}
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {card.value}
                </p>
                <p className="text-sm text-slate-500">{card.change}</p>
              </div>
              <card.icon className={`h-8 w-8 ${card.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3">
                <Activity className="h-4 w-4 text-slate-400" />
                <div className="flex-1">
                  <p className="text-sm text-slate-900">{activity.action}</p>
                  <p className="text-xs text-slate-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button
              className="w-full flex items-center space-x-3 p-3 cursor-pointer bg-slate-50 hover:bg-slate-100 rounded-md transition-colors"
              onClick={() => {
                setInvoiceForm({
                  id: "",
                  tenant: "",
                  property: "",
                  amount: "",
                  date: "",
                });
                setShowInvoiceModal(true);
              }}
            >
              <Plus className="h-4 w-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-900">
                Create Invoice
              </span>
            </button>
            <button
              className="w-full flex items-center space-x-3 p-3 bg-slate-50 hover:bg-slate-100 cursor-pointer rounded-md transition-colors"
              onClick={() => setShowPropertyModal(true)}
            >
              <Building className="h-4 w-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-900">
                Add Property
              </span>
            </button>
            <button
              className="w-full flex items-center space-x-3 p-3 bg-slate-50 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
              onClick={() => {
                setTenantForm({
                  name: "",
                  unit: "",
                  property: "",
                  balance: "",
                  status: "Active",
                });
                setShowTenantModal(true);
              }}
            >
              <Users className="h-4 w-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-900">
                Add Tenant
              </span>
            </button>
          </div>
        </div>
      </div>

      <PropertyModal
        isOpen={showPropertyModal}
        onClose={() => setShowPropertyModal(false)}
        propertyData={propertyForm}
        onChange={handlePropertyChange}
        onSubmit={handleAddProperty}
        isEditing={false}
      />

      <InvoiceModal
        isOpen={showInvoiceModal}
        onClose={() => {
          setShowInvoiceModal(false);
          setInvoiceForm({
            id: "",
            tenant: "",
            property: "",
            amount: "",
            date: "",
          });
        }}
        formData={invoiceForm}
        onChange={handleInvoiceChange}
        onSubmit={handleAddInvoice}
        isEditing={false}
      />

      <TenantModal
        isOpen={showTenantModal}
        onClose={() => {
          setShowTenantModal(false);
          setTenantForm({
            name: "",
            unit: "",
            property: "",
            balance: "",
            status: "Active",
          });
        }}
        formData={tenantForm}
        onChange={handleTenantChange}
        onSubmit={handleAddTenant}
        isEditing={false}
      />
    </div>
  );
};

export default Dashboard;
