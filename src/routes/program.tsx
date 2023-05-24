import { useLocation } from "react-router-dom";
import ProgramCard from "../components/Programcard";

const Program = () => {
  const programData = useLocation().state;
  console.log(programData);

  return (
    <>
      <h2 className="text-center m-2 text-white">{programData.name}</h2>
      <ProgramCard programData={programData}/>
    </>
  );
};

export default Program;
