# SONORA

**Your music. Your world.**

A personal music library and MP3 player with a dark, modern interface.

## Access control\n- Google sign-in using the shared Firebase project `rflofficial`.\n- Only the configured SONORA UID is allowed through the app login gate.\n- The login gate is a frontend restriction; this local-only prototype has no cloud music/database backend yet.\n\n## Installable PWA\n- Web app manifest and service worker added for installability and shell caching.\n- The service worker caches the app shell and Firebase SDK modules after they have loaded online.\n- Audio files continue to be stored in IndexedDB on the device.\n- Offline login/session verification still needs testing on the deployed HTTPS site.\n\n## Current prototype
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
