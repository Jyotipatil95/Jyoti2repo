"use client";
import { useState, useEffect } from "react";
import FilterPanel from "./FilterPanel";
import OrderPopup from "./OrderPopup";

export default function OffersPage() {
  const [allOffers, setAllOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [visibleCount, setVisibleCount] = useState(2);
  const [loading, setLoading] = useState(true);

  // Fetch API data on mount
  useEffect(() => {
    const fetchOffers = async () => {
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
                limit: "100",
              },
            }),
          }
        );

        const data = await res.json();
        const parsedBody = JSON.parse(data.body);
        const products = parsedBody.data.products || [];

        setAllOffers(products);
        setFilteredOffers(products);
      } catch (error) {
        console.error("Error fetching offers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  // Filter logic
  const handleFilter = (filters) => {
    const result = allOffers.filter(
      (offer) =>
        offer.price >= filters.minPrice &&
        offer.price <= filters.maxPrice &&
        filters.categories.includes(offer.category)
    );
    setFilteredOffers(result);
    setVisibleCount(2);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 2);
  };

  return (
    <main className="container my-2">
      <div className="row bg-white">
        <div className="col-3">
          <h5 className="mt-4">We found {filteredOffers.length} offers</h5>
        </div>
        <div className="col-5"></div>
        <div className="col-2">
          <FilterPanel onApply={handleFilter} />
        </div>
        <div className="col-2">
          <OrderPopup />
        </div>
      </div>

      {/* Loading spinner */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : (
        <>
          {/* Offer list */}
          <div className="row g-4">
            {filteredOffers.slice(0, visibleCount).map((offer, idx) => (
              <div className="col-md-12 mb-4" key={idx}>
                <div className="card border-0 shadow-lg h-100">
                  <div className="row g-0">
                    {/* Left gradient section */}
                    <div className="col-md-4 position-relative">
                      <div className="d-flex align-items-center justify-content-center bg-green-gradient p-4 h-100">
                        <span className="text-white fw-bold fs-5">{offer.name}</span>
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
                        <div className="flex-grow-1">
                        <h3 className="fs-6 fw-bold text-primary mb-2">{offer.name}</h3>
                          <div className="d-flex align-items-center gap-3 mb-3">
                            <div className="text-warning fw-bold">★★★★★</div>
                            <span className="text-secondary bg-light px-2 py-1 rounded">
                              {offer.category || "Package"}
                            </span>
                          </div>
                          <div className="d-flex fs-6 align-items-center gap-4 mb-2 text-secondary">
                            <span>📍 {offer.location || "Destination TBD"}</span>
                            <span>⏱️ {offer.duration || "Flexible dates"}</span>
                          </div>
                        </div>

                        <div className="text-end mb-4 mb-md-0">
                          <div className="bg-success text-white px-2 py-1 rounded d-inline-block">
                            <span className="fw-bold fs-6">{offer.rating || "4.5"}</span>
                          </div>
                          <div className="text-secondary mt-2 small">
                            <strong>Excellent</strong>
                            <div>({offer.reviews || "100 reviews"})</div>
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mt-4 pt-4 border-top">
                        <div>
                          <div className="text-secondary small mb-1">{offer.provider || "Travel Agency"}</div>
                          <div className="bg-success bg-opacity-25 text-success px-2 py-1 rounded small d-inline-block">
                            Includes Flights + Hotel
                          </div>
                        </div>
                        <div className="text-end mt-4 mt-md-0">
                          <div className="fs-5 fw-bold text-primary">${offer.price}</div>
                          <div className="text-secondary small mb-3">{offer.category}</div>
                          <button className="bg-warning fw-bold px-3 py-1 text-white rounded-pill">
                            View package
                          </button>
                          <button className="bg-warning px-3 py-1 text-white btn btn-outline-dark fw-bold rounded-pill px-3">
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
        </>
      )}
    </main>
  );
}
