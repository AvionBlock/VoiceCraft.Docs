# 客户端安装

`VoiceCraft.Client` 是面向玩家的应用程序。每个想要说话或听到近距离语音的玩家都需要在自己的设备上运行它。

在 `VoiceCraft.Server` 可达后安装客户端。首次启动期间，您将添加一个指向 VoiceCraft UDP 端点（通常为 `host:9050`）的服务器条目。

## 开始之前

您需要：

- 玩家应该使用的服务器地址
- 来自 `VoiceCraftConfig.Port` 的服务器 UDP 端口
- 操作系统可用的麦克风和播放设备
- 客户端和服务器之间匹配 `Positioning Type`

对于本地测试，端点通常是：

```text
127.0.0.1:9050
```

对于远程服务器，请使用运行 `VoiceCraft.Server` 的计算机的公共或 LAN 地址。

## Windows

1. 下载`VoiceCraft.Client.Windows.<Architecture>.zip`。
2. 提取存档。
3. 运行 `VoiceCraft.Client.Windows.exe`。
4. 如果出现 Windows SmartScreen，请验证该文件是否来自官方发布页面，然后再继续。

## Linux

1. 下载`VoiceCraft.Client.Linux.<Architecture>.zip`。
2. 提取存档。
3. 授予权限并运行：

```bash
chmod +x ./VoiceCraft.Client.Linux
./VoiceCraft.Client.Linux
```

如果应用程序看不到音频设备，请检查 PulseAudio/PipeWire 权限以及应用程序是否在受限沙箱内运行。

## macOS

选择一个套餐：

- `VoiceCraft.Client.MacOS.arm64.dmg` / `.pkg` 适用于 Apple Silicon
- `VoiceCraft.Client.MacOS.x64.dmg` / `.pkg` 适用于英特尔

### DMG

1. 打开`.dmg`。
2. 将 `VoiceCraft.app` 拖至 `Applications`。
3. 启动应用程序。

### 包装袋

1. 打开`.pkg`。
2. 完成安装程序。
3. 从 `Applications` 启动 `VoiceCraft`。

如果 macOS 阻止启动：

```bash
xattr -dr com.apple.quarantine /Applications/VoiceCraft.app
```

仅删除您有意下载和信任的版本的隔离。

## 安卓

1. 下载`VoiceCraft.Client.Android.<Architecture>.zip`。
2. 提取存档。
3. 从存档中打开 `.apk` 并安装。
4. 当 Android 询问时允许麦克风权限。

## iOS（AltStore/侧载）

1. 下载`VoiceCraft.Client.iOS.arm64.ipa`。
2. 通过 AltStore 或其他旁加载工具安装 IPA。
3. 如果需要，请在 iOS 设置中允许该配置文件。
4. 首次启动时允许麦克风权限。

## 关于 .NET 运行时的注意事项

对于较旧的版本（`v1.4.0` 之前的版本），可能需要安装 .NET 9 运行时。
对于当前的独立构建，通常不需要。

## 首次启动清单

1. 打开客户端。
2. 选择输入和输出设备。
3. 使用麦克风测试来确认输入电平。
4. 添加服务器条目：
   - 主机：VoiceCraft 服务器地址
   - 端口：`VoiceCraftConfig.Port`
5. 确认 `Positioning Type` 与服务器匹配。
6. 在开始 Minecraft 绑定流程之前进行连接。

客户端连接成功仅证明语音端点可达。 Minecraft 的接近度仍然取决于连接到匹配传输的插件或插件。

## 常见的首次启动问题

- 无麦克风输入：
  检查操作系统麦克风权限和选定的输入设备。
- 客户端已连接但没有接近：
  检查 Minecraft 传输、绑定流程和 `Positioning Type`。
- 远程服务器无法连接：
  确认玩家和 `VoiceCraft.Server` 之间的 UDP 端口已打开。
- 玩家听到每个人的声音距离错误：
  检查实体位置更新和世界 ID。

## 截图

![General Settings](/images/voicecraft/settings-general.png)
![Voice Settings](/images/voicecraft/settings-voice.png)
