"use client";
import { useState } from "react";
import FilterPanel from "./FilterPanel";
import OrderPopup from "./OrderPopup";
export default function OffersPage() {
  const allOffers = [
    { id: 1, title: "Tour of the Mayan Ruins", price: 399, category: "All inclusive" },
    { id: 2, title: "Snorkeling in Arrecife", price: 599, category: "Breakfast Included" },
    { id: 3, title: "Mountain Hiking", price: 899, category: "Room Only" },
    { id: 4, title: "Nighttime Gastronomic Tour", price: 299, category: "With Flight" },
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

                  <div className="d-flex align-items-center justify-content-center bg-blue-gradient p-4 h-100">
                    <span className="text-white fw-bold fs-5">{offer.title}</span>
                  </div>
                  <button className="btn btn-light position-absolute top-0 end-0 m-2 rounded-circle shadow-sm">
                    <i className="bi bi-heart-fill text-danger"></i>
                  </button>
                  
                </div>

                {/* Right content section */}
                
           <div className="col-md-8 p-3">
           <div className="d-flex flex-column flex-md-row justify-content-between">
            {/* Left content */}
            <div className="flex-grow-1">
            <h3 className="fs-6 fw-bold text-primary mb-2">
                Tour of the Mayan Ruins
            </h3>

            {/* Duration & Location */}
            <div className="d-flex align-items-center gap-4 mb-3 text-muted">
                <span>⏱️ 8 hours</span>
                <span>📍 Chichen Itza, Mexico</span>
            </div>

            {/* Difficulty & Group size */}
            <div className="d-flex align-items-center gap-3 mb-3 small">
                <span className="px-2 py-1 rounded bg-warning-subtle text-warning fw-semibold">
                🏃 Moderate
                </span>
                <span className="px-2 py-1 rounded bg-light text-purple fw-semibold">
                👥 Small group
                </span>
            </div>

            {/* Guide & Features */}
            <div className="d-flex flex-column gap-2 mb-3">
                <div className="small text-muted">
                <strong>Guide:</strong> Bilingual guide
                </div>
                <div className="d-flex flex-wrap gap-2">
                <span className="px-2 py-1 rounded bg-info-subtle text-black small" style={{ background: "rgb(108 186 234)" }}>
                    Round-trip transportation
                </span>
                <span className="px-2 py-1 rounded bg-info-subtle text-black small" style={{ background: "rgb(108 186 234)" }}>
                    Certified guide
                </span>
                <span className="text-secondary small">+ 2 more</span>
                </div>
            </div>
            </div>

            {/* Rating */}
            <div className="text-end mb-4 mb-md-0">
           <div className="bg-success text-white px-2 py-1 rounded d-inline-block">
                <span className="fw-bold fs-6">4.8</span>
           </div>
            <div className="small text-muted mt-2">
                <strong>Excellent</strong>
                <div>(234 reviews)</div>
            </div>
            </div>
        </div>

        {/* Footer section */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mt-4 pt-4 border-top">
            <div>
            <div className="small text-muted mb-1">Excursion available</div>
            <div className="badge bg-primary">Cultural</div>
            </div>

            <div className="text-end mt-4 mt-md-0">
            <div className="fs-5 fw-bold text-primary">$ 99</div>
            <div className="small text-muted mb-3">Per person</div>
            <button className="bg-warning text-white px-2 py-1 rounded-pill">
                Book excursion
            </button>
             <button className="bg-warning text-white px-2 py-1 rounded-pill">
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