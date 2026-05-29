"use client"; // App Router client component

import { useState, useRef, useEffect } from "react";

export default function OrderPopup() {
  const [open, setOpen] = useState(false);
  const popupRef = useRef(null);

  // Close popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div  className="container my-2 position-relative">
      {/* Order button */}
      <button
              className="btn btn-outline-primary text-black rounded-pill px-4"
              
              onClick={() => setOpen(!open)}
            >
              Order
            </button>

      {/* Popup near button */}
      {open && (
        
        <div
          ref={popupRef}
          className="card shadow-sm p-3 position-absolute d-flex justify-content-between align-items-right mb-3"
          style={{ top: "50px", left: "0", width: "220px", zIndex: 1050 }}
        >
          <h6 className="fw-bold text-primary mb-0">Sort Options</h6>
          <button
              className="btn-close position-absolute top-0 end-0 m-2"
              onClick={() => setOpen(false)}
            ></button>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="sort" id="lowHigh" />
            <label className="form-check-label" htmlFor="lowHigh">
              Price: Low → High
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="sort" id="highLow" />
            <label className="form-check-label" htmlFor="highLow">
              Price: High → Low
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="sort" id="popular" />
            <label className="form-check-label" htmlFor="popular">
              Most Popular
            </label>
          </div>

          <div className="d-flex gap-2 mt-3">
            <button className="btn btn-outline-secondary w-50">Cancel</button>
            <button className="btn btn-warning text-white fw-bold w-50">Apply</button>
          </div>
        </div>
      )}
    </div>
  );
}