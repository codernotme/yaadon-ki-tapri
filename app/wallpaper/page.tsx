"use client";

import { useState, useEffect } from "react";
import { usePlayer, Song } from "@/context/PlayerContext";
import songsData from "@/data/songs.json";
import { Radio, Disc } from "lucide-react";

export default function Wallpaper() {
  const { currentSong, isPlaying, playSong } = usePlayer();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [timeStr, setTimeStr] = useState<string>("");
  const [dateStr, setDateStr] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  // Auto play random song for wallpaper
  useEffect(() => {
    setMounted(true);
    if (!currentSong && songsData && songsData.length > 0) {
      const typedSongsData = songsData as Song[];
      const randomIdx = Math.floor(Math.random() * typedSongsData.length);
      playSong(typedSongsData[randomIdx], typedSongsData);
    }
  }, [currentSong, playSong]);

  // Live Retro Clock & Date
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeFormatted = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).toLowerCase();
      setTimeStr(timeFormatted);

      const dayName = now.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase();
      const dayNum = now.getDate();
      const monthName = now.toLocaleDateString("en-US", { month: "long" }).toUpperCase();
      setDateStr(`${dayName}, ${dayNum} ${monthName} · IST`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Mouse movement parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 30;
      const y = (e.clientY / innerHeight - 0.5) * 30;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-brand-black select-none">
      {/* 1. Dynamic Parallax Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-300 ease-out"
        style={{ 
          backgroundImage: "url('/background/bg_1.png')",
          transform: `translate(${-mousePos.x * 0.8}px, ${-mousePos.y * 0.8}px) scale(${isPlaying ? 1.08 : 1.05})`
        }}
      />

      {/* 2. VHS Scanline Texture Overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none vhs-scanlines opacity-35" />
      
      {/* 3. Dark Gradient Overlay */}
      <div className="absolute inset-0 z-[2] pointer-events-none bg-gradient-to-t from-black/85 via-black/35 to-black/70" />
      
      {/* TOP LEFT HEADER: Big Clock & Date (Clean, No Social Badges / Links) */}
      <div className="absolute top-6 left-6 md:top-8 md:left-10 z-20 flex flex-col gap-1.5">
        {/* Big Time */}
        <h2 className="font-mono text-3xl md:text-4xl text-white font-bold tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          {timeStr || "3:24 pm"}
        </h2>

        {/* Date & Timezone */}
        <p className="font-mono text-[11px] md:text-xs text-white/70 uppercase tracking-widest font-semibold drop-shadow">
          {dateStr || "THURSDAY, 13 AUGUST · IST"}
        </p>
      </div>

      {/* CENTER HERO CONTENT: Circular Emblem + Hindi Title + Subtext (Clean Wallpaper View) */}
      <div 
        className="relative z-10 flex flex-col items-center justify-center h-full pb-20 px-4 text-center transition-transform duration-200 ease-out"
        style={{
          transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)`
        }}
      >
        {/* Hindi Title: यादों की टपरी */}
        <h1 className="font-hindi text-6xl sm:text-8xl lg:text-9xl text-brand-cream drop-shadow-[6px_6px_0_#B5533C] mb-2 tracking-wide leading-none">
          यादों की टपरी
        </h1>

        {/* Subtitle Tracked Mono */}
        <p className="font-mono text-xs md:text-sm text-brand-cream/80 uppercase tracking-[0.3em] font-semibold mb-6">
          YAADON KI TAPRI
        </p>

        {/* Rotation Pill Badge */}
        <div className="inline-flex items-center gap-2 bg-black/60 text-white px-5 py-1.5 rounded-full font-mono text-xs mb-10 border border-white/20 shadow-xl backdrop-blur-sm uppercase tracking-wider">
          <Radio size={14} className="text-brand-red animate-pulse" /> NOW PLAYING • TAPRI CLASSICS
        </div>
      </div>
    </div>
  );
}
