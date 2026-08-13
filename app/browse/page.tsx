"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BrowseRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/playlists");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#110e0c] flex items-center justify-center text-white/60 font-mono text-sm">
      Redirecting to Playlists...
    </div>
  );
}
