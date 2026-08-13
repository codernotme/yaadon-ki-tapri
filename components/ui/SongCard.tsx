"use client";

import { Song, usePlayer } from "@/context/PlayerContext";
import { Play } from "lucide-react";
import clsx from "clsx";
import { ProgressBar } from "./ProgressBar";

interface SongCardProps {
  song: Song;
  onPlay: () => void;
  rotation?: number; // small random rotation for the polaroid feel
}

export function SongCard({ song, onPlay, rotation = 0 }: SongCardProps) {
  const { currentSong, currentTime, duration, seekTo } = usePlayer();
  const isCurrent = currentSong?.id === song.id;

  return (
    <div 
      className={clsx(
        "group relative bg-[#fdfbf7] p-3 pb-9 rounded-sm border-2 border-brand-black shadow-[4px_4px_0_0_#2B2118] hover:shadow-[6px_6px_0_0_#2B2118] hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between",
        isCurrent ? "ring-2 ring-brand-red bg-yellow-50/70" : ""
      )}
      style={{ transform: `rotate(${rotation}deg)` }}
      onClick={onPlay}
    >
      <div>
        {/* Cassette Cover Area */}
        <div className="w-full aspect-square bg-brand-cream border-2 border-brand-black mb-3 relative overflow-hidden flex items-center justify-center">
          {/* Abstract pattern or simple icon for the cover */}
          <div className="w-16 h-16 rounded-full border-4 border-brand-red opacity-20"></div>
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-colors">
            <button className="w-12 h-12 bg-brand-red rounded-full border-2 border-brand-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-110">
              <Play className="text-brand-cream fill-brand-cream ml-1" size={24} />
            </button>
          </div>
        </div>
        
        {/* Song Info */}
        <div className="font-sans">
          <h4 className="font-bold text-lg text-brand-black leading-tight line-clamp-1">{song.title}</h4>
          <p className="font-mono text-xs text-brand-gray mt-1 line-clamp-1">{song.artist}</p>
        </div>

        {/* Active Track Progress Bar */}
        {isCurrent && (
          <div className="mt-2.5" onClick={(e) => e.stopPropagation()}>
            <ProgressBar 
              currentTime={currentTime}
              duration={duration}
              onSeek={seekTo}
              barColor="bg-brand-red"
              trackColor="bg-brand-black/15"
              thumbColor="bg-brand-black"
              timeClassName="text-brand-black/70 font-mono text-[9px]"
            />
          </div>
        )}
      </div>
      
      {/* Footer Tags */}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex gap-1">
          {song.tags.slice(0, 1).map(tag => (
            <span key={tag} className="font-mono text-[10px] bg-brand-teal text-brand-cream px-2 py-0.5 rounded-full border border-brand-black uppercase">
              {tag}
            </span>
          ))}
        </div>
        <span className="font-mono text-[10px] text-brand-gray">{song.year}</span>
      </div>
    </div>
  );
}
