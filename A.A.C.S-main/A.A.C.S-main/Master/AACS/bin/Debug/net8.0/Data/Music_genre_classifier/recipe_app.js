const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/recipes', { useNewUrlParser: true, useUnifiedTopology: true });

const recipeSchema = new mongoose.Schema({
  name: String,
  ingredients: [String],
  instructions: String,
  cuisine: String,
  dietary: [String],
});

const Recipe = mongoose.model('Recipe', recipeSchema);

app.get('/recipes', async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

app.listen(3000, () => console.log('Server running on port 3000'));