---
name: frontend-code-audit
description: 前端代码审核。用于 UI 实现或修复后，检查数据映射、事件绑定、表单校验、异步状态、提交锁、可访问性、测试和回归风险。
---

# 前端代码审核

1. 阅读 `references/code-audit-checklist.md`。
2. 先审 diff，再运行项目检查命令；避免无关重写和格式化噪声。
3. 输出发现（按显示问题/代码问题/业务逻辑问题分类）、已运行检查和剩余风险；需要真实页面证据时交给 `frontend-browser-qa`，需要修复时交给 `frontend-fix-loop` 并带上分类信息。