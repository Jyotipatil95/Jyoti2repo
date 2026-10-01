// pages/settings.js
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";

export default function Settings() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("https://api.vtravelpro.com/be/v1/settings", {
          method: "GET",
          headers: {
            "X-VTP-APIKEY": "ZlQYGOxh2C5FJpQkuYUbKOPWw5XzK9viVlrzjPYZQrtre2AEktpDAT4rgbUrOyLc", 
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        });

        // Check if response is okay before parsing
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("data:", data);
        setSettings(data);
      } catch (err) {
        console.error("Error fetching settings:", err);
        setError(err.message);
      }
    }
    fetchSettings();
  }, []);

  if (!settings) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading settings...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-2">
      <Row className="mb-2">
        <Col md={4} className="text-center">
          <img
            src={settings.logoUrl}
            alt="Company Logo"
            className="img-fluid mb-2"
            style={{ maxHeight: "100px" }}
          />
          <h3 style={{ color: settings.primaryColor }}>{settings.companyTitle}</h3>
        </Col>
        
        <Col md={8}>
          <Card className="p-1">
            <h5>Contact Information</h5>
            <p>Email: <a href={`mailto:${settings.contactEmail}`}>{settings.contactEmail}</a></p>
            <p>Phone: <a href={`tel:${settings.contactPhone}`}>{settings.contactPhone}</a></p>
            <p>WhatsApp: <a href={`tel:${settings.whatsappPhone}`}>{settings.whatsappPhone}</a></p>
            <p>Website: <a href={settings.websiteUrl} target="_blank" rel="noreferrer">{settings.websiteUrl}</a></p>
            
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Card className="p-2 mb-0">
            <h5>Available Languages</h5>
            <ul>
              {settings.langs.map((lang, idx) => (
                <li key={idx}>{lang.toUpperCase()}</li>
              ))}
            </ul>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="p-3 mb-1">
            <h5>Supported Currencies</h5>
            <ul>
              {settings.currencies.map((cur, idx) => (
                <li key={idx}>{cur.toUpperCase()}</li>
              ))}
            </ul>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="p-3">
            <h5>Background</h5>
            <img
              src={settings.backgroundUrl}
              alt="Background"
              className="img-fluid rounded"
            />
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
