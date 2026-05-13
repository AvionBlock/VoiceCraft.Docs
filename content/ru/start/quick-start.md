# Быстрый старт

Это руководство — самый быстрый способ получить работающий стек VoiceCraft.

Он намеренно проходит через весь путь: сервер, сгенерированную конфигурацию, клиент, транспорт Minecraft и проверку. Не останавливайтесь после запуска двоичного файла сервера; в этот момент голосовой сервер существует, но Minecraft еще не подключен.

## Сначала выберите топологию

VoiceCraft можно развернуть несколькими способами:

- Выделенный сервер Bedrock: `VoiceCraft.Server` + `VoiceCraft.Addon.Core.McHttp`
- Локальный мир Bedrock/одиночная игра: `VoiceCraft.Server` или локальная среда выполнения + `Core.McWss`
- Java-сервер с Geyser/Floodgate: `GeyserVoice` + `VoiceCraft.Server`
- Сервер Direct Paper: `GeyserVoice` также может загружать и запускать среду выполнения VoiceCraft «под капотом».

Если вы не уверены, начните с одного из них:

- Выделенный сервер Bedrock: прочитайте [McHttp for BDS](/minecraft/mchttp-bds)
- Сервер Java + Geyser: прочитайте [GeyserVoice](/ecosystem/geyservoice)

Для первой настройки выберите одну топологию и откройте только тот транспорт, который ей нужен. Вы можете добавить смешанные настройки позже, после того, как заработает базовый поток привязки и близости.

## 1. Загрузите сервер

1. Откройте [download page](/download).
2. Скачайте архив сервера для вашей платформы:
   - `VoiceCraft.Server.Windows.x64.zip`
   - `VoiceCraft.Server.Windows.x86.zip`
   - `VoiceCraft.Server.Windows.arm64.zip`
   - `VoiceCraft.Server.Linux.x64.zip`
   - `VoiceCraft.Server.Linux.arm.zip`
   - `VoiceCraft.Server.Linux.arm64.zip`

Если вы создаете исходный код, см. [VoiceCraft repository and build](/ecosystem/voicecraft-repository).

## 2. Запустите сервер один раз

Запустите из папки, в которой вы хотите разместить `config/ServerProperties.json`.

### Windows

```powershell
./VoiceCraft.Server.exe
```

### Linux

```bash
chmod +x ./VoiceCraft.Server
./VoiceCraft.Server
```

После первого запуска VoiceCraft генерирует `config/ServerProperties.json`.

Остановите сервер перед редактированием этого файла.

## 3. Защитите сгенерированный конфиг.

Прежде чем подключать Minecraft или игроков, измените каждый сгенерированный общий токен:

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

Обычно вам нужны разные значения для каждой среды.

Токен, который вы используете позже, должен соответствовать транспорту:

- Дополнение BDS `McHttp` использует `McHttpConfig.LoginToken`
- локальный аддон Bedrock `McWss` использует `McWssConfig.LoginToken`
- `GeyserVoice` использует `McTcpConfig.LoginToken`

## 4. Выберите транспорт Майнкрафт.

В настоящее время у VoiceCraft есть 3 транспорта, ориентированных на Minecraft:

- `McHttp`:
  Лучше всего подходит для выделенного сервера Bedrock и наиболее стабильной автоматизации Bedrock.
- `McWss`:
  Лучше всего подходит для локальных миров, тестирования и сценариев командного туннеля.
- `McTcp`:
  Лучше всего подходит для мостов на стороне Java, таких как `GeyserVoice`.

См. [Transport Modes](/server/transports) для полного сравнения.

Убедитесь, что выбранный транспорт включен и привязан к адресу, которого может достичь среда выполнения Minecraft.

## 5. Загрузите клиент

Загрузите пакет для своих плееров с [download page](/download):

- Windows: `VoiceCraft.Client.Windows.<arch>.zip`
- Linux: `VoiceCraft.Client.Linux.<arch>.zip`
- macOS: `VoiceCraft.Client.MacOS.<arch>.dmg` или `.pkg`
- Android: `VoiceCraft.Client.Android.arm64.zip` (APK внутри)
- iOS: `VoiceCraft.Client.iOS.arm64.ipa`

## 6. Добавляем сервер в клиент

1. Откройте клиент.
2. Выберите микрофон и устройства воспроизведения.
3. Добавьте запись сервера в пользовательский интерфейс.
4. Используйте конечную точку UDP VoiceCraft из `VoiceCraftConfig.Port`.
5. Убедитесь, что клиент `Positioning Type` соответствует `VoiceCraftConfig.PositioningType`.

Типичная локальная установка:

- хост: `127.0.0.1`
- порт: `9050`

## 7. Подключите сторону Minecraft

- Для выделенного сервера Bedrock используйте [McHttp for BDS](/minecraft/mchttp-bds).
- Для локального мира Bedrock используйте [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer).
- Для Java + Geyser/Floodgate используйте [GeyserVoice](/ecosystem/geyservoice).

Именно этот шаг дает VoiceCraft внутриигровое состояние, необходимое для звука близости: личность игрока, данные привязки, мировые идентификаторы, обновления местоположения и состояние эффекта.

Если вы выполняете развертывание на Bedrock, держите эти две страницы поблизости:

- [Download Page](/download) для необработанных файлов релизов клиента/сервера/дополнения
- [Addon Configurator](/addon-configurator) для готового к распаковке мирового архива

## 8. Проверьте стек

Если все настроено правильно:

- Сервер VoiceCraft запускается без ошибок конфигурации или порта
- клиент подключается без транспортных ошибок
- Интеграция Minecraft проверяет подлинность с помощью ожидаемого токена
- создание сущности и работа с потоком привязки
- игроки слышат голос близости, когда они находятся в пределах досягаемости

Если клиент подключается, но близость не работает, отладьте транспорт Minecraft и поток привязки, прежде чем изменять настройки звука.

## Рекомендуем следующее чтение

- [Server Installation](/server/installation)
- [First Server Run](/server/first-run)
- [ServerProperties.json](/server/server-properties)
- [Runtime Overrides](/server/runtime-overrides)
- [Transport Modes](/server/transports)
- [Download Page](/download)
- [Addon Configurator](/addon-configurator)
