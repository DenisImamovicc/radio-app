import Card from "react-bootstrap/Card";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";

interface channel {
  id: number;
  image: string;
  channeltype: string;
  name: string;
  liveaudio: {
    url: string;
  };
}

function RecommendedChannels({ setaudioFile }: any) {
  const { data } = useFetch(
    `https://api.sr.se/api/v2/channels/?format=json&page=1&size=3`
  );
//   console.log(data);

  const playAudio = (url: string) => setaudioFile(url);

  if (!data) return <h1>Loading...</h1>;

  return (
    <>
      <div className="d-flex justify-content-start flex-column ms-2">
        <h1 className="text-light m-1">Lyssna direkt</h1>
        <div className="d-flex flex-row">
          {data.channels &&
            data.channels.map((channel: channel) => {
              return (
                <Card
                  className="bg-dark text-white m-2"
                  id="channelStartingpagecard"
                  key={channel.id}
                  onClick={() => playAudio(channel.liveaudio.url)}
                >
                  <Link to={`/Channels/Channel/${channel.id}`} state={channel}>
                    <Card.Img src={channel.image} alt={channel.name} />
                    <Card.ImgOverlay></Card.ImgOverlay>
                  </Link>
                </Card>
              );
            })}
        </div>
        <hr className="text-light"/>
      </div>
    </>
  );
}

export default RecommendedChannels;
