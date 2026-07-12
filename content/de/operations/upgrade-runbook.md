# Runbook aktualisieren

Verwenden Sie dies, wenn Sie VoiceCraft oder eine verwandte Bridge wie `VoiceCraft.Java` aktualisieren.

Dieses Runbook ist für Upgrades gedacht, die sich auf die Kompatibilität zwischen Server, Client, Bedrock-Add-on und Java-seitigen Plugin-Teilen auswirken können. Das Ziel besteht darin, einen Rollback-Pfad beizubehalten und gleichzeitig zu beweisen, dass der gesamte Stapel noch funktioniert.

## Upgrade-Bestellung

Empfohlene Reihenfolge:

1. Sichern Sie Konfigurations- und Plugin-/Add-On-Dateien.
2. Stellen Sie neue Binärdateien in einem separaten Verzeichnis bereit.
3. Stellen Sie passende Add-on- oder Plugin-Pakete bereit.
4. Lesen Sie die Versionshinweise zu Transport- und Topologieannahmen.
5. Stoppen Sie den alten Dienst.
6. Verschieben oder kopieren Sie die Konfiguration in die neue Installation.
7. Aktualisieren Sie das Addon/Plugin auf der Minecraft-Seite.
8. Starten und validieren Sie jeweils einen Pfad.

Lassen Sie für VoiceCraft `v1.6.1` das alte Bedrock-Add-on nicht bestehen. Aktualisieren Sie das Add-on zusammen mit der Client-/Server-Version, bevor Sie den Bindungsfluss und die In-Game-Indikatoren validieren.

## Warum separate Verzeichnisse helfen

Ein separates extrahiertes Verzeichnis erleichtert das Rollback, weil:

- Alte Binärdateien sind noch intakt
- Die Konfigurationsmigration ist explizit
- Sie können Release-Layouts vergleichen

## Nach dem Upgrade validieren

Mindestens:

1. VoiceCraft startet.
2. Transporthäfen binden.
3. Der Kunde stellt eine Verbindung her.
4. Addon oder Plugin authentifiziert.
5. Der Bindungsfluss funktioniert.
6. Sprachsymbole oder Add-on-Ereignisse im Spiel werden wie erwartet angezeigt.
7. Proximity-Audio funktioniert.
8. Serverbefehle wie `list --clientsOnly` zeigen erwartete Clients an.

## Beim Upgrade von VoiceCraft.Java

Validieren Sie außerdem:

- Autostartverhalten zur Laufzeit
- Proxy-Eigentumsmodell
- Backend-Snapshot-Weiterleitung
- `config.voicecraft.transport.*` Werte
- `McTcpConfig.LoginToken` Übereinstimmung

Validieren Sie bei Proxy-Netzwerken zuerst ein Backend und wechseln Sie dann den Server.

## Beim Upgrade von Bedrock-Add-on-Paketen

Validieren Sie außerdem:

- Verhaltens- und Ressourcenpakete werden beide aktualisiert
- BDS-Berechtigungen umfassen weiterhin erforderliche Module
- `voicecraft:vcconnect` verwendet das richtige Transporttoken
- `voicecraft:vcbind <key>` funktioniert für einen echten Spieler
- Indikatoren/Ereignisse im Spiel stimmen mit dem erwarteten Veröffentlichungsverhalten überein

## Beispiele für Rollback-Trigger

Erwägen Sie ein Rollback, wenn:

- Die Authentifizierung schlägt bei einem zuvor funktionierenden Token plötzlich fehl
- Transporte binden nicht mehr wie erwartet
- Die vom Plugin verwaltete Laufzeit wird nie bereit
- Der Sprachstatus des serverübergreifenden Proxys wird inkonsistent
- Für die neue Server-/Client-Version ist kein passendes Add-on/Plugin-Paket verfügbar

## Rollback-Workflow

1. Stoppen Sie den neuen Dienst.
2. Stellen Sie das vorherige Binärverzeichnis wieder her.
3. Stellen Sie frühere `ServerProperties.json`- und Plugin-/Add-On-Konfigurationen wieder her.
4. Stellen Sie das vorherige Add-on/Plugin-Paket auf der Minecraft-Seite wieder her.
5. Starten Sie den alten Dienst.
6. Validieren Sie Client, Transportauthentifizierung, Bindung und Nähe.
