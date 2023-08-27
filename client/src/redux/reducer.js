import { GET_RECIPES } from "./actions";
import { GET_RECIPE_DETAIL } from "./actions";
import { SEARCH_NAME_RECYPE } from "./actions";
import { GET_ALL_DIET } from "./actions";
import { FILTER_BY_DIET } from "./actions";
import { FILTER_DB_OR_API } from "./actions";
import { ORDER_BY_NAME } from "./actions";
import { ORDER_BY_SCORE } from "./actions";

const initialState = {
  recipes: [],
  allRecipes: [],
  details: {},
  diets: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return { ...state, recipes: action.payload, allRecipes: action.payload };

    case GET_RECIPE_DETAIL:
      return { ...state, details: action.payload };

    case SEARCH_NAME_RECYPE: {
      return {
        ...state,
        recipes: action.payload,
      };
    }

    case GET_ALL_DIET: {
      return {
        ...state,
        diets: action.payload,
      };
    }

    case ORDER_BY_NAME:
      let sortAsc = action.payload === "asc";
      const sortedRecipes = state.recipes.slice().sort(function (a, b) {
        if (a.name > b.name) {
          return sortAsc ? 1 : -1;
        }
        if (a.name < b.name) {
          return sortAsc ? -1 : 1;
        }
        return 0;
      });
      return {
        ...state,
        recipes: sortedRecipes,
        allRecipes: sortedRecipes,
      };

    case ORDER_BY_SCORE: {
      const sortAsc = action.payload === "asc";
      const sortedRecipes = state.recipes.slice().sort(function (a, b) {
        if (a.healthScore > b.healthScore) {
          return sortAsc ? 1 : -1;
        }
        if (a.healthScore < b.healthScore) {
          return sortAsc ? -1 : 1;
        }
        return 0;
      });

      return {
        ...state,
        recipes: sortedRecipes,
        allRecipes: sortedRecipes,
      };
    }

    case FILTER_BY_DIET:
      const all = state.allRecipes;
      const recipesFilterdiet =
        action.payload === "all"
          ? all
          : all.filter((el) => el.diets.includes(action.payload));
      return {
        ...state,
        recipes: [...recipesFilterdiet],
      };

    case FILTER_DB_OR_API: {
      const allcreated = state.allRecipes;
      const createFilter = allcreated.filter((el) => el.id.length > 30);
      const apiFilter = allcreated.filter((el) => typeof el.id === "number");
      console.log(action.payload);

      let filteredRecipes = [];
      if (action.payload === "all") {
        filteredRecipes = state.allRecipes;
      } else if (action.payload === "created") {
        filteredRecipes = createFilter;
      } else if (action.payload === "api") {
        filteredRecipes = apiFilter;
      }

      return {
        ...state,
        recipes: filteredRecipes,
      };
    }

    default:
      return state;
  }
};

export default rootReducer;
