# 故障排除

首先確定堆疊的哪一部分出現故障。 VoiceCraft 具有獨立的用戶端、伺服器和 Minecraft 傳輸路徑，因此一個部分可以工作，而另一個部分仍然損壞。

推薦順序：

1. 確認 `VoiceCraft.Server` 乾淨啟動。
2. 確認 VoiceCraft 用戶端可以連線到 UDP 端點。
3. 確認 Minecraft 端傳輸已通過身份驗證。
4. 確認綁定流程完成。
5. 確認位置/世界更新會改變接近行為。
6. 然後才能調整麥克風、音量、效果或自訂插件邏輯。

## 伺服器未啟動

檢查：

1. `config/ServerProperties.json` 是有效的 JSON。
2. 沒有其他進程正在使用配置的連接埠。
3. `McHttpConfig.Hostname` 使用 `http://.../`。
4. `McWssConfig.Hostname` 使用 `ws://.../`。
5. `McTcpConfig.Hostname` 是一個普通主機，而不是 URI。
6. 運行時覆蓋不會取代預期的配置值。

如果伺服器由 systemd、Docker、面板或 GeyserVoice 自動啟動管理，請檢查啟動參數以及 JSON 檔案。

## 客戶端無法連接

檢查：

- 用戶端中的伺服器位址指向`VoiceCraftConfig.Port`
- 伺服器進程正在運行
- 允許 UDP 流量通過防火牆/NAT
- 來自玩家網路的公共位址是正確的
- `MaxClients` 未耗盡

`PositioningType` 通常不會阻止原始連接，但不匹配可能會導致客戶端連接後鄰近行為看起來已損壞。

## Minecraft 運送無法連接

檢查：

- 您正在使用的傳輸已啟用
- 插件/插件使用匹配的令牌
- 可以從 Minecraft 運行時存取端點
- 主機綁定對於本機部署和遠端部署都是正確的
- 傳輸類型與整合相匹配

範例：

- BDS 外掛程式使用 `McHttpConfig.LoginToken`
- 本地 Bedrock 世界使用 `McWssConfig.LoginToken`
- GeyserVoice 使用 `McTcpConfig.LoginToken`

## McHttp 不工作

- 檢查 `McHttpConfig.Enabled = true`。
- 檢查 `McHttpConfig.Hostname`。
- 檢查 `/voicecraft:vcconnect` 中使用的令牌。
- 確保插件行為/資源包附加到世界。
- 確保 BDS 模組權限允許所需的腳本/網路功能。
- 如果 BDS 是遠端的，請勿使用 `127.0.0.1`，除非 VoiceCraft 位於同一主機上。

## McWss 不工作

- 檢查 `McWssConfig.Enabled = true`。
- 在 `/voicecraft:vcconnect` 之前執行 `/connect <host:port>`。
- 使用 `McWssConfig.LoginToken`。
- 確認 `DataTunnelCommand` 與插件包相符。
- 如果指令隧道不穩定，則減少 `CommandsPerTick`。

## Geyser語音無法正常運作

- 檢查 `McTcpConfig.Enabled = true`。
- 檢查 `config.voicecraft.transport.host`。
- 檢查 `config.voicecraft.transport.port`。
- 檢查 `config.voicecraft.transport.login-token`。
- 確認直接 Paper 與代理模式是有意為之。
- 如果啟用 `auto-start`，請確認託管執行時間在逾時之前已準備就緒。

## 無音訊

首先檢查本機客戶端狀態：

- 選定的輸入設備
- 選定的輸出設備
- 靜音/失聰狀態
- 一鍵通狀態
- 輸入/輸出音量
- 麥克風靈敏度
- 麥克風測試和輸出測試

然後檢查伺服器/Minecraft 狀態：

- 用戶端出現在 `list --clientsOnly` 中
- 綁定流程完成
- 實體有一個世界 ID 和不斷變化的位置
- `PositioningType` 匹配客戶端和伺服器
- 伺服器沒有使實體靜音/失聰

## 有用的診斷

- 在伺服器上，執行 `list --clientsOnly` 來驗證連線的客戶端。
- 在遊戲中移動之前和之後執行 `list` 以查看實體位置是否有變更。
- 暫時停用自訂插件資料包掛鉤。
- 令牌或主機變更後重新連接 Minecraft 傳輸。
- 將目前配置與上次已知良好的備份進行比較。

有關基於症狀的檢查，請參閱 [Troubleshooting Matrix](/operations/troubleshooting-matrix)。
