# 更新和备份

使用此页面进行例行更新，您希望拓扑保持不变。对于较大的版本跳转或拓扑更改，请使用 [Upgrade Runbook](/operations/upgrade-runbook)。

## 更新前要备份什么

- `config/ServerProperties.json`
- 自定义脚本/systemd 或服务管理器包装器
- 如果需要的话记录历史记录
- GeyserVoice `config.yml` 如果使用 Java 端集成
- 如果使用插件，则基岩世界包配置
- 公共/LAN 主机名和开放端口的注释

备份包含令牌和拓扑详细信息。将它们存储为敏感操作文件。

## 安全服务器更新

1. 停止服务器（`stop` 或通过服务管理器）。
2. 备份 `config/`。
3. 将新版本提取到单独的目录中。
4. 移动您的 `ServerProperties.json`。
5. 启动并验证启动日志。
6. 确认所选传输绑定成功。
7. 在向所有玩家开放之前，先连接一个客户端和一个 Minecraft 端集成。

## VoiceCraft 1.6.1 注释

VoiceCraft `v1.6.1` 需要在更新客户端/服务器二进制文件的同时更新 Bedrock 插件包。该版本修复了 McHttp/McWss 断开连接处理，并针对游戏内语音图标、自动连接生活质量和广播事件进行了插件端更改。

## 安全客户端更新

客户端设置 (`Settings.json`) 存储在 `ApplicationData/voicecraft` 中，因此它们通常在二进制更新后仍然存在。

还是请小测试组验证一下：

- 麦克风选择
- 输出设备
- 保存的服务器条目
- 即按即说行为
- `Positioning Type`

## 兼容性

- 客户端和服务器 `Major/Minor` 版本应匹配。
- 补丁版本可能有所不同。
- 当发行说明提到插件端行为时，基岩插件包应与服务器/客户端版本匹配。
- 使用 Java 端桥时，应使用其匹配的配置期望来更新 GeyserVoice。

如果更新后出现问题，请从 [Troubleshooting](/operations/troubleshooting) 开始。

## 回滚准备

替换文件之前，请保留：

- 上一个服务器二进制目录
- 以前的插件/插件包
- 以前的配置备份
- 最后已知的正确令牌和端口注释

当旧目录仍然存在并且更新没有覆盖它时，回滚会容易得多。
