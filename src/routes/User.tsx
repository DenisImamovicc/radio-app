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
  image: string;
  channeltype: string;
  name: string;
  tagline: string;
  liveaudio: {
    url: string;
  };
}

export default function User({ setaudioFile }:UserProps) {
  const [userName, setuserName] = useState<User | null>(null);
  const [LocalStorageFavChannels, setLocalStorageFavChannels] = useState<any | null>(null);
  const [LocalStorageFavPrograms, setLocalStorageFavPrograms] = useState<any | null>(null);

  let currentUser = useLocation().state;
  const [Url, SetUrl] = useState(``);
  const { data, isLoading } = useFetch(Url, "GET");

  const getLocalStorageFavChannels = () => {
    let channelData: any | null = JSON.parse(
      localStorage.getItem("channelFavList") || "null"
    );
    return channelData ? channelData : [];
  };

  const getLocalStorageFavPrograms = () => {
    const programData: any | null = JSON.parse(
      localStorage.getItem("programFavList") || "null"
    );
    return programData ? programData : [];
  };

  const getLocalStorageUser = () => {
    const User: any | null = JSON.parse(
      localStorage.getItem("UserDB") || "null"
    );
    return User ? User : [];
  };

  //Implement data handling between localstorage and DB everytime user navigates to Min Sida
  //Whn useffect is called the logic inside will check if LS is empty.if empty send get reg for user data
  //and change appropriate state varibels with the data in mind.If not empty send update req to DB to get
  //User DB,then add ls to it.Remove dupes before updating Db user with the modified data.
  //if LS and DB is empty then do nothing.
  //Outside of Useffect,when use is unfaving content it will make a db delete req
  //with id to user data removing content on the backend to.
  //For favs it will only update with useffect which user wont be impacted/notice unless localstorage is disabled.
  useEffect(() => {
    if (isLoading === false) {
      console.log(data);

      localStorage.setItem(
        "UserDB",
        JSON.stringify({
          Name: data[0].Name,
          Favoritechannels: data[0].Favoritechannels,
          Favoriteprograms: data[0].Favoriteprograms,
        })
      );
      const User = getLocalStorageUser();
      setLocalStorageFavChannels(JSON.parse(User.Favoritechannels));
      setLocalStorageFavPrograms(JSON.parse(User.Favoriteprograms));
      setuserName(User.Name);

      console.log(User);
      //  const LocalFavChannels = getLocalStorageFavChannels()
      //   const forgeddata= [...LocalFavChannels, ...data[0].Favoritechannels]
      // setLocalStorageFavChannels(forgeddata);
      // setisdone(true);
    } else {
      console.log("bin chilling");
    }
  }, [isLoading]);

  useEffect(() => {
    if (currentUser) {
      console.log(currentUser);
      localStorage.setItem("UserEmail", currentUser);
      SetUrl(
        `http://localhost:9000/users/user/${localStorage.getItem("UserEmail")}`
      );
    } else if (localStorage.getItem("UserEmail")) {
      SetUrl(
        `http://localhost:9000/users/user/${localStorage.getItem("UserEmail")}`
      );
    } else {
      const LocalFavChannels = getLocalStorageFavChannels();
      const LocalFavPrograms = getLocalStorageFavPrograms();

      setLocalStorageFavChannels([LocalFavChannels]);
      setLocalStorageFavPrograms([LocalFavPrograms]);
    }
  }, []);

  return (
    <>
      <h1 className="p-2 text-light">
        {userName ? ` ${userName}'s sida ` : "Min sida"}
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
                LocalStorageFavChannels[0].map((channel: Channel) => (
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
                LocalStorageFavPrograms[0].map((program:any) => (
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
