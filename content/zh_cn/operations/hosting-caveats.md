# 托管注意事项

不同的提供商和部署风格会影响 VoiceCraft 拓扑的实际情况。

## 基岩主机

`McHttp` is usually the best Bedrock transport, but only if the BDS node can reach the VoiceCraft endpoint.

常见的拦截器：

- 出站 HTTP 限制
- 缺少模块权限
- 脚本支持受到限制的世界

## 共享托管提供商

一些提供商不允许：

- 自定义监听器
- 来自游戏服务器的出站 HTTP
- 额外的 sidecar 进程

在这些环境中，技术上支持的拓扑在操作上可能仍然受阻。

## 类似 Aternos 的限制

在严格限制的托管中，HTTP 样式的通信可能会被阻止或不切实际。

当这种情况发生时：

- Bedrock BDS + `McHttp` may not be viable
- 本地世界或客户端替代方案可能是唯一的路径

## Docker 和容器注意事项

容器有助于隔离，但您仍然需要：

- 港口出版
- 稳定的卷安装配置
- 正确的跨容器网络

## 反向代理

VoiceCraft 传输并不都是反向代理形状的：

- `McHttp` can fit HTTP tooling more naturally
- `McTcp` is raw TCP
- `McWss` behaves differently from plain HTTP

不要假设一种入口策略适用于所有这些策略。

## Java 网络注意事项

For `GeyserVoice` proxy deployments:

- 代理必须可靠地到达 VoiceCraft
- 后端Paper节点必须可靠地到达代理消息路径
- 所有权模式必须保持清晰

如果代理不能干净地拥有网桥，拓扑就会变得脆弱。
