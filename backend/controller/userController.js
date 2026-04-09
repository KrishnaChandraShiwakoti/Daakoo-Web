const User = require("../models/users.js");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt-utlis.js");
const saltRounds = 10;

const normalizeAddresses = (addresses, addressFallback) => {
  if (Array.isArray(addresses)) {
    return addresses
      .filter((item) => typeof item === "string")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (typeof addressFallback === "string" && addressFallback.trim()) {
    return [addressFallback.trim()];
  }

  return null;
};

exports.signup = async (req, res) => {
  const { fName, lName, email, password, contact } = req.body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  try {
    await User.create({
      fName,
      lName,
      email,
      password: hashedPassword,
      contact,
    });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({ message: "Email already exists" });
    }
    console.error("Unexpected error", error);
    res.status(500).json({ message: "Unable to create user" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Please check your password or email" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Please check your password or email" });
    }

    const token = generateToken({ id: user.id });
    res.status(200).json({
      id: user.id,
      email: user.email,
      role: user.role,
      fName: user.fName,
      lName: user.lName,
      contact: user.contact,
      addresses: user.addresses || [],
      refreshJWT: token,
    });
  } catch (error) {
    console.error("Unexpected error", error);
    res.status(500).json({ message: "Unable to login" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Unexpected error", error);
    return res.status(500).json({ message: "Unable to fetch profile" });
  }
};

exports.updateProfile = async (req, res) => {
  const { fName, lName, contact, addresses, address } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.fName = typeof fName === "string" ? fName.trim() : user.fName;
    user.lName = typeof lName === "string" ? lName.trim() : user.lName;
    user.contact = typeof contact === "string" ? contact.trim() : user.contact;

    const normalizedAddresses = normalizeAddresses(addresses, address);
    if (normalizedAddresses !== null) {
      user.addresses = normalizedAddresses;
    }

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        email: user.email,
        role: user.role,
        fName: user.fName,
        lName: user.lName,
        contact: user.contact,
        addresses: user.addresses || [],
      },
    });
  } catch (error) {
    console.error("Unexpected error", error);
    return res.status(500).json({ message: "Unable to update profile" });
  }
};

exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (!oldPassword || !newPassword || !confirmPassword) {
    return res
      .status(400)
      .json({ message: "All password fields are required" });
  }

  if (newPassword.length < 6) {
    return res
      .status(400)
      .json({ message: "New password must be at least 6 characters" });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "New passwords do not match" });
  }

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordValid) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return res
        .status(400)
        .json({
          message: "New password must be different from current password",
        });
    }

    user.password = await bcrypt.hash(newPassword, saltRounds);
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Unexpected error", error);
    return res.status(500).json({ message: "Unable to update password" });
  }
};
