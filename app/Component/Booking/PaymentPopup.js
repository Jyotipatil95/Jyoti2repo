// app/Component/Booking/PaymentPopup.js
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function PaymentPopup({ show, onClose, onSuccess }) {
  const [method, setMethod] = useState('card');
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate payment success
    onSuccess();
    onClose();
  };

  return (
    <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow-lg border-0">
          <div className="modal-header bg-success text-white">
            <h5 className="modal-title">Payment</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Payment Method</label>
                <select name="method" className="form-select" value={method} onChange={(e) => setMethod(e.target.value)}>
                  <option value="card">Credit/Debit Card</option>
                  <option value="upi">UPI</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>

              {method === 'card' && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Card Number</label>
                    <input type="text" name="cardNumber" className="form-control" required onChange={handleChange} />
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Expiry</label>
                      <input type="text" name="expiry" className="form-control" placeholder="MM/YY" required onChange={handleChange} />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">CVV</label>
                      <input type="password" name="cvv" className="form-control" required onChange={handleChange} />
                    </div>
                  </div>
                </>
              )}

              {method === 'upi' && (
                <div className="mb-3">
                  <label className="form-label">UPI ID</label>
                  <input type="text" name="upiId" className="form-control" required onChange={handleChange} />
                </div>
              )}

              {method === 'paypal' && (
                <p className="text-muted">You will be redirected to PayPal after clicking Pay.</p>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-success">Complete Payment</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}