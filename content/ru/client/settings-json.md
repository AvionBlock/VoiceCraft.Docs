# Настройки.json

Файл настроек клиента: `Settings.json`.

Клиент записывает этот файл автоматически. Используйте UI для обычных изменений и редактируйте JSON только для восстановления, автоматизации или расширенного устранения неполадок.

Перед ручным редактированием:

1. Закройте клиент.
2. Создайте резервную копию `Settings.json`.
3. Меняйте по одному разделу за раз.
4. Снова откройте клиент и убедитесь, что UI все еще загружается.

## Местоположение файла

- Windows: `%AppData%/voicecraft/Settings.json`
- Linux: `~/.config/voicecraft/Settings.json`
- macOS: `~/Library/Application Support/voicecraft/Settings.json`
- Android/iOS: внутри песочницы приложения (`ApplicationData`)

## Полный пример

```json
{
  "UserGuid": "7f303d4a-5105-4b4f-9de4-2448f5ddf703",
  "ServerUserGuid": "6727d672-8f9f-4916-b960-26a3e0a9cd18",
  "InputSettings": {
    "InputDevice": "Default",
    "InputCapturePreset": "VoiceCommunication",
    "InputVolume": 1.0,
    "MicrophoneSensitivity": 0.04,
    "AutomaticGainController": "00000000-0000-0000-0000-000000000000",
    "Denoiser": "00000000-0000-0000-0000-000000000000",
    "EchoCanceler": "00000000-0000-0000-0000-000000000000",
    "PushToTalkEnabled": false,
    "PushToTalkCue": true
  },
  "OutputSettings": {
    "OutputDevice": "Default",
    "OutputVolume": 1.0,
    "AudioClipper": "962fe030-08c3-4e21-a9c1-fcfea0745b6a"
  },
  "LocaleSettings": {
    "Culture": "en-US"
  },
  "NotificationSettings": {
    "DisableNotifications": false,
    "DismissDelayMs": 2000
  },
  "ServersSettings": {
    "HideServerAddresses": false,
    "Servers": [
      {
        "Name": "Local",
        "Ip": "127.0.0.1",
        "Port": 9050
      }
    ]
  },
  "ThemeSettings": {
    "SelectedBackgroundImage": "6b023e19-c9c5-4e06-84df-22833ccccd87",
    "SelectedTheme": "cf8e39fe-21cc-4210-91e6-d206e22ca52e"
  },
  "NetworkSettings": {
    "PositioningType": 0,
    "McWssListenIp": "127.0.0.1",
    "McWssHostPort": 8080
  },
  "HotKeySettings": {
    "Bindings": {
      "Mute": "LeftControl+LeftShift+M",
      "Deafen": "LeftControl+LeftShift+D"
    }
  },
  "UserSettings": {
    "Users": {
      "0f9716f4-08f1-4580-bb27-f8a4b730e89d": {
        "Volume": 1.0,
        "UserMuted": false
      }
    }
  }
}
```

## Поля верхнего уровня

- `UserGuid`:
  идентификатор локального клиента.
- `ServerUserGuid`:
  сохраненный идентификатор GUID/совместимости на стороне сервера, используемый клиентом.
- `InputSettings`:
  микрофон и предварительная обработка.
- `OutputSettings`:
  настройки воспроизведения.
- `LocaleSettings`:
  Язык пользовательского интерфейса.
- `NotificationSettings`:
  поведение тоста.
- `ServersSettings`:
  сохраненные серверы VoiceCraft.
- `ThemeSettings`:
  выбранная тема и фон.
- `NetworkSettings`:
  режим позиционирования и значения прослушивателя McWss.
- `HotKeySettings`:
  настраиваемые горячие клавиши.
- `UserSettings`:
  локальные настройки для каждого удаленного пользователя.

## Настройки ввода

- `InputDevice`:
  имя устройства ввода.
- `InputCapturePreset`:
  предустановка захвата платформы, по умолчанию `VoiceCommunication`.
- `InputVolume`:
  входное усиление `0..2`.
- `MicrophoneSensitivity`:
  порог активности `0..1`.
- `AutomaticGainController`:
  выбранный GUID реализации AGC.
- `Denoiser`:
  выбранный GUID шумоподавителя.
- `EchoCanceler`:
  выбранный GUID эхокомпенсатора.
- `PushToTalkEnabled`:
  логический флаг для режима «нажми и говори».
- `PushToTalkCue`:
  логический флаг для локальных звуков реплик.

## Настройки вывода

- `OutputDevice`:
  имя устройства вывода.
- `OutputVolume`:
  усиление воспроизведения `0..2`.
- `AudioClipper`:
  выбранный GUID клипера.

## Настройки локали

- `Culture`:
  локаль, например `en-US`, `ru-RU`, `nl-NL`, `de-DE`, `pl-PL`, `zh-CN`, `zh-TW`.

## Настройки уведомлений

- `DisableNotifications`:
  отключает уведомления клиентов.
- `DismissDelayMs`:
  таймаут уведомления в миллисекундах.

## Настройки серверов

- `HideServerAddresses`:
  маскирует список хостов в пользовательском интерфейсе.
- `Servers`:
  сохраненные записи сервера.

Каждый элемент `Servers[]`:

- `Name`:
  отображаемое имя, максимум `12` символов.
- `Ip`:
  хост/IP, максимум `30` символов.
- `Port`:
  UDP-порт `1..65535`.

Записи сервера указывают на UDP endpoint VoiceCraft из `VoiceCraftConfig.Port`. Они отличаются от конечных точек транспорта Minecraft `McHttp`, `McWss` или `McTcp`.

## Настройки темы

- `SelectedBackgroundImage`:
  встроенный фоновый GUID.
- `SelectedTheme`:
  встроенный GUID темы.

## Настройки сети

- `PositioningType`:
  `0 = Server`, `1 = Client`
- `McWssListenIp`:
  локальный адрес привязки/прослушивания WebSocket.
- `McWssHostPort`:
  локальный хост-порт WebSocket.

Это значение должно соответствовать `VoiceCraftConfig.PositioningType` на сервере.

`McWssListenIp` и `McWssHostPort` предназначены для поведения локального WebSocket, связанного с McWss. Они не заменяют сохраненный список серверов VoiceCraft, используемый для голосового трафика.

## Настройки горячих клавиш

`HotKeySettings.Bindings` — это `Dictionary<string, string>`.

Типичные ключи:

- `Mute`
- `Deafen`

Точное сериализованное значение зависит от серверной части ввода рабочего стола и анализатора ключей.

## Пользовательские настройки

`UserSettings.Users` — это словарь, созданный удаленным пользователем `Guid`.

Каждое значение содержит:

- `Volume`:
  множитель объема на стороне клиента.
- `UserMuted`:
  локальное отключение звука на стороне клиента.

Эти значения не заменяют модерацию сервера; это личные предпочтения клиента.

## Важные диапазоны

- `InputVolume`: `0..2`
- `OutputVolume`: `0..2`
- `MicrophoneSensitivity`: `0..1`
- `Servers[].Name`: до `12` символов.
- `Servers[].Ip`: до `30` символов.
- `Servers[].Port`: `1..65535`
- `McWssHostPort`: `0..65535`

## Передовая практика

- не используйте вручную значения `LoginToken` в качестве пользовательских настроек
- поддерживать `PositioningType` в соответствии с сервером
- при устранении неполадок со звуком сбросьте `InputDevice` и `OutputDevice` на `Default`.
- если устройство исчезает, позвольте клиенту повторно создать соответствующее поле вместо копирования конфигурации старой машины.
- не публикуйте `Settings.json` публично, если он содержит адреса частных серверов
- избегайте копирования полного файла настроек между игроками; скопируйте только хост/порт сервера, если необходимо

## Сбросить стратегию

Если клиент становится непригодным для использования после ручного редактирования:

1. Закройте клиент.
2. Переместите `Settings.json` в качестве резервной копии.
3. Запустите клиент и позвольте ему сгенерировать новый файл.
4. Повторно добавьте запись сервера.
5. Перенастройте аудиоустройства и горячие клавиши.
