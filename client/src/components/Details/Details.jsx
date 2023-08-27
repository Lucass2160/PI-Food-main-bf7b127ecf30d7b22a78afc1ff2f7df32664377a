import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import getPageDetail from "../../redux/actions";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

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
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div>
          <h1>Loading...</h1>
          <img src={loadSpeed} alt="Loading..." />
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 mb-5">
      <Card style={{ width: "50%", display: "flex", margin: "20px" }}>
        <Card.Body style={{ width: "100%" }}>
          <Card.Title>{data.name}</Card.Title>
          <Card.Text>Health Score: {data.healthScore}</Card.Text>
          <Card.Text>{data.diet}</Card.Text>
          <Card.Text>{data.summary.replace(/<\/?[^>]+(>|$)/g, "")}</Card.Text>
        </Card.Body>
      </Card>
      <Image src={data.image} rounded style={{ margin: "20px" }} />
    </div>
  );
}

export default Details;
