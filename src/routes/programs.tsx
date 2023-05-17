import data from "../ProgramsData.json";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Programs() {
  const programs = data.programs;
  console.log(programs);
  return (
    <>
      {programs.map((program) => (
          <Card key={program.id} className="m-3">
            <Card.Img variant="top" src={program.programimage} />
            <Card.Body>
              <Card.Title>{program.name}-{program.programcategory?.name}</Card.Title>
              <Card.Text>{program.description}</Card.Text>
              <Button variant="primary" >Play latest</Button>
            </Card.Body>
          </Card>
      ))}
    </>
  )
}
export default Programs