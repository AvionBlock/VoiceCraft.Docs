# Production blueprints

Эта страница собирает sane production approaches, а не просто список функций.

## Blueprint 1: только Bedrock сервер

Используйте:

- `VoiceCraft.Server`
- `McHttp`
- `VoiceCraft.Addon.Core.McHttp`

## Blueprint 2: Java SMP с Geyser

Используйте:

- `VoiceCraft.Server`
- `McTcp`
- `GeyserVoice` в direct Paper режиме

Опционально:

- дайте GeyserVoice самому управлять VoiceCraft runtime

## Blueprint 3: большая Java-сеть

Используйте:

- внешний `VoiceCraft.Server`
- `McTcp`
- `GeyserVoice` на proxy
- `GeyserVoice` на backend nodes
