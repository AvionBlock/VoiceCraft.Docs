# VoiceCraft.Addon（Bedrock Addon）

Repository：[AvionBlock/VoiceCraft.Addon](https://github.com/AvionBlock/VoiceCraft.Addon)

Addon 透過 `McHttp` 或 `McWss` 將 Bedrock worlds 連接到 VoiceCraft，並提供 bind flow、UI、events 和 packet helpers。

## Packages

| Package | 用途 |
|---------|------|
| `Basic` | bind flow、settings UI、voice indicators |
| `Core.McHttp` | BDS 的 HTTP transport |
| `Core.McWss` | 本地 world 的 WebSocket/command tunnel |

## 1.7 addon developer 注意

- low-level events 透過 `EventRequest`
- entity properties 用於 custom effect values
- cave/muffle factor packets 已移除
- `OnEntityPropertyUpdated` 表示 property changes

## Commands

- `voicecraft:vcbind <binding_key>`
- `voicecraft:vcsettings`
- `voicecraft:vcconnect <hostname> <token>`
- `voicecraft:vcconnect_raw <ip> <port> <token>`
- `voicecraft:vcconnect <token>`
- `voicecraft:data_tunnel [max_string_length] [data]`

## `vcconnect_raw`

`voicecraft:vcconnect_raw` 是 auto-connect 使用的 low-level command。它分別接收 host/IP、port 和 token：

```text
/voicecraft:vcconnect_raw "<IP_OR_HOST>" <PORT> "<LOGIN_TOKEN>"
```

對於 `Core.McHttp`，它會組出 `http://<ip>:<port>`。對於 `Core.McWss`，host、port 和 token 會直接傳給 WebSocket transport。`Basic` package 使用 `autoConnect:ip`、`autoConnect:port` 和 `autoConnect:loginKey` 呼叫它。

## Validation

- 安裝正確 transport package
- behavior/resource packs 已啟用
- token 匹配 server config
- `vcbind` 正常
- movement 更新位置
- 1.7 effect overrides 使用的 properties 正常
