import React, { useState } from "react";
import { Table, Button, Alert } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineDownload } from "react-icons/ai";
import jsPDF from "jspdf";
import "jspdf-autotable";

const reportData = [
  { id: 1, date: "2025-02-02 15:13:17", station: "Station 2", name: "andrew", license: "B 1235 K", code: "20130", fuel: "pertalite", usage: 2, leftover: 150 },
  { id: 2, date: "2025-02-03 10:00:00", station: "Station 1", name: "andrew", license: "B 1234 K", code: "20130", fuel: "pertalite", usage: 5, leftover: 150 },
];

function ReportTable() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Filter data berdasarkan rentang tanggal
  const filteredData = reportData.filter((data) => {
    const reportDate = new Date(data.date);
    return (
      (!startDate || reportDate >= startDate) &&
      (!endDate || reportDate <= endDate)
    );
  });

  // Fungsi Export ke PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Fuel Transaction History", 14, 10);

    const tableColumn = ["ID", "Time/Date", "Station", "Name", "License", "Code", "Fuel", "Usage (L)", "Left Over (L)"];
    const tableRows = [];

    filteredData.forEach((data) => {
      const rowData = [
        data.id,
        data.date,
        data.station,
        data.name,
        data.license,
        data.code,
        data.fuel,
        data.usage,
        data.leftover,
      ];
      tableRows.push(rowData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("Fuel_Report.pdf");
  };

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h5>Fuel Transaction History</h5>
        <div>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Start Date"
          />
          {"  "}
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            placeholderText="End Date"
          />
        </div>
        <Button variant="primary" onClick={exportToPDF}>
          <AiOutlineDownload className="me-2" />
          Export
        </Button>
      </div>

      {/* Tampilkan notifikasi jika tidak ada data */}
      {filteredData.length === 0 ? (
        <Alert variant="warning">No report data available for the selected date range.</Alert>
      ) : (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Time/Date</th>
              <th>Station</th>
              <th>Name</th>
              <th>License</th>
              <th>Code</th>
              <th>Fuel</th>
              <th>Fuel Usage (L)</th>
              <th>Left Over (L)</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((data) => (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.date}</td>
                <td>{data.station}</td>
                <td>{data.name}</td>
                <td>{data.license}</td>
                <td>{data.code}</td>
                <td>{data.fuel}</td>
                <td>{data.usage}</td>
                <td>{data.leftover}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default ReportTable;
