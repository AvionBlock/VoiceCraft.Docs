# 更新与备份

本页用于拓扑基本不变的常规更新。若涉及协议、拓扑或桥接插件的大改，请使用[升级运行手册](/operations/upgrade-runbook)。

VoiceCraft `1.7.0` 不是单纯补丁。服务器、客户端、Bedrock addon 和 Java bridge 应一起升级到 `1.7.x`。

## 1.7.0 变更

- 重写 audio effect pipeline，每个 entity 使用独立 processor
- 使用 custom entity properties 覆盖效果参数
- event flow 改为 `EventRequest`
- `SetProperty` / `OnEntityPropertyUpdated` 取代旧 cave/muffle factor 路径
- 通过 `OpenPort.Net` 支持 NAT port mapping
- iOS sample-rate 修复和 Apple privacy manifest
- 依赖更新、Android version `17`、release pipeline
- 移除 browser/web client

客户端和服务器应保持相同 `Major.Minor`。`1.7.x` 客户端应连接 `1.7.x` 服务器。

## 更新前备份

- `config/ServerProperties.json`
- 自定义启动脚本、systemd、容器或面板配置
- 需要保留的日志
- GeyserVoice 或其他 Java bridge 配置
- Bedrock world pack 配置
- host、port、firewall、port forwarding 记录

## 安全更新服务器

1. 停止 `VoiceCraft.Server`。
2. 备份整个 `config/`。
3. 将 `1.7.0` 解压到新目录。
4. 复制 `ServerProperties.json`。
5. 检查新的 NAT port mapping 字段。
6. 启动服务器并检查日志。
7. 验证所有启用的 transport。
8. 先连接一个客户端和一个 Minecraft integration。

## 配置迁移

`1.7.0` 新增：

- `AutoOpenPort`
- `ExternalPort`
- `PortMappingLifetimeMinutes`
- `PortMappingTimeoutSeconds`

`AutoOpenPort` 默认是 `false`。如果端口由 firewall、reverse proxy、tunnel、Docker、面板或服务商管理，请保持关闭。

## Addon 与 bridge

与服务器一起更新匹配的 addon/bridge 包。使用旧 cave/muffle packets 的自定义代码应迁移到 `SetProperty` 和 `OnEntityPropertyUpdated`。

## 客户端

检查：

- 麦克风和输出设备
- 保存的服务器
- push-to-talk
- `Positioning Type`
- iOS 录音，尤其是旧版本有 sample-rate 问题时

`1.7.0` 已移除 browser/web client。请使用原生桌面或移动客户端。
