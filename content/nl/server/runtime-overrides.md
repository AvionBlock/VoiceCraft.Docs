# Runtime-overschrijvingen

De VoiceCraft-server ondersteunt runtime-overschrijvingen via root-CLI-opties.

Deze opties zijn ideaal wanneer:

- u wilt omgevingsspecifieke waarden zonder JSON te bewerken
- een procesmanager injecteert waarden bij het opstarten
- `GeyserVoice` launches the VoiceCraft runtime automatically
- je test verschillende transporttopologieën vanuit dezelfde installatiemap

## Ondersteunde opties

- `--exit-on-invalid-properties` / `-eip`
- `--language <culture>` / `-l`
- `--transport-mode <mode>` / `-tm`
- `--transport-host <host>` / `-th`
- `--transport-port <port>` / `-tp`
- `--server-key <token>` / `-sk`

## Wat elke optie verandert

### `--language`

Overrides `VoiceCraftConfig.Language` for the current process.

Voorbeeld:

```bash
./VoiceCraft.Server --language ru-RU
```

### `--transport-mode`

Schakelt alleen geselecteerde Minecraft-transporten in voor de huidige run.

Geaccepteerde waarden:

- `http`
- `tcp`
- `wss`
- aliases such as `ws`, `websocket`, `websockets`
- aliases such as `local-socket`, `tcp-socket` normalize to `tcp`

Voorbeelden:

```bash
./VoiceCraft.Server --transport-mode http
./VoiceCraft.Server --transport-mode tcp
./VoiceCraft.Server --transport-mode http,tcp
```

Indien ingesteld, schakelt VoiceCraft eerst alle Minecraft-transporten uit en schakelt vervolgens alleen de geselecteerde transporten opnieuw in.

### `--transport-host`

Overschrijft de Minecraft-transporthost:

- `McHttpConfig.Hostname`
- `McWssConfig.Hostname`
- `McTcpConfig.Hostname`

Voorbeeld:

```bash
./VoiceCraft.Server --transport-host 0.0.0.0
```

### `--transport-port`

Overschrijft de Minecraft-transportpoort:

- URI port in `McHttpConfig.Hostname`
- URI port in `McWssConfig.Hostname`
- `McTcpConfig.Port`

Voorbeeld:

```bash
./VoiceCraft.Server --transport-port 9055
```

### `--server-key`

Overschrijft het gedeelde login-token dat wordt gebruikt door:

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

Voorbeeld:

```bash
./VoiceCraft.Server --server-key "prod-secret-token"
```

## Goede implementatievoorbeelden

### Toegewijde BDS-host

```bash
./VoiceCraft.Server --transport-mode http --transport-host 0.0.0.0 --transport-port 9050
```

### Java-bridgehost

```bash
./VoiceCraft.Server --transport-mode tcp --transport-host 0.0.0.0 --transport-port 9050
```

### Lokale singleplayer-testen

```bash
./VoiceCraft.Server --transport-mode wss --transport-host 127.0.0.1 --transport-port 9051
```

## Belangrijk gedrag

- Runtime-overschrijvingen zijn proceslokaal
- they do not permanently rewrite `ServerProperties.json`
- ze zijn uitstekend geschikt voor testen en automatiseren
- ze verminderen de behoefte aan meerdere configuratiekopieën
