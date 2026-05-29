// app/Component/Booking/BookingSummaryPopup.js
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './BookingSummaryPopup.module.css'; // custom CSS
import TravelerDetails from './TravelerDetails';
export default function BookingSummaryPopup({ show, onClose, offer }) {
  const [details, setDetails] = useState({});

const [showTravelerForm, setShowTravelerForm] = useState(false);
  useEffect(() => {
    if (offer) {
      setDetails({
        title: offer.title || "Tropical Escape",
        destination: offer.destination || "Maldives",
        dates: offer.dates || "15–20 June 2026",
        nights: offer.nights || 5,
        price: offer.price || 1200,
      });
    }
  }, [offer]);

  return (
    <div 
      className={`modal fade ${show ? 'show d-block' : ''}`} 
      tabIndex="-1" 
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className={`modal-dialog modal-dialog-centered ${styles.scaleUp}`}>
        <div className="modal-content shadow-lg border-0">
          <div className="modal-header bg-success text-white">
            <h5 className="modal-title">Booking Summary</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <h4>{details.title}</h4>
            <p><strong>Destination:</strong> {details.destination}</p>
            <p><strong>Dates:</strong> {details.dates}</p>
            <p><strong>Nights:</strong> {details.nights}</p>
            <p><strong>Total Price:</strong> ${details.price}</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Close</button>
            <button className="btn btn-success"
             onClick={() => setShowTravelerForm(true)}>
                Confirm Booking</button>
          </div>
        {showTravelerForm && (
        <TravelerDetails 
            show={showTravelerForm} 
            onClose={() => setShowTravelerForm(false)} 
            onSubmit={(data) => console.log('Traveler Data:', data)} 
        />
        )}
        </div>
      </div>
    </div>
    
  );
}