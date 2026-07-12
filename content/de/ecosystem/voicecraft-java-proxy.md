# VoiceCraft.Java Proxy Guide

Nutzen Sie diesen Modus für Velocity oder BungeeCord mit mehreren Paper backend servers.

```text
Paper backends + VoiceCraft.Java -> voicecraft-java:main -> Velocity/BungeeCord + VoiceCraft.Java -> McTcp -> VoiceCraft.Server
```

Der Proxy besitzt die VoiceCraft connection. Paper backends beobachten Spieler und senden snapshots über plugin messaging; sie besitzen nicht die zentrale McTcp connection.

## Backend Paper

```yml
config:
  proxy:
    enabled: true
```

## Proxy

```yml
config:
  voicecraft:
    transport:
      host: "127.0.0.1"
      port: 9050
      login-token: "replace-with-token"
```

Das Token muss zu `McTcpConfig.LoginToken` auf VoiceCraft.Server passen. Prüfen Sie danach bind flow und Wechsel zwischen backend servers.
