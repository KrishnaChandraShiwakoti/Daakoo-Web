import React, { useState } from "react";
import "../../styles/menu.css";
import NewDish from "../../components/NewDish";

const CATEGORIES = [
  "All",
  "Starters",
  "Mains",
  "Breads",
  "Rice",
  "Desserts",
  "Drinks",
];

const DISHES = [
  {
    id: 1,
    emoji: "🍖",
    name: "Lamb Rogan Josh",
    cat: "Mains · Lamb",
    price: "£16.00",
    veg: false,
    spicy: true,
  },
  {
    id: 2,
    emoji: "🍗",
    name: "Chicken Tikka Masala",
    cat: "Mains · Chicken",
    price: "£14.50",
    veg: false,
    spicy: false,
  },
  {
    id: 3,
    emoji: "🧆",
    name: "Paneer Tikka",
    cat: "Starters · Vegetarian",
    price: "£11.00",
    veg: true,
    spicy: false,
  },
  {
    id: 4,
    emoji: "🍲",
    name: "Dal Makhani",
    cat: "Mains · Lentils",
    price: "£12.00",
    veg: true,
    spicy: false,
  },
  {
    id: 5,
    emoji: "🫓",
    name: "Garlic Naan",
    cat: "Breads",
    price: "£2.50",
    veg: true,
    spicy: false,
  },
  {
    id: 6,
    emoji: "🍤",
    name: "Prawn Biryani",
    cat: "Rice · Seafood",
    price: "£17.50",
    veg: false,
    spicy: true,
  },
];

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [isAddDishModalOpen, setIsAddDishModalOpen] = useState(false);

  return (
    <div className="page" id="page-menu">
      <div className="page-header">
        <div>
          <div className="page-title-lg">Menu Management</div>
          <div className="page-sub">48 active dishes across 9 categories</div>
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
            placeholder="Search dishes…"
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
        {DISHES.map((dish) => (
          <div className="dish-card" key={dish.id}>
            <div className="dish-img">
              {dish.emoji}
              <div className="dish-indicators">
                <div
                  className={`indicator ${dish.veg ? "ind-veg" : "ind-nonveg"}`}>
                  {dish.veg ? "V" : "N"}
                </div>
                {dish.spicy && <div className="indicator ind-spicy">🌶</div>}
              </div>
            </div>
            <div className="dish-body">
              <div className="dish-name">{dish.name}</div>
              <div className="dish-cat">{dish.cat}</div>
              <div className="dish-footer">
                <span className="dish-price">{dish.price}</span>
                <div className="dish-actions">
                  <button className="btn btn-ghost btn-sm btn-icon">✏️</button>
                  <button className="btn btn-sm btn-delete">🗑</button>
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
