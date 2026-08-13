"use client";

import { useEffect, useState } from "react";
import { usePlayer, Song } from "@/context/PlayerContext";
import songsData from "@/data/songs.json";

export default function Wallpaper() {
  const { currentSong, isPlaying, playSong } = usePlayer();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Start playing a random song on mount for the wallpaper
    if (!currentSong && songsData && songsData.length > 0) {
      const typedSongsData = songsData as Song[];
      const randomIdx = Math.floor(Math.random() * typedSongsData.length);
      playSong(typedSongsData[randomIdx], typedSongsData);
    }
  }, [currentSong, playSong]);

  if (!mounted) return null;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-brand-cream">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] ease-in-out"
        style={{ 
          backgroundImage: "url('/background/bg_1.png')",
          transform: isPlaying ? 'scale(1.05)' : 'scale(1)'
        }}
      />
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 z-0 bg-black/10" />
    </div>
  );
}
