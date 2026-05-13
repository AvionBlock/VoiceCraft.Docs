# VoiceCraft.Addon (dodatek Bedrock)

Repozytorium: [AvionBlock/VoiceCraft.Addon](https://github.com/AvionBlock/VoiceCraft.Addon)

To repozytorium zawiera praktyczne pakiety dodatków Bedrock i powierzchnię McApi po stronie skryptu dla niestandardowej logiki świata.

Użyj go, gdy Minecraft Bedrock jest źródłem stanu gracza/bytu. Dodatek łączy światy Bedrock z serwerem VoiceCraft poprzez `McHttp` lub `McWss`, a następnie udostępnia przepływ powiązań, interfejs użytkownika, zdarzenia i pomocniki pakietów dla skryptów świata.

Szybkie linki:

- [Download Page](/download)
- [Addon Configurator](/addon-configurator)
- [Addon Releases](https://github.com/AvionBlock/VoiceCraft.Addon/releases/latest)

## Pakiety

| Pakiet | Cel | Użyj kiedy |
|---------|---------|----------|
| `Basic` | gotowy do użycia przepływ powiązań, interfejs ustawień, wskaźniki głosowe w grze, typowe zdarzenia skryptowe | chcesz działającego odniesienia lub domyślnego zachowania Bedrock |
| `Core.McHttp` | Pakiet transportowy HTTP | uruchamiasz serwer dedykowany Bedrock |
| `Core.McWss` | pakiet transportowy websocket / tunel poleceń | uruchamiasz lokalny świat Bedrock lub konfigurację testową |

Większość prawdziwych konfiguracji Bedrock łączy pakiet transportowy z elementami zachowania/interfejsu potrzebnymi na świecie.

## Wyrównanie wersji

VoiceCraft `v1.6.1` wymaga aktualizacji pakietów dodatków wraz z wersją klient/serwer. To wydanie zawiera ikony głosowe w grze, jakość automatycznego połączenia, transmitowane wydarzenia i poprawki rozłączania McHttp/McWss, które zależą od pasujących pakietów po stronie dodatków.

Nie aktualizuj serwera/klienta i nie zostawiaj starego pakietu dodatków na świecie. Niedopasowane pakiety mogą się łączyć, ale później kończy się to niepowodzeniem podczas wiązania, zdarzenia lub ikony.

## Przestrzeń nazw

W ramach pakietów:

- `VoiceCraft.Namespace = "voicecraft"`

## Polecenia

### Podstawowe

- `voicecraft:vcbind <binding_key>`
  pozwolenie: `Any`
- `voicecraft:vcsettings`
  pozwolenie: `GameDirectors`

### Core.McHttp

- `voicecraft:vcconnect <hostname> <token>`
  pozwolenie: `GameDirectors`

### Rdzeń.McWss

- `voicecraft:vcconnect <token>`
  pozwolenie: `Host`
- `voicecraft:data_tunnel [max_string_length] [data]`
  pozwolenie: `Host`

## Co daje Ci pakiet Basic

- wiązanie/rozłączanie przepływu
- Interfejs ustawień odtwarzacza
- efekt przełącza
- zdarzenia skryptowe dla automatyzacji
- wskaźniki w grze używane przez obsługiwane wydania

Zacznij od `Basic`, jeśli chcesz zrozumieć oczekiwane wrażenia gracza przed napisaniem niestandardowej logiki dodatków.

## Szczegóły przepływu powiązania

Z aktualnej realizacji:

1. nowy podmiot sieciowy otrzymuje losowy 5-znakowy klucz powiązania
2. opis elementu jest aktualizowany za pomocą monitu o klucz
3. gracz biegnie `voicecraft:vcbind <key>`
4. jednostka wiąże się z graczem
5. na urlopie następuje rozłączenie i generowany jest nowy klucz

Wydarzenia skryptowe:

- `voicecraft:onPlayerBind`
- `voicecraft:onPlayerUnbind`

VoiceCraft `v1.6.1` emituje także więcej zdarzeń związanych z cyklem życia i pakietami po stronie dodatku, dzięki czemu niestandardowe światy mogą reagować bez bezpośredniego odpytywania warstwy transportowej.

Klucz wiążący jest celowo krótki, ponieważ jest wpisywany w grze. Traktuj go jako tymczasowy token łącza, a nie długoterminową tajemnicę.

## Interfejs efektów

`voicecraft:vcsettings` obecnie udostępnia:

- Widoczność
- Bliskość
- Kierunkowy
- Echo bliskości
- Echo
- Mufa zbliżeniowa
- Mufla

Efekty są przesyłane poprzez `McApiSetEffectRequestPacket`.

## Co możesz dostosować

- wiązanie/rozłączanie polityki
- ograniczenia oparte na rolach lub tagach
- zasady światowej identyfikacji
- zachowanie aktualizacji pozycji/rotacji
- formularze personelu za pośrednictwem `@minecraft/server-ui`
- obsługi pakietów na powierzchni McApi

Dostosuj dopiero po uruchomieniu podstawowej konfiguracji zapasów. Daje to znany dobry punkt odniesienia dla zachowań związanych z transportem, wiązaniem i pozycją.

## Aktualne ograniczenia

- `Core.McWss` stabilność zależy od limitów poleceń i ładunku
- ograniczenia hosta/dostawcy mogą blokować ścieżkę sieciową wymaganą przez `Core.McHttp`
- niestandardowe procedury obsługi pakietów wymagają przetestowania na docelowej wersji Bedrock

## Zalecana konfiguracja: BDS

1. włącz `McHttpConfig.Enabled = true`
2. upewnij się, że BDS może dotrzeć do `McHttpConfig.Hostname`
3. skopiuj pakiet `Core.McHttp`
4. uruchom `voicecraft:vcconnect <hostname> <token>`
5. zatwierdź powiązanie za pomocą `voicecraft:vcbind <key>`

## Zalecana konfiguracja: świat lokalny

1. włącz `McWss`
2. zainstaluj `Core.McWss`
3. uruchom `/connect`
4. uruchom `voicecraft:vcconnect <token>`
5. zachowaj zgodność `voicecraft:data_tunnel` z konfiguracją serwera

## Lista kontrolna walidacji

- zainstalowany jest właściwy pakiet transportowy
- zarówno zachowania, jak i pakiety zasobów są aktywne
- `vcconnect` używa tokena z odpowiedniej sekcji konfiguracji serwera
- gracz może powiązać z `voicecraft:vcbind <key>`
- ruch gracza zmienia dane o pozycji w VoiceCraft
- Interfejs efektów otwiera się dla autoryzowanych użytkowników

## Przeczytaj dalej

- [Addon API](/ecosystem/addon-api)
- [McHttp for BDS](/minecraft/mchttp-bds)
- [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer)
