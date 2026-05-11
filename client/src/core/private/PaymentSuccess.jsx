import { Link } from "react-router-dom";
import "../../styles/auth.css";

const PaymentSuccess = () => {
  return (
    <main className="auth-shell">
      <section className="auth-card">
        <h1>Payment Successful</h1>
        <p>
          Your payment was processed successfully. Thank you for your order!
        </p>
        <Link to="/orders" className="auth-btn">
          View My Orders
        </Link>
        <Link to="/menu" className="auth-link">
          Back to Menu
        </Link>
      </section>
    </main>
  );
};

export default PaymentSuccess;
