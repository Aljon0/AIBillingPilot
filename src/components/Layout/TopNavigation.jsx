import { Bell, Building, ChevronDown, LogOut, Menu, User } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const TopNavigation = ({ onLogout, onMenuToggle, user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleUserClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogoutClick = () => {
    setIsDropdownOpen(false);
    onLogout();
  };

  return (
    <div className="bg-white border-b border-slate-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center space-x-2">
            <Building className="h-6 w-6 text-slate-900" />
            <span className="text-xl font-semibold text-slate-900">
              BackOffice AI
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 text-slate-400 hover:text-slate-600 cursor-pointer">
            <Bell className="h-5 w-5" />
          </button>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={handleUserClick}
              className="flex items-center space-x-2 p-2 cursor-pointer text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors duration-200"
            >
              <User className="h-5 w-5" />
              <span className="text-sm font-medium">
                {user?.email || "Admin"}
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
                <button
                  onClick={handleLogoutClick}
                  className="flex items-center space-x-2 w-full cursor-pointer px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors duration-150"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;
