import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer className=" background:white text-white mt-4 ">
      {/* Top contact bar */}
        <div className="d-flex align-items-center justify-content-end py-0 px-4  text-primary custom-rounded-bl ms-auto" style={{ width: "40%", background: "rgb(108 186 234"}}>
        <i className="bi bi-headset fs-3 me-2"></i>
        <span className="fw-semibold fs-3">+1 (832) 989 4525</span>
        </div>

      {/* Navigation sections */}
      <Container className="py-2 text-dark bg-light">
         <div className="row text-center text-md-start fs-6">
        
        {/* Column 1 */}
        <div className="col-md-2 pe-0 d-flex align-items-center justify-content-center">
          <div className="d-flex flex-column gap-1">
            <a href="#">Offers</a>
            <a href="#">Packages</a>
          </div>
        </div>

        {/* Column 2 with divider */}
        <div className="col-md-2 border-start border-2 border-warning ps-0 d-flex align-items-center justify-content-center">
          <div className="d-flex flex-column gap-1">
            <a href="#">Destinations</a>
            <a href="#">Excursions</a>
            <a href="#">Accommodations</a>
            <a href="#">Cars</a>
            <a href="#">Flights</a>
          </div>
        </div>

        {/* Column 3 with divider */}
        <div className="col-md-2 border-start border-2 border-warning ps-0 d-flex align-items-center justify-content-center">
          <div className="d-flex flex-column gap-1">
            <a href="#">Who we are</a>
            <a href="#">Contact us</a>
          </div>
        </div>

        {/* Column 4 with divider */}
        <div className="col-md-2 border-start border-2 border-warning ps-0 d-flex align-items-center justify-content-center">
          <div className="d-flex flex-column gap-1">
            <a href="#">My Account</a>
            <a href="#">My Travels</a>
            <a href="#">My Profile</a>
            <a href="#">Delete my account</a>
          </div>
        </div>
        {/* Column 5 with divider */}
        <div className="col-3 border-start border-2 border-warning ps-0 d-flex align-items-center justify-content-center">
          <div className="d-flex flex-column gap-1">
            <a href="#">Confidence in your purchases</a>
            <a href="#">Terms and conditions</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Current promotions</a>
            <a href="#">VAT Terms</a>
          </div>
        </div>
      </div>
        {/* <Row className="justify-content-center text-center gy-4">
          <Col md="auto">
            <div className="d-flex flex-column gap-1">
              <a href="#">Offers</a>
              <a href="#">Packages</a>
            </div>
          </Col>
          
          <Col md="auto">
            <div className="d-flex flex-column gap-1">
              <a href="#">Destinations</a>
              <a href="#">Excursions</a>
              <a href="#">Accommodations</a>
              <a href="#">Cars</a>
              <a href="#">Flights</a>
            </div>
          </Col>

          <Col md="auto">
            <div className="d-flex flex-column gap-1">
              <a href="#">Who we are</a>
              <a href="#">Contact us</a>
            </div>
          </Col>

          <Col md="auto">
            <div className="d-flex flex-column gap-1">
              <a href="#">My Account</a>
              <a href="#">My Travels</a>
              <a href="#">My Profile</a>
              <a href="#">Delete my account</a>
            </div>
          </Col>

          <Col md="auto">
            <div className="d-flex flex-column gap-1">
              <a href="#">Confidence in your purchases</a>
              <a href="#">Terms and conditions</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Current promotions</a>
              <a href="#">VAT Terms</a>
            </div>
          </Col>
        </Row> */}
      </Container>

      {/* Payment methods */}
              <div className="border-top border-light text-center py-0">
  <div className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-2">
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



// export default function Footer() {
//   return (
//     <footer className="bg-dark text-light pt-4 mt-5">
//       <div className="container">
//         <div className="row">

//           {/* About */}
//           <div className="col-md-4 mb-3">
//             <h5>MyStore</h5>
//             <p>

//               "Take vacations, and go as many places as you can. You can always make money, but you can't always make memories".
              
//             </p>
//             <p>"Vacation mood: on".</p>
//             <p>"Adventures are better when shared".</p>
//           </div>

//           {/* Links */}
//           <div className="col-md-4 mb-3">
//             <h5>Quick Links</h5>
//             <ul className="list-unstyled">
//               <li><a href="/" className="text-light">Home</a></li>
//               <li><a href="/about" className="text-light">About</a></li>
//               <li><a href="/contact" className="text-light">Contact</a></li>
//             </ul>
//           </div>

//           {/* Contact */}
//           <div className="col-md-4 mb-3">
//             <h5>Contact</h5>
//             <p>Email: support@mystore.com</p>
//             <p>Phone: +91 9876543210</p>
//           </div>

//         </div>

//         <hr className="bg-light" />

//         <div className="text-center pb-3">
//           <p className="mb-0">
//             © {new Date().getFullYear()} MyStore. All Rights Reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// }