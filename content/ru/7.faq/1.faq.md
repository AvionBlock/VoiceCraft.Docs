# FAQ

Частые вопросы по VoiceCraft.

## Всем ли игрокам нужен клиент VoiceCraft?

Да. Игрокам нужен клиент. Серверу клиентское приложение не требуется.

## Работает ли VoiceCraft на мобильных устройствах?

Да. Android и iOS поддерживаются.

## Какой transport мне выбрать?

- Bedrock Dedicated Server:
  `McHttp`
- локальный Bedrock мир:
  `McWss`
- Java + Geyser / Floodgate:
  `McTcp` через `GeyserVoice`

## Нужен ли отдельный VoiceCraft.Server для GeyserVoice?

Не всегда.

В direct Paper режиме `GeyserVoice` может сам скачать и запустить VoiceCraft runtime под капотом через:

- `config.voicecraft.auto-start`
- `shutdown-on-disable`
- `ready-timeout-ms`
- `install-directory`

Если хотите, можно и подключаться к уже запущенному внешнему VoiceCraft server.

## Подходит ли `McWss` для production?

Обычно это не первый выбор для больших публичных окружений.

Он лучше подходит для локальных миров, тестов и лёгких сценариев. Для Bedrock production обычно лучше `McHttp`.

## Где хранятся индивидуальная громкость и локальный mute для пользователей?

В `Settings.json` внутри `UserSettings.Users`.
