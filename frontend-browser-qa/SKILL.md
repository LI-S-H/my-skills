---
name: frontend-browser-qa
description: 前端浏览器 QA 取证。用于真实浏览器截图、Playwright 流程、视觉显示问题、表单/表格/弹窗/滚动/sticky 表头/响应式布局、基础点击输入和用户截图反馈复现；提供页面证据，不做最终产品业务验收。
---

# 前端浏览器 QA 取证

1. 阅读 `references/browser-qa-checklist.md`。
2. 创建本次专用截图目录并运行浏览器/Playwright 检查。
3. 记录显示和基础交互问题，输出截图目录路径、关键截图、断言结果和未覆盖场景；不做代码修复，修复交给 `frontend-fix-loop`。
4. 需要判断 PRD、业务流程或用户价值时，把证据交给 `frontend-product-acceptance`。