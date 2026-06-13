export default function TransferForm() {
  return (
    <div role="tabpanel" id="simple-tabpanel-0" aria-labelledby="simple-tab-0">
      <div className="container ">
        <form className="row g-3 align-items-end">
            {/* radio button */}
            <div className="container my-0">
                 <fieldset className="border-0">
                 <div className="row align-items-start g-3">

                {/* One way only */}
                <div className="col-auto">
                  <div className="form-check">
                    <input
                          className="form-check-input"
                         type="radio"
                        name="tripType"
                         id="oneWay"
                        value="solo-ida"
                         defaultChecked
                    />
                    <label
                      className="form-check-label fw-semibold text-white small text-uppercase"
                      htmlFor="oneWay"
                    >
                     One way only
                     </label>
                 </div>
                 </div>

                {/* Round trip */}
                <div className="col-auto">
                 <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="tripType"
                    id="roundTrip"
                    value="ida-vuelta"
                 />
                <label
                className="form-check-label fw-semibold text-white small text-uppercase"
                htmlFor="roundTrip"
                 >
                  Round trip
                </label>
                </div>
             </div>

            </div>
            </fieldset>
            </div>
         {/* origin and destination*/}
            <div className="container my-4">
                 <fieldset className="border-0">
                 <div className="row align-items-start g-3">

                <div className="col-md-5">
                            <label className="form-label text-white fw-bold text-uppercase small">
                               origin
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
                <div className="col-md-5">
                            <label className="form-label text-white fw-bold text-uppercase small">
                               Destinations
                            </label>
                            <div  className="position-relative">
                              <i className="bi bi-geo-alt text-black position-absolute top-50 start-0 translate-middle-y ms-3"></i>
                             <input
                              type="text"
                              className="form-control rounded-pill ps-5"
                              placeholder="Select countries or destinations..."
                            />
                            </div>
                           
                </div>
            </div>
            </fieldset>
            </div>
         
          {/* Arrival Date and Time  */}
          
          <div className="col-md-4">
            <label className="form-label text-white fw-bold text-uppercase small">
             Arrival Date and Time 
            </label>
            <input
              type="date"
              className="form-control rounded-pill"
               placeholder="Select date"
            />
            <input
              type="time"
              className="form-control rounded-pill"
               placeholder="Select date"
            />
            {/* <div className="form-text">Select date</div> */}
          </div>

          {/*Guest */}
          <div className="col-md-4">
            <label className="form-label text-white fw-bold text-uppercase small">
              Guest
            </label>
            <select className="form-select rounded-pill">
                <option>1 passanger</option>
                <option>2 passanger</option>
                <option>3 passanger</option>
                <option>4 passanger</option>
                <option>5 passanger</option>
                <option>6 passanger</option>
                <option>7 passanger</option>
                <option>8 passanger</option>
                <option>9 passanger</option>
                <option>10 passanger</option>
            </select>
          </div>

          {/* Button */}
          <div className="col-md-3 d-grid">
            <button
              type="button"
              className="btn btn-outline-primary fw-bold rounded-pill shadow-sm d-flex align-items-center justify-content-center gap-2"
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