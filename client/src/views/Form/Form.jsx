import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllDiet } from "../../redux/actions";
import validate from "./validacionForm";
import "./form.css";





const Form = () => {
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

  console.log(form);

  const [error, setError] = useState({
    ...form,
  });


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
    console.log(event.target.value, "SOY EL STRING");
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
  console.log(stepsArr, "abc");
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
        .then(() => alert("The recipe was created successfully"));
    } else {
      alert("Complete the required fields (*)");
    }
  };

  return (
    <>
      <div className="containerPrincipal">
        <div className="subDiv">
          <form className="subcontainerIzquierdo" onSubmit={submitHandler}>
            <div className="mincontainer">
              <label className="name">Recipe name *:</label>
              <input
                type="text"
                onChange={changeHandler}
                name="name"
                className="input"
              />
            </div>

            {error.name && <p className="errors">{error.name}</p>}

            <div className="mincontainer">
              <label className="name">Health Score* :</label>
              <input
                type="range"
                max={100}
                min={1}
                value={form.healthScore}
                onChange={changeHandler}
                name="healthScore"
                className="input"
              />
            </div>

            <div className="mincontainer">
              <label className="name">Summary* :</label>
              <input
                type="text"
                value={form.summary}
                onChange={changeHandler}
                name="summary"
                className="input"
              />
            </div>

            {error.summary && <p className="errors">{error.summary}</p>}

            <div className="mincontainer">
              <label className="name">Image:</label>
              <input
                type="text"
                value={form.image}
                onChange={changeHandler}
                name="image"
                className="input"
              />
            </div>

            <p className="selecDiets">Select the diets *:</p>

            {error.diets && <p className="errors">{error.diets}</p>}

            <div className="checkBox">
              {data.map((diet) => {
                return (
                  <div key={diet} className="checkchic">
                    <input
                      type="checkbox"
                      value={diet}
                      onChange={changeHandlerDietas}
                      name="diets"
                    />
                    <label>{diet}</label>
                  </div>
                );
              })}
            </div>

            <button className="enviar" type="submit">
              ENVIAR
            </button>
          </form>

          <form className="mincontainerSteps" onSubmit={addStep}>
            <div>
              <label className="name">Steps: {count + 1} </label>
              <input
                type="text"
                value={setpp.steps}
                onChange={changeHandlersetpp}
                name="steps"
                className="input"
              />
            </div>
            <div>
              <button className="enviar2" type="submit">
                Add step
              </button>
            </div>
          </form>
        </div>

        <div className="subcontainerDerecho">
          <img src="../../img/food.png" alt="" />
        </div>
      </div>
    </>
  );
};

export default Form;
