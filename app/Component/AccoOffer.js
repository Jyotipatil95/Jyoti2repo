// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import FilterPanel from "./FilterPanel";
// import OrderPopup from "./OrderPopup";

// export default function ResultsPage({ viewStyle = "grid" }) {
//   const router = useRouter();
//   const [allOffers, setAllOffers] = useState([]);
//   const [filteredOffers, setFilteredOffers] = useState([]);
//   const [country, setCountry] = useState("");
//   const [visibleCount, setVisibleCount] = useState(2);

//   useEffect(() => {
//     const storedOffers = sessionStorage.getItem("searchOffers");
//     const storedCountry = sessionStorage.getItem("searchCountry");

//     if (storedOffers) {
//       try {
//         const parsed = JSON.parse(storedOffers);
//         setAllOffers(parsed);
//         setFilteredOffers(parsed);
//       } catch (e) {
//         console.error("Failed to parse searchOffers", e);
//       }
//     }

//     if (storedCountry) {
//       setCountry(storedCountry);
//     }
//   }, []);

//   const handleFilter = (filters) => {
//     const result = allOffers.filter(
//       (offer) =>
//         offer.price >= filters.minPrice &&
//         offer.price <= filters.maxPrice &&
//         filters.categories.includes(offer.category)
//     );
//     setFilteredOffers(result);
//     setVisibleCount(2);
//   };

//   const handleLoadMore = () => {
//     setVisibleCount((prev) => prev + 2);
//   };

//   return (
//     <main className="container my-5">
//       {/* Header / Controls */}
//       <div className="row bg-white align-items-center mb-4 py-2 border-bottom">
//         <div className="col-md-6">
//           <h5 className="m-0 fw-bold">
//             We found {filteredOffers.length} offers {country && `in ${country}`}
//           </h5>
//         </div>
//         <div className="col-md-3 text-end">
//           <FilterPanel onApply={handleFilter} />
//         </div>
//         <div className="col-md-3 text-end">
//           <OrderPopup />
//         </div>
//       </div>

//        {/* Offer list */}
//           <div className="row g-4">
//   {filteredOffers.slice(0, visibleCount).map((offer, idx) => (
//     <div className="col-md-12 mb-4" key={idx}>
//       <div className="card border-0 shadow-lg h-100">
//         <div className="row g-0">
//           {/* Left image/gradient section */}
//           <div className="col-md-4 position-relative">
//             {offer.image || offer.thumbnail ? (
//               <img
//                 src={offer.image || offer.thumbnail}
//                 alt={offer.name || "Offer image"}
//                 className="w-100 h-100 object-fit-cover"
//                 style={{ minHeight: "220px" }}
//               />
//             ) : (
//               <div className="d-flex align-items-center justify-content-center bg-green-gradient p-4 h-100">
//                 <span className="text-white fw-bold fs-5">{offer.name}</span>
//               </div>
//             )}
//             <button className="btn btn-light position-absolute top-0 end-0 m-2 rounded-circle shadow-sm">
//               <i className="bi bi-heart-fill text-danger"></i>
//             </button>
//             <span className="badge bg-dark position-absolute bottom-0 start-0 m-2">
//               1/8
//             </span>
//           </div>

//           {/* Right content section */}
//           <div className="col-md-8 p-4">
//             <div className="d-flex flex-column flex-md-row justify-content-between">
//               <div className="flex-grow-1">
//                 <h3 className="fs-6 fw-bold text-primary mb-2">{offer.name}</h3>
//                 <p className="text-muted small mb-3">
//                   {offer.description || "Discover this package for your next trip."}
//                 </p>
//                 <div className="d-flex align-items-center gap-3 mb-3">
//                   <div className="text-warning fw-bold">★★★★★</div>
//                   <span className="text-secondary bg-light px-2 py-1 rounded">
//                     {offer.category || "Package"}
//                   </span>
//                 </div>
//                 <div className="d-flex fs-6 align-items-center gap-4 mb-2 text-secondary">
//                   <span>📍 {offer.location || "Destination TBD"}</span>
//                   <span>⏱️ {offer.duration || "Flexible dates"}</span>
//                 </div>
//               </div>

//               <div className="text-end mb-4 mb-md-0">
//                 <div className="bg-success text-white px-2 py-1 rounded d-inline-block">
//                   <span className="fw-bold fs-6">{offer.rating || "4.5"}</span>
//                 </div>
//                 <div className="text-secondary mt-2 small">
//                   <strong>Excellent</strong>
//                   <div>({offer.reviews || "100 reviews"})</div>
//                 </div>
//               </div>
//             </div>

//             {/* Footer */}
//             <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mt-4 pt-4 border-top">
//               <div>
//                 <div className="text-secondary small mb-1">{offer.provider || "Travel Agency"}</div>
//                 <div className="bg-success bg-opacity-25 text-success px-2 py-1 rounded small d-inline-block">
//                   Includes Flights + Hotel
//                 </div>
//               </div>
//               <div className="text-end mt-4 mt-md-0">
//                 <div className="fs-5 fw-bold text-primary">${offer.price}</div>
//                 <div className="text-secondary small mb-3">{offer.category}</div>
//                 <button className="bg-warning fw-bold px-3 py-1 text-white rounded-pill">
//                   View package
//                 </button>
//                 <button className="bg-warning px-3 py-1 text-white btn btn-outline-dark fw-bold rounded-pill px-3">
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   ))}
// </div>



//       {/* Load More */}
//       {visibleCount < filteredOffers.length && (
//         <div className="text-center mt-5 mb-4">
//           <button
//             className="btn btn-outline-primary rounded-pill px-5 fw-bold shadow-sm"
//             onClick={handleLoadMore}
//           >
//             Load More Packages
//           </button>
//         </div>
//       )}
//     </main>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // ✅ 1. Import useSearchParams
import FilterPanel from "./FilterPanel";
import OrderPopup from "./OrderPopup";
import { useRouter } from "next/navigation";
export default function ResultsPage({ viewStyle = "grid" }) {
  const searchParams = useSearchParams(); // ✅ 2. Initialize searchParams to track URL changes
  const router = useRouter();
  const [allOffers, setAllOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [country, setCountry] = useState(""); 
  const [visibleCount, setVisibleCount] = useState(2);
  const [hydrated, setHydrated] = useState(false);
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState(null);
  const [addedItem, setAddedItem] = useState(null);

  // ✅ 3. Include searchParams in the dependency array so this runs on every new search
  useEffect(() => {
    setHydrated(true);

    const storedOffers = sessionStorage.getItem("searchOffers");
    const storedCountry = sessionStorage.getItem("searchCountry");

    if (storedOffers) {
      try {
        const parsed = JSON.parse(storedOffers);
        setAllOffers(parsed);
        setFilteredOffers(parsed);
      } catch (e) {
        console.error("Failed to parse searchOffers", e);
      }
    }
    if (storedCountry) setCountry(storedCountry);
    setVisibleCount(2); // Reset pagination on new search
  }, [searchParams]); 

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const handleFilter = (filters) => {
    const result = allOffers.filter(
      (offer) =>
        offer.price >= filters.minPrice &&
        offer.price <= filters.maxPrice &&
        (filters.categories.length === 0 ||
          filters.categories.includes(offer.category))
    );
    setFilteredOffers(result);
    setVisibleCount(2);
  };

  const handleLoadMore = () => setVisibleCount((prev) => prev + 2);

  const handleAddToCart = (selectedItem) => {
    // 1. Generate a truly unique ID using timestamp + a random string
    const uniqueId = selectedItem.id || `offer_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    
    const itemWithId = {
      ...selectedItem,
      id: uniqueId,
      title: selectedItem.title || selectedItem.name,
    };

    setAddedItem(uniqueId);
    setTimeout(() => setAddedItem(null), 2500);

    // 2. Fetch the freshest cart directly from localStorage to prevent overwriting
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    // 3. Check if this exact item ID is already in the cart
    const isAlreadyInCart = existingCart.some((item) => item.id === itemWithId.id);

    if (isAlreadyInCart) {
      setMessage(`${itemWithId.title} is already in your cart`);
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    // 4. Combine existing items with the new item
    const updatedCart = [...existingCart, itemWithId];

    // 5. Save back to localStorage and update React state
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);

    setMessage(`${itemWithId.title} has been added to your cart`);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleRemoveFromCart = (id) => {
    setCart((prevCart) => {
      const updated = prevCart.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };

  const handleBookNow = (o) => {
    setSelectedOffer(o);
    setShowPopup(true);
  };
  return (
    <main className="container my-1">
      {/* Header */}
      <div className="row bg-white align-items-center mb-1 py-1 border-bottom rounded-pill">
        <div className="col-md-6">
          <h5 className="m-0 fw-bold">
            We found {filteredOffers.length} offers{" "}
            {hydrated && country ? `in ${country}` : ""}
          </h5>
        </div>
        <div className="col-md-2 text-end">
          <FilterPanel onApply={handleFilter} />
        </div>
        <div className="col-md-2 text-end">
          <OrderPopup />
        </div>
        <div className="col-md-2 text-md-center container my-2 position-relative">
          <button 
            className="btn btn-outline-primary text-black rounded-pill px-4"
            onClick={() => router.push("/CartList")}
          >
           🛒 View Cart
          </button>
        </div>
      </div>

      {/* Empty state */}
      {hydrated && filteredOffers.length === 0 && (
        <div className="alert alert-info text-center">
          No offers found. Try adjusting your filters.
        </div>
      )}

      {/* Offers */}
      {hydrated && (
        <div className={`row g-1 ${viewStyle === "list" ? "flex-column" : ""}`}>
          {filteredOffers.slice(0, visibleCount).map((offer, idx) => (
            <div className="col-md-12 mb-4" key={idx}>
              <div className="card border-0 shadow-lg h-100">
                <div className="row g-0">
                  {/* Left image/gradient section */}
                  <div className="col-md-4 position-relative">
                    {offer.image || offer.thumbnail ? (
                      <img
                        src={offer.image || offer.thumbnail}
                        alt={offer.name || "Offer image"}
                        className="w-100 h-100 object-fit-cover"
                        style={{ minHeight: "220px" }}
                      />
                    ) : (
                      <div className="d-flex align-items-center justify-content-center bg-green-gradient p-4 h-100">
                        <span className="text-white fw-bold fs-5">{offer.name}</span>
                      </div>
                    )}
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
                        <p className="text-muted small mb-3">
                          {offer.description || "Discover this package for your next trip."}
                        </p>
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
                        <button className="bg-warning fw-bold px-3 py-1 text-white rounded-pill me-2">
                          View package
                        </button>
                        <button 
                        className={`btn ${addedItem === offer.id ? "btn-success" : "btn-outline-dark"} fw-bold rounded-pill px-4`}
                        onClick={() => handleAddToCart(offer)}
                        >
                        {addedItem === offer.id ? "✓ Added" : "Add to Cart"}
                      </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More */}
      {hydrated && visibleCount < filteredOffers.length && (
        <div className="text-center mt-5 mb-4">
          <button
            className="btn btn-outline-primary rounded-pill px-5 fw-bold shadow-sm"
            onClick={handleLoadMore}
          >
            Load More Packages
          </button>
        </div>
      )}
       {/* Drawer Offcanvas Cart */}
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="cartSidebar">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title fw-bold">Your Cart</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body">
          {cart.length === 0 ? (
            <p className="text-muted text-center mt-4">No items in cart</p>
          ) : (
            <>
              <ul className="list-group mb-3">
                {cart.map((cartItem, index) => (
                <li 
                key={cartItem.id || index} // 👈 Added index fallback to fix the key warning
                className="list-group-item d-flex justify-content-between align-items-center"
                >
                <div>
                <strong>{cartItem.title}</strong>
                 {/* Safely handle destination whether it's a string or an object */}
                <div className="small text-muted">
                  {typeof cartItem.destination === "object" 
                   ? cartItem.destination?.name 
                   : cartItem.destination}
                </div>
              </div>
                    {/* Rest of your item details/pricing */}
              </li>
             ))}
              </ul>
              <div className="pt-3 border-top">
                <h5 className="fw-bold d-flex justify-content-between mb-3">
                  <span>Total:</span>
                  <span>${totalPrice}</span>
                </h5>
                <button className="btn btn-success w-100 rounded-pill py-2 fw-bold">Checkout</button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Floating View Cart Trigger Button */}
      {/* <button
        className="btn btn-primary fw-bold rounded-pill position-relative bottom-0 end-0 m-4 px-4 py-2 shadow-lg"
        style={{ zIndex: 1040 }}
        data-bs-toggle="offcanvas"
        data-bs-target="#cartSidebar"
      >
        🛒 View Cart ({cart.length})
      </button> */}
    </main>
  );
}