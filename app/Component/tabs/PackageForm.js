"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getNames } from "country-list";

export default function PackageForm() {
  const router = useRouter();
  const countries = getNames();

  // ✅ State hooks
  const [country, setCountry] = useState("");
  const [date, setDate] = useState("");
  const [nights, setNights] = useState("1");

  const handleSearch = () => {
    // Example: navigate with query params
    router.push(
      `/PacDetails?country=${encodeURIComponent(country)}&date=${date}&nights=${nights}`
    );
  };

  return (
    <div role="tabpanel" id="simple-tabpanel-0" aria-labelledby="simple-tab-0">
      <div className="container">
        <form className="row g-3 align-items-end">

          {/* Countries */}
          <div className="col-md-3">
            <label className="form-label text-white fw-bold text-uppercase small">
              Countries or Destinations
            </label>
            <div className="position-relative">
              <i className="bi bi-geo-alt text-black position-absolute top-50 start-0 translate-middle-y ms-3"></i>
              <select
                className="form-control rounded-pill ps-5"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Select country...</option>
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date */}
          <div className="col-md-3">
            <label className="form-label text-white fw-bold text-uppercase small">
              When
            </label>
            <input
              type="date"
              className="form-control rounded-pill"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Nights */}
          <div className="col-md-3">
            <label className="form-label text-white fw-bold text-uppercase small">
              Number of Nights
            </label>
            <select
              className="form-select rounded-pill"
              value={nights}
              onChange={(e) => setNights(e.target.value)}
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} nights
                </option>
              ))}
            </select>
          </div>

          {/* Button */}
          <div className="col-md-3 d-grid">
            <button
              type="button"
              className="btn btn-outline-primary fw-bold rounded-pill shadow-sm d-flex align-items-center justify-content-center gap-2"
              onClick={handleSearch}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="orange"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a5 5 0 1 0-1.001 9.9A5 5 0 0 0 11 6zm-1 0a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"/>
                <path d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.415 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
              </svg>
              <span>Look For</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}