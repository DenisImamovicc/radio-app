import Card from "react-bootstrap/Card";
import Loadingprogramcard from "./Loadingprogramcard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faTwitter,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import FavoriteIcon from "./FavoriteIcon";

interface ProgramCard {
  program: {
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

export default function ProgramCard({ program }: ProgramCard) {
  const socialMediaIcons: any[] = [faFacebook, faTwitter, faInstagram];

  if (!program) {
    return <Loadingprogramcard />;
  }
    
  return (
    <>
      <Card key={program.id} className="m-3" bg="dark" text="white" style={{maxWidth:"400px"}}>
        <a href={program.programurl} target="_blank">
          <Card.Img variant="top" src={program.programimage} height={360} />
        </a>
        <Card.Body>
          <Card.Title className="d-flex align-items-center justify-content-between">
            Radiopresentatör : <br />{program.responsibleeditor}<FavoriteIcon content={program}  contentType={"program"}/>
          </Card.Title> 
          <hr />
          <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
          <Card.Text>
            {program.description}
            <br />
            <br />
            {program.broadcastinfo}
            <hr />
            <div className="d-flex justify-content-evenly">
              {program.socialmediaplatforms.map(
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
