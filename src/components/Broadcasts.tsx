import { useEffect, useState } from "react";

import ListGroup from "react-bootstrap/ListGroup";
import useFetch from "../hooks/useFetch";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import PaginationComponent from "./PaginationComponent";

interface programData {
  programData: {
    name: string;
    programimage: string;
    responsibleeditor: string;
    id: number;
    description: string;
    socialmediaplatforms: {
      plattform: string;
      platformurl: string;
    }[];
    programurl: string;
    broadcastinfo: string;
    channel: {
      name: string;
      id: number;
    };
  };
  setaudioFile: (url: string) => void;
}

function Broadcasts({ programData, setaudioFile }: programData) {
  const [Url, setUrl] = useState(
    `https://api.sr.se/api/v2/broadcasts?programid=${programData.id}&format=json`
  );
  const { data: broadCastsData } = useFetch(Url);

  useEffect(() => {}, []);

  const handleFetchNextPage = (nextpageData: string) => {
    setUrl(nextpageData);
  };

  // console.log(broadCastsData);
  const playAudio = (url: string) => setaudioFile(url);

  if (!broadCastsData) {
    return <h2>Wait you dumb cunt</h2>;
  }

  return (
    <>
      <ListGroup as="ol" numbered className="mb-2" id="Sändning">
        {broadCastsData && broadCastsData.broadcasts ? (
          broadCastsData.broadcasts.map((broadcast: any) => (
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start mx-3 "
              key={broadcast.id}
            >
              <div className="ms-2 me-auto ">
                <div className="fw-bold">{broadcast.title}</div>
                {Math.round((broadcast.totalduration / 60) * 10) / 10}min
                <FontAwesomeIcon
                  onClick={() => playAudio(broadcast.broadcastfiles[0].url)}
                  className="ms-1"
                  icon={faPlay}
                />
              </div>
            </ListGroup.Item>
          ))
        ) : (
          <h1 className="text-light">Inga sändningar tillgängliga</h1>
        )}
      </ListGroup>
      <PaginationComponent
        data={broadCastsData.pagination}
        handleFetchNextPage={handleFetchNextPage}
      />
    </>
  );
}

export default Broadcasts;
