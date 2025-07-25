import React from "react";
import AutomationSettings from "../Dashboard/AutomationSettings";
import Dashboard from "../Dashboard/Dashboard";
import InvoiceManagement from "../Dashboard/InvoiceManagement";
import PropertyList from "../Dashboard/PropertyList";
import TenantList from "../Dashboard/TenantList";

const MainContent = ({ currentPage }) => {
  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "properties":
        return <PropertyList />;
      case "invoices":
        return <InvoiceManagement />;
      case "tenants":
        return <TenantList />;
      case "automation":
        return <AutomationSettings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto lg:ml-0">
      <div className="p-6">{renderPage()}</div>
    </div>
  );
};

export default MainContent;
