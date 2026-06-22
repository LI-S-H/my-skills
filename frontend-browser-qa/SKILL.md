---
name: frontend-browser-qa
description: 前端浏览器验收。用于真实浏览器截图、Playwright 流程、视觉问题、表单、表格、弹窗、滚动、sticky 表头、响应式布局和用户浏览器截图反馈。
---

# 前端浏览器验收

## 工作流程

1. 阅读 `references/frontend-product-qa-checklist.md` 和 `references/browser-qa-checklist.md`。
2. 为本次验收创建独立截图目录。
3. 启动或复用本地开发服务。
4. 用 Playwright、浏览器自动化或手动截图覆盖标准视口和标准场景。
5. 为可度量的布局风险增加 DOM 断言，例如列重叠、sticky 表头透明、滚动条缺失、弹窗底部按钮不可见、加载态缺失。
6. 回复前必须自己检查截图。发现可见问题就修复、重跑、替换旧截图。
7. 用户确认结果可接受后，再清理不再需要的旧截图目录。

## 截图目录

尽量使用辅助脚本：

```bash
node <frontend-browser-qa>/scripts/manage-screenshots.cjs create --name=feature-name
node <frontend-browser-qa>/scripts/manage-screenshots.cjs list
node <frontend-browser-qa>/scripts/manage-screenshots.cjs cleanup --approved --run-dir=qa-artifacts/browser/<run>
```

将 `<frontend-browser-qa>` 替换为当前 skill 文件夹的绝对路径；如果已经在该 skill 根目录内，可以直接运行 `node scripts/manage-screenshots.cjs ...`。

截图统一保存到 `qa-artifacts/browser/<timestamp>-<name>/`。文件名包含路由、视口和场景。不要把截图放在项目根目录。

## 输出要求

报告：

- 开发服务 URL
- 已测试的路由和流程
- 截图目录和关键文件
- 发现并修复的问题
- 仍未覆盖的检查项
