# GeyserVoice Proxy-gids

Gebruik deze modus wanneer u Velocity of BungeeCord uitvoert met een of meer backend Paper-servers.

De proxymodus houdt één centrale VoiceCraft-verbinding op de proxy, terwijl backend Paper-servers momentopnamen van spelers streamen via plug-inberichten.

Doelvorm:

```text
Backend Paper + GeyserVoice -> proxy relay -> Velocity/Bungee + GeyserVoice -> McTcp -> VoiceCraft.Server
VoiceCraft.Client -> VoiceCraft UDP endpoint
```

## Hoe de proxymodus werkt

- backend Paper-servers sturen momentopnamen van spelers naar de proxy
- de proxy is eigenaar van de `McTcp`-verbinding aan VoiceCraft-zijde
- wereld-ID's en dimensies kunnen een naamruimte krijgen met de backend-identiteit

Hierdoor is één centrale spraakbrug voor een multiservernetwerk mogelijk.

## Implementatiepatroon

Installeer GeyserVoice:

- op de proxy
- op elke backend Paper-server

## Kernregel

De proxy is de bron van waarheid voor de VoiceCraft-verbinding.

Backend Paper-servers moeten worden behandeld als producenten van snapshots, niet als de belangrijkste bridge-eigenaar.

## Backend Paper-configuratie

Op backend Paper-servers:

- schakel de proxymodus in voor het knooppunt Paper-zijde
- behandel de backend-host/poort/sleutel niet als de bron van de waarheid

Voorbeeld van een Paper-backend:

```yml
config:
  proxy:
    enabled: true
```

De backend moet nog steeds GeyserVoice hebben geïnstalleerd, zodat het spelers kan observeren en snapshots kan verzenden, maar het zou niet de eigenaar moeten zijn van de hoofdverbinding van VoiceCraft.

## Proxy-configuratie

Op de proxy:

- stel de echte `config.voicecraft.transport.host` in
- stel de echte `config.voicecraft.transport.port` in
- stel de echte `config.voicecraft.transport.login-token` in

Snelheid/Bungee voorbeeld:

```yml
config:
  voicecraft:
    transport:
      host: "127.0.0.1"
      port: 9050
      login-token: "replace-with-token"
    voice:
      port: 1111
```

Het token moet overeenkomen met `McTcpConfig.LoginToken` op `VoiceCraft.Server`.

## Installatiestroom

1. Installeer de plug-in op proxy- en backend-knooppunten.
2. Start alles één keer om configuraties te genereren.
3. Configureer de proxy met de echte VoiceCraft-verbinding.
4. Configureer backend-knooppunten voor proxy-relay-gedrag.
5. Plug-in opnieuw laden.
6. Valideer beweging tussen servers en bind de stroom.

Begin eerst met één backend-server. Nadat binding- en positie-updates daar werken, voegt u meer backend-knooppunten toe.

## Validatiechecklist

- speler sluit zich aan bij de backend
- backend verzendt snapshots correct
- proxy blijft verbonden met VoiceCraft
- Bij het wisselen van backend-servers blijft de verwachte stemidentiteit behouden
- VoiceCraft-serverlogboeken tonen één `McTcp`-gebruiker die eigendom is van een proxy
- backend-wereld-ID's/afmetingen zijn stabiel na serverwisselingen

## Mislukkingspatronen

- backend probeert eigenaar te worden van de hoofdverbinding
- proxytoken verschilt van VoiceCraft `McTcpConfig.LoginToken`
- proxy kan Paper bereiken, maar VoiceCraft niet
- backend-topologie verbergt of herschrijft plug-inberichten
- plug-in is geïnstalleerd op de proxy, maar ontbreekt in één backend
- backend `config.proxy.enabled` is false in een proxy-relay-implementatie

## Operationele opmerkingen

- Houd VoiceCraft indien mogelijk dicht bij de proxy om de bridge-latentie te verminderen.
- Start de backend-knooppunten opnieuw of laad deze opnieuw nadat u de proxy-relay-configuratie hebt gewijzigd.
- Bewaar tokens in de proxyconfiguratie en niet terloops in elke backend.
- Valideer de bindingsstroom opnieuw nadat u een nieuwe back-endserver hebt toegevoegd.
