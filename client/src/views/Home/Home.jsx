import React, { useEffect, useState } from "react";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useSelector, useDispatch } from "react-redux";
import { getAllDiet, getRecipes } from "../../redux/actions";
import Filter from "./Filters/Filter";
import loadings from "../../img/loading.gif";

const Home = () => {
  const allDiet = useSelector((state) => state.diets);
  console.log(allDiet, "dietas");

  const [order, setOrder] = useState("");
  const [score, setScore] = useState("");
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipes())
      .then(() => setLoading(false))
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

    dispatch(getAllDiet());
  }, [dispatch]);

  return (
    <div  className="container">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <img
            src={loadings}
            style={{ width: "6rem", height: "6rem" }}
            alt="Loading"
          />
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <Filter diet={allDiet} setorder={setOrder} setscore={setScore} />
          </div>
          <CardsContainer />
        </div>
      )}
    </div>
  );
};

export default Home;
