import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./components/Sidebar";
import DashboardHeader from "./components/DashboardHeader";
import FuelStatusCard from "./components/FuelStatusCard";
import FuelUsageCharts from "./components/FuelUsageCharts";
import ReportTable from "./components/ReportTable";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function Dashboard() {
  return (
    <div>
      <DashboardHeader />
      <h2 className="mt-4">Realtime Fuel Tank Status</h2>
      <FuelStatusCard />
      <FuelUsageCharts />
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="d-flex">
        <Sidebar />
        <div className="main-content container-fluid p-4">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reports/fuel-transaction-history" element={<ReportTable />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
