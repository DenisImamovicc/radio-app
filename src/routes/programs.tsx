import useFetch from "../hooks/useFetch";
import ProgramTypeDropdown from "../components/ProgramTypeDropdown";
import { useState } from "react";
import PaginationComponent from "../components/PaginationComponent.tsx";
import ProgramCards from "../components/Programscard.tsx";
import Loadingprogramcard from "../components/Loadingprogramcard.tsx";

function Programs() {
  const [programCategory, setprogramCategory] = useState<string>("");
  const [Url, setUrl] = useState<string>(
    `https://api.sr.se/api/v2/programs/index?format=json${programCategory}`
  );
  const { data} = useFetch(Url);

  if (!data || !data.programs) return <Loadingprogramcard />
  
  const handleFetchNextPage = (nextpageData: string) => setUrl(nextpageData);

  return (
    <>
      <ProgramTypeDropdown
        setprogramCategory={setprogramCategory}
        setUrl={setUrl}
      />

      {data.programs.map((program: any) => (
        <ProgramCards program={program}/>
      ))}
  
      <PaginationComponent
        data={data.pagination}
        handleFetchNextPage={handleFetchNextPage}
      />
    </>
  );
}
export default Programs;
