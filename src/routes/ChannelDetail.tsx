import { useLocation, useParams } from "react-router-dom";
import Channeloptions from "../components/ChannelContents.tsx";
import useFetch from "../hooks/useFetch.tsx";
import Loadingprogramcard from "../components/Loadingprogramcard.tsx";
import { Placeholder } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

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
          <div className="d-flex m-2 justify-content-around align-items-center text-light">
            <h2 className="text-center m-2 text-light">
              {channelData.channel.name} - {channelData.channel.channeltype}
            </h2>
            <span>
              <FontAwesomeIcon
                icon={faPlay}
                onClick={() => playAudio(channelData.channel.liveaudio.url)}
                className="text-light me-1"
              />
              LIVE
            </span>
          </div>
          <Channeloptions channelData={channelData.channel} />
        </div>
      ) : (
        <div>
          <div className="d-flex m-2 justify-content-around align-items-center text-light">
            <h2 className="text-center m-2 text-light">
              {channelData.name} - {channelData.channeltype}
            </h2>
            <span>
              <FontAwesomeIcon
                icon={faPlay}
                onClick={() => playAudio(channelData.liveaudio.url)}
                className="text-light me-1"
              />
              LIVE
            </span>
          </div>
          <Channeloptions channelData={channelData} />
        </div>
      )}
    </>
  );
};

export default Channel;
