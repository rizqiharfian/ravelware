import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineDownload } from "react-icons/ai";

const reportData = [
  { id: 1, date: "2023-10-18 15:13:17", station: "Station 2", name: "andrew", license: "B 1235 K", code: "20130", fuel: "pertalite", usage: 2, leftover: 150 },
  { id: 2, date: "2023-10-18 15:13:17", station: "Station 1", name: "andrew", license: "B 1234 K", code: "20130", fuel: "pertalite", usage: 5, leftover: 150 },
];

function ReportTable() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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
        <Button variant="primary">
          <AiOutlineDownload className="me-2" />
          Export
        </Button>
      </div>

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
          {reportData.map((data) => (
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
    </div>
  );
}

export default ReportTable;
