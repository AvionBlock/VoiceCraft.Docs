# 客戶端安裝

## 視窗

1. Download `VoiceCraft.Client.Windows.<Architecture>.zip`.
2. 解壓縮存檔。
3. Run `VoiceCraft.Client.Windows.exe`.

## Linux

1. Download `VoiceCraft.Client.Linux.<Architecture>.zip`.
2. 解壓縮存檔。
3.授予權限並運行：

```bash
chmod +x ./VoiceCraft.Client.Linux
./VoiceCraft.Client.Linux
```

## macOS

選擇一個套餐：

- `VoiceCraft.Client.MacOS.arm64.dmg` / `.pkg` for Apple Silicon
- `VoiceCraft.Client.MacOS.x64.dmg` / `.pkg` for Intel

### DMG

1. Open `.dmg`.
2. Drag `VoiceCraft.app` to `Applications`.
3. 啟動應用程式。

### 包裝

1. Open `.pkg`.
2. 完成安裝程序。
3. Launch `VoiceCraft` from `Applications`.

如果 macOS 阻止啟動：

```bash
xattr -dr com.apple.quarantine /Applications/VoiceCraft.app
```

## 安卓

1. Download `VoiceCraft.Client.Android.<Architecture>.zip`.
2. 解壓縮存檔。
3. Open the `.apk` from the archive and install.

## iOS（AltStore / 側載）

1. Download `VoiceCraft.Client.iOS.arm64.ipa`.
2. 透過 AltStore 或其他旁載工具安裝 IPA。
3. 如果需要，請在 iOS 設定中允許該設定檔。

## 關於 .NET 執行階段的注意事項

For older releases (before `v1.4.0`), installed .NET 9 runtime may be required.
對於當前的獨立構建，通常不需要。

## UI 螢幕截圖（佔位符）

![常規設定](/images/voicecraft/settings-general.png)
![語音設定](/images/voicecraft/settings-voice.png)
