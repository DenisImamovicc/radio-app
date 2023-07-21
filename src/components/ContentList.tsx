import { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import useFetch from "../hooks/useFetch";
import Spinner from "react-bootstrap/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faPlay } from "@fortawesome/free-solid-svg-icons";
import PaginationComponent from "./PaginationComponent";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

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

  const handleContentTypePath = (content: any) => {
    if (contentType === "broadcasts") {
      return content.broadcastfiles[0].url;
    } else if (contentType === "podfiles") {
      return content.url;
    } else if (contentType === "episodes") {
      if (content.hasOwnProperty("broadcast")) {
        return content.broadcast.broadcastfiles[0].url;
      } else {
        return content.listenpodfile.url;
      }
    }
    return 0;
  };

  const handleContentDurationPath = (content: any) => {
    if (contentType === "broadcasts") {
      return content.totalduration;
    } else if (contentType === "podfiles") {
      return content.duration;
    } else if (contentType === "episodes") {
      if (content.hasOwnProperty("broadcast")) {
        return content.broadcast.broadcastfiles[0].duration;
      } else {
        return content.listenpodfile.duration;
      }
    }
    return 0;
  };

  const handleDownloadUrl = (data: any) => data.downloadpodfile?.url || "#";

  if (!contentData) {
    return <Spinner animation="border" variant="light" />;
  }

  if (!contentData[contentType].length) {
    return (
      <h2 className="text-light text-center" id="nodatatitel">
        Hittat ingen tillgänglig data
      </h2>
    );
  }

  return (
    <>
      <Container className="mt-5">
        <ListGroup as="ol" numbered className="mb-3" id="Contentlist">
          <Row xs={1} md={2} lg={3}>
            {contentData && contentData[contentType]
              ? contentData[contentType].map((content: any) => (
                  <Col>
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start mx-3  text-light bg-dark"
                      id="contentItem"
                      key={content.id}
                    >
                      <div className="ms-2 me-auto" id="contentMain">
                        <div className="fw-bold ">
                          {content.title}
                          {contentType === "episodes" ? (
                            <a
                              href={handleDownloadUrl(content)}
                              className="text-light ms-1"
                              id="downloadComponent"
                            >
                              <FontAwesomeIcon icon={faDownload} />
                            </a>
                          ) : (
                            ""
                          )}
                        </div>
                        {content.description ? (
                          <p>{content.description}</p>
                        ) : (
                          ""
                        )}
                        <p>
                          <FontAwesomeIcon
                            onClick={() =>
                              playAudio(handleContentTypePath(content))
                            }
                            className="me-1"
                            icon={faPlay}
                          />
                          {Math.round(
                            (handleContentDurationPath(content) / 60) * 10
                          ) / 10}
                          min
                        </p>
                      </div>
                    </ListGroup.Item>
                  </Col>
                ))
              : ""}
          </Row>
        </ListGroup>
      </Container>
      <PaginationComponent
        data={contentData.pagination}
        handleFetchNextPage={handleFetchNextPage}
      />
    </>
  );
}

export default ContentList;
