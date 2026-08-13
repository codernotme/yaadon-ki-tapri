"use client";

import clsx from "clsx";

interface RotationTabsProps {
  rotations: string[];
  activeRotation: string;
  onSelect: (rotation: string) => void;
}

export function RotationTabs({ rotations, activeRotation, onSelect }: RotationTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8 items-center justify-center md:justify-start">
      <button
        onClick={() => onSelect("All")}
        className={clsx(
          "font-sans font-bold px-4 py-2 rounded-full border-2 border-brand-black transition-all",
          activeRotation === "All" 
            ? "bg-brand-red text-brand-cream shadow-inner"
            : "bg-brand-cream text-brand-black shadow-[2px_2px_0_0_#2B2118] hover:bg-brand-yellow/30"
        )}
      >
        All Tapes
      </button>
      
      {rotations.map(rotation => (
        <button
          key={rotation}
          onClick={() => onSelect(rotation)}
          className={clsx(
            "font-sans font-bold px-4 py-2 rounded-full border-2 border-brand-black transition-all",
            activeRotation === rotation 
              ? "bg-brand-red text-brand-cream shadow-inner"
              : "bg-brand-cream text-brand-black border-brand-teal text-brand-teal shadow-[2px_2px_0_0_#5B8C87] hover:bg-brand-teal hover:text-brand-cream"
          )}
        >
          {rotation}
        </button>
      ))}
    </div>
  );
}
