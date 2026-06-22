import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imageChanged, setImageChanged] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const [updateProduct, setUpdateProduct] = useState({
    id: null,
    name: "",
    description: "",
    brand: "",
    price: "",
    category: "",
    releaseDate: "",
    productAvailable: true,
    stockQuantity: "",
  });

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/product/${id}`
      );

      setUpdateProduct(response.data);

      const imageResponse = await axios.get(
        `${baseUrl}/api/product/${id}/image`,
        {
          responseType: "blob",
        }
      );

      const imageFile = new File(
        [imageResponse.data],
        response.data.imageName,
        {
          type: imageResponse.data.type,
        }
      );

      setImage(imageFile);

      setPreviewImage(
        URL.createObjectURL(imageResponse.data)
      );
    } catch (error) {
      console.log(error);
      toast.error("Failed to load product");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUpdateProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckbox = (e) => {
    setUpdateProduct((prev) => ({
      ...prev,
      productAvailable: e.target.checked,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setImageChanged(true);

    const reader = new FileReader();

    reader.onload = (event) => {
      setPreviewImage(event.target.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      if (imageChanged && image) {
        formData.append(
          "imageFile",
          image
        );
      } else {
        formData.append(
          "imageFile",
          null
        );
      }

      formData.append(
        "product",
        new Blob(
          [
            JSON.stringify(
              updateProduct
            ),
          ],
          {
            type:
              "application/json",
          }
        )
      );

      await axios.put(
        `${baseUrl}/api/product/${id}`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      toast.success(
        "Product Updated Successfully"
      );

      navigate("/");
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed To Update Product"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!updateProduct.id) {
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

        {/* HEADER */}

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
            Update Product
          </h1>

          <p className="text-muted">
            Edit and manage your
            product details
          </p>

        </div>

        <div className="row g-5">

          {/* FORM */}

          <div className="col-lg-8">

            <div
              className="bg-white p-5"
              style={{
                borderRadius: "30px",
                boxShadow:
                  "0 20px 50px rgba(0,0,0,0.08)",
              }}
            >
              <form
                onSubmit={
                  handleSubmit
                }
              >
                <div className="row g-4">

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Product Name
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={
                        updateProduct.name
                      }
                      onChange={
                        handleChange
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
                      className="form-control"
                      name="brand"
                      value={
                        updateProduct.brand
                      }
                      onChange={
                        handleChange
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
                      className="form-control"
                      name="description"
                      value={
                        updateProduct.description
                      }
                      onChange={
                        handleChange
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
                      className="form-control"
                      name="price"
                      value={
                        updateProduct.price
                      }
                      onChange={
                        handleChange
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
                        updateProduct.category
                      }
                      onChange={
                        handleChange
                      }
                      required
                    >
                      <option value="">
                        Select Category
                      </option>

                      <option value="Laptop">
                        Laptop
                      </option>

                      <option value="Headphone">
                        Headphone
                      </option>

                      <option value="Mobile">
                        Mobile
                      </option>

                      <option value="Electronics">
                        Electronics
                      </option>

                      <option value="Toys">
                        Toys
                      </option>

                      <option value="Fashion">
                        Fashion
                      </option>
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-semibold">
                      Stock Quantity
                    </label>

                    <input
                      type="number"
                      className="form-control"
                      name="stockQuantity"
                      value={
                        updateProduct.stockQuantity
                      }
                      onChange={
                        handleChange
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
                      className="form-control"
                      name="releaseDate"
                      value={
                        updateProduct.releaseDate
                          ? updateProduct.releaseDate.slice(
                              0,
                              10
                            )
                          : ""
                      }
                      onChange={
                        handleChange
                      }
                      required
                    />
                  </div>

                  <div className="col-md-6 d-flex align-items-center">

                    <div className="form-check mt-4">

                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={
                          updateProduct.productAvailable
                        }
                        onChange={
                          handleCheckbox
                        }
                      />

                      <label className="form-check-label">
                        Product Available
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
                    />

                    <small className="text-muted">
                      Leave empty to
                      keep current image
                    </small>

                  </div>

                  <div className="col-12 mt-4">

                    <button
                      type="submit"
                      className="btn btn-dark btn-lg w-100 rounded-pill"
                      disabled={
                        loading
                      }
                    >
                      {loading
                        ? "Updating..."
                        : "Update Product"}
                    </button>

                  </div>

                </div>
              </form>
            </div>

          </div>

          {/* PREVIEW */}

          <div className="col-lg-4">

            <div
              className="bg-white p-4"
              style={{
                borderRadius: "30px",
                boxShadow:
                  "0 20px 50px rgba(0,0,0,0.08)",
              }}
            >

              <h4 className="fw-bold mb-4">
                Product Preview
              </h4>

              {previewImage ? (
                <img
                  src={previewImage}
                  alt=""
                  className="img-fluid rounded-4"
                  style={{
                    width: "100%",
                    height: "260px",
                    objectFit:
                      "cover",
                  }}
                />
              ) : (
                <div
                  className="bg-light rounded-4 d-flex align-items-center justify-content-center"
                  style={{
                    height: "260px",
                  }}
                >
                  No Image
                </div>
              )}

              <h5 className="fw-bold mt-4">
                {updateProduct.name}
              </h5>

              <p className="text-muted">
                {updateProduct.brand}
              </p>

              <h4 className="fw-bold">
                ₹
                {updateProduct.price ||
                  0}
              </h4>

              <span
                className={`badge ${
                  updateProduct.productAvailable
                    ? "bg-success"
                    : "bg-danger"
                }`}
              >
                {updateProduct.productAvailable
                  ? "Available"
                  : "Out Of Stock"}
              </span>

              <hr />

              <button
                className="btn btn-outline-dark w-100 rounded-pill"
                onClick={() =>
                  navigate("/")
                }
              >
                Back To Home
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default UpdateProduct;