"use client";

import { useState } from "react";
import Link from "next/link";
import { RotationTabs } from "@/components/ui/RotationTabs";
import { SongCard } from "@/components/ui/SongCard";
import { usePlayer, Song } from "@/context/PlayerContext";
import songsData from "@/data/songs.json";
import { ArrowLeft, Coffee, Globe } from "lucide-react";

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const TwitterIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

export default function Browse() {
  const [activeRotation, setActiveRotation] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { playSong } = usePlayer();

  const typedSongsData = songsData as Song[];
  const rotations = Array.from(new Set(typedSongsData.flatMap(song => song.tags)));

  const filteredSongs = typedSongsData.filter(song => {
    const matchesRotation = activeRotation === "All" || song.tags.includes(activeRotation);
    const matchesSearch = song.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          song.artist.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRotation && matchesSearch;
  });

  return (
    <div className="flex-1 flex flex-col relative min-h-screen bg-brand-cream/90 backdrop-blur-md pb-44">
      <header className="pt-10 pb-6 px-6 max-w-6xl mx-auto w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 font-mono text-sm text-brand-gray hover:text-brand-rust transition-colors mb-3">
            <ArrowLeft size={16} /> Back to Tapri
          </Link>
          <h1 className="font-hindi text-4xl md:text-5xl text-brand-black font-bold">यादों की टपरी — Tapes</h1>
          <p className="font-mono text-brand-gray mt-1 text-sm">Find a cassette tape for every mood & rotation.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <input 
            type="text" 
            placeholder="Search tapes or artists..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 md:w-64 px-4 py-2.5 bg-brand-cream border-2 border-brand-black rounded-full shadow-[3px_3px_0_0_#2B2118] focus:outline-none focus:shadow-[4px_4px_0_0_#2B2118] transition-all font-mono text-sm placeholder:text-brand-gray"
          />

          <a
            href="https://buymeacoffee.com/codernotme"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#FFDD00] text-black font-sans font-bold text-xs px-4 py-2.5 rounded-full shadow-[3px_3px_0_0_#000000] hover:translate-y-0.5 transition-all"
          >
            <Coffee size={15} className="fill-black" />
            <span className="hidden sm:inline">Buy Coffee</span>
          </a>
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
            <p className="font-mono text-brand-gray mt-2">Try a different search or rotation.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full max-w-6xl mx-auto px-6 mt-16 pt-8 border-t-2 border-brand-black/20 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <a href="https://codernotme.studio" target="_blank" rel="noreferrer" title="Portfolio" className="text-brand-gray hover:text-brand-black transition-colors">
            <Globe size={18} />
          </a>
          <a href="https://instagram.com/codernotme" target="_blank" rel="noreferrer" title="Instagram @codernotme" className="text-brand-gray hover:text-brand-black transition-colors">
            <InstagramIcon size={18} />
          </a>
          <a href="https://github.com/codernotme" target="_blank" rel="noreferrer" title="GitHub" className="text-brand-gray hover:text-brand-black transition-colors">
            <GithubIcon size={18} />
          </a>
          <a href="https://x.com/codernotme" target="_blank" rel="noreferrer" title="Twitter / X" className="text-brand-gray hover:text-brand-black transition-colors">
            <TwitterIcon size={18} />
          </a>
          <a href="https://buymeacoffee.com/codernotme" target="_blank" rel="noreferrer" title="Buy Me A Coffee" className="text-brand-rust hover:text-brand-black transition-colors flex items-center gap-1 font-mono text-xs">
            <Coffee size={18} />
            <span>Support Project</span>
          </a>
        </div>

        <p className="font-mono text-xs text-brand-gray text-center md:text-right">
          यादों की टपरी (Yaadon Ki Tapri) • Streamed live via YouTube API • Built by <a href="https://codernotme.studio" target="_blank" rel="noreferrer" className="underline hover:text-brand-black">codernotme</a>
        </p>
      </footer>
    </div>
  );
}
