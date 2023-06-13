import Carousel from "react-bootstrap/Carousel";
import useFetch from "../hooks/useFetch";
import { useState } from "react";
import { Link } from "react-router-dom";
import LoadingCarousel from "./LoadingCarousel";

interface program {
  id: number;
  programimage: string;
  name: string;
  programcategory: {
    name: string;
  };
}

const ProgramSuggestionsCarousel = () => {
  const [randomNum] = useState<number>(Math.floor(Math.random() * 6) + 1);
  const { data, isLoading } = useFetch(
    `https://api.sr.se/api/v2/programs/index?format=json&page=${randomNum}&size=4`
  );

  if (isLoading || !data)
    return <LoadingCarousel title="Rekommenderade program:" />;

  return (
    <>
      <div>
        <h2 className="fs-5 m-2 text-white">Rekommenderade program:</h2>
        <Carousel className="w-50">
          {data.programs.map((program: program) => (
            <Carousel.Item key={program.id}>
              <Link to={`/Programs/Program/${program.id}`} state={program}>
                <img
                  className="d-block w-100"
                  src={program.programimage}
                  alt={program.name}
                  height={360}
                />
              </Link>
              <Carousel.Caption className="bg-dark position-static h-100">
                <h3>{program.name}</h3>
                <p>{program.programcategory?.name}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default ProgramSuggestionsCarousel;
