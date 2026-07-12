# Clientinstellingen (UI)

Alle wijzigingen in de client-UI worden automatisch opgeslagen in `Settings.json`.

Zie [Settings.json](/client/settings-json) voor het onbewerkte schema, voorbeelden en geavanceerde velden.

Gebruik de gebruikersinterface voor normale configuratie. Bewerk `Settings.json` alleen als u bulkwijzigingen, automatisering of herstel van een kapotte UI-status nodig heeft.

## Aanbevolen installatievolgorde

1. Selecteer invoer- en uitvoerapparaten.
2. Voer een microfoontest uit en stem de gevoeligheid af.
3. Voeg de VoiceCraft-serververmelding toe.
4. Bevestig dat `Positioning Type` overeenkomt met de server.
5. Stel push-to-talk in als de gemeenschap dit vereist.
6. Sluit je aan bij Minecraft en voltooi de bindstroom.

## Algemeen

- `Language`:
  UI-taal/landinstelling gebruikt door de client.
- `Notification Dismiss`:
  vertraging automatisch verbergen voor lokale meldingen in milliseconden.
- `Hide Server Addresses`:
  verbergt opgeslagen IP-/host-vermeldingen in de gebruikersinterface.
- `Disable Notifications`:
  schakelt lokale toastmeldingen uit.

Gebruik `Hide Server Addresses` voor screenshots of openbare streams. Het codeert de opgeslagen serverlijst op schijf niet.

## Uiterlijk

- `Theme`:
  gekozen visueel thema.
- `Background Image`:
  geselecteerde ingebouwde achtergrondafbeelding.

## Invoer

- `Input Devices`:
  opnameapparaat / microfoonbron.
- `Input Capture Preset`:
  vastlegprofiel gebruikt door de platformbackend, standaard is `VoiceCommunication`.
- `Input Volume`:
  microfoonversterking binnen bereik `0..2`.
- `Microphone Sensitivity`:
  drempel voor spraakactiviteit binnen bereik `0..1`.
- `Denoisers`:
  beschikbare denoiser-implementatie.
- `Automatic Gain Controllers`:
  AGC-implementatie.
- `Echo Cancelers`:
  implementatie van echo-onderdrukking.
- `Push To Talk`:
  alleen verzenden zolang de geconfigureerde sneltoets ingedrukt wordt gehouden.
- `Push To Talk Cue`:
  lokaal hoorbaar signaal wanneer de PTT wordt in-/uitgeschakeld.
- `Microphone Test`:
  lokale monitoring en visualisatie van activiteiten.

Goed uitgangspunt:

- houd `Input Volume` dichtbij `1`
- verhoog de gevoeligheid alleen als er geen zachte spraak wordt gedetecteerd
- Maak push-to-talk mogelijk in luidruchtige ruimtes
- gebruik de microfoontest voordat u de instellingen aan de serverzijde wijzigt

Als andere spelers constant achtergrondgeluid horen, verlaag dan het ingangsvolume, verhoog de activeringsdrempel, schakel push-to-talk in of wijzig het geselecteerde microfoonapparaat.

## Uitvoer

- `Output Devices`:
  afspeelapparaat.
- `Output Volume`:
  afspeelversterking binnen bereik `0..2`.
- `Audio Clippers`:
  uitvoerclipper / limiter-implementatie.
- `Test Output`:
  stuur een lokaal testsignaal naar het geselecteerde apparaat.

Als u de testuitvoer wel kunt horen, maar andere spelers niet, is het afspeelapparaat waarschijnlijk in orde. Controleer vervolgens de serververbinding, bindstroom en positie-updates.

## Netwerk

- `Positioning Type`:
  moet overeenkomen met `VoiceCraftConfig.PositioningType` op de server.
- `McWss Listen Ip`:
  lokaal adres gebruikt door de McWss-zijbrug.
- `McWss Host Port`:
  lokale McWss-poort die wordt gebruikt voor de Bedrock-websocket-link.

`Positioning Type` is de belangrijkste client/server-compatibiliteitsinstelling. Gebruik bij normale BDS- en VoiceCraft.Java-implementaties dezelfde servermodus die is geconfigureerd in `ServerProperties.json`.

`McWss Listen Ip` en `McWss Host Port` zijn alleen van belang voor lokale Bedrock-opstellingen in McWss-stijl. Ze vervangen niet de VoiceCraft-serveringang die wordt gebruikt voor spraak-UDP-verkeer.

## Sneltoetsen

Standaard maakt VoiceCraft bindingen zichtbaar voor:

- `Mute`
- `Deafen`

Standaard bureaubladbindingen zijn doorgaans:

- `Mute`: `LeftControl + LeftShift + M`
- `Deafen`: `LeftControl + LeftShift + D`

Exacte sneltoetswaarden worden opgeslagen in `HotKeySettings.Bindings`.

Als sneltoetsen niet worden geactiveerd, controleer dan op conflicten op besturingssysteemniveau en of het clientvenster of de desktopomgeving het vastleggen van globale sneltoetsen toestaat.

## Bediening per gebruiker

VoiceCraft slaat ook lokale voorkeuren per gebruiker op:

- volumevermenigvuldiger per gebruiker
- lokale mute-status per gebruiker

Deze worden opgeslagen in `UserSettings.Users` en worden aan de clientzijde toegepast.

Gebruik lokaal dempen of volume per gebruiker als slechts één speler te luid of storend voor u is. Gebruik opdrachten voor het dempen/verdoven van de server wanneer het personeel moderatie voor iedereen moet afdwingen.

## Geavanceerd

- `Trigger GC`:
  handmatige trigger voor afvalinzameling.
- `Crash`:
  opzettelijk crashpad voor diagnostiek/logboekverificatie.

Geavanceerde bedieningselementen zijn bedoeld voor diagnostiek. Gebruik `Crash` niet tijdens normaal spelen, tenzij u opzettelijk crashrapportage of logverzameling verifieert.

## Wat u moet controleren als audio verkeerd aanvoelt

1. Invoer- en uitvoerapparaten voor clients.
2. Push-to-talk-status.
3. VoiceCraft-serververbinding.
4. `Positioning Type`.
5. Minecraft bindstroom.
6. Spelersafstand en wereld-ID-updates.

![Network Settings](/images/voicecraft/settings-network.png)
