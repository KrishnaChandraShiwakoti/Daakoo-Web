const User = require("../models/users.js");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt-utlis.js");
const saltRounds = 10;
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
    console.error("Unexpected error", error);
    res.status(500).json({ message: error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const token = generateToken({ id: user.id });
    (await bcrypt.compare(password, user.password))
      ? res.status(200).json({
          email: user.email,
          role: user.role,
          fName: user.fName,
          lName: user.lName,
          contact: user.contact,
          address: user.address,
          refreshJWT: token,
        })
      : res
          .status(200)
          .json({ message: "Please check your password or email" });
  } catch (error) {
    console.error("Unexpected error", error);
    res.status(500).json({ message: error });
  }
};
