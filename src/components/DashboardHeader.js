import React, { useState, useEffect } from "react";

function DashboardHeader() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000); // Update setiap detik
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="d-flex justify-content-between align-items-center bg-dark text-white p-3">
      <h5>Dashboard</h5>
      <div>{currentTime}</div>
    </div>
  );
}

export default DashboardHeader;
