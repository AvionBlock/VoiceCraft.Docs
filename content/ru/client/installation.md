# Установка клиента

## Windows

1. Скачайте `VoiceCraft.Client.Windows.<Architecture>.zip`.
2. Распакуйте архив.
3. Запустите `VoiceCraft.Client.Windows.exe`.

## Linux

1. Скачайте `VoiceCraft.Client.Linux.<Architecture>.zip`.
2. Распакуйте архив.
3. Выдайте права и запустите:

```bash
chmod +x ./VoiceCraft.Client.Linux
./VoiceCraft.Client.Linux
```

## macOS

Выберите один из пакетов:

- `VoiceCraft.Client.MacOS.arm64.dmg` / `.pkg` для Apple Silicon
- `VoiceCraft.Client.MacOS.x64.dmg` / `.pkg` для Intel

### DMG

1. Откройте `.dmg`.
2. Перетащите `VoiceCraft.app` в `Applications`.
3. Запустите приложение.

### PKG

1. Откройте `.pkg`.
2. Пройдите установщик.
3. Запустите `VoiceCraft` из `Applications`.

Если macOS блокирует запуск:

```bash
xattr -dr com.apple.quarantine /Applications/VoiceCraft.app
```

## Android

1. Скачайте `VoiceCraft.Client.Android.<Architecture>.zip`.
2. Распакуйте архив.
3. Откройте `.apk` из архива и установите приложение.

## iOS (AltStore / sideload)

1. Скачайте `VoiceCraft.Client.iOS.arm64.ipa`.
2. Установите IPA через AltStore или другой sideload-инструмент.
3. Разрешите запуск профиля в настройках iOS при необходимости.

## Примечание про .NET Runtime

Для старых релизов (до `v1.4.0`) может понадобиться установленный .NET 9 runtime.
Для актуальных self-contained сборок обычно не требуется.

## Скриншоты UI (плейсхолдеры)

![General Settings](/images/voicecraft/settings-general.png)
![Voice Settings](/images/voicecraft/settings-voice.png)
