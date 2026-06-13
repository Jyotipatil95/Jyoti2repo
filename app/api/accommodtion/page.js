'use client';

import { useState } from 'react';

export default function AccommodationSearch() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Mock search payload matching Travel Compositor requirements
    const searchPayload = {
      destination: "PAR", // Paris (example destination code)
      checkIn: "2026-09-10",
      checkOut: "2026-09-15",
      pax: [{ adults: 2, childrenAges: [] }]
    };

    try {
      const res = await fetch('/api/accommodation/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(searchPayload),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Something went wrong');

      // Assume the API returns an array of hotels or options
      setResults(data.hotels || []); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Search Accommodations</h1>
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search Hotels'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ marginTop: '2rem' }}>
        {results.map((hotel) => (
          <div key={hotel.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
            <h3>{hotel.name}</h3>
            <p>{hotel.description}</p>
            <p><strong>Price:</strong> {hotel.price} {hotel.currency}</p>
          </div>
        ))}
      </div>
    </div>
  );
}