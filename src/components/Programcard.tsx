import Card from "react-bootstrap/Card";
import Loadingprogramcard from "./Loadingprogramcard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faTwitter,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import ToggleIconProgram from "./FavoriteProgramicon";

interface ProgramCard {
  programData: {
    name: string;
    programimage: string;
    responsibleeditor: string;
    id: number;
    description: string;
    socialmediaplatforms: {
      plattform: string;
      platformurl: string;
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
  const socialMediaIcons: any[] = [faFacebook, faTwitter, faInstagram];

  if (!programData) {
    return <Loadingprogramcard />;
  }
  console.log(programData);
  
  return (
    <>

      <Card key={programData.id} className="m-3" bg="dark" text="white">
        <a href={programData.programurl} target="_blank">
          <Card.Img variant="top" src={programData.programimage} height={360} />
        </a>
        <Card.Body>
          <Card.Title className="d-flex align-items-center justify-content-between">
            Radiopresentatör : <br />{programData.responsibleeditor}<ToggleIconProgram program={programData}/>
          </Card.Title> 
          <hr />
          <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
          <Card.Text>
            {programData.description}
            <br />
            <br />
            {programData.broadcastinfo}
            <hr />
            <div className="d-flex justify-content-evenly">
              {programData.socialmediaplatforms.map(
                (platform, index: number) => (
                  <a
                    href={platform.platformurl}
                    target="blank"
                    className="text-light"
                  >
                    <FontAwesomeIcon
                      className=" mt-2"
                      icon={socialMediaIcons[index]}
                    />
                  </a>
                )
              )}
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
