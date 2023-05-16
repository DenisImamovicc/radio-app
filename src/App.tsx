import { useState,useEffect } from 'react';
import './App.css'
import AudioPlayer from './components/AudioPlayer'
import ChannelSuggestionsCarousel from './components/ChannelSuggestionsCarousel'
import Navbar from './components/Navbar'
import ProgramSuggestionsCarousel from './components/ProgramSuggestionsCarousel'

function App() {
  const [audioFile, setaudioFile] = useState<string>("")

  return (
    <>
    <Navbar />
    <ProgramSuggestionsCarousel />
    <ChannelSuggestionsCarousel setaudioFile={setaudioFile} audioFile={audioFile}/>
    {audioFile ? <AudioPlayer audioFile={audioFile}/>:""}
    </>
  )
}

export default App
