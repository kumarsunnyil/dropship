import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Home, BarChart, FileText, Upload, User } from "lucide-react";

// Simulated user (replace with auth store / context later)
const user = {
  name: "JohnDoe",
  role: "Admin",
};

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [mobileOpen, setMobileOpen] = useState(false); // only for mobile

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 p-2 rounded-md hover:bg-violet-600 ${
      isActive ? "bg-violet-700 font-semibold" : ""
    }`;

  return (
    <>
      {/* --- Desktop Sidebar --- */}
      <div
        className={`fixed top-14 left-0 h-full bg-violet-800 text-white shadow-lg transition-all duration-300 
        ${isOpen ? "w-60" : "w-16"} hidden md:flex flex-col`}
      >
        {/* Collapse/Expand Toggle */}
        <button
          className="absolute -right-3 top-4 bg-violet-700 p-1 rounded-full shadow"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* User Info */}
        <div className="flex items-center gap-3 p-4 border-b border-violet-700">
          <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          {isOpen && (
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-violet-200">{user.role}</p>
            </div>
          )}
        </div>

        {/* Links */}
        <nav className="mt-6 flex flex-col gap-2 px-4">
          <NavLink to="/" className={linkClasses}>
            <Home className="w-5 h-5" />
            {isOpen && <span>Home</span>}
          </NavLink>

          <NavLink to="/dashboard" className={linkClasses}>
            <BarChart className="w-5 h-5" />
            {isOpen && <span>Dashboard</span>}
          </NavLink>

          <NavLink to="/upload-inventory" className={linkClasses}>
            <Upload className="w-5 h-5" />
            {isOpen && <span>Upload Stocks</span>}
          </NavLink>

          <NavLink to="/reports" className={linkClasses}>
            <FileText className="w-5 h-5" />
            {isOpen && <span>Reports</span>}
          </NavLink>
          <NavLink to="/analytics" className={linkClasses}>
            <FileText className="w-5 h-5" />
            {isOpen && <span>Analytics</span>}
          </NavLink>
        </nav>
      </div>

      {/* --- Mobile Sidebar Overlay --- */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* --- Mobile Sidebar Slide-in --- */}
      <div
        className={`fixed top-14 left-0 w-60 h-full bg-violet-800 text-white shadow-lg flex flex-col px-4 py-6 z-50 transform transition-transform duration-300 md:hidden
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* User Info */}
        <div className="flex items-center gap-3 mb-6 border-b border-violet-700 pb-4">
          <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-violet-200">{user.role}</p>
          </div>
        </div>

        <button
          className="absolute top-4 right-4"
          onClick={() => setMobileOpen(false)}
        >
          <X className="w-6 h-6" />
        </button>

        <NavLink
          to="/"
          className="py-2 hover:bg-violet-600 rounded"
          onClick={() => setMobileOpen(false)}
        >
          Home
        </NavLink>
        <NavLink
          to="/dashboard"
          className="py-2 hover:bg-violet-600 rounded"
          onClick={() => setMobileOpen(false)}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/upload-inventory"
          className="py-2 hover:bg-violet-600 rounded"
          onClick={() => setMobileOpen(false)}
        >
          Upload Stocks
        </NavLink>
        <NavLink
          to="/reports"
          className="py-2 hover:bg-violet-600 rounded"
          onClick={() => setMobileOpen(false)}
        >
          Reports
        </NavLink>
        <NavLink
          to="/analytics"
          className="py-2 hover:bg-violet-600 rounded"
          onClick={() => setMobileOpen(false)}
        >
          Analytics
        </NavLink>
      </div>

      {/* --- Mobile Trigger Button (top left) --- */}
      <div className="md:hidden">
        <button
          className="fixed top-16 left-4 z-50 bg-violet-700 p-2 rounded-md shadow"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </>
  );
};

export default Sidebar;
