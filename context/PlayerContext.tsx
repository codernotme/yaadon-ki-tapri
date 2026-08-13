"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import YouTube, { YouTubeEvent, YouTubePlayer as YTPlayerType } from "react-youtube";

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
    // 0 = ended, 1 = playing, 2 = paused
    if (event.data === 0) {
      nextSong();
    } else if (event.data === 1) {
      setIsPlaying(true);
    } else if (event.data === 2) {
      setIsPlaying(false);
    }
  };

  return (
    <PlayerContext.Provider value={{ currentSong, isPlaying, queue, playSong, togglePlay, nextSong, prevSong, setQueue }}>
      {children}
      {currentSong && (
        <div className="fixed -bottom-96 -right-96 opacity-0 pointer-events-none w-0 h-0 overflow-hidden">
          <YouTube
            videoId={currentSong.youtubeId}
            opts={{
              height: '10',
              width: '10',
              playerVars: {
                autoplay: 1,
                controls: 0,
                disablekb: 1,
              },
            }}
            onReady={onReady}
            onStateChange={onStateChange}
          />
        </div>
      )}
    </PlayerContext.Provider>
  );
};
