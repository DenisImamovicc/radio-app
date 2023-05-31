import { useLocation, useParams } from "react-router-dom";
import Channeloptions from "./Channeloptions.tsx";
import useFetch from "../hooks/useFetch";
import Loadingprogramcard from "../components/Loadingprogramcard";
import { Placeholder, Button } from "react-bootstrap";

interface channel {
  setaudioFile: (url: string) => void;
}

const Channel = ({ setaudioFile }: channel) => {
  let channelData = useLocation().state;
  const { id } = useParams();
  const { data, isLoading } = useFetch(
    `https://api.sr.se/api/v2/channels/${id}?format=json`
  );

  const playAudio = (url: string) => setaudioFile(url);

  scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  if (!channelData) {
    channelData = data;
  }

  if (isLoading || !channelData) {
    return (
      <>
        <h2 className="text-center m-2 text-white">
          <Placeholder xs={8} />
        </h2>
        <Loadingprogramcard />
      </>
    );
  }

  return (
    <>
      {channelData.channel ? (
        <div>
          <div className="d-flex m-2 justify-content-around">
            <h2 className="text-center m-2 text-white">
              {channelData.channel.name} - {channelData.channel.channeltype}
            </h2>
            <Button
              variant="primary"
              onClick={() => playAudio(channelData.channel.liveaudio.url)}
              size="sm"
              className="playbutton p-2 text-center "
            >
              Spela
            </Button>
          </div>
          <Channeloptions channelData={channelData.channel} />
        </div>
      ) : (
        <div>
          <div className="d-flex m-2 justify-content-around">
            <h2 className="text-center m-2 text-white">
              {channelData.name} - {channelData.channeltype}
            </h2>
            <Button
              variant="primary"
              onClick={() => playAudio(channelData.liveaudio.url)}
              size="sm"
              className="playbutton p-2 text-center "
            >
              Spela
            </Button>
          </div>
          <Channeloptions channelData={channelData} />
        </div>
      )}
    </>
  );
};

export default Channel;
