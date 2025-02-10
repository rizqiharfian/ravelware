import React from "react";
import { ListGroup } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-dark text-white p-3 vh-100" style={{ width: "220px" }}>
      <h4>Ravelware</h4>
      <ListGroup className="mt-4">
        <ListGroup.Item
          action
          as={Link}
          to="/dashboard"
          variant={isActive("/dashboard") ? "primary" : "dark"}
        >
          Dashboard
        </ListGroup.Item>
        <ListGroup.Item
          action
          as={Link}
          to="/reports"
          variant={isActive("/reports") ? "primary" : "dark"}
        >
          Report
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default Sidebar;
