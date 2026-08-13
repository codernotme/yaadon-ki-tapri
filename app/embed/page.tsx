"use client";

import { useState } from "react";
import { usePlayer } from "@/context/PlayerContext";
import { Play, Pause, SkipForward, SkipBack, Music2 } from "lucide-react";
import clsx from "clsx";
import songsData from "@/data/songs.json";

export default function EmbedWidget() {
  const [expanded, setExpanded] = useState(false);
  const { currentSong, isPlaying, togglePlay, nextSong, prevSong, playSong } = usePlayer();

  if (!expanded) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button 
          onClick={() => {
            setExpanded(true);
            if (!currentSong) playSong(songsData[0], songsData);
          }}
          className="w-16 h-16 bg-brand-cream border-2 border-brand-black rounded-full shadow-[4px_4px_0_0_#2B2118] flex items-center justify-center hover:scale-105 transition-transform"
        >
          <div className={clsx("w-10 h-10 bg-brand-teal rounded-full border-2 border-brand-black flex items-center justify-center", isPlaying ? "animate-spin-slow" : "")}>
            <Music2 size={20} className="text-brand-cream fill-brand-cream" />
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-sm bg-brand-cream border-2 border-brand-black rounded-xl shadow-[6px_6px_0_0_#2B2118] p-4 flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 flex-shrink-0 bg-brand-teal rounded-md border-2 border-brand-black flex items-center justify-center overflow-hidden">
            <div className={clsx("w-8 h-8 rounded-full border-2 border-brand-black flex items-center justify-center bg-brand-cream", isPlaying ? "animate-spin-slow" : "")}>
              <div className="w-2 h-2 rounded-full bg-brand-black"></div>
            </div>
          </div>
          <div className="flex-1 min-w-0 pr-4">
            <h3 className="font-sans text-lg font-bold truncate leading-tight text-brand-black">
              {currentSong?.title || "Nukkad Radio"}
            </h3>
            <p className="font-mono text-xs text-brand-gray truncate">
              {currentSong?.artist || "tuning in..."}
            </p>
          </div>
        </div>
        <button onClick={() => setExpanded(false)} className="text-brand-gray hover:text-brand-black p-1">
          &times;
        </button>
      </div>

      <div className="flex items-center justify-center gap-4 py-2">
        <button onClick={prevSong} className="p-2 hover:bg-brand-yellow/20 rounded-full transition-colors active:scale-95">
          <SkipBack size={24} className="fill-brand-black" />
        </button>
        <button 
          onClick={togglePlay}
          className="p-4 bg-brand-red rounded-full border-2 border-brand-black shadow-[2px_2px_0_0_#2B2118] hover:translate-y-[1px] hover:shadow-[1px_1px_0_0_#2B2118] transition-all active:shadow-none active:translate-y-[2px]"
        >
          {isPlaying ? <Pause size={24} className="text-brand-cream fill-brand-cream" /> : <Play size={24} className="text-brand-cream fill-brand-cream ml-1" />}
        </button>
        <button onClick={nextSong} className="p-2 hover:bg-brand-yellow/20 rounded-full transition-colors active:scale-95">
          <SkipForward size={24} className="fill-brand-black" />
        </button>
      </div>
      
      {/* Equalizer */}
      {isPlaying && (
        <div className="h-2 flex items-end justify-center gap-[2px] opacity-20 pointer-events-none mt-2">
           {[...Array(20)].map((_, i) => (
             <div key={i} className={`w-1 bg-brand-black animate-eq animate-eq-delay-${(i % 4) + 1}`} style={{height: `${Math.random() * 100}%`}}></div>
           ))}
        </div>
      )}
    </div>
  );
}
