import { useState } from "react";
import axios from "axios";
import Card from "../Card/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SearchBar = () => {
  const [recipes, setRecipes] = useState([]);
  console.log(recipes, "recipes");

  const [search, setSearch] = useState("");

  const reset = () => {
    return window.location.reload();
  };

  const [error, setError] = useState(null);

  const buscar = async (search) => {
    if (search === "") {
      alert("Ingrese una receta");
    } else {
      await axios
        .get(`http://localhost:3001/recipes?name=${search}`)
        .then((res) => {
          setRecipes(res.data);
        })
        .catch((err) => {
          setError("No se encontro en la base de datos");
        });
    }
  };

  /** MANEJADORES DE EVENTOS **/
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    buscar(search);
    setSearch("");
  };

  return (
    <>
      <Form inline>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search recipe"
              value={search}
              onChange={handleChange}
            />
          </Col>
          <Col xs="auto">
            <Button
              type="submit"
              value="Search"
              onClick={submitHandler}
              variant="danger"
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
      <div>
        {error ? (
          <p> {error} </p>
        ) : (
          recipes?.map((elemento) => {
            return (
              <Card
                key={elemento.id}
                name={elemento.name}
                image={elemento.image}
                diets={elemento.diets}
              />
            );
          })
        )}
      </div>

      {Object.keys(recipes).length > 0 ? (
        <input type="submit" onClick={reset} value="X" />
      ) : null}
    </>
  );
};

export default SearchBar;
