import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  orderByaz,
  orderByscore,
  filterBydiet,
  filtercreated,
} from "../../../redux/actions";
import { Button, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";

const Filter = ({ diet, setorder, setscore }) => {
  const dispatch = useDispatch();
  const [selectedDiet, setSelectedDiet] = useState("All");
  const [selectedOrderBy, setSelectedOrderBy] = useState("Order");
  const [selectedOrderScore, setSelectedOrderScore] =
    useState("Order By Score");
  const [selectedCreated, setSelectedCreated] = useState("Created Filter");

  const handleOderByname = (value, label) => {
    dispatch(orderByaz(value));
    setorder(value);
    setSelectedOrderBy(label);
  };

  const handleOrderScore = (value, label) => {
    dispatch(orderByscore(value));
    setscore(value);
    setSelectedOrderScore(label);
  };

  const handleFilterDiets = (value, label) => {
    dispatch(filterBydiet(value));
    setSelectedDiet(label);
  };

  const handleFilterCreated = (value, label) => {
    dispatch(filtercreated(value));
    setSelectedCreated(label);
  };

  const handleClick = () => {
    window.location.reload(false);
  };

  return (
    <div className="container mt-3">
      <Row>
        <Col md={3} className="mb-2">
          <DropdownButton
            id="order-by-name"
            title={selectedOrderBy}
            variant="Secondary"
          >
            <Dropdown.Item onClick={() => handleOderByname("asc", "A-Z")}>
              A-Z
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleOderByname("des", "Z-A")}>
              Z-A
            </Dropdown.Item>
          </DropdownButton>
        </Col>
        <Col md={3} className="mb-2">
          <DropdownButton
            id="filter-diet"
            title={`Diet Filter: ${selectedDiet}`}
            variant="Secondary"
          >
            <Dropdown.Item onClick={() => handleFilterDiets("all", "All")}>
              All
            </Dropdown.Item>
            {diet.map((el) => (
              <Dropdown.Item
                key={el}
                onClick={() => handleFilterDiets(el, el.toUpperCase())}
              >
                {el.toUpperCase()}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>
        <Col md={3} className="mb-2">
          <DropdownButton
            id="order-by-score"
            title={selectedOrderScore}
            variant="Secondary"
          >
            <Dropdown.Item onClick={() => handleOrderScore("asc", "Lower")}>
              Lower
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleOrderScore("des", "Higher")}>
              Higher
            </Dropdown.Item>
          </DropdownButton>
        </Col>
        <Col md={3} className="mb-2">
          <DropdownButton
            id="filter-created"
            title={selectedCreated}
            variant="Secondary"
          >
            <Dropdown.Item onClick={() => handleFilterCreated("all", "All")}>
              All
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleFilterCreated("api", "Api")}>
              Api
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => handleFilterCreated("created", "Created")}
            >
              Created
            </Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>

      <Button
        style={{ marginTop: "-45px" }}
        className="btn float-end"
        onClick={handleClick}
      >
        Reset Filter
      </Button>
    </div>
  );
};

export default Filter;
