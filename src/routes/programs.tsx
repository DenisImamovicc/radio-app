import Card from "react-bootstrap/Card";
import useFetch from "../hooks/useFetch";
import ProgramTypeDropdown from "../components/ProgramTypeDropdown";
import { useState } from "react";
import PaginationComponent from "../components/PaginationComponent.tsx";
import { Link } from "react-router-dom";

function Programs() {
  const [programCategory, setprogramCategory] = useState<string>("");
  const [Url, setUrl] = useState<string>(
    `https://api.sr.se/api/v2/programs/index?format=json${programCategory}`
  );
  const { data } = useFetch(Url);

  if (!data || !data.programs) {
    return (
      <div className="loading-placeholder">
        <p>Loading...</p>
      </div>
    );
  }

  const handleFetchNextPage = (nextpageData: string) => {
    setUrl(nextpageData);
  };

  const checkNextPage = (pageKey: string) => {
    if (!pageKey) {
      return data.pagination.previouspage;
    }
    return data.pagination.nextpage;
  };
  return (
    <>
      <ProgramTypeDropdown
        setprogramCategory={setprogramCategory}
        setUrl={setUrl}
      />
      {data.programs.map((program: any) => (
        <Card key={program.id} className="m-3 " bg="dark" text="white">
          <Link to={"/Programs/Program"} state={program}>
            <Card.Img
              variant="top"
              src={program.programimage}
              height={360}
              loading="lazy"
            />
          </Link>
          <Card.Body>
            <Card.Title>
              {program.name} - {program.programcategory?.name}
            </Card.Title>
            <Card.Text>{program.description}</Card.Text>
          </Card.Body>
        </Card>
      ))}
      <PaginationComponent
        totalpages={data.pagination.totalpages}
        active={data.pagination.page}
        handleFetchNextPage={handleFetchNextPage}
        nextPageUrl={checkNextPage(data.pagination.nextpage)}
      />
    </>
  );
}
export default Programs;
