"use client";
import Image from "next/image";

export default function packagecart({ product, onAddToCart }) {
  return (
    <div className="card mb-4 shadow-sm">
      <div className="row g-0">
        {/* Image Section */}
        <div className="col-md-4 position-relative">
          <Image
            src={product.image}
            alt={product.title}
            width={180}
            height={180}
            className="img-fluid rounded-start"
          />
          {product.badge && (
            <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-2">
              {product.badge}
            </span>
          )}
        </div>

        {/* Content Section */}
        <div className="col-md-8 p-3">
          <h5 className="fw-bold">{product.title}</h5>
          <p className="text-muted mb-1">
            <strong>Price:</strong> ₹{product.price}
          </p>
          <p className="text-success mb-1">{product.availability}</p>
          {product.category && (
            <p className="small text-muted mb-1">
              <strong>Category:</strong> {product.category}
            </p>
          )}
          {product.color && (
            <p className="small text-muted mb-1">
              <strong>Colour:</strong> {product.color}
            </p>
          )}

          {/* Actions */}
          <div className="d-flex gap-2 mt-3">
            <button
              className="btn btn-outline-dark fw-bold rounded-pill px-4"
              onClick={() => onAddToCart(product)}
            >
              Add to Cart
            </button>
            <button className="btn btn-success fw-bold rounded-pill px-4">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}