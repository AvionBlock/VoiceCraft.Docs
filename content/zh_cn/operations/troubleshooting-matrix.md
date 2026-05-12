# 故障排除矩阵

当您需要基于症状的诊断而不是通用检查表时，请使用此页面。

## 症状：客户端已连接，但没有人听到任何声音

检查：

1. `PositioningType` match
2.绑定流程完成
3.实体接收世界和位置更新
4. 客户没有局部静音或耳聋
5.服务器没有使实体静音或震耳欲聋

## 症状：插件已连接，但绑定无法正常工作

检查：

1. token正确
2. 期望的实体被创建
3.玩家使用了正确的绑定密钥
4.绑定脚本事件正在触发

## 症状：GeyserVoice 已安装，但 Java 端桥永远无法使用

检查：

1. `McTcp` is enabled on VoiceCraft
2. `host`, `port`, and `login-token` match
3. 故意配置直接模式与代理模式
4. if `auto-start` is enabled, the runtime becomes ready within timeout

## 症状：Direct Paper 模式在手动重新连接后有效，但在启动时无效

检查：

1. `config.voicecraft.auto-start`
2. `install-directory`
3. `ready-timeout-ms`
4.运行时进程的启动所有权

## 症状：代理模式在一个后端有效，但在服务器切换时中断

检查：

1.代理是真相来源
2. 后端节点不尝试拥有 VoiceCraft 连接
3.快照转发在交换机之间保持完整
4.世界ID命名空间逻辑保持一致

## Symptom: `McWss` is unstable

检查：

1. `CommandsPerTick`
2. `MaxByteLengthPerCommand`
3. 实体流失和数据包突发大小
4. whether `McHttp` would be a better fit

## 症状：VoiceCraft 服务器启动，但传输使用者无法连接

检查：

1. 主机绑定
2. 裸露端口
3、防火墙
4.选择了错误的传输类型
5.运行时覆盖改变期望值
