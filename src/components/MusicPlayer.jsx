import { useEffect, useRef } from "react";
import { useMusic } from "../hooks/useMusic";

export const MusicPlayer = () => {
  const {
    currentSong,
    formatTime,
    currentTime,
    duration,
    setDuration,
    setCurrentTime,
    nextTrack,
    prevTrack,
    isPlaying,
    play,
    pause,
  } = useMusic();
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((err) => console.error(err));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      //console.log(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {};

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [setDuration, setCurrentTime, currentSong]);

  return (
    <>
      <div className="music-player">
        <audio
          ref={audioRef}
          src={currentSong.url}
          preload="metadata"
          crossOrigin="anonymous"
        />

        <div className="song-info">
          <h3 className="song-title">{currentSong.title}</h3>
          <p className="song-artist">{currentSong.artist}</p>
        </div>
        <div className="progress-container">
          <span className="time">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={currentTime || 0}
            className="progress-bar"
            style={{
              backgroundSize: `${(currentTime / duration) * 100}% 100%`,
            }}
          />
          <span className="time">{formatTime(duration)}</span>
        </div>
        <div className="container">
          <button className="control-btn" onClick={prevTrack}>
            ⏮
          </button>
          <button
            className="control-btn play-btn"
            onClick={isPlaying ? pause : play}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
          <button className="control-btn" onClick={nextTrack}>
            ⏭
          </button>
        </div>
      </div>
    </>
  );
};
