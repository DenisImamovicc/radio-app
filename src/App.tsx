import { useState } from "react";
import "./App.css";
import AudioPlayer from "./components/AudioPlayer";
import ChannelSuggestionsCarousel from "./components/ChannelSuggestionsCarousel";
import Navbar from "./components/Navbar";
import ProgramSuggestionsCarousel from "./components/ProgramSuggestionsCarousel";
import Channels from "./routes/channels";
import Programs from "./routes/programs";
import { Route, Routes } from "react-router-dom";
function App() {
  const [audioFile, setaudioFile] = useState("");

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/Channels" element={<Channels setaudioFile={setaudioFile}/>}></Route>
        <Route path="/Programs" element={<Programs />}></Route>
        <Route
          path="/"
          element={[
            <ProgramSuggestionsCarousel />,
            <ChannelSuggestionsCarousel setaudioFile={setaudioFile}audioFile={audioFile}/>,
          ]}
        ></Route>
      </Routes>
      <AudioPlayer setaudioFile={setaudioFile} audioFile={audioFile} />
    </>
  );
}

export default App;
