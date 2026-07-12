# Client installatie

`VoiceCraft.Client` is de spelergerichte app. Elke speler die de proximity voice wil spreken of horen, heeft deze op zijn eigen apparaat nodig.

Installeer de client nadat `VoiceCraft.Server` bereikbaar is. Tijdens de eerste keer opstarten voegt u een serververmelding toe die verwijst naar het VoiceCraft UDP-eindpunt, meestal `host:9050`.

## Voordat je begint

Je hebt nodig:

- het serveradres dat spelers moeten gebruiken
- de server-UDP-poort van `VoiceCraftConfig.Port`
- een microfoon en een afspeelapparaat dat beschikbaar is voor het besturingssysteem
- matching `Positioning Type` tussen client en server

Voor lokale tests is het eindpunt doorgaans:

```text
127.0.0.1:9050
```

Voor externe servers gebruikt u het openbare adres of het LAN-adres van de machine waarop `VoiceCraft.Server` draait.

## Windows

1. Download `VoiceCraft.Client.Windows.<Architecture>.v1.7.0.zip`.
2. Pak het archief uit.
3. Voer `VoiceCraft.Client.Windows.exe` uit.
4. Als Windows SmartScreen verschijnt, controleer dan of het bestand afkomstig is van de officiële releasepagina voordat u doorgaat.

## Linux

1. Download `VoiceCraft.Client.Linux.<Architecture>.v1.7.0.zip`.
2. Pak het archief uit.
3. Verleen machtigingen en voer uit:

```bash
chmod +x ./VoiceCraft.Client.Linux
./VoiceCraft.Client.Linux
```

Als de app geen audioapparaten kan zien, controleer dan de PulseAudio/PipeWire-machtigingen en of de app in een beperkte sandbox draait.

## macOS

Kies het ZIP-pakket dat bij uw apparaat past:

- `VoiceCraft.Client.MacOS.arm64.v1.7.0.zip` voor Apple Silicon
- `VoiceCraft.Client.MacOS.x64.v1.7.0.zip` voor Intel

1. Pak het archief uit.
2. Start `VoiceCraft.app`.

Als macOS het opstarten blokkeert:

```bash
xattr -dr com.apple.quarantine /Applications/VoiceCraft.app
```

Verwijder alleen de quarantaine voor builds die u opzettelijk hebt gedownload en vertrouwd.

## Android

1. Download `VoiceCraft.Client.Android.<Architecture>.v1.7.0.zip`.
2. Pak het archief uit.
3. Open de `.apk` uit het archief en installeer.
4. Sta microfoontoestemming toe wanneer Android daarom vraagt.

## iOS (AltStore / sideload)

1. Download `VoiceCraft.Client.iOS.arm64.v1.7.0.zip`.
2. Installeer IPA via AltStore of een andere sideload-tool.
3. Sta indien nodig het profiel toe in de iOS-instellingen.
4. Sta microfoontoestemming toe bij de eerste keer opstarten.

## Opmerking over .NET Runtime

Voor oudere releases (vóór `v1.4.0`) is mogelijk een geïnstalleerde .NET 9-runtime vereist.
Voor huidige, op zichzelf staande builds is dit meestal niet vereist.

## Controlelijst voor de eerste lancering

1. Open de klant.
2. Selecteer invoer- en uitvoerapparaten.
3. Gebruik de microfoontest om het ingangsniveau te bevestigen.
4. Voeg een serververmelding toe:
   - host: VoiceCraft-serveradres
   - poort: `VoiceCraftConfig.Port`
5. Bevestig dat `Positioning Type` overeenkomt met de server.
6. Maak verbinding voordat u de Minecraft-bindstroom start.

De client die succesvol verbinding maakt, bewijst alleen dat het spraakeindpunt bereikbaar is. De nabijheid van Minecraft is nog steeds afhankelijk van de add-on of plug-in die verbinding maakt met het bijpassende transport.

## Veelvoorkomende problemen bij de eerste lancering

- Geen microfooningang:
  controleer de microfoontoestemming van het besturingssysteem en het geselecteerde invoerapparaat.
- Client maakt verbinding, maar geen proximity audio:
  controleer Minecraft-transport, bindstroom en `Positioning Type`.
- Externe server maakt geen verbinding:
  bevestig dat de UDP-poort open is tussen de speler en `VoiceCraft.Server`.
- Speler hoort iedereen op de verkeerde afstand:
  controleer entiteitspositie-updates en wereld-ID's.

## Schermafbeeldingen

![General Settings](/images/voicecraft/settings-general.png)
![Voice Settings](/images/voicecraft/settings-voice.png)
