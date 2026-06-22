import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AppContext from "../Context/Context";
import axios from "../axios";
import { toast } from "react-toastify";

const Product = () => {
  const { id } = useParams();

  const {
    addToCart,
    removeFromCart,
    refreshData,
  } = useContext(AppContext);

  const [product, setProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response =
          await axios.get(
            `${baseUrl}/api/product/${id}`
          );

        setProduct(response.data);

        if (response.data.imageName) {
          const imageResponse =
            await axios.get(
              `${baseUrl}/api/product/${id}/image`,
              {
                responseType: "blob",
              }
            );

          setImageUrl(
            URL.createObjectURL(
              imageResponse.data
            )
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${baseUrl}/api/product/${id}`
      );

      removeFromCart(id);

      toast.success(
        "Product deleted successfully"
      );

      refreshData();

      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(
        "Unable to delete product"
      );
    }
  };

  const handleEdit = () => {
    navigate(`/product/update/${id}`);
  };

  const handleAddToCart = () => {
    addToCart(product);

    toast.success(
      "Added to cart successfully"
    );
  };

  if (!product) {
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
    <section
      style={{
        marginTop: "110px",
        paddingBottom: "80px",
      }}
    >
      <div className="container">

        <div className="row align-items-center g-5">

          {/* IMAGE */}

          <div className="col-lg-6">

            <div
              className="bg-white p-5"
              style={{
                borderRadius: "30px",
                boxShadow:
                  "0 20px 50px rgba(0,0,0,0.08)",
              }}
            >
              <img
                src={imageUrl}
                alt={product.name}
                className="img-fluid"
                style={{
                  maxHeight: "600px",
                  width: "100%",
                  objectFit: "contain",
                }}
              />
            </div>

          </div>

          {/* DETAILS */}

          <div className="col-lg-6">

            <span className="badge bg-dark px-3 py-2 mb-3">
              {product.category}
            </span>

            <h1
              className="fw-bold mb-3"
              style={{
                fontSize: "3rem",
              }}
            >
              {product.name}
            </h1>

            <h5 className="text-secondary mb-4">
              {product.brand}
            </h5>

            <h2
              className="fw-bold mb-4"
              style={{
                color: "#111827",
              }}
            >
              ₹ {product.price}
            </h2>

            <div
              className="mb-4"
              style={{
                lineHeight: "1.8",
              }}
            >
              {product.description}
            </div>

            <div className="mb-4">

              {product.stockQuantity > 0 ? (
                <span className="badge bg-success fs-6">
                  In Stock (
                  {product.stockQuantity})
                </span>
              ) : (
                <span className="badge bg-danger fs-6">
                  Out Of Stock
                </span>
              )}

            </div>

            <div className="d-grid gap-3">

              <button
                className="btn btn-dark btn-lg rounded-pill"
                disabled={
                  product.stockQuantity === 0
                }
                onClick={handleAddToCart}
              >
                🛒 Add To Cart
              </button>

              <button
                className="btn btn-outline-primary rounded-pill"
                onClick={handleEdit}
              >
                Update Product
              </button>

              <button
                className="btn btn-outline-danger rounded-pill"
                onClick={handleDelete}
              >
                Delete Product
              </button>

            </div>

            <div className="mt-5 text-secondary">

              Release Date:
              {" "}
              {new Date(
                product.releaseDate
              ).toLocaleDateString()}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Product;