import Carousel from "react-bootstrap/Carousel";
import data from "../ChannelData.json";

const ChannelSuggestionsCarousel = (props:any) => {
  const channels = data.channels;
  const playAudio = (url:string) => props.setaudioFile(url)

  return (
    <>
      <h2 className="fs-5 mt-1">Channel suggestions:</h2>
      <Carousel >
        {channels.map((channel) => (
          <Carousel.Item>
              <img
                className="d-block w-100"
                src={channel.image}
                alt={channel.name}
                onClick={()=>playAudio(channel.liveaudio.url)}
              />
            <Carousel.Caption className="bg-dark position-static h-100">
              <h3>{channel.name}</h3>
              <p>{channel.channeltype}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

export default ChannelSuggestionsCarousel;
