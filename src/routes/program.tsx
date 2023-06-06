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
        <>
          <ProgramCard programData={programData.program} />
        </>
      ) : (
        <>
          <ProgramCard programData={programData} />
        </>
      )}
    </>
  );
};

export default Program;
