# 客户端安装

## 窗口

1. Download `VoiceCraft.Client.Windows.<Architecture>.zip`.
2. 解压存档。
3. Run `VoiceCraft.Client.Windows.exe`.

## Linux

1. Download `VoiceCraft.Client.Linux.<Architecture>.zip`.
2. 解压存档。
3.授予权限并运行：

```bash
chmod +x ./VoiceCraft.Client.Linux
./VoiceCraft.Client.Linux
```

## macOS

选择一个套餐：

- `VoiceCraft.Client.MacOS.arm64.dmg` / `.pkg` for Apple Silicon
- `VoiceCraft.Client.MacOS.x64.dmg` / `.pkg` for Intel

### DMG

1. Open `.dmg`.
2. Drag `VoiceCraft.app` to `Applications`.
3. 启动应用程序。

### 包装

1. Open `.pkg`.
2. 完成安装程序。
3. Launch `VoiceCraft` from `Applications`.

如果 macOS 阻止启动：

```bash
xattr -dr com.apple.quarantine /Applications/VoiceCraft.app
```

## 安卓

1. Download `VoiceCraft.Client.Android.<Architecture>.zip`.
2. 解压存档。
3. Open the `.apk` from the archive and install.

## iOS（AltStore / 侧载）

1. Download `VoiceCraft.Client.iOS.arm64.ipa`.
2. 通过 AltStore 或其他旁加载工具安装 IPA。
3. 如果需要，请在 iOS 设置中允许该配置文件。

## 关于 .NET 运行时的注意事项

For older releases (before `v1.4.0`), installed .NET 9 runtime may be required.
对于当前的独立构建，通常不需要。

## UI 屏幕截图（占位符）

![常规设置](/images/voicecraft/settings-general.png)
![语音设置](/images/voicecraft/settings-voice.png)
