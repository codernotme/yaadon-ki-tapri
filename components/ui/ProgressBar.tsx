"use client";

import React, { useState } from "react";

export type ProgressBarProps = {
  currentTime: number;
  duration: number;
  onSeek: (seconds: number) => void;
  className?: string;
  barColor?: string;
  trackColor?: string;
  thumbColor?: string;
  showTime?: boolean;
  timeClassName?: string;
};

export function formatTime(sec: number): string {
  if (!sec || isNaN(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

export function ProgressBar({
  currentTime,
  duration,
  onSeek,
  className = "",
  barColor = "bg-brand-rust",
  trackColor = "bg-white/15",
  thumbColor = "bg-white",
  showTime = true,
  timeClassName = "text-brand-cream/60 font-mono text-[10px] md:text-xs",
}: ProgressBarProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragValue, setDragValue] = useState(0);

  const displayTime = isDragging ? dragValue : currentTime;
  const progressPercent = duration > 0 ? Math.min(100, Math.max(0, (displayTime / duration) * 100)) : 0;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setDragValue(val);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
    setDragValue(currentTime);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLInputElement> | React.TouchEvent<HTMLInputElement>) => {
    setIsDragging(false);
    const target = e.target as HTMLInputElement;
    const val = parseFloat(target.value);
    if (!isNaN(val)) {
      onSeek(val);
    }
  };

  const handleChangeCommit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setDragValue(val);
    if (!isDragging && !isNaN(val)) {
      onSeek(val);
    }
  };

  return (
    <div className={`flex items-center gap-2.5 w-full select-none ${className}`}>
      {showTime && (
        <span className={`${timeClassName} min-w-[34px] text-right font-mono font-medium shrink-0`}>
          {formatTime(displayTime)}
        </span>
      )}

      <div className="relative flex-1 flex items-center h-5 group cursor-pointer">
        {/* Visual Background Track */}
        <div className={`absolute left-0 right-0 h-1.5 rounded-full overflow-hidden ${trackColor}`}>
          {/* Progress Fill */}
          <div
            className={`h-full ${barColor} transition-all duration-75 rounded-full`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Native Range Input (Transparent Overlay for Smooth Dragging & Touch) */}
        <input
          type="range"
          min={0}
          max={duration > 0 ? duration : 100}
          step={0.1}
          value={displayTime || 0}
          onChange={handleInputChange}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleMouseUp}
          onBlur={handleChangeCommit}
          disabled={!duration}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          aria-label="Song progress slider"
        />

        {/* Visual Thumb Indicator (Enlarges on Hover or Drag) */}
        <div
          className={`absolute w-3.5 h-3.5 rounded-full ${thumbColor} shadow-md border border-black/30 pointer-events-none transition-transform duration-75 ${
            isDragging ? "scale-125 ring-2 ring-white/50" : "group-hover:scale-110"
          }`}
          style={{ left: `calc(${progressPercent}% - 7px)` }}
        />
      </div>

      {showTime && (
        <span className={`${timeClassName} min-w-[34px] font-mono font-medium shrink-0`}>
          {formatTime(duration)}
        </span>
      )}
    </div>
  );
}
