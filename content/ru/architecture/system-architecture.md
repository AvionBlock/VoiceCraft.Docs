# Системная архитектура

Эта страница объясняет большие части VoiceCraft и их связи.

## Основные слои

### Client layer

`VoiceCraft.Client` отвечает за:

- input capture
- preprocessing
- UDP transport к VoiceCraft
- playback и локальные per-user preferences

### Server layer

`VoiceCraft.Server` отвечает за:

- состояние сетевых сущностей
- voice client sessions
- moderation flags
- effect bitmasks и default audio effects
- Minecraft-facing transports

### Minecraft integration layer

Зависит от topology:

- `VoiceCraft.Addon` для Bedrock
- `GeyserVoice` для Java / Geyser / proxy network
