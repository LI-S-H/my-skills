# 通用前端开发 Skill 包设计

本文随 `frontend-skill-index` skill 分发，用于说明这个通用前端开发技能包的结构、调用顺序和长期维护方式。它不绑定任何单一项目或业务系统。

## 设计原则

不要用一个大 skill 包办全部工作；按阶段调用专用 skill，降低漏读和误触发。

每个子 skill 默认只有一个强制阅读的主 reference。记录库、脚本说明、历史案例按需读取，不作为每次执行的必读项。这样可以减少 token 消耗，避免同类规则在多份文档里漂移。

PRD 是目标项目文档，不是 skill 包文档。默认路径是目标项目的 `docs/product/PRD.md`。

## Skill 列表

- `frontend-requirement-gate`：需求门禁。开发前确认目标、范围、用户动作、业务状态、数据来源和验收标准。
- `frontend-product-docs`：PRD 生成。指导在目标项目 `docs/product/PRD.md` 生成、补全和动态更新产品需求文档。
- `frontend-dev-standards`：开发规范。改代码前检查组件复用、字段契约、表格、弹窗、样式、异步状态和可访问性。
- `frontend-doc-sync`：契约同步。字段、接口、Schema、Mock、测试数据或文档变化时保持一致。
- `frontend-code-audit`：代码审核。写完后检查数据映射、事件绑定、校验、加载态、提交锁、构建和测试。
- `frontend-browser-qa`：浏览器 QA 取证。用真实浏览器、截图和自动化验证显示问题、基础交互和页面证据。
- `frontend-product-acceptance`：产品验收。以产品经理和业务用户视角，基于 PRD 与浏览器 QA 证据审核功能、业务逻辑、用户需求和数据流转。
- `frontend-fix-loop`：问题修复闭环。处理用户反馈和重复问题，修复、回归、确认后记录。
- `frontend-skill-index`：索引说明。只在选择或维护技能包时使用，不作为实际开发入口。

## 推荐调用顺序

1. 需求有不确定性：`frontend-requirement-gate`
2. 缺少 PRD、产品定位、用户角色、功能范围或验收标准：`frontend-product-docs`
3. 准备改前端代码或页面契约：`frontend-dev-standards`
4. 影响接口、字段、Schema、Mock 或测试：`frontend-doc-sync`
5. 代码完成准备交付：`frontend-code-audit`（按显示/代码/业务逻辑三类输出问题）
6. 代码审核发现显示问题：先 `frontend-browser-qa` 取证，再 `frontend-fix-loop` 修复；代码/业务逻辑问题直接 `frontend-fix-loop`
7. 需要判断功能是否符合 PRD、业务逻辑和用户需求：`frontend-product-acceptance`
8. 用户反馈问题、产品验收不通过或 QA 失败：`frontend-fix-loop`

## 主 reference 地图

| 阶段 | Skill | 默认强制阅读 |
| --- | --- | --- |
| 需求门禁 | `frontend-requirement-gate` | `frontend-requirement-gate/references/requirement-checklist.md` |
| PRD 生成 | `frontend-product-docs` | `frontend-product-docs/references/product-docs-guide.md` |
| 开发规范 | `frontend-dev-standards` | `frontend-dev-standards/references/frontend-dev-standards.md` |
| 契约同步 | `frontend-doc-sync` | `frontend-doc-sync/references/doc-sync-checklist.md` |
| 代码审核 | `frontend-code-audit` | `frontend-code-audit/references/code-audit-checklist.md` |
| 浏览器 QA | `frontend-browser-qa` | `frontend-browser-qa/references/browser-qa-checklist.md` |
| 产品验收 | `frontend-product-acceptance` | `frontend-product-acceptance/references/product-acceptance-checklist.md` |
| 修复闭环 | `frontend-fix-loop` | `frontend-fix-loop/references/fix-loop.md` |
| 技能索引 | `frontend-skill-index` | `frontend-skill-index/references/frontend-skill-package.md` |

按需读取文件：

- 重复问题记录：`frontend-fix-loop/references/frontend-issue-record.md`，只在查重、用户认可后补记、合并安装记录或维护问题库时读取。
- 门禁脚本：`frontend-code-audit/scripts/run-frontend-gate.cjs`，只在需要组合项目检查命令时运行。
- 截图脚本：`frontend-browser-qa/scripts/manage-screenshots.cjs`，只在创建、列出或清理截图目录时运行。截图存放在目标项目 `docs/qa-screenshots/` 下。
- 目标项目 PRD：通常位于目标项目的 `docs/product/PRD.md`，涉及具体产品页面、字段、流程或验收时读取。
- 目标项目截图目录：`docs/qa-screenshots/`，产品验收和修复闭环时读取已有截图。

## 自进化规则

临时问题不写长期文档；用户认可修复后，先判断问题类型和是否属于可复用长期问题，再按固定落点更新。

问题分三类，沉淀路径不同：

| 问题类型 | 沉淀位置 | 说明 |
| --- | --- | --- |
| 显示问题 | skill 长期维护文件 | 视觉、布局、交互等通用前端问题 |
| 代码问题 | skill 长期维护文件 | 数据映射、事件、校验、异步等通用前端问题 |
| 业务逻辑问题 | 目标项目 `docs/product/PRD.md` | 状态流转、权限、字段含义、流程、验收标准等项目特有问题 |

显示问题和代码问题的完整映射表见 `frontend-fix-loop/references/fix-loop.md` 第6节，不在此重复列出。

业务逻辑问题直接更新目标项目 PRD 对应章节（字段、状态、权限、验收标准等），不要写进 skill 长期维护文件。

强化原则和操作步骤见 `frontend-fix-loop/references/fix-loop.md` 第6节，不在此重复。