# GeyserVoice Direct Paper 指南

當一台 Paper / Folia 伺服器應直接與 VoiceCraft 對話時，請使用此模式。

## 兩種運行方式

### 選項 A：外部 VoiceCraft 伺服器

You already run `VoiceCraft.Server` somewhere and point GeyserVoice at it.

### 選項 B：外掛程式管理的運行時

GeyserVoice 可以為您引導 VoiceCraft：

- 下載運行時
- 安裝運行時
- 啟動運行時
- 等待準備就緒
- 可選擇使用外掛程式停止runtime

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
    host: "127.0.0.1"
    port: 9050
    login-token: "replace-with-token"
    auto-start: true
    shutdown-on-disable: true
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

## 設定步驟

1. 在 Paper 上安裝 GeyserVoice。
2. 啟動一次伺服器。
3. Edit `plugins/GeyserVoice/config.yml`.
4. Decide whether `auto-start` should be enabled.
5. Ensure the `login-token` matches VoiceCraft `McTcpConfig.LoginToken`.
6. Run `/voice reload`.
7.測試遊戲中的綁定流程。

## When `auto-start` is a good idea

- 單一伺服器設定
- 你想要更少的移動部件
- 您尚未使用 systemd / Docker / panel 管理 VoiceCraft

## 當外部runtime更好時

- 您已專注於管理 VoiceCraft
- 您想要不同的重新啟動策略或日誌記錄
- 您針對一個 VoiceCraft 後端執行多個 Java 節點

## 故障排除

- runtime永遠不會準備好：
  increase `ready-timeout-ms`
- 插件可以手動連接，但在啟動時不能連接：
  check `auto-start` and `install-directory`
- 玩家加入但語音資料不綁定：
  驗證令牌、主機、連接埠和綁定流
