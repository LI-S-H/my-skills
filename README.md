# My Skills

这是个人 Agent Skills 仓库，用来沉淀可复用的工作流、检查清单、脚本和 Agent 指令。

本仓库不再限定为 Claude Code / Claude Cowork 使用。只要你的工具支持读取 `SKILL.md`、自定义 rules、上下文文件、项目说明或脚本，就可以按需复用这些技能。

GitHub: [LI-S-H/my-skills](https://github.com/LI-S-H/my-skills)

## 适用工具

- Codex / OpenAI Codex CLI / Codex 桌面端
- Claude Code / Claude Cowork
- Cursor、Gemini CLI、Roo Code 等支持自定义规则或上下文的 Agent 工具
- 团队内部自建 Agent、代码审核助手、CI 检查脚本

## 仓库结构

```text
my-skills/
├── frontend-browser-qa/
├── frontend-code-audit/
├── frontend-dev-standards/
├── frontend-doc-sync/
├── frontend-fix-loop/
├── frontend-requirement-gate/
├── frontend-skill-index/
└── .trae/
    └── skills/
        ├── blog-writer/
        ├── bug-fix/
        ├── hexo-front-matter/
        ├── requirement-clarifier/
        └── task-review-executor/
```

根目录下的 `frontend-*` 是通用前端 Agent Skills 包，更适合 Codex、Claude Code 或其他 Agent 直接按目录读取。

`.trae/skills` 保留了早期面向 Claude Code / Claude Cowork / Trae 工作流的技能，适合继续作为历史技能库或迁移参考。

## 通用前端 Skills

| Skill | 用途 |
| --- | --- |
| `frontend-skill-index` | 前端技能路由索引，用于判断当前任务应该调用哪个 skill，以及维护技能包结构。 |
| `frontend-requirement-gate` | 前端需求门禁，用于新增或修改页面、表单、表格、弹窗、工作流、权限、状态规则前先明确范围。 |
| `frontend-dev-standards` | 前端开发规范，用于编码或修复前约束组件复用、表单、表格、弹窗、布局、样式、加载和分页一致性。 |
| `frontend-doc-sync` | 前端契约同步，用于 UI 改动影响 API、schema、DTO、Mock、测试数据、校验规则或状态模型时。 |
| `frontend-code-audit` | 前端代码审核，用于 UI 实现或修复后检查数据映射、事件绑定、校验、加载态、提交锁、测试和回归风险。 |
| `frontend-browser-qa` | 前端浏览器验收，用于真实浏览器截图、Playwright 流程、视觉问题、滚动、弹窗和响应式布局检查。 |
| `frontend-fix-loop` | 前端问题修复闭环，用于视觉错乱、交互失效、字段错误、截图反馈、QA 失败、复测和问题记录沉淀。 |

推荐调用顺序：

1. `frontend-requirement-gate`
2. `frontend-dev-standards`
3. `frontend-doc-sync`
4. `frontend-code-audit`
5. `frontend-browser-qa`
6. `frontend-fix-loop`

维护或选择 skill 时，先看 `frontend-skill-index`。

## 历史 `.trae` Skills

| Skill | 用途 |
| --- | --- |
| `requirement-clarifier` | 检测并澄清模糊需求，确保需求可拆解为具体任务。 |
| `task-review-executor` | 通过多 Agent 协作审查复杂任务，包含流程审批、产出验收和问题修正循环。 |
| `bug-fix` | Bug 修复闭环，强调先诊断根因、再实施修复、最后验证和记录。 |
| `blog-writer` | 生成结构清晰、有深度的中文技术博客或技术文档。 |
| `hexo-front-matter` | 为 Hexo 博客 Markdown 添加 YAML front matter。 |

## 安装与同步

### Codex

将需要的目录复制到 Codex skills 目录：

```bash
cp -r frontend-* ~/.codex/skills/
```

Windows 环境通常是：

```text
C:\Users\<你的用户名>\.codex\skills
```

复制后重新打开会话，或让 Codex 重新读取 skills 列表。

### Claude Code / Claude Cowork

可以把本仓库作为团队规则库使用：

1. 克隆仓库到本地固定目录。
2. 在项目说明、上下文或自定义规则里引用对应 `SKILL.md`。
3. 如果 skill 有 `references/`，同时引入相关检查清单。

历史 `.trae/skills` 仍可按旧方式使用；新的 `frontend-*` 目录更适合作为跨 Agent 的通用技能包。

### 其他 Agent 工具

如果工具支持自定义 rules、memory、context、instructions 或 knowledge files，可以按任务阶段引入对应文件：

- 需求不清：`frontend-requirement-gate/SKILL.md`
- 开发前规范：`frontend-dev-standards/SKILL.md`
- 契约或字段变化：`frontend-doc-sync/SKILL.md`
- 提交前审核：`frontend-code-audit/SKILL.md`
- 浏览器验收：`frontend-browser-qa/SKILL.md`
- 用户反馈和复测：`frontend-fix-loop/SKILL.md`

建议不要一次性加载所有规则。按任务阶段加载最相关的 skill，Agent 更容易稳定执行。

## Skill 目录约定

每个通用 skill 目录通常包含：

- `SKILL.md`：入口说明，包含名称、触发场景和工作流程。
- `references/`：更细的规范、清单、问题记录或维护说明。
- `scripts/`：可复用的辅助脚本，例如浏览器截图目录管理、前端检查门禁。
- `agents/`：面向特定 Agent 平台的适配配置。

## 维护原则

- 每个 skill 只负责一个明确阶段，避免做成大而全的提示词。
- `SKILL.md` 保持短小，复杂规则放入 `references/`。
- 自动化能力放入 `scripts/`，避免在说明文档里重复大段脚本。
- 文档默认使用中文；API 名称、命令、配置项和错误信息保留英文原文。
- 新增长期规则时，优先更新最具体的 `references/*.md`，只有跨多个阶段复用时再同步到总览。
