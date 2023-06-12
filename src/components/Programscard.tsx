import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import ToggleIconProgram from "./FavoriteProgramicon.tsx";

interface ProgramsCard {
  program: {
    programimage: string;
    title: string;
    programcategory: {
      name: string;
    };
    id: number;
    name: string;
    starttimeutc: string;
    endtimeutc: string;
    description: string;
  };
}

export default function ProgramCards({ program }: ProgramsCard) {
  return (
    <>
      <Card key={program.id} className="m-2 " bg="dark" text="white">
        <Link to={`/Programs/Program/${program.id}`} state={program}>
          <Card.Img
            variant="top"
            src={program.programimage}
            height={360}
            loading="lazy"
          />
        </Link>
        <Card.Body id="Cardbody">
          <Card.Title className="d-flex align-items-center justify-content-between">
            {program.name}
            <ToggleIconProgram program={program} />
          </Card.Title>
          <hr/>
          <Card.Text>{program.description}</Card.Text>
          <hr/>
        </Card.Body>
      </Card>
    </>
  );
}
