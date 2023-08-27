import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const Cards = ({ name, image, diets, resumen, id }) => {
  function primeraLetraMayusculaYComa(array) {
    return array?.map(function (elemento, index) {
      if (index === array.length - 1) {
        return elemento.charAt(0).toUpperCase() + elemento.slice(1);
      } else {
        return elemento.charAt(0).toUpperCase() + elemento.slice(1) + ",";
      }
    });
  }
  return (
    <Card className="mh-auto h-100">
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title
          className="mw-1"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {name}
        </Card.Title>

        <Card.Text className="card-text">
          {resumen.split(" ").slice(0, 15).join(" ")} ...
        </Card.Text>
        <div className="mt-2 mb-1 d-flex align-items-center justify-content-center ">
          <Link to={`/recipes/${id}`}>
            <Button className="btn-view-more" variant="light">
              View more
            </Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Cards;
