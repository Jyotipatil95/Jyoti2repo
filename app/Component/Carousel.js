"use client";

export default function Carousel() {
  return (
    <div className='mb-0 '>
    <div 
      id="carouselExample"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      {/* Indicators */}
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="0" className="active"></button>
        <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="1"></button>
        <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="2"></button>
      </div>

      {/* Slides */}
      <div className="carousel-inner">

        <div className="carousel-item active position-relative "data-bs-interval="3000">
            <img
              src="/images/photo1.png"
              className="d-block w-100"
              alt="Slide 1"
              style={{ height: "400px", borderRadius: "40px", objectFit: "cover" }}
            />

          {/* Heading pinned top-left */}
          <h5
            className="fw-bold text-white text-start"
            style={{
              position: "absolute",
              top: "20px",
              left: "20px",
              margin: 0,
              fontSize: "5rem", // mobile default
            }}
          >
           <span>Plan Your</span>
            <span style={{ display: "block" }}>Next Trip</span>
          </h5>
           <h5
            className=" text-orange text-start"
            style={{
              position: "absolute",
              bottom: "-10px",
              right: "20px",
              margin: 0,
              fontSize: "6rem", // mobile default
              color: "rgb(255, 101, 0)",
            }}
          >
           Destinations
          </h5>
        </div>

        <div className="carousel-item active position-relative "data-bs-interval="3000">
            <img
              src="/images/photo2.png"
              className="d-block w-100"
              alt="Slide 1"
              style={{ height: "400px", borderRadius: "40px", objectFit: "cover" }}
            />

          {/* Heading pinned top-left */}
          <h5
            className="fw-bold text-white text-start"
            style={{
              position: "absolute",
              top: "20px",
              left: "20px",
              margin: 0,
              fontSize: "5rem", // mobile default
            }}
          >
            <span>Plan Your</span>
            <span style={{ display: "block" }}>Next Trip</span>
          </h5>
           <h5
            className=" text-orange text-start"
            style={{
              position: "absolute",
              bottom: "-10px",
              right: "20px",
              margin: 0,
              fontSize: "6rem", // mobile default
              color: "rgb(255, 101, 0)",
            }}
          >
           Destinations
          </h5>
        </div>

        <div className="carousel-item active position-relative" data-bs-interval="3000">
            <img
              src="/images/photo3.png"
              className="d-block w-100"
              alt="Slide 1"
              style={{ height: "400px", borderRadius: "40px", objectFit: "cover" }}
            />

          {/* Heading pinned top-left */}
          <h5
            className="fw-bold text-white text-start"
            style={{
              position: "absolute",
              top: "20px",
              left: "20px",
              margin: 0,
              fontSize: "5rem", // mobile default
            }}
          >
           <span>Plan Your</span>
            <span style={{ display: "block" }}>Next Trip</span>
          </h5>
          <h5
            className=" text-orange text-start"
            style={{
              position: "absolute",
              bottom: "-10px",
              right: "20px",
              margin: 0,
              fontSize: "6rem", // mobile default
              color: "rgb(255, 101, 0)",
            }}
          >
           Destinations
          </h5>
        </div>

      </div>

      {/* Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon"></span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
    </div>
    
  );
}