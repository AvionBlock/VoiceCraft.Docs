# Veelgestelde vragen

Veelgestelde vragen over VoiceCraft.

## Heeft elke speler de VoiceCraft-clientapp nodig?

Ja. Spelers hebben de clientapplicatie nodig. De server zelf gebruikt de client-app niet.

Het is de client die de microfooninvoer vastlegt en stemgeluid in de buurt afspeelt. De Minecraft-add-on of plug-in levert alleen de spelstatus, zoals de positie van de speler en bindingsgegevens.

## Werkt VoiceCraft op mobiel?

Ja. Android en iOS worden ondersteund.

Mobiele gebruikers hebben nog steeds een bereikbaar VoiceCraft-servereindpunt en microfoontoestemming nodig.

## Werkt VoiceCraft op console?

Niet rechtstreeks op consolehardware als een native VoiceCraft-client vandaag.

Consolespelers kunnen nog steeds deelnemen aan sommige serverscenario's als de rest van de stapel correct is geconfigureerd, maar directe native clientondersteuning is niet hetzelfde als desktop of mobiel.

## Werkt VoiceCraft op Realms?

Het kan in beperkte scenario's werken, vooral wanneer positionering aan de clientzijde wordt gebruikt, maar Realms is een beperktere omgeving dan een speciale server.

Als u een voorspelbare productie-opstelling wilt, gebruik dan BDS met `McHttp` of een Java/Geyser-topologie met `VoiceCraft.Java`.

## Welk vervoer moet ik gebruiken?

- Bedrock Dedicated Server:
  `McHttp`
- lokale Bedrock-wereld:
  `McWss`
- Java + Geyser/Floodgate:
  `McTcp` tot en met `VoiceCraft.Java`

Het transport is voor de Minecraft-kant. Spelerclients maken nog steeds verbinding met het VoiceCraft UDP-eindpunt.

## Heeft VoiceCraft.Java een afzonderlijk beheerde VoiceCraft-server nodig?

Niet altijd.

In de directe Paper-modus kan VoiceCraft.Java de VoiceCraft-runtime opstarten en uitvoeren onder de motorkap met behulp van:

- `config.voicecraft.auto-start`
- `config.voicecraft.shutdown-on-disable`
- `config.voicecraft.ready-timeout-ms`
- `config.voicecraft.install-directory`

Als u wilt, kan het ook verwijzen naar een reeds actieve externe VoiceCraft-server.

In de huidige configuraties staan de externe verbindingswaarden onder `config.voicecraft.transport.*`.

## Kan ik VoiceCraft gebruiken met hostingproviders zoals Apex, Aternos of iets dergelijks?

Het hangt ervan af of uw provider het vereiste netwerkpad tussen de spelserver en de VoiceCraft-server toestaat.

Voorbeelden:

- BDS met `McHttp` heeft uitgaande bereikbaarheid naar het VoiceCraft HTTP-eindpunt nodig
- Java + VoiceCraft.Java heeft bereikbaarheid nodig voor het VoiceCraft `McTcp` eindpunt

Sommige providers blokkeren precies het netwerkgedrag dat u nodig heeft.

Voordat u hosting koopt, moet u zich afvragen of aangepaste UDP-poorten, uitgaande HTTP/TCP, zijspanprocessen en vereiste Bedrock-scriptmodules zijn toegestaan.

## Kan ik VoiceCraft op dezelfde machine hosten als de spelserver?

Ja. Dat is gebruikelijk voor:

- lokale testen
- kleine gemeenschappen
- directe Paper + VoiceCraft.Java-instellingen

Gebruik loopback-adressen zoals `127.0.0.1` alleen als de consument daadwerkelijk op dezelfde machine draait.

## Kan ik slechts één transport uitvoeren?

Ja. U kunt runtime-transporten beperken met:

- configuratie schakelt in `ServerProperties.json`
- runtime-overschrijvingen zoals `--transport-mode`

Dit wordt aanbevolen voor productie. Geef alleen het transport bloot dat uw topologie gebruikt.

## Waarom hoor ik niemand, ook al maakt de client verbinding?

Controleer deze op volgorde:

1. correcte VoiceCraft-server-IP en poort in de client
2. passend bij `PositioningType`
3. juiste Minecraft-transporttoken
4. succesvolle bindstroom
5. entiteiten die positie- en wereldupdates ontvangen

Als `list --clientsOnly` de speler toont, maar `list` geen veranderende entiteitspositie toont, debug dan de Minecraft-integratie in plaats van de microfooninstellingen.

## Is `McWss` goed voor de productie?

Meestal niet de eerste keuze voor grotere openbare omgevingen.

Het is het beste voor lokale werelden, testen en lichtgewicht opstellingen. `McHttp` is meestal een beter Bedrock-productietransport.

## Wat is het verschil tussen servermute en lokale mute?

- server dempen:
  afgedwongen door de backend voor de doelentiteit of -client
- lokaal dempen:
  opgeslagen in de `Settings.json` van een speler als persoonlijke voorkeur

## Waar worden het volume per gebruiker en lokaal dempen opgeslagen?

In `Settings.json` onder `UserSettings.Users`.

## Ik gebruik Java met Geyser. Heb ik de Bedrock-add-on ook nodig?

Nee. In Java- en Geyser-topologieën is de bridge doorgaans `VoiceCraft.Java`, en niet de Bedrock-add-on.

Gebruik de Bedrock-add-on voor Bedrock-werelden/BDS. Gebruik VoiceCraft.Java wanneer de Java-infrastructuur de bron is van de spelerstatus.

## Is VoiceCraft een gehoste spraakservice van derden?

Nee. VoiceCraft vereist geen gehoste service van derden. U voert zelf de server/runtime uit of laat VoiceCraft.Java de runtime beheren in directe Paper-modus.

## Is VoiceCraft slechts een Minecraft-mod?

Nee. VoiceCraft is een verzameling client-apps, een serverruntime, Bedrock-add-onpakketten en bridge-tools aan de Java-kant. Een werkende opstelling heeft de juiste combinatie nodig voor uw topologie.
