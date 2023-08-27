const axios = require("axios");
const { Recipe, Diets } = require("../db");
const { dbApi } = require("../controllers/mapeos");
const { API_KEY } = process.env;

const getIdRecipeController = async (id) => {
  if (id.includes("-")) {
    const dbRecipe = await Recipe.findByPk(id, {
      include: {
        model: Diets,
        attributes: ["name"],
      },
    });
    return {
      id: dbRecipe.id,
      name: dbRecipe.name,
      steps: dbRecipe.steps,
      image: dbRecipe.image,
      summary: dbRecipe.summary,
      healthScore: dbRecipe.healthScore,
    };
  } else {
    const { data } = await axios(
      `https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`
    );
    return {
      id: data.id,
      name: data.title,
      image: data.image,
      summary: data.summary,
      healthScore: data.healthScore,
      steps: data.analyzedInstructions[0]?.steps.map((e) => {
        return {
          number: e.number,
          step: e.step,
        };
      }),
    };
  }
};

const postRecipeController = async (objRecipe) => {
  try {
    const { name, summary, healthScore, steps, image, diets } = objRecipe;
    const recipe = {
      name,
      image,
      healthScore,
      summary,
      steps,
    };

    const createRecipe = await Recipe.create(recipe);

    for (let diet of diets) {
      const dieta = await Diets.findOne({ where: { name: diet } });
      await createRecipe.addDiets(dieta);
    }

    return createRecipe;
  } catch (error) {
    throw Error("No se creo");
  }
};

const getNameRecipeController = async (name) => {
  try {
    if (name) {
      const searchRecipe = await dbApi();
      const result = searchRecipe.filter((element) =>
        element.name.toLowerCase().includes(name.toLowerCase())
      );
      if (result.length) return result;
    } else {
      const all = await dbApi();
      return all;
    }
    throw new Error("no hay info de la receta");
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getIdRecipeController,
  postRecipeController,
  getNameRecipeController,
};
