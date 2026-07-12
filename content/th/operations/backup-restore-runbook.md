# Backup & Restore Runbook

## Backup

1. หยุด server อย่างสะอาด
2. copy `ServerProperties.json`
3. backup world และ packs
4. เก็บ version ของ client/server/addon

## Restore

1. หยุด service
2. วางไฟล์ backup กลับ
3. ตรวจ token และ ports
4. start server
5. ทดสอบ client และ bind flow
