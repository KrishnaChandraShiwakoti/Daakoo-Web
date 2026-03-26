# 🌱 Sample Data Setup - Complete!

Your Daakoo backend is now ready with comprehensive sample data!

---

## 📦 What's Been Created

### 1. **Seed Database Script** (`backend/scripts/seedDatabase.js`)

- Populates all collections with realistic data
- Creates 6 users, 6 categories, 20 menu items, 5 orders, 6 reviews, 4 customers, settings
- Runs with: `npm run seed:all`

### 2. **Documentation Files**

- `SEED_DATA_GUIDE.md` - Detailed seeding documentation
- `SAMPLE_DATA_REFERENCE.md` - Quick reference for all sample data
- `QUICK_START_WINDOWS.md` - Windows setup guide
- `SETUP_AND_TEST.sh` - Automated setup script (Linux/Mac)

### 3. **Updated Package.json**

- Added `npm run seed:all` command to easily run seeding

---

## 🚀 Get Started (30 seconds)

### Terminal 1: Seed Database & Start Backend

```bash
cd backend
npm run seed:all
npm start
```

### Terminal 2: Start Frontend

```bash
cd client
npm run dev
```

### Access

- **Frontend**: http://localhost:5173
- **Admin Dashboard**: http://localhost:5173/admin
- **API**: http://localhost:3000/api/v1

---

## 📊 Sample Data Breakdown

| Collection | Count | Details                                                 |
| ---------- | ----- | ------------------------------------------------------- |
| Users      | 6     | 1 admin, 1 staff, 4 customers                           |
| Categories | 6     | Starters, Main, Bread, Rice, Desserts, Drinks           |
| Menu Items | 20    | Full Indian restaurant menu                             |
| Orders     | 5     | Various statuses (pending, preparing, ready, delivered) |
| Reviews    | 6     | Customer ratings & feedback                             |
| Customers  | 4     | Purchase history & statistics                           |
| Settings   | 1     | Restaurant configuration                                |

---

## 🔐 Test Credentials

```
ADMIN:
  admin@daakoo.com / admin123

STAFF:
  staff@daakoo.com / staff123

CUSTOMERS:
  john@example.com / john123
  sarah@example.com / sarah123
  ahmed@example.com / ahmed123
  priya@example.com / priya123
```

---

## 🍛 Sample Menu Items

### Starters ($3.50 - $8.50)

- Samosa, Onion Bhajia, Chicken Pakora, Prawn Koliwada

### Main Courses ($9.50 - $14.50)

- Chicken Tikka Masala, Lamb Rogan Josh, Butter Chicken, Chana Masala, Paneer Tikka

### Bread ($1.50 - $3.50)

- Naan, Garlic Naan, Roti, Paratha

### Rice ($2.50 - $13.50)

- Chicken Biryani, Lamb Biryani, Veg Biryani, Pilau Rice

### Desserts & Drinks ($2.00 - $3.50)

- Gulab Jamun, Kheer, Mango Lassi, Masala Chai

---

## 📝 Order Examples

```
Order #1: Tikka Masala + Naan
Status: Delivered
Total: £27.50
Customer: John Customer

Order #2: Chicken Biryani
Status: Confirmed
Total: £12.00
Customer: Sarah Khan

Order #3: Lamb Rogan Josh + Roti
Status: Preparing
Total: £30.50
Customer: Ahmed Hassan

Order #4: Butter Chicken + Garlic Naan + Mango Lassi
Status: Ready for Pickup
Total: £18.50
Customer: Priya Patel

Order #5: Samosa + Bhajia
Status: Pending
Total: £7.50
Customer: John Customer
```

---

## ⭐ Sample Reviews

```
5★ "Absolutely delicious! Best Tikka Masala in London" - John on Tikka Masala
4★ "Great biryani, rice was fluffy" - Sarah on Chicken Biryani
5★ "Incredible! Will order again!" - Ahmed on Lamb Rogan Josh
3★ "Good paneer but could use more spice" - Priya on Paneer Tikka
5★ "Perfect garlic naan! Love it" - Sarah on Garlic Naan
(Pending) 2★ "Naan was a bit dry" - John on Naan
```

---

## 🎯 What You Can Test

### ✅ Admin Dashboard

- View KPI (orders, revenue, active orders)
- See revenue trends
- Monitor order status distribution
- View recent orders

### ✅ Orders Page

- View all 5 sample orders
- Filter by status (pending, confirmed, preparing, ready, delivered)
- Filter by type (delivery, pickup)
- Search by customer name
- Update order status

### ✅ Categories Page

- View 6 categories
- Create new category
- Edit existing categories
- Delete categories
- See item count per category

### ✅ Reviews Page

- View 6 reviews
- Approve unapproved reviews
- Reject reviews
- See review statistics (average rating, total count)
- Filter by approval status

### ✅ Customers Page

- View 4 customer profiles
- See top customers by spending
- View customer statistics
- Search customers
- Pagination support

### ✅ Analytics Page

- Revenue trends by week/month
- Popular dishes ranking
- Order status breakdown
- Monthly statistics
- Export capabilities

### ✅ Settings Page

- Edit restaurant information
- Update operating hours
- Configure order settings
- Manage notifications
- Update logo

---

## 📊 API Endpoints Ready to Test

### Categories

```
GET    /api/v1/categories
POST   /api/v1/categories
PUT    /api/v1/categories/:id
DELETE /api/v1/categories/:id
```

### Orders

```
GET    /api/v1/orders
GET    /api/v1/orders/:id
POST   /api/v1/orders
PUT    /api/v1/orders/:id/status
GET    /api/v1/orders/search
GET    /api/v1/orders/active-count
GET    /api/v1/orders/recent
```

### Analytics

```
GET    /api/v1/analytics/today-kpi
GET    /api/v1/analytics/revenue?period=week
GET    /api/v1/analytics/popular-dishes
GET    /api/v1/analytics/order-status
GET    /api/v1/analytics/monthly-stats
```

### Reviews

```
GET    /api/v1/reviews
GET    /api/v1/reviews/:id
POST   /api/v1/reviews
PUT    /api/v1/reviews/:id/approve
DELETE /api/v1/reviews/:id
```

### Customers

```
GET    /api/v1/customers
GET    /api/v1/customers/:id
POST   /api/v1/customers
GET    /api/v1/customers/search
GET    /api/v1/customers/top
```

### Settings

```
GET    /api/v1/settings
PUT    /api/v1/settings
PUT    /api/v1/settings/restaurant-info
PUT    /api/v1/settings/operating-hours
PUT    /api/v1/settings/order-settings
PUT    /api/v1/settings/notifications
```

---

## 🧪 Testing with Postman

1. Import `backend/postman_collection.json` into Postman
2. All 40+ API endpoints are included
3. Sample test data pre-filled
4. Ready to run immediately

---

## 📂 File Locations

```
backend/
  └── scripts/
      └── seedDatabase.js .................. Main seed script

Documentation:
  ├── SEED_DATA_GUIDE.md .................. Detailed guide
  ├── SAMPLE_DATA_REFERENCE.md ........... Quick reference
  ├── QUICK_START_WINDOWS.md ............. Windows setup
  └── SETUP_AND_TEST.sh .................. Auto setup script

Configuration:
  └── backend/package.json ............... Added "seed:all" command
```

---

## ⚡ Quick Commands

```bash
# Seed data (clears old data, creates new)
npm run seed:all

# Start backend server
npm start

# Start frontend
npm run dev

# Reset database
npm run seed:all

# Install dependencies (if needed)
npm install
```

---

## 🔄 Data Flow

```
Frontend (React)
    ↓
    → API Requests (Axios)
    ↓
Backend (Express)
    ↓
    → Service Layer (Business Logic)
    ↓
    → Controllers (Request Handling)
    ↓
    → Models (MongoDB)
    ↓
Seeded Data (20+ records)
```

---

## ✨ Features Working Out of the Box

✅ Complete CRUD for Categories
✅ Order management with status tracking
✅ Customer profile management
✅ Review moderation workflow
✅ Analytics & KPI calculations
✅ Restaurant settings configuration
✅ Real-time data binding
✅ Error handling
✅ Loading states
✅ Search & filtering
✅ Pagination
✅ Responsive design

---

## 🎓 Recommended Next Steps

1. **Run the seed script**

   ```bash
   npm run seed:all
   ```

2. **Start the backend**

   ```bash
   npm start
   ```

3. **Start the frontend** (new terminal)

   ```bash
   npm run dev
   ```

4. **Test in browser**
   - Go to http://localhost:5173
   - Login with admin@daakoo.com / admin123
   - Explore the admin dashboard

5. **Test APIs** (Postman or browser)
   - Import postman collection
   - Or visit http://localhost:3000/api/v1/orders in browser

6. **Experiment**
   - Create new categories
   - Filter orders
   - Approve reviews
   - Update settings

---

## 📋 Verification Checklist

After running seed:

- [ ] Seed script completed without errors
- [ ] Backend server starts on port 3000
- [ ] Frontend loads at http://localhost:5173
- [ ] Can login with admin credentials
- [ ] Dashboard shows KPI data
- [ ] Orders page displays all 5 orders
- [ ] Categories page shows 6 categories
- [ ] Browser API calls return data
- [ ] Postman collection imports successfully
- [ ] All admin pages load with real data

---

## 🎉 Ready to Go!

Your complete Daakoo backend with sample data is ready for:

- ✅ Development testing
- ✅ Feature demonstration
- ✅ Admin panel testing
- ✅ API validation
- ✅ Frontend integration

**Start with:** `npm run seed:all` && `npm start`

Happy coding! 🚀

---

For detailed information:

- See [SEED_DATA_GUIDE.md](SEED_DATA_GUIDE.md) for comprehensive guide
- See [SAMPLE_DATA_REFERENCE.md](SAMPLE_DATA_REFERENCE.md) for quick reference
- See [QUICK_START_WINDOWS.md](QUICK_START_WINDOWS.md) for Windows setup
