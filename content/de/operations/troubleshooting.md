# Fehlerbehebung

Beginnen Sie damit, herauszufinden, welcher Teil des Stacks ausfällt. VoiceCraft verfügt über separate Client-, Server- und Minecraft-Transportpfade, sodass ein Teil funktionieren kann, während ein anderer noch fehlerhaft ist.

Empfohlene Reihenfolge:

1. Bestätigen Sie, dass `VoiceCraft.Server` sauber startet.
2. Bestätigen Sie, dass ein VoiceCraft-Client eine Verbindung zum UDP-Endpunkt herstellen kann.
3. Bestätigen Sie die Authentifizierung des Minecraft-seitigen Transports.
4. Bestätigen Sie, dass der Bindungsfluss abgeschlossen ist.
5. Bestätigen Sie, dass Positions-/Weltaktualisierungen das Näherungsverhalten ändern.
6. Passen Sie erst dann Mikrofon, Lautstärke, Effekte oder die benutzerdefinierte Add-On-Logik an.

## Server startet nicht

Überprüfen Sie:

1. `config/ServerProperties.json` ist gültiges JSON.
2. Kein anderer Prozess verwendet bereits die konfigurierten Ports.
3. `McHttpConfig.Hostname` verwendet `http://.../`.
4. `McWssConfig.Hostname` verwendet `ws://.../`.
5. `McTcpConfig.Hostname` ist ein einfacher Host, kein URI.
6. Laufzeitüberschreibungen ersetzen nicht die erwarteten Konfigurationswerte.

Wenn der Server von systemd, Docker, einem Panel oder GeyserVoice-Autostart verwaltet wird, überprüfen Sie die Startargumente sowie die JSON-Datei.

## Der Client kann keine Verbindung herstellen

Überprüfen Sie:

- die Serveradresse im Client zeigt auf `VoiceCraftConfig.Port`
- Der Serverprozess läuft
- UDP-Verkehr ist über Firewall/NAT zulässig
- Die öffentliche Adresse aus dem Spielernetzwerk ist korrekt
- `MaxClients` ist nicht erschöpft

`PositioningType` blockiert normalerweise keine Rohverbindung, aber eine Nichtübereinstimmung kann dazu führen, dass das Proximity-Verhalten fehlerhaft aussieht, nachdem der Client eine Verbindung hergestellt hat.

## Minecraft-Transport kann keine Verbindung herstellen

Überprüfen Sie:

- Der von Ihnen verwendete Transport ist aktiviert
- Das Addon/Plugin verwendet das passende Token
- Der Endpunkt ist über die Minecraft-Laufzeit erreichbar
- Die Hostbindung ist für die lokale und die Remote-Bereitstellung korrekt
- der Transporttyp passt zur Integration

Beispiele:

- BDS-Add-on verwendet `McHttpConfig.LoginToken`
- Die lokale Bedrock-Welt verwendet `McWssConfig.LoginToken`
- GeyserVoice verwendet `McTcpConfig.LoginToken`

## McHttp funktioniert nicht

- Überprüfen Sie `McHttpConfig.Enabled = true`.
- Überprüfen Sie `McHttpConfig.Hostname`.
- Überprüfen Sie das in `/voicecraft:vcconnect` verwendete Token.
- Stellen Sie sicher, dass Add-on-Verhaltens-/Ressourcenpakete mit der Welt verbunden sind.
- Stellen Sie sicher, dass die BDS-Modulberechtigungen die erforderliche Skript-/Netzwerkfunktionalität zulassen.
- Wenn BDS remote ist, verwenden Sie `127.0.0.1` nicht, es sei denn, VoiceCraft befindet sich auf demselben Host.

## McWss funktioniert nicht

- Überprüfen Sie `McWssConfig.Enabled = true`.
- Führen Sie `/connect <host:port>` vor `/voicecraft:vcconnect` aus.
- Verwenden Sie `McWssConfig.LoginToken`.
- Bestätigen Sie, dass `DataTunnelCommand` mit dem Add-on-Paket übereinstimmt.
- Reduzieren Sie `CommandsPerTick`, wenn der Befehlstunnel instabil ist.

## GeyserVoice funktioniert nicht

- Überprüfen Sie `McTcpConfig.Enabled = true`.
- Überprüfen Sie `config.voicecraft.transport.host`.
- Überprüfen Sie `config.voicecraft.transport.port`.
- Überprüfen Sie `config.voicecraft.transport.login-token`.
- Bestätigen Sie, dass der Direct Paper- vs. Proxy-Modus beabsichtigt ist.
- Wenn `auto-start` aktiviert ist, stellen Sie sicher, dass die verwaltete Laufzeit vor dem Timeout bereit ist.

## Kein Ton

Überprüfen Sie zuerst den lokalen Clientstatus:

- ausgewähltes Eingabegerät
- ausgewähltes Ausgabegerät
- Stumm-/Taubheitszustand
- Push-to-Talk-Zustand
- Eingangs-/Ausgangslautstärke
- Mikrofonempfindlichkeit
- Mikrofontest und Ausgangstest

Überprüfen Sie dann den Server-/Minecraft-Status:

- Client erscheint in `list --clientsOnly`
- Bindungsfluss abgeschlossen
- Die Entität hat eine Welt-ID und eine sich ändernde Position
- `PositioningType` stimmt mit Client und Server überein
- Der Server hat die Entität nicht stumm/taub gemacht

## Nützliche Diagnose

- Führen Sie auf dem Server `list --clientsOnly` aus, um verbundene Clients zu überprüfen.
- Führen Sie `list` vor und nach der Bewegung im Spiel aus, um zu sehen, ob sich die Position der Entität ändert.
- Deaktivieren Sie vorübergehend benutzerdefinierte Add-on-Paket-Hooks.
- Stellen Sie die Verbindung zum Minecraft-Transport nach Token- oder Host-Änderungen wieder her.
- Vergleichen Sie die aktuelle Konfiguration mit der letzten als funktionierend bekannten Sicherung.

Informationen zu symptombasierten Prüfungen finden Sie unter [Troubleshooting Matrix](/operations/troubleshooting-matrix).
