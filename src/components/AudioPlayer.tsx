import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX, Play, Pause, Music } from 'lucide-react';
import { INVITATION_CONFIG } from '../config/invitation';

interface AudioPlayerProps {
  autoPlayTriggered: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ autoPlayTriggered }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [audioError, setAudioError] = useState<boolean>(false);
  const [showElsaBubble, setShowElsaBubble] = useState<boolean>(true);

  // Play audio safely
  const playAudio = useCallback(async () => {
    if (!audioRef.current) return;
    try {
      audioRef.current.volume = INVITATION_CONFIG.music.defaultVolume;
      await audioRef.current.play();
      setIsPlaying(true);
      setAudioError(false);
      setHasInteracted(true);
    } catch (err) {
      console.warn('Audio playback waiting for user click:', err);
      setIsPlaying(false);
      setAudioError(true);
    }
  }, []);

  const pauseAudio = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  }, [isPlaying, pauseAudio, playAudio]);

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    audioRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  }, [isMuted]);

  // When autoPlayTriggered changes from parent (CLICK TO OPEN)
  useEffect(() => {
    if (autoPlayTriggered) {
      playAudio();
    }
  }, [autoPlayTriggered, playAudio]);

  // Hide Elsa hint bubble after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowElsaBubble(false);
    }, 9000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <audio
        ref={audioRef}
        src={INVITATION_CONFIG.music.audioPath}
        loop={INVITATION_CONFIG.music.loop}
        preload="auto"
        onError={() => {
          // Fallback to the alternative uploaded asset path if needed
          if (audioRef.current && audioRef.current.src.includes('baby-az-music.mp3')) {
            audioRef.current.src = INVITATION_CONFIG.music.fallbackAudioPath;
            audioRef.current.load();
            if (autoPlayTriggered) {
              audioRef.current.play().catch(() => setAudioError(true));
            }
          } else {
            setAudioError(true);
          }
        }}
      />

      {/* Floating Frozen Music Player Widget */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2">
        {/* Playback hint or Elsa encouragement bubble */}
        {showElsaBubble && !isPlaying && (
          <div className="frosted-glass rounded-xl px-3 py-2 text-xs text-[#294867] shadow-lg border border-[#B9E2F5] max-w-[200px] text-right animate-bounce">
            <span className="font-semibold block text-[#E998AF]">✨ Tap to Play</span>
            <span>"Do You Want to Build a Snowman?"</span>
          </div>
        )}

        <div className="flex items-center gap-2 p-1.5 rounded-full frosted-glass border-2 border-[#B9E2F5]/80 shadow-xl backdrop-blur-md">
          {/* Elsa Avatar Disc */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
            title={isPlaying ? 'Pause music' : 'Play music'}
            className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md focus:outline-none focus:ring-2 focus:ring-[#E998AF] transition-transform duration-300 hover:scale-105 active:scale-95 group"
          >
            <img
              src={INVITATION_CONFIG.characterArtwork.elsaMusic}
              alt="Elsa Music Disc"
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover object-top transition-transform duration-1000 ${
                isPlaying ? 'animate-[spin_10s_linear_infinite]' : ''
              }`}
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white drop-shadow" />
              ) : (
                <Play className="w-5 h-5 text-white drop-shadow fill-white" />
              )}
            </div>
            {isPlaying && (
              <span className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-[#E998AF] border border-white" />
            )}
          </button>

          {/* Controls */}
          <div className="flex items-center pr-2 gap-1.5">
            <button
              onClick={togglePlay}
              className="p-2 rounded-full text-[#294867] hover:text-[#E998AF] hover:bg-white/60 transition-colors"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            <button
              onClick={toggleMute}
              className="p-2 rounded-full text-[#294867] hover:text-[#E998AF] hover:bg-white/60 transition-colors"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
