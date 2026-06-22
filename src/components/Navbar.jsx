import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const navbarRef = useRef(null);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light-theme"
  );

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [showNoProductsMessage, setShowNoProductsMessage] =
    useState(false);

  const [isNavCollapsed, setIsNavCollapsed] =
    useState(true);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target)
      ) {
        setIsNavCollapsed(true);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    setShowNoProductsMessage(false);
    setIsLoading(true);

    try {
      const response = await axios.get(
        `${baseUrl}/api/products/search?keyword=${input}`
      );

      if (response.data.length === 0) {
        setShowNoProductsMessage(true);
      } else {
        navigate("/search-results", {
          state: {
            searchData: response.data,
          },
        });

        setIsNavCollapsed(true);
      }
    } catch (error) {
      console.error(error);
      setShowNoProductsMessage(true);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = () => {
    const updatedTheme =
      theme === "dark-theme"
        ? "light-theme"
        : "dark-theme";

    setTheme(updatedTheme);

    localStorage.setItem(
      "theme",
      updatedTheme
    );
  };

  return (
    <>
      <nav
        ref={navbarRef}
        className="navbar navbar-expand-lg fixed-top sk-navbar"
      >
        <div className="container-fluid px-lg-5 px-3">

          {/* LOGO */}

          <Link
            to="/"
            className="navbar-brand fw-bold logo"
          >
            SK <span>Store</span>
          </Link>
<div className="d-flex align-items-center d-lg-none mobile-icons">

  <button
    className="btn theme-btn"
    onClick={toggleTheme}
  >
    {theme === "dark-theme" ? (
      <i className="bi bi-sun-fill"></i>
    ) : (
      <i className="bi bi-moon-fill"></i>
    )}
  </button>

  <Link
    to="/cart"
    className="btn btn-dark rounded-circle mobile-cart"
  >
    <i className="bi bi-cart3"></i>
  </Link>

  <button
    className="navbar-toggler border-0"
    type="button"
    onClick={() =>
      setIsNavCollapsed(!isNavCollapsed)
    }
  >
    <span className="navbar-toggler-icon"></span>
  </button>

</div>
         

          {/* MENU */}

          <div
            className={`navbar-collapse ${
              isNavCollapsed ? "collapse" : "show"
            }`}
          >

            {/* AMAZON STYLE MOBILE SEARCH */}

            <form
              className="d-flex sk-search-mobile d-lg-none mb-3"
              onSubmit={handleSubmit}
            >
              <input
                type="search"
                placeholder="Search products..."
                className="form-control border-0"
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
              />

              <button
                className="btn btn-dark"
                type="submit"
              >
                {isLoading ? (
                  <span className="spinner-border spinner-border-sm"></span>
                ) : (
                  <i className="bi bi-search"></i>
                )}
              </button>
            </form>

            {/* LINKS */}

            <ul className="navbar-nav ms-lg-4 me-auto">

              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link"
                  onClick={() =>
                    setIsNavCollapsed(true)
                  }
                >
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/add_product"
                  className="nav-link"
                  onClick={() =>
                    setIsNavCollapsed(true)
                  }
                >
                  Add Product
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/orders"
                  className="nav-link"
                  onClick={() =>
                    setIsNavCollapsed(true)
                  }
                >
                  Orders
                </Link>
              </li>

            </ul>

            {/* DESKTOP SEARCH */}

            <form
              className="d-none d-lg-flex sk-search"
              onSubmit={handleSubmit}
            >
              <input
                type="search"
                placeholder="Search products..."
                className="form-control border-0"
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
              />

              <button
                className="btn btn-dark"
                type="submit"
              >
                {isLoading ? (
                  <span className="spinner-border spinner-border-sm"></span>
                ) : (
                  <i className="bi bi-search"></i>
                )}
              </button>
            </form>

            {/* THEME */}

            <button
              className="btn ms-lg-3 theme-btn"
              onClick={toggleTheme}
            >
              {theme === "dark-theme" ? (
                <i className="bi bi-sun-fill"></i>
              ) : (
                <i className="bi bi-moon-fill"></i>
              )}
            </button>

            {/* DESKTOP CART */}

            <Link
              to="/cart"
              className="btn btn-dark rounded-pill ms-3 px-4 d-none d-lg-flex"
            >
              <i className="bi bi-cart3"></i>
            </Link>

          </div>

        </div>
      </nav>

      {showNoProductsMessage && (
        <div
          className="alert alert-warning position-fixed top-0 end-0 m-5"
          style={{ zIndex: 9999 }}
        >
          No products found.
        </div>
      )}
    </>
  );
};

export default Navbar;
