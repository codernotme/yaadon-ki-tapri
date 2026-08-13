# Curation Guide for Nukkad Radio

The audio engine for Nukkad Radio relies on YouTube's IFrame API. This means we do not host any MP3s or audio files directly. Instead, we link to existing YouTube videos.

## Adding a Song

To add a new song, edit `data/songs.json`.

```json
{
  "id": "unique-slug-for-song",
  "title": "Song Title",
  "artist": "Artist Name",
  "year": "YYYY",
  "youtubeId": "VIDEO_ID_HERE",
  "spotifyUrl": "https://open.spotify.com/track/...",
  "youtubeMusicUrl": "https://music.youtube.com/watch?v=...",
  "tags": ["Rotation 1", "Rotation 2"]
}
```

### Finding the `youtubeId`
1. Go to YouTube and search for the song.
2. It is highly recommended to use official "Art Tracks" (the ones with just the album cover) or official audio videos, rather than music videos. Music videos often contain long dialogue intros/outros that ruin the listening experience.
3. The `youtubeId` is the string of characters after `?v=` in the URL. For example, in `https://www.youtube.com/watch?v=dQw4w9WgXcQ`, the ID is `dQw4w9WgXcQ`.

### Best Practices for Vibe Tags (Rotations)
- Keep the number of unique tags limited so the filter bar doesn't overflow.
- Recommended base tags: `Dard`, `Desi Energy`, `English Nostalgia`, `Filmy Retro Mix`, `Bhakti Break`.
- You can add multiple tags to a single song.
