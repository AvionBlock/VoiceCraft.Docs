# Быстрый старт

Это самый короткий путь до рабочего стека VoiceCraft.

## Сначала выберите сценарий

VoiceCraft можно разворачивать несколькими способами:

- Bedrock Dedicated Server: `VoiceCraft.Server` + `VoiceCraft.Addon.Core.McHttp`
- локальный Bedrock мир / singleplayer: `VoiceCraft.Server` или локальный runtime + `Core.McWss`
- Java-сервер с Geyser / Floodgate: `GeyserVoice` + `VoiceCraft.Server`
- прямой Paper-сервер: `GeyserVoice` может сам скачать и запустить VoiceCraft runtime под капотом

Если не уверены, начинайте отсюда:

- Bedrock dedicated server: [McHttp для BDS](/minecraft/mchttp-bds)
- Java + Geyser: [GeyserVoice](/ecosystem/geyservoice)

## 1. Скачайте сервер

1. Откройте [страницу скачивания](/download).
2. Скачайте серверный архив под вашу платформу:
   - `VoiceCraft.Server.Windows.x64.zip`
   - `VoiceCraft.Server.Windows.x86.zip`
   - `VoiceCraft.Server.Windows.arm64.zip`
   - `VoiceCraft.Server.Linux.x64.zip`
   - `VoiceCraft.Server.Linux.arm.zip`
   - `VoiceCraft.Server.Linux.arm64.zip`

Если собираете из исходников, смотрите [репозиторий и сборку VoiceCraft](/ecosystem/voicecraft-repository).

## 2. Один раз запустите сервер

### Windows

```powershell
./VoiceCraft.Server.exe
```

### Linux

```bash
chmod +x ./VoiceCraft.Server
./VoiceCraft.Server
```

После первого запуска появится `config/ServerProperties.json`.

## 3. Сразу защитите конфиг

До подключения Minecraft и игроков замените все сгенерированные токены:

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

Обычно для разных окружений лучше использовать разные значения.

## 4. Выберите Minecraft transport

Сейчас у VoiceCraft есть 3 transport-режима:

- `McHttp`:
  лучший вариант для Bedrock Dedicated Server
- `McWss`:
  лучший вариант для локальных миров, singleplayer и тестов
- `McTcp`:
  лучший вариант для Java-моста через `GeyserVoice`

Подробное сравнение: [Transport-режимы](/server/transports).

## 5. Скачайте клиент

Со [страницы скачивания](/download) скачайте клиент для игроков:

- Windows: `VoiceCraft.Client.Windows.<arch>.zip`
- Linux: `VoiceCraft.Client.Linux.<arch>.zip`
- macOS: `VoiceCraft.Client.MacOS.<arch>.dmg` или `.pkg`
- Android: `VoiceCraft.Client.Android.arm64.zip` (внутри APK)
- iOS: `VoiceCraft.Client.iOS.arm64.ipa`

## 6. Добавьте сервер в клиент

1. Откройте клиент.
2. Добавьте сервер в UI.
3. Используйте UDP endpoint из `VoiceCraftConfig.Port`.

Типичный локальный вариант:

- host: `127.0.0.1`
- port: `9050`

## 7. Подключите Minecraft-сторону

- Для Bedrock Dedicated Server: [McHttp для BDS](/minecraft/mchttp-bds)
- Для локального Bedrock мира: [McWss для одиночных миров](/minecraft/mcwss-singleplayer)
- Для Java + Geyser / Floodgate: [GeyserVoice](/ecosystem/geyservoice)

Если разворачиваете Bedrock-часть, держите рядом две страницы:

- [Страница скачивания](/download) для сырых client/server/addon релизов
- [Конфигуратор аддона](/addon-configurator) для готового архива под мир

## 8. Проверьте стек

Если всё настроено правильно:

- VoiceCraft сервер стартует без ошибок конфигурации и портов
- клиент подключается без transport-ошибок
- Minecraft-интеграция успешно проходит авторизацию по токену
- bind-механика работает
- игроки слышат proximity voice в радиусе

## Что читать дальше

- [Установка сервера](/server/installation)
- [Первый запуск сервера](/server/first-run)
- [ServerProperties.json](/server/server-properties)
- [Runtime overrides](/server/runtime-overrides)
- [Transport-режимы](/server/transports)
- [Страница скачивания](/download)
- [Конфигуратор аддона](/addon-configurator)
