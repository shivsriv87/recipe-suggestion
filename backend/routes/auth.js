require('dotenv').config()
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = process.env.JWT_SECRET;

// Signup route
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });

    await user.save();
    console.log('User created successfully:', user.email);

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '2h' });
    res.status(201).json({ token, userId: user._id });
  } catch (error) {
    console.error('Error during signup:', error);

    // Handle specific duplicate email error
    if (error.code === 11000) {  // MongoDB Duplicate Key error
      return res.status(400).json({ message: 'Email is already taken' });
    }
    
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

// Signin route
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '2h' });
    res.json({ token, userId: user._id });
  } catch (error) {
    console.error('Error during signin:', error);
    res.status(500).json({ message: 'Error signing in', error: error.message });
  }
});

module.exports = router;
