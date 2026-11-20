# SONORA

**Your music. Your world.**

SONORA is a personal music library and MP3 player project with a dark, modern interface. The initial prototype includes browser-local uploads and playback; cloud storage and cross-device sync are planned.

## Prototype
Download the prototype ZIP shared in the project conversation, extract it, and run a local web server (for example `python -m http.server 8080`). Open `http://localhost:8080`.

## Planned features
- Music uploads and metadata editing
- Library, albums, artists, search and favourites
- Playlists, queue, shuffle and repeat
- Listening history and statistics
- Annual and monthly Wrapped recaps
- Cloud account, Cloudflare R2 storage, D1 database and device sync

## Current limitation
The prototype stores audio and metadata locally in the browser. It is not yet cloud-synced. Back up your music files separately.
