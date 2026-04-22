import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  readCartItems,
  removeItemFromCart,
  updateCartItemQty,
} from "../../utils/cart";
import { readStoredSession } from "../../utils/authSession";
import "../../styles/checkout.css";

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

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = readStoredSession();
  const savedDraft = readCheckoutDraft();

  const [cartItems, setCartItems] = useState(() => readCartItems());
  const [orderType, setOrderType] = useState(savedDraft?.orderType || "pickup");
  const [fullName, setFullName] = useState(
    savedDraft?.fullName ||
      `${user?.fName || ""} ${user?.lName || ""}`.trim() ||
      "",
  );
  const [phone, setPhone] = useState(savedDraft?.phone || user?.contact || "");
  const [address, setAddress] = useState(
    savedDraft?.address || user?.addresses?.[0] || "",
  );
  const [notes, setNotes] = useState(savedDraft?.notes || "");
  const [errorMsg, setErrorMsg] = useState("");

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.qty * item.price, 0);
  }, [cartItems]);

  const deliveryFee = orderType === "delivery" ? 3.5 : 0;
  const total = subtotal + deliveryFee;

  const refreshCart = () => {
    setCartItems(readCartItems());
  };

  const handleDecreaseQty = (item) => {
    if (item.qty <= 1) {
      removeItemFromCart(item.id);
      refreshCart();
      return;
    }

    updateCartItemQty(item.id, item.qty - 1);
    refreshCart();
  };

  const handleIncreaseQty = (item) => {
    updateCartItemQty(item.id, item.qty + 1);
    refreshCart();
  };

  const handleProceedToPayment = (event) => {
    event.preventDefault();
    setErrorMsg("");

    if (cartItems.length === 0) {
      setErrorMsg("Your cart is empty. Add dishes before checkout.");
      return;
    }

    if (!fullName.trim() || !phone.trim()) {
      setErrorMsg("Please provide your name and phone number.");
      return;
    }

    if (orderType === "delivery" && !address.trim()) {
      setErrorMsg("Please provide a delivery address.");
      return;
    }

    sessionStorage.setItem(
      CHECKOUT_DRAFT_KEY,
      JSON.stringify({
        orderType,
        fullName: fullName.trim(),
        phone: phone.trim(),
        address: address.trim(),
        notes: notes.trim(),
      }),
    );

    navigate("/payment");
  };

  if (cartItems.length === 0) {
    return (
      <main className="checkout-page">
        <section className="checkout-empty">
          <h1>Your cart is empty</h1>
          <p>Add a few favorites from the menu to continue to checkout.</p>
          <Link to="/menu" className="checkout-main-btn">
            Browse Menu
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <section className="checkout-shell">
        <header className="checkout-header">
          <p>Checkout</p>
          <h1>Review Order Details</h1>
          <span>{cartItems.length} items in your basket</span>
        </header>

        <div className="checkout-grid">
          <article className="checkout-card order-card">
            <h2>Order Items</h2>

            <div className="checkout-item-list">
              {cartItems.map((item) => (
                <div className="checkout-item" key={item.id}>
                  <div>
                    <h3>{item.name}</h3>
                    <p>{formatPrice(item.price)} each</p>
                  </div>

                  <div className="checkout-item-right">
                    <div className="qty-controls">
                      <button
                        type="button"
                        aria-label={`Reduce quantity of ${item.name}`}
                        onClick={() => handleDecreaseQty(item)}>
                        -
                      </button>
                      <span>{item.qty}</span>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${item.name}`}
                        onClick={() => handleIncreaseQty(item)}>
                        +
                      </button>
                    </div>

                    <strong>{formatPrice(item.qty * item.price)}</strong>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <form
            className="checkout-card details-card"
            onSubmit={handleProceedToPayment}>
            <h2>Delivery Details</h2>

            <div className="checkout-type-toggle">
              <button
                type="button"
                className={orderType === "pickup" ? "active" : ""}
                onClick={() => setOrderType("pickup")}>
                Pickup
              </button>
              <button
                type="button"
                className={orderType === "delivery" ? "active" : ""}
                onClick={() => setOrderType("delivery")}>
                Delivery
              </button>
            </div>

            <label>
              Full Name
              <input
                type="text"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="Enter full name"
                required
              />
            </label>

            <label>
              Phone
              <input
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="Enter phone number"
                required
              />
            </label>

            {orderType === "delivery" ? (
              <label>
                Delivery Address
                <textarea
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  placeholder="House number, street, city, postcode"
                  rows={3}
                  required
                />
              </label>
            ) : null}

            <label>
              Notes (optional)
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Anything the kitchen should know?"
                rows={2}
              />
            </label>

            <div className="checkout-summary">
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

            {errorMsg ? <p className="checkout-error">{errorMsg}</p> : null}

            <button type="submit" className="checkout-main-btn">
              Continue To Payment
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Checkout;
