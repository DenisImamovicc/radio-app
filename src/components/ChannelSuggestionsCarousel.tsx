import Carousel from "react-bootstrap/Carousel";
import useFetch from "../hooks/useFetch";
import { useState } from "react";
import LoadingCarousel from "./LoadingCarousel";

const ChannelSuggestionsCarousel = (props: any) => {
  const [randomNum] = useState<number>(Math.floor(Math.random() * 6) + 1);
  const { data } = useFetch(
    `https://api.sr.se/api/v2/channels/?format=json&page=${randomNum}&size=4`
  );
  const playAudio = (url: string) => props.setaudioFile(url);

  if (!data) {
    return <LoadingCarousel title="Rekommenderade kanaler:"/>
  }

  return (
    <>
      <h2 className="fs-5 m-2 text-white">Rekommenderade kanaler:</h2>
      <Carousel>
        {data.channels &&
          data.channels.map((channel: any) => (
            <Carousel.Item key={channel.id}>
              <img
                className="d-block w-100"
                src={channel.image}
                alt={channel.name}
                height={360}
                loading="lazy"
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
