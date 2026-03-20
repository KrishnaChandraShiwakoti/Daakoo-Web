import React, { useEffect, useState } from "react";
import "../../styles/menu.css";
import NewDish from "../../components/NewDish";
import { deleteDish, getAllDishes, updateDish } from "../../../API/Menu";

const CATEGORIES = [
  "All",
  "Starters",
  "Mains",
  "Breads",
  "Rice",
  "Desserts",
  "Drinks",
];

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [isAddDishModalOpen, setIsAddDishModalOpen] = useState(false);
  const [Dishes, setDishes] = useState([]);

  useEffect(() => {
    const getDishes = async () => {
      const dish = await getAllDishes();
      setDishes(dish);
    };
    getDishes();
  }, []);
  const handleDelete = async (id) => {
    await deleteDish(id);
    setDishes(Dishes.filter((dish) => dish.id !== id));
  };
  const handleUpdate = async (id, data) => {
    await updateDish(id, data);
    setDishes(Dishes.map((dish) => (dish.id === id ? data : dish)));
  };
  return (
    <div className="page" id="page-menu">
      <div className="page-header">
        <div>
          <div className="page-title-lg">Menu Management</div>
          <div className="page-sub">48 active Dishes across 9 categories</div>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setIsAddDishModalOpen(true)}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add New Dish
        </button>
      </div>

      <div className="filter-bar">
        <div className="filter-search">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9CA3AF"
            strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search Dishes…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="tag-filters">
          {CATEGORIES.map((cat) => (
            <div
              key={cat}
              className={`tag-filter${activeCategory === cat ? " active" : ""}`}
              onClick={() => setActiveCategory(cat)}>
              {cat}
            </div>
          ))}
        </div>
      </div>

      <div className="menu-grid">
        {Dishes.map((dish) => (
          <div className="dish-card" key={dish.id}>
            <div className="dish-img">
              <img src={`http://localhost:3000${dish.images}`} />
              <div className="dish-indicators">
                <div
                  className={`indicator ${dish.veg ? "ind-veg" : "ind-nonveg"}`}>
                  {dish.veg ? "V" : "N"}
                </div>
                {dish.isSpicy && <div className="indicator ind-spicy">🌶</div>}
              </div>
            </div>
            <div className="dish-body">
              <div className="dish-name">{dish.name}</div>
              <div className="dish-cat">{dish.category}</div>
              <div className="dish-footer">
                <span className="dish-price">£{dish.price}</span>
                <div className="dish-actions">
                  <button className="btn btn-ghost btn-sm btn-icon">✏️</button>
                  <button
                    className="btn btn-sm btn-delete"
                    onClick={() => handleDelete(dish.id)}>
                    🗑
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <NewDish
        isOpen={isAddDishModalOpen}
        onClose={() => setIsAddDishModalOpen(false)}
      />
    </div>
  );
};

export default Menu;
