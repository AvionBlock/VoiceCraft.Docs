# GeyserVoice Direct Paper 指南

當一台 Paper / Folia 伺服器應直接與 VoiceCraft 對話時，請使用此模式。

Direct Paper 模式是最簡單的 Java 端拓撲：Paper 伺服器要么連接到外部 `VoiceCraft.Server`，要么讓 GeyserVoice 下載並啟動本地 VoiceCraft 運行時。

目標形狀：

```text
Paper/Folia + GeyserVoice -> McTcp/McApi TCP -> VoiceCraft.Server
VoiceCraft.Client -> VoiceCraft UDP endpoint
```

## 兩種運作方式

### 選項 A：外部 VoiceCraft 伺服器

您已經在某處執行 `VoiceCraft.Server` 並將 GeyserVoice 指向它。

### 選項 B：外掛程式管理的運行時

GeyserVoice 可以為您引導 VoiceCraft：

- 下載運行時
- 安裝運行時
- 啟動運行時
- 等待準備就緒
- 可選擇使用插件停止運作時

對於直接 Paper 用戶來說，這是目前最重要的功能之一。

## 推薦配置

```yml
config:
  debug: false
  lang: "system"
  auto-reconnect: true

  proxy:
    enabled: false

  voicecraft:
    transport:
      host: "127.0.0.1"
      port: 9050
      login-token: "replace-with-token"
    voice:
      port: 1111
    auto-start: true
    shutdown-on-disable: true
    invariant-globalization: true
    ready-timeout-ms: 20000
    install-directory: "voicecraft-runtime"

  voice:
    proximity-distance: 30
    proximity-toggle: true
    voice-effects: true
    send-bind-message: true
    send-disconnect-message: true
    send-voicecraft-disconnect-message: true
    send-connection-lost-message: true
    position-update-interval-ticks: 5
```

將 `config.voicecraft.transport.host`、`config.voicecraft.transport.port` 和 `config.voicecraft.transport.login-token` 用於 VoiceCraft `McTcp` 連接。當您使用外部執行時間時，這些必須與 VoiceCraft 伺服器端相符。

## 設定步驟

1. 在 Paper 上安裝 GeyserVoice。
2. 啟動伺服器一次。
3. 編輯 `plugins/GeyserVoice/config.yml`。
4. 決定是否應啟用 `auto-start`。
5. 確保 `config.voicecraft.transport.login-token` 與 VoiceCraft `McTcpConfig.LoginToken` 相符。
6. 執行 `/voice reload`。
7. 測試遊戲中的綁定流程。

如果 `auto-start` 是 `true`，請確保 `install-directory` 可由 Paper 程序寫入。如果 `auto-start` 是 `false`，請確保外部 VoiceCraft 伺服器已運作且可存取。

## 當 `auto-start` 是個好主意時

- 單一伺服器設定
- 你想要更少的移動部件
- 您尚未使用 systemd / Docker / panel 管理 VoiceCraft

## 當外部運行時更好時

- 您已經集中管理 VoiceCraft
- 您需要不同的重啟策略或日誌記錄
- 您針對一個 VoiceCraft 後端執行多個 Java 節點
- 您希望進程管理器（例如 systemd、Docker 或託管面板）來負責重新啟動

## 故障排除

- 運作時永遠不會準備好：
  增加 `ready-timeout-ms`
- 插件可以手動連接，但不能在啟動時連接：
  檢查 `auto-start` 和 `install-directory`
- 玩家加入但語音資料未綁定：
  驗證令牌、主機、連接埠和綁定流程
- 外部 VoiceCraft 永遠不會看到該插件：
  確認 `McTcpConfig.Enabled = true`、主機綁定、防火牆和 `config.voicecraft.transport.*`
- 客戶端已連接，但 Java 狀態不影響距離感效果：
  檢查`/voice bind`、位置更新間隔、伺服器端定位模式

## 驗證清單

- Paper 日誌顯示 GeyserVoice 已啟用
- VoiceCraft 運作時正在運作或自動啟動
- `McTcpConfig.LoginToken` 匹配 `config.voicecraft.transport.login-token`
- 玩家可以連接 VoiceCraft 用戶端
- 玩家可以完成 `/voice bind <key>`
- 遊戲中的移動會改變距離感行為
