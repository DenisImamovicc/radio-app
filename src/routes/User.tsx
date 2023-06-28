import { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ProgramCards from "../components/Programscard";
import ChannelsCard from "../components/ChannelsCard";
import { useLocation } from "react-router-dom";

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
  const [LocalStorageFavChannels, setLocalStorageFavChannels] = useState<
    User[] | null
  >(null);
  const [LocalStorageFavPrograms, setLocalStorageFavPrograms] = useState<
    User[] | null
  >(null);
  let currentUser = useLocation().state;

  const getLocalStorageFavChannels = () => {
    let channelData: User[] | null = JSON.parse(
      localStorage.getItem("FavoriteChannelsList") || "null"
    );
    channelData?.length
      ? setLocalStorageFavChannels(channelData)
      : setLocalStorageFavChannels(null);
  };

  const getLocalStorageFavPrograms = () => {
    let programData: User[] | null = JSON.parse(
      localStorage.getItem("FavoriteProgramsList") || "null"
    );
    programData?.length
      ? setLocalStorageFavPrograms(programData)
      : setLocalStorageFavPrograms(null);
  };

  useEffect(() => {
    //Implement data handling between localstorage and DB everytime user navigates to Min Sida
    //Whn useffect is called the logic inside will check if LS is empty.if empty send get reg for user data
    //and change appropriate state varibels with the data in mind.If not empty send update req to DB to get
    //User DB,then add ls to it.Remove dupes before updating Db user with the modified data.
    //if LS and DB is empty then do nothing.
    //Outside of Useffect,when use is unfaving content it will make a db delete req
    //with id to user data removing content on the backend to.
    //For favs it will only update with useffect which user wont be impacted/notice unless localstorage is disabled.
    console.log(currentUser, "User");
    getLocalStorageFavChannels();
    getLocalStorageFavPrograms();
  }, []);

  return (
    <>
      <h1 className="p-2 text-light">Min sida</h1>
      <Tabs
        defaultActiveKey="Favorit kannaler"
        id="uncontrolled-tab-example"
        className="mb-3 "
      >
        <Tab eventKey="Favorit kannaler" title="Favorit kannaler" className="">
          <Container>
            <Row xs={1} md={2} lg={3}>
              {LocalStorageFavChannels ? (
                LocalStorageFavChannels.map((channel: channel) => (
                  <Col>
                    <ChannelsCard
                      channel={channel}
                      setaudioFile={setaudioFile}
                    />
                  </Col>
                ))
              ) : (
                <div className="user-nocontent">
                  Inga Favoritmarkerade kannaler än :)
                </div>
              )}
            </Row>
          </Container>
        </Tab>
        <Tab eventKey="Favorit program" title="Favorit program">
          <Container>
            <Row xs={1} md={2} lg={3}>
              {LocalStorageFavPrograms ? (
                LocalStorageFavPrograms.map((program: any) => (
                  <Col>
                    <ProgramCards program={program} />
                  </Col>
                ))
              ) : (
                <div className="user-nocontent">
                  Inga Favoritmarkerade kannaler än :)
                </div>
              )}
            </Row>
          </Container>
        </Tab>
      </Tabs>
    </>
  );
}
