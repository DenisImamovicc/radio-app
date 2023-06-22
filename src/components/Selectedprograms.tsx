import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import ProgramCards from "./Programscard";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";

function Selectedprograms() {
  const [randomNum, setrandomNum] = useState<number>(
    Math.floor(Math.random() * 200) + 1
  );

  const { data, isLoading } = useFetch(
    `https://api.sr.se/api/v2/programs/index?format=json&page=${randomNum}&size=6`
  );

  useEffect(() => {
    isLoading === false && data.programs.length === 0
      ? setrandomNum(Math.floor(Math.random() * 200) + 1)
      : "";
  }, [isLoading]);

  if (isLoading || !data)
    return (
      <div className="d-flex justify-content-center mh-50 align-items-center">
        <Spinner animation="border" variant="light" />
      </div>
    );

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
