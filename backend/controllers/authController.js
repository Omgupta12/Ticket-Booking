const { body, validationResult } = require("express-validator");
const User = require("../services/userService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

// Signup function with validation and sanitization
const signup = async (req, res) => {
  // Validate and sanitize inputs
  await body("username")
    .isLength({ min: 3 })
    .withMessage("Username should be at least 3 characters long")
    .trim()
    .escape()
    .run(req);

  await body("email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail()
    .run(req);

  await body("password")
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters long")
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password, email } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const existingUserByEmail = await User.findByEmail(email);
    if (existingUserByEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await User.create(username, hashedPassword, email);

    // Generate a JWT token
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Respond with the token and user information
    res
      .status(201)
      .json({ token, user: newUser, message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login function with validation and sanitization
const login = async (req, res) => {
  // Validate and sanitize inputs
  await body("username").trim().escape().run(req);

  await body("password")
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters long")
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Respond with the token and user information
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { signup, login };
