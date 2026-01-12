const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Generate JWT token (expires in 1 hour)
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, "pavani123", {
    expiresIn: "1h", // Token expires in 1 hour
  });
};
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Generate JWT token
    const token = generateToken(user._id);

    // Return user data + token
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token, // send token to frontend
    });
  } catch (error) {
    console.error("Register Error:", error.message);
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

// @desc Login user
// @route POST /api/users/login
// @access Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token, // send token to frontend
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: "Server error: " + error.message });
  }
};


module.exports = { registerUser, loginUser };
