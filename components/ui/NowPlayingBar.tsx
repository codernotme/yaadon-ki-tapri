"use client";

import { usePlayer } from "@/context/PlayerContext";
import { Play, Pause, SkipForward, SkipBack, Repeat, Shuffle } from "lucide-react";
import clsx from "clsx";

export function NowPlayingBar({ variant = "hero" }: { variant?: "hero" | "bottom" | "compact" }) {
  const { currentSong, isPlaying, togglePlay, nextSong, prevSong } = usePlayer();

  if (!currentSong && variant === "bottom") return null;

  return (
    <div className={clsx(
      "flex items-center gap-4 bg-brand-cream border-2 border-brand-black p-3",
      variant === "hero" ? "rounded-xl shadow-[4px_4px_0_0_#2B2118] w-full max-w-md mx-auto relative z-10" : "",
      variant === "bottom" ? "fixed bottom-0 left-0 right-0 z-50 border-x-0 border-b-0 shadow-[0_-4px_0_0_#2B2118]" : "",
      variant === "compact" ? "rounded-xl shadow-[4px_4px_0_0_#2B2118] w-full max-w-[300px]" : ""
    )}>
      {/* Cassette Visual */}
      <div className="w-12 h-12 flex-shrink-0 bg-brand-teal rounded-md border-2 border-brand-black flex items-center justify-center overflow-hidden">
        <div className={clsx("w-8 h-8 rounded-full border-2 border-brand-black flex items-center justify-center bg-brand-cream", isPlaying ? "animate-spin-slow" : "")}>
          <div className="w-2 h-2 rounded-full bg-brand-black"></div>
        </div>
      </div>

      {/* Track Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-sans text-lg font-bold truncate leading-tight text-brand-black">
          {currentSong?.title || "No track selected"}
        </h3>
        <p className="font-mono text-sm text-brand-gray truncate">
          {currentSong?.artist || "Pick a tape to start"}
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <button onClick={prevSong} className="p-2 hover:bg-brand-yellow/20 rounded-full transition-colors active:scale-95">
          <SkipBack size={20} className="fill-brand-black" />
        </button>
        <button 
          onClick={togglePlay}
          className="p-3 bg-brand-red rounded-full border-2 border-brand-black shadow-[2px_2px_0_0_#2B2118] hover:translate-y-[1px] hover:shadow-[1px_1px_0_0_#2B2118] transition-all active:shadow-none active:translate-y-[2px]"
        >
          {isPlaying ? <Pause size={20} className="text-brand-cream fill-brand-cream" /> : <Play size={20} className="text-brand-cream fill-brand-cream" />}
        </button>
        <button onClick={nextSong} className="p-2 hover:bg-brand-yellow/20 rounded-full transition-colors active:scale-95">
          <SkipForward size={20} className="fill-brand-black" />
        </button>
      </div>
      
      {/* Equalizer (only shows when playing) */}
      {isPlaying && (
        <div className="absolute bottom-1 left-4 right-4 h-1 flex items-end justify-center gap-[2px] opacity-20 pointer-events-none">
           {[...Array(10)].map((_, i) => (
             <div key={i} className={`w-1 bg-brand-black animate-eq animate-eq-delay-${(i % 4) + 1}`} style={{height: `${((i * 37) % 70) + 30}%`}}></div>
           ))}
        </div>
      )}
    </div>
  );
}
