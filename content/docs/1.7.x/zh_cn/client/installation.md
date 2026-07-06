# 客户端安装

`VoiceCraft.Client` 是玩家使用的应用。

VoiceCraft `1.7.0` 提供原生桌面和移动客户端。Browser/web client 已移除。

## 要求

- 服务器地址
- `VoiceCraftConfig.Port` 的 UDP port
- 麦克风和输出设备
- 匹配的 `Positioning Type`
- `1.7.x` client 对应 `1.7.x` server

本地测试：

```text
127.0.0.1:9050
```

## Windows

下载 `VoiceCraft.Client.Windows.<Architecture>.zip`，解压并运行 `.exe`。

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

从 `VoiceCraft.Client.Android.<Architecture>.zip` 中安装 APK，并允许麦克风权限。`1.7.0` 使用 Android package version `17`。

## iOS

通过 AltStore、TestFlight 或支持的方式安装 `VoiceCraft.Client.iOS.arm64.ipa`。允许麦克风和 local network 权限。

`1.7.0` 包含 iOS sample-rate fix。Bundle ID：`team.avion.voicecraft`。

## 首次启动

1. 选择 input/output devices。
2. 测试麦克风。
3. 添加 host 和 port。
4. 检查 `Positioning Type`。
5. 再测试 Minecraft bind。
