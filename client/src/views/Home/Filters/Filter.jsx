import React from "react";
import { useDispatch } from "react-redux";
import {
  orderByaz,
  orderByscore,
  filterBydiet,
  filtercreated,
} from "../../../redux/actions";
import "./filter.css"; // Mantén tus estilos personalizados
import { Form, Button, Row, Col } from "react-bootstrap"; // Importa componentes de Bootstrap

const Filter = ({ diet, setorder, setscore }) => {
  const dispatch = useDispatch();

  const handleOderByname = (e) => {
    const value = e.target.value;
    dispatch(orderByaz(value));
    setorder(value);
  };

  const handleOrderScore = (e) => {
    const value = e.target.value;
    dispatch(orderByscore(value));
    setscore(value);
  };

  const handleFilterDiets = (e) => {
    const value = e.target.value;
    dispatch(filterBydiet(value));
  };

  const handleFilterCreated = (e) => {
    const value = e.target.value;
    dispatch(filtercreated(value));
  };

  const handleClick = () => {
    window.location.reload(false);
  };

  return (
    <div className="container mt-3">
      <Row>
        <Col md={3} className="mb-2">
          <Form.Control as="select" onChange={handleOderByname}>
            <option value="asc">A-Z</option>
            <option value="des">Z-A</option>
          </Form.Control>
        </Col>
        <Col md={3} className="mb-2">
          <Form.Control as="select" onChange={handleFilterDiets}>
            <option value="all">All</option>
            {diet.map((el) => (
              <option value={el} key={el}>
                {el.toUpperCase()}
              </option>
            ))}
          </Form.Control>
        </Col>
        <Col md={3} className="mb-2">
          <Form.Control as="select" onChange={handleOrderScore}>
            <option value="asc">Lower</option>
            <option value="des">Higher</option>
          </Form.Control>
        </Col>
        <Col md={3} className="mb-2">
          <Form.Control as="select" onChange={handleFilterCreated}>
            <option value="all">All</option>
            <option value="api">Api</option>
            <option value="created">Created</option>
          </Form.Control>
        </Col>
        <Col md={3} className="mb-2">
          <Button className="rest mt-2" onClick={handleClick}>
            Reset Filter
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Filter;
