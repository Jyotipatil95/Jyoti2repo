"use client";
import { useState } from "react";

export default function TravelAgentRegistration() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <main className="container my-5 mb-4">
      <div className='container bg-light rounded-5'>
        <div className="text-center mb-5">
        <img src="/images/Mlogo.png" alt="Let's Go Vacation" width="200" height="150" className="mb-3" />
        <h3 className="fw-bold text-dark">Travel Agent Registration</h3>
        <p className="text-muted">
          Complete the form to register as a travel agent and access all the professional tools on our platform.
        </p>
      </div>

      <form noValidate className={validated ? "was-validated" : ""} onSubmit={handleSubmit}>
        {/* Personal Data */}
        <div className="card shadow-sm p-4 mb-4">
          <h5 className="fw-semibold text-dark mb-3">Personal Data</h5>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name <span className="text-danger">*</span></label>
              <input type="text" className="form-control" required name="firstName" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Last name <span className="text-danger">*</span></label>
              <input type="text" className="form-control" required name="lastName" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email <span className="text-danger">*</span></label>
              <input type="email" className="form-control" required name="email" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password <span className="text-danger">*</span></label>
              <input type="password" className="form-control" required name="password" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Confirm Password <span className="text-danger">*</span></label>
              <input type="password" className="form-control" required name="confirmPassword" />
            </div>
          </div>
        </div>

        {/* Agency Information */}
        <div className="card shadow-sm p-4 mb-4">
          <h5 className="fw-semibold text-dark mb-3">Agency Information</h5>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Agency Name <span className="text-danger">*</span></label>
              <input type="text" className="form-control" required name="agencyName" />
            </div>
            <div className="col-md-6">
              <label className="form-label">License Number <span className="text-danger">*</span></label>
              <input type="text" className="form-control" required name="licenseNumber" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Commission Rate (%) <span className="text-danger">*</span></label>
              <input type="number" className="form-control" required name="commissionRate" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Years of Experience <span className="text-danger">*</span></label>
              <input type="number" className="form-control" required name="yearsOfExperience" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Office Telephone <span className="text-danger">*</span></label>
              <input type="text" className="form-control" required name="officePhone" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Website</label>
              <input type="text" className="form-control" name="website" placeholder="https://example.com" />
            </div>
            <div className="col-12">
              <label className="form-label">Office Address <span className="text-danger">*</span></label>
              <textarea className="form-control" rows="2" required name="officeAddress"></textarea>
            </div>
            <div className="col-12">
              <label className="form-label">Biography <span className="text-danger">*</span></label>
              <textarea className="form-control" rows="3" required name="bio"></textarea>
              <small className="text-muted">Describe your experience and specialties (minimum 50 characters)</small>
            </div>
          </div>
        </div>

        {/* Specializations */}
        <div className="card shadow-sm p-4 mb-4">
          <h5 className="fw-semibold text-dark mb-3">Specializations</h5>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Destinations <span className="text-danger">*</span></label>
              <select className="form-select" multiple required name="destinations">
                <option>Europe</option>
                <option>Asia</option>
                <option>North America</option>
              </select>
              <small className="text-muted">Select at least one destination</small>
            </div>
            <div className="col-md-4">
              <label className="form-label">Types of Trips <span className="text-danger">*</span></label>
              <select className="form-select" multiple required name="tripTypes">
                <option>Adventure</option>
                <option>Luxury</option>
                <option>Family</option>
              </select>
              <small className="text-muted">Select at least one type</small>
            </div>
            <div className="col-md-4">
              <label className="form-label">Other Specializations</label>
              <input type="text" className="form-control" name="specializations" />
            </div>
          </div>
        </div>

        {/* Submit */}
        <button type="submit" className="btn bg-warning w-100 fw-bold">
          Register
        </button>
      </form>
      </div>
      
    </main>
  );
}