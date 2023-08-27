import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Cards from "../Card/Card";
import derecha from "../../img/derecha.svg";
import izquierda from "../../img/izquierda.svg";

const CardsContainer = () => {
  const recipes = useSelector((state) => state.recipes);
  console.log(recipes);
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
      <div className="d-flex justify-content-between ">
        <Button
          variant="dark"
          onClick={prevPage}
          className="d-flex justify-content-center align-items-center"
          style={{ marginBottom: "20px", marginLeft: "38%" }} // Agrega esta línea para establecer el margen
        >
          <img style={{ width: "40px" }} src={izquierda} alt="" />
          <span>Anterior</span>
        </Button>
        <Button
          variant="dark"
          onClick={nextPage}
          className="d-flex justify-content-center align-items-center"
          style={{ marginBottom: "20px", marginRight: "38%" }} // Agrega esta línea para establecer el margen
        >
          <span>Siguiente</span>
          <img style={{ width: "40px" }} src={derecha} alt="" />
        </Button>
      </div>
    </>
  );
};

export default CardsContainer;
