# VoiceCraft.Java Direct Paper Guide

当单个 Paper server 需要直接连接 VoiceCraft 时使用。Plugin 可以连接 external VoiceCraft backend，也可以自己下载并启动 VoiceCraft。

```text
Paper + VoiceCraft.Java -> McTcp -> VoiceCraft.Server
VoiceCraft Client / SVC / Plasmo -> shared VoiceCraft audio bridge
```

External backend：自行运行 `VoiceCraft.Server`，设置 `config.voicecraft.transport.*`，并使用 `auto-start: false`。

Managed runtime：设置 `config.voicecraft.auto-start: true`；文件保存在 `config.voicecraft.install-directory`。

只有玩家使用对应 mod 时才启用 `simple-voice-chat` 或 `plasmo` adapters。
