"use client";

import { useState } from "react";
import { usePlayer, Song } from "@/context/PlayerContext";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react";
import clsx from "clsx";
import songsData from "@/data/songs.json";

export default function EmbedWidget() {
  const [expanded, setExpanded] = useState(false);
  const { currentSong, isPlaying, togglePlay, nextSong, prevSong, playSong } = usePlayer();

  const handleToggleWidget = () => {
    setExpanded(!expanded);
    if (!currentSong && songsData && songsData.length > 0) {
      const typedSongsData = songsData as Song[];
      playSong(typedSongsData[0], typedSongsData);
    }
  };

  if (!expanded) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button 
          onClick={handleToggleWidget}
          className="w-16 h-16 bg-brand-red border-2 border-brand-black rounded-full shadow-[4px_4px_0_0_#2B2118] flex items-center justify-center hover:scale-110 active:scale-95 transition-transform group cursor-pointer overflow-hidden p-1"
          title="Open यादों की टपरी Radio Widget"
        >
          <div className={clsx("w-full h-full rounded-full border-2 border-brand-yellow overflow-hidden flex items-center justify-center shadow-inner bg-black", isPlaying ? "animate-spin-slow" : "")}>
            <img src="/embedd.png" alt="Radio Disc" className="w-full h-full object-cover" />
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[340px] bg-[#151210]/95 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-4 flex flex-col gap-3 text-white">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-2.5">
          <div className={clsx("w-9 h-9 rounded-full border border-brand-yellow/80 overflow-hidden flex items-center justify-center bg-black", isPlaying ? "animate-spin-slow" : "")}>
            <img src="/embedd.png" alt="Yaadon Ki Tapri Disc" className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="font-hindi text-lg font-bold leading-tight text-brand-cream">
              यादों की टपरी
            </h3>
            <p className="font-mono text-[10px] text-white/60 uppercase tracking-wider">
              90s-20s RETRO RADIO
            </p>
          </div>
        </div>

        <button 
          onClick={() => setExpanded(false)} 
          className="text-white/60 hover:text-white text-xl leading-none px-2 py-1 rounded-md hover:bg-white/10 transition-colors"
          title="Minimize Widget"
        >
          &times;
        </button>
      </div>

      {/* Track Info */}
      <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
        <h4 className="font-hindi text-base font-bold text-white truncate">
          {currentSong?.title || "Tuning in..."}
        </h4>
        <p className="font-mono text-xs text-white/60 truncate mt-0.5">
          {currentSong?.artist || "Yaadon Ki Tapri"}
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 py-1">
        <button onClick={prevSong} className="p-2 text-white/80 hover:text-white hover:scale-110 active:scale-95 transition-all">
          <SkipBack size={20} className="fill-current" />
        </button>
        <button 
          onClick={togglePlay}
          className="p-3 bg-brand-cream text-brand-black rounded-full hover:scale-110 hover:bg-white active:scale-95 transition-all shadow-md"
        >
          {isPlaying ? <Pause size={20} className="fill-current" /> : <Play size={20} className="fill-current ml-0.5" />}
        </button>
        <button onClick={nextSong} className="p-2 text-white/80 hover:text-white hover:scale-110 active:scale-95 transition-all">
          <SkipForward size={20} className="fill-current" />
        </button>
      </div>

      {/* Equalizer */}
      {isPlaying && (
        <div className="h-2 flex items-end justify-center gap-[3px] opacity-30 pointer-events-none">
           {[...Array(24)].map((_, i) => (
             <div key={i} className={`w-1 bg-brand-cream rounded-full animate-eq animate-eq-delay-${(i % 4) + 1}`} style={{height: `${((i * 37) % 70) + 30}%`}}></div>
           ))}
        </div>
      )}
    </div>
  );
}
