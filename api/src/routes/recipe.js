const { Router } = require("express");
const recipeRouter = Router();

const {
  getRecipeByID,
  postRecipe,
  getRecipeByName,
} = require("../handlers/recipe");

recipeRouter.get("/:id", getRecipeByID);
recipeRouter.get("/", getRecipeByName);
recipeRouter.post("/", postRecipe);

module.exports = recipeRouter;
