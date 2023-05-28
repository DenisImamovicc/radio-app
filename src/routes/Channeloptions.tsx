import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import useFetch from "../hooks/useFetch";
import Broadcastcard from "../components/Broadcastcard.tsx";
import ProgramCard from "../components/Programscard.tsx";
import PaginationComponent from "../components/PaginationComponent.tsx";
import { useState } from "react";
import Loadingprogramcard from "../components/Loadingprogramcard.tsx";

interface Channeloptions {
  channelData: {
    id: number;
    scheduleurl: string;
  };
}

export default function Channeloptions({ channelData: { id, scheduleurl }}: Channeloptions) {
  const [urls, setUrls] = useState({
    channelUrl: `${scheduleurl}&format=json`,
    programUrl: `https://api.sr.se/api/v2/programs/index?format=json&channelid=${id}`,
  });

  const { data: broadCastData } = useFetch(urls.channelUrl);
  const { data: programsData } = useFetch(urls.programUrl);
  
  const handleFetchNextPage = (nextpageData: string) => {
    setUrls((prevUrls) => {
      if (nextpageData.includes("programs")) {
        return { ...prevUrls, programUrl: nextpageData };
      } else {
        return { ...prevUrls, channelUrl: nextpageData };
      }
    });
  };

  if (!programsData || !broadCastData) {
    return <Loadingprogramcard />;
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
            broadCastData.schedule.map((episode: any,index: number) => (
              <Broadcastcard episode={episode} key={index}/>
            ))}
          <PaginationComponent
            data={broadCastData.pagination}
            handleFetchNextPage={handleFetchNextPage}
          />
        </Tab>
        <Tab eventKey="Program" title="Program">
          {programsData.programs.map((program: any,index: number) => (
            <ProgramCard program={program} key={index}/>
          ))}
          <PaginationComponent
            data={programsData.pagination}
            handleFetchNextPage={handleFetchNextPage}
          />
        </Tab>
      </Tabs>
    </>
  );
}