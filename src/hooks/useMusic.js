import { useState } from "react";

const songs = [
  {
    id: 1,
    title: "Cruising ",
    artist: "Dosi",
    url: "./songs/Aisake, Dosi - Cruising [NCS Release].mp3",
    duration: "2:40",
  },
  {
    id: 2,
    title: "I Like It",
    artist: "P",
    url: "./songs/Fame Sounds, P for Parker, Defx - I Like It [NCS Release].mp3",
    duration: "2:30",
  },
  {
    id: 3,
    title: "Off2",
    artist: "jonty",
    url: "./songs/jonty - off2 [NCS Release].mp3",
    duration: "3:39",
  },
  {
    id: 4,
    title: "Reason ",
    artist: "Remy Night",
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

export const useMusic = () => {
  const [allSongs, setAllSongs] = useState(songs);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handlePlaySong = (song, index) => {
    setCurrentSong(song);
    setCurrentSongIndex(index);
  };

  const formatTime = (time) => {
    if (isNaN(time) || time === undefined) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return {
    allSongs,
    handlePlaySong,
    currentSongIndex,
    currentSong,
    currentTime,
    formatTime,
    duration,
  };
};
