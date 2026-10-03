# VoiceCraft.Docs

Documentation site for [VoiceCraft](https://gitlab.avion.team/voicecraft/VoiceCraft), built with Nuxt 4, Nuxt Content, and `@nuxtjs/i18n`.

Live site: [docs.voicecraft.chat](https://docs.voicecraft.chat)

## Run locally

```bash
pnpm install --frozen-lockfile
pnpm dev
```

The development site starts at `http://localhost:3000` unless that port is occupied.

```bash
pnpm typecheck
pnpm build
node .output/server/index.mjs
```

The production build needs its Nitro server. The addon configurator uses
`/api/addon-configurator/releases` and `/api/addon-configurator/build`, so a
static export cannot provide the complete site. `nixpacks.toml` contains the
install, build, and start commands used for server deployment.

## Project layout

| Path | Purpose |
|------|---------|
| `app/components/` | Landing, downloads, documentation, and addon configurator UI |
| `app/composables/` | Download links, configurator state, and documentation versioning |
| `app/assets/styles/` | Site styles |
| `content/<locale>/` | Base documentation for 1.6.x |
| `content/docs/1.7.x/<locale>/` | Pages changed for the current 1.7.x documentation |
| `i18n/locales/` | UI text for English, Russian, Dutch, German, Polish, Thai, and both Chinese variants |
| `server/api/addon-configurator/` | Release listing and world archive building |
| `public/` | Icons and screenshots |

`app.config.ts` defines the documentation version chain. The current `1.7.x`
pages are overlays on the `1.6.x` base; missing pages fall back through the
version chain. Current pages use routes such as `/server/transports`, and older
pages use `/v/1.6.x/server/transports`. Locale selection is handled by the
site, so page URLs do not require a locale prefix.

To add a locale, register it in `nuxt.config.ts`, create
`i18n/locales/<code>.json`, and add pages under `content/<code>/`.

## Release sources

The download page reads the client and server assets from the
[latest GitLab release](https://gitlab.avion.team/voicecraft/VoiceCraft/-/releases/permalink/latest).
Their names follow `VoiceCraft.<Client|Server>.<OS>.<arch>.v<version>.zip`.

The addon configurator prefers GitLab assets when a release includes the
required addon ZIPs. Otherwise it uses packages such as
`VoiceCraft.Addon.Basic.zip`, `VoiceCraft.Addon.Core.McHttp.zip`, and
`VoiceCraft.Addon.Core.McWss.zip` from the
[GitHub mirror releases](https://github.com/AvionBlock/VoiceCraft/releases/latest).
Addon source code lives in the
[GitLab addon repository](https://gitlab.avion.team/voicecraft/VoiceCraft.Addon).

When publishing a new release, verify that the GitLab release includes the
expected client and server archives. The download page discovers their names
from the latest-release API, so no version update is needed in the UI.
