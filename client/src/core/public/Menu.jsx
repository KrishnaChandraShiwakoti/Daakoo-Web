import { useEffect, useMemo, useState } from "react";
import { getAllDishes } from "../../API/Menu";
import { getAllCategories } from "../../API/Categories";
import "../../styles/menuPage.css";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "vegetarian", label: "Vegetarian" },
  { key: "spicy", label: "Spicy" },
];

const formatPrice = (price) => {
  const value = Number(price || 0);
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(value);
};

const resolveImageSrc = (path) => {
  if (!path) {
    return "";
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `http://localhost:3000${path}`;
};

const normalizeCategory = (value) => {
  if (!value || typeof value !== "string") {
    return "Uncategorized";
  }

  return value.trim();
};

const Menu = () => {
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMenu = async () => {
      try {
        setLoading(true);
        setError("");

        const [menuData, categoryData] = await Promise.all([
          getAllDishes(),
          getAllCategories(),
        ]);

        setDishes(Array.isArray(menuData) ? menuData : []);
        setCategories(Array.isArray(categoryData) ? categoryData : []);
      } catch (apiError) {
        setError("We could not load the menu right now. Please try again.");
        console.error("Failed to load menu page data:", apiError);
      } finally {
        setLoading(false);
      }
    };

    loadMenu();
  }, []);

  const normalizedCategories = useMemo(() => {
    const fromApi = categories.map((category) =>
      normalizeCategory(category?.name),
    );
    const fromDishes = dishes.map((dish) => normalizeCategory(dish?.category));

    const unique = Array.from(
      new Set([...fromApi, ...fromDishes].filter(Boolean)),
    );
    return unique;
  }, [categories, dishes]);

  const filteredDishes = useMemo(() => {
    return dishes.filter((dish) => {
      const dishCategory = normalizeCategory(dish?.category);
      const categoryMatch =
        activeCategory === "all" || dishCategory === activeCategory;

      if (!categoryMatch) {
        return false;
      }

      if (activeFilter === "vegetarian") {
        return Boolean(dish?.isVegetarian);
      }

      if (activeFilter === "spicy") {
        return Boolean(dish?.isSpicy);
      }

      return true;
    });
  }, [activeCategory, activeFilter, dishes]);

  const groupedDishes = useMemo(() => {
    return filteredDishes.reduce((groups, dish) => {
      const group = normalizeCategory(dish?.category);

      if (!groups[group]) {
        groups[group] = [];
      }

      groups[group].push(dish);
      return groups;
    }, {});
  }, [filteredDishes]);

  return (
    <section className="menu-page">
      <div className="menu-shell">
        <div className="menu-sidebar">
          <h3>Categories</h3>
          <p className="menu-sidebar-label">LONDON TAKEOUT</p>

          <button
            type="button"
            className={`menu-category-btn ${activeCategory === "all" ? "active" : ""}`}
            onClick={() => setActiveCategory("all")}>
            All Dishes
          </button>

          {normalizedCategories.map((categoryName) => (
            <button
              key={categoryName}
              type="button"
              className={`menu-category-btn ${activeCategory === categoryName ? "active" : ""}`}
              onClick={() => setActiveCategory(categoryName)}>
              {categoryName}
            </button>
          ))}

          <div className="menu-filter-group">
            <h4>Filters</h4>
            <div className="menu-filter-buttons">
              {FILTERS.map((filter) => (
                <button
                  key={filter.key}
                  type="button"
                  className={`menu-filter-btn ${activeFilter === filter.key ? "active" : ""}`}
                  onClick={() => setActiveFilter(filter.key)}>
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="menu-content">
          <h1>Our Menu</h1>
          <p className="menu-subtitle">
            Experience the bold flavors and authentic spices of modern Indian
            cuisine, prepared fresh in the heart of London.
          </p>

          {loading && <p className="menu-feedback">Loading menu...</p>}
          {error && !loading && <p className="menu-feedback error">{error}</p>}

          {!loading && !error && filteredDishes.length === 0 && (
            <p className="menu-feedback">
              No dishes match the selected filters.
            </p>
          )}

          {!loading &&
            !error &&
            Object.entries(groupedDishes).map(([groupName, items]) => (
              <section className="menu-section" key={groupName}>
                <h2>{groupName}</h2>

                <div className="menu-grid">
                  {items.map((dish) => (
                    <article className="dish-card" key={dish.id}>
                      {resolveImageSrc(dish.images) ? (
                        <img
                          src={resolveImageSrc(dish.images)}
                          alt={dish.name}
                          className="dish-image"
                        />
                      ) : (
                        <div className="dish-image dish-image-fallback">
                          {dish.name}
                        </div>
                      )}

                      <div className="dish-body">
                        <div className="dish-title-row">
                          <h3>{dish.name}</h3>
                          <div className="dish-tags">
                            {dish.isVegetarian && (
                              <span className="tag">Veg</span>
                            )}
                            {dish.isSpicy && (
                              <span className="tag hot">Spicy</span>
                            )}
                          </div>
                        </div>

                        <p>{dish.description}</p>

                        <div className="dish-bottom-row">
                          <strong>{formatPrice(dish.price)}</strong>
                          <button type="button">+ Add</button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
