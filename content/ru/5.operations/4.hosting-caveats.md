# Hosting caveats

Разные провайдеры и deployment-style сильно влияют на то, какая topology для VoiceCraft вообще реалистична.

## Bedrock hosts

`McHttp` обычно лучший Bedrock transport, но только если BDS-нода может достучаться до VoiceCraft endpoint.

Типичные blockers:

- ограничения на исходящий HTTP
- отсутствующие module permissions

## Shared hosting

Некоторые провайдеры не позволяют:

- поднимать свои listener-ы
- делать outbound HTTP от game server
- запускать sidecar processes

## Java network caveats

Для proxy deployment через `GeyserVoice`:

- proxy должен стабильно видеть VoiceCraft
- backend Paper ноды должны стабильно видеть proxy message path
