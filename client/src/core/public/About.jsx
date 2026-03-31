import "../../styles/about.css";
import heroImage from "../../assets/hero-image.png";
import image1 from "../../assets/image-1.png";
import image2 from "../../assets/image-2.png";
import image3 from "../../assets/image-3.png";

const principles = [
  {
    title: "London Roots",
    description:
      "Deeply connected to urban energy and culinary diversity in London's food scene.",
  },
  {
    title: "Authentic Spices",
    description:
      "Hand-picked, stone-ground spice blends sourced directly from regional Indian growers.",
  },
  {
    title: "Modern Heat",
    description:
      "Balanced heat levels that respect each ingredient while delivering a memorable kick.",
  },
  {
    title: "Artisanal Cooking",
    description:
      "No mass production. Every batch is prepared with care, pace, and precision.",
  },
];

const About = () => {
  return (
    <main className="about-page">
      <section className="about-hero-wrap">
        <div className="about-hero-card">
          <img
            src={heroImage}
            alt="Spice grinding process"
            className="about-hero-img"
          />
          <div className="about-hero-overlay"></div>

          <div className="about-hero-content">
            <h1>
              The Art of <span>the Spice</span>
            </h1>
            <p>
              From London streets to Indian heat. Discover the craft behind our
              modern Indian kitchen.
            </p>
            <a href="/menu">Explore the Menu</a>
          </div>
        </div>
      </section>

      <section className="about-story">
        <h2>London Roots, Authentic Heat</h2>
        <p>
          Born in the heart of London, Daakoo was founded on a simple belief:
          traditional Indian techniques deserve a modern stage. We blend vibrant
          city energy with time-honored secrets of spice-blending passed down
          through generations.
        </p>
        <p>
          Our kitchen is a laboratory where ancient recipes meet urban
          innovation. We do not just cook Indian food; we translate the spirit
          of Mumbai and Delhi into contemporary London plates.
        </p>
      </section>

      <section className="about-principles">
        <div className="about-principles-intro">
          <p>OUR DNA</p>
          <h3>The Daakoo Difference</h3>
          <span>
            Every dish tells a story of heritage and quality. We prioritize
            authenticity over shortcuts.
          </span>
        </div>

        <div className="about-principles-grid">
          {principles.map((principle) => (
            <article key={principle.title}>
              <h4>{principle.title}</h4>
              <p>{principle.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-gallery">
        <div className="about-gallery-header">
          <h3>Life at Daakoo</h3>
          <p>A glimpse into our kitchen and community.</p>
        </div>

        <div className="about-gallery-grid">
          <img src={image1} alt="Chef plating a dish" className="large" />
          <img src={image2} alt="Spice textures and colors" className="small" />
          <img src={image3} alt="Restaurant interior" className="small" />
          <img
            src={heroImage}
            alt="Fresh naan by the tandoor"
            className="wide"
          />
        </div>
      </section>

      <section className="about-cta">
        <h3>Ready to taste the tradition?</h3>
        <p>
          Join us for a culinary journey that bridges continents and cultures.
        </p>
        <div>
          <a href="/menu" className="light-btn">
            View Menu
          </a>
          <a href="/locations" className="outline-btn">
            Our Locations
          </a>
        </div>
      </section>
    </main>
  );
};

export default About;
