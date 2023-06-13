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
  data: {
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

export default function ProgramCard({ data }: ProgramCard) {
  const socialMediaIcons: any[] = [faFacebook, faTwitter, faInstagram];

  if (!data) {
    return <Loadingprogramcard />;
  }
    
  return (
    <>
      <Card key={data.id} className="m-3" bg="dark" text="white" style={{maxWidth:"400px"}}>
        <a href={data.programurl} target="_blank">
          <Card.Img variant="top" src={data.programimage} height={360} />
        </a>
        <Card.Body>
          <Card.Title className="d-flex align-items-center justify-content-between">
            Radiopresentatör : <br />{data.responsibleeditor}<ToggleIconProgram program={data}/>
          </Card.Title> 
          <hr />
          <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
          <Card.Text>
            {data.description}
            <br />
            <br />
            {data.broadcastinfo}
            <hr />
            <div className="d-flex justify-content-evenly">
              {data.socialmediaplatforms.map(
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
