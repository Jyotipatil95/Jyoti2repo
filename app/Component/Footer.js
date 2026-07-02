import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer className="bg-light text-dark mt-4">
      {/* Top contact bar */}
      <div
        className="d-flex align-items-center justify-content-end py-2 px-4 text-primary custom-rounded-bl ms-auto"
        style={{ width: "100%", maxWidth: "500px", background: "rgb(108 186 234)" }}
      >
        <i className="bi bi-headset fs-3 me-2"></i>
        <span className="fw-semibold fs-4">+1 (832) 989 4525</span>
      </div>

      {/* Navigation sections */}
      <Container className="py-4 align-items-center">
        <Row className="gy-3 text-center text-md-start">
          <Col xs={6} md={2}>
            <div className="d-flex flex-column gap-1">
              <a href="#">Offers</a>
              <a href="#">Packages</a>
            </div>
          </Col>

          <Col xs={6} md={3} className="border-start border-2 border-warning">
            <div className="d-flex flex-column gap-1">
              <a href="#">Destinations</a>
              <a href="#">Excursions</a>
              <a href="#">Accommodations</a>
              <a href="#">Cars</a>
              <a href="#">Flights</a>
            </div>
          </Col>

          <Col xs={6} md={2} className="border-start border-2 border-warning">
            <div className="d-flex flex-column gap-1">
              <a href="#">Who we are</a>
              <a href="#">Contact us</a>
            </div>
          </Col>

          <Col xs={6} md={2} className="border-start border-2 border-warning">
            <div className="d-flex flex-column gap-1">
              <a href="#">My Account</a>
              <a href="#">My Travels</a>
              <a href="#">My Profile</a>
              <a href="#">Delete my account</a>
            </div>
          </Col>

          <Col xs={12} md={3} className="border-start border-2 border-warning">
            <div className="d-flex flex-column gap-1">
              <a href="#">Confidence in your purchases</a>
              <a href="#">Terms and conditions</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Current promotions</a>
              <a href="#">VAT Terms</a>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Payment methods */}
      <div className="border-top border-light text-center py-3">
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-3">
          <p className="text-warning mb-0 fs-6 lh-sm">
            PURCHASE WITH YOUR <br />
            <span className="fw-bold">PREFERRED PAYMENT METHOD</span>
          </p>
          <img
            src="/images/cardimg.png"
            alt="Payment methods"
            className="img-fluid"
            style={{ maxHeight: "80px" }}
          />
        </div>
      </div>
    </footer>
  );
}