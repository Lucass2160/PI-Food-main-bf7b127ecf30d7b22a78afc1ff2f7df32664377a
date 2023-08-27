import { Link } from "react-router-dom";
import style from "./landing.module.css";
const Landing = () => {
  return (
    <div className={style.fondo}>
      <div className={style.link_container}>
        <h1 className={style.text}>FOODS</h1>
        <Link className={style.link_button} to="/home">
          <button className="button">Home</button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
