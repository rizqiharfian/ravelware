import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, Legend } from "recharts";
import { Row, Col } from "react-bootstrap";
import mqtt from "mqtt";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#DD1C1A"];

function FuelUsageCharts() {
  const [carUsageData, setCarUsageData] = useState([]);
  const [fuelUsageData, setFuelUsageData] = useState([]);

  useEffect(() => {
    const client = mqtt.connect("wss://245d28c8a27a42569750f87c3eb044d2.s2.eu.hivemq.cloud:8884/mqtt", {
      username: "testravelware",
      password: "R12345678",
    });

    client.on("connect", () => {
      console.log("Connected to MQTT Broker");
      client.subscribe("test/top-5-car-usage");
      client.subscribe("test/fuel-usage");
    });

    client.on("message", (topic, message) => {
      const payload = JSON.parse(message.toString());
      if (topic === "test/top-5-car-usage") {
        setCarUsageData(payload.map((item) => ({ name: item.name, volume: item.usage })));
      } else if (topic === "test/fuel-usage") {
        setFuelUsageData(payload.map((item) => ({ name: item.name, value: item.usage })));
      }
    });

    return () => {
      client.end();
    };
  }, []);

  return (
    <Row className="mt-4">
      <Col sm={6}>
        <h5>Top 5 Car Usage This Month</h5>
        <BarChart width={400} height={250} data={carUsageData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="volume" fill="#8884d8" />
        </BarChart>
      </Col>
      <Col sm={6}>
        <h5>Fuel Usage This Month</h5>
        <PieChart width={400} height={250}>
          <Pie
            data={fuelUsageData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {fuelUsageData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </Col>
    </Row>
  );
}

export default FuelUsageCharts;
