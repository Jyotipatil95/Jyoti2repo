export default function EventForm() {
  return (
    <div role="tabpanel" id="simple-tabpanel-0" aria-labelledby="simple-tab-0">
      <div className="container ">
        <form className="row g-3 align-items-end">
            
         {/* origin and destination*/}
            <div className="container my-1">
                 <fieldset className="border-0">
                 <div className="row align-items-start g-3">

                <div className="col-md-3">
                            <label className="form-label text-white fw-bold text-uppercase small">
                             Nationalilty
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

                {/* Destination */}
                <div className="col-md-3">
                            <label className="form-label text-white fw-bold text-uppercase small">
                               Class
                            </label>
                            <select className="form-select rounded-pill">
                                            <option>1 Economic</option>
                                            <option>2 Executive</option>
                                            <option>3 First Class</option>
                                            <option>4 Premium</option>
                                            <option>5 Luxury</option>
                             </select>
                </div>
            </div>
            </fieldset>
            </div>
         {/* date*/}
            <div className="container my-1">
                 <fieldset className="border-0">
                 <div className="row align-items-start g-3">

                <div className="col-md-3">
                    <label className="form-label text-white fw-bold text-uppercase small">
                    Start Date 
                    </label>
                    <input
                      type="date"
                     className="form-control rounded-pill"
                      placeholder="Select date"
                    />
                </div>

                {/* room */}
                <div className="col-md-3">
                            <label className="form-label text-white fw-bold text-uppercase small">
                              Rooms & Peoples
                            </label>
                            <input
                              type="text"
                              className="form-control rounded-pill"
                              placeholder="1 room 2 Peoples"
                            />
                </div>
                {/* Button */}
                   <div className="col-md-3 d-grid">
                    <br></br>
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
         

            </div>
            </fieldset>
            </div>
         
        </form>
      </div>
    </div>
  );
}