import "./App.css";
import AudioPlayer from "./components/AudioPlayer";
import Navbar from "./components/Navbar";
import Channels from "./routes/ChannelList";
import Programs from "./routes/ProgramList";
import Program from "./routes/ProgramDetail";
import { Route, Routes, useNavigate } from "react-router-dom";
import Channel from "./routes/ChannelDetail";
import User from "./routes/UserDashboard";
import Errorpage from "./routes/NotFoundPage";
import RecommendedChannels from "./components/HomePageChannels";
import Selectedprograms from "./components/HomePagePrograms";
import Login from "./routes/LoginAcount";
import NewAcount from "./routes/CreateAcount";
import { useEffect, useState } from "react";

function App() {
  const [audioFile, setaudioFile] = useState({songFile:"",contentID:""});
  const [isLoggedIn, setisLoggedIn] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    handleUserXTimeVisit();

  }, [isLoggedIn]);

  const handleUserXTimeVisit = () => {
    const isFirstTimeVisit: boolean | null = sessionStorage.getItem("isFirstTimeVisit") !== null
    ? JSON.parse(sessionStorage.getItem("isFirstTimeVisit")!)
    : null;
    if (document.cookie.includes("jwt") && isFirstTimeVisit) {
      return "User visited page more than once";
    } else if (document.cookie.includes("jwt")) {
      navigate("/User");
      sessionStorage.setItem("isFirstTimeVisit", "true");
      setisLoggedIn(true);
    } else {
      localStorage.removeItem("UserEmail");
      sessionStorage.removeItem("isFirstTimeVisit");
      setisLoggedIn(false);
    }
  };

  return (
    <div className="App">
      <Navbar isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} />
      <Routes>
        <Route
          path="/Channels"
          element={<Channels setaudioFile={setaudioFile} />}
        />
        <Route
          path="/Channels/Channel/:id"
          element={<Channel setaudioFile={setaudioFile} />}
        />
        <Route path="/Programs" element={<Programs />} />
        <Route
          path="/Programs/Program/:id"
          element={<Program setaudioFile={setaudioFile} />}
        />
        <Route path="/User" element={<User setaudioFile={setaudioFile} />} />
        <Route
          path="/Login"
          element={<Login setisLoggedIn={setisLoggedIn} />}
        />
        <Route path="/NewAcount" element={<NewAcount />} />
        <Route
          path="/"
          element={[
            <RecommendedChannels
              setaudioFile={setaudioFile}
              audioFile={audioFile}
            />,
            <Selectedprograms />,
          ]}
        />
        <Route path="*" element={<Errorpage />} />
      </Routes>
      <AudioPlayer setaudioFile={setaudioFile} audioFile={audioFile} />
    </div>
  );
}

export default App;
