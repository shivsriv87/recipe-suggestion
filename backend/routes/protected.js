const express = require('express');
const authMiddleware = require('../models/middlewares/auth');
const router = express.Router();

// Protected route
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
