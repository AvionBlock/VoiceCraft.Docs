# Problemen oplossen

Begin met het identificeren van welk deel van de stapel faalt. VoiceCraft heeft afzonderlijke client-, server- en Minecraft-transportpaden, zodat het ene onderdeel kan werken terwijl het andere nog steeds kapot is.

Aanbevolen bestelling:

1. Bevestig dat `VoiceCraft.Server` netjes start.
2. Controleer of een VoiceCraft-client verbinding kan maken met het UDP-eindpunt.
3. Bevestig de authenticatie van het transport aan de Minecraft-zijde.
4. Bevestig dat de bindingsstroom is voltooid.
5. Bevestig dat positie-/wereldupdates het nabijheidsgedrag veranderen.
6. Pas dan pas de microfoon, het volume, de effecten of de aangepaste add-onlogica aan.

## Server start niet

Controleer:

1. `config/ServerProperties.json` is een geldige JSON.
2. Geen enkel ander proces maakt al gebruik van de geconfigureerde poorten.
3. `McHttpConfig.Hostname` gebruikt `http://.../`.
4. `McWssConfig.Hostname` gebruikt `ws://.../`.
5. `McTcpConfig.Hostname` is een gewone host, geen URI.
6. runtime-overschrijvingen vervangen niet de verwachte configuratiewaarden.

Als de server wordt beheerd door systemd, Docker, een paneel of VoiceCraft.Java auto-start, controleer dan de opstartargumenten en het JSON-bestand.

## Klant kan geen verbinding maken

Controleer:

- het serveradres in de client verwijst naar `VoiceCraftConfig.Port`
- het serverproces is actief
- UDP-verkeer wordt toegestaan via firewall/NAT
- het openbare adres van het spelersnetwerk klopt
- `MaxClients` is niet uitgeput

`PositioningType` blokkeert normaal gesproken de onbewerkte verbinding niet, maar een mismatch kan ervoor zorgen dat het nabijheidsgedrag er slecht uitziet nadat de client verbinding heeft gemaakt.

## Minecraft-transport kan geen verbinding maken

Controleer:

- het transport dat u gebruikt, is ingeschakeld
- de add-on/plug-in gebruikt het overeenkomende token
- het eindpunt is bereikbaar vanuit de Minecraft-runtime
- de hostbinding is correct voor lokale versus externe implementatie
- het transporttype komt overeen met de integratie

Voorbeelden:

- BDS-add-on gebruikt `McHttpConfig.LoginToken`
- lokale Bedrock-wereld gebruikt `McWssConfig.LoginToken`
- VoiceCraft.Java gebruikt `McTcpConfig.LoginToken`

## McHttp werkt niet

- Controleer `McHttpConfig.Enabled = true`.
- Controleer `McHttpConfig.Hostname`.
- Controleer het token dat wordt gebruikt in `/voicecraft:vcconnect`.
- Zorg ervoor dat add-ongedrag/bronpakketten aan de wereld zijn gekoppeld.
- Zorg ervoor dat de machtigingen voor de BDS-module de vereiste script-/netwerkfunctionaliteit toestaan.
- Als BDS op afstand is, gebruik dan `127.0.0.1` niet tenzij VoiceCraft zich op dezelfde host bevindt.

## McWss werkt niet

- Controleer `McWssConfig.Enabled = true`.
- Voer `/connect <host:port>` uit vóór `/voicecraft:vcconnect`.
- Gebruik `McWssConfig.LoginToken`.
- Bevestig dat `DataTunnelCommand` overeenkomt met het add-onpakket.
- Verklein `CommandsPerTick` als de opdrachttunnel instabiel is.

## VoiceCraft.Java werkt niet

- Controleer `McTcpConfig.Enabled = true`.
- Controleer `config.voicecraft.transport.host`.
- Controleer `config.voicecraft.transport.port`.
- Controleer `config.voicecraft.transport.login-token`.
- Bevestig dat de Direct Paper- versus proxy-modus opzettelijk is.
- Als `auto-start` is ingeschakeld, bevestigt u dat de beheerde runtime gereed is vóór de time-out.

## Geen audio

Controleer eerst de lokale clientstatus:

- geselecteerd invoerapparaat
- geselecteerde uitvoerapparaat
- stom/doof toestand
- push-to-talk-staat
- invoer/uitvoervolume
- microfoon gevoeligheid
- microfoontest en uitgangstest

Controleer vervolgens de server-/Minecraft-status:

- klant verschijnt in `list --clientsOnly`
- bindstroom voltooid
- entiteit heeft een wereld-ID en een veranderende positie
- `PositioningType` komt overeen met client en server
- de server heeft de entiteit niet gedempt/verdoofd

## Nuttige diagnostiek

- Voer op de server `list --clientsOnly` uit om verbonden clients te verifiëren.
- Voer `list` uit voor en na het verplaatsen in het spel om te zien of de positie van de entiteit verandert.
- Schakel aangepaste add-on-pakkethooks tijdelijk uit.
- Sluit het Minecraft-transport opnieuw aan na token- of hostwijzigingen.
- Vergelijk de huidige configuratie met de laatste bekende goede back-up.

Voor symptoomgebaseerde controles, zie [Troubleshooting Matrix](/operations/troubleshooting-matrix).
