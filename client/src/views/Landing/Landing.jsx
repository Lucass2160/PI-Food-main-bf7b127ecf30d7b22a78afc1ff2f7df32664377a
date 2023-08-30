import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import img from "../../img/la.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Landing = () => {
  return (
    <Container
      className={`d-flex flex-column justify-content-center align-items-center`}
    >
      <Row className={`mb-3`}>
        <img src={img} alt="" />
      </Row>
      <Row className={`mb-3 `}>
        <Col className="text-center">
          <Link to="/home">
            <Button variant="danger">Primary</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Landing;
