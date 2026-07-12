# GeyserVoice: Direct Paper

ใช้รูปแบบนี้เมื่อ Paper/Folia server เป็นเจ้าของ integration โดยตรง

```text
Paper/Folia + GeyserVoice -> McTcp -> VoiceCraft.Server
players -> VoiceCraft UDP endpoint
```

ตรวจ token ของ `McTcpConfig.LoginToken` และ network reachability ระหว่าง plugin กับ VoiceCraft.Server
