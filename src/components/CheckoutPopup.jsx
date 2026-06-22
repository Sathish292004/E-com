import axios from "axios";
import React, { useState } from "react";
import {
  Modal,
  Form,
  Button,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CheckoutPopup = ({
  show,
  handleClose,
  cartItems,
  totalPrice,
}) => {
  const navigate = useNavigate();

  const baseUrl =
    import.meta.env.VITE_BASE_URL;

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [validated, setValidated] =
    useState(false);

  const [showToast, setShowToast] =
    useState(false);

  const [toastMessage, setToastMessage] =
    useState("");

  const [toastVariant, setToastVariant] =
    useState("success");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const handleConfirm = async (
    event
  ) => {
    event.preventDefault();

    const form =
      event.currentTarget;

    if (
      form.checkValidity() === false
    ) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    setIsSubmitting(true);

    const orderItems =
      cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));

    const data = {
      customerName: name,
      email,
      items: orderItems,
    };

    try {
      await axios.post(
        `${baseUrl}/api/orders/place`,
        data
      );

      setToastVariant("success");

      setToastMessage(
        "Order placed successfully!"
      );

      setShowToast(true);

      localStorage.removeItem(
        "cart"
      );

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error(error);

      setToastVariant("danger");

      setToastMessage(
        "Unable to place order."
      );

      setShowToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Secure Checkout
          </Modal.Title>
        </Modal.Header>

        <Form
          noValidate
          validated={validated}
          onSubmit={
            handleConfirm
          }
        >
          <Modal.Body>

            <div
              className="bg-light p-4 rounded-4 mb-4"
            >
              <h5 className="fw-bold mb-4">
                Order Summary
              </h5>

              {cartItems.map(
                (item) => (
                  <div
                    key={item.id}
                    className="d-flex justify-content-between align-items-center mb-3"
                  >
                    <div>
                      <div className="fw-semibold">
                        {
                          item.name
                        }
                      </div>

                      <small className="text-muted">
                        Qty:
                        {" "}
                        {
                          item.quantity
                        }
                      </small>
                    </div>

                    <strong>
                      ₹
                      {(
                        item.price *
                        item.quantity
                      ).toFixed(
                        2
                      )}
                    </strong>
                  </div>
                )
              )}

              <hr />

              <div className="d-flex justify-content-between">
                <h5>
                  Total
                </h5>

                <h5>
                  ₹
                  {totalPrice.toFixed(
                    2
                  )}
                </h5>
              </div>
            </div>

            <div className="row">

              <div className="col-md-6 mb-3">

                <Form.Label>
                  Full Name
                </Form.Label>

                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                  placeholder="Enter your name"
                  required
                />

                <Form.Control.Feedback type="invalid">
                  Name required
                </Form.Control.Feedback>

              </div>

              <div className="col-md-6 mb-3">

                <Form.Label>
                  Email Address
                </Form.Label>

                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  placeholder="Enter your email"
                  required
                />

                <Form.Control.Feedback type="invalid">
                  Valid email required
                </Form.Control.Feedback>

              </div>

            </div>

          </Modal.Body>

          <Modal.Footer>

            <Button
              variant="light"
              onClick={
                handleClose
              }
            >
              Cancel
            </Button>

            <Button
              variant="dark"
              type="submit"
              disabled={
                isSubmitting
              }
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Processing...
                </>
              ) : (
                "Place Order"
              )}
            </Button>

          </Modal.Footer>
        </Form>
      </Modal>

      <ToastContainer
        position="top-end"
        className="p-3"
      >
        <Toast
          show={showToast}
          onClose={() =>
            setShowToast(false)
          }
          bg={toastVariant}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">
              SK Store
            </strong>
          </Toast.Header>

          <Toast.Body
            className={
              toastVariant ===
              "success"
                ? "text-white"
                : ""
            }
          >
            {toastMessage}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default CheckoutPopup;