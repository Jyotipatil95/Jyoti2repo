"use client";
import { useEffect, useState } from "react";
import { Toast, ToastContainer, ProgressBar } from "react-bootstrap";
export default function CartPage() {
  const [cart, setCart] = useState([]);

  const [showToast, setShowToast] = useState(false);

  const handleRemove = (id) => {
    setCart(cart.filter(item => item.id !== id));
    setShowToast(true);
  };
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart); // ✅ load from localStorage
  }, []);

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
   
    <div className="container py-5 bg-light">
      <h2 className="fw-bold text-center text-success mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center text-muted">No items in cart</p>
      ) : (
        <div className="row justify-content-center">
          {cart.map((item) => (
            <div key={item.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-lg border-0 rounded-4 cart-card">
                {/* Discount Badge */}
                {item.discount && (
                  <span className="badge bg-danger position-absolute top-0 start-0 m-2">
                    {item.discount}% OFF
                  </span>
                )}

                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="card-img-top rounded-top-4"
                  style={{ height: "220px", objectFit: "cover" }}
                />

                {/* Card Body */}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold text-dark">{item.title}</h5>
                  <h6 className="text-muted mb-2">{item.destination}</h6>
                  <p><strong>Date:</strong> {item.dates}</p>
                  <p><strong>Nights:</strong> {item.nights}</p>
                  <p className="fw-bold text-primary fs-5">₹{item.price}</p>

                  {/* Highlights */}
                  <ul className="list-unstyled small text-secondary mb-3">
                    <li>🌴 Includes flights & hotel</li>
                    <li>🍽️ Complimentary breakfast</li>
                    <li>🚗 Airport transfers available</li>
                  </ul>

                  {/* Buttons */}
                  <div className="mt-auto d-flex justify-content-between">
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleRemove(item.id)}
                    >
                      <i className="bi bi-trash"></i> Remove
                    </button>
                    <button className="btn btn-success btn-sm">
                      <i className="bi bi-cart-check"></i> Checkout
                    </button>
                  </div>
                </div>

                {/* Footer */}
                <div className="card-footer bg-light text-center">
                  <small className="text-muted">⭐ Rated 4.8/5 by travelers</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Progress Bar */}
      <div className="mt-4">
        <h5 className="fw-bold">Booking Progress</h5>
        <ProgressBar now={33} label="Cart" />
        <ProgressBar now={66} label="Payment" className="mt-2" />
        <ProgressBar now={100} label="Confirmation" className="mt-2" />
      </div>

      {/* Total Section */}
      <div className="text-center mt-4">
        <h5 className="fw-bold">Total: ₹{totalPrice}</h5>
        <p className="text-secondary">Secure payment • Free cancellation within 24h</p>
      </div>

      {/* Toast Notification */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={2000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Cart Update</strong>
          </Toast.Header>
          <Toast.Body>Item removed successfully ✅</Toast.Body>
        </Toast>
      </ToastContainer>

     
    </div>
  );
}