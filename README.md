# 前端 Agent Skills

这是一个面向前端研发协作的 Agent Skills 包，用来约束需求澄清、开发实现、契约同步、代码审核、浏览器验收和问题修复闭环。

本仓库不是 Claude Code 专属。只要你的 Agent 工具支持读取目录型技能、项目说明、上下文文件或自定义指令，就可以复用这里的 `SKILL.md`、`references/` 和 `scripts/`。

## 适用对象

- Codex / OpenAI Codex CLI 或桌面端
- Claude Code
- Cursor、Gemini CLI、Roo Code 等支持自定义规则或上下文文件的 Agent 工具
- 团队内部自建 Agent、CI 检查脚本或代码评审助手

## 技能列表

| Skill | 用途 |
| --- | --- |
| `frontend-skill-index` | 前端技能路由索引，用于判断当前任务应该调用哪个 skill，以及维护技能包结构。 |
| `frontend-requirement-gate` | 前端需求门禁，用于新增或修改页面、表单、表格、弹窗、工作流、权限、状态规则前先明确范围。 |
| `frontend-dev-standards` | 前端开发规范，用于编码或修复前约束组件复用、表单、表格、弹窗、布局、样式、加载和分页一致性。 |
| `frontend-doc-sync` | 前端契约同步，用于 UI 改动影响 API、schema、DTO、Mock、测试数据、校验规则或状态模型时。 |
| `frontend-code-audit` | 前端代码审核，用于 UI 实现或修复后检查数据映射、事件绑定、校验、加载态、提交锁、测试和回归风险。 |
| `frontend-browser-qa` | 前端浏览器验收，用于真实浏览器截图、Playwright 流程、视觉问题、滚动、弹窗和响应式布局检查。 |
| `frontend-fix-loop` | 前端问题修复闭环，用于视觉错乱、交互失效、字段错误、截图反馈、QA 失败、复测和问题记录沉淀。 |

## 推荐调用顺序

跨阶段任务建议按下面顺序使用：

1. `frontend-requirement-gate`
2. `frontend-dev-standards`
3. `frontend-doc-sync`
4. `frontend-code-audit`
5. `frontend-browser-qa`
6. `frontend-fix-loop`

如果只是维护或选择 skill，先看 `frontend-skill-index`。

## 目录结构

```text
.
├── frontend-browser-qa/
│   ├── SKILL.md
│   ├── agents/
│   ├── references/
│   └── scripts/
├── frontend-code-audit/
├── frontend-dev-standards/
├── frontend-doc-sync/
├── frontend-fix-loop/
├── frontend-requirement-gate/
└── frontend-skill-index/
```

每个 skill 目录通常包含：

- `SKILL.md`：入口说明，包含名称、触发场景和工作流程。
- `references/`：更细的规范、清单、问题记录或维护说明。
- `scripts/`：可复用的辅助脚本，例如浏览器截图目录管理、前端检查门禁。
- `agents/`：面向特定 Agent 平台的适配配置。

## 安装与同步

### Codex

将需要的 skill 目录复制到 Codex skills 目录，例如：

```bash
cp -r frontend-* ~/.codex/skills/
```

如果你维护的是 Windows 环境，可以复制到：

```text
C:\Users\<你的用户名>\.codex\skills
```

复制后重新打开 Codex 会话，或让 Agent 重新读取 skills 列表。

### Claude Code

可以把本仓库作为团队规则库使用：

1. 将仓库克隆到本地固定目录。
2. 在 Claude Code 的项目说明或自定义上下文中引用对应 `SKILL.md`。
3. 需要完整规则时，同时引用该 skill 的 `references/` 文件。

建议不要只复制 `SKILL.md`，因为很多流程依赖 `references/` 中的检查清单。

### 其他 Agent 工具

如果工具支持自定义 rules、memory、context 或 instructions，可以按任务阶段引入对应文件：

- 需求不清：引用 `frontend-requirement-gate/SKILL.md`
- 开发前：引用 `frontend-dev-standards/SKILL.md`
- 改到接口或字段：引用 `frontend-doc-sync/SKILL.md`
- 提交前审核：引用 `frontend-code-audit/SKILL.md`
- 视觉与浏览器验收：引用 `frontend-browser-qa/SKILL.md`
- 修复反馈闭环：引用 `frontend-fix-loop/SKILL.md`

## 使用建议

- 不要把所有规则一次性塞给 Agent。按任务阶段加载最相关的 skill，效果更稳定。
- 修改 UI 前先确认字段来源、状态和动作，不要用 Mock 数据掩盖契约缺失。
- 涉及布局、弹窗、滚动、sticky 表头、响应式时，应配合真实浏览器截图或 Playwright 检查。
- 用户确认问题已解决后，再把可复用经验沉淀到 `frontend-fix-loop/references/frontend-issue-record.md`。
- 新增长期规则时，优先更新最具体的 `references/*.md`，只有跨多个阶段复用时再同步到总览。

## 维护原则

- 每个 skill 只负责一个明确阶段，不做大而全的通用提示词。
- `SKILL.md` 保持短小，复杂规则放入 `references/`。
- 自动化能力放入 `scripts/`，避免在说明文档里重复大段脚本。
- 文档默认使用中文；API、命令、配置项和错误信息保留英文原文。

## 仓库地址

GitHub: [LI-S-H/my-skills](https://github.com/LI-S-H/my-skills)
