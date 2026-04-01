import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../API/Auth";
import "../../styles/auth.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    contact: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);

    try {
      await registerUser(formData);
      navigate("/login", {
        replace: true,
        state: { message: "Registration successful. Please login." },
      });
    } catch (error) {
      setErrorMsg(
        error?.response?.data?.message ||
          "Unable to register right now. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-shell register-shell">
        <div className="auth-brand-panel">
          <p className="auth-kicker">Join Daakoo</p>
          <h1>
            Create your account and bring home <span>authentic flavor</span>.
          </h1>
          <p>
            Build your profile for quick checkout, order history, and exclusive
            seasonal specials.
          </p>
          <Link to="/login" className="auth-secondary-link">
            Already a member? Sign in
          </Link>
        </div>

        <form className="auth-card" onSubmit={handleSubmit}>
          <h2>Register</h2>

          {errorMsg ? <p className="auth-message error">{errorMsg}</p> : null}

          <div className="auth-two-col">
            <label>
              First Name
              <input
                type="text"
                name="fName"
                placeholder="John"
                value={formData.fName}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Last Name
              <input
                type="text"
                name="lName"
                placeholder="Doe"
                value={formData.lName}
                onChange={handleChange}
                required
              />
            </label>
          </div>

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
            Phone Number
            <input
              type="tel"
              name="contact"
              placeholder="+44 20 7123 4567"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>

          <p className="auth-switch-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </section>
    </main>
  );
};

export default Register;
