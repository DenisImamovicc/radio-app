import { Placeholder } from "react-bootstrap";
import imageHolderIcon from "../assets/image-holder-icon-614x460.png";
import Carousel from "react-bootstrap/Carousel";

interface title {
  title: string;
}

export default function LoadingCarousel({ title }: title) {
  return (
    <>
      <h2 className="fs-5 m-2 text-white">{title}</h2>
      <Carousel fade>
        <Carousel.Item>
          <img className="d-block w-100" height={360} src={imageHolderIcon} />
          <Placeholder as={Carousel.Caption} animation="glow">
            <Placeholder xs={10} className="mb-3" />
            <Placeholder xs={6} />
          </Placeholder>
        </Carousel.Item>
      </Carousel>
    </>
  );
}
