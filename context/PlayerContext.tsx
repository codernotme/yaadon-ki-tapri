"use client";

import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import YouTube, { YouTubeEvent, YouTubePlayer as YTPlayerType } from "react-youtube";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export type Song = {
  id: string;
  title: string;
  artist: string;
  year: string;
  youtubeId: string;
  spotifyUrl: string;
  youtubeMusicUrl: string;
  tags: string[];
};

type PlayerContextType = {
  currentSong: Song | null;
  isPlaying: boolean;
  queue: Song[];
  playSong: (song: Song, queue?: Song[]) => void;
  togglePlay: () => void;
  nextSong: () => void;
  prevSong: () => void;
  setQueue: (queue: Song[]) => void;
};

const PlayerContext = createContext<PlayerContextType | null>(null);

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) throw new Error("usePlayer must be used within PlayerProvider");
  return context;
};

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState<Song[]>([]);
  const playerRef = useRef<YTPlayerType>(null);
  const pathname = usePathname();

  const playSong = (song: Song, newQueue?: Song[]) => {
    setCurrentSong(song);
    setIsPlaying(true);
    if (newQueue) {
      setQueue(newQueue);
    }
  };

  const togglePlay = () => {
    if (!currentSong) return;
    if (isPlaying) {
      playerRef.current?.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current?.playVideo();
      setIsPlaying(true);
    }
  };

  const nextSong = () => {
    if (!currentSong || queue.length === 0) return;
    const currentIndex = queue.findIndex(s => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % queue.length;
    playSong(queue[nextIndex]);
  };

  const prevSong = () => {
    if (!currentSong || queue.length === 0) return;
    const currentIndex = queue.findIndex(s => s.id === currentSong.id);
    const prevIndex = currentIndex === 0 ? queue.length - 1 : currentIndex - 1;
    playSong(queue[prevIndex]);
  };

  const onReady = (event: YouTubeEvent) => {
    playerRef.current = event.target;
    if (isPlaying) {
      playerRef.current.playVideo();
    }
  };

  const onStateChange = (event: YouTubeEvent) => {
    if (event.data === 0) nextSong();
    else if (event.data === 1) setIsPlaying(true);
    else if (event.data === 2) setIsPlaying(false);
  };

  // Only show the big player card on the main site pages
  const showGlobalPlayer = pathname === "/" || pathname === "/browse";

  return (
    <PlayerContext.Provider value={{ currentSong, isPlaying, queue, playSong, togglePlay, nextSong, prevSong, setQueue }}>
      {children}
      
      {currentSong && (
        <div 
          className={clsx(
            showGlobalPlayer 
              ? "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center bg-black/60 backdrop-blur-xl border border-white/10 p-3 rounded-2xl shadow-2xl gap-4 w-[90%] max-w-[600px] transition-transform animate-in slide-in-from-bottom-10"
              : "fixed -bottom-96 -right-96 opacity-0 pointer-events-none w-0 h-0 overflow-hidden"
          )}
        >
          {/* YouTube Video Container */}
          <div className={clsx(
            "rounded-lg overflow-hidden flex-shrink-0 bg-black relative",
            showGlobalPlayer ? "w-24 h-[54px] shadow-inner pointer-events-none" : "w-0 h-0"
          )}>
            <YouTube
              videoId={currentSong.youtubeId}
              opts={{
                height: showGlobalPlayer ? '150' : '10',
                width: showGlobalPlayer ? '200' : '10',
                playerVars: {
                  autoplay: 1,
                  controls: 0,
                  disablekb: 1,
                  fs: 0,
                  modestbranding: 1,
                },
              }}
              onReady={onReady}
              onStateChange={onStateChange}
              className={showGlobalPlayer ? "absolute -top-[48px] -left-[52px]" : ""}
            />
          </div>

          {/* Rest of the UI (Only rendered if showGlobalPlayer is true) */}
          {showGlobalPlayer && (
            <>
              {/* Track Info */}
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <h3 className="font-sans text-brand-cream text-lg font-semibold truncate leading-tight">
                  {currentSong.title}
                </h3>
                <p className="font-mono text-brand-cream/60 text-xs truncate">
                  {currentSong.artist} • {currentSong.year}
                </p>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2 pr-2">
                <button onClick={prevSong} className="p-2 text-brand-cream/80 hover:text-white transition-colors">
                  <SkipBack size={20} className="fill-current" />
                </button>
                <button 
                  onClick={togglePlay}
                  className="p-3 bg-brand-cream text-brand-black rounded-full hover:scale-105 transition-transform"
                >
                  {isPlaying ? <Pause size={20} className="fill-current" /> : <Play size={20} className="fill-current ml-0.5" />}
                </button>
                <button onClick={nextSong} className="p-2 text-brand-cream/80 hover:text-white transition-colors">
                  <SkipForward size={20} className="fill-current" />
                </button>
              </div>
              
              {/* External Links */}
              <div className="hidden md:flex flex-col gap-1 border-l border-white/20 pl-4">
                <a href={currentSong.spotifyUrl} target="_blank" rel="noreferrer" className="text-[10px] font-mono text-brand-cream/60 hover:text-brand-cream transition-colors flex items-center gap-1">
                  Spotify ↗
                </a>
                <a href={currentSong.youtubeMusicUrl} target="_blank" rel="noreferrer" className="text-[10px] font-mono text-brand-cream/60 hover:text-brand-cream transition-colors flex items-center gap-1">
                  YT Music ↗
                </a>
              </div>
            </>
          )}
        </div>
      )}
    </PlayerContext.Provider>
  );
};
