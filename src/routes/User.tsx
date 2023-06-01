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

export default function User({ setaudioFile }: UserProps) {
  const [favoriteChannels, setFavoriteChannels] = useState<User|null>(null);

  useEffect(() => {
    let data:User | null = JSON.parse(localStorage.getItem("data")|| "null");
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
          {favoriteChannels ? (
            <Card
              key={favoriteChannels.id}
              className="m-3"
              bg="dark"
              text="white"
            >
              <Link
                to={`/Channels/Channel/${favoriteChannels.id}`}
                state={favoriteChannels}
              >
                <Card.Img
                  variant="top"
                  src={favoriteChannels.image}
                  height={360}
                  loading="lazy"
                />
              </Link>
              <Card.Body>
                <Card.Title>
                  {favoriteChannels.name} - {favoriteChannels.channeltype}{" "}
                  <ToggleIcon channel={favoriteChannels} />
                </Card.Title>
                <Card.Text>{favoriteChannels.tagline}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => playAudio(favoriteChannels.liveaudio.url)}
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
