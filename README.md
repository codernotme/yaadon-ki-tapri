# Nukkad Radio

A nostalgic 90s-2000s Indian pop-culture music player interface. Think of it as a scrapbook or mixtape someone actually made, featuring a warm analog aesthetic with cassette tape motifs, VHS grain textures, and Rolodex-style polaroid song cards.

## Features

- **Three Interfaces in One Backend:**
  - **Standalone Site:** A full web experience with hero visualizer and a full browsable catalog.
  - **Popup Widget:** An embeddable iframe player designed for portfolios or other sites.
  - **Lively Wallpaper:** A full-bleed, minimal-UI route for desktop wallpapers that autoplays.
- **YouTube Streaming:** Streams directly through YouTube's embedded IFrame Player API. No downloads, no self-hosted audio, preserving views for the original artists.
- **Global Audio State:** Seamless playback across route transitions (`/` to `/browse`) without song interruption.
- **Themed Design System:** Built with a custom palette (terracotta red, faded teal, warm cream) and specific Google Fonts (Sniglet for display, Space Mono for metadata).

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4 + Vanilla CSS animations
- **Audio Engine:** `react-youtube` (YouTube IFrame API)
- **Icons:** `lucide-react`

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

### Standalone Site
Accessible at `/` and `/browse`.

### Embed Widget
Point an iframe to `/embed`. Example:
```html
<iframe src="https://music.codernotme.studio/embed" style="position: fixed; bottom: 0; right: 0; border: none; z-index: 9999;" allow="autoplay"></iframe>
```

### Lively Wallpaper
Point Lively Wallpaper to `/wallpaper`. Ensure you enable audio for this wallpaper in Lively's settings.
