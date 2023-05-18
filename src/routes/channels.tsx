import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import useFetch from "../hooks/useFetch";

const Channels = (props:any) => {
const { data } = useFetch('http://localhost:9000/SR_api/channels');

const playAudio = (url:string) => props.setaudioFile(url)

if (!data || !data.channels) {
  return <div>Loading...</div>;
}
  return (
    <>
      {data.channels && data.channels.map((channel:any) => (
          <Card key={channel.id} className="m-3">
            <Card.Img variant="top" src={channel.image} />
            <Card.Body>
              <Card.Title>{channel.name}- {channel.channeltype}</Card.Title>
              <Card.Text>{channel.tagline}</Card.Text>
              <Button variant="primary" onClick={()=>playAudio(channel.liveaudio.url)}>Play latest</Button>
            </Card.Body>
          </Card>
      ))}
    </>
  );
}
export default Channels;
