import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import Loadingprogramcard from "./Loadingprogramcard";
import { Link } from "react-router-dom";

interface ProgramCard {
  programData: {
    programimage: string;
    responsibleeditor: string;
    id: number;
    description: string;
    socialmediaplatforms: {
      plattform: string;
      plattformurl: string;
    }[];
    programurl: string;
    broadcastinfo: string;
    channel: {
      name: string;
      id: number;
    };
  };
}

export default function ProgramCard({ programData }: ProgramCard) {

  if (!programData) {
    return <Loadingprogramcard />;
  }
  
  return (
    <>
      <Card key={programData.id} className="m-3" bg="dark" text="white">
        <a href={programData.programurl} target="_blank">
          <Card.Img variant="top" src={programData.programimage} height={360} />
        </a>
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
      <h4 className="text-white text-center">Programmet hittar du:</h4>
      <hr />
      <Link to={`/Channels/Channel/${programData.channel.id}`}>
        <Button className="p-2 m-2">{programData.channel.name}</Button>
      </Link>
    </>
  );
}
