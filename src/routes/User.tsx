import { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ProgramCards from "../components/Programscard";
import ChannelsCard from "../components/ChannelsCard";

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
  const [favoriteChannels, setFavoriteChannels] = useState<User[]|null>(null);
  const [favoritePrograms, setFavoritePrograms] = useState<User[]|null>(null);

  useEffect(() => {
    let channelData:User[] | null = JSON.parse(localStorage.getItem("FavoriteChannelsList")|| "null");
    channelData?.length ? setFavoriteChannels(channelData) : setFavoriteChannels(null)

    let programData:User[] | null = JSON.parse(localStorage.getItem("FavoriteProgramsList")|| "null");
    programData?.length ? setFavoritePrograms(programData) : setFavoritePrograms(null)
  }, []);

  return (
    <> 
      <h1 className="p-1 text-light">Din sida</h1>
      <Tabs
        defaultActiveKey="Favorit kanaler"
        id="uncontrolled-tab-example"
        className="mb-3 "
      >
        <Tab
          eventKey="Favorit kanaler"
          title="Favorit kanaler"
          className=""
        >
          {favoriteChannels ? favoriteChannels.map((channel:channel)=>
            <ChannelsCard channel={channel} setaudioFile={setaudioFile}/>
          ) : (
            <div className="user-nocontent">Inga Favoritmarkerade kanaler än :)</div>
          )}
        </Tab>
         <Tab
          eventKey="Favorit program"
          title="Favorit program"
        >
          {favoritePrograms ? favoritePrograms.map((program:any)=>
            <ProgramCards program={program}/>
          ) : (
            <div className="user-nocontent">Inga Favoritmarkerade program än :)</div>
          )}
          </Tab>
      </Tabs>
    </>
  );
}
