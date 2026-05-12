# 升級 Runbook

Use this when upgrading VoiceCraft or a related bridge such as `GeyserVoice`.

## 升級順序

推薦順序：

1.備份配置
2. 單獨暫存新的二進位文件
3.階段匹配插件或插件包
4. 閱讀傳輸和拓樸假設
5.停止舊服務
6.將配置移至新安裝中
7.更新Minecraft端的addon/plugin
8.啟動並驗證

For VoiceCraft `v1.6.1`, do not leave the old Bedrock addon in place. Update the addon together with the client/server release before validating bind flow and in-game indicators.

## 為什麼單獨的目錄有幫助

單獨提取的目錄使回滾更容易，因為：

- 舊的二進位檔案仍然完好無損
- 配置遷移是明確的
- 您可以比較發布佈局

## 升級後驗證

至少：

1. VoiceCraft 啟動
2. 傳輸連接埠綁定
3.客戶端連接
4. 插件或插件驗證
5. 綁定流程工作
6.遊戲內語音圖示或外掛事件如預期出現
7. 接近音訊工作原理

## 如果升級 GeyserVoice

還驗證：

- 運行時自動啟動行為
- 代理所有權模式
- 後端快照轉發

## 回滾觸發器範例

在以下情況下考慮回滾：

- 先前工作的令牌的身份驗證突然失敗
- 傳輸不再按預期綁定
- 外掛程式管理的運行時永遠不會準備好
- 跨伺服器代理語音狀態變得不一致
