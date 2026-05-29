// app/Component/Booking/TravelerDetails.js
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function TravelerDetails({ show, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    passport: '',
    specialRequest: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    alert('✅ Traveler details submitted successfully!');
    onClose();
  };

  return (
    <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow-lg border-0">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">Traveler Details</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input type="text" name="fullName" className="form-control" required onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" name="email" className="form-control" required onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input type="tel" name="phone" className="form-control" required onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Passport Number</label>
                <input type="text" name="passport" className="form-control" onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Special Requests</label>
                <textarea name="specialRequest" className="form-control" rows="2" onChange={handleChange}></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary">Submit Details</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}