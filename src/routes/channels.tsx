import data from "../ChannelData.json";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Channels = () => {
  const channels = data.channels;
  console.log(channels);
  
  return (
    <>
      {channels.map((channel) => (
          <Card key={channel.id} className="m-3">
            <Card.Img variant="top" src={channel.image} />
            <Card.Body>
              <Card.Title>{channel.name}-{channel.channeltype}</Card.Title>
              <Card.Text>{channel.tagline}</Card.Text>
              <Button variant="primary" >Play latest</Button>
            </Card.Body>
          </Card>
      ))}
    </>
  );
}
export default Channels;
