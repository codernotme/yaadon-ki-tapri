"use client";

import { useState } from "react";
import { NowPlayingBar } from "@/components/ui/NowPlayingBar";
import { RotationTabs } from "@/components/ui/RotationTabs";
import { SongCard } from "@/components/ui/SongCard";
import { usePlayer } from "@/context/PlayerContext";
import songsData from "@/data/songs.json";

export default function Browse() {
  const [activeRotation, setActiveRotation] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { playSong, currentSong } = usePlayer();

  const rotations = Array.from(new Set(songsData.flatMap(song => song.tags)));

  const filteredSongs = songsData.filter(song => {
    const matchesRotation = activeRotation === "All" || song.tags.includes(activeRotation);
    const matchesSearch = song.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          song.artist.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRotation && matchesSearch;
  });

  return (
    <div className="flex-1 flex flex-col relative pb-32">
      <header className="pt-12 pb-6 px-6 max-w-6xl mx-auto w-full flex flex-col md:flex-row justify-between gap-6">
        <div>
          <h1 className="font-sans text-4xl text-brand-black font-bold">Browse Tapes</h1>
          <p className="font-mono text-brand-gray mt-2">Find a tape for the road.</p>
        </div>
        
        <div className="flex items-center">
          <input 
            type="text" 
            placeholder="Search tapes..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-64 px-4 py-2 bg-brand-cream border-2 border-brand-black rounded-sm shadow-[2px_2px_0_0_#2B2118] focus:outline-none focus:shadow-[4px_4px_0_0_#2B2118] transition-all font-mono placeholder:text-brand-gray"
          />
        </div>
      </header>

      <main className="flex-1 w-full max-w-6xl mx-auto px-6">
        <RotationTabs 
          rotations={rotations} 
          activeRotation={activeRotation} 
          onSelect={setActiveRotation} 
        />

        {filteredSongs.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mt-8">
            {filteredSongs.map((song, idx) => (
              <SongCard 
                key={song.id} 
                song={song} 
                onPlay={() => playSong(song, filteredSongs)}
                rotation={(idx % 3 === 0 ? 1 : idx % 2 === 0 ? -1 : 0.5)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <h2 className="font-sans text-2xl text-brand-black">nothing on this tape yet.</h2>
            <p className="font-mono text-brand-gray mt-2">Try a different search.</p>
          </div>
        )}
      </main>

      <NowPlayingBar variant="bottom" />
    </div>
  );
}
