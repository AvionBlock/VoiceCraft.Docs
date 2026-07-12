# Быстрый старт

Это руководство — самый быстрый способ получить работающий стек VoiceCraft.

Оно намеренно проходит через весь путь: сервер, сгенерированную конфигурацию, клиент, транспорт Minecraft и проверку. Не останавливайтесь после запуска двоичного файла сервера; в этот момент голосовой сервер существует, но Minecraft еще не подключен.

## Сначала выберите топологию

VoiceCraft можно развернуть несколькими способами:

- Выделенный сервер Bedrock: `VoiceCraft.Server` + `VoiceCraft.Addon.Core.McHttp`
- Локальный мир Bedrock/одиночная игра: `VoiceCraft.Server` или локальная среда выполнения + `Core.McWss`
- Java-сервер с Geyser/Floodgate: `VoiceCraft.Java` + `VoiceCraft.Server`
- Сервер Direct Paper: `VoiceCraft.Java` также может загружать и запускать среду выполнения VoiceCraft «под капотом».

Если вы не уверены, начните с одного из них:

- Выделенный сервер Bedrock: прочитайте [McHttp for BDS](/minecraft/mchttp-bds)
- Сервер Java + Geyser: прочитайте [VoiceCraft.Java](/ecosystem/voicecraft-java)

Для первой настройки выберите одну топологию и откройте только тот транспорт, который ей нужен. Смешанные схемы можно добавить позже, когда уже работают базовая привязка и звук с учетом расстояния.

## 1. Загрузите сервер

1. Откройте [страницу загрузки](/download).
2. Скачайте архив сервера для вашей платформы:
   - `VoiceCraft.Server.Windows.x64.v1.7.0.zip`
   - `VoiceCraft.Server.Windows.x86.v1.7.0.zip`
   - `VoiceCraft.Server.Windows.arm64.v1.7.0.zip`
   - `VoiceCraft.Server.Linux.x64.v1.7.0.zip`
   - `VoiceCraft.Server.Linux.arm.v1.7.0.zip`
   - `VoiceCraft.Server.Linux.arm64.v1.7.0.zip`

Если вы собираете из исходного кода, см. [репозиторий и сборку VoiceCraft](/ecosystem/voicecraft-repository).

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

## 3. Защитите сгенерированный конфиг

Прежде чем подключать Minecraft или игроков, измените каждый сгенерированный общий токен:

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

Обычно вам нужны разные значения для каждой среды.

Токен, который вы используете позже, должен соответствовать транспорту:

- Аддон BDS `McHttp` использует `McHttpConfig.LoginToken`
- локальный аддон Bedrock `McWss` использует `McWssConfig.LoginToken`
- `VoiceCraft.Java` использует `McTcpConfig.LoginToken`

## 4. Выберите транспорт Minecraft

В настоящее время у VoiceCraft есть 3 транспорта, ориентированных на Minecraft:

- `McHttp`:
  Лучше всего подходит для выделенного сервера Bedrock и наиболее стабильной автоматизации Bedrock.
- `McWss`:
  Лучше всего подходит для локальных миров, тестирования и сценариев с командным туннелем.
- `McTcp`:
  Лучше всего подходит для мостов на стороне Java, таких как `VoiceCraft.Java`.

См. [режимы транспорта](/server/transports) для полного сравнения.

Убедитесь, что выбранный транспорт включен и привязан к адресу, которого может достичь среда выполнения Minecraft.

## 5. Загрузите клиент

Загрузите пакет для своих игроков со [страницы загрузки](/download):

- Windows: `VoiceCraft.Client.Windows.<arch>.v1.7.0.zip`
- Linux: `VoiceCraft.Client.Linux.<arch>.v1.7.0.zip`
- macOS: `VoiceCraft.Client.MacOS.<arch>.v1.7.0.zip`
- Android: `VoiceCraft.Client.Android.arm64.v1.7.0.zip` (APK внутри)
- iOS: `VoiceCraft.Client.iOS.arm64.v1.7.0.zip`

## 6. Добавляем сервер в клиент

1. Откройте клиент.
2. Выберите микрофон и устройства воспроизведения.
3. Добавьте запись сервера в UI.
4. Используйте UDP-эндпоинт VoiceCraft из `VoiceCraftConfig.Port`.
5. Убедитесь, что клиент `Positioning Type` соответствует `VoiceCraftConfig.PositioningType`.

Типичная локальная установка:

- хост: `127.0.0.1`
- порт: `9050`

## 7. Подключите сторону Minecraft

- Для выделенного сервера Bedrock используйте [McHttp for BDS](/minecraft/mchttp-bds).
- Для локального мира Bedrock используйте [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer).
- Для Java + Geyser/Floodgate используйте [VoiceCraft.Java](/ecosystem/voicecraft-java).

Именно этот шаг дает VoiceCraft внутриигровое состояние, необходимое для звука с учетом расстояния: идентичность игрока, данные привязки, идентификаторы миров, обновления положения и состояние эффектов.

Если вы выполняете развертывание на Bedrock, держите эти две страницы поблизости:

- [страница загрузки](/download) для файлов релизов клиента, сервера и аддона
- [конфигуратор аддона](/addon-configurator) для готового к распаковке архива мира

## 8. Проверьте стек

Если все настроено правильно:

- сервер VoiceCraft запускается без ошибок конфигурации или порта
- клиент подключается без транспортных ошибок
- Интеграция Minecraft проверяет подлинность с помощью ожидаемого токена
- сущность создается, и процесс привязки работает
- игроки слышат друг друга на ожидаемой дистанции

Если клиент подключается, но звук с учетом расстояния не работает, отладьте транспорт Minecraft и процесс привязки, прежде чем изменять настройки звука.

## Рекомендуем следующее чтение

- [Установка сервера](/server/installation)
- [Первый запуск сервера](/server/first-run)
- [ServerProperties.json](/server/server-properties)
- [Переопределения времени выполнения](/server/runtime-overrides)
- [Режимы транспорта](/server/transports)
- [страница загрузки](/download)
- [конфигуратор аддона](/addon-configurator)
