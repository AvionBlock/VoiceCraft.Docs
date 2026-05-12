# 故障排除矩陣

當您需要基於症狀的診斷而不是通用檢查表時，請使用此頁面。

## 症狀：客戶端已連接，但沒有人聽到任何聲音

檢查：

1. `PositioningType` match
2.綁定流程完成
3.實體接收世界和位置更新
4. 客戶沒有局部靜音或耳聾
5.伺服器沒有使實體靜音或震耳欲聾

## 症狀：插件已連接，但綁定無法正常工作

檢查：

1. token正確
2. 期望的實體被創建
3.玩家使用了正確的綁定金鑰
4.綁定腳本事件正在觸發

## 症狀：GeyserVoice 已安裝，但 Java 端橋永遠無法使用

檢查：

1. `McTcp` is enabled on VoiceCraft
2. `host`, `port`, and `login-token` match
3. 故意配置直接模式與代理模式
4. if `auto-start` is enabled, the runtime becomes ready within timeout

## 症狀：Direct Paper 模式在手動重新連接後有效，但在啟動時無效

檢查：

1. `config.voicecraft.auto-start`
2. `install-directory`
3. `ready-timeout-ms`
4.運行時進程的啟動所有權

## 症狀：代理模式在一個後端有效，但在伺服器切換時中斷

檢查：

1.代理是真相來源
2. 後端節點不嘗試擁有 VoiceCraft 連接
3.快照轉送在交換器之間保持完整
4.世界ID命名空間邏輯保持一致

## Symptom: `McWss` is unstable

檢查：

1. `CommandsPerTick`
2. `MaxByteLengthPerCommand`
3. 實體流失和資料包突發大小
4. whether `McHttp` would be a better fit

## 症狀：VoiceCraft 伺服器啟動，但傳輸使用者無法連接

檢查：

1. 主機綁定
2. 裸露端口
3、防火牆
4.選擇了錯誤的運送類型
5.運行時覆蓋改變期望值
