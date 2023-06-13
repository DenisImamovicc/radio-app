import useFetch from "../hooks/useFetch";
import { useState } from "react";
import ProgramCards from "./Programscard";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";

function Selectedprograms() {
  const [randomNum] = useState<number>(Math.floor(Math.random() * 200) + 1);

  const { data, isLoading } = useFetch(
    `https://api.sr.se/api/v2/programs/index?format=json&page=${randomNum}&size=6`
  );

  if (isLoading || !data)
    return (
      <div className="d-flex justify-content-center mh-50 align-items-center">
        <Spinner animation="border" variant="light" />
      </div>
    );

    if (!data.programs.length)
    return (
      <div className="d-flex justify-content-center mh-50 align-items-center flex-column">
        <Spinner animation="border" variant="light" />
        <h2 className="text-light">Ingen data hittad,ladda om sidan.</h2>
      </div>
    );

  console.log(data);

  return (
    <div className="">
      <Container className="d-flex flex-column align-items-start">
        <h2 className="mx-2 text-light">Utvalda Program</h2>
        <Row xs={1} md={2} lg={3}>
          {data.programs &&
            data.programs.map((program: any) => (
              <Col>
                <ProgramCards program={program} />
              </Col>
            ))}
        </Row>
        <Button variant="dark" className="m-2">
          <Link to={`/Programs`} className="text-light">
            Ta mig till flera program
          </Link>
        </Button>
      </Container>
    </div>
  );
}

export default Selectedprograms;
