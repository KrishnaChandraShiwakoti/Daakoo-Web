# 🎯 Sample Data Quick Reference

## 🚀 Quick Start

Run this command to populate the database with sample data:

```bash
cd backend
npm run seed:all
```

That's it! Your database will be filled with 40+ records across all collections.

---

## 👥 Test Users

Copy these credentials to test different roles:

```javascript
// Admin Access
Email: admin@daakoo.com
Password: admin123
Role: admin

// Staff Access
Email: staff@daakoo.com
Password: staff123
Role: staff

// Customer Access
Email: john@example.com        // john123
Email: sarah@example.com       // sarah123
Email: ahmed@example.com       // ahmed123
Email: priya@example.com       // priya123
```

---

## 🍛 Menu Items (20 Total)

### 🥒 Starters (4)

- Samosa (3 pieces) - £3.50 🌶️
- Onion Bhajia - £4.00 🌶️
- Chicken Pakora - £6.50 🌶️
- Prawn Koliwada - £8.50 🌶️

### 🍲 Main Course (5)

- Chicken Tikka Masala - £13.50 ✨
- Lamb Rogan Josh - £14.50 🌶️
- Butter Chicken - £12.50 ✨
- Chana Masala - £9.50 🌶️ 🥬
- Paneer Tikka Masala - £10.50 ✨ 🥬

### 🍞 Bread (4)

- Naan - £2.50 🥬
- Garlic Naan - £3.00 🥬
- Roti - £1.50 🥬
- Paratha - £3.50 🥬

### 🍚 Rice (4)

- Chicken Biryani - £12.00 🌶️
- Lamb Biryani - £13.50 🌶️
- Vegetable Biryani - £9.50 🌶️ 🥬
- Pilau Rice - £2.50 🥬

### 🍮 Desserts & Drinks (3)

- Gulab Jamun - £3.50 🥬
- Kheer - £3.00 🥬
- Mango Lassi - £3.50 🥬
- Masala Chai - £2.00 🌶️ 🥬

---

## 📦 Sample Orders (5)

### Order 1: Tikka Masala + Naan

**Status:** ✅ Delivered (2 hours ago)
**Type:** Delivery
**Total:** £27.50
**Customer:** John Customer

### Order 2: Chicken Biryani

**Status:** 👤 Confirmed
**Type:** Pickup
**Total:** £12.00
**Customer:** Sarah Khan

### Order 3: Lamb Rogan Josh + Roti

**Status:** 🍳 Preparing
**Type:** Delivery
**Total:** £30.50
**Customer:** Ahmed Hassan

### Order 4: Butter Chicken + Garlic Naan + Mango Lassi

**Status:** ✋ Ready
**Type:** Pickup
**Total:** £18.50
**Customer:** Priya Patel

### Order 5: Samosa + Bhajia

**Status:** ⏳ Pending
**Type:** Delivery
**Total:** £7.50
**Customer:** John Customer

---

## ⭐ Sample Reviews (6)

```
John Customer on Tikka Masala (5★)
"Absolutely delicious! The best Tikka Masala in London."

Sarah Khan on Chicken Biryani (4★)
"Great biryani, rice was fluffy and flavorful."

Ahmed Hassan on Lamb Rogan Josh (5★)
"Lamb Rogan Josh is incredible. Will order again!"

Priya Patel on Paneer Tikka (3★)
"Good paneer but could use more spice"

[Unapproved] John Customer on Naan (2★)
"Naan was a bit dry this time"

Sarah Khan on Garlic Naan (5★)
"Perfect garlic naan! Love it"
```

---

## 👤 Customer Profiles (4)

| Name          | Orders | Total Spent | Member Since |
| ------------- | ------ | ----------- | ------------ |
| John Customer | 5      | £65.50      | 90 days ago  |
| Sarah Khan    | 12     | £184.75     | 180 days ago |
| Ahmed Hassan  | 8      | £125.00     | 120 days ago |
| Priya Patel   | 3      | £45.25      | 30 days ago  |

---

## 📋 Categories (6)

1. **Starters** - Appetizers and starters
2. **Main Course** - Main course dishes
3. **Bread** - Indian bread and naan
4. **Rice** - Rice dishes and biryanis
5. **Desserts** - Sweet treats and desserts
6. **Beverages** - Drinks and beverages

---

## ⚙️ Restaurant Settings

```
🏪 Name: Daakoo London
📍 Address: 123 Brick Lane, London E1 6SB
📞 Phone: 020 7123 4567
📧 Email: info@daakoo.com

🕐 Hours:
   Mon-Thu: 12:00 - 22:00
   Fri-Sat: 12:00 - 23:30
   Sun: 13:00 - 22:00

📦 Order Settings:
   ✅ Delivery Enabled (Min: £10.00, Fee: £2.50)
   ✅ Pickup Enabled
   ✅ Online Ordering Active

🔔 Notifications:
   ✅ New Order Alerts
   ✅ Order Status Email
   ✅ Daily Summary Report
   ✅ Customer Feedback Alert
```

---

## 📊 Data Distribution

```
Users:        6 total (1 admin, 1 staff, 4 customers)
Categories:   6 total
Menu Items:   20 total (Vegetarian: 11, Non-Veg: 9)
Orders:       5 total (various statuses)
Reviews:      6 total (5 approved, 1 pending)
Customers:    4 total
Settings:     1 config document
```

---

## 🧪 Testing Tips

### 1. Check Admin Dashboard

```
Login: admin@daakoo.com / admin123
→ View all orders, analytics, customers
→ Manage categories and settings
```

### 2. Test Customer Flow

```
Login: john@example.com / john123
→ View order history
→ Leave reviews
→ See personal dashboard
```

### 3. Test APIs Directly

```
Get All Orders:
GET http://localhost:3000/api/v1/orders

Get Dashboard KPI:
GET http://localhost:3000/api/v1/analytics/today-kpi

Get Reviews:
GET http://localhost:3000/api/v1/reviews

Get Customers:
GET http://localhost:3000/api/v1/customers
```

---

## 🔄 Reset Data

To clear and reseed everything:

```bash
npm run seed:all
```

---

## 📝 Legend

- 🌶️ = Spicy dish
- 🥬 = Vegetarian
- ✨ = Mild/Creamy
- ✅ = Completed
- 👤 = Awaiting confirmation
- 🍳 = Being prepared
- ✋ = Ready for pickup
- ⏳ = New order

---

For detailed information, see [SEED_DATA_GUIDE.md](SEED_DATA_GUIDE.md)
