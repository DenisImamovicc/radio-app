import Carousel from "react-bootstrap/Carousel";
import data from "../ChannelData.json";

const ChannelSuggestionsCarousel = ({setaudioFile}) => {
  const channels = data.channels;
  function playAudio(event:any) {
    const imageData = event.target.dataset.imageData;
    console.log(imageData);    
    return setaudioFile(imageData)
  }
  return (
    <>
      <h2 className="fs-5 mt-1">Channel suggestions:</h2>
      <Carousel>
        {channels.map((channel) => (
          <Carousel.Item>
              <img
                className="d-block w-100"
                src={channel.image}
                alt={channel.name}
                data-image-data={channel.liveaudio.url}
                onClick={playAudio}
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
