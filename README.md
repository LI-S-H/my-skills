# My Skills

个人 Agent Skills 仓库，沉淀可复用的工作流、检查清单、脚本和 Agent 指令。

GitHub: [LI-S-H/my-skills](https://github.com/LI-S-H/my-skills)

## 适用工具

- Codex / OpenAI Codex CLI / Codex 桌面端
- Claude Code / Claude Cowork
- Cursor、Gemini CLI、Roo Code 等支持自定义规则或上下文的 Agent 工具
- 团队内部自建 Agent、代码审核助手、CI 检查脚本
- Trae 等支持 Skills 体系的 IDE

## 仓库结构

```text
my-skills/
├── frontend-browser-qa/         # 浏览器 QA 取证
├── frontend-code-audit/         # 代码审核
├── frontend-dev-standards/      # 开发规范
├── frontend-doc-sync/           # 契约同步
├── frontend-fix-loop/           # 修复闭环
├── frontend-product-acceptance/ # 产品验收
├── frontend-product-docs/       # PRD 生成
├── frontend-requirement-gate/   # 需求门禁
├── frontend-skill-index/        # 技能索引
└── .trae/skills/                # 历史技能（Trae/ Claude 兼容）
    ├── blog-writer/
    ├── bug-fix/
    ├── hexo-front-matter/
    ├── requirement-clarifier/
    └── task-review-executor/
```

根目录下的 `frontend-*` 是通用前端 Agent Skills 包，按阶段拆分，闭环协作。

`.trae/skills` 保留了早期面向 Claude Code / Trae 工作流的技能，适合继续作为历史技能库或迁移参考。

## 通用前端 Skills 工作流

9 个 skill 组成完整的前端开发闭环，从需求到验收，再到问题修复和知识沉淀。

### 工作流全景

```
需求门禁 ──复述模板──→ PRD生成 ──PRD──→ 开发规范 ──代码──→ 契约同步
                                                          │
                                                          ▼
                                                      代码审核(分类输出)
                                                     ╱        │        ╲
                                          显示问题      代码问题     业务逻辑
                                             │           │           │
                                             ▼           ▼           ▼
                                         浏览器QA     fix-loop    fix-loop
                                        (取证不修复)   →code-audit  →产品验收
                                             │           │           │
                                             └─────→ fix-loop ←──────┘
                                                       │
                                            显示/代码问题 → skill 文件
                                            业务逻辑问题 → 项目 PRD
```

### 推荐调用顺序

| 阶段 | Skill | 用途 |
| --- | --- | --- |
| 1. 需求澄清 | `frontend-requirement-gate` | 开发前确认目标、范围、用户动作、业务状态、数据来源和验收标准 |
| 2. PRD 生成 | `frontend-product-docs` | 在目标项目生成 `docs/product/PRD.md`，补全产品需求文档 |
| 3. 开发规范 | `frontend-dev-standards` | 改代码前检查组件复用、字段契约、表格、弹窗、样式、异步状态 |
| 4. 契约同步 | `frontend-doc-sync` | 字段、接口、Schema、Mock、测试数据变化时保持一致 |
| 5. 代码审核 | `frontend-code-audit` | 写完后按三类（显示/代码/业务逻辑）输出问题 |
| 6. 浏览器 QA | `frontend-browser-qa` | 真实浏览器截图、Playwright、视觉取证（只取证不修复） |
| 7. 产品验收 | `frontend-product-acceptance` | 基于 PRD 与浏览器证据，从产品视角审核功能和业务逻辑 |
| 8. 修复闭环 | `frontend-fix-loop` | 处理用户反馈和重复问题，修复、回归、确认后沉淀规则 |

维护或选择 skill 时，先看 `frontend-skill-index`。

### 三类问题与沉淀路径

| 问题类型 | 说明 | 沉淀位置 |
| --- | --- | --- |
| 显示问题 | 视觉错乱、布局破、表格重叠、sticky 透明、截断不合理、响应式异常 | skill 长期维护文件 |
| 代码问题 | 数据映射错、事件绑定缺、校验缺、提交锁缺、Mock 不一致、测试缺失 | skill 长期维护文件 |
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
| `frontend-browser-qa` | `references/browser-qa-checklist.md` | 截图目录（目标项目 `docs/qa-screenshots/`）、断言结果 |
| `frontend-product-acceptance` | `references/product-acceptance-checklist.md` | 验收结论 + 问题分流 |
| `frontend-fix-loop` | `references/fix-loop.md` | 修复结果 + 沉淀到对应文件 |
| `frontend-skill-index` | `references/frontend-skill-package.md` | skill 路由和包结构说明 |

## 历史 Skills（.trae/skills）

| Skill | 用途 |
| --- | --- |
| `requirement-clarifier` | 检测并澄清模糊需求，确保需求可拆解为具体任务 |
| `task-review-executor` | 通过多 Agent 协作审查复杂任务，包含流程审批、产出验收和问题修正循环 |
| `bug-fix` | Bug 修复闭环，强调先诊断根因、再实施修复、最后验证和记录 |
| `blog-writer` | 生成结构清晰、有深度的中文技术博客或技术文档 |
| `hexo-front-matter` | 为 Hexo 博客 Markdown 添加 YAML front matter |

## 文档收敛原则

- 每个 skill 默认只有一个强制阅读的主 reference，减少 token 消耗和规则冲突
- 记录库、脚本说明、目标项目 PRD 按需读取
- 具体业务 PRD 不写进本 skill 包，维护在目标项目 `docs/product/PRD.md`
- 浏览器截图存放在目标项目 `docs/qa-screenshots/` 下，不放进 skill 仓库

## 自进化机制

所有 skill 支持三种触发场景的规则沉淀：

1. **fix-loop 沉淀**：修复问题后，用户确认，暴露出规则缺失
2. **用户直接指出**：用户明确说某个清单漏了规则或规则有误
3. **Agent 自发现**：使用 skill 时发现规则缺口

无论哪种场景，都遵循相同的更新步骤：定位文件 → 全文搜索 → 强化/改写/新增 → 输出沉淀动作。已有规则未被执行时，强化原条目，**禁止另写新条目**。

详细映射表和操作步骤见 `frontend-fix-loop/references/fix-loop.md` 第6节。

## 安装与同步

### Codex

将需要的目录复制到 Codex skills 目录：

```bash
cp -r frontend-* ~/.codex/skills/
```

Windows 环境通常是 `C:\Users\<你的用户名>\.codex\skills`。

### Trae

将仓库中的 skill 目录复制到 Trae 的 skills 目录，或在项目设置中引用。

### Claude Code / Claude Cowork

把本仓库作为团队规则库使用：

1. 克隆仓库到本地固定目录
2. 在项目说明、上下文或自定义规则里引用对应 `SKILL.md`
3. 如果 skill 有 `references/`，同时引入相关检查清单

### 其他 Agent 工具

按任务阶段引入对应文件：

- 需求不清：`frontend-requirement-gate/SKILL.md`
- 需要生成或补全 PRD：`frontend-product-docs/SKILL.md`
- 开发前规范：`frontend-dev-standards/SKILL.md`
- 契约或字段变化：`frontend-doc-sync/SKILL.md`
- 提交前审核：`frontend-code-audit/SKILL.md`
- 浏览器取证：`frontend-browser-qa/SKILL.md`
- 产品验收：`frontend-product-acceptance/SKILL.md`
- 用户反馈和复测：`frontend-fix-loop/SKILL.md`

建议不要一次性加载所有规则。按任务阶段加载最相关的 skill，Agent 更容易稳定执行。


