---
description: 自动生成 commit message 并提交代码
---

1. 执行 `git status` 查看当前状态
2. 执行 `git diff` 查看具体修改内容
3. 根据修改内容生成一个符合 Conventional Commits 规范的 commit message (例如: feat: add new feature, fix: resolve bug, chore: update config 等)
4. 向用户展示生成的 commit message 并询问是否确认提交
5. 如果用户确认，执行 `git add .` 和 `git commit -m "生成的 commit message"`
