module.exports = (app) => {
    const recipes = require('../controllers/recipe');

    // Create a new Recipe
    app.post('/recipes', recipes.create);

    // Retrieve all Recipes
    app.get('/recipes', recipes.findAll);

    // Retrieve a single Recipe with recipeId
    app.get('/recipes/:recipeId', recipes.findOne);

    // Update a single Recipe with recipeId
    app.put('/recipes/:recipeId', recipes.update);

    // Delete a single recipe with recipeId
    app.delete('/recipes/:recipeId', recipes.delete);
};