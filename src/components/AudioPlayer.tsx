import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import useFetch from "../hooks/useFetch";

interface AudioPlayer {
  setaudioFile: (url: string) => void;
  audioFile: {
    songFile: string;
    contentID: string;
  };
}

const AudioPlayer = ({ setaudioFile, audioFile }: AudioPlayer) => {
  const [songInfo, setsongInfo] = useState("");
  const [url, seturl] = useState("");
  const { data, isLoading } = useFetch(url);

  useEffect(() => {
    updateAudio();
    // setsongInfo("");
    if (audioFile.contentID) {
      seturl(
        `https://api.sr.se/api/v2/playlists/rightnow?channelid=${audioFile.contentID}&format=json`
      );      
    }else{
      seturl("")
    }
    console.log(audioFile.contentID, songInfo);
  }, [audioFile]);

  useEffect(() => {
    if (isLoading === false && audioFile.contentID) {
      console.log("Curr song info:",data);
      setsongInfo(data);
    } else {
      console.log("Nå skit samma");
    }
  }, [isLoading]);

  const updateAudio = () => {
    document
      .getElementById("my-audio")
      ?.setAttribute("src", audioFile.songFile);
  };

  // const toggleNextSongInfo = () => {
    
  // };

  return (
    <>
      <div className="audioplayer">
        {audioFile.songFile && audioFile.contentID ? (
          <>
            <Button
              // onClick={() => setaudioFile("")}
              className="songinfobtn w-100"
              variant="primary"
            >
              {songInfo && songInfo.playlist.song
                ? `${songInfo.playlist.song.artist} - ${songInfo.playlist.song.title}`
                : `${songInfo.playlist.previoussong.artist} - ${songInfo.playlist.previoussong.title}`
                }
            </Button>
            <Button
              onClick={() => setaudioFile("")}
              className="closebutton"
              variant="danger"
            >
              X
            </Button>
          </>
        ) : (
          ""
        )}
        {audioFile.songFile ? (
          <audio controls autoPlay className="w-100" id="my-audio">
            <source src={audioFile.songFile} type="audio/mpeg"></source>
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
