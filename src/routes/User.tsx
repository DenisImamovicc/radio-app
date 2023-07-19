import { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ProgramCards from "../components/Programscard";
import ChannelsCard from "../components/ChannelsCard";
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
  const [LocalStorageFavChannels, setLocalStorageFavChannels] = useState<
    any | null
  >(null);
  const [LocalStorageFavPrograms, setLocalStorageFavPrograms] = useState<
    any | null
  >(null);

  let currentUser = useLocation().state;
  const [Url, SetUrl] = useState(``);
  const { data, isLoading } = useFetch(Url, "GET");

  const getLocalStorageFavChannels = () => {
    let channelData: any | null = JSON.parse(
      localStorage.getItem("channelFavList") || "null"
    );
    return channelData ? channelData : null;
  };

  const getLocalStorageFavPrograms = () => {
    const programData: any | null = JSON.parse(
      localStorage.getItem("programFavList") || "null"
    );
    return programData ? programData : null;
  };

  const getLocalStorageUser = () => {
    const User: any | null = JSON.parse(
      localStorage.getItem("UserDB") || "null"
    );
    return User ? User : [];
  };

  // const filterDupes = (unfilteredArr: any) => {
  //   return unfilteredArr.filter((item: any, index: number, self: any) => {
  //     return index === self.findIndex((obj:any) => obj.id === item.id);
  //   });
  // };

  // const handleMergeOfDbAndLSChannel = (User: User) => {
  //   const LocalFavChannels = getLocalStorageFavChannels();
  //   const DbFavChannels = JSON.parse(User.Favoritechannels);
  //   if (!DbFavChannels) {
  //     return []
  //   }
  //   const mergedFavChannels = [...LocalFavChannels, ...DbFavChannels[0]];

  //   setLocalStorageFavChannels(filterDupes(mergedFavChannels));
  // };

  // const handleMergeOfDbAndLSPrograms = (User: User) => {
  //   const LocalFavPrograms = getLocalStorageFavPrograms();
  //   const DbFavPrograms = JSON.parse(User.Favoriteprograms);
  //   if (!DbFavPrograms) {
  //     return []
  //   }
  //   const mergedFavPrograms = [...LocalFavPrograms, ...DbFavPrograms[0]];

  //   setLocalStorageFavPrograms(filterDupes(mergedFavPrograms));
  // };

  const handlePossesiveApostrophe = (name: string) => {
    name[name.length - 1] === "s" ? setuserName(name) : setuserName(name + "s");
  };

  useEffect(() => {
    if (isLoading === false) {
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
      const User = getLocalStorageUser();
      // handleMergeOfDbAndLSChannel(User);
      // handleMergeOfDbAndLSPrograms(User);
      setLocalStorageFavChannels(JSON.parse(User.Favoritechannels));
      setLocalStorageFavPrograms(JSON.parse(User.Favoriteprograms));
      setuserName(User.Name);
      handlePossesiveApostrophe(User.Name);

      //Send update req to db to update user channel and program to mergeddata.
    } else {
      console.log("still Loading...");
    }
  }, [isLoading]);

  const ToggleLocalStorageFavs = (toggleTo: boolean) => {
    const LocalFavChannels = getLocalStorageFavChannels();
    const LocalFavPrograms = getLocalStorageFavPrograms();

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

  useEffect(() => {
    if (currentUser) {
      console.log(currentUser);
      localStorage.setItem("UserEmail", currentUser);
       ToggleLocalStorageFavs(false)
      SetUrl(
        `http://localhost:9000/users/user/${localStorage.getItem("UserEmail")}`
      );
    } else if (localStorage.getItem("UserEmail")) {
       ToggleLocalStorageFavs(false)
      SetUrl(
        `http://localhost:9000/users/user/${localStorage.getItem("UserEmail")}`
      );
    } else {
      const LocalFavChannels = getLocalStorageFavChannels();
      const LocalFavPrograms = getLocalStorageFavPrograms();
      ToggleLocalStorageFavs(true);

      setLocalStorageFavChannels(LocalFavChannels);
      setLocalStorageFavPrograms(LocalFavPrograms);
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
              {LocalStorageFavChannels ? (
                LocalStorageFavChannels.map((channel: Channel) => (
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
              {LocalStorageFavPrograms ? (
                LocalStorageFavPrograms.map((program: any) => (
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
