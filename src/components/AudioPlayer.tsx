
const AudioPlayer = (audioUrl:String) => {
    console.log(audioUrl);

  return (
    <audio controls className="audioplayer" autoPlay>
        <source src={audioUrl.audioFile} type="audio/mpeg" ></source>
    </audio>
  )
}

export default AudioPlayer