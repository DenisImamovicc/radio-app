import { useLocation, useParams } from "react-router-dom";
import ProgramCard from "../components/Programcard";
import useFetch from "../hooks/useFetch";
import Loadingprogramcard from "../components/Loadingprogramcard";
import { Placeholder } from "react-bootstrap";
import Broadcasts from "../components/Broadcasts";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

interface audio {
  setaudioFile: (url: string) => void;
}

const Program = ({ setaudioFile }: audio) => {
  const [programData, setprogramData] = useState(null);
  const { id } = useParams();
  const { data } = useFetch(
    `https://api.sr.se/api/v2/programs/${id}?format=json`
  );
  const localData = useLocation().state;

  useEffect(() => {
    console.log(localData, "localdata");
    if (localData) {
      setprogramData(localData);
    } else if (data && data.program) {
      setprogramData(data.program);
    }
  }, [localData, data]);


  return (
    <>
      {programData ? (
        <>
          <Link
            to={`/Channels/Channel/${programData.channel.id}`}
            title={programData.channel.name}
            className="d-flex justify-content-center align-items-center ms-4"
          >
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              className="text-light"
            />
            <h2 className=" m-2 text-white">{programData.name}</h2>
          </Link>
          <Tabs
            defaultActiveKey="Program"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="Program" title="Program">
              <ProgramCard programData={programData} />
            </Tab>
            <Tab eventKey="Sändningar" title="Sändningar">
              <Broadcasts programData={programData} setaudioFile={setaudioFile} />
            </Tab>
            <Tab eventKey="Poddar" title="Podd"></Tab>
            <Tab eventKey="Avsnitt" title="Avsnitt"></Tab>
          </Tabs>
        </>
      ) : (
        <>
          <h2 className="text-center m-2 text-white">
            <Placeholder xs={8} />
          </h2>
          <Loadingprogramcard />
        </>
      )}
    </>
  );
};

export default Program;
