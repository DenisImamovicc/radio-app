import Carousel from "react-bootstrap/Carousel";
import useFetch from "../hooks/useFetch";

const ChannelSuggestionsCarousel = (props: any) => {
  const { data } = useFetch("http://localhost:9000/SR_api/channels");
  const playAudio = (url: string) => props.setaudioFile(url);

  if (!data || !data.channels) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <h2 className="fs-5 mt-1">Channel suggestions:</h2>
      <Carousel>
        {data.channels &&
          data.channels.map((channel: any) => (
            <Carousel.Item key={channel.id}>
              <img
                className="d-block w-100"
                src={channel.image}
                alt={channel.name}
                onClick={() => playAudio(channel.liveaudio.url)}
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
