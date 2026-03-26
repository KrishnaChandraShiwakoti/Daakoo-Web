const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

// Import Models
const User = require("../models/users");
const Category = require("../models/category");
const Menu = require("../models/menu");
const Order = require("../models/order");
const Review = require("../models/review");
const Customer = require("../models/customer");
const Settings = require("../models/settings");

// Database Connection
async function connectDB() {
  try {
    const mongoURI =
      process.env.MONGODB_URL || "mongodb://localhost:27017/daako";
    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
}

// Hash Password
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

// Seed Users
async function seedUsers() {
  console.log("\n📝 Seeding Users...");
  await User.deleteMany({});

  const users = [
    {
      fName: "Admin",
      lName: "User",
      email: "admin@daakoo.com",
      password: await hashPassword("admin123"),
      role: "admin",
      contact: "020 7123 4567",
      address: "123 Brick Lane, London E1 6SB",
    },
    {
      fName: "Sheikh",
      lName: "Staff",
      email: "staff@daakoo.com",
      password: await hashPassword("staff123"),
      role: "staff",
      contact: "020 7123 4568",
      address: "123 Brick Lane, London E1 6SB",
    },
    {
      fName: "John",
      lName: "Customer",
      email: "john@example.com",
      password: await hashPassword("john123"),
      role: "user",
      contact: "077 1234 5678",
      address: "10 Old Street, London EC1V 9BL",
    },
    {
      fName: "Sarah",
      lName: "Khan",
      email: "sarah@example.com",
      password: await hashPassword("sarah123"),
      role: "user",
      contact: "077 1234 5679",
      address: "5 Shoreditch High Street, London E1 6PF",
    },
    {
      fName: "Ahmed",
      lName: "Hassan",
      email: "ahmed@example.com",
      password: await hashPassword("ahmed123"),
      role: "user",
      contact: "077 1234 5680",
      address: "15 Commercial Street, London E1 6LP",
    },
    {
      fName: "Priya",
      lName: "Patel",
      email: "priya@example.com",
      password: await hashPassword("priya123"),
      role: "user",
      contact: "077 1234 5681",
      address: "20 Aldgate High Street, London EC3N 1AQ",
    },
  ];

  const createdUsers = await User.insertMany(users);
  console.log(`✅ Created ${createdUsers.length} users`);
  return createdUsers;
}

// Seed Categories
async function seedCategories() {
  console.log("\n📝 Seeding Categories...");
  await Category.deleteMany({});

  const categories = [
    { name: "Starters", description: "Appetizers and starters" },
    { name: "Main Course", description: "Main coursedishes" },
    { name: "Bread", description: "Indian bread and naan" },
    { name: "Rice", description: "Rice dishes and biryanis" },
    { name: "Desserts", description: "Sweet treats and desserts" },
    { name: "Beverages", description: "Drinks and beverages" },
  ];

  const createdCategories = await Category.insertMany(categories);
  console.log(`✅ Created ${createdCategories.length} categories`);
  return createdCategories;
}

// Seed Menu Items
async function seedMenuItems(categories) {
  console.log("\n📝 Seeding Menu Items...");
  await Menu.deleteMany({});

  const menuItems = [
    // Starters
    {
      name: "Samosa (3 pieces)",
      description: "Crispy pastry filled with spiced potatoes and peas",
      price: 3.5,
      isSpicy: true,
      isVegetarian: true,
      category: [categories[0]._id],
    },
    {
      name: "Onion Bhajia",
      description: "Golden fried onion fritters with gram flour",
      price: 4.0,
      isSpicy: true,
      isVegetarian: true,
      category: [categories[0]._id],
    },
    {
      name: "Chicken Pakora",
      description: "Tender chicken coated in spiced gram flour and fried",
      price: 6.5,
      isSpicy: true,
      isVegetarian: false,
      category: [categories[0]._id],
    },
    {
      name: "Prawn Koliwada",
      description: "Marinated king prawns wrapped in crispy coating",
      price: 8.5,
      isSpicy: true,
      isVegetarian: false,
      category: [categories[0]._id],
    },

    // Main Course
    {
      name: "Chicken Tikka Masala",
      description: "Tender chicken in creamy tomato-based curry",
      price: 13.5,
      isSpicy: false,
      isVegetarian: false,
      category: [categories[1]._id],
    },
    {
      name: "Lamb Rogan Josh",
      description: "Lamb cooked in aromatic yogurt and spice sauce",
      price: 14.5,
      isSpicy: true,
      isVegetarian: false,
      category: [categories[1]._id],
    },
    {
      name: "Butter Chicken",
      description: "Tandoori chicken in smooth butter and cream sauce",
      price: 12.5,
      isSpicy: false,
      isVegetarian: false,
      category: [categories[1]._id],
    },
    {
      name: "Chana Masala",
      description: "Chickpeas in aromatic tomato-based sauce",
      price: 9.5,
      isSpicy: true,
      isVegetarian: true,
      category: [categories[1]._id],
    },
    {
      name: "Paneer Tikka Masala",
      description: "Cottage cheese in creamy tomato sauce",
      price: 10.5,
      isSpicy: false,
      isVegetarian: true,
      category: [categories[1]._id],
    },

    // Bread
    {
      name: "Naan",
      description: "Traditional Indian flatbread",
      price: 2.5,
      isSpicy: false,
      isVegetarian: true,
      category: [categories[2]._id],
    },
    {
      name: "Garlic Naan",
      description: "Naan topped with fresh garlic",
      price: 3.0,
      isSpicy: false,
      isVegetarian: true,
      category: [categories[2]._id],
    },
    {
      name: "Roti",
      description: "Whole wheat Indian bread",
      price: 1.5,
      isSpicy: false,
      isVegetarian: true,
      category: [categories[2]._id],
    },
    {
      name: "Paratha",
      description: "Layered Indian bread with butter",
      price: 3.5,
      isSpicy: false,
      isVegetarian: true,
      category: [categories[2]._id],
    },

    // Rice
    {
      name: "Chicken Biryani",
      description: "Fragrant rice cooked with marinated chicken",
      price: 12.0,
      isSpicy: true,
      isVegetarian: false,
      category: [categories[3]._id],
    },
    {
      name: "Lamb Biryani",
      description: "Aromatic rice with slow-cooked lamb",
      price: 13.5,
      isSpicy: true,
      isVegetarian: false,
      category: [categories[3]._id],
    },
    {
      name: "Vegetable Biryani",
      description: "Mixed vegetables in fragrant rice",
      price: 9.5,
      isSpicy: true,
      isVegetarian: true,
      category: [categories[3]._id],
    },
    {
      name: "Pilau Rice",
      description: "Basmati rice with spices and herbs",
      price: 2.5,
      isSpicy: false,
      isVegetarian: true,
      category: [categories[3]._id],
    },

    // Desserts
    {
      name: "Gulab Jamun",
      description: "Milk solid dumplings in sugar syrup",
      price: 3.5,
      isSpicy: false,
      isVegetarian: true,
      category: [categories[4]._id],
    },
    {
      name: "Kheer",
      description: "Rice pudding with cardamom and nuts",
      price: 3.0,
      isSpicy: false,
      isVegetarian: true,
      category: [categories[4]._id],
    },
    {
      name: "Mango Lassi",
      description: "Sweet yogurt drink with mango",
      price: 3.5,
      isSpicy: false,
      isVegetarian: true,
      category: [categories[5]._id],
    },
    {
      name: "Masala Chai",
      description: "Spiced Indian tea",
      price: 2.0,
      isSpicy: true,
      isVegetarian: true,
      category: [categories[5]._id],
    },
  ];

  const createdMenuItems = await Menu.insertMany(menuItems);
  console.log(`✅ Created ${createdMenuItems.length} menu items`);
  return createdMenuItems;
}

// Seed Orders
async function seedOrders(users, menuItems) {
  console.log("\n📝 Seeding Orders...");
  await Order.deleteMany({});

  const now = new Date();
  const orders = [
    {
      userId: users[2]._id,
      items: [
        {
          menuId: menuItems[4]._id,
          quantity: 1,
          price: menuItems[4].price,
          name: menuItems[4].name,
        },
        {
          menuId: menuItems[9]._id,
          quantity: 2,
          price: menuItems[9].price,
          name: menuItems[9].name,
        },
      ],
      totalAmount: menuItems[4].price + menuItems[9].price * 2,
      status: "delivered",
      type: "delivery",
      address: users[2].address,
      notes: "Extra coriander please",
      estimatedTime: new Date(now.getTime() + 30 * 60000),
      actualTime: new Date(now.getTime() - 60 * 60000),
      createdAt: new Date(now.getTime() - 2 * 60 * 60000),
    },
    {
      userId: users[3]._id,
      items: [
        {
          menuId: menuItems[14]._id,
          quantity: 1,
          price: menuItems[14].price,
          name: menuItems[14].name,
        },
      ],
      totalAmount: menuItems[14].price,
      status: "confirmed",
      type: "pickup",
      address: "",
      notes: "Not too spicy",
      estimatedTime: new Date(now.getTime() + 60 * 60000),
      createdAt: new Date(now.getTime() - 10 * 60000),
    },
    {
      userId: users[4]._id,
      items: [
        {
          menuId: menuItems[5]._id,
          quantity: 2,
          price: menuItems[5].price,
          name: menuItems[5].name,
        },
        {
          menuId: menuItems[10]._id,
          quantity: 1,
          price: menuItems[10].price,
          name: menuItems[10].name,
        },
      ],
      totalAmount: menuItems[5].price * 2 + menuItems[10].price,
      status: "preparing",
      type: "delivery",
      address: users[4].address,
      notes: "",
      estimatedTime: new Date(now.getTime() + 45 * 60000),
      createdAt: new Date(now.getTime() - 5 * 60000),
    },
    {
      userId: users[5]._id,
      items: [
        {
          menuId: menuItems[6]._id,
          quantity: 1,
          price: menuItems[6].price,
          name: menuItems[6].name,
        },
        {
          menuId: menuItems[15]._id,
          quantity: 1,
          price: menuItems[15].price,
          name: menuItems[15].name,
        },
        {
          menuId: menuItems[18]._id,
          quantity: 1,
          price: menuItems[18].price,
          name: menuItems[18].name,
        },
      ],
      totalAmount:
        menuItems[6].price + menuItems[15].price + menuItems[18].price,
      status: "ready",
      type: "pickup",
      address: "",
      notes: "Ready after 5pm",
      estimatedTime: new Date(now.getTime() + 120 * 60000),
      createdAt: new Date(now.getTime() - 15 * 60000),
    },
    {
      userId: users[2]._id,
      items: [
        {
          menuId: menuItems[0]._id,
          quantity: 2,
          price: menuItems[0].price,
          name: menuItems[0].name,
        },
        {
          menuId: menuItems[1]._id,
          quantity: 1,
          price: menuItems[1].price,
          name: menuItems[1].name,
        },
      ],
      totalAmount: menuItems[0].price * 2 + menuItems[1].price,
      status: "pending",
      type: "delivery",
      address: users[2].address,
      notes: "No chilli",
      estimatedTime: new Date(now.getTime() + 35 * 60000),
      createdAt: new Date(),
    },
  ];

  const createdOrders = await Order.insertMany(orders);
  console.log(`✅ Created ${createdOrders.length} orders`);
  return createdOrders;
}

// Seed Reviews
async function seedReviews(users, menuItems) {
  console.log("\n📝 Seeding Reviews...");
  await Review.deleteMany({});

  const reviews = [
    {
      userId: users[2]._id,
      dishId: menuItems[4]._id,
      rating: 5,
      comment: "Absolutely delicious! The best Tikka Masala in London.",
      isApproved: true,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
    {
      userId: users[3]._id,
      dishId: menuItems[14]._id,
      rating: 4,
      comment: "Great biryani, rice was fluffy and flavorful.",
      isApproved: true,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
    {
      userId: users[4]._id,
      dishId: menuItems[5]._id,
      rating: 5,
      comment: "Lamb Rogan Josh is incredible. Will order again!",
      isApproved: true,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      userId: users[5]._id,
      dishId: menuItems[8]._id,
      rating: 3,
      comment: "Good paneer but could use more spice",
      isApproved: true,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      userId: users[2]._id,
      dishId: menuItems[12]._id,
      rating: 2,
      comment: "Naan was a bit dry this time",
      isApproved: false,
      createdAt: new Date(),
    },
    {
      userId: users[3]._id,
      dishId: menuItems[9]._id,
      rating: 5,
      comment: "Perfect garlic naan! Love it",
      isApproved: true,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
  ];

  const createdReviews = await Review.insertMany(reviews);
  console.log(`✅ Created ${createdReviews.length} reviews`);
  return createdReviews;
}

// Seed Customers
async function seedCustomers(users) {
  console.log("\n📝 Seeding Customers...");
  await Customer.deleteMany({});

  const customers = [
    {
      userId: users[2]._id,
      firstName: users[2].fName,
      lastName: users[2].lName,
      email: users[2].email,
      phone: users[2].contact,
      address: users[2].address,
      totalOrders: 5,
      totalSpent: 65.5,
      lastOrderDate: new Date(),
      memberSince: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    },
    {
      userId: users[3]._id,
      firstName: users[3].fName,
      lastName: users[3].lName,
      email: users[3].email,
      phone: users[3].contact,
      address: users[3].address,
      totalOrders: 12,
      totalSpent: 184.75,
      lastOrderDate: new Date(),
      memberSince: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
    },
    {
      userId: users[4]._id,
      firstName: users[4].fName,
      lastName: users[4].lName,
      email: users[4].email,
      phone: users[4].contact,
      address: users[4].address,
      totalOrders: 8,
      totalSpent: 125.0,
      lastOrderDate: new Date(),
      memberSince: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000),
    },
    {
      userId: users[5]._id,
      firstName: users[5].fName,
      lastName: users[5].lName,
      email: users[5].email,
      phone: users[5].contact,
      address: users[5].address,
      totalOrders: 3,
      totalSpent: 45.25,
      lastOrderDate: new Date(),
      memberSince: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    },
  ];

  const createdCustomers = await Customer.insertMany(customers);
  console.log(`✅ Created ${createdCustomers.length} customers`);
  return createdCustomers;
}

// Seed Settings
async function seedSettings() {
  console.log("\n📝 Seeding Settings...");
  await Settings.deleteMany({});

  const settings = {
    restaurantInfo: {
      restaurantName: "Daakoo London",
      address: "123 Brick Lane, London E1 6SB",
      phone: "020 7123 4567",
      email: "info@daakoo.com",
    },
    operatingHours: {
      monday: { enabled: true, startTime: "12:00", endTime: "22:00" },
      tuesday: { enabled: true, startTime: "12:00", endTime: "22:00" },
      wednesday: { enabled: true, startTime: "12:00", endTime: "22:00" },
      thursday: { enabled: true, startTime: "12:00", endTime: "22:00" },
      friday: { enabled: true, startTime: "12:00", endTime: "23:30" },
      saturday: { enabled: true, startTime: "12:00", endTime: "23:30" },
      sunday: { enabled: true, startTime: "13:00", endTime: "22:00" },
    },
    orderSettings: {
      acceptDelivery: true,
      acceptPickup: true,
      onlineOrderingActive: true,
      minDeliveryAmount: 10.0,
      deliveryFee: 2.5,
    },
    notifications: {
      newOrderAlert: true,
      orderStatusEmail: true,
      dailySummaryReport: true,
      customerFeedbackAlert: true,
    },
    logoUrl: "/assets/logo.png",
  };

  const createdSettings = await Settings.create(settings);
  console.log(`✅ Settings created`);
  return createdSettings;
}

// Main Seed Function
async function seedDatabase() {
  try {
    await connectDB();

    console.log("\n🌱 Starting Database Seeding...\n");

    // Clear all collections
    console.log("🗑️  Clearing existing data...");
    await Promise.all([
      User.deleteMany({}),
      Category.deleteMany({}),
      Menu.deleteMany({}),
      Order.deleteMany({}),
      Review.deleteMany({}),
      Customer.deleteMany({}),
      Settings.deleteMany({}),
    ]);
    console.log("✅ Database cleaned");

    // Seed data
    const users = await seedUsers();
    const categories = await seedCategories();
    const menuItems = await seedMenuItems(categories);
    const orders = await seedOrders(users, menuItems);
    const reviews = await seedReviews(users, menuItems);
    const customers = await seedCustomers(users);
    const settings = await seedSettings();

    console.log("\n✨ Database Seeding Complete!\n");
    console.log("📊 Summary:");
    console.log(`   • Users: ${users.length}`);
    console.log(`   • Categories: ${categories.length}`);
    console.log(`   • Menu Items: ${menuItems.length}`);
    console.log(`   • Orders: ${orders.length}`);
    console.log(`   • Reviews: ${reviews.length}`);
    console.log(`   • Customers: ${customers.length}`);
    console.log(`   • Settings: 1\n`);

    console.log("📝 Test Credentials:");
    console.log("   Admin: admin@daakoo.com / admin123");
    console.log("   Staff: staff@daakoo.com / staff123");
    console.log("   User: john@example.com / john123\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding Error:", error.message);
    process.exit(1);
  }
}

// Run seed
seedDatabase();
