const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
},     
  quantity: { 
    type: String, 
    default: null 
}   
});

const recipeSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
               
  ingredients: [
    ingredientSchema
],                  
  usedIngredientCount: 
  { 
         type: Number, 
         required: true 
},
  imageUrl: { 
    type: String, 
    required: true 
},          
  instructions: { 
    type: String, 
    default: null 
},       
  createdAt: { 
    type: Date, 
    default: Date.now 
}     
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
