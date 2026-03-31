const mongoose = require("mongoose");
const mongoConnect = require("../config/db");
const Category = require("../models/category");

require("dotenv").config({ path: ".env.dev" });

const categories = [
  "Starters",
  "Mains",
  "Breads",
  "Rice & Biryani",
  "Desserts",
  "Drinks",
  "Chutneys & Sides",
];

async function seedCategories() {
  try {
    await mongoConnect();

    const operations = categories.map((name) => ({
      updateOne: {
        filter: { name },
        update: { $setOnInsert: { name } },
        upsert: true,
      },
    }));

    const result = await Category.bulkWrite(operations, { ordered: false });

    console.log("Category seed completed.");
    console.log(`Inserted: ${result.upsertedCount || 0}`);
    console.log(`Matched existing: ${result.matchedCount || 0}`);
  } catch (error) {
    console.error("Failed to seed categories:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
}

seedCategories();
