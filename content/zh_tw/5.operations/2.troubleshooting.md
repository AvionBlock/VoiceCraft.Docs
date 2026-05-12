# 故障排除

## 伺服器未啟動

檢查：

1. 連接埠尚未被其他進程使用。
2. `ServerProperties.json` is valid JSON.
3. Correct `McHttpConfig.Hostname` format (`http://.../`) and `McWssConfig.Hostname` (`ws://.../`).

## 客戶端無法連接

- 在客戶端確認伺服器IP/連接埠。
- 驗證防火牆和 NAT。
- Ensure `PositioningType` matches on both client and server.

## McHttp 不工作

- Check `McHttpConfig.Enabled = true`.
- Check `LoginToken` used in `/voicecraft:vcconnect` (or `/vcconnect` if alias is supported).
- 確保插件已附加到世界並配置權限。

## McWss 不工作

- Check `McWssConfig.Enabled = true`.
- Run `/connect <host:port>` before `/voicecraft:vcconnect`.
- 驗證令牌。

## 無音訊

- In client, check `Input Device` / `Output Device`.
- Ensure `Mute` / `Deafen` are not enabled.
- Check `InputVolume`, `OutputVolume`, `MicrophoneSensitivity`.
- Run `Microphone Test` and `Test Output`.

## 有用的診斷

- 重新啟動客戶端和伺服器。
- 暫時恢復為預設配置以縮小問題範圍。
- On server, run `list --clientsOnly` and verify players are visible as clients.
