const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Recipe = require('./models/Recipe');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');

dotenv.config();
const app = express();
app.use(express.json());

// Enable CORS (Make sure your frontend is sending requests to the correct port)
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

// JWT Authentication Middleware
const authenticateJWT = (req, res, next) => {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }
    req.user = user;
    next();
  });
};

// Routes
app.use('/auth', authRoutes);  // Auth routes (signup, signin)
app.use('/protected', authenticateJWT, protectedRoutes);  // Protected routes

app.get('/recipes', authenticateJWT, async (req, res) => {
  const { ingredients, page = 1, limit = 4, sort = 'title' } = req.query;

  try {
    const ingredientsArray = ingredients ? ingredients.split(',') : [];
    let query = {};
    if (ingredientsArray.length > 0) {
      query = { ingredients: { $elemMatch: { name: { $in: ingredientsArray } } } };
    }

    const recipes = await Recipe.find(query)
      .sort(sort === 'title' ? { title: 1 } : { usedIngredientCount: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching recipes' });
  }
});

// Home Route
app.get('/', (req, res) => {
  res.send("Server is running");
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
