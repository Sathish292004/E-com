import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddProduct = () => {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    stockQuantity: "",
    releaseDate: "",
    productAvailable: true,
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const categories = [
    "Laptop",
    "Headphone",
    "Mobile",
    "Electronics",
    "Toys",
    "Fashion",
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } =
      e.target;

    setProduct({
      ...product,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);

    const reader = new FileReader();

    reader.onload = (event) => {
      setImagePreview(
        event.target.result
      );
    };

    reader.readAsDataURL(file);
  };

  const submitHandler = async (
    event
  ) => {
    event.preventDefault();

    try {
      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "imageFile",
        image
      );

      formData.append(
        "product",
        new Blob(
          [
            JSON.stringify(
              product
            ),
          ],
          {
            type: "application/json",
          }
        )
      );

      await axios.post(
        `${baseUrl}/api/product`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      toast.success(
        "Product Added Successfully"
      );

      navigate("/");
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed To Add Product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      style={{
        marginTop: "110px",
        paddingBottom: "80px",
      }}
    >
      <div className="container">

        {/* Header */}

        <div className="text-center mb-5">

          <span className="badge bg-dark px-4 py-2 mb-3">
            SK STORE ADMIN
          </span>

          <h1
            className="fw-bold"
            style={{
              fontSize: "3rem",
            }}
          >
            Add New Product
          </h1>

          <p className="text-muted">
            Create premium product
            listings for your store
          </p>

        </div>

        <div className="row g-5">

          {/* LEFT */}

          <div className="col-12">

            <div
              className="bg-white p-5 ms-auto"
              style={{
                borderRadius: "30px",
                boxShadow:
                  "0 20px 50px rgba(0,0,0,0.08)",
                  
              }}
            >
              <form
                onSubmit={
                  submitHandler
                }
              >
                <div className="row g-4">

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Product Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={
                        product.name
                      }
                      onChange={
                        handleInputChange
                      }
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Brand
                    </label>

                    <input
                      type="text"
                      name="brand"
                      className="form-control"
                      value={
                        product.brand
                      }
                      onChange={
                        handleInputChange
                      }
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold">
                      Description
                    </label>

                    <textarea
                      rows="5"
                      name="description"
                      className="form-control"
                      value={
                        product.description
                      }
                      onChange={
                        handleInputChange
                      }
                      required
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-semibold">
                      Price
                    </label>

                    <input
                      type="number"
                      name="price"
                      className="form-control"
                      value={
                        product.price
                      }
                      onChange={
                        handleInputChange
                      }
                      required
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-semibold">
                      Category
                    </label>

                    <select
                      className="form-select"
                      name="category"
                      value={
                        product.category
                      }
                      onChange={
                        handleInputChange
                      }
                      required
                    >
                      <option value="">
                        Select
                        Category
                      </option>

                      {categories.map(
                        (
                          category
                        ) => (
                          <option
                            key={
                              category
                            }
                            value={
                              category
                            }
                          >
                            {
                              category
                            }
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-semibold">
                      Stock
                    </label>

                    <input
                      type="number"
                      name="stockQuantity"
                      className="form-control"
                      value={
                        product.stockQuantity
                      }
                      onChange={
                        handleInputChange
                      }
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Release Date
                    </label>

                    <input
                      type="date"
                      name="releaseDate"
                      className="form-control"
                      value={
                        product.releaseDate
                      }
                      onChange={
                        handleInputChange
                      }
                      required
                    />
                  </div>

                  <div className="col-md-6 d-flex align-items-center">
                    <div className="form-check mt-4">

                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="productAvailable"
                        checked={
                          product.productAvailable
                        }
                        onChange={
                          handleInputChange
                        }
                      />

                      <label className="form-check-label">
                        Product
                        Available
                      </label>

                    </div>
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold">
                      Product Image
                    </label>

                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={
                        handleImageChange
                      }
                      required
                    />
                  </div>

                  <div className="col-12 mt-4">


                <div
                  className="bg-white p-4 mx-auto"
                  style={{
                    borderRadius: "30px",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
                    maxWidth: "650px"
                 }}
            >
              <h4 className="fw-bold mb-4">
                Live Preview
              </h4>

              <div
                className="text-center"
              >
                {imagePreview ? (
                  <img
                    src={
                      imagePreview
                    }
                    alt="preview"
                    className="img-fluid rounded-4"
                    style={{
                      maxHeight:
                        "280px",
                      objectFit:
                        "cover",
                    }}
                  />
                ) : (
                  <div
                    className="d-flex align-items-center justify-content-center bg-light rounded-4"
                    style={{
                      height:
                        "280px",
                    }}
                  >
                    <span className="text-muted">
                      Upload Image
                    </span>
                  </div>
                )}

                <h5 className="mt-4 fw-bold">
                  {product.name ||
                    "Product Name"}
                </h5>

                <p className="text-muted">
                  {product.brand ||
                    "Brand"}
                </p>

                <h4 className="fw-bold">
                  ₹
                  {product.price ||
                    "0"}
                </h4>
              </div>

            </div>

          </div>
                    <button
                        type="submit"
                        className="btn btn-dark btn-lg rounded-pill mx-auto d-block"
                        style={{
                          maxWidth: "650px",
                          width: "100%"
                        }}
                    >
                      
                      {loading
                        ? "Uploading..."
                        : "Add Product"}
                    </button>

                  </div>

                
              </form>
            </div>

          </div>

      

        </div>
      </div>
    </section>
  );
};

export default AddProduct;