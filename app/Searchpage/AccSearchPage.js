// "use client";
// import { useState } from "react";
// import AccommodationForm from "../Component/tabs/AccommodationForm";
// import AccoOffer from "../Component/AccoOffer";

// export default function SearchPage() {
//   const [offers, setOffers] = useState([]);

//   return (
//     <main className="container my-4">
//       <AccommodationForm onSearch={setOffers} />
//       {offers.length > 0 && <AccoOffer offers={offers} />}
//     </main>
//   );
// }
"use client";
import { useState } from "react";
import AccommodationForm from "../Component/tabs/AccommodationForm";
import AccoOffer from "../Component/AccoOffer";

export default function SearchPage() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Parent handler: child calls this with products
  const handleSearchResults = (products) => {
    setOffers(products);
    setLoading(false);
    setError(""); // clear any previous error
  };

  return (
    <main className="container my-4">
      {/* Pass only the callback down */}
      <AccommodationForm onSearch={handleSearchResults} />

      {/* Feedback states */}
      {loading && <p className="text-info fw-bold">Searching...</p>}
      {error && <p className="text-danger fw-bold">{error}</p>}

      {/* Render offers */}
      {offers.length > 0 && <AccoOffer offers={offers} />}
    </main>
  );
}
