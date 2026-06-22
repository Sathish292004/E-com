import "./Home.css";
import HeroSection from "./HeroSection";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppContext from "../Context/Context";
import unplugged from "../assets/unplugged.png";

const Home = ({ selectedCategory }) => {
  const { data, isError, addToCart, refreshData } =
    useContext(AppContext);

  const [isDataFetched, setIsDataFetched] =
    useState(false);

  const [showToast, setShowToast] =
    useState(false);

  const [toastProduct, setToastProduct] =
    useState(null);

  useEffect(() => {
    if (!isDataFetched) {
      refreshData();
      setIsDataFetched(true);
    }
  }, [refreshData, isDataFetched]);

  useEffect(() => {
    let toastTimer;

    if (showToast) {
      toastTimer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }

    return () => clearTimeout(toastTimer);
  }, [showToast]);

  const convertBase64ToDataURL = (
    base64String,
    mimeType = "image/jpeg"
  ) => {
    if (!base64String) return unplugged;

    if (base64String.startsWith("data:")) {
      return base64String;
    }

    if (base64String.startsWith("http")) {
      return base64String;
    }

    return `data:${mimeType};base64,${base64String}`;
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();

    addToCart(product);

    setToastProduct(product);

    setShowToast(true);
  };

  const filteredProducts = selectedCategory
    ? data.filter(
        (product) =>
          product.category === selectedCategory
      )
    : data;

  if (isError) {
    return (
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="text-center">
          <img
            src={unplugged}
            alt="error"
            width="120"
          />

          <h3 className="mt-4 text-white">
            Something Went Wrong
          </h3>
        </div>
      </div>
    );
  }

  return (
    <>
      <HeroSection />

      <div
        className="position-fixed top-0 end-0 p-3"
        style={{ zIndex: 1050 }}
      >
        <div
          className={`toast ${
            showToast ? "show" : "hide"
          }`}
        >
          <div className="toast-header bg-success text-white">
            <strong className="me-auto">
              Added To Cart
            </strong>

            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={() =>
                setShowToast(false)
              }
            />
          </div>

          <div className="toast-body">
            {toastProduct && (
              <div className="d-flex align-items-center">
                <img
                  src={convertBase64ToDataURL(
                    toastProduct.imageData
                  )}
                  alt={toastProduct.name}
                  width="45"
                  height="45"
                  className="rounded me-3"
                />

                <div>
                  <div className="fw-bold">
                    {toastProduct.name}
                  </div>

                  <small>
                    Successfully added to cart
                  </small>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <section className="products-section">

        <div className="container">

          <div className="section-header">

            <h2 className="section-title">
              Featured Products
            </h2>

            <p className="section-subtitle">
              Add your first product
            </p>

          </div>

          {!filteredProducts ||
          filteredProducts.length === 0 ? (
            <div className="no-products">
              <h3>
                No Products Available
              </h3>
            </div>
          ) : (
            <div className="row g-4">

              {filteredProducts.map(
                (product) => {
                  const {
                    id,
                    brand,
                    name,
                    price,
                    imageData,
                    stockQuantity,
                  } = product;

                  return (
                    <div
                      className="col-6 col-md-4 col-lg-3"
                      key={id}
                    >
                      <Link
                        to={`/product/${id}`}
                        className="text-decoration-none"
                      >
                        <div className="product-card">

                          <div className="product-image-wrapper">

                            <img
                              src={convertBase64ToDataURL(
                                imageData
                              )}
                              alt={name}
                              className="product-image"
                              onError={(e) => {
                                e.target.src =
                                  unplugged;
                              }}
                            />

                          </div>

                          <div className="product-content">

                            <div className="product-brand">
                              {brand}
                            </div>

                            <h5 className="product-name">
                              {name}
                            </h5>

                            <div className="product-price">
                              ₹{price}
                            </div>

                            <div
                              className={`product-stock ${
                                stockQuantity > 0
                                  ? "stock-available"
                                  : "stock-unavailable"
                              }`}
                            >
                              {stockQuantity > 0
                                ? "In Stock"
                                : "Out Of Stock"}
                            </div>

                            <button
                              className="product-btn"
                              onClick={(e) =>
                                handleAddToCart(
                                  e,
                                  product
                                )
                              }
                              disabled={
                                stockQuantity === 0
                              }
                            >
                              {stockQuantity > 0
                                ? "Add To Cart"
                                : "Out Of Stock"}
                            </button>

                          </div>

                        </div>
                      </Link>
                    </div>
                  );
                }
              )}

            </div>
          )}

        </div>

      </section>
    </>
  );
};

export default Home;