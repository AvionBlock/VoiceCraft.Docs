# 第一個伺服器運行

## 第一次啟動時會發生什麼

On startup, VoiceCraft looks for `ServerProperties.json` in the current directory and subdirectories.

如果找不到該文件，伺服器會自動建立：

- `config/`
- `config/ServerProperties.json`

該文件成為伺服器行為的主要持久事實來源。

## 預設連接埠和端點

預設情況下，產生的配置是這樣對齊的：

- VoiceCraft UDP: `9050`
- `McHttp`: `http://127.0.0.1:9050/`
- `McWss`: `ws://127.0.0.1:9051/`
- `McTcp`: `127.0.0.1:9050`

注意事項：

- UDP voice traffic and some transport defaults share `9050`
- `McWss` is separated by default on `9051`
- `McTcp` is especially relevant for `GeyserVoice`

## 啟動參數

VoiceCraft 伺服器支援這些根參數：

- `--exit-on-invalid-properties`
  Exit if `ServerProperties.json` cannot be parsed.
- `--language <culture>`
  覆蓋目前運行的伺服器日誌語言。
- `--transport-mode <mode>`
  為目前運行啟用 Minecraft 傳輸的子集。
- `--transport-host <host>`
  覆蓋配置的 Minecraft 傳輸主機。
- `--transport-port <port>`
  覆蓋配置的 Minecraft 傳輸連接埠。
- `--server-key <token>`
  覆蓋目前運行的共享 Minecraft 端登入令牌。

程式碼中也存在短別名：

- `-eip`
- `-l`
- `-tm`
- `-th`
- `-tp`
- `-sk`

## 範例

### 使用啟動語言覆蓋運行

```bash
./VoiceCraft.Server --language en-US
```

### 如果配置無效則退出

```bash
./VoiceCraft.Server --exit-on-invalid-properties
```

### Run only `McTcp` for a Java bridge

```bash
./VoiceCraft.Server --transport-mode tcp --transport-host 0.0.0.0 --transport-port 9050
```

### Run only `McHttp`

```bash
./VoiceCraft.Server --transport-mode http --transport-host 0.0.0.0 --transport-port 9050
```

### 覆蓋令牌而不編輯 JSON

```bash
./VoiceCraft.Server --server-key "replace-with-secure-token"
```

## 傳輸覆蓋的行為方式

Runtime overrides do not permanently rewrite `ServerProperties.json`.

它們僅適用於當前流程，並且在以下情況下很有用：

- 從一個映像執行多個環境
- 使用面板或 systemd 插件
- 測試直接與代理拓撲
- letting another tool such as `GeyserVoice` launch the runtime with generated values

## 首次運行清單

1. 變更所有產生的登入令牌。
2. 確認您實際需要哪一種交通工具：
   - `McHttp` for BDS
   - `McWss` for local worlds
   - `McTcp` for `GeyserVoice`
3. 驗證主機綁定。
4. 僅開啟您需要的連接埠。
5. Confirm `PositioningType` with your clients.
6. 在連接 Minecraft 自動化之前測試客戶端連線。

## 常見的首次運行錯誤

- 保持產生的令牌不變
- exposing `127.0.0.1` endpoints to remote nodes
- forgetting that `McTcp` may be required by Java-side bridges
- 無需實際需要即可實現生產中的每一種傳輸

有關完整配置參考，請參閱 [ServerProperties.json](/server/server-properties)。
