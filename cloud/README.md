# Sonora cloud foundation

This is an opt-in backend foundation, not a deployed or connected feature. Existing browser storage is untouched.

1. In your Cloudflare account create a private R2 bucket named sonora-music. Do not enable public access.
2. From this directory run npx wrangler login.
3. Set FIREBASE_API_KEY and ALLOWED_UID using npx wrangler secret put for each. Use the existing Sonora Firebase project's API key and authorised UID. Never commit credentials.
4. Verify ALLOWED_ORIGIN in wrangler.toml matches the actual frontend origin.
5. Run npx wrangler deploy.
6. Test unauthorized requests, wrong UID, upload size limits, duplicate uploads and authorized downloads before connecting the frontend.

API: GET /tracks (paginated), PUT /tracks/:uuid (audio body, max 50 MiB), GET /tracks/:uuid (full audio body). All require Firebase ID token in Authorization bearer header. No delete endpoint. No public audio URLs.

Remaining: frontend opt-in migration, metadata and playlist sync with conflict handling, byte-range streaming, automated tests, deployment verification. Do not remove local audio after upload. The backend currently supports full-file downloads only. Firebase account lookup adds a network request per operation.
