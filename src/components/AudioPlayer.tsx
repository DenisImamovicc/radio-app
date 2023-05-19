import { Button } from "react-bootstrap";

const AudioPlayer = (props: any) => {
  return (
    <>
      <div className="audioplayer ">
        <Button
          onClick={() => props.setaudioFile("")}
          className="w-100 p-2 "
          variant="dark"
        >
          Ta bort nuvarande för att kunna spela nästa
        </Button>
        {props.audioFile ? (
          <audio controls  autoPlay className="w-100">
            <source src={props.audioFile} type="audio/mpeg"></source>
          </audio>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default AudioPlayer;
