"use client";

import { useState } from "react";
import { getNames } from "country-list";
import { useRouter } from "next/navigation"; // 1. Import useRouter
import GuestRoomSelector from "./GuestRoomSelector";
import { poleMap } from "../Pole/poleMap";
export default function AccommodationSearchPage() {
  const router = useRouter(); // 2. Initialize router
  const countries = getNames();

  const [country, setCountry] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [composition, setComposition] = useState([
    { adults: 2, children: 0, ages: [] },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
  e.preventDefault();
  setLoading(true);

  const poleValue = poleMap[country] || btoa(country);

  const searchPayload = {
    search_data: {
      start: checkIn,
      end: checkOut,
      destination: country,
      pole: poleValue,   // ✅ use fallback
      composition,
      currency: "USD",
      language: "en",
      page: "1",
      limit: "100",
    },
  };

  try {
    console.log("Sending payload:", searchPayload);
    const res = await fetch("https://m005t6x6wj.execute-api.us-east-2.amazonaws.com/dev/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(searchPayload),
    });
    
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

    const data = await res.json();
    const parsedBody = typeof data.body === "string" ? JSON.parse(data.body) : data.body;
    const products = parsedBody?.data?.products || [];

    console.log("RAW API DATA:", data);

    sessionStorage.clear();
    sessionStorage.setItem("searchOffers", JSON.stringify(products));
    sessionStorage.setItem("searchCountry", country);
    sessionStorage.setItem("searchDates", JSON.stringify({ checkIn, checkOut }));

   router.push(`/AccoDetails?t=${Date.now()}`);
  } catch (error) {
    console.error("Error fetching offers:", error);
  }
  finally {
      // Ensure loading state resets whether it succeeds or fails
      setLoading(false);
    }
};

  // const handleSearch = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   const poleValue = poleMap[country] || btoa(country); 

  //   const searchPayload = {
  //     search_data: {
  //       start: checkIn,
  //       end: checkOut,
  //       destination: country,
  //       pole:poleValue,   // ✅ lookup pole by country
  //       composition: composition,
  //       currency: "USD",
  //       language: "en",
  //       page: "1",
  //       limit: "100",
  //     },
  //   };

  //   try {
  //     const res = await fetch(
  //       "https://m005t6x6wj.execute-api.us-east-2.amazonaws.com/dev/search",
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(searchPayload),
  //       }
  //     );

  //     if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

  //     const data = await res.json();
  //     const parsedBody = JSON.parse(data.body);
  //     const products = parsedBody.data?.products || [];

  //     // 3. Store results and metadata in sessionStorage so the results page can access them
  //     sessionStorage.setItem("searchOffers", JSON.stringify(products));
  //     sessionStorage.setItem("searchCountry", country);

  //     // 4. Navigate to the results page
  //      router.push("/AccoDetails");
  //   } catch (error) {
  //     console.error("Error fetching offers:", error);
  //     setLoading(false);
  //   }
  // };

  return (
    <main className="container my-0">
      <div className="bg-info p-2 rounded-4 shadow-sm mb-4">
        <form className="row g-3 align-items-end" onSubmit={handleSearch}>
          {/* Destination Field */}
          <div className="col-md-3">
            <label className="form-label text-white fw-bold text-uppercase small">
              To
            </label>
            <select
              className="form-control rounded-pill ps-5"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            >
              <option value="" disabled>
                Where are you going?
              </option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Check-in Field */}
          <div className="col-md-2">
            <label className="form-label text-white fw-bold text-uppercase small">
              Check-in
            </label>
            <input
              type="date"
              className="form-control rounded-pill"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              required
            />
          </div>

          {/* Check-out Field */}
          <div className="col-md-2">
            <label className="form-label text-white fw-bold text-uppercase small">
              Check-out
            </label>
            <input
              type="date"
              className="form-control rounded-pill"
              value={checkOut}
              min={checkIn}
              onChange={(e) => setCheckOut(e.target.value)}
              required
            />
          </div>

          {/* Guests Selector */}
          <div className="col-md-3">
            <GuestRoomSelector onChange={(comp) => setComposition(comp)} />
          </div>

          {/* Submit Search Button */}
         
          <div className="col-md-2 d-grid">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-outline-primary fw-bold rounded-pill shadow-sm d-flex align-items-center justify-content-center gap-2"
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm" role="status"></span>
              ) : (
                <span>{loading ? "Searching..." : "Search"}</span>
              )}
            </button>
          </div> 
        </form>
      </div>
    </main>
  );
}