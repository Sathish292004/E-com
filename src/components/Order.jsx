import axios from "axios";
import React, { useEffect, useState } from "react";

const Order = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] =
    useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response =
        await axios.get(
          `${baseUrl}/api/orders`
        );

      setOrders(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat(
      "en-IN",
      {
        style: "currency",
        currency: "INR",
      }
    ).format(amount);
  };

  const calculateTotal = (items) => {
    return items.reduce(
      (total, item) =>
        total + item.totalPrice,
      0
    );
  };

  const getStatusClass = (
    status
  ) => {
    switch (status) {
      case "PLACED":
        return "bg-warning text-dark";

      case "SHIPPED":
        return "bg-primary";

      case "DELIVERED":
        return "bg-success";

      case "CANCELLED":
        return "bg-danger";

      default:
        return "bg-secondary";
    }
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
            Order Dashboard
          </h1>

          <p className="text-muted">
            Manage and monitor all
            customer orders
          </p>

        </div>

        {/* STATS */}

        <div className="row mb-5 g-4">

          <div className="col-md-4">
            <div
              className="bg-white p-4"
              style={{
                borderRadius: "24px",
                boxShadow:
                  "0 15px 40px rgba(0,0,0,.08)",
              }}
            >
              <h6 className="text-muted">
                Total Orders
              </h6>

              <h2 className="fw-bold">
                {orders.length}
              </h2>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="bg-white p-4"
              style={{
                borderRadius: "24px",
                boxShadow:
                  "0 15px 40px rgba(0,0,0,.08)",
              }}
            >
              <h6 className="text-muted">
                Delivered
              </h6>

              <h2 className="fw-bold text-success">
                {
                  orders.filter(
                    (o) =>
                      o.status ===
                      "DELIVERED"
                  ).length
                }
              </h2>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="bg-white p-4"
              style={{
                borderRadius: "24px",
                boxShadow:
                  "0 15px 40px rgba(0,0,0,.08)",
              }}
            >
              <h6 className="text-muted">
                Revenue
              </h6>

              <h2 className="fw-bold">
                {formatCurrency(
                  orders.reduce(
                    (
                      total,
                      order
                    ) =>
                      total +
                      calculateTotal(
                        order.items
                      ),
                    0
                  )
                )}
              </h2>
            </div>
          </div>

        </div>

        {/* NO ORDERS */}

        {orders.length === 0 && (
          <div
            className="bg-white text-center p-5"
            style={{
              borderRadius: "30px",
              boxShadow:
                "0 15px 40px rgba(0,0,0,.08)",
            }}
          >
            <i
              className="bi bi-bag-x"
              style={{
                fontSize: "5rem",
              }}
            ></i>

            <h3 className="mt-3">
              No Orders Found
            </h3>
          </div>
        )}

        {/* ORDER CARDS */}

        {orders.map((order) => (
          <div
            key={order.orderId}
            className="bg-white p-4 mb-4"
            style={{
              borderRadius: "30px",
              boxShadow:
                "0 15px 40px rgba(0,0,0,.08)",
            }}
          >

            <div className="row align-items-center">

              <div className="col-lg-3">

                <small className="text-muted">
                  Order ID
                </small>

                <h5 className="fw-bold">
                  #{order.orderId}
                </h5>

              </div>

              <div className="col-lg-3">

                <small className="text-muted">
                  Customer
                </small>

                <h6 className="fw-bold mb-1">
                  {
                    order.customerName
                  }
                </h6>

                <small>
                  {order.email}
                </small>

              </div>

              <div className="col-lg-2">

                <small className="text-muted">
                  Date
                </small>

                <div>
                  {new Date(
                    order.orderDate
                  ).toLocaleDateString()}
                </div>

              </div>

              <div className="col-lg-2">

                <span
                  className={`badge ${getStatusClass(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>

              </div>

              <div className="col-lg-2 text-end">

                <h5 className="fw-bold">
                  {formatCurrency(
                    calculateTotal(
                      order.items
                    )
                  )}
                </h5>

              </div>

            </div>

            <hr />

            <button
              className="btn btn-dark rounded-pill px-4"
              onClick={() =>
                setExpandedOrder(
                  expandedOrder ===
                    order.orderId
                    ? null
                    : order.orderId
                )
              }
            >
              {expandedOrder ===
              order.orderId
                ? "Hide Details"
                : "View Details"}
            </button>

            {expandedOrder ===
              order.orderId && (
              <div className="mt-4">

                <h5 className="fw-bold mb-4">
                  Ordered Products
                </h5>

                {order.items.map(
                  (
                    item,
                    index
                  ) => (
                    <div
                      key={index}
                      className="d-flex justify-content-between align-items-center bg-light p-3 rounded-4 mb-3"
                    >

                      <div>
                        <h6 className="fw-bold mb-1">
                          {
                            item.productName
                          }
                        </h6>

                        <small className="text-muted">
                          Quantity :
                          {" "}
                          {
                            item.quantity
                          }
                        </small>
                      </div>

                      <div className="fw-bold">
                        {formatCurrency(
                          item.totalPrice
                        )}
                      </div>

                    </div>
                  )
                )}

                <div className="text-end mt-4">

                  <h4 className="fw-bold">
                    Total :
                    {" "}
                    {formatCurrency(
                      calculateTotal(
                        order.items
                      )
                    )}
                  </h4>

                </div>

              </div>
            )}

          </div>
        ))}

      </div>
    </section>
  );
};

export default Order;