# Aktualizacja i kopia zapasowa

Użyj tej strony przy zwykłych aktualizacjach, gdy topologia pozostaje taka sama. Przy większych zmianach użyj [procedury aktualizacji](/operations/upgrade-runbook).

VoiceCraft `1.7.0` nie jest tylko poprawką. Serwer, klienci, pakiety dodatku i mosty Java powinny być aktualizowane razem do `1.7.x`.

## Co zmieniło się w 1.7.0

- przebudowany pipeline efektów audio z procesorami dla encji
- własne entity properties dla override'ów efektów
- event flow przez `EventRequest`
- `SetProperty` / `OnEntityPropertyUpdated` zamiast starej ścieżki cave/muffle factor
- NAT port mapping przez `OpenPort.Net`
- poprawki iOS sample-rate oraz Apple privacy manifest
- aktualizacje zależności, Android version `17`, release pipeline
- usunięcie browser/web client

Klient i serwer powinny mieć zgodny `Major.Minor`. Używaj klientów `1.7.x` z serwerami `1.7.x`.

## Co zbackupować

- `config/ServerProperties.json`
- własne skrypty startowe, systemd, kontenery lub panel
- logi, jeśli są potrzebne
- konfigurację VoiceCraft.Java albo innego Java bridge
- konfigurację Bedrock world packs
- notatki o hostach, portach, firewallu i przekierowaniu portów

## Bezpieczna aktualizacja serwera

1. Zatrzymaj `VoiceCraft.Server`.
2. Zrób kopię `config/`.
3. Rozpakuj `1.7.0` do nowego katalogu.
4. Skopiuj `ServerProperties.json`.
5. Sprawdź nowe pola NAT port mapping.
6. Uruchom serwer i sprawdź logi.
7. Przetestuj każdy włączony transport.
8. Podłącz jednego klienta i jedną integrację Minecraft.

## Migracja konfiguracji

`1.7.0` dodaje:

- `AutoOpenPort`
- `ExternalPort`
- `PortMappingLifetimeMinutes`
- `PortMappingTimeoutSeconds`

`AutoOpenPort` domyślnie jest `false`. Zostaw wyłączone, jeśli porty są zarządzane przez firewall, reverse proxy, tunnel, Docker, panel hosting albo dostawcę.

## Dodatki i bridge

Aktualizuj pasujące pakiety dodatku/bridge razem z serwerem. Kod korzystający ze starych cave/muffle packets powinien przejść na `SetProperty` i `OnEntityPropertyUpdated`.

## Klient

Ustawienia klienta zwykle zostają w `ApplicationData/voicecraft`.

Sprawdź:

- mikrofon i wyjście audio
- zapisany serwer
- push-to-talk
- `Positioning Type`
- iOS capture, jeśli wcześniej były problemy z sample-rate

Browser/web client usunięto w `1.7.0`. Używaj natywnych klientów.
