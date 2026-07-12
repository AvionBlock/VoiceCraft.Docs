# Установка клиента

`VoiceCraft.Client` — приложение игрока. Каждый игрок, который хочет говорить или слышать proximity voice, запускает его на своём устройстве.

Устанавливайте клиент после того, как `VoiceCraft.Server` reachable. При первом запуске добавьте server entry на VoiceCraft UDP endpoint, обычно `host:9050`.

VoiceCraft `1.7.0` поставляет native desktop и mobile clients. Browser/web client target больше не входит в core release.

## Перед началом

Нужно знать:

- server address для игроков
- UDP port из `VoiceCraftConfig.Port`
- доступные microphone/playback devices
- matching `Positioning Type` между client и server
- client `1.7.x` для server `1.7.x`

Для local testing endpoint обычно:

```text
127.0.0.1:9050
```

Для remote servers используйте public или LAN address машины с `VoiceCraft.Server`.

## Windows

1. Скачайте `VoiceCraft.Client.Windows.<Architecture>.v1.7.0.zip`.
2. Распакуйте архив.
3. Запустите `VoiceCraft.Client.Windows.exe`.
4. Если Windows SmartScreen предупреждает, проверьте, что файл скачан с official release page.

## Linux

1. Скачайте `VoiceCraft.Client.Linux.<Architecture>.v1.7.0.zip`.
2. Распакуйте архив.
3. Дайте права и запустите:

```bash
chmod +x ./VoiceCraft.Client.Linux
./VoiceCraft.Client.Linux
```

Если app не видит audio devices, проверьте PulseAudio/PipeWire permissions и sandbox ограничения.

## macOS

Выберите пакет под устройство:

- Apple Silicon: arm64 package
- Intel Mac: x64 package

Если macOS блокирует запуск:

```bash
xattr -dr com.apple.quarantine /Applications/VoiceCraft.app
```

Снимайте quarantine только для builds, которым доверяете.

## Android

1. Скачайте `VoiceCraft.Client.Android.<Architecture>.v1.7.0.zip`.
2. Распакуйте архив.
3. Откройте `.apk` и установите.
4. Разрешите microphone permission.

VoiceCraft `1.7.0` использует Android package version `17`.

## iOS

1. Скачайте `VoiceCraft.Client.iOS.arm64.v1.7.0.zip`.
2. Установите IPA через AltStore, TestFlight или другой поддерживаемый путь.
3. При необходимости разрешите profile в iOS settings.
4. Разрешите microphone и local network permissions.

`1.7.0` содержит iOS sample-rate conversion fix. Если на старых builds был distorted input, проверьте capture заново.

iOS bundle identifier изменён на `team.avion.voicecraft`.

## Web client отсутствует в 1.7

Browser/web client project удалён из core repository в `1.7.0`.

Используйте native clients:

- Windows
- Linux
- macOS
- Android
- iOS

## First launch checklist

1. Откройте client.
2. Выберите input/output devices.
3. Проверьте microphone test.
4. Добавьте server entry:
   - host: VoiceCraft server address
   - port: `VoiceCraftConfig.Port`
5. Проверьте `Positioning Type`.
6. Подключитесь до Minecraft bind flow.

Client connection означает только доступность voice endpoint. Proximity зависит от addon/plugin и matching transport.

## Частые проблемы

- Нет microphone input:
  проверьте OS microphone permission и выбранный input device.
- iOS client не видит LAN server:
  проверьте local network permission и server address.
- Client подключается, но proximity нет:
  проверьте Minecraft transport, bind flow и `Positioning Type`.
- Remote server не подключается:
  проверьте UDP port между player и `VoiceCraft.Server`.
- Игрок слышит всех на неправильной дистанции:
  проверьте position updates, world IDs и effect bitmasks.

## Screenshots

![General Settings](/images/voicecraft/settings-general.png)
![Voice Settings](/images/voicecraft/settings-voice.png)
