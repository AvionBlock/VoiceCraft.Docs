# Packet и event flow

Эта страница объясняет концептуальный flow, а не перечисляет каждый packet type.

## High-level flow

1. transport consumer проходит auth в VoiceCraft
2. сущности создаются или обнаруживаются
3. metadata updates попадают в world model VoiceCraft
4. синхронизируется audio-related state
5. клиенты воспроизводят итоговое voice behavior
