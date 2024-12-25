import React, { useState } from "react";
import "./AdminPage.css";
import AddSparePart from "../../components/AddSparePart/AddSparePart";
import AdminProductList from "../../components/AdminProductList/AdminProductList";

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "addProduct":
        return <AddSparePart />;
      case "productsList":
        return <AdminProductList /> // Placeholder for Products List
      case "manageUsers":
        return <h2>Manage Users</h2>; // Placeholder for Manage Users
      default:
        return <h2>Welcome to the Admin Dashboard</h2>;
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-section">
          <img src="https://via.placeholder.com/40" alt="Logo" className="logo" />
          <h2>Admin Panel</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li onClick={() => setActiveSection("dashboard")}>Dashboard</li>
            <li onClick={() => setActiveSection("productsList")}>Products List</li>
            <li onClick={() => setActiveSection("addProduct")}>Add Product</li>
            <li onClick={() => setActiveSection("manageUsers")}>Manage Users</li>
            <li>Settings</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        <header className="top-nav">
          <div className="admin-profile">
            <span className="admin-name">Admin</span>
          </div>
        </header>
        <div className="content">{renderContent()}</div>
      </div>
      {/* Footer has been removed */}
    </div>
  );
};

export default AdminPage;
