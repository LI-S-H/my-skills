# 通用前端开发 Skill 包设计

本文随 `frontend-skill-index` skill 分发，用于说明这个通用前端开发技能包的结构和长期维护方式。它不绑定任何单一项目或业务系统。

## 设计原则

不要用一个大 skill 包办全部工作；按阶段调用专用 skill，降低漏读和误触发。每个子 skill 都必须自带自己的 `references/` 文档，不能依赖某个项目根目录下的 `docs/`。

## Skill 列表

- `frontend-requirement-gate`：需求门禁。开发前确认目标、范围、用户动作、业务状态、数据来源和验收标准。
- `frontend-dev-standards`：开发规范。改代码前检查组件复用、字段契约、表格、弹窗、样式、异步状态和可访问性。
- `frontend-doc-sync`：契约同步。字段、接口、Schema、Mock、测试数据或文档变化时保持一致。
- `frontend-code-audit`：代码审核。写完后检查数据映射、事件绑定、校验、加载态、提交锁、构建和测试。
- `frontend-browser-qa`：浏览器验收。用真实浏览器、截图和手动填数验证显示、交互和业务流程。
- `frontend-fix-loop`：问题修复闭环。处理用户反馈和重复问题，修复、回归、确认后记录。
- `frontend-skill-index`：索引说明。只在选择或维护技能包时使用，不作为实际开发入口。

## 推荐调用顺序

1. 需求有不确定性：`frontend-requirement-gate`
2. 准备改前端代码或页面契约：`frontend-dev-standards`
3. 影响接口、字段、Schema、Mock 或测试：`frontend-doc-sync`
4. 代码完成准备交付：`frontend-code-audit`
5. 需要看真实页面效果：`frontend-browser-qa`
6. 用户反馈问题或 QA 失败：`frontend-fix-loop`

## 长期维护地图

下面路径以“技能安装根目录”为基准，例如 `$CODEX_HOME/skills/<skill-name>/...`；在源码仓库里维护时，对应 `skills/<skill-name>/...`。不要写成某个业务项目的 `docs/` 路径。

- 需求澄清流程：`frontend-requirement-gate/references/requirement-checklist.md`
- 通用开发必读规范：`frontend-dev-standards/references/frontend-dev-must-read.md`
- 详细开发规范：`frontend-dev-standards/references/frontend-dev-standards.md`
- 契约同步规则：`frontend-doc-sync/references/doc-sync-checklist.md`
- 代码审核规则：`frontend-code-audit/references/code-audit-checklist.md`
- 门禁脚本：`frontend-code-audit/scripts/run-frontend-gate.cjs`
- 浏览器 QA 清单：`frontend-browser-qa/references/frontend-product-qa-checklist.md`
- 浏览器详细流程：`frontend-browser-qa/references/browser-qa-checklist.md`
- 截图脚本：`frontend-browser-qa/scripts/manage-screenshots.cjs`
- 重复问题记录：`frontend-fix-loop/references/frontend-issue-record.md`
- 修复闭环流程：`frontend-fix-loop/references/fix-loop.md`
- 技能调用顺序和结构：`frontend-skill-index/SKILL.md`、`frontend-skill-index/references/frontend-skill-package.md`

自进化规则：临时问题不写长期文档；用户认可修复后，先写 `frontend-fix-loop/references/frontend-issue-record.md`，再判断是否需要补开发规范、审核清单或浏览器 QA 清单。已有规则但没有执行时，强化原条目，不重复造新条目。

## 自进化可执行条件

一次自进化必须同时满足：

1. 有明确触发：用户认可修复、QA 暴露漏项、重复问题再次出现，或用户要求维护 skill。
2. 有固定落点：能在上面的维护地图里找到具体文件。
3. 有可验证结果：至少运行 skill 结构校验；修改脚本时运行脚本 `--help` 或最小命令。
4. 有合并保护：更新安装目录或重新安装时，不覆盖 `frontend-fix-loop/references/frontend-issue-record.md` 中已有的本地记录。
5. 有闭环说明：最终回复说明更新了哪个 skill 文件、为什么更新、还剩什么风险。

如果不能写入技能安装目录，不要假装已经自进化；应更新当前源码包，说明需要同步到 `$CODEX_HOME/skills` 后才会在后续任务中生效。
