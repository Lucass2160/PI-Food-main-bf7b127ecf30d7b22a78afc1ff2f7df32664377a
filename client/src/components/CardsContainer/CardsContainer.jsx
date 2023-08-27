import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";
import Cards from "../Card/Card";

const CardsContainer = () => {
  const recipes = useSelector((state) => state.recipes);
  const [currentPage, setCurrentPage] = useState(0);
  const recipesPerPage = 9;
  const filterRecipes = recipes.slice(
    currentPage,
    currentPage + recipesPerPage
  );

  const nextPage = () => {
    if (currentPage + recipesPerPage < recipes.length) {
      setCurrentPage(currentPage + recipesPerPage);
      window.scrollTo(0, 100);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - recipesPerPage);
      window.scrollTo(0, 100);
    }
  };

  return (
    <>
      <div className="row">
        {filterRecipes.map((recipe) => (
          <div className="col-md-4 mb-4" key={recipe.id}>
            <Cards
              name={recipe.name}
              image={recipe.image}
              diets={recipe.diets}
              resumen={recipe.summary}
              id={recipe.id}
            />
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-between">
        <Button variant="light" onClick={prevPage}>
          Anterior
          <svg
            width="40px"
            height="40px"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.5 17L10 12.5L14.5 8"
              stroke="#121923"
              strokeWidth="1.2"
            />
          </svg>
        </Button>
        <Button variant="light" onClick={nextPage}>
          Siguiente
          <svg
            width="40px"
            height="40px"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.5 8L15 12.5L10.5 17"
              stroke="#121923"
              strokeWidth="1.2"
            />
          </svg>
        </Button>
      </div>
    </>
  );
};

export default CardsContainer;
