import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import "./MusicPlayer.css";

const MusicPlayer = forwardRef((props, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
  const audio = audioRef.current;
  if (!audio) return;

  if (audio.paused) {
    audio.muted = false;
    audio.volume = 0.8;
    audio.play(); // 🔥 DIRECT PLAY (mobile-safe)
    setIsPlaying(true);
  } else {
    audio.pause();
    setIsPlaying(false);
  }
};

  // Expose play/pause methods to parent components
  useImperativeHandle(ref, () => ({
    play: () => {
      const audio = audioRef.current;
      if (audio && !isPlaying) {
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error("Error playing audio:", error);
          });
      }
    },
    pause: () => {
      const audio = audioRef.current;
      if (audio && isPlaying) {
        audio.pause();
        setIsPlaying(false);
      }
    },
    toggle: () => {
      toggleMusic();
    },
  }));

  

  return (
    <>
      <audio ref={audioRef} loop preload="auto">
        <source src={import.meta.env.BASE_URL + "music.mp3"} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <button
        className="music-toggle"
        onClick={toggleMusic}
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? "⏸ Pause Music" : "🎵 Play Music"}
      </button>
    </>
  );
});

MusicPlayer.displayName = "MusicPlayer";

export default MusicPlayer;
