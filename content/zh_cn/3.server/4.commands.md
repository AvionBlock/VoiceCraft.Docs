# 服务器命令

While `VoiceCraft.Server` is running, console commands are available for moderation and entity management.

## 基础

- `list [--clientsOnly] [--limit N]`
  列出服务器当前已知的实体
- `stop`
  停止服务器
- `shutdown`
  alias of `stop`
- `kick <id>`
  断开网络客户端

## 客户端状态管理

- `mute <id>`
- `unmute <id>`
- `deafen <id>`
- `undeafen <id>`

重要行为：

- 在常规实体上，这些切换实体静音/失聪状态
- on connected network clients, the server uses the dedicated server-side flags (`ServerMuted`, `ServerDeafened`)

## 实体数据管理

- `setname <id> <value>`
- `settitle <id> <value>`
- `setdescription <id> <value>`
- `setposition <id> <x> <y> <z>`
- `setworldid <id> <value>`

注意事项：

- `settitle` and `setdescription` target network entities
- `setname`, `setposition`, and `setworldid` work on general entities
- 空标题/描述值被标准化为空字符串

## `list` options

- `--clientsOnly`
  仅列出已连接的网络客户端
- `--limit <N>`
  限制显示的行数

示例：

```text
list --clientsOnly --limit 25
```

## 实际工作流程

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
- `list --limit` is negative

## 这些命令何时有用

- 测试插件或插件集成
- 纠正错误的实体元数据
- 员工节制
- 在设置过程中验证世界 ID 和位置更新
