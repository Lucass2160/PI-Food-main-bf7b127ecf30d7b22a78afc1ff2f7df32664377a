const {
  getIdRecipeController,
  postRecipeController,
  getNameRecipeController,
} = require("../controllers/recipe.js");

const getRecipeByID = async (req, res) => {
  try {
    const id = req.params.id;
    const idRecipe = await getIdRecipeController(id);
    res.status(200).json(idRecipe);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const postRecipe = async (req, res) => {
  try {
    const objRecipe = req.body;
    const newRecipe = await postRecipeController(objRecipe);
    res.status(201).send(newRecipe);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "no se pudo crear" });
  }
};

const getRecipeByName = async (req, res) => {
  try {
    const { name } = req.query;
    const nameRecipe = await getNameRecipeController(name);
    res.status(200).json(nameRecipe);
  } catch (error) {
    res.status(404).json({ error: "no se encontro" });
  }
};

module.exports = {
  getRecipeByID,
  postRecipe,
  getRecipeByName,
};
