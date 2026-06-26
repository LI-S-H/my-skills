# My Skills

个人 Agent Skills 仓库，沉淀可复用的工作流、检查清单、脚本和 Agent 指令。

GitHub: [LI-S-H/my-skills](https://github.com/LI-S-H/my-skills)

这个仓库不是单一 skill，而是一个个人 Skills 总仓库：

- **前端开发包**：位于 `frontend-agent-skill-kit/`，覆盖前端项目从需求澄清、PRD、开发规范、契约同步、代码审核、浏览器 QA、产品验收到修复沉淀的完整闭环。
- **博客写作包**：位于 `blog/`，把技术博客写作和 Hexo front matter 处理放在一起，方便写文章和发布。
- **通用工作流工具**：位于 `universal/`，沉淀需求澄清、任务审查、Bug 修复等可复用 Agent 工作流。

## 适用工具

- Codex / OpenAI Codex CLI / Codex 桌面端
- Claude Code / Claude Cowork
- Cursor、Gemini CLI、Roo Code 等支持自定义规则或上下文的 Agent 工具
- 团队内部自建 Agent、代码审核助手、CI 检查脚本
- Trae 等支持 Skills 体系的 IDE

## 快速导航

| 分组 | 目录 | 用途 |
| --- | --- | --- |
| 前端开发包 | `frontend-agent-skill-kit/` | 前端项目全流程开发、审核、验收和自进化沉淀 |
| 博客写作包 | `blog/` | 技术博客写作、Hexo 文章头部信息生成 |
| 通用工作流工具 | `universal/` | 需求澄清、复杂任务审查、Bug 修复闭环 |

## 仓库结构

```text
my-skills/
├── frontend-agent-skill-kit/             # 前端开发包
│   ├── frontend-browser-qa/              # 浏览器 QA 取证：视觉截图 + Playwright/MCP 动态断言
│   ├── frontend-code-audit/              # 前端代码审核
│   ├── frontend-dev-standards/           # 前端开发规范
│   ├── frontend-doc-sync/                # 字段、接口、Schema、Mock 契约同步
│   ├── frontend-fix-loop/                # 问题修复闭环和经验沉淀
│   ├── frontend-product-acceptance/      # 产品验收
│   ├── frontend-product-docs/            # PRD 生成和维护
│   ├── frontend-requirement-gate/        # 需求门禁
│   └── frontend-skill-index/             # 前端 skill 索引和路由说明
├── blog/                                 # 博客写作包
│   ├── blog-writer/                      # 技术博客写作
│   └── hexo-front-matter/                # Hexo front matter 生成
└── universal/                            # 通用工作流工具
    ├── bug-fix/                          # Bug 修复闭环
    ├── requirement-clarifier/            # 需求澄清
    └── task-review-executor/             # 复杂任务审查执行
```

每个 skill 目录都以 `SKILL.md` 作为入口；如果存在 `references/`，则放长期维护的检查清单和规则；如果存在 `scripts/`，则放可复用脚本。

---

## 前端开发包：frontend-agent-skill-kit

`frontend-agent-skill-kit/` 覆盖前端项目开发的全流程，但**只沉淀前端技术经验**：布局、交互、组件复用、表单、表格、弹窗、字段映射、事件绑定、浏览器取证、代码审核等。

业务逻辑、权限规则、状态流转、字段业务口径等项目特有内容，不写进通用 skill，而是沉淀到目标项目的 `docs/product/PRD.md`。

### 工作流全景

```text
需求门禁 ──复述模板──→ PRD生成 ──PRD──→ 开发规范 ──代码──→ 契约同步
                                                          │
                                                          ▼
                                                      代码审核(分类输出)
                                                     ╱        │        ╲
                                          显示问题      代码问题     业务逻辑
                                             │           │           │
                                             ▼           ▼           ▼
                                         浏览器QA     fix-loop    fix-loop
                           (视觉截图 / Playwright断言) →code-audit →产品验收
                                             │           │           │
                                             └─────→ fix-loop ←──────┘
                                                       │
                                            显示/代码问题 → skill 文件
                                            业务逻辑问题 → 项目 PRD
```

### 推荐调用顺序

| 阶段 | Skill | 路径 | 用途 |
| --- | --- | --- | --- |
| 1. 需求澄清 | `frontend-requirement-gate` | `frontend-agent-skill-kit/frontend-requirement-gate/` | 开发前确认目标、范围、用户动作、业务状态、数据来源和验收标准 |
| 2. PRD 生成 | `frontend-product-docs` | `frontend-agent-skill-kit/frontend-product-docs/` | 在目标项目生成 `docs/product/PRD.md`，补全产品需求文档 |
| 3. 开发规范 | `frontend-dev-standards` | `frontend-agent-skill-kit/frontend-dev-standards/` | 改代码前检查组件复用、字段契约、表格、弹窗、样式、异步状态 |
| 4. 契约同步 | `frontend-doc-sync` | `frontend-agent-skill-kit/frontend-doc-sync/` | 字段、接口、Schema、Mock、测试数据变化时保持一致 |
| 5. 代码审核 | `frontend-code-audit` | `frontend-agent-skill-kit/frontend-code-audit/` | 写完后按三类（显示/代码/业务逻辑）输出问题 |
| 6. 浏览器 QA | `frontend-browser-qa` | `frontend-agent-skill-kit/frontend-browser-qa/` | 视觉问题用截图取证；动态交互用 Playwright 测试或 MCP 点击/DOM 断言 |
| 7. 产品验收 | `frontend-product-acceptance` | `frontend-agent-skill-kit/frontend-product-acceptance/` | 基于 PRD 与浏览器证据，从产品视角审核功能和业务逻辑 |
| 8. 修复闭环 | `frontend-fix-loop` | `frontend-agent-skill-kit/frontend-fix-loop/` | 处理用户反馈和重复问题，修复、回归、确认后沉淀规则 |
| 9. 技能索引 | `frontend-skill-index` | `frontend-agent-skill-kit/frontend-skill-index/` | 维护或选择 skill 时查看路由和包结构 |

### 三类问题与沉淀路径

| 问题类型 | 说明 | 沉淀位置 |
| --- | --- | --- |
| 显示问题 | 视觉错乱、布局破、表格重叠、sticky 透明、截断不合理、响应式异常 | `frontend-agent-skill-kit/` 内的 skill 长期维护文件 |
| 代码问题 | 数据映射错、事件绑定缺、校验缺、提交锁缺、Mock 不一致、测试缺失 | `frontend-agent-skill-kit/` 内的 skill 长期维护文件 |
| 业务逻辑问题 | 状态流转不符合业务、权限规则错、字段含义/来源/口径与业务不符、流程缺口、验收标准缺失 | 目标项目 `docs/product/PRD.md` |

**核心设计原则**：通用前端问题沉淀进 skill 仓库（跨项目复用），业务逻辑问题沉淀进目标项目 PRD（各项目独特要求）。

### Skill 详细说明

| Skill | 主 Reference | 核心产出 |
| --- | --- | --- |
| `frontend-requirement-gate` | `references/requirement-checklist.md` | 需求复述模板、假设和待确认项 |
| `frontend-product-docs` | `references/product-docs-guide.md` | 目标项目 `docs/product/PRD.md` |
| `frontend-dev-standards` | `references/frontend-dev-standards.md` | 按规范实现的前端代码 |
| `frontend-doc-sync` | `references/doc-sync-checklist.md` | 字段矩阵、API/Schema、Mock、测试数据同步 |
| `frontend-code-audit` | `references/code-audit-checklist.md` | 分类输出的问题清单（显示/代码/业务逻辑） |
| `frontend-browser-qa` | `references/browser-qa-checklist.md` | 截图目录（如有）、视觉证据、Playwright/MCP 动态交互断言结果 |
| `frontend-product-acceptance` | `references/product-acceptance-checklist.md` | 验收结论 + 问题分流 |
| `frontend-fix-loop` | `references/fix-loop.md` | 修复结果 + 沉淀到对应文件 |
| `frontend-skill-index` | `references/frontend-skill-package.md` | skill 路由和包结构说明 |

### 自进化机制

所有前端 skill 支持三种触发场景的规则沉淀：

1. **fix-loop 沉淀**：修复问题后，用户确认，暴露出规则缺失。
2. **用户直接指出**：用户明确说某个清单漏了规则或规则有误。
3. **Agent 自发现**：使用 skill 时发现规则缺口。

无论哪种场景，都遵循相同的更新步骤：

```text
定位文件 → 全文搜索 → 强化/改写/新增 → 输出沉淀动作
```

已有规则未被执行时，强化原条目，**禁止另写新条目**。这样规则会越来越具体，但不会越沉淀越乱。

---

## 博客写作包：blog

`blog/` 用于写作和发布技术博客。

| Skill | 路径 | 用途 |
| --- | --- | --- |
| `blog-writer` | `blog/blog-writer/` | 生成结构清晰、有深度的中文技术博客或技术文档 |
| `hexo-front-matter` | `blog/hexo-front-matter/` | 为 Hexo 博客 Markdown 添加 YAML front matter |

推荐使用方式：

1. 先用 `blog-writer` 生成或整理文章主体。
2. 再用 `hexo-front-matter` 添加 `title`、`date`、`tags`、`description`、`categories`、`cover` 等发布字段。

---

## 通用工作流工具：universal

`universal/` 不绑定前端开发包，可以作为独立工作流复用。

| Skill | 路径 | 用途 |
| --- | --- | --- |
| `requirement-clarifier` | `universal/requirement-clarifier/` | 检测并澄清模糊需求，确保需求可拆解为具体任务 |
| `task-review-executor` | `universal/task-review-executor/` | 通过多 Agent 协作审查复杂任务，包含流程审批、产出验收和问题修正循环 |
| `bug-fix` | `universal/bug-fix/` | Bug 修复闭环，强调先诊断根因、再实施修复、最后验证和记录 |

---

## 文档收敛原则

- 每个 skill 默认只有一个强制阅读的主 reference，减少 token 消耗和规则冲突。
- 记录库、脚本说明、目标项目 PRD 按需读取。
- 具体业务 PRD 不写进本 skill 包，维护在目标项目 `docs/product/PRD.md`。
- 视觉问题的浏览器截图存放在目标项目 `docs/qa-screenshots/` 下，不放进 skill 仓库。
- 动态交互问题优先沉淀为 Playwright 测试或 MCP 断言记录。

---

## 安装与同步

### Codex

按需要复制对应分组到 Codex skills 目录。

只安装前端开发包：

```bash
cp -r frontend-agent-skill-kit/frontend-* ~/.codex/skills/
```

安装博客写作包：

```bash
cp -r blog/* ~/.codex/skills/
```

安装通用工作流工具：

```bash
cp -r universal/* ~/.codex/skills/
```

Windows 环境通常是 `C:\Users\<你的用户名>\.codex\skills`。

PowerShell 示例：

```powershell
Copy-Item .\frontend-agent-skill-kit\frontend-* $env:USERPROFILE\.codex\skills -Recurse
Copy-Item .\blog\* $env:USERPROFILE\.codex\skills -Recurse
Copy-Item .\universal\* $env:USERPROFILE\.codex\skills -Recurse
```

### Trae

将需要的 skill 目录复制到 Trae 的 skills 目录，或在项目设置中引用对应目录。

常用选择：

- 前端开发：复制 `frontend-agent-skill-kit/frontend-*`
- 博客写作：复制 `blog/*`
- 通用工作流：复制 `universal/*`

### Claude Code / Claude Cowork

把本仓库作为团队规则库使用：

1. 克隆仓库到本地固定目录。
2. 在项目说明、上下文或自定义规则里引用对应 `SKILL.md`。
3. 如果 skill 有 `references/`，同时引入相关检查清单。

### 其他 Agent 工具

按任务阶段引入对应文件：

- 需求不清：`frontend-agent-skill-kit/frontend-requirement-gate/SKILL.md`
- 需要生成或补全 PRD：`frontend-agent-skill-kit/frontend-product-docs/SKILL.md`
- 开发前规范：`frontend-agent-skill-kit/frontend-dev-standards/SKILL.md`
- 契约或字段变化：`frontend-agent-skill-kit/frontend-doc-sync/SKILL.md`
- 提交前审核：`frontend-agent-skill-kit/frontend-code-audit/SKILL.md`
- 浏览器取证：`frontend-agent-skill-kit/frontend-browser-qa/SKILL.md`
- 产品验收：`frontend-agent-skill-kit/frontend-product-acceptance/SKILL.md`
- 用户反馈和复测：`frontend-agent-skill-kit/frontend-fix-loop/SKILL.md`
- 博客写作：`blog/blog-writer/SKILL.md`
- Hexo 头部信息：`blog/hexo-front-matter/SKILL.md`
- Bug 修复：`universal/bug-fix/SKILL.md`
- 需求澄清：`universal/requirement-clarifier/SKILL.md`
- 复杂任务审查：`universal/task-review-executor/SKILL.md`

建议不要一次性加载所有规则。按任务阶段加载最相关的 skill，Agent 更容易稳定执行。

---

## 手动推送到 GitHub

当前仓库已经是一个总仓库，不需要重新打包成新仓库。整理 README 后，推荐按下面步骤手动推送：

```bash
# 1. 查看改动
git status

git diff README.md

# 2. 暂存 README
git add README.md

# 3. 提交
git commit -m "docs: align readme with skills directory layout"

# 4. 推送到 GitHub
git push origin master
```

如果你的远端默认分支是 `main`，最后一步改成：

```bash
git push origin main
```

推送前可以先确认远端和当前分支：

```bash
git remote -v
git branch --show-current
```
