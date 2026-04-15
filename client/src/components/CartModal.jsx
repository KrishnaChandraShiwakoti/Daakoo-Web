import { Link } from "react-router-dom";
import "../styles/cartModal.css";

const formatPrice = (value) => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(value);
};

const CartModal = ({ isOpen, onClose, cartItems = [] }) => {
  if (!isOpen) {
    return null;
  }

  const subtotal = cartItems.reduce((sum, item) => {
    return sum + item.qty * item.price;
  }, 0);

  return (
    <div className="cart-modal-overlay" role="presentation" onClick={onClose}>
      <aside
        className="cart-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        onClick={(event) => event.stopPropagation()}>
        <header className="cart-modal-header">
          <h2>Your Cart</h2>
          <button type="button" onClick={onClose} aria-label="Close cart">
            x
          </button>
        </header>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <article key={item.id} className="cart-item-row">
                <div>
                  <h3>{item.name}</h3>
                  <p>Qty: {item.qty}</p>
                </div>
                <strong>{formatPrice(item.qty * item.price)}</strong>
              </article>
            ))
          )}
        </div>

        <footer className="cart-modal-footer">
          <div className="cart-total-row">
            <span>Subtotal</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>
          <button type="button" className="cart-checkout-btn">
            Checkout
          </button>
          <p>
            Need an account for faster checkout? <Link to="/login">Login</Link>
          </p>
        </footer>
      </aside>
    </div>
  );
};

export default CartModal;
