// src/components/Home.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as jwt_decode from 'jwt-decode';

const Home = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [message, setMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(4);
  const [sortOrder, setSortOrder] = useState('title');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decoded = jwt_decode(token);
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem('authToken');
          setMessage('Session expired. Please log in again.');
          navigate('/login');
        } else {
          fetchRecipes();
        }
      } catch (error) {
        setMessage('Invalid token. Please log in again.');
        navigate('/login');
      }
    } else {
      setMessage('No token found. Please log in.');
      navigate('/login');
    }
  }, [navigate, currentPage, sortOrder, ingredients]);

  const fetchRecipes = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setMessage('No token found. Please log in.');
      return;
    }

    try {
      const response = await axios.get('http://localhost:3000/recipes', {
        headers: { Authorization: `Bearer ${token}` },
        params: { ingredients, page: currentPage, sort: sortOrder },
      });

      let sortedRecipes = response.data;
      if (sortOrder === 'title') {
        sortedRecipes = sortedRecipes.sort((a, b) => a.title.localeCompare(b.title));
      } else if (sortOrder === 'ingredients') {
        sortedRecipes = sortedRecipes.sort((a, b) => a.usedIngredientCount - b.usedIngredientCount);
      }

      const indexOfLastRecipe = currentPage * recipesPerPage;
      const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
      const currentRecipes = sortedRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
      setRecipes(currentRecipes);
    } catch (error) {
      setMessage('Error fetching recipes: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a192f] via-[#1e2a47] to-[#2a3b6f] text-white py-8">
      <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#9b4de5] to-[#3b82f6]">Prep and Plate</h1>
      <p className="text-lg text-center text-gray-300 mt-4">Enter ingredients to find the perfect recipes!</p>

      <div className="flex justify-center my-12">
        <form onSubmit={(e) => { e.preventDefault(); setCurrentPage(1); fetchRecipes(); }} className="w-full sm:w-2/3 lg:w-1/2">
          <div className="flex items-center border-2 border-blue-600 p-3 rounded-lg shadow-xl bg-white bg-opacity-10">
            <input
              type="text"
              className="w-full p-3 text-xl text-gray-800 rounded-md bg-transparent"
              placeholder="Enter ingredients (e.g., chicken, tomatoes, cheese)"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-[#00b4d8] to-[#006f9b] text-white p-3 ml-4 rounded-md transition duration-300 hover:bg-gradient-to-l"
            >
              Find Recipes
            </button>
          </div>
        </form>
      </div>

      <div className="text-center mb-12">
        <select
          onChange={(e) => setSortOrder(e.target.value)}
          value={sortOrder}
          className="text-white bg-transparent border-2 border-blue-600 rounded-md p-2"
        >
          <option value="title">Sort by Title</option>
          <option value="ingredients">Sort by Ingredients</option>
        </select>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {message && <div className="text-center text-red-500">{message}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <div key={recipe._id} className="bg-[#1e2a47] p-4 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold">{recipe.title}</h3>
                <p className="text-gray-400">{recipe.ingredients.join(', ')}</p>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-300">No recipes found for the given ingredients.</div>
          )}
        </div>

        <div className="flex justify-center mt-12">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-blue-600 text-white py-2 px-6 rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="bg-blue-600 text-white py-2 px-6 ml-4 rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
