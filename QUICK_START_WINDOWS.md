# 🚀 Quick Start Guide - Windows

Complete step-by-step instructions to get the Daakoo backend running with sample data on Windows.

---

## 📋 Prerequisites

- Node.js (v14+) installed
- MongoDB running locally
- Git Bash or Command Prompt
- A code editor (VS Code recommended)

---

## 🎯 Quick Setup (5 minutes)

### Step 1: Open Command Prompt

Press `Win + R`, type `cmd`, press Enter

### Step 2: Navigate to Backend Directory

```cmd
cd C:\Users\Administrator\Documents\coding\Daako-web\backend
```

### Step 3: Install Dependencies (first time only)

```cmd
npm install
```

### Step 4: Seed the Database

```cmd
npm run seed:all
```

**Expected Output:**

```
✅ MongoDB Connected
✅ Database cleaned
✅ Created 6 users
✅ Created 6 categories
✅ Created 20 menu items
✅ Created 5 orders
✅ Created 6 reviews
✅ Created 4 customers
✅ Settings created

✨ Database Seeding Complete!
```

### Step 5: Start Backend Server

```cmd
npm start
```

**Expected Output:**

```
[nodemon] watching extensions: js,json
[nodemon] restarted due to changes
listening on port 3000
MongoDB connected successfully
```

✅ **Backend is now running at http://localhost:3000**

---

## 🎨 Start Frontend (New Command Prompt)

### Step 1: Open Another Command Prompt

Press `Win + R`, type `cmd`, press Enter

### Step 2: Navigate to Client Directory

```cmd
cd C:\Users\Administrator\Documents\coding\Daako-web\client
```

### Step 3: Run Development Server

```cmd
npm run dev
```

**Expected Output:**

```
VITE v7.3.1  ready in 845 ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

✅ **Frontend is now running at http://localhost:5173**

---

## 🧪 Test the APIs

### Option 1: Browser (Simple)

Paste these URLs in your browser to see JSON responses:

1. **All Categories**

   ```
   http://localhost:3000/api/v1/categories
   ```

2. **All Orders**

   ```
   http://localhost:3000/api/v1/orders
   ```

3. **Dashboard KPI**

   ```
   http://localhost:3000/api/v1/analytics/today-kpi
   ```

4. **All Customers**

   ```
   http://localhost:3000/api/v1/customers
   ```

5. **All Reviews**
   ```
   http://localhost:3000/api/v1/reviews
   ```

### Option 2: Postman (Professional)

1. Download and install [Postman](https://www.postman.com/downloads/)
2. Import the Postman collection:
   - File → Import
   - Choose: `backend/postman_collection.json`
   - Click Import
3. All API endpoints ready to test!

---

## 🔐 Login Credentials

### Admin User

```
Email: admin@daakoo.com
Password: admin123
```

### Test Customers

```
john@example.com / john123
sarah@example.com / sarah123
ahmed@example.com / ahmed123
priya@example.com / priya123
```

---

## 🗂️ Project Structure

```
Daako-web/
├── backend/
│   ├── scripts/
│   │   ├── seedDatabase.js (← Seed all data)
│   │   └── seedCategories.js
│   ├── models/
│   ├── services/
│   ├── controller/
│   ├── routes/
│   ├── app.js
│   ├── server.js
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── admin/
│   │   ├── hooks/
│   │   └── API/
│   └── package.json
└── README files
```

---

## 📊 What Gets Seeded

When you run `npm run seed:all`, you get:

✅ **6 Users**

- 1 Admin (admin@daakoo.com)
- 1 Staff (staff@daakoo.com)
- 4 Customers (john, sarah, ahmed, priya)

✅ **6 Menu Categories**

- Starters, Main Course, Bread, Rice, Desserts, Beverages

✅ **20 Menu Items**

- Full Indian menu with prices, spice levels, vegetarian options

✅ **5 Sample Orders**

- Different statuses: Pending, Confirmed, Preparing, Ready, Delivered

✅ **6 Customer Reviews**

- Ratings, comments, approval status

✅ **4 Customer Profiles**

- With purchase history and spending data

✅ **Restaurant Settings**

- Operating hours, delivery settings, notifications

---

## 🔄 Reset Database

To clear everything and start fresh:

```cmd
npm run seed:all
```

(All old data is automatically deleted)

---

## ⚠️ Common Issues & Fixes

### Issue: "Cannot connect to MongoDB"

**Fix:**

```cmd
REM Make sure MongoDB is running
REM Windows: Services → Look for MongoDB Server
```

### Issue: "npm command not found"

**Fix:**

```cmd
REM Install Node.js from: https://nodejs.org/
REM Restart Command Prompt after installation
```

### Issue: "Port 3000 already in use"

**Fix:**

```cmd
REM Find process using port 3000
netstat -ano | findstr :3000

REM Kill the process (replace PID with actual number)
taskkill /PID <PID> /F
```

### Issue: Port 5173 already in use

**Fix:**

```cmd
REM Change port in client
npm run dev -- --port 5174
```

---

## 🎯 Frontend Features to Test

After starting both backend and frontend:

✅ **Dashboard Page**

- Real KPI data
- Revenue charts
- Order status breakdown
- Recent orders

✅ **Orders Page**

- Filter by status/type/date
- Search functionality
- Status updates
- Pagination

✅ **Categories Page**

- Add new category
- Edit existing
- Delete category
- Item count

✅ **Reviews Page**

- Approve/reject reviews
- View ratings
- Statistics
- Moderation

✅ **Customers Page**

- View all customers
- Search function
- Top customers
- Statistics

✅ **Analytics Page**

- Revenue trends
- Popular dishes
- Order distribution
- Monthly stats

✅ **Settings Page**

- Edit restaurant info
- Update operating hours
- Order preferences
- Notification settings

---

## 📱 Login Flow

1. Go to http://localhost:5173
2. Click "Admin" or "Login"
3. Enter credentials:
   - Email: admin@daakoo.com
   - Password: admin123
4. Click Login
5. You'll be redirected to the admin dashboard

---

## 🔗 Useful URLs

| Service        | URL                          | Purpose          |
| -------------- | ---------------------------- | ---------------- |
| Frontend Home  | http://localhost:5173        | Customer website |
| Frontend Admin | http://localhost:5173/admin  | Admin dashboard  |
| Backend API    | http://localhost:3000/api/v1 | API endpoints    |
| MongoDB        | localhost:27017              | Database         |

---

## 📚 Sample API Calls (Copy & Paste)

### Get All Orders

```
GET http://localhost:3000/api/v1/orders
```

### Get Specific Order

```
GET http://localhost:3000/api/v1/orders/{orderId}
```

### Get Analytics Data

```
GET http://localhost:3000/api/v1/analytics/today-kpi
GET http://localhost:3000/api/v1/analytics/revenue?period=week
```

### Create Order (POST)

```
POST http://localhost:3000/api/v1/orders
Content-Type: application/json

{
  "userId": "user_id_here",
  "items": [
    {
      "menuId": "menu_id_here",
      "quantity": 1,
      "price": 13.50,
      "name": "Chicken Tikka Masala"
    }
  ],
  "totalAmount": 13.50,
  "type": "delivery"
}
```

---

## 🎓 Learning Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [React Hooks](https://react.dev/reference/react)
- [Axios Documentation](https://axios-http.com/)

---

## ✅ Verification Checklist

After setup, verify:

- [ ] MongoDB is running
- [ ] Backend starts without errors
- [ ] Frontend loads at http://localhost:5173
- [ ] Can login with admin@daakoo.com
- [ ] Dashboard loads with KPI data
- [ ] Orders page shows 5 sample orders
- [ ] API endpoints return data in browser
- [ ] Postman imports successfully

---

## 🆘 Need Help?

1. Check error messages in Command Prompt
2. Review logs in browser console (F12)
3. Verify MongoDB is running
4. Try resetting with `npm run seed:all`
5. Restart both servers

---

## 📞 Next Steps

1. ✅ Backend seeded and running
2. ✅ Frontend running
3. 📖 Review [ADMIN_API_SETUP.md](ADMIN_API_SETUP.md) for API details
4. 📋 Check [SAMPLE_DATA_REFERENCE.md](SAMPLE_DATA_REFERENCE.md) for all test data
5. 🧪 Start testing features!

Enjoy! 🎉
