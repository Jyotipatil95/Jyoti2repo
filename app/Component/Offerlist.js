"use client";
import { useState, useEffect, Suspense } from "react";
import FilterPanel from "./FilterPanel";
import OrderPopup from "./OrderPopup";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import BookingSummary from './Booking/BookingSummary';

// 1. Create a lightweight fallback/loading shell for the layout boundary
function OffersPageFallback() {
  return (
    <div className="container my-5 text-center p-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-2 text-muted">Loading available packages...</p>
    </div>
  );
}

// 2. Wrap the core component in Suspense before Next.js exports it to the route
export default function OffersPage({ offer }) {
  return (
    <Suspense fallback={<OffersPageFallback />}>
      <OffersContent offer={offer} />
    </Suspense>
  );
}

// 3. Your core layout component (Renamed from OffersPage to OffersContent)
function OffersContent({ offer }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const country = searchParams.get("country");
  const date = searchParams.get("date");
  const nights = searchParams.get("nights");

  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState(null);
  const [addedItem, setAddedItem] = useState(null);
  
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  //use query parameter

  // const { country, date, nights } = router.query;
  // const [offers, setOffers] = useState([]);
  // const [filteredOffers, setFilteredOffers] = useState([]);
  // const [visibleCount, setVisibleCount] = useState(5);

  // useEffect(() => {
  //   // Fetch all offers from your API
  //   fetch("/api/offers")
  //     .then(res => res.json())
  //     .then(data => setOffers(data))
  //     .catch(err => console.error(err));
  // }, []);

  // useEffect(() => {
  //   if (offers.length > 0 && country && date && nights) {
  //     const filtered = offers.filter(
  //       offer =>
  //         offer.country.toLowerCase() === country.toLowerCase() &&
  //         offer.nights.toString() === nights
  //     );
  //     setFilteredOffers(filtered);
  //   }
  // }, [offers, country, date, nights]);

  const allOffers = [
    {
      id: 1,
      title: "Dubai Luxury Escape",
      destination: "United Arab Emirates",
      dates: "15-05-2026 to 20-05-2026",
      nights: 5,
      price: 799,
      category: "All inclusive",
      highlights: ["Includes breakfast", "Free excursions", "Airport transfers"],
      image: "/images/pic9.png",
      badge: "30% OFF",
    },
    {
      id: 2,
      title: "Paris Romantic Getaway",
      destination: "France",
      dates: "01-06-2026 to 07-06-2026",
      nights: 6,
      price: 999,
      category: "Room Only",
      highlights: ["Eiffel Tower tour", "Wine tasting", "Luxury hotel stay"],
      image: "/images/pic8.png",
      badge: "Popular",
    },
    {
      id: 3,
      title: "Yellowstone National Park",
      destination: "US",
      dates: "01-06-2026 to 07-06-2026",
      nights: 6,
      price: 699,
      category: "Room Only",
      highlights: ["Eiffel Tower tour", "Wine tasting", "Luxury hotel stay"],
      image: "/images/img5.png",
      badge: "Popular",
    },
    {
      id: 4,
      title: "Aspen, Colorado",
      destination: "US",
      dates: "01-06-2026 to 07-06-2026",
      nights: 6,
      price: 300,
      category: "Room Only",
      highlights: ["Eiffel Tower tour", "Wine tasting", "Luxury hotel stay"],
      image: "/images/img3.png",
      badge: "Popular",
    },
    {
      id: 5,
      title: "Golden Gate Bridge",
      destination: "San Francisco",
      dates: "01-06-2026 to 07-06-2026",
      nights: 6,
      price: 500,
      category: "Room Only",
      highlights: ["Eiffel Tower tour", "Wine tasting", "Luxury hotel stay"],
      image: "/images/img6.png",
      badge: "Popular",
    },
  ];

  const [filteredOffers, setFilteredOffers] = useState(allOffers);
  const [visibleCount, setVisibleCount] = useState(2);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error loading local storage cart context", e);
      }
    }
  }, []);

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const handleFilter = (filters) => {
    const result = allOffers.filter(
      (o) =>
        o.price >= filters.minPrice &&
        o.price <= filters.maxPrice &&
        filters.categories.includes(o.category)
    );
    setFilteredOffers(result);
    setVisibleCount(2);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 2);
  };

  const handleAddToCart = (selectedItem) => {
    setAddedItem(selectedItem.id);
    setTimeout(() => setAddedItem(null), 2500);

    setCart((prevCart) => {
      if (prevCart.find((item) => item.id === selectedItem.id)) {
        setMessage(`${selectedItem.title} is already in your cart`);
        setTimeout(() => setMessage(null), 3000);
        return prevCart;
      }
      const updated = [...prevCart, selectedItem];
      localStorage.setItem("cart", JSON.stringify(updated));
      setMessage(`${selectedItem.title} has been added to your cart`);
      setTimeout(() => setMessage(null), 3000);
      return updated;
    });
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
    <main className="container my-4">
      <div className="container mt-5">
        <h2 className="fw-bold">Package Details</h2>
        <p><strong>Country:</strong> {country || "Not selected"}</p>
        <p><strong>Date:</strong> {date || "Not selected"}</p>
        <p><strong>Number of Nights:</strong> {nights || "Not selected"}</p>

        <div className="mt-4">
          <h4>Available Offers</h4>
          <p>Showing packages for {country || "selected location"} starting on {date || "chosen date"} for {nights || "0"} nights...</p>
        </div>
      </div>

      <div className="row bg-white align-items-center py-3 my-3 shadow-sm rounded">
        <div className="col-md-3">
          <h5 className="m-0">We found {filteredOffers.length} offers</h5>
        </div>
        <div className="col-md-3"></div>
        <div className="col-md-2">
          <FilterPanel onApply={handleFilter} />
        </div>
        <div className="col-md-2">
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

      {message && (
        <div className="alert alert-success alert-dismissible fade show fixed-top m-3 ms-auto" style={{ maxWidth: '400px', zIndex: 2000 }} role="alert">
          {message}
          <button type="button" className="btn-close" onClick={() => setMessage(null)}></button>
        </div>
      )}

      {/* Renders cleanly using one map block variant instead of repeating mapping blocks */}
      <div className="row g-4">
        {filteredOffers.slice(0, visibleCount).map((item) => (
          <div className="col-12 mb-3" key={item.id}>
            <div className="card border-0 shadow-sm overflow-hidden">
              <div className="row g-0">
                <div className="col-md-4 position-relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={250}
                    className="img-fluid h-100 w-100 object-fit-cover"
                  />
                  {item.badge && (
                    <span className="badge bg-danger position-absolute top-0 start-0 m-2">
                      {item.badge}
                    </span>
                  )}
                  <button className="btn btn-light position-absolute top-0 end-0 m-2 rounded-circle shadow-sm">
                    <i className="bi bi-heart-fill text-danger"></i>
                  </button>
                </div>

                <div className="col-md-8 p-4 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h3 className="fw-bold text-primary m-0">{item.title}</h3>
                      <span className="badge text-dark" style={{ background: "rgb(108 186 234)" }}>
                        🏖️ Includes activities
                      </span>
                    </div>
                    <p className="text-muted mb-1"><strong>Destination:</strong> {item.destination}</p>
                    <p className="text-muted mb-1"><strong>Dates:</strong> {item.dates}</p>
                    <p className="text-muted mb-1"><strong>Nights:</strong> {item.nights}</p>
                    <p className="text-muted mb-1"><strong>Category:</strong> {item.category}</p>

                    <ul className="small text-muted mt-3">
                      {item.highlights.map((h, idx) => (
                        <li key={idx}>{h}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mt-3 pt-3 border-top">
                    <div className="mb-3 mb-md-0">
                      <div className="fw-bold fs-3 text-primary">${item.price}</div>
                      <div className="text-muted small">Price per person</div>
                    </div>
                    <div className="d-flex gap-2 w-100 w-md-auto justify-content-md-end">
                      <button className="btn btn-warning text-white fw-bold rounded-pill px-4">
                        View Offer
                      </button>
                      <button 
                        className={`btn ${addedItem === item.id ? "btn-success" : "btn-outline-dark"} fw-bold rounded-pill px-4`}
                        onClick={() => handleAddToCart(item)}
                      >
                        {addedItem === item.id ? "✓ Added" : "Add to Cart"}
                      </button>
                      <button 
                        className="btn btn-success fw-bold rounded-pill px-4"
                        onClick={() => handleBookNow(item)}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < filteredOffers.length && (
        <div className="text-center mt-4">
          <button className="btn btn-outline-primary rounded-pill px-4" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}
  
      {showPopup && (
        <BookingSummary show={showPopup} onClose={() => setShowPopup(false)} offer={selectedOffer} />
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
                {cart.map((cartItem) => (
                  <li key={cartItem.id} className="list-group-item d-flex justify-content-between align-items-center py-3">
                    <div>
                      <strong>{cartItem.title}</strong>
                      <div className="small text-muted">{cartItem.destination}</div>
                    </div>
                    <div className="text-end">
                      <span className="badge bg-primary me-2 d-inline-block mb-1">${cartItem.price}</span>
                      <button className="btn btn-sm btn-outline-danger d-block mt-1" onClick={() => handleRemoveFromCart(cartItem.id)}>
                        Remove
                      </button>
                    </div>
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
      <button
        className="btn btn-primary fw-bold rounded-pill position-relative bottom-0 end-0 m-4 px-4 py-2 shadow-lg"
        style={{ zIndex: 1040 }}
        data-bs-toggle="offcanvas"
        data-bs-target="#cartSidebar"
      >
        🛒 View Cart ({cart.length})
      </button>
    </main>
  );
}