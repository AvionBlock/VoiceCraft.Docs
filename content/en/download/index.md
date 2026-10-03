---
seo:
  title: Download
  description: Download the latest VoiceCraft Client and Server builds for your platform.
---

Download the pieces that match your topology. Most setups need at least one `VoiceCraft.Server` package and one `VoiceCraft.Client` package per player.

The client and server buttons use the [latest GitLab release](https://gitlab.avion.team/voicecraft/VoiceCraft/-/releases/permalink/latest). Asset names follow patterns such as `VoiceCraft.Client.Windows.x64.v<version>.zip` and `VoiceCraft.Server.Linux.x64.v<version>.zip`; the buttons resolve the real names from GitLab.

Bedrock Dedicated Server deployments also need the `VoiceCraft.Addon.Core.McHttp` package or a configured world archive from the [Addon Configurator](/addon-configurator). Local Bedrock worlds usually use `VoiceCraft.Addon.Core.McWss`. Java/Geyser deployments use `VoiceCraft.Java` plus the `McTcp` transport.

The configurator uses GitLab addon ZIPs when present and otherwise uses the matching packages in the [GitHub mirror releases](https://github.com/AvionBlock/VoiceCraft/releases/latest).

After downloading, continue with [Quick Start](/start/quick-start) or the guide for your transport.

::voice-craft-downloads
::
