# 升级运行手册

升级 VoiceCraft 或 `GeyserVoice` 等 bridge 时使用本页。

VoiceCraft `1.7.0` 修改了 event 和 entity-property 模型，因此需要同时验证 server、client、Bedrock addon 和 Java plugin。

## 顺序

1. 备份 config 和 plugin/addon 文件。
2. 在单独目录准备新 binaries。
3. 准备匹配的 addon/plugin 包。
4. 阅读 packets、properties、transports 的 release notes。
5. 停止旧 service。
6. 将 config 复制到新安装。
7. 检查 `ServerProperties.json` 的 port mapping 字段。
8. 更新 Minecraft 侧 addon/plugin。
9. 逐个路径测试。

## 1.7 检查项

- server 显示 `1.7.0`
- VoiceCraft UDP endpoint 成功 bind
- McHttp、McTcp 或 McWss 成功 bind
- NAT port mapping 明确开启或关闭
- `1.7.x` client 能连接
- Minecraft integration 能认证
- bind flow 正常
- position、rotation、world ID、mute/deafen、bitmasks 正常更新
- 使用 effect overrides 时 entity properties 正常

## Event/property migration

Event wrappers:

- `VcEventRequestPacket`
- `McApiEventRequestPacket`

Property packets:

- `VcSetPropertyRequestPacket`
- `VcOnEntityPropertyUpdatedPacket`
- `McApiSetEntityPropertyRequestPacket`
- `McApiOnEntityPropertyUpdatedPacket`

支持值：`null`、`bool`、整数类型、`float`、`double`。

旧 cave/muffle factor 路径已移除，请使用 properties 表示效果参数。

## Rollback

1. 停止新 service。
2. 恢复旧 binaries。
3. 恢复旧 config。
4. 恢复旧 addon/plugin。
5. 启动旧版本。
6. 验证 client、auth、bind、proximity。
