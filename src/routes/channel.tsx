import { useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import PaginationComponent from "../components/PaginationComponent.tsx";
import { v4 as uuidv4 } from "uuid";

const Channel = () => {
  const channelData = useLocation().state;
  const [Url, setUrl] = useState(`${channelData.scheduleurl}&format=json`);

  const { data } = useFetch(Url);
  console.log(data, channelData);

  if (!data || !data.schedule) {
    return (
      <div className="loading-placeholder">
        <p>Loading...</p>
      </div>
    );
  }

  function formatDate(rawDate: string) {
    const numbersOnly = Number(rawDate.toString().replace(/\D/g, ""));
    const date = new Date(numbersOnly);
    const match = date.toString().match(/\d{2}:\d{2}/);
    if (match !== null) {
      return match[0];
    }
    return "";
  }

  const handleFetchNextPage = (nextpageData: string) => {
    setUrl(nextpageData);
  };

  const checkNextPage = (pageKey: string) => {
    if (!pageKey) {
      return data.pagination.previouspage;
    }
    return data.pagination.nextpage;
  };
  return (
    <>
      <h2 className="text-center m-2 text-white">
        {channelData.name} - {channelData.channeltype} Sändningar:
      </h2>
      <PaginationComponent
        totalpages={data.pagination.totalpages}
        active={data.pagination.page}
        handleFetchNextPage={handleFetchNextPage}
        nextPageUrl={checkNextPage(data.pagination.nextpage)}
      />
      {data.schedule &&
        data.schedule.map((episode: any) => (
          <Card key={uuidv4()} className="m-3" bg="dark" text="white">
            <Card.Img variant="top" src={episode.imageurl} height={360} loading="lazy"/>
            <Card.Body>
              <Card.Title>
                {episode.title} - {episode.program.name}
              </Card.Title>
              <Card.Subtitle className="mb-2 text-white">
                {formatDate(episode.starttimeutc)} -{" "}
                {formatDate(episode.endtimeutc)}
              </Card.Subtitle>
              <Card.Text>{episode.description}</Card.Text>
            </Card.Body>
          </Card>
        ))}
    </>
  );
};

export default Channel;
