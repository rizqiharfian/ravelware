import React, { useState, useEffect } from "react";
import { Dropdown, Image, Form, InputGroup, Button } from "react-bootstrap";
import { FaUserCircle, FaSearch } from "react-icons/fa";
import profileImage from "../assets/RizqiHarfian.jpg"; // Import gambar profil

function DashboardHeader() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = () => {
    alert(`Searching for: ${searchText}`);
  };

  return (
    <div className="d-flex justify-content-between align-items-center bg-dark text-white p-3">
      {/* Search Input */}
      <InputGroup style={{ maxWidth: "300px" }}>
        <Form.Control
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button variant="primary" onClick={handleSearch}>
          <FaSearch />
        </Button>
      </InputGroup>

      <div className="d-flex align-items-center">
        <div className="me-3">{currentTime}</div>
        <Dropdown align="end">
          <Dropdown.Toggle
            variant="dark"
            id="dropdown-basic"
            className="border-0 d-flex align-items-center"
            style={{ background: "none", boxShadow: "none" }}
          >
            <Image
              src={profileImage}
              roundedCircle
              alt="User"
              style={{ width: "40px", height: "40px", objectFit: "cover" }}
            />
            <span className="ms-2">Rizqi Harfian</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/my-profile">
              <FaUserCircle className="me-2" />
              My Profile
            </Dropdown.Item>
            <Dropdown.Item href="#/edit-profile">
              <FaUserCircle className="me-2" />
              Edit Profile
            </Dropdown.Item>
            <Dropdown.Item href="#/settings">
              <FaUserCircle className="me-2" />
              Settings
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#/logout">
              <FaUserCircle className="me-2" />
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}

export default DashboardHeader;
