import React, { useState, useEffect } from "react";
import { Card, Carousel, Row, Col } from "react-bootstrap";
import mqtt from "mqtt";

function FuelStatusCard() {
  const [tanks, setTanks] = useState([]);

  useEffect(() => {
    const client = mqtt.connect("wss://245d28c8a27a42569750f87c3eb044d2.s2.eu.hivemq.cloud:8884/mqtt", {
      username: "testravelware",
      password: "R12345678",
    });

    client.on("connect", () => {
      console.log("Connected to MQTT Broker");
      client.subscribe("test/realtime");
    });

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

  // Group tanks into sets of three
  const groupTanks = (items, size) => {
    const grouped = [];
    for (let i = 0; i < items.length; i += size) {
      grouped.push(items.slice(i, i + size));
    }
    return grouped;
  };

  const groupedTanks = groupTanks(tanks, 3);

  return (
    <Carousel className="mt-4" interval={3000}>
      {groupedTanks.map((group, index) => (
        <Carousel.Item key={index}>
          <Row>
            {group.map((tank, idx) => (
              <Col key={idx} sm={4}>
                <Card className={`text-white ${getStatusColor(tank.current_stock, tank.maximum_stock)} mb-3`}>
                  <Card.Body>
                    <Card.Title className="fw-bold fs-4">{tank.name}</Card.Title>
                    <Card.Text>
                      <strong>Current Stock:</strong> {tank.current_stock}/{tank.maximum_stock} L <br />
                      <strong>Status:</strong> {tank.status} <br />
                      <strong>Updated At:</strong> {tank.updated_at}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default FuelStatusCard;
