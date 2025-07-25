import React, { useState } from "react";
import LoginPage from "./components/Authentication/LoginPage";
import LogoutAlert from "./components/Layout/LogoutAlert";
import MainContent from "./components/Layout/MainContent";
import Sidebar from "./components/Layout/Sidebar";
import TopNavigation from "./components/Layout/TopNavigation";

const App = () => {
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (email) => {
    setIsAuthenticated(true);
    setCurrentPage("dashboard");
    setUser({ email, role: "admin" });
  };

  const handleLogout = () => {
    setShowLogoutAlert(true);
  };

  const confirmLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage("login");
    setSidebarOpen(false);
    setUser(null);
    setShowLogoutAlert(false);
  };

  const cancelLogout = () => {
    setShowLogoutAlert(false);
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <TopNavigation
        onLogout={handleLogout}
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        user={user}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        <MainContent currentPage={currentPage} />
      </div>

      <LogoutAlert
        isOpen={showLogoutAlert}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
        userEmail={user?.email}
      />
    </div>
  );
};

export default App;
