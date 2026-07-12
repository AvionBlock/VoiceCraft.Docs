# VoiceCraft.Java Direct Paper Guide

當單一 Paper server 需要直接連接 VoiceCraft 時使用。Plugin 可以連接 external VoiceCraft backend，也可以自己下載並啟動 VoiceCraft。

```text
Paper + VoiceCraft.Java -> McTcp -> VoiceCraft.Server
VoiceCraft Client / SVC / Plasmo -> shared VoiceCraft audio bridge
```

External backend：自行執行 `VoiceCraft.Server`，設定 `config.voicecraft.transport.*`，並使用 `auto-start: false`。

Managed runtime：設定 `config.voicecraft.auto-start: true`；檔案保存在 `config.voicecraft.install-directory`。

只有玩家使用對應 mod 時才啟用 `simple-voice-chat` 或 `plasmo` adapters。
