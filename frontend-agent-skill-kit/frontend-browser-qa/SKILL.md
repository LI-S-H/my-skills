---
name: frontend-browser-qa
description: 前端浏览器 QA 取证。用于真实浏览器视觉取证、Playwright 流程验证、动态点击输入、DOM 断言、表单/表格/弹窗/滚动/sticky 表头/响应式布局和用户截图反馈复现；截图用于视觉证据，动态交互优先用 Playwright 测试或 MCP 断言，不做最终产品业务验收。
---

# 前端浏览器 QA 取证

1. 阅读 `references/browser-qa-checklist.md`。
2. 按问题类型选择验证方式：视觉/布局问题创建截图目录并截图取证；点击、输入、跳转、表单校验、loading、disabled、toast 等动态交互问题优先运行 Playwright 测试或 Playwright MCP DOM 断言。
3. 记录显示和基础交互问题，输出截图目录路径（如有）、关键截图（如有）、Playwright/MCP 断言结果和未覆盖场景；不做代码修复，修复交给 `frontend-fix-loop`。
4. 需要判断 PRD、业务流程或用户价值时，把证据交给 `frontend-product-acceptance`。