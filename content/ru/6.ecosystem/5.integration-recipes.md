# Готовые сценарии интеграции

Ниже практические deployment-паттерны для самых частых сценариев VoiceCraft.

## Сценарий A: Bedrock Dedicated Server

Стек:

- `VoiceCraft.Server`
- `VoiceCraft.Addon.Core.McHttp`
- VoiceCraft clients

## Сценарий B: локальный / singleplayer Bedrock мир

Стек:

- локальный VoiceCraft stack
- `VoiceCraft.Addon.Core.McWss`

## Сценарий C: direct Paper с managed runtime от GeyserVoice

Стек:

- Paper / Folia
- `GeyserVoice`
- managed VoiceCraft runtime

Это один из самых простых Java-side сценариев, если вы хотите, чтобы плагин сам запускал VoiceCraft под капотом.

## Сценарий D: direct Paper с внешним VoiceCraft

Стек:

- Paper / Folia
- `GeyserVoice`
- внешний `VoiceCraft.Server`

## Сценарий E: Velocity или Bungee network

Стек:

- `GeyserVoice` на proxy
- `GeyserVoice` на backend Paper
- `VoiceCraft.Server` с `McTcp`
