"use client";

import { useState } from "react";
import { NowPlayingBar } from "@/components/ui/NowPlayingBar";
import { RotationTabs } from "@/components/ui/RotationTabs";
import { SongCard } from "@/components/ui/SongCard";
import { usePlayer } from "@/context/PlayerContext";
import songsData from "@/data/songs.json";

export default function Home() {
  const [activeRotation, setActiveRotation] = useState("All");
  const { playSong } = usePlayer();

  // Extract unique rotations
  const rotations = Array.from(new Set(songsData.flatMap(song => song.tags)));

  const filteredSongs = activeRotation === "All" 
    ? songsData 
    : songsData.filter(song => song.tags.includes(activeRotation));

  return (
    <div className="flex-1 flex flex-col relative">
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 px-6 flex flex-col items-center justify-center min-h-[50vh] overflow-hidden">
        {/* Placeholder for Illustration Background */}
        <div className="absolute inset-0 bg-brand-cream/50 pointer-events-none" />
        
        <div className="relative z-10 text-center mb-12">
          <h1 className="font-sans text-6xl md:text-8xl text-brand-black drop-shadow-[4px_4px_0_#B5533C]">
            Nukkad Radio
          </h1>
          <p className="font-sans text-xl md:text-2xl text-brand-black mt-4 drop-shadow-[1px_1px_0_#ffffff]">
            the songs playing at every nukkad, every evening.
          </p>
        </div>

        <NowPlayingBar variant="hero" />
      </section>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-12">
        <RotationTabs 
          rotations={rotations} 
          activeRotation={activeRotation} 
          onSelect={setActiveRotation} 
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mt-8">
          {filteredSongs.map((song, idx) => (
            <SongCard 
              key={song.id} 
              song={song} 
              onPlay={() => playSong(song, filteredSongs)}
              rotation={(idx % 3 === 0 ? 2 : idx % 2 === 0 ? -1.5 : 1)}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 text-center border-t-2 border-brand-black/20 mt-12">
        <p className="font-mono text-xs text-brand-gray px-4">
          Streamed through YouTube — nothing downloaded, nothing hosted here.
        </p>
      </footer>
    </div>
  );
}
