import { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ProgramCards from "../components/Programscard";
import ChannelsCard from "../components/ChannelsCard";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

interface User {
  id: number;
  image: string;
  channeltype: string;
  name: string;
  tagline: string;
  liveaudio: {
    url: string;
  };
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
  const [favoriteChannels, setFavoriteChannels] = useState<User[] | null>(null);
  const [favoritePrograms, setFavoritePrograms] = useState<User[] | null>(null);

  useEffect(() => {
    let channelData: User[] | null = JSON.parse(
      localStorage.getItem("FavoriteChannelsList") || "null"
    );
    channelData?.length
      ? setFavoriteChannels(channelData)
      : setFavoriteChannels(null);

    let programData: User[] | null = JSON.parse(
      localStorage.getItem("FavoriteProgramsList") || "null"
    );
    programData?.length
      ? setFavoritePrograms(programData)
      : setFavoritePrograms(null);
  }, []);

  return (
    <>
      <h1 className="p-2 text-light">Min sida</h1>
      <Tabs
        defaultActiveKey="Favorit kanaler"
        id="uncontrolled-tab-example"
        className="mb-3 "
      >
        <Tab eventKey="Favorit kanaler" title="Favorit kanaler" className="">
          <Container>
            <Row xs={1} md={2} lg={3}>
              {favoriteChannels ? (
                favoriteChannels.map((channel: channel) => (
                  <Col>
                    <ChannelsCard
                      channel={channel}
                      setaudioFile={setaudioFile}
                    />
                  </Col>
                ))
              ) : (
                <div className="user-nocontent">
                  Inga Favoritmarkerade kanaler än :)
                </div>
              )}
            </Row>
          </Container>
        </Tab>
        <Tab eventKey="Favorit program" title="Favorit program">
          <Container>
            <Row xs={1} md={2} lg={3}>
              {favoritePrograms ? (
                favoritePrograms.map((program: any) => (
                  <Col>
                    <ProgramCards program={program} />
                  </Col>
                ))
              ) : (
                <div className="user-nocontent">
                  Inga Favoritmarkerade kanaler än :)
                </div>
              )}
            </Row>
          </Container>
        </Tab>
      </Tabs>
    </>
  );
}
