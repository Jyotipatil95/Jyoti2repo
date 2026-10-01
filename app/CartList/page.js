// "use client";
// import { useEffect, useState } from "react";
// import { Toast, ToastContainer, ProgressBar } from "react-bootstrap";
// export default function CartPage() {
//   const [cart, setCart] = useState([]);

//   const [showToast, setShowToast] = useState(false);

//   const handleRemove = (id) => {
//     setCart(cart.filter(item => item.id !== id));
//     setShowToast(true);
//   };
//   useEffect(() => {
//     const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(savedCart); // ✅ load from localStorage
//   }, []);

//   const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

//   return (
   
//     <div className="container py-5 bg-light">
//       <h2 className="fw-bold text-center text-success mb-4">Your Cart</h2>

//       {cart.length === 0 ? (
//         <p className="text-center text-muted">No items in cart</p>
//       ) : (
//         <div className="row justify-content-center">
//           {cart.map((item) => (
//             <div key={item.id} className="col-md-4 mb-4">
//               <div className="card h-100 shadow-lg border-0 rounded-4 cart-card">
//                 {/* Discount Badge */}
//                 {item.discount && (
//                   <span className="badge bg-danger position-absolute top-0 start-0 m-2">
//                     {item.discount}% OFF
//                   </span>
//                 )}

//                 {/* Image */}
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="card-img-top rounded-top-4"
//                   style={{ height: "220px", objectFit: "cover" }}
//                 />

//                 {/* Card Body */}
//                 <div className="card-body d-flex flex-column">
//                   <h5 className="card-title fw-bold text-dark">{item.title}</h5>
//                   <h6 className="text-muted mb-2">{item.destination}</h6>
//                   <p><strong>Date:</strong> {item.dates}</p>
//                   <p><strong>Nights:</strong> {item.nights}</p>
//                   <p className="fw-bold text-primary fs-5">₹{item.price}</p>

//                   {/* Highlights */}
//                   <ul className="list-unstyled small text-secondary mb-3">
//                     <li>🌴 Includes flights & hotel</li>
//                     <li>🍽️ Complimentary breakfast</li>
//                     <li>🚗 Airport transfers available</li>
//                   </ul>

//                   {/* Buttons */}
//                   <div className="mt-auto d-flex justify-content-between">
//                     <button
//                       className="btn btn-outline-danger btn-sm"
//                       onClick={() => handleRemove(item.id)}
//                     >
//                       <i className="bi bi-trash"></i> Remove
//                     </button>
//                     <button className="btn btn-success btn-sm">
//                       <i className="bi bi-cart-check"></i> Checkout
//                     </button>
//                   </div>
//                 </div>

//                 {/* Footer */}
//                 <div className="card-footer bg-light text-center">
//                   <small className="text-muted">⭐ Rated 4.8/5 by travelers</small>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Progress Bar */}
//       <div className="mt-4">
//         <h5 className="fw-bold">Booking Progress</h5>
//         <ProgressBar now={33} label="Cart" />
//         <ProgressBar now={66} label="Payment" className="mt-2" />
//         <ProgressBar now={100} label="Confirmation" className="mt-2" />
//       </div>

//       {/* Total Section */}
//       <div className="text-center mt-4">
//         <h5 className="fw-bold">Total: ₹{totalPrice}</h5>
//         <p className="text-secondary">Secure payment • Free cancellation within 24h</p>
//       </div>

//       {/* Toast Notification */}
//       <ToastContainer position="bottom-end" className="p-3">
//         <Toast
//           show={showToast}
//           onClose={() => setShowToast(false)}
//           delay={2000}
//           autohide
//         >
//           <Toast.Header>
//             <strong className="me-auto">Cart Update</strong>
//           </Toast.Header>
//           <Toast.Body>Item removed successfully ✅</Toast.Body>
//         </Toast>
//       </ToastContainer>

     
//     </div>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import { Toast, ToastContainer, ProgressBar } from "react-bootstrap";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Load cart on mount & listen for changes across tabs/pages
  useEffect(() => {
    setIsMounted(true);
    
    const loadCart = () => {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(savedCart);
    };

    loadCart();

    // Listen to localStorage changes in real-time
    window.addEventListener("storage", loadCart);
    return () => window.removeEventListener("storage", loadCart);
  }, []);

  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setShowToast(true);
  };

  const totalPrice = cart.reduce((sum, item) => sum + Number(item.price || 0), 0);

  // Return nothing during SSR to prevent key/markup mismatch
  if (!isMounted) {
    return null;
  }

  return (
    <div className="container py-5 bg-light min-vh-100">
      <h2 className="fw-bold text-center text-success mb-4">Your Cart ({cart.length} Items)</h2>

      {cart.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted fs-5">No items in cart</p>
        </div>
      ) : (
        <div className="row justify-content-center">
          {cart.map((item, index) => (
            <div key={item.id || index} className="col-md-4 mb-4">
              <div className="card h-100 shadow-lg border-0 rounded-4 cart-card position-relative">
                {/* Discount Badge */}
                {item.discount && (
                  <span className="badge bg-danger position-absolute top-0 start-0 m-2 z-1">
                    {item.discount}% OFF
                  </span>
                )}

                {/* Image with fallback */}
                <img
                  src={
                    item.image && item.image.trim() !== ""
                      ? item.image
                      : "https://placehold.co/600x400?text=No+Image"
                  }
                  alt={item.title || "Tour Image"}
                  className="card-img-top rounded-top-4"
                  style={{ height: "220px", objectFit: "cover" }}
                />

                {/* Card Body */}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold text-dark">{item.title}</h5>
                  
                  {/* Destination */}
                  <h6 className="text-muted mb-2">
                    {typeof item.destination === "object" 
                      ? item.destination?.name 
                      : (item.destination || item.location)}
                  </h6>

                  <p className="mb-1"><strong>Date:</strong> {item.dates || item.duration || "Flexible"}</p>
                  <p className="mb-2"><strong>Nights:</strong> {item.nights || "As per package"}</p>
                  <p className="fw-bold text-primary fs-5">₹{item.price}</p>

                  {/* Highlights */}
                  <ul className="list-unstyled small text-secondary mb-3">
                    <li>🌴 Includes flights & hotel</li>
                    <li>🍽️ Complimentary breakfast</li>
                    <li>🚗 Airport transfers available</li>
                  </ul>

                  {/* Buttons */}
                  <div className="mt-auto d-flex justify-content-between align-items-center">
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
                <div className="card-footer bg-light text-center border-0 rounded-bottom-4">
                  <small className="text-muted">⭐ Rated 4.8/5 by travelers</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Progress Bar */}
      <div className="mt-5 p-4 bg-white rounded-4 shadow-sm">
        <h5 className="fw-bold mb-3">Booking Progress</h5>
        <ProgressBar now={33} label="1. Cart" variant="success" />
      </div>

      {/* Total Section */}
      {cart.length > 0 && (
        <div className="text-center mt-4">
          <h5 className="fw-bold">Total: ₹{totalPrice}</h5>
          <p className="text-secondary small">Secure payment • Free cancellation within 24h</p>
        </div>
      )}

      {/* Toast Notification */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={2000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto text-danger">Cart Update</strong>
          </Toast.Header>
          <Toast.Body>Item removed successfully ✅</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}