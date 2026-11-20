# SONORA

**Your music. Your world.**

A personal music library and MP3 player with a dark, modern interface.

## Current prototype
The GitHub Pages-ready `index.html` is a single-file browser prototype featuring:
- Add audio files from your device
- Local browser storage (IndexedDB)
- Playback, previous/next, seek and volume
- Shuffle and repeat
- Search your library
- Artists view
- Listening history and basic stats
- Responsive desktop/mobile layout

## Run locally
Serve this repository with a local web server so browser storage works reliably:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Roadmap
- Metadata and embedded artwork extraction/editing
- Albums, playlists, queue and favourites
- More detailed listening analytics and annual/monthly Wrapped
- Secure account authentication
- Cloudflare R2 music storage + D1 metadata database + Workers API
- Cross-device synchronisation and offline support

## Important
This prototype stores music locally in your browser. It is not cloud-synced. Clearing browser data may remove the library; keep separate backups of your audio files.
