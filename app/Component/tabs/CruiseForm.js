"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import GuestRoomSelector from './GuestRoomSelector';
export default function CruiseForm() {
const [open, setOpen] = useState(false);
const [nights, setNights] = useState("1");
 const [date, setDate] = useState("");
const router = useRouter();
  return (
    <div role="tabpanel" id="simple-tabpanel-0" aria-labelledby="simple-tab-0">
      <div className="container ">
        <form className="row g-3 align-items-end">
            
         {/* origin and destination*/}
            <div className="container my-2">
                 <fieldset className="border-0">
                 <div className="row align-items-start g-3">

                <div className="col-md-3">
                            <label className="form-label text-white fw-bold text-uppercase small">
                             Nationalilty
                            </label>
                            <div className="position-relative">
                              <i className="bi bi-geo-alt text-black position-absolute top-50 start-0 translate-middle-y ms-3"></i>
                             <input
                              type="text"
                              className="form-control rounded-pill ps-5"
                              placeholder="Select countries or destinations..."
                            />
                            </div>
                           
                </div>

                {/* Destination */}
                <div className="col-md-3">
                            <label className="form-label text-white fw-bold text-uppercase small">
                              Cruise Line
                            </label>
                            <select className="form-select rounded-pill">
                                            <option>1 Royal Caribbean</option>
                                            <option>2 MSC</option>
                                            <option>3 Carnival</option>
                            </select>
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
                {/* Date */}
          <div className="col-md-3">
            <label className="form-label text-white fw-bold text-uppercase small">
             Departure Date
            </label>
            <input
              type="date"
              className="form-control rounded-pill"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
            </div>
            </fieldset>
            </div>
         {/* Origin and Destination*/}
            <div className="container my-0">
                 <fieldset className="border-0">
                 <div className="row align-items-start g-3">

                <div className="col-md-3">
                            <label className="form-label text-white fw-bold text-uppercase small">
                               Departure Port
                            </label>
                            <div className="position-relative">
                              <i className="bi bi-geo-alt text-black position-absolute top-50 start-0 translate-middle-y ms-3"></i>
                            <input
                              type="text"
                              className="form-control rounded-pill ps-5"
                              placeholder="Name of port"
                            />
                            </div>
                            
                </div>

                {/* Destination */}
                <div className="col-md-3">
                            <label className="form-label text-white fw-bold text-uppercase small">
                              Destination Ports
                            </label>
                            <div  className="position-relative">
                               <i className="bi bi-geo-alt text-black position-absolute top-50 start-0 translate-middle-y ms-3"></i>
                              <input
                              type="text"
                              className="form-control rounded-pill ps-5"
                              placeholder="Name of port"
                            />
                            </div>
                            
                </div>
                 {/* Rooms and people */}
                <div className="col-md-2">
                      <GuestRoomSelector/>
                </div>
                  {/* Button */}
             <div className="col-md-3 d-flex flex-column">
                <button
                    type="button"
                    className="btn btn-outline-primary fw-bold rounded-pill shadow-sm d-flex align-items-center justify-content-center gap-2 mt-4"
                    onClick={() => router.push("/HotelTransDetails")}
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
            </div>
            </fieldset>
            </div>
        
        </form>
      </div>
    </div>
  );
}