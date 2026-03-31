import "../../styles/contact.css";

const locationData = [
  {
    key: "west-end-lane",
    name: "Daakoo West End Lane",
    address: "West End Lane, London",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Daakoo+West+End+Lane+London",
  },
  {
    key: "ladbroke-grove",
    name: "Daakoo Ladbroke Grove",
    address: "Ladbroke Grove, London",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Daakoo+Ladbroke+Grove+London",
  },
];

const Contact = () => {
  return (
    <main className="contact-page">
      <section className="contact-layout">
        <div className="contact-left">
          <h1>Get in Touch</h1>
          <p className="contact-intro">
            Have a question about our modern Indian cuisine or looking to cater
            an event? Reach out and we will respond quickly.
          </p>

          <div className="contact-quick-grid">
            <article className="quick-card">
              <h3>Call Us</h3>
              <p>+44 20 7123 4567</p>
            </article>

            <article className="quick-card">
              <h3>Email Us</h3>
              <p>hello@daakoo.co.uk</p>
            </article>

            <article className="quick-card wide">
              <h3>Visit Our Kitchens</h3>
              <p>West End Lane, London</p>
              <p>Ladbroke Grove, London</p>
            </article>
          </div>

          <form
            className="contact-form"
            onSubmit={(event) => event.preventDefault()}>
            <h2>Send a Message</h2>

            <div className="form-grid">
              <label>
                Full Name
                <input type="text" placeholder="John Doe" />
              </label>

              <label>
                Email Address
                <input type="email" placeholder="john@example.com" />
              </label>
            </div>

            <label>
              Subject
              <input type="text" placeholder="Catering Enquiry" />
            </label>

            <label>
              Message
              <textarea rows="5" placeholder="How can we help you?"></textarea>
            </label>

            <button type="submit">Send Message</button>
          </form>
        </div>

        <aside className="contact-map-panel" aria-label="Map panel">
          <div className="map-overlay-list">
            {locationData.map((location) => (
              <div className="map-overlay-card" key={location.key}>
                <span className="map-pin">11</span>
                <h3>{location.name}</h3>
                <p>{location.address}</p>
                <a href={location.mapsUrl} target="_blank" rel="noreferrer">
                  Get Directions
                </a>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
};

export default Contact;
