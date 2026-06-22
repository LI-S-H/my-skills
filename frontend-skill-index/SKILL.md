---
name: frontend-skill-index
description: 前端技能路由索引。用于选择、解释、安装前审查、维护或自进化前端技能包；当用户询问流程漏洞、调用顺序、长期维护文件、skill 结构或哪个前端 skill 应该触发时使用。实际开发、验收、审核、文档同步或修复时，应优先调用具体技能。
---

# 前端技能索引

维护或选择技能包时，先阅读 `references/frontend-skill-package.md`。

不要用一个大而全的 skill 包办所有事，应按阶段调用专用技能：

- 需求不清或业务流程复杂：`frontend-requirement-gate`
- 开发规范和组件复用：`frontend-dev-standards`
- schema、API、Mock、测试数据或文档同步：`frontend-doc-sync`
- 实现后的代码审核和命令检查：`frontend-code-audit`
- 真实浏览器截图和视觉验收：`frontend-browser-qa`
- 用户反馈、回归问题和问题记录：`frontend-fix-loop`

如果任务跨多个阶段，按上面的顺序依次使用。不要把本索引当成唯一开发说明。

维护技能包时按固定位置更新：

- 技能包总览和调用顺序：`frontend-skill-index/references/frontend-skill-package.md`
- 通用开发规范：`frontend-dev-standards/references/frontend-dev-must-read.md`
- 浏览器验收清单：`frontend-browser-qa/references/frontend-product-qa-checklist.md`
- 重复问题记录：`frontend-fix-loop/references/frontend-issue-record.md`
- 每个子 skill 的详细规则：`<skill-name>/references/*.md`
- 每个子 skill 的自动化脚本：`<skill-name>/scripts/*`

新增或调整长期规则时，优先改最具体的文件；只有规则跨多个阶段复用时，再同步到总览文档。

路径说明：上面的 `<skill-name>/...` 是以“技能安装根目录”为基准的相对路径，通常是 `$CODEX_HOME/skills/<skill-name>/...` 或正在维护的源码包 `skills/<skill-name>/...`。如果当前环境不能写安装目录，就更新源码包并提醒用户重新安装或同步。
