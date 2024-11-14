require('dotenv').config()
const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');

const MONGO_URI  = 'mongodb+srv://srivastavashivang39:shivang123@cluster0.adj8q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; 
console.log(MONGO_URI)


const sampleRecipes = [
  {
    title: 'Vegetable Stir Fry',
    ingredients: [
      { name: 'broccoli', quantity: '1 cup' },
      { name: 'bell peppers', quantity: '1 cup' },
      { name: 'carrots', quantity: '1/2 cup' },
      { name: 'soy sauce', quantity: '2 tbsp' }
    ],
    usedIngredientCount: 4,
    imageUrl: 'https://example.com/images/vegetable_stir_fry.jpg',
    instructions: 'Heat oil in a pan, add vegetables, stir fry for 5 mins, add soy sauce.'
  },
  {
    title: 'Chicken Pasta',
    ingredients: [
      { name: 'chicken', quantity: '200g' },
      { name: 'pasta', quantity: '1 cup' },
      { name: 'tomatoes', quantity: '2' },
      { name: 'cheese', quantity: '50g' }
    ],
    usedIngredientCount: 4,
    imageUrl: 'https://example.com/images/chicken_pasta.jpg',
    instructions: 'Cook pasta, add chicken and tomatoes, and top with cheese.'
  },
 
  {
    title: 'Aloo Gobi',
    ingredients: [
      { name: 'potatoes', quantity: '2' },
      { name: 'cauliflower', quantity: '1/2 head' },
      { name: 'onion', quantity: '1' },
      { name: 'tomato', quantity: '1' },
      { name: 'garam masala', quantity: '1 tsp' },
      { name: 'turmeric', quantity: '1/2 tsp' },
      { name: 'cumin seeds', quantity: '1 tsp' },
      { name: 'coriander leaves', quantity: 'for garnish' }
    ],
    usedIngredientCount: 8,
    imageUrl: 'https://via.placeholder.com/400x300.png?text=Aloo+Gobi',
    instructions: 'Heat oil, add cumin seeds, onions, and tomatoes. Add potatoes, cauliflower, spices, and cook until tender.'
  },
  {
    title: 'Paneer Butter Masala',
    ingredients: [
      { name: 'paneer', quantity: '200g' },
      { name: 'tomatoes', quantity: '3' },
      { name: 'onion', quantity: '1' },
      { name: 'butter', quantity: '2 tbsp' },
      { name: 'cream', quantity: '1/4 cup' },
      { name: 'garam masala', quantity: '1 tsp' },
      { name: 'kasuri methi', quantity: '1 tsp' }
    ],
    usedIngredientCount: 7,
    imageUrl: 'https://via.placeholder.com/400x300.png?text=Paneer+Butter+Masala',
    instructions: 'Fry onions in butter, blend tomatoes into a puree, add cream and spices. Add paneer and cook for a few minutes.'
  },
  {
    title: 'Chicken Tikka Masala',
    ingredients: [
      { name: 'chicken', quantity: '300g' },
      { name: 'yogurt', quantity: '1/4 cup' },
      { name: 'tomatoes', quantity: '2' },
      { name: 'onion', quantity: '1' },
      { name: 'garam masala', quantity: '1 tsp' },
      { name: 'turmeric', quantity: '1/2 tsp' },
      { name: 'cumin powder', quantity: '1 tsp' },
      { name: 'cilantro', quantity: 'for garnish' }
    ],
    usedIngredientCount: 8,
    imageUrl: 'https://via.placeholder.com/400x300.png?text=Chicken+Tikka+Masala',
    instructions: 'Marinate chicken in yogurt and spices, cook it, then prepare gravy with tomatoes and onions. Add chicken and cook.'
  },
  {
    title: 'Mutton Rogan Josh',
    ingredients: [
      { name: 'mutton', quantity: '500g' },
      { name: 'onion', quantity: '2' },
      { name: 'tomatoes', quantity: '2' },
      { name: 'yogurt', quantity: '1/4 cup' },
      { name: 'ginger garlic paste', quantity: '1 tbsp' },
      { name: 'garam masala', quantity: '1 tsp' },
      { name: 'kashmiri red chili', quantity: '1 tsp' },
      { name: 'coriander leaves', quantity: 'for garnish' }
    ],
    usedIngredientCount: 8,
    imageUrl: 'https://via.placeholder.com/400x300.png?text=Mutton+Rogan+Josh',
    instructions: 'Brown onions, add mutton and spices, cook until tender, add tomatoes and yogurt, simmer until gravy thickens.'
  },
  // 20 More Dishes
  {
    title: 'Chole Bhature',
    ingredients: [
      { name: 'chickpeas', quantity: '1 cup' },
      { name: 'onion', quantity: '1' },
      { name: 'tomato', quantity: '1' },
      { name: 'garam masala', quantity: '1 tsp' },
      { name: 'cumin', quantity: '1 tsp' },
      { name: 'flour', quantity: '2 cups' },
      { name: 'yogurt', quantity: '1/4 cup' }
    ],
    usedIngredientCount: 7,
    imageUrl: 'https://via.placeholder.com/400x300.png?text=Chole+Bhature',
    instructions: 'Cook chickpeas with spices, prepare bhature dough, deep fry. Serve with chickpeas.'
  },
  {
    title: 'Baingan Bharta',
    ingredients: [
      { name: 'eggplant', quantity: '2' },
      { name: 'onion', quantity: '1' },
      { name: 'tomatoes', quantity: '2' },
      { name: 'garam masala', quantity: '1 tsp' },
      { name: 'turmeric', quantity: '1/2 tsp' },
      { name: 'cilantro', quantity: 'for garnish' }
    ],
    usedIngredientCount: 6,
    imageUrl: 'https://via.placeholder.com/400x300.png?text=Baingan+Bharta',
    instructions: 'Roast eggplants, peel and mash. Cook with onions, tomatoes, and spices. Garnish with cilantro.'
  },
  {
    title: 'Daal Tadka',
    ingredients: [
      { name: 'yellow lentils', quantity: '1 cup' },
      { name: 'onion', quantity: '1' },
      { name: 'tomatoes', quantity: '2' },
      { name: 'garam masala', quantity: '1 tsp' },
      { name: 'cumin seeds', quantity: '1 tsp' }
    ],
    usedIngredientCount: 5,
    imageUrl: 'https://via.placeholder.com/400x300.png?text=Daal+Tadka',
    instructions: 'Cook lentils, prepare tempering with cumin, onions, and tomatoes. Add to cooked daal.'
  },
  {
    title: 'Palak Paneer',
    ingredients: [
      { name: 'spinach', quantity: '500g' },
      { name: 'paneer', quantity: '200g' },
      { name: 'onion', quantity: '1' },
      { name: 'garlic', quantity: '2 cloves' },
      { name: 'garam masala', quantity: '1 tsp' }
    ],
    usedIngredientCount: 5,
    imageUrl: 'https://via.placeholder.com/400x300.png?text=Palak+Paneer',
    instructions: 'Cook spinach and blend, cook with garlic, onions, and spices. Add paneer and simmer.'
  },
  {
    title: 'Pav Bhaji',
    ingredients: [
      { name: 'mixed vegetables', quantity: '2 cups' },
      { name: 'onion', quantity: '1' },
      { name: 'tomato', quantity: '1' },
      { name: 'pav bhaji masala', quantity: '1 tbsp' },
      { name: 'bread rolls', quantity: '6' }
    ],
    usedIngredientCount: 5,
    imageUrl: 'https://via.placeholder.com/400x300.png?text=Pav+Bhaji',
    instructions: 'Mash cooked vegetables, add spices, and cook. Serve with toasted bread rolls.'
  },
  {
    title: 'Methi Thepla',
    ingredients: [
      { name: 'fenugreek leaves', quantity: '1 cup' },
      { name: 'wheat flour', quantity: '2 cups' },
      { name: 'cumin seeds', quantity: '1 tsp' },
      { name: 'turmeric', quantity: '1/2 tsp' },
      { name: 'ghee', quantity: 'for roasting' }
    ],
    usedIngredientCount: 5,
    imageUrl: 'https://via.placeholder.com/400x300.png?text=Methi+Thepla',
    instructions: 'Knead dough with fenugreek leaves and spices, roll into flatbreads, and roast on a griddle with ghee.'
  },
  {
    title: 'Tandoori Chicken',
    ingredients: [
      { name: 'chicken', quantity: '500g' },
      { name: 'yogurt', quantity: '1/2 cup' },
      { name: 'garam masala', quantity: '1 tsp' },
      { name: 'red chili powder', quantity: '1 tsp' },
      { name: 'lemon', quantity: '1' }
    ],
    usedIngredientCount: 5,
    imageUrl: 'https://via.placeholder.com/400x300.png?text=Tandoori+Chicken',
    instructions: 'Marinate chicken in yogurt and spices, cook in a tandoor or oven until golden.'
  },
  {
    title: 'Fish Curry',
    ingredients: [
      { name: 'fish fillets', quantity: '300g' },
      { name: 'onion', quantity: '1' },
      { name: 'tomato', quantity: '1' },
      { name: 'coconut milk', quantity: '1/2 cup' },
      { name: 'tamarind paste', quantity: '1 tsp' }
    ],
    usedIngredientCount: 5,
    imageUrl: 'https://via.placeholder.com/400x300.png?text=Fish+Curry',
    instructions: 'Cook onions and tomatoes, add coconut milk and tamarind. Add fish and cook until tender.'
  },
  {
    title: 'Butter Chicken',
    ingredients: [
      { name: 'chicken', quantity: '300g' },
      { name: 'tomatoes', quantity: '2' },
      { name: 'butter', quantity: '2 tbsp' },
      { name: 'cream', quantity: '1/4 cup' },
      { name: 'garam masala', quantity: '1 tsp' }
    ],
    usedIngredientCount: 5,
    imageUrl: 'https://via.placeholder.com/400x300.png?text=Butter+Chicken',
    instructions: 'Cook chicken in a creamy tomato-based sauce with butter and spices.'
  },
  {
    title: 'Mushroom Masala',
    ingredients: [
      { name: 'mushrooms', quantity: '200g' },
      { name: 'onion', quantity: '1' },
      { name: 'tomato', quantity: '1' },
      { name: 'garam masala', quantity: '1 tsp' },
      { name: 'cream', quantity: '2 tbsp' }
    ],
    usedIngredientCount: 5,
    imageUrl: 'https://via.placeholder.com/400x300.png?text=Mushroom+Masala',
    instructions: 'Cook mushrooms with onions, tomatoes, and spices, add cream and simmer.'
  },
  {
    title: 'Kadhi Pakora',
    ingredients: [
      { name: 'gram flour', quantity: '1 cup' },
      { name: 'yogurt', quantity: '1 cup' },
      { name: 'onion', quantity: '1' },
      { name: 'ginger', quantity: '1 tsp' },
      { name: 'coriander powder', quantity: '1 tsp' }
    ],
    usedIngredientCount: 5,
    imageUrl: 'https://via.placeholder.com/400x300.png?text=Kadhi+Pakora',
    instructions: 'Make gram flour pakoras, cook in a yogurt-based gravy with spices.'
  },
  {
    title: 'Shahi Paneer',
    ingredients: [
      { name: 'paneer', quantity: '200g' },
      { name: 'onion', quantity: '1' },
      { name: 'cashews', quantity: '1/4 cup' },
      { name: 'cream', quantity: '2 tbsp' },
      { name: 'cardamom', quantity: '1/2 tsp' }
    ],
    usedIngredientCount: 5,
    imageUrl: 'https://via.placeholder.com/400x300.png?text=Shahi+Paneer',
    instructions: 'Cook paneer in a rich, creamy gravy made with cashews and spices.'
  },
  {
    title: 'Rajma',
    ingredients: [
      { name: 'kidney beans', quantity: '1 cup' },
      { name: 'onion', quantity: '1' },
      { name: 'tomatoes', quantity: '2' },
      { name: 'garam masala', quantity: '1 tsp' },
      { name: 'cumin', quantity: '1 tsp' }
    ],
    usedIngredientCount: 5,
    imageUrl: 'https://via.placeholder.com/400x300.png?text=Rajma',
    instructions: 'Cook kidney beans with onions, tomatoes, and spices. Simmer to make a thick curry.'
  },
  {
    title: 'Lamb Korma',
    ingredients: [
      { name: 'lamb', quantity: '500g' },
      { name: 'onion', quantity: '1' },
      { name: 'yogurt', quantity: '1/2 cup' },
      { name: 'cream', quantity: '1/4 cup' },
      { name: 'garam masala', quantity: '1 tsp' }
    ],
    usedIngredientCount: 5,
    imageUrl: 'https://via.placeholder.com/400x300.png?text=Lamb+Korma',
    instructions: 'Cook lamb in a creamy yogurt-based gravy with rich spices.'
  },
{
  title: 'Biryani',
  ingredients: [
    { name: 'basmati rice', quantity: '1 cup' },
    { name: 'chicken', quantity: '300g' },
    { name: 'onion', quantity: '2' },
    { name: 'tomato', quantity: '1' },
    { name: 'garam masala', quantity: '1 tsp' },
    { name: 'yogurt', quantity: '1/4 cup' },
    { name: 'mint leaves', quantity: 'for garnish' }
  ],
  usedIngredientCount: 7,
  imageUrl: 'https://via.placeholder.com/400x300.png?text=Biryani',
  instructions: 'Cook rice separately. Marinate chicken with yogurt and spices. Layer rice and chicken, and cook until done.'
},
{
  title: 'Kadhi Pakora',
  ingredients: [
    { name: 'gram flour', quantity: '1 cup' },
    { name: 'yogurt', quantity: '1 cup' },
    { name: 'onion', quantity: '1' },
    { name: 'ginger', quantity: '1 tsp' },
    { name: 'coriander powder', quantity: '1 tsp' }
  ],
  usedIngredientCount: 5,
  imageUrl: 'https://via.placeholder.com/400x300.png?text=Kadhi+Pakora',
  instructions: 'Make gram flour pakoras, cook in a yogurt-based gravy with spices.'
},
{
  title: 'Gobi Manchurian',
  ingredients: [
    { name: 'cauliflower', quantity: '1/2 head' },
    { name: 'flour', quantity: '1/2 cup' },
    { name: 'soy sauce', quantity: '1 tbsp' },
    { name: 'green chili', quantity: '1' },
    { name: 'garlic', quantity: '2 cloves' }
  ],
  usedIngredientCount: 5,
  imageUrl: 'https://via.placeholder.com/400x300.png?text=Gobi+Manchurian',
  instructions: 'Deep fry cauliflower, then stir fry with soy sauce, garlic, and green chili.'
},
{
  title: 'Dhokla',
  ingredients: [
    { name: 'rice flour', quantity: '1 cup' },
    { name: 'chickpea flour', quantity: '1/2 cup' },
    { name: 'yogurt', quantity: '1/4 cup' },
    { name: 'mustard seeds', quantity: '1 tsp' },
    { name: 'curry leaves', quantity: 'for garnish' }
  ],
  usedIngredientCount: 5,
  imageUrl: 'https://via.placeholder.com/400x300.png?text=Dhokla',
  instructions: 'Mix rice flour and chickpea flour with yogurt, steam until cooked. Temper with mustard seeds and curry leaves.'
},
{
  title: 'Aloo Paratha',
  ingredients: [
    { name: 'wheat flour', quantity: '2 cups' },
    { name: 'potatoes', quantity: '2' },
    { name: 'onion', quantity: '1' },
    { name: 'cumin', quantity: '1 tsp' },
    { name: 'coriander powder', quantity: '1 tsp' }
  ],
  usedIngredientCount: 5,
  imageUrl: 'https://via.placeholder.com/400x300.png?text=Aloo+Paratha',
  instructions: 'Stuff paratha dough with mashed spiced potatoes and cook on a griddle.'
},
{
  title: 'Tandoori Fish',
  ingredients: [
    { name: 'fish fillets', quantity: '300g' },
    { name: 'yogurt', quantity: '1/4 cup' },
    { name: 'garam masala', quantity: '1 tsp' },
    { name: 'red chili powder', quantity: '1 tsp' },
    { name: 'lemon', quantity: '1' }
  ],
  usedIngredientCount: 5,
  imageUrl: 'https://via.placeholder.com/400x300.png?text=Tandoori+Fish',
  instructions: 'Marinate fish with yogurt and spices, then cook in a tandoor or oven until done.'
},
{
  title: 'Methi Thepla',
  ingredients: [
    { name: 'fenugreek leaves', quantity: '1 cup' },
    { name: 'wheat flour', quantity: '2 cups' },
    { name: 'cumin seeds', quantity: '1 tsp' },
    { name: 'turmeric', quantity: '1/2 tsp' },
    { name: 'ghee', quantity: 'for roasting' }
  ],
  usedIngredientCount: 5,
  imageUrl: 'https://via.placeholder.com/400x300.png?text=Methi+Thepla',
  instructions: 'Knead dough with fenugreek leaves and spices, roll into flatbreads, and roast on a griddle with ghee.'
},
{
  title: 'Malai Kofta',
  ingredients: [
    { name: 'paneer', quantity: '200g' },
    { name: 'potatoes', quantity: '2' },
    { name: 'onion', quantity: '1' },
    { name: 'tomatoes', quantity: '2' },
    { name: 'cream', quantity: '1/4 cup' }
  ],
  usedIngredientCount: 5,
  imageUrl: 'https://via.placeholder.com/400x300.png?text=Malai+Kofta',
  instructions: 'Make koftas from paneer and potatoes, fry them, and cook in a creamy tomato gravy.'
},
{
  title: 'Pav Bhaji',
  ingredients: [
    { name: 'mixed vegetables', quantity: '2 cups' },
    { name: 'onion', quantity: '1' },
    { name: 'tomato', quantity: '1' },
    { name: 'pav bhaji masala', quantity: '1 tbsp' },
    { name: 'bread rolls', quantity: '6' }
  ],
  usedIngredientCount: 5,
  imageUrl: 'https://via.placeholder.com/400x300.png?text=Pav+Bhaji',
  instructions: 'Mash cooked vegetables, add spices, and cook. Serve with toasted bread rolls.'
},
{
  title: 'Kolkata Kathi Roll',
  ingredients: [
    { name: 'paratha', quantity: '2' },
    { name: 'chicken', quantity: '200g' },
    { name: 'onion', quantity: '1' },
    { name: 'tomato', quantity: '1' },
    { name: 'green chili', quantity: '1' }
  ],
  usedIngredientCount: 5,
  imageUrl: 'https://via.placeholder.com/400x300.png?text=Kolkata+Kathi+Roll',
  instructions: 'Cook spiced chicken and wrap it in a paratha with onions, tomatoes, and chilies.'
},
{
  title: 'Pesarattu',
  ingredients: [
    { name: 'green gram', quantity: '1 cup' },
    { name: 'ginger', quantity: '1 inch piece' },
    { name: 'onion', quantity: '1' },
    { name: 'green chili', quantity: '1' },
    { name: 'curry leaves', quantity: 'for garnish' }
  ],
  usedIngredientCount: 5,
  imageUrl: 'https://via.placeholder.com/400x300.png?text=Pesarattu',
  instructions: 'Blend soaked green gram and spices into a batter, then make dosas and serve with chutney.'
},
{
  title: 'Vada Pav',
  ingredients: [
    { name: 'potatoes', quantity: '2' },
    { name: 'green chilies', quantity: '2' },
    { name: 'bread rolls', quantity: '4' },
    { name: 'mustard seeds', quantity: '1 tsp' },
    { name: 'garlic chutney', quantity: 'for serving' }
  ],
  usedIngredientCount: 5,
  imageUrl: 'https://via.placeholder.com/400x300.png?text=Vada+Pav',
  instructions: 'Make spiced potato vadas, fry them, and serve in bread rolls with chutney.'
},
{
  title: 'Keema Matar',
  ingredients: [
    { name: 'minced mutton', quantity: '300g' },
    { name: 'peas', quantity: '1/2 cup' },
    { name: 'onion', quantity: '1' },
    { name: 'tomato', quantity: '1' },
    { name: 'garam masala', quantity: '1 tsp' }
  ],
  usedIngredientCount: 5,
  imageUrl: 'https://via.placeholder.com/400x300.png?text=Keema+Matar',
  instructions: 'Cook minced mutton with peas and spices, add tomatoes and simmer until done.'
},
{
  title: 'Chole Bhature',
  ingredients: [
    { name: 'chickpeas', quantity: '1 cup' },
    { name: 'flour', quantity: '2 cups' },
    { name: 'onion', quantity: '1' },
    { name: 'tomato', quantity: '1' },
    { name: 'garam masala', quantity: '1 tsp' }
  ],
  usedIngredientCount: 5,
  imageUrl: 'https://via.placeholder.com/400x300.png?text=Chole+Bhature',
  instructions: 'Cook chickpeas with spices for chole, and fry dough to make bhature. Serve together.'
},
{
  title: 'Murg Musallam',
  ingredients: [
    { name: 'whole chicken', quantity: '1' },
    { name: 'yogurt', quantity: '1/4 cup' },
    { name: 'onion', quantity: '2' },
    { name: 'garam masala', quantity: '1 tsp' },
    { name: 'cream', quantity: '1/4 cup' }
  ],
  usedIngredientCount: 5,
  imageUrl: 'https://via.placeholder.com/400x300.png?text=Murg+Musallam',
  instructions: 'Marinate chicken with yogurt and spices, then cook in a rich gravy made with onions and cream.'
},
{
  title: 'Lassi',
  ingredients: [
    { name: 'yogurt', quantity: '1 cup' },
    { name: 'sugar', quantity: '2 tbsp' },
    { name: 'cardamom', quantity: '1/2 tsp' },
    { name: 'water', quantity: '1/2 cup' }
  ],
  usedIngredientCount: 4,
  imageUrl: 'https://via.placeholder.com/400x300.png?text=Lassi',
  instructions: 'Blend yogurt, sugar, cardamom, and water to make a refreshing drink.'
},
{
  title: 'Methi Malai Murg',
  ingredients: [
    { name: 'chicken', quantity: '300g' },
    { name: 'fenugreek leaves', quantity: '1 cup' },
    { name: 'cream', quantity: '1/4 cup' },
    { name: 'onion', quantity: '1' },
    { name: 'garam masala', quantity: '1 tsp' }
  ],
  usedIngredientCount: 5,
  imageUrl: 'https://via.placeholder.com/400x300.png?text=Methi+Malai+Murg',
  instructions: 'Cook chicken with fenugreek leaves in a creamy, spiced sauce.'
},
{
  title: 'Dum Aloo',
  ingredients: [
    { name: 'baby potatoes', quantity: '10-12' },
    { name: 'onion', quantity: '1' },
    { name: 'tomato', quantity: '1' },
    { name: 'garam masala', quantity: '1 tsp' },
    { name: 'cream', quantity: '2 tbsp' }
  ],
  usedIngredientCount: 5,
  imageUrl: 'https://via.placeholder.com/400x300.png?text=Dum+Aloo',
  instructions: 'Cook baby potatoes in a spicy gravy of tomatoes, onions, and garam masala, then finish with cream.'
},
{
  title: 'Shahi Paneer',
  ingredients: [
    { name: 'paneer', quantity: '200g' },
    { name: 'onion', quantity: '1' },
    { name: 'tomato', quantity: '2' },
    { name: 'cashew paste', quantity: '2 tbsp' },
    { name: 'cream', quantity: '1/4 cup' }
  ],
  usedIngredientCount: 5,
  imageUrl: 'https://via.placeholder.com/400x300.png?text=Shahi+Paneer',
  instructions: 'Cook paneer in a rich, creamy gravy made with cashew paste and tomatoes.'
},
{
  title: 'Tandoori Chicken',
  ingredients: [
    { name: 'chicken', quantity: '500g' },
    { name: 'yogurt', quantity: '1/2 cup' },
    { name: 'garam masala', quantity: '1 tsp' },
    { name: 'red chili powder', quantity: '1 tsp' },
    { name: 'lemon juice', quantity: '1 tbsp' }
  ],
  usedIngredientCount: 5,
  imageUrl: 'https://via.placeholder.com/400x300.png?text=Tandoori+Chicken',
  instructions: 'Marinate chicken in yogurt and spices, then cook in a tandoor or oven.'
},
{
  title: 'Hyderabadi Biryani',
  ingredients: [
    { name: 'basmati rice', quantity: '1 cup' },
    { name: 'chicken', quantity: '300g' },
    { name: 'onion', quantity: '2' },
    { name: 'garam masala', quantity: '1 tsp' },
    { name: 'mint leaves', quantity: 'for garnish' }
  ],
  usedIngredientCount: 5,
  imageUrl: 'https://via.placeholder.com/400x300.png?text=Hyderabadi+Biryani',
  instructions: 'Cook rice and chicken with aromatic spices and mint leaves, layer and cook together.'
},
{
  title: 'Pav Bhaji',
  ingredients: [
    { name: 'mixed vegetables', quantity: '2 cups' },
    { name: 'onion', quantity: '1' },
    { name: 'tomato', quantity: '1' },
    { name: 'pav bhaji masala', quantity: '1 tbsp' },
    { name: 'bread rolls', quantity: '6' }
  ],
  usedIngredientCount: 5,
  imageUrl: 'https://via.placeholder.com/400x300.png?text=Pav+Bhaji',
  instructions: 'Mash cooked vegetables with spices, then serve with buttered and toasted bread rolls.'
},
{
  title: 'Palak Paneer',
  ingredients: [
    { name: 'paneer', quantity: '200g' },
    { name: 'spinach', quantity: '2 cups' },
    { name: 'onion', quantity: '1' },
    { name: 'garlic', quantity: '2 cloves' },
    { name: 'cream', quantity: '1/4 cup' }
  ],
  usedIngredientCount: 5,
  imageUrl: 'https://via.placeholder.com/400x300.png?text=Palak+Paneer',
  instructions: 'Cook paneer in a spiced spinach gravy with garlic and finish with cream.'
},
{
  title: 'Baingan Bharta',
  ingredients: [
    { name: 'eggplant', quantity: '1' },
    { name: 'onion', quantity: '1' },
    { name: 'tomato', quantity: '1' },
    { name: 'garlic', quantity: '2 cloves' },
    { name: 'garam masala', quantity: '1 tsp' }
  ],
  usedIngredientCount: 5,
  imageUrl: 'https://via.placeholder.com/400x300.png?text=Baingan+Bharta',
  instructions: 'Roast eggplant, peel and mash it, then cook with onions, tomatoes, garlic, and spices.'
},
{
  title: 'Chicken Korma',
  ingredients: [
    { name: 'chicken', quantity: '300g' },
    { name: 'onion', quantity: '1' },
    { name: 'ginger garlic paste', quantity: '1 tbsp' },
    { name: 'yogurt', quantity: '1/4 cup' },
    { name: 'cream', quantity: '1/4 cup' }
  ],
  usedIngredientCount: 5,
  imageUrl: 'https://via.placeholder.com/400x300.png?text=Chicken+Korma',
  instructions: 'Cook chicken with yogurt and spices, finish with cream for a rich and flavorful dish.'
},
{
  title: 'Kadhai Paneer',
  ingredients: [
    { name: 'paneer', quantity: '200g' },
    { name: 'onion', quantity: '1' },
    { name: 'capsicum', quantity: '1' },
    { name: 'tomato', quantity: '1' },
    { name: 'garam masala', quantity: '1 tsp' }
  ],
  usedIngredientCount: 5,
  imageUrl: 'https://via.placeholder.com/400x300.png?text=Kadhai+Paneer',
  instructions: 'Cook paneer with onions, capsicum, tomatoes, and spices in a kadhai (wok).'
},
{
  title: 'Rogan Josh',
  ingredients: [
    { name: 'mutton', quantity: '500g' },
    { name: 'onion', quantity: '2' },
    { name: 'tomato', quantity: '1' },
    { name: 'garam masala', quantity: '1 tsp' },
    { name: 'yogurt', quantity: '1/4 cup' }
  ],
  usedIngredientCount: 5,
  imageUrl: 'https://via.placeholder.com/400x300.png?text=Rogan+Josh',
  instructions: 'Cook mutton in a rich gravy of onions, tomatoes, yogurt, and spices until tender.'
},
{
  title: 'Pesarattu',
  ingredients: [
    { name: 'green gram', quantity: '1 cup' },
    { name: 'ginger', quantity: '1 inch piece' },
    { name: 'onion', quantity: '1' },
    { name: 'green chili', quantity: '1' },
    { name: 'curry leaves', quantity: 'for garnish' }
  ],
  usedIngredientCount: 5,
  imageUrl: 'https://via.placeholder.com/400x300.png?text=Pesarattu',
  instructions: 'Grind green gram, make a batter, and cook thin crepes with green chili and onions.'
},
{
  title: 'Methi Thepla',
  ingredients: [
    { name: 'fenugreek leaves', quantity: '1 cup' },
    { name: 'wheat flour', quantity: '2 cups' },
    { name: 'cumin seeds', quantity: '1 tsp' },
    { name: 'turmeric', quantity: '1/2 tsp' },
    { name: 'ghee', quantity: 'for roasting' }
  ],
  usedIngredientCount: 5,
  imageUrl: 'https://via.placeholder.com/400x300.png?text=Methi+Thepla',
  instructions: 'Knead dough with fenugreek leaves and spices, roll into flatbreads, and roast on a griddle with ghee.'
},
{
  title: 'Malai Kofta',
  ingredients: [
    { name: 'paneer', quantity: '200g' },
    { name: 'potatoes', quantity: '2' },
    { name: 'onion', quantity: '1' },
    { name: 'tomatoes', quantity: '2' },
    { name: 'cream', quantity: '1/4 cup' }
  ],
  usedIngredientCount: 5,
  imageUrl: 'https://via.placeholder.com/400x300.png?text=Malai+Kofta',
  instructions: 'Make koftas from paneer and potatoes, fry them, and cook in a creamy tomato gravy.'
},
{
  title: 'Sambar',
  ingredients: [
    { name: 'lentils', quantity: '1/2 cup' },
    { name: 'tomato', quantity: '1' },
    { name: 'onion', quantity: '1' },
    { name: 'sambar powder', quantity: '1 tbsp' },
    { name: 'tamarind paste', quantity: '1 tbsp' }
  ],
  usedIngredientCount: 5,
  imageUrl: 'https://via.placeholder.com/400x300.png?text=Sambar',
  instructions: 'Cook lentils with tamarind paste, vegetables, and sambar powder, and serve with rice or dosa.'
},
{
  title: 'Naan',
  ingredients: [
    { name: 'all-purpose flour', quantity: '2 cups' },
    { name: 'yeast', quantity: '1 tsp' },
    { name: 'yogurt', quantity: '1/4 cup' },
    { name: 'baking powder', quantity: '1 tsp' },
    { name: 'ghee', quantity: 'for brushing' }
  ],
  usedIngredientCount: 5,
  imageUrl: 'https://via.placeholder.com/400x300.png?text=Naan',
  instructions: 'Knead dough, let it rise, then cook the naan in a tandoor or oven, and brush with ghee.'
},
{
  title: 'Kadhi Pakora',
  ingredients: [
    { name: 'gram flour', quantity: '1 cup' },
    { name: 'yogurt', quantity: '1 cup' },
    { name: 'onion', quantity: '1' },
    { name: 'ginger', quantity: '1-inch piece' },
    { name: 'garam masala', quantity: '1 tsp' }
  ],
  usedIngredientCount: 5,
  imageUrl: 'https://via.placeholder.com/400x300.png?text=Kadhi+Pakora',
  instructions: 'Make pakoras from gram flour, fry them, and cook them in a spiced yogurt gravy.'
},
{
  title: 'Dosa',
  ingredients: [
    { name: 'rice', quantity: '1 cup' },
    { name: 'urad dal', quantity: '1/4 cup' },
    { name: 'fenugreek seeds', quantity: '1/2 tsp' },
    { name: 'salt', quantity: 'to taste' },
    { name: 'oil', quantity: 'for roasting' }
  ],
  usedIngredientCount: 5,
  imageUrl: 'https://via.placeholder.com/400x300.png?text=Dosa',
  instructions: 'Soak rice and urad dal overnight, grind them, ferment, and cook thin crepes on a griddle.'
}



  
  

];

// Connect to MongoDB and insert the data
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .then(async () => {
    await Recipe.deleteMany(); // Optional: Clear existing data if re-seeding
    await Recipe.insertMany(sampleRecipes); // Insert sample recipes
    console.log('Sample recipes added to database!');
    mongoose.disconnect();
  })
  .catch(error => console.error('Error connecting to MongoDB:', error));
