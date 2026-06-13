"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CarRentalForm() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <div role="tabpanel" id="simple-tabpanel-0" aria-labelledby="simple-tab-0">
      <div className="container ">
        <form className="row g-3 align-items-end">
            {/* CHECK BOX */}
            <div className="container my-1">
            <div className="row g-3 align-items-start">

            {/* First checkbox */}
                <div className="col-3">
                   <div className="form-check">
                      <input
                      className="form-check-input border border-orange-500"
                      type="checkbox"
                      id="sameOffice"
                     />
                    <label
                    className="form-check-label text-white fw-semibold"
                      htmlFor="sameOffice"
                     >
                      Same return office
                    </label>
                    </div>
                </div>

                {/* Second checkbox */}
                <div className="col-5">
                <div className="form-check">
                <input
                 className="form-check-input border border-orange-500"
                type="checkbox"
                  id="driverAge"
                 />
                 <label
                  className="form-check-label text-white fw-semibold"
                  htmlFor="driverAge"
                 >
                 Driver between 30 & 65 years old
                 </label>
            </div>
            </div>

  </div>
</div>
          {/* Origin and Return */}
            
          <div className="col-md-3 my-0">
            <label className="form-label text-white fw-bold text-uppercase small">
                Origin and Return
            </label>
            
                    <div className="position-relative">
          <i className="bi bi-geo-alt text-black position-absolute top-50 start-0 translate-middle-y ms-3"></i>
          <input
            type="text"
            className="form-control rounded-pill ps-5"
            placeholder="Origin City or Airport"
          />
        </div >
        <div className="position-relative">
          <i className="bi bi-geo-alt text-black position-absolute top-50 start-0 translate-middle-y ms-3"></i>
            <span></span>
            <input
              type="text"
              className="form-control rounded-pill ps-5"
              placeholder="return City or Airport"
            />
        </div>
         
          </div>

          {/* pickup */}
          <div className="col-md-3">
            <label className="form-label text-white fw-bold text-uppercase small">
              PICK-UP DATE AND TIME
            </label>
            <input
              type="date"
              className="form-control rounded-pill"
               placeholder="Select date"
            />
            {/* <div className="form-text">Select date</div> */}
          </div>

          {/* Number of Nights */}
          <div className="col-md-3">
            <label className="form-label text-white fw-bold text-uppercase small">
              DELIVERY DATE AND TIME
            </label>
            <input
              type="date"
              className="form-control rounded-pill"
               placeholder="Select date"
            />
          </div>

          {/* Button */}
          <div className="col-md-3 d-grid">
            <button
              type="button"
              className="btn btn-outline-primary fw-bold rounded-pill shadow-sm d-flex align-items-center justify-content-center gap-2"
               onClick={() => router.push("/CarReDetails")}
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