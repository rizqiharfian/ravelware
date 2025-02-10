import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const [reportOpen, setReportOpen] = useState(false); // State untuk toggle submenu

  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-dark text-white p-3 vh-100" style={{ width: "220px" }}>
      <h4>Ravelware</h4>
      <ListGroup className="mt-4">
        {/* Dashboard */}
        <ListGroup.Item
          action
          as={Link}
          to="/dashboard"
          variant={isActive("/dashboard") ? "primary" : "dark"}
        >
          Dashboard
        </ListGroup.Item>

        {/* Report Menu */}
        <ListGroup.Item
          action
          variant="dark"
          onClick={() => setReportOpen(!reportOpen)}
        >
          Report
        </ListGroup.Item>

        {reportOpen && (
          <div className="ms-3">
            <ListGroup.Item
              action
              as={Link}
              to="/reports/fuel-transaction-history"
              variant={isActive("/reports/fuel-transaction-history") ? "primary" : "dark"}
            >
              Fuel Transaction History
            </ListGroup.Item>
            <ListGroup.Item
              action
              as={Link}
              to="/reports/machine-usage"
              variant={isActive("/reports/machine-usage") ? "primary" : "dark"}
            >
              Machine Usage
            </ListGroup.Item>
            <ListGroup.Item
              action
              as={Link}
              to="/reports/manpower-usage"
              variant={isActive("/reports/manpower-usage") ? "primary" : "dark"}
            >
              Manpower Usage
            </ListGroup.Item>
          </div>
        )}

        {/* History */}
        <ListGroup.Item
          action
          as={Link}
          to="/history"
          variant={isActive("/history") ? "primary" : "dark"}
        >
          History
        </ListGroup.Item>

        {/* Management */}
        <ListGroup.Item
          action
          as={Link}
          to="/management"
          variant={isActive("/management") ? "primary" : "dark"}
        >
          Management
        </ListGroup.Item>

        {/* Profile */}
        <ListGroup.Item
          action
          as={Link}
          to="/profile"
          variant={isActive("/profile") ? "primary" : "dark"}
        >
          Profile
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default Sidebar;
