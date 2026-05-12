# 故障排除

## 服务器未启动

检查：

1. 端口尚未被其他进程使用。
2. `ServerProperties.json` is valid JSON.
3. Correct `McHttpConfig.Hostname` format (`http://.../`) and `McWssConfig.Hostname` (`ws://.../`).

## 客户端无法连接

- 在客户端确认服务器IP/端口。
- 验证防火墙和 NAT。
- Ensure `PositioningType` matches on both client and server.

## McHttp 不工作

- Check `McHttpConfig.Enabled = true`.
- Check `LoginToken` used in `/voicecraft:vcconnect` (or `/vcconnect` if alias is supported).
- 确保插件已附加到世界并配置权限。

## McWss 不工作

- Check `McWssConfig.Enabled = true`.
- Run `/connect <host:port>` before `/voicecraft:vcconnect`.
- 验证令牌。

## 无音频

- In client, check `Input Device` / `Output Device`.
- Ensure `Mute` / `Deafen` are not enabled.
- Check `InputVolume`, `OutputVolume`, `MicrophoneSensitivity`.
- Run `Microphone Test` and `Test Output`.

## 有用的诊断

- 重新启动客户端和服务器。
- 暂时恢复为默认配置以缩小问题范围。
- On server, run `list --clientsOnly` and verify players are visible as clients.
