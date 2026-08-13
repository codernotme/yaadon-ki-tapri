"use client";

import { useEffect, useState } from "react";
import { usePlayer } from "@/context/PlayerContext";
import songsData from "@/data/songs.json";
import clsx from "clsx";

export default function Wallpaper() {
  const { currentSong, isPlaying, playSong } = usePlayer();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Start playing a random song on mount for the wallpaper
    if (!currentSong) {
      const randomIdx = Math.floor(Math.random() * songsData.length);
      playSong(songsData[randomIdx], songsData);
    }
  }, [currentSong, playSong]);

  if (!mounted) return null;

  return (
    <div className="flex-1 w-screen h-screen flex flex-col items-center justify-center relative overflow-hidden bg-brand-cream">
      {/* Huge subtle text background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <h1 className="font-sans text-[20vw] font-bold text-brand-black tracking-tighter whitespace-nowrap">
          NUKKAD RADIO
        </h1>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Giant Cassette Spin */}
        <div className="w-64 h-64 mb-12 bg-brand-teal rounded-xl border-4 border-brand-black flex items-center justify-center overflow-hidden shadow-[12px_12px_0_0_#2B2118]">
          <div className={clsx("w-40 h-40 rounded-full border-4 border-brand-black flex items-center justify-center bg-brand-cream", isPlaying ? "animate-spin-slow" : "")}>
            <div className="w-8 h-8 rounded-full bg-brand-black"></div>
          </div>
        </div>

        {/* Track Info */}
        <div className="text-center bg-brand-cream/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-brand-black shadow-[6px_6px_0_0_#2B2118]">
          <h2 className="font-sans text-4xl md:text-6xl font-bold text-brand-black mb-2">
            {currentSong?.title || "Tuning in..."}
          </h2>
          <p className="font-mono text-xl md:text-2xl text-brand-gray">
            {currentSong?.artist || "Please wait"}
          </p>
        </div>
      </div>

      {/* Full screen equalizer */}
      {isPlaying && (
        <div className="absolute bottom-0 left-0 right-0 h-1/4 flex items-end justify-center gap-1 opacity-10 pointer-events-none">
           {[...Array(50)].map((_, i) => (
             <div key={i} className={`flex-1 bg-brand-black animate-eq animate-eq-delay-${(i % 4) + 1}`} style={{height: `${Math.random() * 100}%`}}></div>
           ))}
        </div>
      )}
    </div>
  );
}
