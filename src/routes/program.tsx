import { useLocation, useParams } from "react-router-dom";
import ProgramCard from "../components/Programcard";
import useFetch from "../hooks/useFetch";
import Loadingprogramcard from "../components/Loadingprogramcard";
import { Placeholder } from "react-bootstrap";

const Program = () => {
  let programData = useLocation().state;
  const { id, isLoading } = useParams();
  const { data } = useFetch(
    `https://api.sr.se/api/v2/programs/${id}?format=json`
  );

  scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  if (!programData) {
    programData = data;
  }

  if (isLoading || !programData) {
    return (
      <>
        <h2 className="text-center m-2 text-white">
          <Placeholder xs={8} />
        </h2>
        <Loadingprogramcard />
      </>
    );
  }

  return (
    <>
      {programData.program ? (
        <div>
          <h2 className="text-center m-2 text-white">
            {programData.program.name}
          </h2>
          <ProgramCard programData={programData.program} />
        </div>
      ) : (
        <div>
          <h2 className="text-center m-2 text-white">{programData.name}</h2>
          <ProgramCard programData={programData} />
        </div>
      )}
    </>
  );
};

export default Program;
