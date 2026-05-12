# Veelgestelde vragen

Veelgestelde vragen over VoiceCraft.

## Heeft elke speler de VoiceCraft-client-app nodig?

Ja. Spelers hebben de clientapplicatie nodig. De server zelf gebruikt de client-app niet.

## Werkt VoiceCraft op mobiel?

Ja. Android en iOS worden ondersteund.

## Werkt VoiceCraft op console?

Niet rechtstreeks op consolehardware als een native VoiceCraft-client vandaag.

Consolespelers kunnen nog steeds deelnemen aan sommige serverscenario's als de rest van de stapel correct is geconfigureerd, maar directe native clientondersteuning is niet hetzelfde als desktop of mobiel.

## Werkt VoiceCraft op Realms?

Het kan in beperkte scenario's werken, vooral wanneer positionering aan de clientzijde wordt gebruikt, maar Realms is een beperktere omgeving dan een speciale server.

## Welk vervoer moet ik gebruiken?

- Bedrock speciale server:
  `McHttp`
- lokale Bedrock-wereld:
  `McWss`
- Java + Geyser / Floodgate:
  `McTcp` through `GeyserVoice`

## Heeft GeyserVoice een afzonderlijk beheerde VoiceCraft-server nodig?

Niet altijd.

In de directe Paper-modus kan GeyserVoice de VoiceCraft-runtime opstarten en uitvoeren op de achtergrond met behulp van:

- `config.voicecraft.auto-start`
- `shutdown-on-disable`
- `ready-timeout-ms`
- `install-directory`

Als u wilt, kan het ook verwijzen naar een reeds actieve externe VoiceCraft-server.

## Kan ik VoiceCraft gebruiken met hostingproviders zoals Apex, Aternos of iets dergelijks?

Het hangt ervan af of uw provider het vereiste netwerkpad tussen de spelserver en de VoiceCraft-server toestaat.

Voorbeelden:

- BDS with `McHttp` needs outbound reachability to the VoiceCraft HTTP endpoint
- Java + GeyserVoice needs reachability to the VoiceCraft `McTcp` endpoint

Sommige providers blokkeren precies het netwerkgedrag dat u nodig heeft.

## Kan ik VoiceCraft hosten op dezelfde machine als de spelserver?

Ja. Dat is gebruikelijk voor:

- lokale testen
- kleine gemeenschappen
- directe Paper + GeyserVoice-instellingen

## Kan ik slechts één transport uitvoeren?

Ja. U kunt runtime-transporten beperken met:

- config toggles in `ServerProperties.json`
- runtime overrides such as `--transport-mode`

## Waarom hoor ik niemand, ook al maakt de client verbinding?

Controleer deze op volgorde:

1. correcte VoiceCraft-server-IP en poort in de client
2. matching `PositioningType`
3. correct Minecraft-transporttoken
4. succesvolle bindstroom
5. entiteiten die positie- en wereldupdates ontvangen

## Is `McWss` good for production?

Meestal niet de eerste keuze voor grotere openbare omgevingen.

It is best for local worlds, testing, and lightweight setups. `McHttp` is usually a better Bedrock production transport.

## Wat is het verschil tussen servermute en lokale mute?

- server dempen:
  afgedwongen door de backend voor de doelentiteit of -client
- lokaal dempen:
  stored in a player's `Settings.json` as a personal preference

## Waar worden het volume per gebruiker en lokale mute opgeslagen?

In `Settings.json` under `UserSettings.Users`.

## Ik voer Java uit met Geyser. Heb ik de Bedrock-add-on ook nodig?

No. In Java + Geyser topologies, the bridge is typically `GeyserVoice`, not the Bedrock addon.
