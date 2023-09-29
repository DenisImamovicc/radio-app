import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import FavoriteIcon from "./FavoriteIcon.tsx";

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
  setaudioFile: (url: AudioPlayer) => void;
}


interface AudioPlayer {
  audioFile: {
    songFile:string,
    contentID:string
  }
}

function ChannelsCard({ channel, setaudioFile }: ChannelCardProps) {
  const playAudio = (url: AudioPlayer) => setaudioFile(url);

  return (
    <>
      <Card key={channel.id} className="m-2" bg="dark" text="white">
        <Link
          to={`/Channels/Channel/${channel.id}`}
          state={channel}
          className="d-flex justify-content-between"
        >
          <Card.Img
            variant="top"
            src={channel.image}
            height={360}
            loading="lazy"
          />
        </Link>
        <Card.Body className="d-flex justify-content-between flex-column" id="Cardbody">
          <div>
            <Card.Title className="d-flex align-items-center justify-content-between">
              {channel.name} - {channel.channeltype}{" "}
              <FavoriteIcon content={channel} contentType={"channel"} />
            </Card.Title>
          <hr />
          <Card.Text>{channel.tagline}</Card.Text>
          </div>
          <div>
          <hr />
            <FontAwesomeIcon
              icon={faPlay}
              onClick={() =>
                playAudio({
                  songFile: channel.liveaudio.url,
                  contentID: channel.id,
                })
              }
            />
            <span> LIVE</span> 
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default ChannelsCard;
