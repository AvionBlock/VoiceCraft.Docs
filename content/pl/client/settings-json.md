# Ustawienia.json

Plik ustawień klienta: `Settings.json`.

Klient zapisuje ten plik automatycznie. Użyj interfejsu użytkownika do normalnych zmian i edytuj JSON tylko na potrzeby odzyskiwania, automatyzacji lub zaawansowanego rozwiązywania problemów.

Przed ręczną edycją:

1. Zamknij klienta.
2. Utwórz kopię zapasową `Settings.json`.
3. Zmieniaj jedną sekcję na raz.
4. Otwórz ponownie klienta i sprawdź, czy interfejs użytkownika nadal się ładuje.

## Lokalizacja pliku

- Windows: `%AppData%/voicecraft/Settings.json`
- Linux: `~/.config/voicecraft/Settings.json`
- macOS: `~/Library/Application Support/voicecraft/Settings.json`
- Android/iOS: w piaskownicy aplikacji (`ApplicationData`)

## Pełny przykład

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

## Pola najwyższego poziomu

- `UserGuid`:
  lokalna tożsamość klienta.
- `ServerUserGuid`:
  przechowywana tożsamość po stronie serwera/identyfikator GUID zgodności używany przez klienta.
- `InputSettings`:
  mikrofon i obróbka wstępna.
- `OutputSettings`:
  ustawienia odtwarzania.
- `LocaleSettings`:
  Język interfejsu.
- `NotificationSettings`:
  zachowanie tostowe.
- `ServersSettings`:
  zapisane serwery VoiceCraft.
- `ThemeSettings`:
  wybrany motyw i tło.
- `NetworkSettings`:
  tryb pozycjonowania i wartości odbiornika McWss.
- `HotKeySettings`:
  konfigurowalne klawisze skrótu.
- `UserSettings`:
  lokalne preferencje poszczególnych użytkowników zdalnych.

## Ustawienia wejściowe

- `InputDevice`:
  wprowadź nazwę urządzenia.
- `InputCapturePreset`:
  Ustawienie wstępne przechwytywania platformy, domyślne `VoiceCommunication`.
- `InputVolume`:
  wzmocnienie wejściowe `0..2`.
- `MicrophoneSensitivity`:
  próg aktywności `0..1`.
- `AutomaticGainController`:
  wybrany identyfikator GUID implementacji AGC.
- `Denoiser`:
  wybrany identyfikator GUID odszumiacza.
- `EchoCanceler`:
  wybrany identyfikator GUID funkcji usuwania echa.
- `PushToTalkEnabled`:
  flaga logiczna dla trybu „Naciśnij i mów”.
- `PushToTalkCue`:
  flaga logiczna dla lokalnych dźwięków sygnalizacji.

## Ustawienia wyjściowe

- `OutputDevice`:
  nazwa urządzenia wyjściowego.
- `OutputVolume`:
  wzmocnienie odtwarzania `0..2`.
- `AudioClipper`:
  wybrany identyfikator GUID maszynki do strzyżenia.

## Ustawienia regionalne

- `Culture`:
  ustawienia regionalne, takie jak `en-US`, `ru-RU`, `nl-NL`, `de-DE`, `pl-PL`, `zh-CN`, `zh-TW`.

## Ustawienia powiadomień

- `DisableNotifications`:
  wyłącza powiadomienia klienta.
- `DismissDelayMs`:
  Limit czasu powiadomienia w milisekundach.

## Ustawienia serwerów

- `HideServerAddresses`:
  maskuje listę hostów w interfejsie użytkownika.
- `Servers`:
  zapisane wpisy serwera.

Każdy element `Servers[]`:

- `Name`:
  nazwa wyświetlana, maks. `12` znaków.
- `Ip`:
  host / IP, maks. `30` znaków.
- `Port`:
  Port UDP `1..65535`.

Wpisy serwera wskazują punkt końcowy UDP VoiceCraft z `VoiceCraftConfig.Port`. Nie są one takie same jak punkty końcowe transportu Minecraft `McHttp`, `McWss` lub `McTcp`.

## Ustawienia motywu

- `SelectedBackgroundImage`:
  wbudowany GUID tła.
- `SelectedTheme`:
  wbudowany motyw GUID.

## Ustawienia sieciowe

- `PositioningType`:
  `0 = Server`, `1 = Client`
- `McWssListenIp`:
  lokalny adres powiązania/nasłuchiwania protokołu internetowego.
- `McWssHostPort`:
  lokalny port hosta protokołu internetowego.

Ta wartość musi być zgodna z `VoiceCraftConfig.PositioningType` na serwerze.

`McWssListenIp` i `McWssHostPort` dotyczą zachowania lokalnego gniazda internetowego związanego z McWss. Nie zastępują one zapisanej listy serwerów VoiceCraft używanej do ruchu głosowego.

## Ustawienia klawisza skrótu

`HotKeySettings.Bindings` to `Dictionary<string, string>`.

Typowe klucze:

- `Mute`
- `Deafen`

Dokładna serializowana wartość zależy od zaplecza wejściowego pulpitu i analizatora kluczy.

## Ustawienia użytkownika

`UserSettings.Users` to słownik wprowadzany przez zdalnego użytkownika `Guid`.

Każda wartość zawiera:

- `Volume`:
  mnożnik wolumenu po stronie klienta na użytkownika.
- `UserMuted`:
  lokalne wyciszenie po stronie klienta.

Wartości te nie zastępują moderacji serwera; są to osobiste preferencje klienta.

## Ważne zakresy

- `InputVolume`: `0..2`
- `OutputVolume`: `0..2`
- `MicrophoneSensitivity`: `0..1`
- `Servers[].Name`: do `12` znaków
- `Servers[].Ip`: do `30` znaków
- `Servers[].Port`: `1..65535`
- `McWssHostPort`: `0..65535`

## Dobre praktyki

- nie używaj ręcznie wartości `LoginToken` jako ustawień użytkownika
- utrzymuj `PositioningType` w zgodności z serwerem
- jeśli rozwiązujesz problemy z dźwiękiem, zresetuj `InputDevice` i `OutputDevice` na `Default`
- jeśli urządzenie zniknie, pozwól klientowi zregenerować pasujące pole zamiast kopiować konfigurację starego komputera
- nie udostępniaj publicznie `Settings.json`, jeśli zawiera adresy prywatnych serwerów
- unikaj kopiowania pełnego pliku ustawień pomiędzy graczami; w razie potrzeby skopiuj tylko host/port serwera

## Zresetuj strategię

Jeśli klient stanie się bezużyteczny po ręcznych edycjach:

1. Zamknij klienta.
2. Odsuń `Settings.json` na bok jako kopię zapasową.
3. Uruchom klienta i pozwól mu wygenerować nowy plik.
4. Dodaj ponownie wpis serwera.
5. Skonfiguruj ponownie urządzenia audio i klawisze skrótu.
