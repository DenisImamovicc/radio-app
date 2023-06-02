import { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import ToggleIcon from "../components/Favoriteicon";

interface User {
  id: number;
  image: string;
  channeltype: string;
  name: string;
  tagline: string;
  liveaudio: {
    url: string;
  };
  setaudioFile: (url: string) => void;
}

interface UserProps {
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

export default function User({ setaudioFile }: UserProps) {
  const [favoriteChannels, setFavoriteChannels] = useState<User[]|null>(null);

  useEffect(() => {
    let data:User[] | null = JSON.parse(localStorage.getItem("FavoriteChannelsList")|| "null");
    setFavoriteChannels(data);
  }, []);

  console.log(favoriteChannels);
  const playAudio = (url: string) => setaudioFile(url);

  return (
    <>
      <h1 className="p-1">Hej Användare!</h1>
      <Tabs
        defaultActiveKey="Favorit Kannaler"
        id="uncontrolled-tab-example"
        className="mb-3 "
      >
        <Tab
          eventKey="Favorit Kannaler"
          title="Favorit Kannaler"
          className=""
        >
          {favoriteChannels ? favoriteChannels.map((channel:channel)=>
            <Card
              key={channel.id}
              className="m-3"
              bg="dark"
              text="white"
            >
              <Link
                to={`/Channels/Channel/${channel.id}`}
                state={channel}
              >
                <Card.Img
                  variant="top"
                  src={channel.image}
                  height={360}
                  loading="lazy"
                />
              </Link>
              <Card.Body>
                <Card.Title>
                  {channel.name} - {channel.channeltype}{" "}
                  <ToggleIcon channel={channel} />
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
          ) : (
            <div className="user-nocontent">Inga Favoritmarkerade kannaler än :)</div>
          )}
        </Tab>
         {/* <Tab
          eventKey="Favorit program"
          title="Favorit program"
        >
          <h2>program</h2>
        </Tab>  */}
      </Tabs>
    </>
  );
}
