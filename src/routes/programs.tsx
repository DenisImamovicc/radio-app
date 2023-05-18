import Card from "react-bootstrap/Card";
import useFetch from "../hooks/useFetch";

function Programs() {
  const { data } = useFetch(
    "https://api.sr.se/api/v2/programs/index?format=json"
  );

  if (!data || !data.programs) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {data.programs.map((program:any) => (
          <Card key={program.id} className="m-3">
            <Card.Img variant="top" src={program.programimage} />
            <Card.Body>
              <Card.Title>{program.name}- {program.programcategory?.name}</Card.Title>
              <Card.Text>{program.description}</Card.Text>
            </Card.Body>
          </Card>
      ))}
    </>
  )
}
export default Programs