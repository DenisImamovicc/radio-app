import { useLocation } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
const Program = () => {
  const programData = useLocation().state;
  console.log(programData);

  if (!programData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2 className="text-center m-2 text-white">{programData.name}</h2>
      <Card key={programData.id} className="m-3" bg="dark" text="white">
        <Card.Img variant="top" src={programData.programimage} height={360} />
        <Card.Body>
          <Card.Title>
          Radiopresentatör : {programData.responsibleeditor} 
            <br/>
            <div className="d-flex justify-content-between">
            {programData.socialmediaplatforms.map((platform:any)=>(
              <Button className=" mt-2" href={platform.platformurl}>{platform.platform}</Button>
            ))}
            </div>
          </Card.Title>
          <hr/>
          <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
          <Card.Text>
            {programData.description}
            <br/><hr/>
            {programData.broadcastinfo}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Program;
