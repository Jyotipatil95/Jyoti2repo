"use client";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBox() {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", query);
  };

  return (
    <form className="d-flex position-relative" onSubmit={handleSearch}>
      
      <input
        type="search"
        className="form-control pe-5"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button
        type="submit"
        className="btn position-absolute end-0 top-0 h-100"
        style={{ border: "none", background: "transparent" }}
      >
        <FaSearch />
      </button>

    </form>
  );
}