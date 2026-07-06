# 用戶端安裝

`VoiceCraft.Client` 是玩家使用的應用程式。

VoiceCraft `1.7.0` 提供原生桌面和行動用戶端。Browser/web client 已移除。

## 要求

- 伺服器位址
- `VoiceCraftConfig.Port` 的 UDP port
- 麥克風和輸出裝置
- 匹配的 `Positioning Type`
- `1.7.x` client 對應 `1.7.x` server

本地測試：

```text
127.0.0.1:9050
```

## Windows

下載 `VoiceCraft.Client.Windows.<Architecture>.zip`，解壓縮並執行 `.exe`。

## Linux

```bash
chmod +x ./VoiceCraft.Client.Linux
./VoiceCraft.Client.Linux
```

## macOS

Apple Silicon 使用 arm64，Intel 使用 x64。

```bash
xattr -dr com.apple.quarantine /Applications/VoiceCraft.app
```

## Android

從 `VoiceCraft.Client.Android.<Architecture>.zip` 中安裝 APK，並允許麥克風權限。`1.7.0` 使用 Android package version `17`。

## iOS

透過 AltStore、TestFlight 或支援的方式安裝 `VoiceCraft.Client.iOS.arm64.ipa`。允許麥克風和 local network 權限。

`1.7.0` 包含 iOS sample-rate fix。Bundle ID：`team.avion.voicecraft`。

## 首次啟動

1. 選擇 input/output devices。
2. 測試麥克風。
3. 新增 host 和 port。
4. 檢查 `Positioning Type`。
5. 再測試 Minecraft bind。
