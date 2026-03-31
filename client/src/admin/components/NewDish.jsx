import { useState } from "react";
import { useForm } from "react-hook-form";
import "../styles/newDish.css";
import { menu } from "../../utils/axios";
import { createDish } from "../../API/Menu";
const NewDish = ({ isOpen, onClose }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  if (!isOpen) {
    return null;
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const formSubmit = async (data) => {
    const formData = new FormData();
    formData.append("DishName", data.DishName);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("isSpicy", String(!!data.isSpicy));
    formData.append("isVegetarian", String(!!data.isVegetarian));
    formData.append("image", data.image[0]);

    try {
      const res = await createDish(formData);
      if (res.status == 201) {
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        <form className="modal-body" onSubmit={handleSubmit(formSubmit)}>
          <div style={{ marginBottom: "20px" }}>
            <div className="upload-area">
              <div className="image-preview">
                {imagePreview ? (
                  <img src={imagePreview} alt="Selected" />
                ) : (
                  <div className="placeholder">
                    <div className="upload-icon">📷</div>
                    <p>No image selected</p>
                  </div>
                )}
              </div>
              <div className="upload-text">
                <input
                  type="file"
                  {...register("image", { required: "image is required" })}
                  onChange={handleImageChange}
                />
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
          {errors.image && <p className="error">{errors.image.message}</p>}

          <div className="form-grid">
            <div className="form-group form-full">
              <label className="form-label">Dish Name *</label>
              <input
                className="form-input"
                type="text"
                placeholder="e.g. Lamb Rogan Josh"
                {...register("DishName", {
                  required: "Dish Name is required ",
                })}
              />
              {errors.DishName && <p>{errors.DishName.message}</p>}
            </div>
            <div className="form-group form-full">
              <label className="form-label">Description</label>
              <textarea
                className="form-textarea"
                placeholder="Describe the dish, key ingredients, cooking style..."
                {...register("description", {
                  required: "Description is required ",
                })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Price (£) *</label>
              <input
                className="form-input"
                type="number"
                placeholder="0.00"
                {...register("price", {
                  required: "price is required ",
                })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Category *</label>
              <select
                className="form-input"
                defaultValue=""
                {...register("category", {
                  required: "Category is required ",
                })}>
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
                    <input type="checkbox" {...register("isVegetarian")} />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="toggle-row">
                  <span className="toggle-label">Spicy</span>
                  <label className="toggle">
                    <input type="checkbox" {...register("isSpicy")} />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" type="submit">
              Save Dish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewDish;
