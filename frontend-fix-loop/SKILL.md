---
name: frontend-fix-loop
description: 前端问题修复闭环。用于视觉错乱、交互失效、字段错误、旧依赖、截图反馈、重复回归、QA 失败、产品验收不通过、修复、复测、问题记录，以及用户确认“可以了/通过/没问题/已解决”后沉淀经验。
---

# 前端问题修复闭环

1. 阅读 `references/fix-loop.md`。
2. 复现问题并修复根因，按问题类型运行代码检查、浏览器 QA 或产品验收。
3. 用户确认修复后，按 `references/fix-loop.md` 第6节的映射表沉淀到对应长期维护文件：显示/代码问题沉淀到 skill 文件，业务逻辑问题沉淀到目标项目 PRD。查重和问题案例记录在 `references/frontend-issue-record.md`。