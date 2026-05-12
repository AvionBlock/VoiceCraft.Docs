# 升级运行手册

Use this when upgrading VoiceCraft or a related bridge such as `GeyserVoice`.

## 升级顺序

推荐顺序：

1.备份配置
2. 单独暂存新的二进制文件
3.阶段匹配插件或插件包
4. 阅读传输和拓扑假设
5.停止旧服务
6.将配置移动到新安装中
7.更新Minecraft端的addon/plugin
8.启动并验证

For VoiceCraft `v1.6.1`, do not leave the old Bedrock addon in place. Update the addon together with the client/server release before validating bind flow and in-game indicators.

## 为什么单独的目录有帮助

单独提取的目录使回滚更容易，因为：

- 旧的二进制文件仍然完好无损
- 配置迁移是明确的
- 您可以比较发布布局

## 升级后验证

至少：

1. VoiceCraft 启动
2. 传输端口绑定
3.客户端连接
4. 插件或插件验证
5. 绑定流程工作
6.游戏内语音图标或插件事件按预期出现
7. 接近音频工作原理

## 如果升级 GeyserVoice

还验证：

- 运行时自动启动行为
- 代理所有权模式
- 后端快照转发

## 回滚触发器示例

在以下情况下考虑回滚：

- 先前工作的令牌的身份验证突然失败
- 传输不再按预期绑定
- 插件管理的运行时永远不会准备好
- 跨服务器代理语音状态变得不一致
