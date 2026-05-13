# Установка сервера

`VoiceCraft.Server` — это автономный бэкэнд, который принимает клиентский голосовой трафик и предоставляет транспорты, ориентированные на Minecraft.

Используйте эту страницу в качестве пути установки сервера. К концу у вас должен быть работающий сервер, сгенерированная конфигурация, выбранный транспорт Minecraft и понятная следующая страница для вашей интеграции с Minecraft.

## Что на самом деле включает в себя сервер

Сервер VoiceCraft предоставляет сразу несколько уровней:

- Голосовой сервер VoiceCraft UDP
- `McHttp` транспорт для интеграции с Bedrock
- `McWss` транспорт для потоков WebSocket/командных туннелей Bedrock
- Транспорт `McTcp` для мостов на стороне Java, таких как `GeyserVoice`

Вы можете оставить их все включенными или выбрать транспорты во время выполнения.

## Порядок настройки

1. Загрузите и распакуйте сервер для вашей платформы.
2. Запустите его один раз из папки, в которой вы хотите сохранить конфигурацию.
3. Остановите процесс после создания `config/ServerProperties.json`.
4. Замените сгенерированные токены входа.
5. Включите транспорт Minecraft, соответствующий вашей топологии.
6. Установите привязки хоста и правила брандмауэра.
7. Запустите сервер снова.
8. Добавьте UDP endpoint VoiceCraft в клиенте.
9. Подключите сторону Minecraft с помощью соответствующего аддона или руководства по плагину.

## Готовые бинарные выпуски

Страница выпуска обычно включает в себя:

- Windows:
  `VoiceCraft.Server.Windows.x64.zip`, `x86`, `arm64`
- Linux:
  `VoiceCraft.Server.Linux.x64.zip`, `arm`, `arm64`

Скачать: [Download Page](/download)

## Windows

1. Загрузите `VoiceCraft.Server.Windows.<arch>.zip`.
2. Распакуйте архив в отдельную папку.
3. Запустите сервер из этой папки:

```powershell
./VoiceCraft.Server.exe
```

При первом запуске создается `config/ServerProperties.json`. Сохраните этот файл в папке сервера и не удаляйте его между перезапусками.

## Linux

1. Загрузите `VoiceCraft.Server.Linux.<arch>.zip`.
2. Распакуйте архив в отдельную папку.
3. Запустите сервер из этой папки:

```bash
chmod +x ./VoiceCraft.Server
./VoiceCraft.Server
```

При первом запуске создается `config/ServerProperties.json`. Сохраните этот файл в папке сервера и убедитесь, что он включен в резервные копии.

## После первого запуска

Остановите сервер и откройте `config/ServerProperties.json` перед подключением Minecraft или игроков.

Сначала внесите следующие изменения:

1. Замените каждый сгенерированный общий токен:
   - `McHttpConfig.LoginToken`
   - `McWssConfig.LoginToken`
   - `McTcpConfig.LoginToken`
2. Выберите один основной транспорт Minecraft:
   - Выделенный сервер Bedrock: включите `McHttpConfig`
   - локальный мир Bedrock: включить `McWssConfig`
   - Java + Geyser/Floodgate: включить `McTcpConfig`
3. Установите транспортный хост:
   - используйте `127.0.0.1`, когда Minecraft работает на том же компьютере
   - используйте `0.0.0.0` или локальный/публичный адрес только тогда, когда необходимо подключить другой компьютер
4. Оставьте `VoiceCraftConfig.Port` доступным для клиентов игроков.
5. Перезапустите `VoiceCraft.Server` после сохранения конфигурации.

Для всех полей конфигурации продолжайте с [First Server Run](/server/first-run) и [ServerProperties.json](/server/server-properties).

## Подключите остальную часть стека

Как только сервер перезапустится без ошибок:

1. Установите клиент VoiceCraft для каждого игрока из файла [Download Page](/download).
2. Добавьте запись сервера в клиенте:
   - хост: адрес вашего сервера VoiceCraft.
   - порт: `VoiceCraftConfig.Port`, обычно `9050`
3. Следуйте руководству Minecraft для выбранного вами транспорта:
   - [McHttp for BDS](/minecraft/mchttp-bds)
   - [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer)
   - [GeyserVoice](/ecosystem/geyservoice)

Сервер не считается полностью настроенным до тех пор, пока клиент не подключится и сторона Minecraft не пройдет аутентификацию с тем же транспортным токеном.

## macOS

Не всегда может быть готовый выделенный артефакт, но сервер можно собрать из исходного кода:

```bash
git clone https://github.com/AvionBlock/VoiceCraft.git
cd VoiceCraft/VoiceCraft.Server
dotnet restore
dotnet publish -c Release -r osx-arm64 -p:PublishSingleFile=true
```

Для Intel macOS замените `osx-arm64` на `osx-x64`.

## Docker/контейнеры

Образы контейнеров взяты из основного репозитория README:

- [VoiceCraft Docker Hub](https://hub.docker.com/r/sinevector241/voicecraft/tags)

Развертывание контейнера полезно, когда:

- вам нужна выделенная граница обслуживания
- вы уже запускаете узлы BDS/Java в контейнерах
- вам нужны более простые политики и журналы перезапуска

После запуска контейнера сохраните и отредактируйте сгенерированный `config/ServerProperties.json` так же, как и при обычной двоичной установке.

## Рекомендуемая схема установки

Пример макета Linux:

```text
/opt/voicecraft/
  VoiceCraft.Server
  config/
    ServerProperties.json
```

Рекомендуемые практики:

- хранить VoiceCraft в отдельном каталоге
- сохранить `config/`
- резервная копия `ServerProperties.json`
- не смешивайте несколько сред в одной папке

## Готовый чек-лист

Прежде чем открыть настройку для игроков, подтвердите:

- `VoiceCraft.Server` запускается без ошибок конфигурации или порта
- все сгенерированные значения `LoginToken` были заменены
- выставлен только тот транспорт, который вам нужен
- соответствие хоста и порта клиента `VoiceCraftConfig.Port`
- Аддон или плагин Minecraft использует соответствующий транспортный токен.
- процесс привязки работает в игре

## Запуск от имени службы systemd (Linux)

Пример `/etc/systemd/system/voicecraft.service`:

```ini
[Unit]
Description=VoiceCraft Server
After=network.target

[Service]
WorkingDirectory=/opt/voicecraft
ExecStart=/opt/voicecraft/VoiceCraft.Server
Restart=always
RestartSec=3
User=voicecraft
Group=voicecraft

[Install]
WantedBy=multi-user.target
```

Примените это:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now voicecraft
sudo systemctl status voicecraft
```

## Сборка из исходного кода

См. [VoiceCraft repository and build](/ecosystem/voicecraft-repository) для получения подробной информации о SDK и проекте.

Минимальный поток:

```bash
git clone https://github.com/AvionBlock/VoiceCraft.git
cd VoiceCraft
dotnet restore
dotnet build -c Release
dotnet run --project VoiceCraft.Server
```

## Что читать дальше

- [First Server Run](/server/first-run)
- [ServerProperties.json](/server/server-properties)
- [Transport Modes](/server/transports)
- [Client Installation](/client/installation)
- [McHttp for BDS](/minecraft/mchttp-bds)
- [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer)
- [GeyserVoice](/ecosystem/geyservoice)
