import { Placeholder, Card } from "react-bootstrap";
import imageHolderIcon from "../assets/image-holder-icon-614x460.png";

const Loadingprogramcard = () => {
  return (
    <>
      <Card className="m-3" bg="dark" text="white">
        <Card.Img variant="top" src={imageHolderIcon} height={360} />
        <Card.Body>
          <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={6} /> : <Placeholder xs={4} />
            <br />
            <div className="d-flex justify-content-between mt-2">
              <Placeholder.Button variant="primary" xs={3} />
              <Placeholder.Button variant="primary" xs={3} />
              <Placeholder.Button variant="primary" xs={3} />
            </div>
          </Placeholder>
          <hr />
          <Placeholder
            as={Card.Subtitle}
            animation="glow"
          >
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <br />
            <hr />
            <Placeholder xs={6} />
          </Placeholder>
        </Card.Body>
      </Card>
    </>
  );
};

export default Loadingprogramcard;
