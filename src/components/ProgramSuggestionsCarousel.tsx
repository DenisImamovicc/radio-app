import Carousel from "react-bootstrap/Carousel";
import useFetch from "../hooks/useFetch";

const ProgramSuggestionsCarousel = () => {
  const { data } = useFetch(
    "https://api.sr.se/api/v2/programs/index?format=json"
  );
  
  if (!data || !data.programs) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <h2 className="fs-5 mt-1">Program suggestions:</h2>
      <Carousel>
        {data.programs &&
          data.programs.map((program: any) => (
            <Carousel.Item key={program.id}>
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
