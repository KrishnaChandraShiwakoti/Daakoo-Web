import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addMyPaymentMethod, getMyPaymentMethods } from "../../API/Auth";
import { createOrder } from "../../API/Orders";
import { readStoredSession } from "../../utils/authSession";
import { clearCartItems, readCartItems } from "../../utils/cart";
import "../../styles/payment.css";

const CHECKOUT_DRAFT_KEY = "daakooCheckoutDraft";

const formatPrice = (value) => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(Number(value || 0));
};

const readCheckoutDraft = () => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = sessionStorage.getItem(CHECKOUT_DRAFT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const getUserId = (user) => {
  return user?._id || user?.id || user?.userId || null;
};

const getMethodId = (method) => {
  return method?.id || method?._id || "";
};

const getMethodLabel = (method) => {
  const brand = (method?.brand || "card").toUpperCase();
  const last4 = method?.last4 || "----";
  return `${brand} .... .... .... ${last4}`;
};

const getMethodExpiry = (method) => {
  const month = method?.expiryMonth || "--";
  const year = method?.expiryYear || "--";
  return `${month}/${year}`;
};

const Payment = () => {
  const navigate = useNavigate();
  const { user, token, isAuthenticated } = readStoredSession();
  const cartItems = readCartItems();
  const draft = readCheckoutDraft();

  const [savedMethods, setSavedMethods] = useState([]);
  const [savedMethodId, setSavedMethodId] = useState("");
  const [isLoadingMethods, setIsLoadingMethods] = useState(true);
  const [showAddMethodForm, setShowAddMethodForm] = useState(false);
  const [newMethod, setNewMethod] = useState({
    cardHolderName: draft?.fullName || "",
    cardNumber: "",
    expiry: "",
  });
  const [isAddingMethod, setIsAddingMethod] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [placedOrderId, setPlacedOrderId] = useState("");

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.qty * item.price, 0);
  }, [cartItems]);

  const orderType = draft?.orderType || "pickup";
  const pickupLocation = draft?.pickupLocation || "";
  const deliveryFee = orderType === "delivery" ? 3.5 : 0;
  const total = subtotal + deliveryFee;

  useEffect(() => {
    const loadMethods = async () => {
      if (!isAuthenticated || !token) {
        setIsLoadingMethods(false);
        return;
      }

      try {
        setIsLoadingMethods(true);
        const data = await getMyPaymentMethods(token);
        const methods = Array.isArray(data?.paymentMethods)
          ? data.paymentMethods
          : [];
        setSavedMethods(methods);
        setSavedMethodId((current) => {
          if (
            current &&
            methods.some((method) => getMethodId(method) === current)
          ) {
            return current;
          }

          const defaultMethod = methods.find((method) => method.isDefault);
          return getMethodId(defaultMethod || methods[0]);
        });
      } catch {
        setErrorMsg("Unable to load saved payment methods.");
      } finally {
        setIsLoadingMethods(false);
      }
    };

    loadMethods();
  }, [isAuthenticated, token]);

  const handleNewMethodChange = (event) => {
    const { name, value } = event.target;
    setNewMethod((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddMethod = async () => {
    setErrorMsg("");
    setSuccessMsg("");

    if (!token) {
      navigate("/login", {
        state: {
          message: "Please login to manage your payment methods.",
        },
      });
      return;
    }

    const normalizedCardNumber = newMethod.cardNumber.replace(/\s+/g, "");
    const normalizedExpiry = newMethod.expiry.trim();

    if (!newMethod.cardHolderName.trim()) {
      setErrorMsg("Card holder name is required.");
      return;
    }

    if (!/^\d{16}$/.test(normalizedCardNumber)) {
      setErrorMsg("Card number must be 16 digits.");
      return;
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(normalizedExpiry)) {
      setErrorMsg("Expiry date must be in MM/YY format.");
      return;
    }

    try {
      setIsAddingMethod(true);
      const data = await addMyPaymentMethod(
        {
          cardHolderName: newMethod.cardHolderName.trim(),
          cardNumber: normalizedCardNumber,
          expiry: normalizedExpiry,
        },
        token,
      );
      const createdMethod = data?.paymentMethod;

      if (createdMethod) {
        setSavedMethods((prev) => [...prev, createdMethod]);
        setSavedMethodId(getMethodId(createdMethod));
      }

      setShowAddMethodForm(false);
      setSuccessMsg("Payment method added successfully.");
      setNewMethod({
        cardHolderName: draft?.fullName || "",
        cardNumber: "",
        expiry: "",
      });
    } catch (error) {
      setErrorMsg(
        error?.response?.data?.message || "Unable to add payment method.",
      );
    } finally {
      setIsAddingMethod(false);
    }
  };

  const handlePayment = async (event) => {
    event.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (cartItems.length === 0) {
      setErrorMsg("Your cart is empty. Please return to menu.");
      return;
    }

    if (!draft) {
      setErrorMsg("Please complete the checkout details first.");
      navigate("/checkout", { replace: true });
      return;
    }

    if (savedMethods.length === 0) {
      setErrorMsg("Please add a payment method before placing your order.");
      return;
    }

    if (!savedMethodId) {
      setErrorMsg("Please select a saved payment method.");
      return;
    }

    if (!isAuthenticated) {
      navigate("/login", {
        state: {
          message: "Please login to complete payment and place your order.",
        },
      });
      return;
    }

    const userId = getUserId(user);
    if (!userId) {
      setErrorMsg("Unable to resolve your account. Please login again.");
      return;
    }

    const payload = {
      userId,
      items: cartItems.map((item) => ({
        menuId: item.id,
        quantity: item.qty,
        price: item.price,
        name: item.name,
      })),
      totalAmount: total,
      type: orderType,
      deliveryAddress: orderType === "delivery" ? draft.address || "" : "",
      pickupLocation: orderType === "pickup" ? pickupLocation : "",
      notes: draft?.notes || "",
    };

    try {
      setIsSubmitting(true);
      const order = await createOrder(payload);
      setPlacedOrderId(order?._id || order?.id || "");
      clearCartItems();
      sessionStorage.removeItem(CHECKOUT_DRAFT_KEY);
    } catch (error) {
      setErrorMsg(
        error?.response?.data?.message ||
          "Payment failed. Please check details and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0 && !placedOrderId) {
    return (
      <main className="payment-page">
        <section className="payment-empty">
          <h1>No items ready for payment</h1>
          <p>Your basket is empty. Add dishes and try again.</p>
          <Link to="/menu" className="payment-main-btn">
            Back To Menu
          </Link>
        </section>
      </main>
    );
  }

  if (!draft && !placedOrderId) {
    return (
      <main className="payment-page">
        <section className="payment-empty">
          <h1>Checkout details missing</h1>
          <p>Please complete checkout details before entering payment.</p>
          <Link to="/checkout" className="payment-main-btn">
            Go To Checkout
          </Link>
        </section>
      </main>
    );
  }

  if (placedOrderId) {
    return (
      <main className="payment-page">
        <section className="payment-success">
          <p>Payment Successful</p>
          <h1>Your order has been placed</h1>
          <span>Order ID: #{placedOrderId.slice(-6).toUpperCase()}</span>
          <div className="payment-success-actions">
            <button
              type="button"
              className="payment-main-btn"
              onClick={() => navigate("/orders")}>
              Track My Order
            </button>
            <Link to="/menu" className="payment-ghost-btn">
              Order More
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="payment-page">
      <section className="payment-shell">
        <form className="payment-grid" onSubmit={handlePayment}>
          <section className="payment-panel payment-left">
            <header className="payment-hero">
              <h1>Finalize Your Feast</h1>
              <p>
                Select a payment method to complete your order at The Alchemist.
              </p>
            </header>

            <div className="payment-block">
              <p className="payment-block-title">Saved Methods</p>
              {isLoadingMethods ? (
                <p className="payment-note">Loading saved methods...</p>
              ) : savedMethods.length > 0 ? (
                <div className="saved-methods-grid">
                  {savedMethods.map((method) => {
                    const methodId = getMethodId(method);
                    const isActive = savedMethodId === methodId;
                    return (
                      <button
                        key={methodId}
                        type="button"
                        className={`saved-method-card ${isActive ? "active" : ""}`}
                        onClick={() => setSavedMethodId(methodId)}
                        aria-label={`Use card ending with ${method.last4}`}>
                        <span className="card-chip" />
                        <strong>{getMethodLabel(method)}</strong>
                        <small>EXP: {getMethodExpiry(method)}</small>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="payment-empty-methods">
                  <p>No saved payment methods yet.</p>
                  <button
                    type="button"
                    className="payment-add-method-btn"
                    onClick={() => setShowAddMethodForm((prev) => !prev)}>
                    {showAddMethodForm ? "Cancel" : "Add Payment Method"}
                  </button>
                </div>
              )}

              {showAddMethodForm ? (
                <div className="payment-add-form">
                  <label>
                    Cardholder Name
                    <input
                      type="text"
                      name="cardHolderName"
                      value={newMethod.cardHolderName}
                      onChange={handleNewMethodChange}
                      placeholder="Alexander Vane"
                      required
                    />
                  </label>

                  <label>
                    Card Number
                    <input
                      type="text"
                      name="cardNumber"
                      inputMode="numeric"
                      maxLength={19}
                      value={newMethod.cardNumber}
                      onChange={handleNewMethodChange}
                      placeholder="0000 0000 0000 0000"
                      required
                    />
                  </label>

                  <label>
                    Expiry Date
                    <input
                      type="text"
                      name="expiry"
                      maxLength={5}
                      value={newMethod.expiry}
                      onChange={handleNewMethodChange}
                      placeholder="MM/YY"
                      required
                    />
                  </label>

                  <button
                    type="button"
                    className="payment-add-method-btn"
                    onClick={handleAddMethod}
                    disabled={isAddingMethod}>
                    {isAddingMethod ? "Saving..." : "Save Method"}
                  </button>
                </div>
              ) : null}
            </div>

            {successMsg ? (
              <p className="payment-success-msg">{successMsg}</p>
            ) : null}
            {errorMsg ? <p className="payment-error">{errorMsg}</p> : null}
          </section>

          <aside className="payment-panel payment-summary">
            <p className="payment-summary-title">Order Summary</p>

            <div className="payment-summary-list">
              {cartItems.map((item) => (
                <div className="payment-summary-item" key={item.id}>
                  <p>{item.name}</p>
                  <span>
                    {item.qty} x {formatPrice(item.price)}
                  </span>
                  <strong>{formatPrice(item.qty * item.price)}</strong>
                </div>
              ))}
            </div>

            <div className="payment-totals">
              <div>
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <div>
                <span>Delivery Fee</span>
                <strong>{formatPrice(deliveryFee)}</strong>
              </div>
              <div className="grand-total">
                <span>Total Amount</span>
                <strong>{formatPrice(total)}</strong>
              </div>
            </div>

            <button
              type="submit"
              className="payment-main-btn"
              disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Complete Transaction"}
            </button>

            <div className="payment-customer-info">
              <p>
                <strong>{draft?.fullName}</strong>
              </p>
              <p>{draft?.phone}</p>
              {draft?.orderType === "delivery" ? (
                <p>{draft?.address}</p>
              ) : (
                <p>{pickupLocation || "Pickup at restaurant"}</p>
              )}
            </div>

            <p className="payment-summary-footnote">
              Secure payment processed via encrypted gateway. By paying you
              agree to our terms of service.
            </p>
          </aside>
        </form>
      </section>
    </main>
  );
};

export default Payment;
