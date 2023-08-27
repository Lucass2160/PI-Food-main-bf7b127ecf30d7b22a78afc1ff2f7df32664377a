const axios = require("axios");
const { Recipe, Diets } = require("../db");
const { API_KEY } = process.env;

searchInApi = async () => {
  try {
    // const searchInApiRequest = await axios(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`)
    //https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100
    const searchInApiRequest = await axios(
      `https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`
    );
    // PARA LOS LLAMADOS LIMITADOS, USAR ESTO PARA LA CORRECCION

    let info = await searchInApiRequest.data.results?.map((element) => {
      return {
        id: element.id,
        name: element.title,
        image: element.image,
        diets: element.diets?.map((element) => element),
        healthScore: element.healthScore,
        summary: element.summary.replaceAll(/<(“[^”]”|'[^’]’|[^'”>])*>/g, ""),
        steps: element.analyzedInstructions[0]?.steps
          .map((element) => `${element.number} ${element.step}`)
          .join(" "),
      };
    });
    return info;
  } catch (error) {
    error.message;
  }
};

//mapeo la db
const searchInDb = async () => {
  try {
    const searchDb = await Recipe.findAll({
      include: {
        model: Diets,
        atributes: ["name"],
        through: {
          atributes: [],
        },
      },
    });

    let infoDb = await searchDb?.map((element) => {
      return {
        id: element.id,
        name: element.name,
        image: element.image,
        healthScore: element.healthScore,
        diets: element.diets?.map((element) => element.name),
        summary: element.summary,
        steps: element.steps,
      };
    });
    return infoDb;
  } catch (error) {
    return error;
  }
};

// junto api y db
const dbApi = async () => {
  try {
    const api = await searchInApi();
    // console.log(await api);
    const db = await searchInDb();
    // console.log("DB DATA", db);
    const dbapi = api.concat(db);
    // console.log("DbConcta", dbApi);
    return dbapi;
  } catch (error) {
    return error;
  }
};

module.exports = { dbApi };
