import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import PaginationComponent from "../components/PaginationComponent.tsx";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import { useState } from "react";
import Loadingprogramcard from "../components/Loadingprogramcard.tsx";
import ToggleIcon from "../components/FavoriteChannelicon.tsx";

interface Channels {
  setaudioFile: (url: string) => void;
}

interface channel {
  id: number;
  image: string;
  channeltype: string;
  name: string;
  tagline: string;
  liveaudio: {
    url: string;
  };
}

const Channels = ({ setaudioFile }: Channels) => {
  const [Url, setUrl] = useState(
    "https://api.sr.se/api/v2/channels/?format=json"
  );
  const { data } = useFetch(Url);
  const playAudio = (url: string) => setaudioFile(url);

  if (!data || !data.channels) {
    return <Loadingprogramcard />;
  }

  const handleFetchNextPage = (nextpageData: string) => {
    setUrl(nextpageData);
  };

  return (
    <>
      {data.channels &&
        data.channels.map((channel: channel) => (
          <Card key={channel.id} className="m-3" bg="dark" text="white">
            <Link to={`/Channels/Channel/${channel.id}`} state={channel}>
              <Card.Img
                variant="top"
                src={channel.image}
                height={360}
                loading="lazy"
              />
            </Link>
            <Card.Body>
              <Card.Title>
                {channel.name} - {channel.channeltype} <ToggleIcon channel={channel}/>
              </Card.Title>
              <Card.Text>{channel.tagline}</Card.Text>
              <Button
                variant="primary"
                onClick={() => playAudio(channel.liveaudio.url)}
              >
                Play latest
              </Button>
            </Card.Body>
          </Card>
        ))}
      <PaginationComponent
        data={data.pagination}
        handleFetchNextPage={handleFetchNextPage}
      />
    </>
  );
};
export default Channels;
