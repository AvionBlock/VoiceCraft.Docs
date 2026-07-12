# 升級執行手冊

升級 VoiceCraft 或 `GeyserVoice` 等 bridge 時使用本頁。

VoiceCraft `1.7.0` 修改了 event 和 entity-property 模型，因此需要同時驗證 server、client、Bedrock addon 和 Java plugin。

## 順序

1. 備份 config 和 plugin/addon 檔案。
2. 在獨立目錄準備新 binaries。
3. 準備匹配的 addon/plugin 套件。
4. 閱讀 packets、properties、transports 的 release notes。
5. 停止舊 service。
6. 將 config 複製到新安裝。
7. 檢查 `ServerProperties.json` 的 port mapping 欄位。
8. 更新 Minecraft 端 addon/plugin。
9. 逐個路徑測試。

## 1.7 檢查項

- server 顯示 `1.7.0`
- VoiceCraft UDP endpoint 成功 bind
- McHttp、McTcp 或 McWss 成功 bind
- NAT port mapping 明確開啟或關閉
- `1.7.x` client 能連線
- Minecraft integration 能認證
- bind flow 正常
- position、rotation、world ID、mute/deafen、bitmasks 正常更新
- 使用 effect overrides 時 entity properties 正常

## Event/property migration

Event wrappers:

- `VcEventRequestPacket`
- `McApiEventRequestPacket`

Property packets:

- `VcSetPropertyRequestPacket`
- `VcOnEntityPropertyUpdatedPacket`
- `McApiSetEntityPropertyRequestPacket`
- `McApiOnEntityPropertyUpdatedPacket`

支援值：`null`、`bool`、整數型別、`float`、`double`。

舊 cave/muffle factor 路徑已移除，請使用 properties 表示效果參數。

## Rollback

1. 停止新 service。
2. 還原舊 binaries。
3. 還原舊 config。
4. 還原舊 addon/plugin。
5. 啟動舊版本。
6. 驗證 client、auth、bind、proximity。
