import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import Loadingprogramcard from "./Loadingprogramcard";

interface ProgramCard {
  programData: {
    programimage: string;
    responsibleeditor: string;
    id: number;
    description: string;
    socialmediaplatforms: {
      plattform: string;
      plattformul: string;
    }[];
    broadcastinfo: string;
  };
}

export default function ProgramCard({ programData }: ProgramCard) {

  if (!programData) {
    return <Loadingprogramcard />;
  }
  return (
    <>
      <Card key={programData.id} className="m-3" bg="dark" text="white">
        <Card.Img variant="top" src={programData.programimage} height={360} />
        <Card.Body>
          <Card.Title>
            Radiopresentatör : {programData.responsibleeditor}
            <br />
            <div className="d-flex justify-content-between">
              {programData.socialmediaplatforms.map((platform: any) => (
                <Button className=" mt-2" href={platform.platformurl}>
                  {platform.platform}
                </Button>
              ))}
            </div>
          </Card.Title>
          <hr />
          <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
          <Card.Text>
            {programData.description}
            <br />
            <hr />
            {programData.broadcastinfo}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
