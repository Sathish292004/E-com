import React, {
  useContext,
  useEffect,
  useState,
} from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import { toast } from "react-toastify";
import AppContext from "../Context/Context";
import unplugged from "../assets/unplugged.png";
import "./SearchResults.css";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { addToCart } =
    useContext(AppContext);

  const [searchData, setSearchData] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [showToast, setShowToast] =
    useState(false);

  const [toastProduct, setToastProduct] =
    useState(null);

  useEffect(() => {
    if (
      location.state &&
      location.state.searchData
    ) {
      setSearchData(
        location.state.searchData
      );

      setLoading(false);
    } else {
      navigate("/");
    }
  }, [location, navigate]);

  useEffect(() => {
    let timer;

    if (showToast) {
      timer = setTimeout(() => {
        setShowToast(false);
      }, 2500);
    }

    return () =>
      clearTimeout(timer);
  }, [showToast]);

  const convertBase64ToDataURL = (
    base64String,
    mimeType = "image/jpeg"
  ) => {
    if (!base64String)
      return unplugged;

    if (
      base64String.startsWith(
        "data:"
      )
    )
      return base64String;

    if (
      base64String.startsWith(
        "http"
      )
    )
      return base64String;

    return `data:${mimeType};base64,${base64String}`;
  };

  const handleAddToCart = (
    product
  ) => {
    addToCart(product);

    setToastProduct(product);

    setShowToast(true);

    toast.success(
      "Added To Cart"
    );
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
        }}
      >
        <div className="spinner-border"></div>
      </div>
    );
  }

  return (
    <>
      {/* TOAST */}

      {showToast && (
        <div
          className="position-fixed top-0 end-0 p-4"
          style={{
            zIndex: 9999,
          }}
        >
          <div
            className="bg-white shadow-lg p-3"
            style={{
              borderRadius: "20px",
              minWidth: "320px",
            }}
          >
            <div className="d-flex align-items-center">

              <img
                src={convertBase64ToDataURL(
                  toastProduct?.imageData
                )}
                alt=""
                width="55"
                height="55"
                className="rounded-3 me-3"
              />

              <div>

                <h6 className="fw-bold mb-1">
                  Added To Cart
                </h6>

                <small className="text-muted">
                  {
                    toastProduct?.name
                  }
                </small>

              </div>

            </div>
          </div>
        </div>
      )}

      <section
        style={{
          marginTop: "110px",
          paddingBottom: "80px",
        }}
      >
        <div className="container">

          {/* HEADER */}

          <div className="text-center mb-5">

            <span className="badge bg-dark px-4 py-2 mb-3">
              SK STORE
            </span>

            <h1
              className="fw-bold"
              style={{
                fontSize: "3rem",
              }}
            >
              Search Results
            </h1>

            <p className="text-muted">
              Found{" "}
              <strong>
                {
                  searchData.length
                }
              </strong>{" "}
              products matching
              your search
            </p>

          </div>

          {/* EMPTY */}

          {searchData.length ===
            0 && (
            <div
              className="bg-white text-center p-5"
              style={{
                borderRadius:
                  "30px",
                boxShadow:
                  "0 15px 40px rgba(0,0,0,.08)",
              }}
            >
              <i
                className="bi bi-search"
                style={{
                  fontSize:
                    "5rem",
                }}
              ></i>

              <h3 className="mt-3">
                No Products Found
              </h3>

              <p className="text-muted">
                Try another
                keyword
              </p>

              <button
                className="btn btn-dark rounded-pill px-4 mt-3"
                onClick={() =>
                  navigate("/")
                }
              >
                Back Home
              </button>
            </div>
          )}

          {/* PRODUCTS */}

<div className="row g-4">

  {searchData.map((product) => (

    <div
      key={product.id}
      className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
    >

      <div className="product-search-card">

        <div className="product-image-area">

          <img
            src={convertBase64ToDataURL(
              product.imageData
            )}
            alt={product.name}
            className="product-image"
            onError={(e) => {
              e.target.src = unplugged;
            }}
          />

          <span
            className={`stock-badge ${
              product.productAvailable
                ? "stock-available"
                : "stock-unavailable"
            }`}
          >
            {product.productAvailable
              ? "Available"
              : "Out Of Stock"}
          </span>

        </div>

        <div className="product-content">

          <div className="product-brand">
            {product.brand}
          </div>

          <h5 className="product-title">
            {product.name}
          </h5>

          <p className="product-description">
            {product.description}
          </p>

          <div className="product-footer">

            <div className="product-price">
              ₹{product.price}
            </div>

            <span className="product-category">
              {product.category}
            </span>

          </div>

          <div className="product-actions">

            <button
              className="view-btn"
              onClick={() =>
                navigate(
                  `/product/${product.id}`
                )
              }
            >
              View Product
            </button>

            <button
              className="cart-btn"
              disabled={
                !product.productAvailable ||
                product.stockQuantity === 0
              }
              onClick={() =>
                handleAddToCart(product)
              }
            >
              {product.stockQuantity > 0
                ? "Add To Cart"
                : "Out Of Stock"}
            </button>

          </div>

        </div>

      </div>

    </div>

  ))}

</div>

          

        </div>
      </section>
    </>
  );
};

export default SearchResults;