"use client";
import { useState } from "react";
import FilterPanel from "./FilterPanel";
import OrderPopup from "./OrderPopup";
export default function OffersPage() {
  const allOffers = [
    { id: 1, title: "All Inclusive Caribbean Packages", price: 399, category: "All inclusive" },
    { id: 2, title: "European Adventure", price: 599, category: "Breakfast Included" },
    { id: 3, title: "Honeymoon in the Maldives", price: 899, category: "Room Only" },
    { id: 4, title: "Asian Express Tour", price: 299, category: "With Flight" },
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
                  <div className="d-flex align-items-center justify-content-center bg-green-gradient p-4 h-100">
                    <span className="text-white fw-bold fs-5">{offer.title}</span>
                  </div>
                  <button className="btn btn-light position-absolute top-0 end-0 m-2 rounded-circle shadow-sm">
                    <i className="bi bi-heart-fill text-danger"></i>
                  </button>
                  <span className="badge bg-dark position-absolute bottom-0 start-0 m-2">
                    1/8
                  </span>
                </div>

                {/* Right content section */}
                
            <div className="col-md-8 p-4">
              <div className="d-flex flex-column flex-md-row justify-content-between">
                {/* Left content */}
                <div className="flex-grow-1">
                  <h3 className="fs-6 fw-bold text-primary mb-2">
                    All Inclusive Caribbean Package
                  </h3>

                  {/* Rating + badge */}
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="text-warning fw-bold">★★★★★</div>
                    <span className="text-secondary bg-light px-2 py-1 rounded">
                      All inclusive
                    </span>
                  </div>

                  {/* Location + duration */}
                  <div className="d-flex fs-6 align-items-center gap-4 mb-2 text-secondary">
                    <span>📍 Punta Cana, Dominican Republic</span>
                    <span>⏱️ 7 days / 6 nights</span>
                  </div>

                  {/* Features */}
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    <span className="bg-opacity-25 text-info px-2 py-1 text-dark rounded small"  style={{ background: "rgb(108 186 234)" }}>
                      Round-trip flights
                    </span>
                    <span className="bg-opacity-25 text-info px-2 py-1  text-dark rounded small"  style={{ background: "rgb(108 186 234)" }}>
                      5-star hotel
                    </span>
                    <span className="text-muted small">+ 3 more</span>
                  </div>
                </div>

                {/* Right rating box */}
                <div className="text-end mb-4 mb-md-0">
                  <div className="bg-success text-white px-2 py-1 rounded d-inline-block">
                    <span className="fw-bold fs-6">4.8</span>
                  </div>
                  <div className="text-secondary mt-2 small">
                    <strong>Excellent</strong>
                    <div>(234 reviews)</div>
                  </div>
                </div>
              </div>

              {/* Footer section */}
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mt-4 pt-4 border-top">
                <div>
                  <div className="text-secondary small mb-1">Caribbean Tours</div>
                  <div className="bg-success bg-opacity-25 text-success px-2 py-1 rounded small d-inline-block">
                    Includes Flights + Hotel
                  </div>
                </div>

                <div className="text-end mt-4 mt-md-0">
                  <div className="fs-5 fw-bold text-primary">$ 799</div>
                  <div className="text-secondary small mb-3">All inclusive</div>
                  <button
                    type="button"
                    className=" bg-warning fw-bold px-3 py-1 text-white rounded-pill"
                  >
                    View package
                  </button>
                  <button className=" bg-warning px-3 py-1 text-white btn btn-outline-dark fw-bold rounded-pill px-3">
                      Add to Cart
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