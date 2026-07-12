# ServerProperties.json

Główny plik konfiguracji: `config/ServerProperties.json`.

VoiceCraft `1.7.0` zachowuje znane sekcje transportów, ale dodaje NAT port mapping i używa entity properties do dostrajania efektów.

## Workflow

1. Zatrzymaj serwer.
2. Zbackupuj `ServerProperties.json`.
3. Edytuj i sprawdź JSON.
4. Uruchom serwer.
5. Sprawdź logi config/listener/NAT/auth.

## Nowe pola

W `VoiceCraftConfig`, `McHttpConfig`, `McTcpConfig`, `McWssConfig`:

- `AutoOpenPort`
- `ExternalPort`
- `PortMappingLifetimeMinutes`
- `PortMappingTimeoutSeconds`

`AutoOpenPort` próbuje utworzyć tymczasowe mapowanie routera przez `OpenPort.Net`.

## VoiceCraftConfig

- `Port`: port UDP dla klientów.
- `ExternalPort`: port zewnętrzny dla mappingu, `0` używa `Port`.
- `PositioningType`: `0 = Server`, `1 = Client`.
- `EnableVisibilityDisplay`: wysyła wskaźniki widoczności.
- `AutoOpenPort`: automatycznie otwiera port UDP.

## McHttpConfig

Dla Bedrock Dedicated Server:

```json
{
  "Enabled": true,
  "LoginToken": "replace-with-token",
  "Hostname": "http://0.0.0.0:9050/",
  "AutoOpenPort": false
}
```

`127.0.0.1` używaj tylko, gdy BDS i VoiceCraft są na tym samym hoście.

## McTcpConfig

Dla Java bridges, np. `VoiceCraft.Java`.

- `Hostname` to host, nie URI.
- `Port` jest osobnym polem.
- Lokalnie binduj do `127.0.0.1`.

## McWssConfig

Dla lokalnych światów Bedrock i command tunnel.

Ważne: `DataTunnelCommand`, `CommandsPerTick`, `MaxByteLengthPerCommand`.

## DefaultAudioEffectsConfig

Domyślne bitmaski:

- `1`: `Visibility`
- `2`: `Proximity`
- `4`: `ProximityEcho`
- `8`: `ProximityMuffle`

W `1.7.0` efekty tworzą procesory per entity i mogą czytać obsługiwane entity properties. To zastępuje stare cave/muffle factor customization.

## Notatki

- zawsze zmień `LoginToken`
- `0.0.0.0` wystawia listener
- `PositioningType` musi pasować do klienta
- zachowaj działający config przed upgrade
