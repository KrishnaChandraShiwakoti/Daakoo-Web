import "../../styles/categories.css";

const initialCategories = [
  { id: 1, icon: "🥗", name: "Starters", count: "8 items" },
  { id: 2, icon: "🍛", name: "Mains", count: "14 items" },
  { id: 3, icon: "🫓", name: "Breads", count: "6 items" },
  { id: 4, icon: "🍚", name: "Rice & Biryani", count: "5 items" },
  { id: 5, icon: "🍮", name: "Desserts", count: "4 items" },
  { id: 6, icon: "🥤", name: "Drinks", count: "6 items" },
  { id: 7, icon: "🫙", name: "Chutneys & Sides", count: "5 items" },
];

const Categories = () => {
  return (
    <div className="page active" id="page-categories">
      <div className="page-header">
        <div>
          <div className="page-title-lg">Categories</div>
          <div className="page-sub">9 categories, 48 total dishes</div>
        </div>
        <button className="btn btn-primary">+ Add Category</button>
      </div>

      <div className="cat-list">
        {initialCategories.map((cat) => (
          <div className="cat-row" key={cat.id}>
            <div className="cat-icon-wrap">{cat.icon}</div>
            <span className="cat-name">{cat.name}</span>
            <span className="cat-count">{cat.count}</span>
            <button className="btn btn-ghost btn-sm">Edit</button>
            <button
              className="btn btn-sm"
              style={{
                background: "rgba(239,68,68,0.1)",
                color: "#EF4444",
                border: "none",
              }}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
