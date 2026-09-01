import { AllSongs } from "./components/AllSongs.jsx";
import { MusicPlayer } from "./components/MusicPlayer.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import { PlayLists } from "./components/PlayLists.jsx";
function App() {
  return (
    <BrowserRouter>
      <div className="app">
        {/*<Navbar />*/}
        <main className="app-main">
          <div className="player-section">
            <MusicPlayer />
          </div>
          <div className="contact-section">
            <Routes>
              <Route path="/" element={<AllSongs />} />
              <Route path="/playlists" element={<PlayLists />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
