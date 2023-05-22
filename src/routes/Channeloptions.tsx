import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import useFetch from "../hooks/useFetch";
import Broadcastcard from "../components/Broadcastcard.tsx";
import ProgramCard from "../components/Programcard.tsx";
import PaginationComponent from "../components/PaginationComponent.tsx";
import { useState } from "react";

interface Channeloptions {
  channelData: {
    id: number;
    scheduleurl: string;
  };
}

export default function Channeloptions({ channelData }: Channeloptions) {
  const [ChannelUrl, setChannelUrl] = useState(
    `${channelData.scheduleurl}&format=json`
  );
  const [ProgramUrl, setProgramUrl] = useState(
    `https://api.sr.se/api/v2/programs/index?format=json&channelid=${channelData.id}`
  );

  const { data: broadCastData } = useFetch(ChannelUrl);
  const { data: programsData } = useFetch(ProgramUrl);

  const handleFetchNextPage = (nextpageData: string) => {
    if (nextpageData.includes("programs")) {
      setProgramUrl(nextpageData);
    } else {
      setChannelUrl(nextpageData);
    }
  };

  const checkNextPage = (data: any) => {
    if (!data.pagination.nextpage) {
      return data.pagination.previouspage;
    }
    return data.pagination.nextpage;
  };

  if (!programsData || !broadCastData) {
    return (
      <div className="loading-placeholder">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Tabs
        defaultActiveKey="Sändningar"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="Sändningar" title="Sändningar">
          {broadCastData.schedule &&
            broadCastData.schedule.map((episode: any) => (
              <Broadcastcard episode={episode} />
            ))}
          <PaginationComponent
            totalpages={broadCastData.pagination.totalpages}
            active={broadCastData.pagination.page}
            handleFetchNextPage={handleFetchNextPage}
            nextPageUrl={checkNextPage(broadCastData)}
          />
        </Tab>
        <Tab eventKey="Program" title="Program">
          {programsData.programs.map((program: any) => (
            <ProgramCard program={program} />
          ))}
          <PaginationComponent
            totalpages={programsData.pagination.totalpages}
            active={programsData.pagination.page}
            handleFetchNextPage={handleFetchNextPage}
            nextPageUrl={checkNextPage(programsData)}
          />
        </Tab>
      </Tabs>
    </>
  );
}
