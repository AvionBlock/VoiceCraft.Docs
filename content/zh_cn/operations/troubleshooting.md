# 故障排除

首先确定堆栈的哪一部分出现故障。 VoiceCraft 具有独立的客户端、服务器和 Minecraft 传输路径，因此一个部分可以工作，而另一个部分仍然损坏。

推荐顺序：

1. 确认 `VoiceCraft.Server` 干净启动。
2. 确认 VoiceCraft 客户端可以连接到 UDP 端点。
3. 确认 Minecraft 端传输已通过身份验证。
4. 确认绑定流程完成。
5. 确认位置/世界更新会改变距离感行为。
6. 然后才能调整麦克风、音量、效果或自定义插件逻辑。

## 服务器未启动

检查：

1. `config/ServerProperties.json` 是有效的 JSON。
2. 没有其他进程正在使用配置的端口。
3. `McHttpConfig.Hostname` 使用 `http://.../`。
4. `McWssConfig.Hostname` 使用 `ws://.../`。
5. `McTcpConfig.Hostname` 是一个普通主机，而不是 URI。
6. 运行时覆盖不会替换预期的配置值。

如果服务器由 systemd、Docker、面板或 GeyserVoice 自动启动管理，请检查启动参数以及 JSON 文件。

## 客户端无法连接

检查：

- 客户端中的服务器地址指向`VoiceCraftConfig.Port`
- 服务器进程正在运行
- 允许 UDP 流量通过防火墙/NAT
- 来自玩家网络的公共地址是正确的
- `MaxClients` 未耗尽

`PositioningType` 通常不会阻止原始连接，但不匹配可能会导致客户端连接后距离感行为看起来已损坏。

## Minecraft 传输无法连接

检查：

- 您正在使用的传输已启用
- 插件/插件使用匹配的令牌
- 可以从 Minecraft 运行时访问端点
- 主机绑定对于本地部署和远程部署都是正确的
- 传输类型与集成相匹配

示例：

- BDS 插件使用 `McHttpConfig.LoginToken`
- 本地 Bedrock 世界使用 `McWssConfig.LoginToken`
- GeyserVoice 使用 `McTcpConfig.LoginToken`

## McHttp 不工作

- 检查 `McHttpConfig.Enabled = true`。
- 检查 `McHttpConfig.Hostname`。
- 检查 `/voicecraft:vcconnect` 中使用的令牌。
- 确保插件行为/资源包附加到世界。
- 确保 BDS 模块权限允许所需的脚本/网络功能。
- 如果 BDS 是远程的，请勿使用 `127.0.0.1`，除非 VoiceCraft 位于同一主机上。

## McWss 不工作

- 检查 `McWssConfig.Enabled = true`。
- 在 `/voicecraft:vcconnect` 之前运行 `/connect <host:port>`。
- 使用 `McWssConfig.LoginToken`。
- 确认 `DataTunnelCommand` 与插件包匹配。
- 如果命令隧道不稳定，则减少 `CommandsPerTick`。

## Geyser语音无法正常工作

- 检查 `McTcpConfig.Enabled = true`。
- 检查 `config.voicecraft.transport.host`。
- 检查 `config.voicecraft.transport.port`。
- 检查 `config.voicecraft.transport.login-token`。
- 确认直接 Paper 与代理模式是有意为之。
- 如果启用 `auto-start`，请确认托管运行时在超时之前准备就绪。

## 无音频

首先检查本地客户端状态：

- 选定的输入设备
- 选定的输出设备
- 静音/失聪状态
- 一键通状态
- 输入/输出音量
- 麦克风灵敏度
- 麦克风测试和输出测试

然后检查服务器/Minecraft 状态：

- 客户端出现在 `list --clientsOnly` 中
- 绑定流程完成
- 实体有一个世界 ID 和不断变化的位置
- `PositioningType` 匹配客户端和服务器
- 服务器没有使实体静音/失聪

## 有用的诊断

- 在服务器上，运行 `list --clientsOnly` 来验证连接的客户端。
- 在游戏中移动之前和之后运行 `list` 以查看实体位置是否发生变化。
- 暂时禁用自定义插件数据包挂钩。
- 令牌或主机更改后重新连接 Minecraft 传输。
- 将当前配置与上次已知良好的备份进行比较。

有关基于症状的检查，请参阅 [Troubleshooting Matrix](/operations/troubleshooting-matrix)。
