# Backup и restore runbook

Эта страница про практические шаги backup / restore.

## Что бэкапить

Минимум:

- `config/ServerProperties.json`
- service wrapper files
- заметки по портам и токенам

Рекомендуется:

- предыдущие release artifacts
- логи последнего заведомо рабочего состояния
- plugin configs вроде `GeyserVoice/config.yml`

## Restore workflow

1. Остановите сервис.
2. Верните `ServerProperties.json`.
3. Верните связанный plugin / addon config, если менялась topology.
4. Перезапустите VoiceCraft.
5. Проверьте transport auth и bind flow.
