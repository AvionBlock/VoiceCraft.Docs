# 服务器命令

当 `VoiceCraft.Server` 运行时，控制台命令可用于审核和实体管理。

命令对服务器端实体 ID 进行操作。首先使用 `list`，找到要影响的实体或连接的客户端，然后运行特定的审核或元数据命令。

这些命令在设置、调试和人员审核期间最有用。它们不能替代正确配置 Minecraft 插件或插件。

## 命令工作流程

1. 运行 `list` 或 `list --clientsOnly`。
2. 查找目标实体或网络客户端的 ID。
3. 应用命令。
4. 再次运行 `list` 以验证状态已更改。

## 基本

- `list [--clientsOnly] [--limit N]`
  列出服务器当前已知的实体
- `stop`
  停止服务器
- `shutdown`
  `stop` 的别名
- `kick <id>`
  断开网络客户端

当客户端会话卡住、重复或需要在配置更改后重新连接时，请使用 `kick`。它不会禁止玩家重新连接。

## 客户端状态管理

- `mute <id>`
- `unmute <id>`
- `deafen <id>`
- `undeafen <id>`

重要行为：

- 在常规实体上，这些切换实体静音/失聪状态
- 在连接的网络客户端上，服务器使用专用服务器端标志（`ServerMuted`、`ServerDeafened`）

服务器静音/失聪对于所有听众来说都是权威的。客户端本地静音仅影响本地用户。

## 实体数据管理

- `setname <id> <value>`
- `settitle <id> <value>`
- `setdescription <id> <value>`
- `setposition <id> <x> <y> <z>`
- `setworldid <id> <value>`

注意事项：

- `settitle` 和 `setdescription` 目标网络实体
- `setname`、`setposition` 和 `setworldid` 适用于一般实体
- 空标题/描述值被标准化为空字符串

手动实体命令主要用于诊断。在健康的生产设置中，Minecraft 集成应该不断更新名称、位置和世界 ID。

## `list` 选项

- `--clientsOnly`
  仅列出已连接的网络客户端
- `--limit <N>`
  限制显示的行数

示例：

```text
list --clientsOnly --limit 25
```

## 实用的工作流程

```text
list --clientsOnly
setworldid 12 spawn_world
setposition 12 100 64 100
mute 15
kick 18
```

## 失败案例

服务器在以下情况下返回错误：

- 实体ID不存在
- 命令需要网络客户端但接收非网络实体
- `list --limit` 为负

## 当这些命令有用时

- 测试插件或插件集成
- 纠正错误的实体元数据
- 员工节制
- 在设置过程中验证世界 ID 和位置更新

## 设置检查示例

### 确认客户端已连接

```text
list --clientsOnly --limit 20
```

如果缺少预期的玩家，请在调试 Minecraft 集成之前检查客户端服务器地址、UDP 端口和防火墙规则。

### 确认位置更新正在移动

```text
list --limit 20
```

在游戏中移动玩家，然后再次运行 `list`。如果位置没有改变，则问题可能出在插件/插件传输路径中，而不是音频客户端。

### 正确的临时测试元数据

```text
setname 12 TestPlayer
setworldid 12 overworld
setposition 12 100 64 100
```

仅使用此功能来隔离行为。如果集成稍后发送新的更新，它可能会覆盖您的手动值。

## 安全注意事项

- 不要向普通玩家公开服务器控制台访问权限。
- 避免使用手动元数据编辑作为长期配置。
- 调试生产事件时保留命令日志。
- 当值反复恢复或漂移时，最好修复源集成。
