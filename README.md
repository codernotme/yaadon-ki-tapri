# 📻 Nukkad Radio — codernotme.studio

[![Next.js](https://img.shields.io/badge/Next.js-15%2B-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/codernotme)

> **"The songs playing at every nukkad, every evening."**

A nostalgic 90s–2000s Indian pop-culture music player built for those who grew up on cassette-to-CD transition, early 2000s Cartoon Network & Nickelodeon India, landline phones, MTV India VJs, mixtapes, and the FRIENDS-era of sitcoms.

---

## ✨ Features

- 🎨 **Nostalgic 90s-2000s Aesthetic:** Designed with a warm scrapbook feel, cassette tape motifs, subtle VHS scanline overlays, and polaroid-styled song cards.
- 🌌 **3D Mouse Parallax Engine:** Smooth depth parallax effect on the homepage background and typography reacting to cursor movement.
- 🎵 **Continuous Global Audio Engine:** Built on top of YouTube's IFrame API. Switch between the main stage (`/`) and the catalogue (`/browse`) with zero audio stutter or playback interruption.
- 📻 **5 Handcrafted Rotations:**
  - 🌧️ **Dard:** Heartbreak & soulful late-night tracks.
  - ⚡ **Desi Energy:** High-octane Punjabi & Indian pop anthems.
  - 📼 **English Nostalgia:** Late 2000s & 2010s international favorites.
  - 🎬 **Filmy Retro Mix:** Iconic Bollywood classics & indie gems.
  - 🚩 **Bhakti Break:** Spiritual & morning stotram selections.
- 🖼️ **Lively Wallpaper Mode (`/wallpaper`):** Clean full-bleed view designed specifically for interactive desktop wallpapers.
- 🧩 **Embeddable Portfolio Widget (`/embed`):** Portable floating cassette player ready for any personal site or portfolio.
- ⚡ **No Downloads / Zero Hosting Audio:** All music streams live directly via official YouTube embeds, preserving views for original artists.

---

## 🖼️ Lively Wallpaper Integration Guide

You can turn Nukkad Radio into an animated, music-playing live desktop wallpaper for Windows using **[Lively Wallpaper](https://rocksdanister.github.io/lively/)**.

### Step 1: Install Lively Wallpaper
Download and install Lively Wallpaper (Free & Open Source) from the [Microsoft Store](https://apps.microsoft.com/detail/9ntm2qc6qws7) or GitHub.

### Step 2: Add Nukkad Radio
1. Open **Lively Wallpaper**.
2. Click the **`+ Add Wallpaper`** button in the top right corner.
3. In the **Enter URL** field, paste your local or hosted wallpaper endpoint:
   - **Local Dev:** `http://localhost:3000/wallpaper`
   - **Production:** `https://music.codernotme.studio/wallpaper`
4. Click **`→` (Next)**, give it a title (e.g. `Nukkad Radio`), and hit **OK**.

### Step 3: Configure Audio Settings
1. Go to Lively **Settings ⚙️ -> Audio**.
2. Set **Volume** to your desired background listening level.
3. Enable **"Mute wallpaper when another application is playing audio"** (recommended for gaming/work).

*(Screenshots coming soon — preview captures will be added here)*

---

## 🧩 Embed Widget Guide

Add Nukkad Radio as a floating music widget on your portfolio or personal website!

### Simple Iframe Embed
Paste this snippet before the `</body>` tag of your website:

```html
<iframe 
  src="https://music.codernotme.studio/embed" 
  style="position: fixed; bottom: 16px; right: 16px; border: none; z-index: 9999; width: 380px; height: 180px;" 
  allow="autoplay">
</iframe>
```

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router, Turbopack)
- **Styling:** Tailwind CSS v4 & Custom CSS Scanline Filters
- **Audio Engine:** `react-youtube` (YouTube IFrame API)
- **Icons:** `lucide-react`
- **Typography:** Sniglet (Display) & Space Mono (Metadata)

---

## 🚀 Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/codernotme/nukkad-cafe.git
   cd nukkad-cafe
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## ☕ Support & Socials

If you enjoy listening to Nukkad Radio while working or chilling, consider supporting the project!

- ☕ **Buy Me A Coffee:** [buymeacoffee.com/codernotme](https://buymeacoffee.com/codernotme)
- 🌐 **Portfolio:** [codernotme.studio](https://codernotme.studio)
- 🐙 **GitHub:** [@codernotme](https://github.com/codernotme)
- 🐤 **Twitter / X:** [@codernotme](https://x.com/codernotme)

---

<p center font-mono>Crafted with 🖤 by codernotme</p>
