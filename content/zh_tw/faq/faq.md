# 常見問題解答

有關 VoiceCraft 的常見問題。

## 是否每個玩家都需要 VoiceCraft 用戶端應用程式？

是的。玩家需要客戶端應用程式。伺服器本身不使用客戶端應用程式。

客戶端捕捉麥克風輸入並播放附近的語音音訊。 Minecraft 外掛程式或外掛程式僅提供遊戲狀態，例如玩家位置和綁定資料。

## VoiceCraft 可以在行動裝置上運作嗎？

是的。支援 Android 和 iOS。

行動用戶仍然需要可存取的 VoiceCraft 伺服器端點和麥克風權限。

## VoiceCraft 可以在主機上運作嗎？

如今，無法直接在控制台硬體上作為本機 VoiceCraft 用戶端。

當堆疊的其餘部分配置正確時，控制台玩家仍然可以參與某些伺服器端場景，但直接的本機用戶端支援與桌面或行動裝置不同。

## VoiceCraft 可以在 Realms 上使用嗎？

它可以在有限的場景中工作，特別是在使用客戶端定位時，但 Realms 是一個比專用伺服器更受限制的環境。

如果您想要可預測的生產設置，請使用帶有 `McHttp` 的 BDS 或帶有 `GeyserVoice` 的 Java/Geyser 拓撲。

## 我該使用哪種交通工具？

- 基岩專用伺服器：
  `McHttp`
- 當地基岩世界：
  `McWss`
- Java + Geyser/水閘：
  `McTcp` 到 `GeyserVoice`

此傳輸用於 Minecraft 端狀態。播放器用戶端仍連接到 VoiceCraft UDP 端點。

## GeyserVoice 是否需要單獨管理的 VoiceCraft 伺服器？

並非總是如此。

在直接 Paper 模式下，GeyserVoice 可以使用以下命令在背景引導並執行 VoiceCraft 運行時：

- `config.voicecraft.auto-start`
- `config.voicecraft.shutdown-on-disable`
- `config.voicecraft.ready-timeout-ms`
- `config.voicecraft.install-directory`

如果您願意，它還可以指向已運行的外部 VoiceCraft 伺服器。

在目前設定中，外部連接值位於 `config.voicecraft.transport.*` 下。

## 我可以將 VoiceCraft 與 Apex、Aternos 或類似的託管提供者一起使用嗎？

這取決於您的供應商是否允許遊戲伺服器和 VoiceCraft 伺服器之間所需的網路路徑。

範例：

- 具有 `McHttp` 的 BDS 需要出站可存取 VoiceCraft HTTP 端點
- Java + GeyserVoice 需要可存取 VoiceCraft `McTcp` 端點

某些提供者會阻止您所需的確切網路行為。

在購買託管之前，請詢問是否允許自訂 UDP 連接埠、出站 HTTP/TCP、sidecar 進程和所需的 Bedrock 腳本模組。

## 我可以在遊戲伺服器所在的同一台電腦上託管 VoiceCraft 嗎？

是的。這對於以下情況很常見：

- 本地測試
- 小社區
- 直接 Paper + GeyserVoice 設置

只有當消費者真正在同一台機器上運作時才使用環回位址，例如`127.0.0.1`。

## 我可以只運行一種交通工具嗎？

是的。您可以透過以下方式限制運行時傳輸：

- `ServerProperties.json` 中的配置切換
- 運行時覆蓋，例如 `--transport-mode`

建議用於生產。僅公開您的拓撲使用的傳輸。

## 即使客戶端已連接，為什麼我聽不到任何人的聲音？

按順序檢查這些：

1. 客戶端中正確的 VoiceCraft 伺服器 IP 和連接埠
2. 匹配 `PositioningType`
3. 正確的 Minecraft 運輸令牌
4. 成功綁定流程
5. 接收位置和世界更新的實體

如果 `list --clientsOnly` 顯示播放器，但 `list` 不會顯示更改的實體位置，請偵錯 Minecraft 整合而不是麥克風設定。

## `McWss` 適合生產嗎？

通常不是較大公共環境的首選。

它最適合本地世界、測試和輕量級設定。 `McHttp` 通常是較好的基岩生產運輸。

## 伺服器靜音和本地靜音有什麼區別？

- 伺服器靜音：
  由目標實體或客戶端的後端強制執行
- 本地靜音：
  以個人偏好儲存在玩家的 `Settings.json` 中

## 每個用戶的音量和本地靜音儲存在哪裡？

在 `UserSettings.Users` 下的 `Settings.json` 中。

## 我用 Geyser 運行 Java。我還需要基岩插件嗎？

不會。在 Java + Geyser 拓撲中，橋通常是 `GeyserVoice`，而不是 Bedrock 插件。

使用基岩世界/BDS 的基岩插件。當 Java 端基礎架構是玩家狀態的來源時，請使用 GeyserVoice。

## VoiceCraft 是第三方託管語音服務嗎？

不需要。 VoiceCraft 不需要第三方託管服務。您可以自行執行伺服器/執行時，或讓 GeyserVoice 在直接 Paper 模式下管理執行時。

## VoiceCraft 只是 Minecraft 的模組嗎？

不。 VoiceCraft 是用戶端應用程式、伺服器執行時間、Bedrock 外掛程式包和 Java 端橋接工具的集合。工作設定需要適合您的拓撲的正確組合。
