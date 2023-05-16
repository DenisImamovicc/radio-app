const AudioPlayer = (props) => {
  return (
    <>
      <button onClick={() => props.setaudioFile("")} className="w-100">
        Reset
      </button>
      {props.audioFile ? (
        <audio controls className="audioplayer" autoPlay>
          <source src={props.audioFile} type="audio/mpeg"></source>
        </audio>
      ) : (
        ""
      )}
    </>
  );
};

export default AudioPlayer;
