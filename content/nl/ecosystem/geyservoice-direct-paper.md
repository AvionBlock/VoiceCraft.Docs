# GeyserVoice Direct Paper-gids

Gebruik deze modus wanneer een Paper/Folia-server rechtstreeks met VoiceCraft moet praten.

De Direct Paper-modus is de eenvoudigste Java-topologie: de Paper-server maakt verbinding met een externe `VoiceCraft.Server` of laat GeyserVoice een lokale VoiceCraft-runtime downloaden en starten.

Doelvorm:

```text
Paper/Folia + GeyserVoice -> McTcp/McApi TCP -> VoiceCraft.Server
VoiceCraft.Client -> VoiceCraft UDP endpoint
```

## Twee manieren om het uit te voeren

### Optie A: externe VoiceCraft-server

Je hebt `VoiceCraft.Server` al ergens uitgevoerd en GeyserVoice erop gericht.

### Optie B: door plug-ins beheerde runtime

GeyserVoice kan VoiceCraft voor u opstarten:

- runtime downloaden
- runtime installeren
- looptijd starten
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
    transport:
      host: "127.0.0.1"
      port: 9050
      login-token: "replace-with-token"
    voice:
      port: 1111
    auto-start: true
    shutdown-on-disable: true
    invariant-globalization: true
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

Gebruik `config.voicecraft.transport.host`, `config.voicecraft.transport.port` en `config.voicecraft.transport.login-token` voor de VoiceCraft `McTcp`-verbinding. Deze moeten overeenkomen met de VoiceCraft-serverkant als u een externe runtime gebruikt.

## Installatiestappen

1. Installeer GeyserVoice op Paper.
2. Start de server een keer.
3. Bewerk `plugins/GeyserVoice/config.yml`.
4. Bepaal of `auto-start` moet worden ingeschakeld.
5. Zorg ervoor dat `config.voicecraft.transport.login-token` overeenkomt met VoiceCraft `McTcpConfig.LoginToken`.
6. Voer `/voice reload` uit.
7. Test de bindingsstroom in het spel.

Als `auto-start` `true` is, zorg er dan voor dat `install-directory` beschrijfbaar is via het Paper-proces. Als `auto-start` `false` is, zorg er dan voor dat de externe VoiceCraft-server al actief en bereikbaar is.

## Wanneer `auto-start` een goed idee is

- installatie met één server
- je wilt minder bewegende stukken
- u beheert VoiceCraft nog niet met systemd / Docker / panel

## Wanneer een externe runtime beter is

- u beheert VoiceCraft al centraal
- u wilt een ander herstartbeleid of logboekregistratie
- u voert meerdere Java-nodes uit tegen één VoiceCraft-backend
- u wilt dat een procesbeheerder zoals systemd, Docker of een hostingpaneel de herstart beheert

## Problemen oplossen

- runtime wordt nooit klaar:
  verhoging `ready-timeout-ms`
- plug-in kan handmatig verbinding maken, maar niet bij het opstarten:
  controleer `auto-start` en `install-directory`
- spelers doen mee, maar spraakgegevens zijn niet bindend:
  verifieer de token-, host-, poort- en bindstroom
- externe VoiceCraft ziet de plug-in nooit:
  bevestig `McTcpConfig.Enabled = true`, hostbinding, firewall en `config.voicecraft.transport.*`
- client maakt verbinding, maar de Java-status heeft geen invloed op de nabijheid:
  controleer `/voice bind`, het positie-update-interval en de positioneringsmodus aan de serverzijde

## Validatiechecklist

- Uit Paper-logs blijkt dat GeyserVoice is ingeschakeld
- VoiceCraft-runtime is actief of wordt automatisch gestart
- `McTcpConfig.LoginToken` komt overeen met `config.voicecraft.transport.login-token`
- speler kan verbinding maken met de VoiceCraft-client
- speler kan `/voice bind <key>` voltooien
- bewegen in het spel verandert het nabijheidsgedrag
