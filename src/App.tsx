import "./App.css";
import AudioPlayer from "./components/AudioPlayer";
import Navbar from "./components/Navbar";
import Channels from "./routes/channels";
import Programs from "./routes/programs";
import Program from "./routes/program";
import {Route, Routes} from "react-router-dom";
import Channel from "./routes/channel";
import User from "./routes/User";
import Errorpage from "./routes/NotFound";
import RecommendedChannels from "./components/RecommendedChannels";
import Selectedprograms from "./components/Selectedprograms";
import Login from "./routes/Login";
import NewAcount from "./routes/NewAcount";
import { useEffect,useState } from "react";

function App() {
  const [audioFile, setaudioFile] = useState("");
  const [isLoggedIn, setisLoggedIn] = useState<boolean>(false)
  // const navigate = useNavigate();

  //Best attempt of logged in user gets to dashboard
  // when booting up while unlogged gets to the home screen.
  useEffect(() => {
    if (document.cookie.includes("jwt")) {
      // navigate("/User");
      setisLoggedIn(true)
    }else {
      localStorage.removeItem("UserEmail")
      setisLoggedIn(false)
    }
  }, [isLoggedIn])

  return (
    <div className="App">
      <Navbar isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn}/>
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
        <Route path="/Login" element={<Login  setisLoggedIn={setisLoggedIn}/>}/>
        <Route path="/NewAcount" element={<NewAcount />}/>
        <Route
          path="/"
          element={[
            <RecommendedChannels              
            setaudioFile={setaudioFile}
            audioFile={audioFile}
            />,
            <Selectedprograms />
          ]}
        />
        <Route path="*" element={<Errorpage />} />
      </Routes>
      <AudioPlayer setaudioFile={setaudioFile} audioFile={audioFile} />
    </div>
  );
}

export default App;
