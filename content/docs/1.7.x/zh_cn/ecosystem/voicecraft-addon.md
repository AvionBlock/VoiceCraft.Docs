# VoiceCraft.Addon（Bedrock Addon）

Repository：[AvionBlock/VoiceCraft.Addon](https://github.com/AvionBlock/VoiceCraft.Addon)

Addon 通过 `McHttp` 或 `McWss` 将 Bedrock worlds 连接到 VoiceCraft，并提供 bind flow、UI、events 和 packet helpers。

## Packages

| Package | 用途 |
|---------|------|
| `Basic` | bind flow、settings UI、voice indicators |
| `Core.McHttp` | BDS 的 HTTP transport |
| `Core.McWss` | 本地 world 的 WebSocket/command tunnel |

## 1.7 addon developer 注意

- low-level events 通过 `EventRequest`
- entity properties 用于 custom effect values
- cave/muffle factor packets 已移除
- `OnEntityPropertyUpdated` 表示 property changes

## Commands

- `voicecraft:vcbind <binding_key>`
- `voicecraft:vcsettings`
- `voicecraft:vcconnect <hostname> <token>`
- `voicecraft:vcconnect <token>`
- `voicecraft:data_tunnel [max_string_length] [data]`

## Validation

- 安装正确 transport package
- behavior/resource packs 已启用
- token 匹配 server config
- `vcbind` 正常
- movement 更新位置
- 1.7 effect overrides 使用的 properties 正常
