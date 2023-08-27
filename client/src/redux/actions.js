import axios from "axios";
export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPE_DETAIL = "GET_RECIPE_DETAIL";
export const SEARCH_NAME_RECYPE = "SEARCH_NAME_RECYPE";
export const SET_ERROR = "SET_ERROR";
export const GET_ALL_DIET = "GET_ALL_DIET";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_SCORE = "ORDER_BY_SCORE";
export const FILTER_BY_DIET = "FILTER_BY_DIET";
export const FILTER_DB_OR_API = "FILTER_DB_OR_API";

export const getRecipes = () => {
  return async function (dispatch) {
    const recipes = await axios.get("http://localhost:3001/recipes");
    dispatch({ type: GET_RECIPES, payload: recipes.data });
  };
};

function getPageDetail(id) {
  return async function (dispatch) {
    const response = await axios.get(`http://localhost:3001/recipes/${id}`);
    dispatch({ type: GET_RECIPE_DETAIL, payload: response.data });
  };
}

export function getAllDiet() {
  return async function (dispatch) {
    try {
      var dietas = await axios.get("http://localhost:3001/diets");
      return dispatch({
        type: GET_ALL_DIET,
        payload: dietas.data,
      });
    } catch (error) {
      console.log("No se han podido cargar las dietas");
    }
  };
}

export function orderByaz(order) {
  return {
    type: ORDER_BY_NAME,
    payload: order,
  };
}

export function orderByscore(score) {
  return {
    type: ORDER_BY_SCORE,
    payload: score,
  };
}

export function filterBydiet(diet) {
  console.log(diet, "diet de actions");
  return {
    type: FILTER_BY_DIET,
    payload: diet,
  };
}

export function filtercreated(data) {
  return {
    type: FILTER_DB_OR_API,
    payload: data,
  };
}

export default getPageDetail;
