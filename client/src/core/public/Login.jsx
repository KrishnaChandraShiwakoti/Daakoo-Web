import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../../API/Auth";
import "../../styles/auth.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState(location.state?.message || "");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setIsSubmitting(true);

    try {
      const data = await loginUser(formData);

      if (!data.refreshJWT) {
        setErrorMsg(data.message || "Invalid email or password.");
        return;
      }

      localStorage.setItem("daakooToken", data.refreshJWT);
      localStorage.setItem("daakooUser", JSON.stringify(data));
      navigate("/", { replace: true });
    } catch (error) {
      setErrorMsg(
        error?.response?.data?.message || "Unable to login right now. Try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-shell">
        <div className="auth-brand-panel">
          <p className="auth-kicker">Welcome Back</p>
          <h1>
            Sign in to continue your <span>Daakoo</span> experience.
          </h1>
          <p>
            Track orders, save your favorite dishes, and checkout faster with
            your account.
          </p>
          <Link to="/register" className="auth-secondary-link">
            New here? Create an account
          </Link>
        </div>

        <form className="auth-card" onSubmit={handleSubmit}>
          <h2>Login</h2>

          {successMsg ? <p className="auth-message success">{successMsg}</p> : null}
          {errorMsg ? <p className="auth-message error">{errorMsg}</p> : null}

          <label>
            Email Address
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>

          <div className="auth-helper-row">
            <label className="auth-checkbox">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>

          <p className="auth-switch-text">
            Don&apos;t have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </section>
    </main>
  );
};

export default Login;
