# 常見問題解答

有關 VoiceCraft 的常見問題。

## 每個玩家都需要 VoiceCraft 用戶端應用程式嗎？

是的。玩家需要客戶端應用程式。伺服器本身不使用客戶端應用程式。

## VoiceCraft 可以在行動裝置上運作嗎？

是的。支援 Android 和 iOS。

## VoiceCraft 可以在主機上運作嗎？

如今，無法直接在控制台硬體上作為本機 VoiceCraft 用戶端。

當堆疊的其餘部分配置正確時，控制台玩家仍然可以參與某些伺服器端場景，但直接的本機用戶端支援與桌面或行動裝置不同。

## VoiceCraft 可以在 Realms 上運作嗎？

它可以在有限的場景中工作，特別是在使用客戶端定位時，但 Realms 是一個比專用伺服器更受限制的環境。

## 我該使用哪種交通工具？

- 基岩專用伺服器：
  `McHttp`
- 當地基岩世界：
  `McWss`
- Java + 間歇泉/水閘：
  `McTcp` through `GeyserVoice`

## GeyserVoice 是否需要單獨管理的 VoiceCraft 伺服器？

並非總是如此。

在直接 Paper 模式下，GeyserVoice 可以使用以下命令在背景引導並執行 VoiceCraft 運行時：

- `config.voicecraft.auto-start`
- `shutdown-on-disable`
- `ready-timeout-ms`
- `install-directory`

如果您願意，它還可以指向已運行的外部 VoiceCraft 伺服器。

## 我可以將 VoiceCraft 與 Apex、Aternos 或類似的託管提供者一起使用嗎？

這取決於您的供應商是否允許遊戲伺服器和 VoiceCraft 伺服器之間所需的網路路徑。

範例：

- BDS with `McHttp` needs outbound reachability to the VoiceCraft HTTP endpoint
- Java + GeyserVoice needs reachability to the VoiceCraft `McTcp` endpoint

某些提供者會阻止您所需的確切網路行為。

## 我可以將 VoiceCraft 託管在遊戲伺服器所在的同一台電腦上嗎？

是的。這對於以下情況很常見：

- 本地測試
- 小社區
- 直接 Paper + GeyserVoice 設置

## 我可以只運行一種交通工具嗎？

是的。您可以透過以下方式限制運行時傳輸：

- config toggles in `ServerProperties.json`
- runtime overrides such as `--transport-mode`

## 為什麼即使客戶端已連接，我也聽不到任何人的聲音？

按順序檢查這些：

1.客戶端中正確的VoiceCraft伺服器IP和連接埠
2. matching `PositioningType`
3.正確的Minecraft傳輸令牌
4.成功綁定流程
5. 接收位置和世界更新的實體

## Is `McWss` good for production?

通常不是較大公共環境的首選。

It is best for local worlds, testing, and lightweight setups. `McHttp` is usually a better Bedrock production transport.

## 伺服器靜音和本機靜音有什麼區別？

- 伺服器靜音：
  由目標實體或客戶端的後端強制執行
- 本地靜音：
  stored in a player's `Settings.json` as a personal preference

## 每位使用者音量和本機靜音儲存在哪裡？

In `Settings.json` under `UserSettings.Users`.

## 我使用 Geyser 運行 Java。我還需要基岩插件嗎？

No. In Java + Geyser topologies, the bridge is typically `GeyserVoice`, not the Bedrock addon.
