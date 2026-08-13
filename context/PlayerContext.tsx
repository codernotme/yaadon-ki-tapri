"use client";

import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import YouTube, { YouTubeEvent, YouTubePlayer as YTPlayerType } from "react-youtube";
import { Play, Pause, SkipForward, SkipBack, Volume2, ChevronDown, ChevronUp, Disc } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import { ProgressBar, formatTime } from "@/components/ui/ProgressBar";

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
  isCollapsed: boolean;
  queue: Song[];
  currentTime: number;
  duration: number;
  playSong: (song: Song, queue?: Song[]) => void;
  togglePlay: () => void;
  toggleCollapse: () => void;
  nextSong: () => void;
  prevSong: () => void;
  setQueue: (queue: Song[]) => void;
  seekTo: (seconds: number) => void;
  formatTime: (sec: number) => string;
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
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [queue, setQueue] = useState<Song[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef<YTPlayerType>(null);
  const isPlayingRef = useRef(isPlaying);
  const pathname = usePathname();

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Bypass Page Visibility & Blur background auto-pausing via JavaScript
  useEffect(() => {
    try {
      Object.defineProperty(document, "hidden", {
        get: () => false,
        configurable: true,
      });
      Object.defineProperty(document, "visibilityState", {
        get: () => "visible",
        configurable: true,
      });
    } catch {
      // Ignore if document properties are immutable in specific environments
    }

    const preventAutoPause = (e: Event) => {
      e.stopImmediatePropagation();
    };

    window.addEventListener("visibilitychange", preventAutoPause, true);
    window.addEventListener("blur", preventAutoPause, true);

    // Lively Wallpaper background playback hook
    (window as any).livelyWallpaperPlaybackChanged = (data: { isPaused: boolean }) => {
      if (data && data.isPaused && isPlayingRef.current && playerRef.current) {
        setTimeout(() => {
          playerRef.current?.playVideo();
        }, 100);
      }
    };

    return () => {
      window.removeEventListener("visibilitychange", preventAutoPause, true);
      window.removeEventListener("blur", preventAutoPause, true);
    };
  }, []);

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

  const toggleCollapse = () => {
    setIsCollapsed(prev => !prev);
  };

  const seekTo = (seconds: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(seconds, true);
      setCurrentTime(seconds);
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
    if (event.data === 0) {
      nextSong();
    } else if (event.data === 1) {
      setIsPlaying(true);
    } else if (event.data === 2) {
      // If paused automatically by browser/Lively unfocus while user intended to play:
      if (isPlayingRef.current) {
        setTimeout(() => {
          if (isPlayingRef.current && playerRef.current) {
            playerRef.current.playVideo();
          }
        }, 150);
      } else {
        setIsPlaying(false);
      }
    }
  };

  // Track progress timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        if (playerRef.current) {
          setCurrentTime(playerRef.current.getCurrentTime() || 0);
          setDuration(playerRef.current.getDuration() || 0);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const showGlobalPlayer = pathname !== "/embed";

  return (
    <PlayerContext.Provider value={{ currentSong, isPlaying, isCollapsed, queue, currentTime, duration, playSong, togglePlay, toggleCollapse, nextSong, prevSong, setQueue, seekTo, formatTime }}>
      {children}
      
      {currentSong && showGlobalPlayer && (
        <>
          {/* COLLAPSED MINI PLAYER BAR */}
          {isCollapsed ? (
            <div 
              onClick={() => setIsCollapsed(false)}
              className="fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 sm:gap-3.5 bg-[#151210]/95 backdrop-blur-2xl border border-white/20 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.85)] max-w-[92vw] sm:max-w-md transition-all animate-in slide-in-from-bottom-4 cursor-pointer group hover:border-white/40"
            >
              {/* Disc Indicator */}
              <div className={clsx("w-8 h-8 rounded-full border border-brand-yellow/80 overflow-hidden flex items-center justify-center bg-black flex-shrink-0", isPlaying ? "animate-spin-slow" : "")}>
                <Disc size={16} className="text-brand-cream" />
              </div>

              {/* Song Title & Artist */}
              <div className="flex-1 min-w-0 pr-1">
                <p className="font-hindi text-sm font-bold text-brand-cream truncate leading-tight">
                  {currentSong.title}
                </p>
                <p className="font-mono text-[10px] text-white/60 truncate">
                  {currentSong.artist}
                </p>
              </div>

              {/* Controls & Expand Button */}
              <div className="flex items-center gap-1 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                <button 
                  onClick={togglePlay}
                  className="p-2 bg-brand-cream text-brand-black rounded-full hover:scale-110 active:scale-95 transition-transform"
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause size={13} className="fill-current" /> : <Play size={13} className="fill-current ml-0.5" />}
                </button>
                
                <button 
                  onClick={nextSong}
                  className="p-1.5 text-white/80 hover:text-white transition-colors"
                  title="Next Song"
                >
                  <SkipForward size={15} className="fill-current" />
                </button>

                <button
                  onClick={() => setIsCollapsed(false)}
                  className="p-1.5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors ml-0.5"
                  title="Expand Player"
                >
                  <ChevronUp size={15} />
                </button>
              </div>
            </div>
          ) : (
            /* EXPANDED FULL PLAYER CARD */
            <div 
              className="fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col md:flex-row items-center bg-[#151210]/95 backdrop-blur-2xl border border-white/15 p-3.5 sm:p-4 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] gap-3 md:gap-6 w-[94%] max-w-[800px] transition-all animate-in slide-in-from-bottom-8 relative"
            >
              {/* Collapse/Minimize Button */}
              <button
                onClick={() => setIsCollapsed(true)}
                className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 p-1.5 text-white/60 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all z-30"
                title="Collapse Player"
              >
                <ChevronDown size={18} />
              </button>

              {/* YouTube Video Container */}
              <div className="w-full md:w-44 h-32 md:h-28 rounded-xl overflow-hidden flex-shrink-0 bg-black relative border border-white/20 shadow-inner group cursor-pointer">
                <div className="absolute inset-0 scale-125 origin-center pointer-events-none overflow-hidden">
                  <YouTube
                    videoId={currentSong.youtubeId}
                    opts={{
                      height: '260',
                      width: '350',
                      playerVars: {
                        autoplay: 1,
                        controls: 0,
                        disablekb: 1,
                        fs: 0,
                        modestbranding: 1,
                        rel: 0,
                        iv_load_policy: 3,
                      },
                    }}
                    onReady={onReady}
                    onStateChange={onStateChange}
                    className="absolute -top-[70px] -left-[65px]"
                  />
                </div>

                {/* Clickable CTA Link to YouTube */}
                <a
                  href={`https://www.youtube.com/watch?v=${currentSong.youtubeId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/0 group-hover:bg-black/50 transition-all cursor-pointer p-2"
                  title={`Watch "${currentSong.title}" on YouTube`}
                >
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 bg-red-600 hover:bg-red-700 text-white font-mono text-[10px] md:text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl border border-white/20 whitespace-nowrap">
                    <span className="text-white font-bold">▶</span> Watch on YouTube ↗
                  </div>

                  <div className="absolute bottom-1.5 right-2 group-hover:opacity-0 transition-opacity bg-black/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-white/90 flex items-center gap-1 border border-white/10 z-10 whitespace-nowrap">
                    <span className="text-red-500 font-bold">▶</span> YouTube
                  </div>
                </a>
              </div>

              {/* Middle Section: Metadata, Progress Bar & Controls */}
              <div className="flex-1 min-w-0 flex flex-col justify-between w-full pr-6 md:pr-0">
                {/* Song Title & Artist */}
                <div className="mb-1.5 sm:mb-2">
                  <h3 className="font-hindi text-lg sm:text-xl md:text-2xl font-bold text-brand-cream truncate leading-tight tracking-wide">
                    {currentSong.title}
                  </h3>
                  <p className="font-mono text-[11px] sm:text-xs md:text-sm text-brand-cream/70 truncate mt-0.5">
                    {currentSong.artist} • {currentSong.year}
                  </p>
                </div>

                {/* Interactive Progress Scrub Bar */}
                <ProgressBar 
                  currentTime={currentTime} 
                  duration={duration} 
                  onSeek={seekTo} 
                  className="mb-2 sm:mb-3"
                />

                {/* Controls Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <button 
                      onClick={prevSong} 
                      className="p-1.5 text-brand-cream/80 hover:text-white hover:scale-110 active:scale-95 transition-all"
                      title="Previous Song"
                    >
                      <SkipBack size={18} className="fill-current sm:w-5 sm:h-5" />
                    </button>

                    <button 
                      onClick={togglePlay}
                      className="p-2.5 sm:p-3 bg-brand-cream text-brand-black rounded-full hover:scale-110 hover:bg-white active:scale-95 transition-all shadow-md"
                      title={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? <Pause size={18} className="fill-current sm:w-5 sm:h-5" /> : <Play size={18} className="fill-current ml-0.5 sm:w-5 sm:h-5" />}
                    </button>

                    <button 
                      onClick={nextSong} 
                      className="p-1.5 text-brand-cream/80 hover:text-white hover:scale-110 active:scale-95 transition-all"
                      title="Next Song"
                    >
                      <SkipForward size={18} className="fill-current sm:w-5 sm:h-5" />
                    </button>
                  </div>

                  {/* External Streaming Link Pills */}
                  <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-[11px]">
                    <a 
                      href={currentSong.spotifyUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="px-2.5 sm:px-3 py-1 bg-white/5 border border-white/15 rounded-full text-brand-cream/80 hover:text-white hover:bg-white/15 transition-all whitespace-nowrap"
                    >
                      Spotify ↗
                    </a>
                    <a 
                      href={currentSong.youtubeMusicUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="px-2.5 sm:px-3 py-1 bg-white/5 border border-white/15 rounded-full text-brand-cream/80 hover:text-white hover:bg-white/15 transition-all whitespace-nowrap"
                    >
                      YT Music ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </PlayerContext.Provider>
  );
};
