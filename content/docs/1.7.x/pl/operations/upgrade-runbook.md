# Procedura aktualizacji

Użyj tego przy aktualizacji VoiceCraft albo bridge, np. `VoiceCraft.Java`.

VoiceCraft `1.7.0` zmienia model eventów i entity properties, więc trzeba sprawdzić cały stack: server, client, Bedrock addon i Java plugin.

## Kolejność

1. Zbackupuj config oraz pliki plugin/addon.
2. Przygotuj nowe binaries w osobnym katalogu.
3. Przygotuj pasujące pakiety addon/plugin.
4. Przeczytaj release notes o packets, properties i transports.
5. Zatrzymaj stary service.
6. Przenieś config do nowej instalacji.
7. Sprawdź nowe pola port mapping w `ServerProperties.json`.
8. Zaktualizuj addon/plugin po stronie Minecraft.
9. Testuj każdą ścieżkę osobno.

## Co sprawdzić w 1.7

- server pokazuje `1.7.0`
- VoiceCraft UDP endpoint binduje
- McHttp, McTcp albo McWss bindują
- NAT port mapping jest świadomie włączony albo wyłączony
- klient `1.7.x` łączy się
- Minecraft integration przechodzi auth
- bind flow działa
- position, rotation, world ID, mute/deafen i bitmasks aktualizują się
- entity properties działają przy effect overrides

## Event/property migration

Event wrappers:

- `VcEventRequestPacket`
- `McApiEventRequestPacket`

Property packets:

- `VcSetPropertyRequestPacket`
- `VcOnEntityPropertyUpdatedPacket`
- `McApiSetEntityPropertyRequestPacket`
- `McApiOnEntityPropertyUpdatedPacket`

Obsługiwane wartości: `null`, `bool`, typy całkowite, `float`, `double`.

Stara ścieżka cave/muffle factor została usunięta. Używaj properties dla wartości efektów.

## NAT port mapping

`AutoOpenPort` jest dla VoiceCraft UDP i transportów Minecraft. Używaj tylko w sieciach domowych/LAN z UPnP albo NAT-PMP. Dla VPS, Docker, paneli, tuneli i loopback integrations zostaw wyłączone.

## Rollback

1. Zatrzymaj nowy service.
2. Przywróć poprzedni katalog binaries.
3. Przywróć poprzednie configi.
4. Przywróć poprzedni addon/plugin.
5. Uruchom starą wersję.
6. Sprawdź client, auth, bind i proximity.
