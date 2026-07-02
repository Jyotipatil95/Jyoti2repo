"use client";

export default function Testimonials() {
  return (
    <section className="text-center p-0">
      <h2 className="fw-bold mb-3" style={{color: "rgb(255, 101, 0)"}}>Testimonials</h2>

      <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">

          {/* Combined Slide 1 (Ann, Carlos, Luis, Maria) */}
          <div className="carousel-item active">
            <div className="row justify-content-center">
              {/* Ann */}
              <div className="col-md-3 col-sm-6 mb-4">
                <div className="d-flex flex-column align-items-center">
                  <img
                    src="/images/person1.jpeg"
                    alt="Ann"
                    className="rounded-circle mb-3"
                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                  />
                  <p className="text-warning fs-7">
                    “Pain itself, it is important to sit, to be connected with learning, but do not let it be easy, for it will bring about great labor and sorrow…”
                  </p>
                </div>
              </div>

              {/* Carlos */}
              <div className="col-md-3 col-sm-6 mb-4">
                <div className="d-flex flex-column align-items-center">
                  <img
                    src="/images/person3.jpeg"
                    alt="Carlos"
                    className="rounded-circle mb-3"
                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                  />
                  <p className="text-warning fs-7">
                    “Pain itself, it is important to sit, to be connected with learning, but…”
                  </p>
                </div>
              </div>

              {/* Luis */}
              <div className="col-md-3 col-sm-6 mb-4">
                <div className="d-flex flex-column align-items-center">
                  <img
                    src="/images/person1.jpeg"
                    alt="Luis"
                    className="rounded-circle mb-3"
                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                  />
                  <p className="text-warning fs-7">
                    “Pain itself, it is important to sit, to be connected with learning, but to do the passage of time.”
                  </p>
                </div>
              </div>

              {/* Maria */}
              <div className="col-md-3 col-sm-6 mb-4">
                <div className="d-flex flex-column align-items-center">
                  <img
                    src="/images/person3.jpeg"
                    alt="Maria"
                    className="rounded-circle mb-3"
                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                  />
                  <p className="text-warning fs-7">
                    “Pain itself, it is important to sit, to be connected with learning, but to do practice.”
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 2 (Peter only) */}
          <div className="carousel-item">
            <div className="row justify-content-center">
              <div className="col-md-4 col-sm-6 mb-4">
                <div className="d-flex flex-column align-items-center">
                  <img
                    src="/images/person1.jpeg"
                    alt="Peter"
                    className="rounded-circle mb-3"
                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                  />
                  <p className="text-warning fs-7">
                    One more testimony to complete five people.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Controls */}
        <button className="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </section>
  );
}