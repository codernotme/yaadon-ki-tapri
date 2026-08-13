"use client";

import Link from "next/link";
import { usePlayer, Song } from "@/context/PlayerContext";
import songsData from "@/data/songs.json";
import { Play } from "lucide-react";

export default function Home() {
  const { isPlaying, playSong } = usePlayer();

  const handleStart = () => {
    // If the data is empty or not loaded yet, do nothing
    if (!songsData || songsData.length === 0) return;
    const typedSongsData = songsData as Song[];
    // Pick a random song from the catalogue
    const randomSong = typedSongsData[Math.floor(Math.random() * typedSongsData.length)];
    playSong(randomSong, typedSongsData);
  };

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
      
      {/* Overlay to ensure text readability if needed */}
      <div className="absolute inset-0 z-0 bg-black/10" />
      
      {/* Top Navigation */}
      <nav className="absolute top-6 right-6 md:right-8 z-20 flex gap-4">
        <Link 
          href="/browse" 
          className="bg-black/50 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full font-mono text-sm hover:bg-black/70 hover:scale-105 transition-all shadow-lg"
        >
          Playlists
        </Link>
        <Link 
          href="/browse?tab=All" 
          className="bg-black/50 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full font-mono text-sm hover:bg-black/70 hover:scale-105 transition-all shadow-lg"
        >
          All Songs
        </Link>
      </nav>

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full pb-24 px-4 text-center">
        <h1 className="font-sans text-6xl md:text-8xl lg:text-9xl text-brand-black drop-shadow-[4px_4px_0_#B5533C] mb-4 tracking-wide leading-none">
          Nukkad Radio
        </h1>
        <p className="font-mono text-lg md:text-2xl text-brand-black font-semibold drop-shadow-[2px_2px_0_#ffffff] mb-12 max-w-2xl">
          {isPlaying ? "the rotation right now is playing..." : "the songs playing at every nukkad, every evening."}
        </p>
        
        {!isPlaying && (
          <button 
            onClick={handleStart}
            className="group flex items-center gap-3 bg-brand-rust hover:bg-[#8A3F2C] text-white px-8 py-4 rounded-full font-sans text-xl shadow-[6px_6px_0_#1a1a1a] hover:translate-y-1 hover:shadow-[3px_3px_0_#1a1a1a] transition-all"
          >
            <Play className="fill-current group-hover:scale-110 transition-transform" size={24} />
            Enter the Nukkad
          </button>
        )}
      </div>
    </div>
  );
}
