import { createContext, useContext, useState } from "react";
//import { useMusic } from "../hooks/useMusic.js";

const MusicContext = createContext();

const songs = [
  {
    id: 1,
    title: "Cruising ",
    artist: "Aisake, Dosi",
    url: "./songs/Aisake, Dosi - Cruising [NCS Release].mp3",
    duration: "2:40",
  },
  {
    id: 2,
    title: "I Like It",
    artist: "Fame Sounds, P for Parker, Defx",
    url: "./songs/Fame Sounds, P for Parker, Defx - I Like It [NCS Release].mp3",
    duration: "2:30",
  },
  {
    id: 3,
    title: "Off2",
    artist: "Jonty",
    url: "./songs/jonty - off2 [NCS Release].mp3",
    duration: "3:39",
  },
  {
    id: 4,
    title: "Reason ",
    artist: "MANIA, Remy Night",
    url: "./songs/MANIA, Remy Night - Reason (ft. Remy Night) [NCS Release].mp3",
    duration: "3:00",
  },
  {
    id: 5,
    title: "GO",
    artist: "Sam Day",
    url: "./songs/Sam Day - GO [NCS Release].mp3",
    duration: "2:32",
  },
  {
    id: 6,
    title: "Alright",
    artist: "Sync, Avi Snow, Marky Style",
    url: "./songs/Sync, Avi Snow, Marky Style - Alright [NCS Release].mp3",
    duration: "2:14",
  },
  {
    id: 7,
    title: "For You",
    artist: "T & Sugah, Snnr",
    url: "./songs/T & Sugah, Snnr - For You (ft. Snnr) [NCS Release].mp3",
    duration: "2:17",
  },
];

export const MusicProvider = ({ children }) => {
  const [allSongs, setAllSongs] = useState(songs);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  const handlePlaySong = (song, index) => {
    setCurrentSong(song);
    setCurrentSongIndex(index);
    setIsPlaying(false);
  };

  const nextTrack = () => {
    setCurrentSongIndex((prve) => {
      const nextIndex = (prve + 1) % allSongs.length;
      setCurrentSong(allSongs[nextIndex]);
      return nextIndex;
    });
    setIsPlaying(false);
  };

  const prevTrack = () => {
    setCurrentSongIndex((prve) => {
      const nextIndex = prve === 0 ? allSongs.length - 1 : prve - 1;
      setCurrentSong(allSongs[nextIndex]);
      return nextIndex;
    });
    setIsPlaying(false);
  };

  const formatTime = (time) => {
    if (isNaN(time) || time === undefined) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);

  return (
    <MusicContext.Provider
      value={{
        allSongs,
        handlePlaySong,
        currentSongIndex,
        currentSong,
        currentTime,
        formatTime,
        duration,
        setDuration,
        setCurrentTime,
        nextTrack,
        prevTrack,
        isPlaying,
        play,
        pause,
        volume,
        setVolume,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const contextValue = useContext(MusicContext);

  if (!contextValue) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return contextValue;
};
