# GeyserVoice (Java / Java/Geyser Bridge)

Opslagplaats: [AvionBlock/GeyserVoice](https://github.com/AvionBlock/GeyserVoice)

`GeyserVoice` verbindt de Java-infrastructuur met `VoiceCraft.Server` via het `McTcp`-transport.

In het GeyserVoice-project wordt dit pad ook beschreven als `McApi TCP`. In de VoiceCraft-serverconfiguratie komt dit overeen met `McTcpConfig`.

Het ondersteunt:

- directe Paper / Folia-implementatie
- Implementatie van snelheidsproxy
- BungeeCord-proxy-implementatie
- gemengde proxy + backend-topologieën

## Wat GeyserVoice doet

`GeyserVoice` overbrugt de spelerstatus van Java-servers naar VoiceCraft:

- levenscyclus van de speler
- positie / wereldsnapshots
- stroom binden
- proxy relaying voor netwerken met meerdere servers

Het is niet zomaar een eenvoudige pakketforwarder. In de directe Paper-modus kan het ook een lokale VoiceCraft-runtime beheren.

## Heel belangrijk: GeyserVoice kan VoiceCraft onder de motorkap draaien

Bij directe Paper-installaties kan de plug-in automatisch:

- download de VoiceCraft-runtime
- installeer het in een geconfigureerde map
- het proces starten
- wacht tot het klaar is
- stop het eventueel als de plug-in wordt uitgeschakeld

Dit gedrag wordt bestuurd via het blok `config.voicecraft.*`.

Dat maakt GeyserVoice geschikt voor zowel:

- met behulp van een reeds beheerde externe `VoiceCraft.Server`
- laat de plug-in opstarten en VoiceCraft voor u uitvoeren

Als GeyserVoice de runtime beheert, maakt deze nog steeds verbinding via hetzelfde `McTcp`/`McApi TCP` pad. Het verschil is wie het VoiceCraft-proces start.

## Ondersteunde plug-inplatforms

Van huidige broncode:

- Paper / Folia
- Snelheid
- Bungeekoord

## Runtime-paden

Huidige ondersteunde paden:

- `Paper -> McTcp -> VoiceCraft`
- `Paper -> Proxy relay -> McTcp -> VoiceCraft`

## `config.yml`-indeling

Huidige Paper-configuratiestructuur:

### `config.debug`

Schakel de foutopsporingsmodus voor plug-ins in.

### `config.lang`

Plugintaal, bijvoorbeeld `system`.

### `config.auto-reconnect`

Of de plug-in automatisch opnieuw verbinding moet maken.

### `config.proxy.enabled`

Of het huidige knooppunt aan de Paper-zijde achter een door een proxy beheerd relais werkt.

### `config.voicecraft.*`

Verbindings- en runtimebeheerblok.

Huidige geneste vorm:

```yml
config:
  voicecraft:
    transport:
      host: "127.0.0.1"
      port: 9050
      login-token: "__GENERATED_LOGIN_TOKEN__"
    voice:
      port: 1111
    auto-start: true
    shutdown-on-disable: true
    invariant-globalization: true
    ready-timeout-ms: 20000
    install-directory: "voicecraft-runtime"
```

- `transport.host`
- `transport.port`
- `transport.login-token`
- `voice.port`
- `auto-start`
- `shutdown-on-disable`
- `invariant-globalization`
- `ready-timeout-ms`
- `install-directory`

Betekenis:

- `transport.host` / `transport.port` / `transport.login-token`
  doel `VoiceCraft.Server` / `McTcp`
- `voice.port`
  VoiceCraft runtime-stempoort gebruikt door het beheerde runtime-pad
- `auto-start`
  laat de plug-in de VoiceCraft-runtime automatisch starten
- `shutdown-on-disable`
  stop de beheerde runtime wanneer de plug-in wordt verwijderd
- `invariant-globalization`
  runtime-globaliseringsoptie, handig voor het starten van beheerde servers
- `ready-timeout-ms`
  hoe lang de plug-in wacht totdat de runtime gereed is
- `install-directory`
  waar de beheerde runtime is geïnstalleerd

Op Velocity en BungeeCord behoudt de configuratie de vorm `config.voicecraft.transport.*` en `config.voicecraft.voice.*`, maar maakt geen gebruik van de door Paper-only beheerde runtime-velden.

### `config.voice.*`

Spelergericht gedrag:

- `proximity-distance`
- `proximity-toggle`
- `voice-effects`
- `not-in-voice-symbol`
- `in-voice-symbol`
- `send-bind-message`
- `send-disconnect-message`
- `send-voicecraft-disconnect-message`
- `send-connection-lost-message`
- `position-update-interval-ticks`

### `config.players`

Opgeslagen autobind/cachegegevens aan spelerzijde.

### `config.player-links`

Extra link-/cachestructuur gebruikt door de plug-in.

## Commando's

Van `BaseVoiceCommand`:

- `connect <host> <port> <key>`
- `reconnect [true|false]`
- `disconnect`
- `settings`
- `bind <key>`
- `bindfake <key> <name>`
- `updatefake <key>`
- `clearautobind`
- `reload`

## Machtigingen

Typische rechten:

- `voice.cmd`
- `voice.connect`
- `voice.reconnect`
- `voice.disconnect`
- `voice.settings`
- `voice.bind`
- `voice.bindfake`
- `voice.reload`

## Direct Paper-modus

Beste wanneer:

- u gebruikt één Paper-server
- u de eenvoudigste installatie aan de Java-kant wilt
- u wilt dat GeyserVoice de VoiceCraft-runtime voor u beheert

Zie [Direct Paper Guide](/ecosystem/geyservoice-direct-paper).

## Proxy-modus

Beste wanneer:

- je gebruikt Velocity of BungeeCord
- je hebt verschillende backend Paper-servers
- u wilt één centrale VoiceCraft-verbinding op de proxy

Zie [Proxy Guide](/ecosystem/geyservoice-proxy).

In de proxymodus mogen backend Paper-servers niet worden behandeld als de centrale eigenaar van de VoiceCraft-verbinding. De proxy is eigenaar van de `McTcp`-verbinding en backend-knooppunten bieden momentopnamen van spelers.

## Technische opmerkingen

- plug-in berichtenkanaal: `geyservoice:main`
- in de proxymodus kunnen wereld-ID's een naamruimte krijgen met de backend-identiteit
- de plug-in gebruikt momenteel `McTcp` als de VoiceCraft-gerichte brug

## Huidige codebeperkingen

- `updatefake` is nog steeds een tijdelijke aanduiding
- `settings` bestaat maar heeft momenteel minimale praktische logica

## Controlelijst voor productie

1. Bepaal of Paper de VoiceCraft-runtime zelf moet beheren.
2. Zo ja, configureer dan `auto-start`, `install-directory` en `ready-timeout-ms`.
3. Zo nee, wijs `config.voicecraft.transport.host`, `config.voicecraft.transport.port` en `config.voicecraft.transport.login-token` naar een externe VoiceCraft-server.
4. Beperk opdrachten die alleen voor het personeel beschikbaar zijn.
5. Test de bindingsstroom en positie-updates voordat u deze opent voor spelers.
6. Bevestig `McTcpConfig.Enabled = true` aan de VoiceCraft-kant.
7. Bevestig dat het token overeenkomt met `McTcpConfig.LoginToken`.
