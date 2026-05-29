"use client";
import { useState } from "react";
import FilterPanel from "./FilterPanel";
import OrderPopup from "./OrderPopup";
export default function OffersPage() {
  const allOffers = [
    { id: 1, title: "Iberia", price: 399, category: "All inclusive" },
    { id: 2, title: "Vueling", price: 599, category: "Breakfast Included" },
    { id: 3, title: "Air France", price: 899, category: "Room Only" },
    { id: 4, title: "British Airways", price: 299, category: "With Flight" },
  ];

  const [filteredOffers, setFilteredOffers] = useState(allOffers);
  const [visibleCount, setVisibleCount] = useState(2); // show 2 offers initially

  // callback passed to FilterPanel
  const handleFilter = (filters) => {
    const result = allOffers.filter(
      (offer) =>
        offer.price >= filters.minPrice &&
        offer.price <= filters.maxPrice &&
        filters.categories.includes(offer.category)
    );
    setFilteredOffers(result);
    setVisibleCount(2); // reset visible count after filtering
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 2); // reveal 2 more each click
  };

  return (
    <main className="container my-2">
      <div className="row bg-white">
        <div className="col-3">
          <h5 className=" mt-4">We found {filteredOffers.length} offers</h5>
        </div>
        <div className="col-5"></div>
        <div className="col-2">
          <FilterPanel onApply={handleFilter} />
        </div>
        <div className="col-2">
          <OrderPopup />
        </div>
      </div>

      {/* offer list */}
      <div className="row g-4">
        {filteredOffers.slice(0, visibleCount).map((offer) => (
          <div className="col-md-12 mb-4" key={offer.id}>
            <div className="card border-0 shadow-lg h-100">
              <div className="row g-0">
                {/* Left gradient section */}
                <div className="col-md-4 position-relative">
                    <div className="position-relative">
                    {/* Badge */}
                    <span className="badge bg-primary position-absolute top-0 start-0 m-2 fw-bold">
                        Economic
                    </span>
                    </div>
                  <div className="d-flex align-items-center justify-content-center bg-blue-gradient p-4 h-100">
                    <span className="text-white fw-bold fs-5">{offer.title}</span>
                  </div>
                  <button className="btn btn-light position-absolute top-0 end-0 m-2 rounded-circle shadow-sm">
                    <i className="bi bi-heart-fill text-danger"></i>
                  </button>
                  
                </div>

                {/* Right content section */}
                
                <div className="col-md-8 p-4">
        <div className="d-flex flex-column flex-md-row justify-content-between">
            {/* Left content */}
            <div className="flex-grow-1">
            <h3 className="fs-6 fw-bold text-primary mb-2">
                Madrid (MAD) → New York (JFK)
            </h3>

            {/* Airline & Type */}
            <div className="d-flex align-items-center gap-2 mb-3">
                <span className="badge bg-light text-secondary">Iberia</span>
                <span className="badge bg-warning text-dark">Straight</span>
            </div>

            {/* Exit / Arrival / Duration */}
            <div className="row row-cols-2 g-3 mb-3 small text-muted">
                <div>
                <div className="fw-semibold">Exit</div>
                <div>December 15 • 9:30 AM</div>
                </div>
                <div>
                <div className="fw-semibold">Arrival</div>
                <div>December 15 • 12:45</div>
                </div>
                <div className="col-12">
                <div className="fw-semibold">Duration</div>
                <div>⏱️ 8h 15m</div>
                </div>
            </div>

            {/* Features */}
            <div className="d-flex flex-wrap gap-2 mb-3">
                <span className="badge  text-dark"  style={{background: "lightblue" }}>🧳 1 suitcase 23kg</span>
                <span className="badge bg-success text-dark" style={{ background: "rgb(109 216 118)"}}>🍱 Meal included</span>
                <span className="badge bg-secondary text-light" style={{ background: "#bdbde1" }}>💺 Standard seat</span>
            </div>
            </div>

            {/* Rating */}
            <div className="text-end mb-4 mb-md-0">
            <div className="bg-success text-white px-2 py-1 rounded d-inline-block">
                <span className="fw-bold fs-6">4.8</span>
            </div>
            <div className="small text-muted mt-2">
                <strong>Punctual</strong>
                <div>(892 reviews)</div>
            </div>
            </div>
        </div>

        {/* Footer section */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mt-4 pt-3 border-top">
            <div>
            <div className="small text-muted mb-1">SkyTravel</div>
            <div className="badge bg-warning text-dark">Final price</div>
            </div>

            <div className="text-end mt-3 mt-md-0">
            <div className="fs-6 fw-bold text-primary">$ 250</div>
            <div className="small text-muted mb-2">per person</div>
            <button className="bg-warning fw-bold px-4 py-2 rounded-pill">
                Book flight
            </button>
            <button className="bg-warning fw-bold px-4 py-2 rounded-pill">
              Add to cart
            </button>
            </div>
        </div>
                </div>
           </div>
          </div>
          </div>
        ))}
      </div>

      {/* Load More button */}
      {visibleCount < filteredOffers.length && (
        <div className="text-center mt-4">
          <button
            className="btn btn-outline-primary rounded-pill px-4"
            onClick={handleLoadMore}
          >
            Load More Packages
          </button>
        </div>
      )}
    </main>
  );
}