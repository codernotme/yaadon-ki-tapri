"use client";

import { useState } from "react";
import Link from "next/link";
import { usePlayer, Song } from "@/context/PlayerContext";
import songsData from "@/data/songs.json";
import { SongCard } from "@/components/ui/SongCard";
import { ArrowLeft, Coffee, Globe, LayoutGrid, List, Play } from "lucide-react";

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

export default function SongsPage() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const { playSong, currentSong, isPlaying } = usePlayer();

  const typedSongsData = songsData as Song[];
  const tags = ["All", ...Array.from(new Set(typedSongsData.flatMap(song => song.tags)))];

  const filteredSongs = typedSongsData.filter(song => {
    const matchesTag = selectedTag === "All" || song.tags.includes(selectedTag);
    const matchesSearch = song.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          song.artist.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <div className="flex-1 flex flex-col relative min-h-screen bg-[#110e0c] text-white pb-48 select-none">
      {/* Header Bar */}
      <header className="pt-10 pb-8 px-6 max-w-6xl mx-auto w-full flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 font-mono text-sm text-white/60 hover:text-white transition-colors">
            <ArrowLeft size={16} /> Back to Tapri
          </Link>

          <nav className="flex items-center gap-2 font-mono text-xs">
            <Link href="/playlists" className="px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-white/80 transition-colors">
              Playlists
            </Link>
            <span className="px-4 py-1.5 bg-brand-rust text-white font-bold rounded-full">
              All songs
            </span>
          </nav>
        </div>

        {/* Title & Description (Deluxe Saloon Inspiration) */}
        <div>
          <h1 className="font-hindi text-5xl md:text-7xl font-bold text-brand-cream tracking-wide">
            सारे गाने
          </h1>
          <p className="font-mono text-xs md:text-sm text-white/70 mt-3 max-w-3xl leading-relaxed">
            {filteredSongs.length} records, 90s to 2000s, in the order of rotation. Every one of them is in at least one rotation. Tap any title to drop it into the station.
          </p>
        </div>

        {/* Controls: Search, Tag Chips & View Mode Toggle (List vs Grid) */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-4 border-t border-white/10">
          {/* Tag Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                  selectedTag === tag 
                    ? "bg-brand-cream text-brand-black border-brand-cream font-bold" 
                    : "bg-white/5 border-white/15 text-white/70 hover:bg-white/15"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Search + View Switcher Buttons */}
          <div className="flex items-center gap-3">
            <input 
              type="text" 
              placeholder="Search title or artist..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 md:w-56 px-4 py-2 bg-white/5 border border-white/20 rounded-full focus:outline-none focus:border-brand-yellow text-xs font-mono placeholder:text-white/40"
            />

            {/* View Mode Toggle Buttons */}
            <div className="flex items-center bg-white/10 border border-white/15 p-1 rounded-full">
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-full transition-colors ${viewMode === "list" ? "bg-brand-rust text-white" : "text-white/60 hover:text-white"}`}
                title="List View"
              >
                <List size={16} />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-full transition-colors ${viewMode === "grid" ? "bg-brand-rust text-white" : "text-white/60 hover:text-white"}`}
                title="Grid View"
              >
                <LayoutGrid size={16} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-6">
        {filteredSongs.length > 0 ? (
          viewMode === "list" ? (
            /* LIST VIEW (Deluxe Saloon Inspired Layout) */
            <div className="flex flex-col border-t border-white/10">
              {filteredSongs.map((song, idx) => {
                const isCurrent = currentSong?.id === song.id;
                return (
                  <div
                    key={song.id}
                    onClick={() => playSong(song, filteredSongs)}
                    className={`flex items-center justify-between py-4 px-3 border-b border-white/10 hover:bg-white/5 transition-all cursor-pointer group ${
                      isCurrent ? "bg-brand-rust/20 border-brand-rust/40" : ""
                    }`}
                  >
                    {/* Left: Year & Song Details */}
                    <div className="flex items-start md:items-center gap-4 md:gap-8 min-w-0 flex-1">
                      <span className="font-mono text-xs text-white/40 w-12 flex-shrink-0 pt-1 md:pt-0">
                        {song.year || "2000s"}
                      </span>

                      <div className="min-w-0 flex-1">
                        <h3 className={`font-hindi text-lg md:text-xl font-bold leading-tight transition-colors group-hover:text-brand-yellow ${
                          isCurrent ? "text-brand-yellow" : "text-brand-cream"
                        }`}>
                          {song.title}
                        </h3>
                        <p className="font-mono text-xs text-white/50 truncate mt-0.5">
                          {song.artist} • {song.tags.join(", ")}
                        </p>
                      </div>
                    </div>

                    {/* Right: Artist & Play Indicator */}
                    <div className="flex items-center gap-4 ml-4 flex-shrink-0">
                      <span className="hidden md:inline font-mono text-xs text-white/60">
                        {song.artist}
                      </span>
                      <div className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-transform ${
                        isCurrent && isPlaying ? "bg-brand-rust text-white animate-pulse" : "bg-white/5 group-hover:scale-110"
                      }`}>
                        <Play size={14} className="fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* GRID VIEW (Polaroid Cards) */
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mt-4">
              {filteredSongs.map((song, idx) => (
                <SongCard 
                  key={song.id} 
                  song={song} 
                  onPlay={() => playSong(song, filteredSongs)}
                  rotation={(idx % 3 === 0 ? 1 : idx % 2 === 0 ? -1 : 0.5)}
                />
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-24 font-mono text-white/60">
            <h2 className="font-hindi text-2xl text-brand-cream">कोई गाना नहीं मिला</h2>
            <p className="mt-2 text-xs">Try a different search or tag filter.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full max-w-6xl mx-auto px-6 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <a href="https://codernotme.studio" target="_blank" rel="noreferrer" title="Portfolio" className="text-white/60 hover:text-white transition-colors">
            <Globe size={18} />
          </a>
          <a href="https://instagram.com/codernotme" target="_blank" rel="noreferrer" title="Instagram @codernotme" className="text-white/60 hover:text-white transition-colors">
            <InstagramIcon size={18} />
          </a>
          <a href="https://github.com/codernotme" target="_blank" rel="noreferrer" title="GitHub" className="text-white/60 hover:text-white transition-colors">
            <GithubIcon size={18} />
          </a>
          <a href="https://x.com/codernotme" target="_blank" rel="noreferrer" title="Twitter / X" className="text-white/60 hover:text-white transition-colors">
            <TwitterIcon size={18} />
          </a>
          <a href="https://buymeacoffee.com/codernotme" target="_blank" rel="noreferrer" title="Buy Me A Coffee" className="text-brand-yellow hover:text-white transition-colors flex items-center gap-1 font-mono text-xs">
            <Coffee size={18} />
            <span>Support Station</span>
          </a>
        </div>

        <p className="font-mono text-xs text-white/50 text-center md:text-right">
          यादों की टपरी (Yaadon Ki Tapri) • Streamed live via YouTube API • Built by <a href="https://codernotme.studio" target="_blank" rel="noreferrer" className="underline hover:text-white">codernotme</a>
        </p>
      </footer>
    </div>
  );
}
