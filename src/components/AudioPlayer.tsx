import { Button } from "react-bootstrap";

interface AudioPlayer {
  setaudioFile: (url: string) => void;
  audioFile: string;
}

const AudioPlayer = ({ setaudioFile, audioFile }: AudioPlayer) => {
  return (
    <>
      <div className="audioplayer ">
        <Button
          onClick={() => setaudioFile("")}
          className="w-100 p-2 "
          variant="dark"
        >
          Ta bort nuvarande för att kunna spela nästa
        </Button>
        {audioFile ? (
          <audio controls autoPlay className="w-100">
            <source src={audioFile} type="audio/mpeg"></source>
          </audio>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default AudioPlayer;
