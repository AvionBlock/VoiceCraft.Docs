# 伺服器命令

While `VoiceCraft.Server` is running, console commands are available for moderation and entity management.

## 基礎

- `list [--clientsOnly] [--limit N]`
  列出伺服器目前已知的實體
- `stop`
  停止伺服器
- `shutdown`
  alias of `stop`
- `kick <id>`
  斷開網路客戶端

## 客戶端狀態管理

- `mute <id>`
- `unmute <id>`
- `deafen <id>`
- `undeafen <id>`

重要行為：

- 在常規實體上，這些切換實體靜音/失聰狀態
- on connected network clients, the server uses the dedicated server-side flags (`ServerMuted`, `ServerDeafened`)

## 實體資料管理

- `setname <id> <value>`
- `settitle <id> <value>`
- `setdescription <id> <value>`
- `setposition <id> <x> <y> <z>`
- `setworldid <id> <value>`

注意事項：

- `settitle` and `setdescription` target network entities
- `setname`, `setposition`, and `setworldid` work on general entities
- 空標題/描述值被標準化為空字串

## `list` options

- `--clientsOnly`
  僅列出已連線的網路用戶端
- `--limit <N>`
  限制顯示的行數

範例：

```text
list --clientsOnly --limit 25
```

## 實際工作流程

```text
list --clientsOnly
setworldid 12 spawn_world
setposition 12 100 64 100
mute 15
kick 18
```

## 失敗案例

伺服器在以下情況下傳回錯誤：

- 實體ID不存在
- 指令需要網路用戶端但接收非網路實體
- `list --limit` is negative

## 這些命令何時有用

- 測試插件或插件集成
- 修正錯誤的實體元數據
- 員工節制
- 在設定過程中驗證世界 ID 和位置更新
