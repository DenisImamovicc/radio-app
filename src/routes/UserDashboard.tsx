import { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ProgramCards from "../components/ProgramListCard";
import ChannelsCard from "../components/ChannelsList";
import { useLocation } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import useFetch from "../hooks/useFetch";

interface UserProps {
  setaudioFile: (url: string) => void;
}

interface User {
  Name: string;
  Favoritechannels: string;
  Favoriteprograms: string;
}

interface Channel {
  id: number;
  isFav: boolean;
  image: string;
  channeltype: string;
  name: string;
  tagline: string;
  liveaudio: {
    url: string;
  };
}

export default function User({ setaudioFile }: UserProps) {
  const [userName, setuserName] = useState<string | null>(null);
  const [favouriteChannels, setfavouriteChannels] = useState<any | null>(null);
  const [favoritePrograms, setfavoritePrograms] = useState<any | null>(null);
  const [Url, SetUrl] = useState(``);
  const API_URL: any = import.meta.env.VITE_API_URL;
  let currUserEmail = useLocation().state;
  const { data, isLoading } = useFetch(Url, "GET");

  const getfavouriteChannels = () => {
    let channelData: any | null = JSON.parse(
      localStorage.getItem("channelFavList") || "null"
    );

    if (!channelData || !channelData.length) {
      channelData = null;
      return channelData;
    }

    return channelData;
  };

  const getfavoritePrograms = () => {
    let programData: any | null = JSON.parse(
      localStorage.getItem("programFavList") || "null"
    );

    if (!programData || !programData.length) {
      programData = null;
      return programData;
    }

    return programData;
  };

  const getLocalStorageUser = () => {
    const User: any | null = JSON.parse(
      localStorage.getItem("UserDB") || "null"
    );
    return User ? User : [];
  };

  const handlePossesiveApostrophe = (name: string) =>
    name[name.length - 1] === "s" ? setuserName(name) : setuserName(name + "s");

  const setupUserDB = () => {
    const DbData = data[0];
    localStorage.setItem(
      "UserDB",
      JSON.stringify({
        Name: DbData.Name,
        Favoritechannels:
          DbData.Favoritechannels === "[]" ? null : DbData.Favoritechannels,
        Favoriteprograms:
          DbData.Favoriteprograms === "[]" ? null : DbData.Favoriteprograms,
      })
    );
  };

  const ToggleLocalStorageFavs = (toggleTo: boolean) => {
    const LocalFavChannels = getfavouriteChannels();
    const LocalFavPrograms = getfavoritePrograms();

    if (!LocalFavChannels && !LocalFavPrograms) {
      return null;
    } else if (LocalFavChannels) {
      const disabledFavChannels = LocalFavChannels.map((channel: Channel) => {
        channel.isFav = toggleTo;
        return channel;
      });
      localStorage.setItem(
        "channelFavList",
        JSON.stringify(disabledFavChannels)
      );
    } else if (LocalFavPrograms) {
      const disabledFavPrograms = LocalFavPrograms.map((channel: Channel) => {
        channel.isFav = toggleTo;
        return channel;
      });
      localStorage.setItem(
        "programFavList",
        JSON.stringify(disabledFavPrograms)
      );
    }
  };

  const modifyUserDB = () => {
    const User = getLocalStorageUser();
    setfavouriteChannels(JSON.parse(User.Favoritechannels));
    setfavoritePrograms(JSON.parse(User.Favoriteprograms));
    setuserName(User.Name);
    handlePossesiveApostrophe(User.Name);
  };

  useEffect(() => {
    if (isLoading === false) {
      setupUserDB();
      modifyUserDB();
    } else {
      console.log("still Loading...");
    }
  }, [isLoading]);

  useEffect(() => {
    if (currUserEmail) {
      localStorage.setItem("UserEmail", currUserEmail);
      ToggleLocalStorageFavs(false);
      SetUrl(API_URL + `users/user/${localStorage.getItem("UserEmail")}`);
    } else if (localStorage.getItem("UserEmail")) {
      ToggleLocalStorageFavs(false);
      SetUrl(API_URL + `users/user/${localStorage.getItem("UserEmail")}`);
    } else {
      ToggleLocalStorageFavs(true);
      setfavouriteChannels(getfavouriteChannels());
      setfavoritePrograms(getfavoritePrograms());
    }
  }, []);

  return (
    <>
      <h1 className="p-2 text-light">
        {userName ? ` ${userName} sida ` : "Min sida"}
      </h1>
      <Tabs
        defaultActiveKey="Favorit kanaler"
        id="uncontrolled-tab-example"
        className="mb-3 "
      >
        <Tab eventKey="Favorit kanaler" title="Favorit kanaler" className="">
          <Container>
            <Row xs={1} md={2} lg={3}>
              {favouriteChannels ? (
                favouriteChannels.map((channel: Channel) => (
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
                  Inga Favoritmarkerade program än :)
                </div>
              )}
            </Row>
          </Container>
        </Tab>
      </Tabs>
    </>
  );
}
