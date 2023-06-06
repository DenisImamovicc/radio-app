import ToggleIcon from "../components/FavoriteChannelicon.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

interface ChannelCardProps {
  channel: {
    id: number;
    image: string;
    channeltype: string;
    name: string;
    tagline: string;
    liveaudio: {
      url: string;
    };
  };
  setaudioFile: (url: string) => void;
}

function ChannelsCard({ channel, setaudioFile }: ChannelCardProps) {
  const playAudio = (url: string) => setaudioFile(url);
  
  return (
    <>
      <Card key={channel.id} className="m-3" bg="dark" text="white">
        <Link to={`/Channels/Channel/${channel.id}`} state={channel} className="d-flex justify-content-between">
          <Card.Img
            variant="top"
            src={channel.image}
            height={360}
            loading="lazy"
          />
        </Link>
        <Card.Body>
          <Card.Title className="d-flex align-items-center justify-content-between">
            {channel.name} - {channel.channeltype}{" "}
            <ToggleIcon channel={channel} />
          </Card.Title>
          <hr />
          <Card.Text>{channel.tagline}</Card.Text>
          <FontAwesomeIcon
            icon={faPlay}
            onClick={() => playAudio(channel.liveaudio.url)}
          />{" "}
          LIVE
        </Card.Body>
      </Card>
    </>
  );
}

export default ChannelsCard;
