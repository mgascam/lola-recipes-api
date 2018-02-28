const Recipe = require('../models/recipe');

exports.create = (req, res) => {
  // Create and save a new Recipe
  if (!req.body.content) {
      return res.status(400).send({message: 'Recipe can not be empty'});
  }

  const recipe = new Recipe({
      title: req.body.title || 'Untitled Recipe',
      content: req.body.content || 'Empty'
  });

  recipe.save((err, data) => {
     if (err) {
         console.error(err);
         res.status(500).send({message: 'Error occurred while creating Recipe'});
     } else {
         res.send(data);
     }
  });
};

exports.findAll = (req, res) => {
    // Retrieve and return all recipes from the database
    Recipe.find((err, recipes) => {
        if (err) {
            console.error(err);
            res.status(500).send({message: 'Error occurred while retrieving recipes'});
        } else {
            res.send(recipes);
        }
    })
};

exports.findOne = (req, res) => {
    // Find a single recipe with recipeId
    Recipe.findById(req.params.recipeId, (err, recipe) => {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Recipe not found with id " + req.params.recipeId});
            }
            return res.status(500).send({message: "Error retrieving recipe with id " + req.params.recipeId});
        }

        if(!recipe) {
            return res.status(404).send({message: "Recipe not found with id " + req.params.recipeId});
        }

        res.send(recipe);
    });
};

exports.update = (req, res) => {
    // Update a single recipe with recipeId
    Recipe.findById(req.params.recipeId, (err, recipe) => {
        if (err) {
            console.log(err);
            if (err.kind === 'ObjectId') {
                return res.status(404).send({message: "Recipe not found with id " + req.params.recipeId});
            }
            return res.status(500).send({message: "Error retrieving recipe with id " + req.params.recipeId});
        }

        if (!recipe) {
            return res.status(404).send({message: "Recipe not found with id " + req.params.recipeId});
        }

        recipe.title = req.body.title;
        recipe.content = req.body.content;

        recipe.save((err, data) => {
            if (err) {
                res.status(500).send({message: "Could not update recipe with id " + req.params.recipeId})
            } else {
                res.send(data);
            }
        });
    });
};

exports.delete = (req, res) => {
    // Delete a single recipe with recipeId
    Recipe.findByIdAndRemove(req.params.recipeId, (err, recipe) => {
        if (err) {
            console.log(err);
            if (err.kind === 'ObjectId') {
                return res.status(404).send({message: "Recipe not found with id " + req.params.recipeId});
            }
            return res.status(500).send({message: "Error removing recipe with id " + req.params.recipeId});
        }

        if (!recipe) {
            return res.status(404).send({message: "Recipe not found with id " + req.params.recipeId});
        }

        res.send({message: 'Recipe deleted successfully'})
    });
};