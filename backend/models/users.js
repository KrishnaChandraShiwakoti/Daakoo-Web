const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  fName: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "staff", "admin"],
    default: "user",
  },
  contact: {
    type: String,
    require: true,
  },
  refreshJWT: {
    type: String,
    default: "",
  },
  addresses: {
    type: [String],
    default: [],
  },
  paymentMethods: {
    type: [
      {
        cardHolderName: {
          type: String,
          required: true,
        },
        brand: {
          type: String,
          default: "card",
        },
        last4: {
          type: String,
          required: true,
        },
        expiryMonth: {
          type: String,
          required: true,
        },
        expiryYear: {
          type: String,
          required: true,
        },
        isDefault: {
          type: Boolean,
          default: false,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    default: [],
  },
});

const User = mongoose.model("User", userModel);

module.exports = User;
