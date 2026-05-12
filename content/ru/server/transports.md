# Transport-режимы

У VoiceCraft есть несколько Minecraft-facing transport-слоёв. Правильный выбор важен для стабильности и простоты развёртывания.

## Быстрое сравнение

| Transport | Типичное применение | Формат | Лучше всего подходит для |
|-----------|---------------------|--------|---------------------------|
| `McHttp` | Bedrock Dedicated Server | HTTP endpoint | стабильной Bedrock-интеграции |
| `McWss` | локальные миры / singleplayer | websocket + command tunnel | тестов и локальных миров |
| `McTcp` | Java-side bridge | raw TCP bridge | `GeyserVoice`, proxy и Paper bridge |

## McHttp

Лучше всего использовать для:

- Bedrock Dedicated Server
- production Bedrock-инфраструктуры

## McWss

Лучше всего использовать для:

- локальных миров
- singleplayer
- быстрых тестов

Минусы:

- менее стабилен под большой нагрузкой
- чувствителен к `CommandsPerTick` и размеру payload

## McTcp

Лучше всего использовать для:

- `GeyserVoice`
- Java-серверов и proxy bridge-сценариев

Плюсы:

- прямой Java-side bridge transport
- хорошо совпадает с текущей архитектурой `GeyserVoice`

## Что выбрать

### BDS

Используйте `McHttp`.

### Локальный Bedrock мир

Используйте `McWss`.

### Java + Geyser / Floodgate

Используйте `McTcp` через `GeyserVoice`.
