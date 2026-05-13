# Instalacja klienta

`VoiceCraft.Client` to aplikacja przeznaczona dla graczy. Każdy gracz, który chce mówić lub słyszeć głos zbliżeniowy, potrzebuje go działającego na swoim urządzeniu.

Zainstaluj klienta, gdy `VoiceCraft.Server` będzie osiągalny. Podczas pierwszego uruchomienia dodasz wpis serwera wskazujący punkt końcowy UDP VoiceCraft, zwykle `host:9050`.

## Zanim zaczniesz

Potrzebujesz:

- adres serwera, którego powinni używać gracze
- port UDP serwera z `VoiceCraftConfig.Port`
- mikrofon i urządzenie odtwarzające dostępne dla systemu operacyjnego
- dopasowanie `Positioning Type` między klientem a serwerem

W przypadku testów lokalnych punktem końcowym jest zwykle:

```text
127.0.0.1:9050
```

W przypadku serwerów zdalnych użyj adresu publicznego lub LAN komputera, na którym działa `VoiceCraft.Server`.

## Windows

1. Pobierz `VoiceCraft.Client.Windows.<Architecture>.zip`.
2. Wypakuj archiwum.
3. Uruchom `VoiceCraft.Client.Windows.exe`.
4. Jeśli zostanie wyświetlony ekran Windows SmartScreen, przed kontynuowaniem sprawdź, czy plik pochodzi z oficjalnej strony wydania.

## Linux

1. Pobierz `VoiceCraft.Client.Linux.<Architecture>.zip`.
2. Wypakuj archiwum.
3. Przyznaj uprawnienia i uruchom:

```bash
chmod +x ./VoiceCraft.Client.Linux
./VoiceCraft.Client.Linux
```

Jeśli aplikacja nie widzi urządzeń audio, sprawdź uprawnienia PulseAudio/PipeWire i czy aplikacja działa w ograniczonym obszarze izolowanym.

## macOS

Wybierz jeden pakiet:

- `VoiceCraft.Client.MacOS.arm64.dmg` / `.pkg` dla Apple Silicon
- `VoiceCraft.Client.MacOS.x64.dmg` / `.pkg` dla Intela

### DMG

1. Otwórz `.dmg`.
2. Przeciągnij `VoiceCraft.app` do `Applications`.
3. Uruchom aplikację.

### PKG

1. Otwórz `.pkg`.
2. Ukończ instalator.
3. Uruchom `VoiceCraft` z `Applications`.

Jeśli macOS blokuje uruchamianie:

```bash
xattr -dr com.apple.quarantine /Applications/VoiceCraft.app
```

Usuń kwarantannę tylko dla kompilacji, które celowo pobrałeś i którym ufasz.

## Androida

1. Pobierz `VoiceCraft.Client.Android.<Architecture>.zip`.
2. Wypakuj archiwum.
3. Otwórz `.apk` z archiwum i zainstaluj.
4. Zezwól na pozwolenie na korzystanie z mikrofonu, gdy Android o to poprosi.

## iOS (AltStore / ładowanie boczne)

1. Pobierz `VoiceCraft.Client.iOS.arm64.ipa`.
2. Zainstaluj IPA poprzez AltStore lub inne narzędzie sideload.
3. W razie potrzeby zezwól na profil w ustawieniach iOS.
4. Zezwól na uprawnienia do mikrofonu przy pierwszym uruchomieniu.

## Uwaga dotycząca środowiska uruchomieniowego platformy .NET

W przypadku starszych wersji (przed `v1.4.0`) może być wymagane zainstalowane środowisko wykonawcze .NET 9.
W przypadku obecnych samodzielnych kompilacji zwykle nie jest to wymagane.

## Lista kontrolna pierwszego uruchomienia

1. Otwórz klienta.
2. Wybierz urządzenia wejściowe i wyjściowe.
3. Użyj testu mikrofonu, aby potwierdzić poziom wejściowy.
4. Dodaj wpis serwera:
   - host: Adres serwera VoiceCraft
   - port: `VoiceCraftConfig.Port`
5. Potwierdź, że `Positioning Type` pasuje do serwera.
6. Połącz się przed rozpoczęciem procesu wiązania Minecraft.

Pomyślne połączenie klienta potwierdza jedynie, że punkt końcowy głosu jest osiągalny. Bliskość Minecrafta nadal zależy od dodatku lub wtyczki łączącej się z pasującym transportem.

## Typowe problemy przy pierwszym uruchomieniu

- Brak wejścia mikrofonowego:
  sprawdź uprawnienia mikrofonu systemu operacyjnego i wybrane urządzenie wejściowe.
- Klient łączy się, ale nie ma bliskości:
  sprawdź transport Minecraft, przepływ powiązań i `Positioning Type`.
- Serwer zdalny nie łączy się:
  sprawdź, czy port UDP między odtwarzaczem a `VoiceCraft.Server` jest otwarty.
- Gracz słyszy wszystkich w niewłaściwej odległości:
  sprawdzaj aktualizacje pozycji jednostek i identyfikatory światów.

## Zrzuty ekranu

![General Settings](/images/voicecraft/settings-general.png)
![Voice Settings](/images/voicecraft/settings-voice.png)
