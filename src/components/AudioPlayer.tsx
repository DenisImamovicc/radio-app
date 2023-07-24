import { useEffect } from "react";
import { Button } from "react-bootstrap";

interface AudioPlayer {
  setaudioFile: (url: string) => void;
  audioFile: string;
}

const AudioPlayer = ({ setaudioFile, audioFile }: AudioPlayer) => {
  useEffect(() => {
    updateAudio();
  }, [audioFile]);

  const updateAudio = () => {
    document.getElementById("my-audio")?.setAttribute("src", audioFile);
  };

  return (
    <>
      <div className="audioplayer ">
        {audioFile ? (
          <Button
            onClick={() => setaudioFile("")}
            className="closebutton"
            variant="danger"
          >
            X
          </Button>
        ) : (
          ""
        )}
        {audioFile ? (
          <audio controls autoPlay className="w-100" id="my-audio">
            <source src={audioFile} type="audio/mpeg"></source>
          </audio>
        ) : (
          <audio
            controls
            autoPlay
            className="w-100 visually-hidden"
            id="my-audio"
          >
            <source src={audioFile} type="audio/mpeg"></source>
          </audio>
        )}
      </div>
    </>
  );
};

export default AudioPlayer;
