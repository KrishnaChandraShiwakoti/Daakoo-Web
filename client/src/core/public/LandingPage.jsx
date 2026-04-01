import React from "react";
import "../../styles/landing.css";
import heroImage from "../../assets/hero-image.png";
import CTA from "../../components/CTA";
import HollowedCTA from "../../components/HollowedCTA";
import WhySection from "../../components/Layout/WhySection";
import { Link } from "react-router-dom";
const LandingPage = () => {
  return (
    <>
      {/* hero Section */}
      <div className="hero">
        <div className="left">
          <p className="title">Gourmet Indian Takeaway · London</p>
          <h1>
            Authentic <span>Indian flavour.</span>
          </h1>
          <p className="description">
            Exprience the rich tradition of Indian spices blended with the
            mordern energy of London. Handcrafted recipes delivered hot to your
            doorstep.
          </p>
          <div className="buttons-container">
            {/* buttons */}
            <Link to="./menu">
            <CTA title={"Order"} />
            </Link>
            <Link to="./about">
            <HollowedCTA title={"Our Story"} />
            </Link>
          </div>
        </div>
        <div className="right">
          <img src={heroImage} alt="" />
        </div>
      </div>
      {/* Why us */}
      <WhySection />
    </>
  );
};

export default LandingPage;
