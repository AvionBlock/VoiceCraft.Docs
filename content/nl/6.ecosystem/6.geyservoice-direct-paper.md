# GeyserVoice Direct Paper-gids

Gebruik deze modus wanneer een Paper/Folia-server rechtstreeks met VoiceCraft moet praten.

## Twee manieren om het uit te voeren

### Optie A: externe VoiceCraft-server

You already run `VoiceCraft.Server` somewhere and point GeyserVoice at it.

### Optie B: door plug-ins beheerde runtime

GeyserVoice kan VoiceCraft voor u opstarten:

- runtime downloaden
- runtime installeren
- start looptijd
- wacht op gereedheid
- stop optioneel de runtime met de plug-in

Dit is een van de belangrijkste huidige functies voor directe Paper-gebruikers.

## Aanbevolen configuratie

```yml
config:
  debug: false
  lang: "system"
  auto-reconnect: true

  proxy:
    enabled: false

  voicecraft:
    host: "127.0.0.1"
    port: 9050
    login-token: "replace-with-token"
    auto-start: true
    shutdown-on-disable: true
    ready-timeout-ms: 20000
    install-directory: "voicecraft-runtime"

  voice:
    proximity-distance: 30
    proximity-toggle: true
    voice-effects: true
    send-bind-message: true
    send-disconnect-message: true
    send-voicecraft-disconnect-message: true
    send-connection-lost-message: true
    position-update-interval-ticks: 5
```

## Installatiestappen

1. Installeer GeyserVoice op Paper.
2. Start de server één keer.
3. Edit `plugins/GeyserVoice/config.yml`.
4. Decide whether `auto-start` should be enabled.
5. Ensure the `login-token` matches VoiceCraft `McTcpConfig.LoginToken`.
6. Run `/voice reload`.
7. Test de bindingsstroom in het spel.

## When `auto-start` is a good idea

- installatie met één server
- je wilt minder bewegende stukken
- u beheert VoiceCraft nog niet met systemd / Docker / panel

## Wanneer een externe runtime beter is

- u beheert VoiceCraft al centraal
- u een ander herstartbeleid of logboekregistratie wilt
- u voert meerdere Java-nodes uit tegen één VoiceCraft-backend

## Problemen oplossen

- runtime wordt nooit gereed:
  increase `ready-timeout-ms`
- plug-in kan handmatig verbinding maken, maar niet bij het opstarten:
  check `auto-start` and `install-directory`
- spelers doen mee, maar spraakgegevens zijn niet bindend:
  verifieer de token-, host-, poort- en bindstroom
