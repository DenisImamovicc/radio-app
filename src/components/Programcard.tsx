import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

interface ProgramCard {
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

export default function ProgramCard({ program }: ProgramCard) {
  return (
    <>
      <Card key={program.id} className="m-3 " bg="dark" text="white">
        <Link to={"/Programs/Program"} state={program}>
          <Card.Img
            variant="top"
            src={program.programimage}
            height={360}
            loading="lazy"
          />
        </Link>
        <Card.Body>
          <Card.Title>
            {program.name} - {program.programcategory?.name}
          </Card.Title>
          <Card.Text>{program.description}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
