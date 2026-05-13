# GeyserVoice（Java / Geyser橋）

儲存庫：[AvionBlock/GeyserVoice](https://github.com/AvionBlock/GeyserVoice)

`GeyserVoice` 透過 `McTcp` 傳輸將 Java 端基礎結構連接到 `VoiceCraft.Server`。

在 GeyserVoice 專案中，該路徑也被描述為 `McApi TCP`。在 VoiceCraft 伺服器配置中，它對應於 `McTcpConfig`。

它支援：

- 直接 Paper/Folia 部署
- 速度代理部署
- BungeeCord 代理部署
- 混合代理+後端拓撲

## GeyserVoice 的作用

`GeyserVoice` 將玩家狀態從 Java 端伺服器橋接到 VoiceCraft：

- 玩家生命週期
- 位置/世界快照
- 綁定流
- 多伺服器網路的代理中繼

它不僅僅是一個簡單的資料包轉發器。在直接 Paper 模式下，它還可以管理本地 VoiceCraft 運行時。

## 非常重要：GeyserVoice 可以在背景運行 VoiceCraft

在直接 Paper 安裝中，該外掛程式可以自動：

- 下載 VoiceCraft 運行時
- 將其安裝到配置的目錄中
- 啟動進程
- 等到它準備好
- 當插件禁用時可選擇停止它

此行為是透過 `config.voicecraft.*` 區塊控制的。

這使得 GeyserVoice 適合：

- 使用已管理的外部 `VoiceCraft.Server`
- 讓外掛程式引導並為您運行 VoiceCraft

如果 GeyserVoice 管理執行時，它仍然會透過相同的 `McTcp`/`McApi TCP` 路徑進行連接。差別在於由誰啟動 VoiceCraft 流程。

## 支援的插件平台

從目前原始碼來看：

- Paper/Folia
- 速度
- 彈力繩

## 運行時路徑

目前支援的路徑：

- `Paper -> McTcp -> VoiceCraft`
- `Paper -> Proxy relay -> McTcp -> VoiceCraft`

## `config.yml` 版面

目前 Paper 配置結構：

### `config.debug`

啟用插件調試模式。

### `config.lang`

插件語言，例如 `system`。

### `config.auto-reconnect`

插件是否應自動重新連接。

### `config.proxy.enabled`

目前Paper-side節點是否在代理管理的中繼後面運作。

### `config.voicecraft.*`

連接和運行時管理區塊。

目前嵌套形狀：

```yml
config:
  voicecraft:
    transport:
      host: "127.0.0.1"
      port: 9050
      login-token: "__GENERATED_LOGIN_TOKEN__"
    voice:
      port: 1111
    auto-start: true
    shutdown-on-disable: true
    invariant-globalization: true
    ready-timeout-ms: 20000
    install-directory: "voicecraft-runtime"
```

- `transport.host`
- `transport.port`
- `transport.login-token`
- `voice.port`
- `auto-start`
- `shutdown-on-disable`
- `invariant-globalization`
- `ready-timeout-ms`
- `install-directory`

意義：

- `transport.host` / `transport.port` / `transport.login-token`
  目標 `VoiceCraft.Server` / `McTcp`
- `voice.port`
  託管運行時路徑使用的 VoiceCraft 運行時語音端口
- `auto-start`
  讓外掛自動啟動 VoiceCraft 運作時
- `shutdown-on-disable`
  插件卸載時停止託管運行時
- `invariant-globalization`
  運行時全球化選項對於託管伺服器啟動很有用
- `ready-timeout-ms`
  插件等待運行時準備就緒的時間
- `install-directory`
  託管運行時的安裝位置

在 Velocity 和 BungeeCord 上，設定保留 `config.voicecraft.transport.*` 和 `config.voicecraft.voice.*` 形狀，但不使用僅 Paper 託管執行時間欄位。

### `config.voice.*`

面對玩家的行為：

- `proximity-distance`
- `proximity-toggle`
- `voice-effects`
- `not-in-voice-symbol`
- `in-voice-symbol`
- `send-bind-message`
- `send-disconnect-message`
- `send-voicecraft-disconnect-message`
- `send-connection-lost-message`
- `position-update-interval-ticks`

### `config.players`

儲存自動綁定/播放器端快取資料。

### `config.player-links`

插件使用的附加連結/快取結構。

## 命令

來自`BaseVoiceCommand`：

- `connect <host> <port> <key>`
- `reconnect [true|false]`
- `disconnect`
- `settings`
- `bind <key>`
- `bindfake <key> <name>`
- `updatefake <key>`
- `clearautobind`
- `reload`

## 權限

典型權限：

- `voice.cmd`
- `voice.connect`
- `voice.reconnect`
- `voice.disconnect`
- `voice.settings`
- `voice.bind`
- `voice.bindfake`
- `voice.reload`

## Direct Paper模式

最佳時間：

- 您運行一台 Paper 伺服器
- 您想要最簡單的 Java 端設置
- 您希望 GeyserVoice 為您管理 VoiceCraft 運行時

請參閱 [Direct Paper Guide](/ecosystem/geyservoice-direct-paper)。

## 代理模式

最佳時間：

- 您運行 Velocity 或 BungeeCord
- 你有幾個後端Paper伺服器
- 您需要代理上有一個中央 VoiceCraft 連接

請參閱 [Proxy Guide](/ecosystem/geyservoice-proxy)。

在代理模式下，後端 Paper 伺服器不應被視為中央 VoiceCraft 連線擁有者。代理擁有 `McTcp` 連接，後端節點提供玩家快照。

## 技術說明

- 插件訊息通道：`geyservoice:main`
- 在代理模式下，世界 ID 可以使用後端身分進行命名空間
- 該插件目前使用 `McTcp` 作為面向 VoiceCraft 的橋

## 當前代碼限制

- `updatefake` 仍然是佔位符
- `settings` 存在，但目前具有最少的實用邏輯

## 生產清單

1. 決定 Paper 是否應管理 VoiceCraft 執行階段本身。
2. 如果是，請設定`auto-start`、`install-directory`和`ready-timeout-ms`。
3. 如果否，請將 `config.voicecraft.transport.host`、`config.voicecraft.transport.port` 和 `config.voicecraft.transport.login-token` 指向外部 VoiceCraft 伺服器。
4. 限制僅限員工的命令。
5. 在向玩家開放之前測試綁定流程和位置更新。
6. 在 VoiceCraft 端確認 `McTcpConfig.Enabled = true`。
7. 確認令牌與 `McTcpConfig.LoginToken` 相符。
