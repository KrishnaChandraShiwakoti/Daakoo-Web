import { Link } from "react-router-dom";
import "../../styles/auth.css";

const PaymentCancel = () => {
  return (
    <main className="auth-shell">
      <section className="auth-card">
        <h1>Payment Cancelled</h1>
        <p>
          Your payment was not completed. You can try again or contact support.
        </p>
        <Link to="/checkout" className="auth-btn">
          Retry Payment
        </Link>
        <Link to="/menu" className="auth-link">
          Back to Menu
        </Link>
      </section>
    </main>
  );
};

export default PaymentCancel;
