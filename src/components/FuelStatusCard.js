import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import mqtt from "mqtt";

function FuelStatusCard() {
  const [tanks, setTanks] = useState([]);

  useEffect(() => {
    // Konfigurasi koneksi MQTT
    const client = mqtt.connect("wss://245d28c8a27a42569750f87c3eb044d2.s2.eu.hivemq.cloud:8884/mqtt", {
      username: "testravelware",
      password: "R12345678",
    });

    // Subscribe ke topik yang sesuai
    client.on("connect", () => {
      console.log("Connected to MQTT Broker");
      client.subscribe("test/realtime");
    });

    // Tangkap pesan dari broker
    client.on("message", (topic, message) => {
      if (topic === "test/realtime") {
        const payload = JSON.parse(message.toString());
        setTanks(payload);
      }
    });

    return () => {
      client.end();
    };
  }, []);

  const getStatusColor = (level, capacity) => {
    const ratio = (level / capacity) * 100;
    if (ratio >= 60) return "bg-success";
    if (ratio >= 20) return "bg-warning";
    return "bg-danger";
  };

  return (
    <Row className="mt-4">
      {tanks.map((tank, index) => (
        <Col key={index} sm={4}>
          <Card className={`text-white ${getStatusColor(tank.current_stock, tank.maximum_stock)}`}>
            <Card.Body>
              <Card.Title>{tank.name}</Card.Title>
              <Card.Text>
                {tank.current_stock}/{tank.maximum_stock} L <br />
                Status: {tank.status} <br />
                Updated at: {tank.updated_at}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default FuelStatusCard;
