import React from "react";
import "../../styles/landing.css";
import heroImage from "../../assets/hero-image.png";
import CTA from "../../components/CTA";
import HollowedCTA from "../../components/HollowedCTA";
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
            <CTA title={"Order"} />
            <HollowedCTA title={"Our Story"} />
          </div>
        </div>
        <div className="right">
          <img src={heroImage} alt="" />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
