# 用于基岩专用服务器的 McHttp

`McHttp` is the recommended VoiceCraft integration mode for BDS.

## Why `McHttp` is recommended

- 更适合专用服务器环境
- 比基于命令隧道的设置更简单
- 在生产中更容易推理
- aligns well with the Bedrock addon package `VoiceCraft.Addon.Core.McHttp`

## 要求

1. Running `VoiceCraft.Server`
2. `McHttpConfig.Enabled = true`
3. `VoiceCraft.Addon.Core.McHttp.zip` from releases, or a ready world archive from the [Addon Configurator](/addon-configurator)
4. BDS具有所需模块和脚本API支持

## 服务器端 VoiceCraft 配置

最小的例子：

```json
{
  "McHttpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-token",
    "Hostname": "http://0.0.0.0:9050/",
    "MaxClients": 10,
    "MaxTimeoutMs": 10000,
    "DisabledPacketTypes": []
  }
}
```

重要：

- 使用真实的代币，切勿将生成的代币保留在生产环境中
- 确保BDS主机可以到达配置的端点

## 插件安装

最快路径：

- [插件配置器](/addon-configurator) 如果您想要一个可立即解压的世界存档
- [下载页面](/download) 如果您想要原始插件发布包

手动路径：

1. Extract `VoiceCraft.Addon.Core.McHttp.zip`.
2. Put `RP` into `<MCServer>/resource_packs/`.
3. Put `BP` into `<MCServer>/behavior_packs/`.

## 模块权限

Open `<MCServer>/config/default/permissions.json` and ensure it contains the required modules:

```json
{
  "allowed_modules": [
    "@minecraft/server-gametest",
    "@minecraft/server",
    "@minecraft/server-ui",
    "@minecraft/server-admin",
    "@minecraft/server-editor",
    "@minecraft/server-net"
  ]
}
```

## 将包附加到世界上

In `<MCServer>/worlds/<YourWorld>/world_behavior_packs.json`:

```json
{
  "pack_id": "71ebb3ba-e9db-4546-9520-05f20b17dcb6",
  "version": [1, 6, 0]
}
```

In `world_resource_packs.json`:

```json
{
  "pack_id": "30b512be-77d1-4a61-bdb7-6c2f4062f889",
  "version": [1, 0, 0]
}
```

## 在游戏中连接

运行：

```text
/voicecraft:vcconnect "http://<VOICECRAFT_HOST>:<PORT>" <LOGIN_TOKEN>
```

例子：

```text
/voicecraft:vcconnect "http://127.0.0.1:9050" e4ad1f7e-4f90-4b21-bc15-6febe580bf1c
```

Use the token from `McHttpConfig.LoginToken`.

## 连接后会发生什么

连接成功后：

- 该插件通过 VoiceCraft 进行身份验证
- 世界可以通过McApi创建/更新实体
- bind flow becomes available through `voicecraft:vcbind`
- 效果 UI 和数据包驱动的状态同步变得可用

## 推荐的验证流程

1. connect the world with `vcconnect`
2.确认没有显示验证错误
3.让VoiceCraft实体出现
4. use `voicecraft:vcbind <key>`
5. 确认玩家已绑定且在 VoiceCraft 中可见

## 常见问题

- `HttpListenerException` on Windows:
  you may need `netsh http add iplisten 127.0.0.1`
- 容器或虚拟机网络：
  use `http://0.0.0.0:9050/` or the correct LAN address
- 托管提供商阻止来自 BDS 的出站 HTTP：
  该交通工具可能无法在那里使用

## 继续阅读

- [VoiceCraft.Addon](/ecosystem/voicecraft-addon)
- [插件 API](/ecosystem/addon-api)
- [下载页面](/download)
- [插件配置器](/addon-configurator)
