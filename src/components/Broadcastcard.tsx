import Card from "react-bootstrap/Card";
import { v4 as uuidv4 } from "uuid";

interface Broadcastcard {
    episode:{
    imageurl:string
    title:string
    program:{
        name:string
    }
    starttimeutc:string
    endtimeutc:string
    description:string

    }
}

export default function Broadcastcard({episode}:Broadcastcard) {

    function formatDate(rawDate: string) {
        const numbersOnly = Number(rawDate.toString().replace(/\D/g, ""));
        const date = new Date(numbersOnly);
        const match = date.toString().match(/\d{2}:\d{2}/);
        if (match !== null) {
          return match[0];
        }
        return "";
      }

  return (
    <>
      <Card key={uuidv4()} className="m-3" bg="dark" text="white">
        <Card.Img
          variant="top"
          src={episode.imageurl}
          height={360}
          loading="lazy"
        />
        <Card.Body id="">
          <Card.Title>
            {episode.title} - {episode.program.name}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-white">
            {formatDate(episode.starttimeutc)} -{" "}
            {formatDate(episode.endtimeutc)}
          </Card.Subtitle>
          <hr />
          <Card.Text>
            {episode.description}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
