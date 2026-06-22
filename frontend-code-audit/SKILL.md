---
name: frontend-code-audit
description: 前端代码审核。用于 UI 实现或修复后，检查数据映射、事件绑定、校验、加载态、提交锁、测试和回归风险。
---

# 前端代码审核

## 工作流程

1. 阅读 `references/code-audit-checklist.md`。
2. 先审 diff，再跑大命令；重点看是否有误改、无关重写或格式化噪声。
3. 检查组件复用、数据映射、事件绑定、表单校验、异步状态和可访问性。
4. 运行项目检查。需要时使用 `scripts/run-frontend-gate.cjs` 组合项目自己的 npm scripts。
5. 如实列出剩余风险，尤其是未能运行浏览器 QA 或后端联调时。

## 脚本

通用门禁脚本示例：

```bash
node <frontend-code-audit>/scripts/run-frontend-gate.cjs --app-dir=web --contract=check:api --test=test --smoke=smoke:users,smoke:orders
```

将 `<frontend-code-audit>` 替换为当前 skill 文件夹的绝对路径；如果已经在该 skill 根目录内，可以直接运行 `node scripts/run-frontend-gate.cjs ...`。

执行 `--help` 查看参数。脚本是辅助工具；如果项目已有更清晰的命令，优先使用项目命令。
