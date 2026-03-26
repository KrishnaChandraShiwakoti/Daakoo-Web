const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    restaurantName: {
      type: String,
      default: "Restaurant Name",
    },
    address: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    operatingHours: {
      monday: {
        enabled: { type: Boolean, default: true },
        open: { type: String, default: "09:00" },
        close: { type: String, default: "22:00" },
      },
      tuesday: {
        enabled: { type: Boolean, default: true },
        open: { type: String, default: "09:00" },
        close: { type: String, default: "22:00" },
      },
      wednesday: {
        enabled: { type: Boolean, default: true },
        open: { type: String, default: "09:00" },
        close: { type: String, default: "22:00" },
      },
      thursday: {
        enabled: { type: Boolean, default: true },
        open: { type: String, default: "09:00" },
        close: { type: String, default: "22:00" },
      },
      friday: {
        enabled: { type: Boolean, default: true },
        open: { type: String, default: "09:00" },
        close: { type: String, default: "22:00" },
      },
      saturday: {
        enabled: { type: Boolean, default: true },
        open: { type: String, default: "09:00" },
        close: { type: String, default: "22:00" },
      },
      sunday: {
        enabled: { type: Boolean, default: false },
        open: { type: String, default: "10:00" },
        close: { type: String, default: "21:00" },
      },
    },
    orderSettings: {
      acceptDelivery: { type: Boolean, default: true },
      acceptPickup: { type: Boolean, default: true },
      onlineOrderingActive: { type: Boolean, default: true },
      deliveryRadius: { type: Number, default: 5 }, // in km
      minOrderAmount: { type: Number, default: 0 },
    },
    notifications: {
      newOrderAlert: { type: Boolean, default: true },
      orderStatusEmail: { type: Boolean, default: true },
      dailySummaryReport: { type: Boolean, default: false },
    },
    logoUrl: {
      type: String,
      default: "",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const Settings = mongoose.model("Settings", settingsSchema);

module.exports = Settings;
