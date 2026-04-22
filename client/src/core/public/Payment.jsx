import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

const Payment = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = readStoredSession();
  const cartItems = readCartItems();
  const draft = readCheckoutDraft();

  const [cardName, setCardName] = useState(draft?.fullName || "");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [placedOrderId, setPlacedOrderId] = useState("");

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.qty * item.price, 0);
  }, [cartItems]);

  const orderType = draft?.orderType || "pickup";
  const deliveryFee = orderType === "delivery" ? 3.5 : 0;
  const total = subtotal + deliveryFee;

  const handlePayment = async (event) => {
    event.preventDefault();
    setErrorMsg("");

    if (cartItems.length === 0) {
      setErrorMsg("Your cart is empty. Please return to menu.");
      return;
    }

    if (!draft) {
      setErrorMsg("Please complete the checkout details first.");
      navigate("/checkout", { replace: true });
      return;
    }

    const normalizedCardNumber = cardNumber.replace(/\s+/g, "");
    const normalizedExpiry = expiry.replace(/\s+/g, "");
    const normalizedCvv = cvv.replace(/\s+/g, "");

    if (!cardName.trim()) {
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

    if (!/^\d{3,4}$/.test(normalizedCvv)) {
      setErrorMsg("CVV must be 3 or 4 digits.");
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
        <header className="payment-header">
          <p>Payment</p>
          <h1>Secure Checkout</h1>
          <span>
            {draft?.orderType === "delivery" ? "Delivery" : "Pickup"} order
          </span>
        </header>

        <div className="payment-grid">
          <form className="payment-card" onSubmit={handlePayment}>
            <h2>Card Details</h2>

            <label>
              Card Holder Name
              <input
                type="text"
                value={cardName}
                onChange={(event) => setCardName(event.target.value)}
                placeholder="Name on card"
                required
              />
            </label>

            <label>
              Card Number
              <input
                type="text"
                inputMode="numeric"
                maxLength={19}
                value={cardNumber}
                onChange={(event) => setCardNumber(event.target.value)}
                placeholder="1234 5678 9012 3456"
                required
              />
            </label>

            <div className="payment-row">
              <label>
                Expiry (MM/YY)
                <input
                  type="text"
                  maxLength={5}
                  value={expiry}
                  onChange={(event) => setExpiry(event.target.value)}
                  placeholder="08/28"
                  required
                />
              </label>

              <label>
                CVV
                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={4}
                  value={cvv}
                  onChange={(event) => setCvv(event.target.value)}
                  placeholder="123"
                  required
                />
              </label>
            </div>

            {errorMsg ? <p className="payment-error">{errorMsg}</p> : null}

            <button
              type="submit"
              className="payment-main-btn"
              disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : `Pay ${formatPrice(total)}`}
            </button>
          </form>

          <aside className="payment-summary">
            <h2>Order Summary</h2>

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
                <span>Delivery fee</span>
                <strong>{formatPrice(deliveryFee)}</strong>
              </div>
              <div className="grand-total">
                <span>Total</span>
                <strong>{formatPrice(total)}</strong>
              </div>
            </div>

            <div className="payment-customer-info">
              <p>
                <strong>{draft?.fullName}</strong>
              </p>
              <p>{draft?.phone}</p>
              {draft?.orderType === "delivery" ? (
                <p>{draft?.address}</p>
              ) : (
                <p>Pickup at restaurant</p>
              )}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default Payment;
