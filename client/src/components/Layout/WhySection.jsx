import React from "react";
import deliveryVan from "../../assets/delivery-van.svg";
import image from "../../assets/image.png";
import image1 from "../../assets/image-1.png";
import image2 from "../../assets/image-2.png";
import image3 from "../../assets/image-3.png";

const WhySection = () => {
  return (
    <section id="about" className="why-section">
      <div className="why-container">
        <div className="bg-circle circle-top"></div>
        <div className="bg-circle circle-bottom"></div>
        <div className="why-content">
          <div className="why-text">
            <h2>
              Why London Chooses <span>Daakoo</span>
            </h2>

            <p>
              We don't just cook food; we recreate memories of the bustling
              streets of Delhi, tailored for the refined London palate.
            </p>

            <div className="features">
              <div className="feature">
                <div className="icon-box">
                  <span className="material-symbols-outlined">
                    <img src={deliveryVan} alt="" />
                  </span>
                </div>

                <div>
                  <h4>Fast, Local Delivery</h4>
                  <p>Hot and fresh within 30-45 minutes across Zone 1 & 2.</p>
                </div>
              </div>

              <div className="feature">
                <div className="icon-box">
                  <span className="material-symbols-outlined">eco</span>
                </div>

                <div>
                  <h4>Eco-friendly Packaging</h4>
                  <p>
                    Zero-plastic, 100% compostable containers for a greener
                    city.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="image-grid">
          <div className="img-col">
            <img className="img large" src={image2} />

            <img className="img small" src={image1} />
          </div>

          <div className="img-col offset">
            <img className="img small" src={image} />

            <img className="img large" src={image3} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
