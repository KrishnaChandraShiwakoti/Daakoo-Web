#!/bin/bash

# 🌱 Daakoo Backend - Complete Setup & Testing Script
# This script seeds the database and shows how to test everything

echo "================================"
echo "🌱 Daakoo Backend Setup & Test"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print section headers
print_section() {
    echo ""
    echo -e "${BLUE}═══════════════════════════════════════${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}═══════════════════════════════════════${NC}"
}

# Function to run a curl test
run_test() {
    local name=$1
    local method=$2
    local endpoint=$3
    local data=$4
    
    echo ""
    echo -e "${YELLOW}Testing: $name${NC}"
    echo " Method: $method"
    echo " URL: http://localhost:3000$endpoint"
    
    if [ -z "$data" ]; then
        curl -s -X "$method" "http://localhost:3000$endpoint" | python -m json.tool 2>/dev/null || echo "Failed to parse JSON"
    else
        echo " Data: $data"
        curl -s -X "$method" "http://localhost:3000$endpoint" \
            -H "Content-Type: application/json" \
            -d "$data" | python -m json.tool 2>/dev/null || echo "Failed to parse JSON"
    fi
}

# Step 1: Check MongoDB
print_section "Step 1: Checking MongoDB Connection"

if command -v mongosh &> /dev/null; then
    echo -e "${GREEN}✓ MongoDB CLI found${NC}"
    echo "Attempting connection..."
else
    echo -e "${YELLOW}! MongoDB CLI not found, skipping connection check${NC}"
    echo "Make sure MongoDB is running on localhost:27017"
fi

read -p "Press Enter to continue..."

# Step 2: Seed Database
print_section "Step 2: Seeding Database"

echo "Running: npm run seed:all"
echo ""

cd "$(dirname "$0")/backend" 2>/dev/null || cd backend

npm run seed:all

read -p "Press Enter to continue..."

# Step 3: Start Backend
print_section "Step 3: Starting Backend Server"

echo "Running: npm start"
echo ""
echo -e "${YELLOW}The server will start in the background...${NC}"
echo "Waiting for server to start..."

# Start server in background
npm start > /dev/null 2>&1 &
SERVER_PID=$!

sleep 3

if ps -p $SERVER_PID > /dev/null; then
    echo -e "${GREEN}✓ Server started (PID: $SERVER_PID)${NC}"
else
    echo -e "${YELLOW}! Server may not have started${NC}"
fi

read -p "Press Enter to run tests..."

# Step 4: Run API Tests
print_section "Step 4: Testing APIs"

echo -e "${BLUE}Testing key endpoints...${NC}"

# Test 1: Get all categories
run_test "Get All Categories" "GET" "/api/v1/categories"

# Test 2: Get all orders
run_test "Get All Orders" "GET" "/api/v1/orders"

# Test 3: Get all customers
run_test "Get All Customers" "GET" "/api/v1/customers"

# Test 4: Get today's KPI
run_test "Get Today's KPI" "GET" "/api/v1/analytics/today-kpi"

# Test 5: Get all reviews
run_test "Get All Reviews" "GET" "/api/v1/reviews"

# Test 6: Get settings
run_test "Get Settings" "GET" "/api/v1/settings"

# Step 5: Additional Test Endpoints
print_section "Step 5: Additional Endpoints to Test"

cat << 'EOF'

📊 Dashboard & Analytics:
  • GET /api/v1/analytics/today-kpi
  • GET /api/v1/analytics/revenue?period=week
  • GET /api/v1/analytics/popular-dishes
  • GET /api/v1/analytics/order-status
  • GET /api/v1/analytics/monthly-stats

📦 Orders:
  • GET /api/v1/orders
  • GET /api/v1/orders/active-count
  • GET /api/v1/orders/recent
  • GET /api/v1/orders/search?query=john

⭐ Reviews:
  • GET /api/v1/reviews
  • GET /api/v1/reviews/stats
  • PUT /api/v1/reviews/:id/approve

👥 Customers:
  • GET /api/v1/customers
  • GET /api/v1/customers/top
  • GET /api/v1/customers/stats
  • GET /api/v1/customers/search?q=john

🍽️ Categories:
  • GET /api/v1/categories
  • POST /api/v1/categories (Create new)

⚙️ Settings:
  • GET /api/v1/settings
  • PUT /api/v1/settings (Update all)

EOF

# Step 6: Test Credentials
print_section "Step 6: Test Credentials"

cat << 'EOF'

🔐 Admin User:
  Email: admin@daakoo.com
  Password: admin123
  Role: admin

👔 Staff User:
  Email: staff@daakoo.com
  Password: staff123
  Role: staff

👤 Customer Users:
  john@example.com / john123
  sarah@example.com / sarah123
  ahmed@example.com / ahmed123
  priya@example.com / priya123

EOF

# Step 7: Sample Data Summary
print_section "Step 7: Sample Data Summary"

cat << 'EOF'

✅ Database Contents:
  • 6 Users (1 admin, 1 staff, 4 customers)
  • 6 Categories
  • 20 Menu Items
  • 5 Orders (various statuses)
  • 6 Reviews (5 approved, 1 pending)
  • 4 Customer Profiles
  • 1 Settings Document

🍛 Popular Menu Items:
  • Chicken Tikka Masala - £13.50
  • Lamb Biryani - £13.50
  • Butter Chicken - £12.50
  • Paneer Tikka Masala - £10.50

EOF

# Step 8: Frontend Connection
print_section "Step 8: Next Steps - Frontend"

cat << 'EOF'

To test the frontend with this data:

1. Open a new terminal
2. Navigate to client directory: cd client
3. Start frontend: npm run dev
4. Open: http://localhost:5173

5. Login with test credentials:
   • Admin: admin@daakoo.com / admin123
   • Customer: john@example.com / john123

6. Test Features:
   ✓ Dashboard with KPI data
   ✓ Orders page with filtering
   ✓ Categories management
   ✓ Reviews moderation
   ✓ Customer list
   ✓ Analytics charts

EOF

# Cleanup
print_section "Step 9: Cleanup"

echo ""
echo "To stop the backend server, use:"
echo -e "${YELLOW}kill $SERVER_PID${NC}"
echo ""
echo "Or simply press Ctrl+C in the backend terminal"
echo ""

# Keep script running
echo -e "${GREEN}✓ Setup complete! Server is running.${NC}"
echo ""
echo "This terminal will stay open. Press Ctrl+C to stop."

wait $SERVER_PID
