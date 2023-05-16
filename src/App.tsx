import { useState } from 'react';
import './App.css'
import AudioPlayer from './components/AudioPlayer'
import ChannelSuggestionsCarousel from './components/ChannelSuggestionsCarousel'
import Navbar from './components/Navbar'
import ProgramSuggestionsCarousel from './components/ProgramSuggestionsCarousel'

function App() {
  const [audioFile, setaudioFile] = useState("")

  return (
    <>
      <Navbar />
      <ProgramSuggestionsCarousel />
      <ChannelSuggestionsCarousel setaudioFile={setaudioFile} audioFile={audioFile}/>
      <AudioPlayer setaudioFile={setaudioFile} audioFile={audioFile}/>
    </>
  )
}

export default App