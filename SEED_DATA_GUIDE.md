# 🌱 Database Seeding Guide

This guide explains how to populate your Daakoo backend database with sample data for development and testing.

---

## 📋 What Gets Seeded

The comprehensive seed script (`seedDatabase.js`) populates all collections with realistic sample data:

### 1. **Users (6 Total)**

- 1 Admin user
- 1 Staff user
- 4 Regular customers

**Test Credentials:**

```
Admin:  admin@daakoo.com / admin123
Staff:  staff@daakoo.com / staff123
User:   john@example.com / john123
        sarah@example.com / sarah123
        ahmed@example.com / ahmed123
        priya@example.com / priya123
```

### 2. **Menu Categories (6 Total)**

- Starters
- Main Course
- Bread
- Rice
- Desserts
- Beverages

### 3. **Menu Items (20 Total)**

- 4 Starter dishes (Samosa, Bhajia, Chicken Pakora, Prawn Koliwada)
- 5 Main courses (Tikka Masala, Rogan Josh, Butter Chicken, Chana Masala, Paneer Tikka)
- 4 Bread items (Naan, Garlic Naan, Roti, Paratha)
- 4 Rice dishes (Chicken Biryani, Lamb Biryani, Veg Biryani, Pilau Rice)
- 2 Desserts (Gulab Jamun, Kheer)
- 2 Beverages (Mango Lassi, Masala Chai)

### 4. **Orders (5 Total)**

Different statuses for testing:

- 1 Delivered order
- 1 Confirmed order
- 1 Preparing order
- 1 Ready order
- 1 Pending order

**Order Details:**

- Mix of delivery and pickup orders
- Real timestamps
- Estimated and actual delivery times
- Special notes and instructions

### 5. **Reviews (6 Total)**

- Customer ratings (1-5 stars)
- Mix of approved and unapproved reviews
- Realistic comments
- Linked to users and dishes

### 6. **Customers (4 Total)**

- Customer profiles with:
  - Purchase history
  - Total spending
  - Member since date
  - Contact information

### 7. **Settings (1)**

Restaurant configuration including:

- Restaurant info (name, address, phone, email)
- Operating hours (Mon-Sun)
- Order settings (delivery/pickup/online ordering)
- Notification preferences
- Logo URL

---

## 🚀 How to Use

### Option 1: Seed All Data (Recommended)

```bash
cd backend
npm run seed:all
```

This will:

1. Connect to MongoDB
2. Clear existing data
3. Create all sample data
4. Display a summary

**Expected Output:**

```
✅ MongoDB Connected
🗑️ Clearing existing data...
✅ Database cleaned

📝 Seeding Users...
✅ Created 6 users

📝 Seeding Categories...
✅ Created 6 categories

📝 Seeding Menu Items...
✅ Created 20 menu items

📝 Seeding Orders...
✅ Created 5 orders

📝 Seeding Reviews...
✅ Created 6 reviews

📝 Seeding Customers...
✅ Created 4 customers

📝 Seeding Settings...
✅ Settings created

✨ Database Seeding Complete!

📊 Summary:
   • Users: 6
   • Categories: 6
   • Menu Items: 20
   • Orders: 5
   • Reviews: 6
   • Customers: 4
   • Settings: 1

📝 Test Credentials:
   Admin: admin@daakoo.com / admin123
   Staff: staff@daakoo.com / staff123
   User: john@example.com / john123
```

### Option 2: Seed Only Categories

```bash
cd backend
npm run seed:categories
```

---

## 🔧 Configuration

The seed script uses your MongoDB connection URL from `.env`:

```env
MONGODB_URL=mongodb://localhost:27017/daakoo
```

If `MONGODB_URL` is not set, it defaults to `mongodb://localhost:27017/daakoo`

---

## 📊 Sample Data Details

### Users

| Email             | Password | Role  | Contact       |
| ----------------- | -------- | ----- | ------------- |
| admin@daakoo.com  | admin123 | admin | 020 7123 4567 |
| staff@daakoo.com  | staff123 | staff | 020 7123 4568 |
| john@example.com  | john123  | user  | 077 1234 5678 |
| sarah@example.com | sarah123 | user  | 077 1234 5679 |
| ahmed@example.com | ahmed123 | user  | 077 1234 5680 |
| priya@example.com | priya123 | user  | 077 1234 5681 |

### Menu Sample Prices

- Starters: £3.50 - £8.50
- Main Courses: £9.50 - £14.50
- Bread: £1.50 - £3.50
- Rice: £2.50 - £13.50
- Desserts: £3.00 - £3.50
- Beverages: £2.00 - £3.50

### Order Status Distribution

- **Delivered**: 1 (completed orders)
- **Confirmed**: 1 (ready to prepare)
- **Preparing**: 1 (kitchen in progress)
- **Ready**: 1 (waiting for pickup)
- **Pending**: 1 (awaiting confirmation)

---

## 🧪 Testing with Postman

After seeding, you can test the APIs:

1. **Get All Orders:**

   ```
   GET http://localhost:3000/api/v1/orders
   ```

2. **Get Today's KPI:**

   ```
   GET http://localhost:3000/api/v1/analytics/today-kpi
   ```

3. **Get All Reviews:**

   ```
   GET http://localhost:3000/api/v1/reviews
   ```

4. **Get Customers:**

   ```
   GET http://localhost:3000/api/v1/customers
   ```

5. **Get Settings:**
   ```
   GET http://localhost:3000/api/v1/settings
   ```

---

## ⚠️ Important Notes

- **Data Persistence**: Running `seed:all` will **DELETE ALL EXISTING DATA**.
- **Fresh Start**: Perfect for starting development with a clean slate.
- **No Password Recovery**: Passwords are hashed with bcryptjs. Use the credentials above.
- **Timezone**: Timestamps use your system timezone.
- **MongoDB Required**: Make sure MongoDB is running before seeding.

---

## 🐛 Troubleshooting

### Error: "MongoDB Connection Error"

- Ensure MongoDB is running
- Check `MONGODB_URL` in `.env`
- Verify connection string format

### Error: "Cannot find module"

- Run `npm install` in the backend directory
- Check all dependencies are installed

### Error: "ValidationError"

- Models may have changed
- Update seed script to match current model schemas
- Clear MongoDB and reseed

---

## 🔄 Re-Seeding

To reset and reseed the database:

```bash
npm run seed:all
```

This will automatically clear old data and create fresh sample data.

---

## 📝 Example API Responses After Seeding

### Get All Categories

```json
{
  "message": "Success",
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k",
      "name": "Starters",
      "description": "Appetizers and starters"
    }
  ]
}
```

### Get User Orders

```json
{
  "message": "Success",
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k",
      "userId": "65a1b2c3d4e5f6g7h8i9j0l",
      "items": [...],
      "totalAmount": 27.50,
      "status": "delivered",
      "type": "delivery",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

## 🎯 Next Steps

1. ✅ Run seed script
2. ✅ Start backend server
3. ✅ Test APIs with Postman
4. ✅ Connect frontend to APIs
5. ✅ Start development!

---

For more information, see [ADMIN_API_SETUP.md](../ADMIN_API_SETUP.md)
