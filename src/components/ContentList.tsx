import { useState } from "react";

import ListGroup from "react-bootstrap/ListGroup";
import useFetch from "../hooks/useFetch";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import PaginationComponent from "./PaginationComponent";

interface data {
  data: {
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
  contentType: string;
}

function ContentList({ data, setaudioFile, contentType }: data) {
  const [Url, setUrl] = useState(
    `https://api.sr.se/api/v2/${contentType}?programid=${data.id}&format=json`
  );

  const { data: contentData } = useFetch(Url);

  const handleFetchNextPage = (nextpageData: string) => {
    setUrl(nextpageData);
  };

  const playAudio = (url: string) => setaudioFile(url);

  //Avsnitt data struktur är fucky emellan olika program.Figure it out
  const handleContentTypePath = (content: any) => {
    if (contentType === "broadcasts") {
      return content.broadcastfiles[0].url;
    } else if (contentType === "podfiles") {
      return content.url;
    }else if (contentType === "episodes") {
      if (content.hasOwnProperty("broadcast")) {        
         return content.broadcast.broadcastfiles[0].url;
      }else{
        return content.listenpodfile.url
      }
    }
     return 0 
  };

  const handleContentDurationPath = (content: any) => {
    if (contentType === "broadcasts") {
      return content.totalduration;
    } else if (contentType === "podfiles") {
      return content.duration;
    }else if (contentType === "episodes") {
      if (content.hasOwnProperty("broadcast")) {        
        return content.broadcast.broadcastfiles[0].duration;
     }else{
       return content.listenpodfile.duration
     }      
    }
    return 0;
  };

  if (!contentData) {
    return <h2>Wait you dumb cunt</h2>;
  }
  console.log(contentData);

  return (
    <>
      <ListGroup as="ol" numbered className="mb-2" id="Contentlist">
        {contentData && contentData[contentType] ? (
          contentData[contentType].map((content: any) => (
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start mx-3 "
              key={content.id}
            >
              <div className="ms-2 me-auto ">
                <div className="fw-bold">{content.title}</div>
                <p>{content.description}</p>
                {Math.round((handleContentDurationPath(content) / 60) * 10) / 10}min
                <FontAwesomeIcon
                  onClick={() => playAudio(handleContentTypePath(content))}
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
        data={contentData.pagination}
        handleFetchNextPage={handleFetchNextPage}
      />
    </>
  );
}

export default ContentList;
