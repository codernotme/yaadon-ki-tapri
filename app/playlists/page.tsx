"use client";

import { useState } from "react";
import Link from "next/link";
import { usePlayer, Song } from "@/context/PlayerContext";
import songsData from "@/data/songs.json";
import { SongCard } from "@/components/ui/SongCard";
import { ArrowLeft, Coffee, Globe, Play, Radio, Sparkles } from "lucide-react";

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

const playlistsMeta = [
  {
    name: "Dard",
    emoji: "🌧️",
    title: "Dard (Heartbreak & Soulful)",
    description: "Slow, emotional, late night alone songs.",
    color: "from-blue-900/60 to-purple-900/60 border-blue-500/30",
  },
  {
    name: "Desi Energy",
    emoji: "⚡",
    title: "Desi Energy (High-Octane Pop)",
    description: "Punjabi bangers, wedding dance hits, and 2000s club openers.",
    color: "from-amber-900/60 to-red-900/60 border-amber-500/30",
  },
  {
    name: "English Nostalgia",
    emoji: "📼",
    title: "English Nostalgia",
    description: "Late 2000s & 2010s international pop hits.",
    color: "from-teal-900/60 to-emerald-900/60 border-teal-500/30",
  },
  {
    name: "Filmy Retro Mix",
    emoji: "🎬",
    title: "Filmy Retro Mix",
    description: "Bollywood classics, cassette staples, and 90s radio regulars.",
    color: "from-rose-900/60 to-orange-900/60 border-rose-500/30",
  },
  {
    name: "Bhakti Break",
    emoji: "🚩",
    title: "Bhakti Break",
    description: "Morning stotrams, spiritual breaks, and soothing chants.",
    color: "from-yellow-900/60 to-amber-800/60 border-yellow-500/30",
  },
];

export default function PlaylistsPage() {
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);
  const { playSong } = usePlayer();
  const typedSongsData = songsData as Song[];

  const getPlaylistSongs = (playlistName: string) => {
    return typedSongsData.filter(song => song.tags.includes(playlistName));
  };

  const handlePlayPlaylist = (playlistName: string) => {
    const songs = getPlaylistSongs(playlistName);
    if (songs.length > 0) {
      playSong(songs[0], songs);
    }
  };

  const displayedSongs = selectedPlaylist 
    ? getPlaylistSongs(selectedPlaylist) 
    : [];

  return (
    <div className="flex-1 flex flex-col relative min-h-screen bg-[#110e0c] text-white pb-48 select-none">
      {/* Header Bar */}
      <header className="pt-10 pb-8 px-6 max-w-6xl mx-auto w-full flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 font-mono text-sm text-white/60 hover:text-white transition-colors">
            <ArrowLeft size={16} /> Back to Tapri
          </Link>

          <nav className="flex items-center gap-2 font-mono text-xs">
            <span className="px-4 py-1.5 bg-brand-rust text-white font-bold rounded-full">
              Playlists
            </span>
            <Link href="/songs" className="px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-white/80 transition-colors">
              All songs
            </Link>
          </nav>
        </div>

        {/* Title */}
        <div>
          <h1 className="font-hindi text-5xl md:text-7xl font-bold text-brand-cream tracking-wide">
            प्लेलिस्ट & रोटेशन
          </h1>
          <p className="font-mono text-xs md:text-sm text-white/70 mt-3 max-w-3xl leading-relaxed">
            5 curated rotations for every mood. Click any playlist to drop its cassette mix into the station.
          </p>
        </div>
      </header>

      {/* Main Playlists Grid */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {playlistsMeta.map((pl) => {
            const songs = getPlaylistSongs(pl.name);
            const isSelected = selectedPlaylist === pl.name;

            return (
              <div 
                key={pl.name}
                className={`group relative rounded-2xl p-6 bg-gradient-to-br ${pl.color} border backdrop-blur-xl shadow-xl flex flex-col justify-between transition-all hover:scale-[1.02] cursor-pointer ${
                  isSelected ? "ring-2 ring-brand-yellow" : ""
                }`}
                onClick={() => setSelectedPlaylist(pl.name)}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl">{pl.emoji}</span>
                    <span className="font-mono text-xs bg-black/40 border border-white/20 px-3 py-1 rounded-full text-white/80">
                      {songs.length} tapes
                    </span>
                  </div>

                  <h3 className="font-hindi text-2xl font-bold text-brand-cream group-hover:text-brand-yellow transition-colors">
                    {pl.title}
                  </h3>

                  <p className="font-mono text-xs text-white/70 mt-2 leading-relaxed">
                    {pl.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayPlaylist(pl.name);
                    }}
                    className="flex items-center gap-2 bg-brand-cream text-brand-black px-4 py-2 rounded-full font-sans font-bold text-xs hover:bg-white transition-all shadow-md cursor-pointer"
                  >
                    <Play size={14} className="fill-current" />
                    Play Rotation
                  </button>

                  <span className="font-mono text-xs text-white/50 hover:underline">
                    {isSelected ? "Hide Tapes" : "View Tapes →"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* If a playlist is selected, show its songs below */}
        {selectedPlaylist && (
          <div className="mt-8 pt-8 border-t border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-hindi text-3xl font-bold text-brand-cream flex items-center gap-3">
                <span>{playlistsMeta.find(p => p.name === selectedPlaylist)?.emoji}</span>
                <span>{selectedPlaylist} Tapes</span>
              </h2>

              <button 
                onClick={() => setSelectedPlaylist(null)}
                className="font-mono text-xs text-white/60 hover:text-white underline"
              >
                Close View
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {displayedSongs.map((song, idx) => (
                <SongCard 
                  key={song.id} 
                  song={song} 
                  onPlay={() => playSong(song, displayedSongs)}
                  rotation={(idx % 3 === 0 ? 1 : idx % 2 === 0 ? -1 : 0.5)}
                />
              ))}
            </div>
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
