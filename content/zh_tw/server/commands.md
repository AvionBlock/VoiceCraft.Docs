# 伺服器命令

當 `VoiceCraft.Server` 運作時，控制台指令可用於稽核和實體管理。

指令對伺服器端實體 ID 進行操作。首先使用 `list`，找到要影響的實體或連線的用戶端，然後執行特定的稽核或元資料指令。

這些命令在設定、調試和人員審核期間最有用。它們不能替代正確配置 Minecraft 插件或插件。

## 命令工作流程

1. 執行 `list` 或 `list --clientsOnly`。
2. 尋找目標實體或網路用戶端的 ID。
3. 應用命令。
4. 再次執行 `list` 以驗證狀態已變更。

## 基本

- `list [--clientsOnly] [--limit N]`
  列出伺服器目前已知的實體
- `stop`
  停止伺服器
- `shutdown`
  `stop` 的別名
- `kick <id>`
  斷開網路客戶端

當用戶端會話卡住、重複或需要在設定變更後重新連線時，請使用 `kick`。它不會禁止玩家重新連線。

## 客戶端狀態管理

- `mute <id>`
- `unmute <id>`
- `deafen <id>`
- `undeafen <id>`

重要行為：

- 在常規實體上，這些切換實體靜音/失聰狀態
- 在連線的網路用戶端上，伺服器使用專用伺服器端標誌（`ServerMuted`、`ServerDeafened`）

伺服器靜音/失聰對於所有聽眾來說都是權威的。客戶端本地靜音僅影響本地用戶。

## 實體資料管理

- `setname <id> <value>`
- `settitle <id> <value>`
- `setdescription <id> <value>`
- `setposition <id> <x> <y> <z>`
- `setworldid <id> <value>`

注意事項：

- `settitle` 和 `setdescription` 目標網路實體
- `setname`、`setposition` 和 `setworldid` 適用於一般實體
- 空標題/描述值被標準化為空字串

手動實體命令主要用於診斷。在健康的生產設定中，Minecraft 整合應該不斷更新名稱、位置和世界 ID。

## `list` 選項

- `--clientsOnly`
  僅列出已連線的網路用戶端
- `--limit <N>`
  限制顯示的行數

範例：

```text
list --clientsOnly --limit 25
```

## 實用的工作流程

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
- 命令需要網路客戶端但接收非網路實體
- `list --limit` 為負

## 當這些命令有用時

- 測試插件或插件集成
- 修正錯誤的實體元數據
- 員工節制
- 在設定過程中驗證世界 ID 和位置更新

## 設定檢查範例

### 確認客戶端已連接

```text
list --clientsOnly --limit 20
```

如果缺少預期的玩家，請在調試 Minecraft 整合之前檢查用戶端伺服器位址、UDP 連接埠和防火牆規則。

### 確認位置更新正在移動

```text
list --limit 20
```

在遊戲中移動玩家，然後再次執行 `list`。如果位置沒有改變，則問題可能出在插件/插件傳輸路徑中，而不是音訊用戶端。

### 正確的臨時測試元數據

```text
setname 12 TestPlayer
setworldid 12 overworld
setposition 12 100 64 100
```

僅使用此功能來隔離行為。如果整合稍後發送新的更新，它可能會覆蓋您的手動值。

## 安全注意事項

- 不要向普通玩家公開伺服器控制台存取權限。
- 避免使用手動元資料編輯作為長期配置。
- 調試生產事件時保留命令日誌。
- 當值反覆恢復或漂移時，最好修復來源整合。
