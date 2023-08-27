import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getAllDiet } from "../../redux/actions";
import validate from "./validacionForm";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  FormControl,
  FormGroup,
  Alert,
} from "react-bootstrap";

const FormComponent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDiet());
  }, [dispatch]);

  const data = useSelector((state) => state.diets);

  const [form, setForm] = useState({
    name: "",
    healthScore: 50,
    summary: "",
    image: "",
    diets: [],
    steps: [],
  });

  const [error, setError] = useState({ ...form });

  const changeHandlerDietas = (event) => {
    const { name, value, checked } = event.target;
    setForm((prevForm) => {
      const updatedProperty = checked
        ? [...prevForm[name], value]
        : prevForm[name].filter((item) => item !== value);

      const updatedForm = { ...prevForm, [name]: updatedProperty };

      setError(validate(updatedForm));

      return updatedForm;
    });
  };

  const changeHandler = (event) => {
    setError(validate({ ...form, [event.target.name]: event.target.value }));
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const [setpp, setsepp] = useState({
    steps: "",
  });

  const changeHandlersetpp = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setsepp({ ...setpp, [property]: value });
  };

  const [stepsArr, setSteps] = useState([]);

  const addStep = (event) => {
    event.preventDefault();
    const newStep = { number: stepsArr.length + 1, step: setpp.steps };
    setSteps([...stepsArr, newStep]);
    setForm({ ...form, steps: [...stepsArr, newStep] });
  };

  const [count, setCount] = useState("");

  useEffect(() => {
    const lastNumber = stepsArr[stepsArr.length - 1]?.number;
    if (lastNumber) {
      setCount(lastNumber);
    }
  }, [stepsArr]);

  const submitHandler = (event) => {
    setError(validate({ ...form, form }));
    event.preventDefault();
    if (!Object.keys(error).length) {
      axios
        .post("http://localhost:3001/recipes", form)
        .then(() => alert("The recipe was created successfully"))
        .catch((error) => console.error("Error:", error));
    } else {
      alert("Complete the required fields (*)");
    }
  };

  return (
    <Container
      style={{ backgroundColor: "grey", borderRadius: "6px", marginTop: "10%" }}
    >
      <Row className="mt-3 container">
        <Col>
          <Form onSubmit={submitHandler}>
            <FormGroup className="mincontainer">
              <Form.Label className="name">Recipe name *:</Form.Label>
              <FormControl
                type="text"
                onChange={changeHandler}
                name="name"
                className="input"
              />
            </FormGroup>

            {error.name && <Alert variant="danger" style={{marginTop:"5px"}}>{error.name}</Alert>}

            <FormGroup className="mincontainer">
              <Form.Label className="name">Health Score* :</Form.Label>
              <Form.Control
                type="range"
                max={100}
                min={1}
                value={form.healthScore}
                onChange={changeHandler}
                name="healthScore"
                className="input"
              />
            </FormGroup>

            <FormGroup className="mincontainer">
              <Form.Label className="name">Summary* :</Form.Label>
              <FormControl
                type="text"
                value={form.summary}
                onChange={changeHandler}
                name="summary"
                className="input"
              />
            </FormGroup>

            {error.summary &&  <Alert variant="danger" style={{marginTop:"5px"}}>{error.summary}</Alert>}

            <FormGroup className="mincontainer">
              <Form.Label className="name">Image:</Form.Label>
              <FormControl
                type="text"
                value={form.image}
                onChange={changeHandler}
                name="image"
                className="input"
              />
            </FormGroup>

            <p className="selecDiets">Select the diets:</p>

            {error.diets && <p className="errors">{error.diets}</p>}

            <div className="checkBox d-flex">
              {data.map((diet) => (
                <FormGroup key={diet} className="checkchic">
                  <Form.Check
                    type="checkbox"
                    value={diet}
                    onChange={changeHandlerDietas}
                    name="diets"
                    label={diet}
                  />
                </FormGroup>
              ))}
            </div>

            <Button className="enviar" type="submit">
              ENVIAR
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FormComponent;
