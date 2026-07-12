# Updaten en back-uppen

Gebruik deze pagina voor routinematige updates waarbij u verwacht dat de topologie hetzelfde blijft. Voor grotere versiesprongen of topologiewijzigingen gebruikt u de [Upgrade Runbook](/operations/upgrade-runbook).

## Waar u een back-up van moet maken voordat u gaat updaten

- `config/ServerProperties.json`
- aangepaste scripts/systemd of servicemanager-wrapper
- log indien nodig de geschiedenis in
- VoiceCraft.Java `config.yml` als Java-integratie wordt gebruikt
- Configuratie van het Bedrock World Pack als de add-on wordt gebruikt
- opmerkingen voor openbare/LAN-hostnamen en open poorten

Back-ups bevatten tokens en topologiedetails. Bewaar ze als gevoelige operationele bestanden.

## Veilige server-update

1. Stop de server (`stop` of via servicemanager).
2. Maak een back-up van `config/`.
3. Pak de nieuwe release uit in een aparte map.
4. Verplaats uw `ServerProperties.json`.
5. Start en valideer opstartlogboeken.
6. Bevestig dat het geselecteerde transport succesvol is gebonden.
7. Verbind één client en één Minecraft-side-integratie voordat deze voor alle spelers wordt geopend.

## VoiceCraft 1.6.1 opmerking

VoiceCraft `v1.6.1` vereist het updaten van de Bedrock add-on-pakketten op hetzelfde moment als de binaire bestanden van de client/server. De release corrigeert de afhandeling van de verbinding met McHttp/McWss en bevat wijzigingen aan de kant van de stem voor in-game stempictogrammen, de kwaliteit van leven van de automatische verbinding en uitgezonden evenementen.

## Veilige clientupdate

Clientinstellingen (`Settings.json`) worden opgeslagen in `ApplicationData/voicecraft`, zodat ze doorgaans binaire updates overleven.

Vraag nog steeds een kleine testgroep om te verifiëren:

- microfoon selectie
- uitvoerapparaat
- opgeslagen serverinvoer
- push-to-talk-gedrag
- `Positioning Type`

## Compatibiliteit

- Client- en server-`Major/Minor`-versies moeten overeenkomen.
- Patchversies kunnen verschillen.
- Bedrock add-on-pakketten moeten overeenkomen met de server/client-release als de release-opmerkingen het gedrag aan de add-on vermelden.
- VoiceCraft.Java moet worden bijgewerkt met de bijbehorende configuratieverwachtingen bij gebruik van Java-side bridges.

Als er problemen optreden na een update, begin dan met [Troubleshooting](/operations/troubleshooting).

## Voorbereiding op terugdraaien

Bewaar het volgende voordat u bestanden vervangt:

- vorige binaire servermap
- vorig add-on/plug-inpakket
- vorige configuratieback-up
- laatst bekende-goede token- en poortnotities

Terugdraaien is veel eenvoudiger als de oude map nog steeds bestaat en de update deze niet op zijn plaats heeft overschreven.
