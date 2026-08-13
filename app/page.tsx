"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePlayer, Song } from "@/context/PlayerContext";
import songsData from "@/data/songs.json";
import { Play, Coffee, Globe, Radio, Disc } from "lucide-react";

const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const TwitterIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

export default function Home() {
  const { isPlaying, playSong } = usePlayer();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [timeStr, setTimeStr] = useState<string>("");
  const [dateStr, setDateStr] = useState<string>("");

  // Live Retro Clock & Date (Formatted like Deluxe Saloon: "3:24 pm", "THURSDAY, 13 AUGUST · IST")
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      // Time string: e.g. "3:24 pm"
      const timeFormatted = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).toLowerCase();
      setTimeStr(timeFormatted);

      // Date string: e.g. "THURSDAY, 13 AUGUST · IST"
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

  const handleStart = () => {
    if (!songsData || songsData.length === 0) return;
    const typedSongsData = songsData as Song[];
    const randomSong = typedSongsData[Math.floor(Math.random() * typedSongsData.length)];
    playSong(randomSong, typedSongsData);
  };

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

      {/* 2. VHS Scanline Overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none vhs-scanlines opacity-35" />
      
      {/* 3. Dark Gradient Overlay */}
      <div className="absolute inset-0 z-[2] pointer-events-none bg-gradient-to-t from-black/85 via-black/35 to-black/70" />
      
      {/* TOP LEFT HEADER: Big Clock, Date, Built By Badge & Social Links */}
      <div className="absolute top-6 left-6 md:top-8 md:left-10 z-20 flex flex-col gap-2.5">
        {/* Big Time */}
        <h2 className="font-mono text-3xl md:text-4xl text-white font-bold tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          {timeStr || "3:24 pm"}
        </h2>

        {/* Date & Timezone */}
        <p className="font-mono text-[11px] md:text-xs text-white/70 uppercase tracking-widest font-semibold drop-shadow">
          {dateStr || "THURSDAY, 13 AUGUST · IST"}
        </p>

        {/* Creator Badge & Social Icons */}
        <div className="flex items-center gap-2 mt-1">
          <div className="bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full text-white/90 font-mono text-[11px] flex items-center gap-1.5 shadow-md">
            <span>built by</span>
            <a href="https://x.com/codernotme" target="_blank" rel="noreferrer" className="text-white hover:underline flex items-center gap-1">
              <TwitterIcon size={12} /> @codernotme
            </a>
          </div>

          <a 
            href="https://instagram.com/codernotme" 
            target="_blank" 
            rel="noreferrer" 
            className="p-1.5 bg-black/60 backdrop-blur-md border border-white/15 rounded-full text-white/80 hover:text-white hover:scale-110 transition-all shadow-md"
            title="Instagram @codernotme"
          >
            <InstagramIcon size={14} />
          </a>
          <a 
            href="https://github.com/codernotme" 
            target="_blank" 
            rel="noreferrer" 
            className="p-1.5 bg-black/60 backdrop-blur-md border border-white/15 rounded-full text-white/80 hover:text-white hover:scale-110 transition-all shadow-md"
            title="GitHub @codernotme"
          >
            <GithubIcon size={14} />
          </a>
          <a 
            href="https://codernotme.studio" 
            target="_blank" 
            rel="noreferrer" 
            className="p-1.5 bg-black/60 backdrop-blur-md border border-white/15 rounded-full text-white/80 hover:text-white hover:scale-110 transition-all shadow-md"
            title="Portfolio codernotme.studio"
          >
            <Globe size={14} />
          </a>
        </div>
      </div>

      {/* TOP RIGHT HEADER: Playlists Navigation & Support Card Box */}
      <div className="absolute top-6 right-6 md:top-8 md:right-10 z-20 flex flex-col items-end gap-3">
        {/* Navigation Pills */}
        <nav className="flex items-center gap-2">
          <Link 
            href="/browse" 
            className="bg-black/60 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full font-mono text-xs md:text-sm hover:bg-black/80 hover:scale-105 transition-all shadow-lg"
          >
            Playlists
          </Link>
          <Link 
            href="/browse?tab=All" 
            className="bg-black/60 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full font-mono text-xs md:text-sm hover:bg-black/80 hover:scale-105 transition-all shadow-lg"
          >
            All songs
          </Link>
        </nav>

        {/* Support Station Card Box (Deluxe Saloon Inspired) */}
        <div className="hidden sm:flex flex-col items-end bg-black/75 backdrop-blur-md border border-yellow-500/30 p-3.5 rounded-2xl shadow-xl max-w-xs text-right gap-2">
          <p className="font-mono text-xs text-white/90 leading-tight">
            Help us keep this station running.<br />
            <span className="text-white/60">Your support means a lot.</span>
          </p>
          <a
            href="https://buymeacoffee.com/codernotme"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#FFDD00] text-black font-sans font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-md hover:scale-105 transition-transform"
          >
            <Coffee size={14} className="fill-black" />
            <span>Buy Me A Coffee</span>
          </a>
        </div>

        {/* Nostalgic Subtext Banner */}
        <div className="bg-black/50 backdrop-blur-md border border-white/10 px-3.5 py-1 rounded-full text-white/70 font-mono text-[11px] shadow">
          Click below to enjoy your old school memories
        </div>
      </div>

      {/* CENTER HERO CONTENT: Circular Emblem + Hindi Title + Subtext + Start Button */}
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
        
        {!isPlaying && (
          <button 
            onClick={handleStart}
            className="group flex items-center gap-3 bg-brand-rust hover:bg-[#8A3F2C] text-white px-9 py-4 rounded-full font-sans text-xl shadow-[6px_6px_0_#1a1a1a] hover:translate-y-1 hover:shadow-[2px_2px_0_#1a1a1a] transition-all cursor-pointer"
          >
            <Play className="fill-current group-hover:scale-110 transition-transform" size={24} />
            Enter the Tapri
          </button>
        )}
      </div>

      {/* FOOTER CENTER TEXT */}
      <footer className="absolute bottom-3 left-0 right-0 z-20 text-center pointer-events-none">
        <p className="font-mono text-[11px] text-white/50">
          contact: <a href="https://codernotme.studio" target="_blank" rel="noreferrer" className="pointer-events-auto underline hover:text-white">codernotme.studio</a>
        </p>
      </footer>
    </div>
  );
}
