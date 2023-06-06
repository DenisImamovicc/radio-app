import PaginationComponent from "../components/PaginationComponent.tsx";
import useFetch from "../hooks/useFetch";
import { useState } from "react";
import Loadingprogramcard from "../components/Loadingprogramcard.tsx";
import ChannelsCard from "../components/ChannelsCard.tsx";


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
          <ChannelsCard channel={channel} setaudioFile={setaudioFile}/>
        ))}
      <PaginationComponent
        data={data.pagination}
        handleFetchNextPage={handleFetchNextPage}
      />
    </>
  );
};
export default Channels;
