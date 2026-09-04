"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getNames } from "country-list";
import GuestRoomSelector from './GuestRoomSelector';
export default function ExcursionsForm() {

  const countries = getNames();
  const [country, setCountry] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <div role="tabpanel" id="simple-tabpanel-0" aria-labelledby="simple-tab-0">
      <div className="container ">
        <form className="row g-3 align-items-end">

          {/* Countries or Destinations */}
          <div className="col-md-3">
            <label className="form-label text-white fw-bold text-uppercase small">
              To
            </label>
            <div className="position-relative">
               <i className="bi bi-geo-alt text-black position-absolute top-50 start-0 translate-middle-y ms-3"></i>
                <select
                className="form-control rounded-pill ps-5"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Where are you going?</option>
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            
            </div>
            
          </div>

          {/* When */}
          <div className="col-md-2">
            <label className="form-label text-white fw-bold text-uppercase small">
              Check-in
            </label>
            <input
              type="date"
              className="form-control rounded-pill"
               placeholder="Select date"
            />
            {/* <div className="form-text">Select date</div> */}
          </div>
            <div className="col-md-2">
            <label className="form-label text-white fw-bold text-uppercase small">
             Check-out
            </label>
            <input
              type="date"
              className="form-control rounded-pill"
               placeholder="Select date"
            />
            {/* <div className="form-text">Select date</div> */}
          </div>
          {/* Number of Guests */}
          <div className="col-md-2">
            <GuestRoomSelector/>
            {/* <label className="form-label text-white fw-bold text-uppercase small">
             Select Guests
            </label>
            <select className="form-select rounded-pill">
              <option>1 Guest</option>
              <option>2 Guests</option>
              <option>3 Guests</option>
              <option>4 Guests</option>
              <option>5 Guests</option>
              <option>6 Guests</option>
              <option>7 Guests</option>
              <option>8 Guests</option>
              <option>9 Guests</option>
              <option>10 Guests</option>
              
            </select> */}
          </div>

          
          {/* Button */}
        <div className="col-md-2 d-grid">
          <button
            type="button"
            className="btn btn-outline-primary fw-bold rounded-pill shadow-sm d-flex align-items-center justify-content-center gap-2"
            onClick={async () => {
              try {
                const res = await fetch(
                  "https://m005t6x6wj.execute-api.us-east-2.amazonaws.com/dev/search",
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      search_data: {
                        start: "2026-12-01",
                        end: "2026-12-05",
                        pole: "fDEwNzkxLVJlc3RlbA==",
                        composition: [{ adults: 2, children: 0, ages: [] }],
                        currency: "USD",
                        language: "en",
                        page: "1",
                        limit: "100"
                      }
                    }),
                  }
                );

                if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

                const data = await res.json();
                const parsedBody = JSON.parse(data.body);

                console.log(parsedBody.data.products); // verify response
                router.push("/AccoDetails"); // navigate after successful fetch
              } catch (error) {
                console.error("Error fetching search:", error);
              }
            }}
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
            <span>Search</span>
          </button>
        </div>


        </form>
      </div>
    </div>
  );
}