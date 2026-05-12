# 託管注意事項

不同的供應商和部署風格會影響 VoiceCraft 拓撲的實際情況。

## 基岩主機

`McHttp` is usually the best Bedrock transport, but only if the BDS node can reach the VoiceCraft endpoint.

常見的攔截器：

- 出站 HTTP 限制
- 缺少模組權限
- 腳本支援受到限制的世界

## 共享託管提供者

有些提供者不允許：

- 自訂監聽器
- 來自遊戲伺服器的出站 HTTP
- 額外的 sidecar 進程

在這些環境中，技術上支援的拓撲在操作上可能仍然受阻。

## 類似 Aternos 的限制

在嚴格限制的託管中，HTTP 樣式的通訊可能會被阻止或不切實際。

當這種情況發生時：

- Bedrock BDS + `McHttp` may not be viable
- 本地世界或客戶端替代方案可能是唯一的路徑

## Docker 和容器注意事項

容器有助於隔離，但您仍然需要：

- 港口出版
- 穩定的捲安裝配置
- 正確的跨容器網絡

## 反向代理

VoiceCraft 傳輸並非全是反向代理形狀的：

- `McHttp` can fit HTTP tooling more naturally
- `McTcp` is raw TCP
- `McWss` behaves differently from plain HTTP

不要假設一種入口策略適用於所有這些策略。

## Java 網路注意事項

For `GeyserVoice` proxy deployments:

- 代理商必須可靠地到達 VoiceCraft
- 後端Paper節點必須可靠地到達代理訊息路徑
- 所有權模式必須保持清晰

如果代理商不能乾淨地擁有網橋，拓樸就會變得脆弱。
