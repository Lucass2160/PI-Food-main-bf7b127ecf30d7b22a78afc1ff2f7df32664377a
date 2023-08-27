import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import getPageDetail from "../../redux/actions";
import style from "./details.module.css";
import loadSpeed from "../../img/loadSpeed.gif";

function Details() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getPageDetail(id));
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch, id]);

  const data = useSelector((state) => state.details);

  if (isLoading) {
    return (
      <div>
        <h1 className={style.loading}>Loading...</h1>
        <img className={style.load} src={loadSpeed} alt="dasds" />
      </div>
    );
  }

  return (
    <div className={style.containerPrincipal}>
      {console.log(data, "esto es data")}
      <div className={style.container} key={data.id}>
        <h1 className={style.name}>{data.name}</h1>
        <p className={style.heal}>Health Score: {data.healthScore}</p>
        <p className={style.diets}>{data.diet}</p>
        <p className={style.summary}>
          {data.summary.replace(/<\/?[^>]+(>|$)/g, "")}
        </p>
        <div className={style.containerStep}>
          {data.steps?.map((e) => {
            return (
              <div className={style.stepContainer}>
                <p className={style.stepNumber}>Step number: {e.number}</p>{" "}
                <p className={style.step}>{e.step}</p>
                {console.log(e.step, "step")}
              </div>
            );
          })}
        </div>
      </div>
      <div className={style.containerImg}>
        <img className={style.img} src={data.image} alt="" />
      </div>
    </div>
  );
}

export default Details;
