"use client";
import { useState } from "react";

export default function FilterPanel({ onApply }) {
  const [open, setOpen] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [categories, setCategories] = useState({
    "All inclusive": true,
    "Breakfast Included": true,
    "Room Only": true,
    "With Flight": true,
  });

  const handleApply = () => {
  const activeCats = Object.keys(categories).filter((c) => categories[c]);
  if (onApply) {
    onApply({ minPrice, maxPrice, categories: activeCats });
  }
  setOpen(false);
};

  const handleClean = () => {
    setMinPrice(0);
    setMaxPrice(1000);
    setCategories({
      "All inclusive": true,
      "Breakfast Included": true,
      "Room Only": true,
      "With Flight": true,
    });
    onApply({
      minPrice: 0,
      maxPrice: 2000,
      categories: ["All inclusive", "Breakfast Included", "Room Only", "With Flight"],
    });
    setOpen(false);
  };

  return (
    <div className="container my-2 position-relative">
      <button
        className="btn btn-outline-primary text-black rounded-pill px-4"
        onClick={() => setOpen(!open)}
      >
        Filter
      </button>

      {open && (
        <div
          className="card shadow-sm p-3 position-absolute"
          style={{ top: "50px", left: "0", width: "280px", zIndex: 1050 }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="fw-bold text-primary mb-0">Filter Results</h6>
            <button className="btn-close" onClick={() => setOpen(false)}></button>
          </div>

          {/* Price Range */}
          <div className="mb-3">
            <h6 className="fw-semibold text-primary mb-2">Price Range</h6>
            <div className="d-flex align-items-center gap-2">
              <input
                type="range"
                className="form-range"
                min="0"
                max="2000"
                step="100"
                value={minPrice}
                onChange={(e) => setMinPrice(parseInt(e.target.value))}
              />
              <input
                type="range"
                className="form-range"
                min="0"
                max="2000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              />
            </div>
            <div className="d-flex justify-content-between text-muted small">
              <span>${minPrice}</span>
              <span>${maxPrice}</span>
            </div>
          </div>

          {/* Categories */}
          <div className="mb-3">
            <h6 className="fw-semibold text-primary mb-2">Categories</h6>
            {Object.keys(categories).map((cat, i) => (
              <div className="form-check" key={i}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={categories[cat]}
                  onChange={() =>
                    setCategories({ ...categories, [cat]: !categories[cat] })
                  }
                  id={`cat-${i}`}
                />
                <label className="form-check-label" htmlFor={`cat-${i}`}>
                  {cat}
                </label>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="d-flex gap-2">
            <button className="btn btn-outline-secondary w-50" onClick={handleClean}>
              Clean
            </button>
            <button className="btn btn-warning text-white fw-bold w-50" onClick={handleApply}>
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}