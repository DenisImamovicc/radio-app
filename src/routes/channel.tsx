import { useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Card from "react-bootstrap/Card";

const Channel = () => {
  const channelData = useLocation().state;
  const { data } = useFetch(`${channelData.scheduleurl}&format=json`);
  //   console.log(data, channelData);

  if (!data || !data.schedule) {
    return <div>Loading...</div>;
  }

  function formatDate(rawDate: string) {
    const numbersOnly = Number(rawDate.replace(/\D/g, ""));
const date = new Date(numbersOnly);

const hour = date.getHours();
const minute = date.getMinutes();
console.log(`${hour} : ${minute},`,date);

    return `${hour} : ${minute}`
  }

  return (
    <>
      <h2 className="text-center m-2">
        {channelData.name} - {channelData.channeltype}
      </h2>
      {data.schedule &&
        data.schedule.map((episode: any) => (
          <Card key={episode.episodeid} className="m-3">
            <Card.Img variant="top" src={episode.imageurl} />
            <Card.Body>
              <Card.Title>
                {episode.title} - {episode.program.name}
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {formatDate(episode.starttimeutc)} - {formatDate(episode.endtimeutc)}
              </Card.Subtitle>
              <Card.Text>{episode.description}</Card.Text>
            </Card.Body>
          </Card>
        ))}
    </>
  );
};
export default Channel;
