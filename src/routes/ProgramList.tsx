import useFetch from "../hooks/useFetch.tsx";
import ProgramTypeDropdown from "../components/ProgramTypeDropdown.tsx";
import { useState } from "react";
import PaginationComponent from "../components/PaginationComponent.tsx";
import ProgramCards from "../components/ProgramListCard.tsx";
import Loadingprogramcard from "../components/Loadingprogramcard.tsx";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function Programs() {
  const [programCategory, setprogramCategory] = useState<string>("");
  const [Url, setUrl] = useState<string>(
    `https://api.sr.se/api/v2/programs/index?format=json${programCategory}`
  );
  const { data } = useFetch(Url);

  if (!data || !data.programs) return <Loadingprogramcard />;

  const handleFetchNextPage = (nextpageData: string) => setUrl(nextpageData);

  return (
    <>
      <Container>
      <ProgramTypeDropdown
        setprogramCategory={setprogramCategory}
        setUrl={setUrl}
      />
        <Row xs={1} md={2} lg={3}>
          {data.programs.map((program: any) => (
            <Col>
              <ProgramCards program={program} />
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
}
export default Programs;
