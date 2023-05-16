import Carousel from "react-bootstrap/Carousel";
import data from "../ProgramsData.json"

const ProgramSuggestionsCarousel = () => {
const programs = data.programs
  return (
    <>
    <h2 className="fs-5 mt-1">Program suggestions:</h2>
    <Carousel>
      {programs.map((program) => ( 
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={program.programimage}
            alt={program.name}
          />
          <Carousel.Caption className="bg-dark position-static h-100">
            <h3>{program.name}</h3>
            <p>{program.programcategory?.name}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
    </>
  );
};

export default ProgramSuggestionsCarousel;
