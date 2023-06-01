import { useState } from "react";
import "./App.css";
import AudioPlayer from "./components/AudioPlayer";
import ChannelSuggestionsCarousel from "./components/ChannelSuggestionsCarousel";
import Navbar from "./components/Navbar";
import ProgramSuggestionsCarousel from "./components/ProgramSuggestionsCarousel";
import Channels from "./routes/channels";
import Programs from "./routes/programs";
import Program from "./routes/program";
import { Route, Routes } from "react-router-dom";
import Channel from "./routes/channel";
import User from "./routes/User";

function App() {
  const [audioFile, setaudioFile] = useState("");

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/Channels"
          element={<Channels setaudioFile={setaudioFile} />}
        />
        <Route path="/Channels/Channel/:id" element={<Channel setaudioFile={setaudioFile}/>} />
        <Route path="/Programs" element={<Programs />} />
        <Route path="/Programs/Program/:id" element={<Program />} />
        <Route path="/User" element={<User setaudioFile={setaudioFile}/>} />

        <Route
          path="/"
          element={[
            <ProgramSuggestionsCarousel />,
            <ChannelSuggestionsCarousel
              setaudioFile={setaudioFile}
              audioFile={audioFile}
            />,
          ]}
        />
      </Routes>
      <AudioPlayer setaudioFile={setaudioFile} audioFile={audioFile} />
    </>
  );
}

export default App;
