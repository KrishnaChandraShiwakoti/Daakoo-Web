import "../styles/newDish.css";
const NewDish = ({ isOpen, onClose }) => {
  console.log("is open");

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={`modal-overlay ${isOpen ? "open" : ""}`}
      id="addDishModal"
      onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Add New Dish</span>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="modal-body">
          <div style={{ marginBottom: "20px" }}>
            <div className="upload-area">
              <div className="upload-icon">📷</div>
              <div className="upload-text">
                <input type="file" />
                {/* Drop image here or <span>browse files</span> */}
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "var(--text-light)",
                  marginTop: "4px",
                }}>
                PNG, JPG up to 5MB
              </div>
            </div>
          </div>
          <div className="form-grid">
            <div className="form-group form-full">
              <label className="form-label">Dish Name *</label>
              <input
                className="form-input"
                type="text"
                placeholder="e.g. Lamb Rogan Josh"
              />
            </div>
            <div className="form-group form-full">
              <label className="form-label">Description</label>
              <textarea
                className="form-textarea"
                placeholder="Describe the dish, key ingredients, cooking style..."
              />
            </div>
            <div className="form-group">
              <label className="form-label">Price (£) *</label>
              <input className="form-input" type="number" placeholder="0.00" />
            </div>
            <div className="form-group">
              <label className="form-label">Category *</label>
              <select className="form-input" defaultValue="">
                <option value="">Select category...</option>
                <option>Starters</option>
                <option>Mains</option>
                <option>Breads</option>
                <option>Rice & Biryani</option>
                <option>Desserts</option>
                <option>Drinks</option>
                <option>Chutneys & Sides</option>
              </select>
            </div>
            <div className="form-group" style={{ gridColumn: "1/-1" }}>
              <label className="form-label" style={{ marginBottom: "4px" }}>
                Dietary & Spice
              </label>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}>
                <div className="toggle-row">
                  <span className="toggle-label">Vegetarian</span>
                  <label className="toggle">
                    <input type="checkbox" />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="toggle-row">
                  <span className="toggle-label">Spicy</span>
                  <label className="toggle">
                    <input type="checkbox" />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary">Save Dish</button>
        </div>
      </div>
    </div>
  );
};

export default NewDish;
