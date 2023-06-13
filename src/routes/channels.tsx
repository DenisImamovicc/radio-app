import PaginationComponent from "../components/PaginationComponent.tsx";
import useFetch from "../hooks/useFetch";
import { useState } from "react";
import Loadingprogramcard from "../components/Loadingprogramcard.tsx";
import ChannelsCard from "../components/ChannelsCard.tsx";

import Container from 'react-bootstrap/Container';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

interface Channels {
  setaudioFile: (url: string) => void;
}

interface channel {
  id: number;
  image: string;
  channeltype: string;
  name: string;
  tagline: string;
  liveaudio: {
    url: string;
  };
}

const Channels = ({ setaudioFile }: Channels) => {
  const [Url, setUrl] = useState(
    "https://api.sr.se/api/v2/channels/?format=json"
  );
  const { data } = useFetch(Url);

  if (!data || !data.channels) {
    return <Loadingprogramcard />;
  }

  const handleFetchNextPage = (nextpageData: string) => {
    setUrl(nextpageData);
  };

  return (
    <>
    <Container className="mt-5">
      <Row xs={1} md={2} lg={3}>
        {data.channels &&
          data.channels.map((channel: channel) => (
            <Col>
              <ChannelsCard channel={channel} setaudioFile={setaudioFile} />
            </Col>
          ))}
      </Row>
      </Container>
      <PaginationComponent
        data={data.pagination}
        handleFetchNextPage={handleFetchNextPage}
      />
    </>
  );
};
export default Channels;
