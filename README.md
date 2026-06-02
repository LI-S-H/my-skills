# My Skills

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-Compatible-blue)](https://claude.ai/code)
[![Claude Cowork](https://img.shields.io/badge/Claude%20Cowork-Compatible-green)](https://claude.ai)

适用于 **Claude Code / Claude Cowork** 的技能合集，覆盖开发全流程：需求澄清 → 任务审查执行 → Bug 修复 → 技术博客写作 → Hexo博客管理。

---

## 前置依赖

本合集依赖 [Superpowers](https://github.com/anthropics/claude-code-superpowers) 工作流系统。请先安装 `using-superpowers` 技能，确保技能调度框架正常运行。

```bash
# 安装 Superpowers
# 详见 https://github.com/anthropics/claude-code-superpowers
```

部分技能还会调用以下配套 skill：

| 配套 skill | 被谁调用 | 作用 |
|-----------|---------|------|
| `systematic-debugging` | bug-fix | 根因分析 |
| `using-git-worktrees` | bug-fix | 分支隔离 |
| `verification-before-completion` | bug-fix | 验证闭环 |
| `requirement-clarifier` | task-review-executor | 模糊需求澄清 |

---

## 技能总览

| 技能 | 用途 | 触发方式 |
|------|------|----------|
| [requirement-clarifier](/.trae/skills/requirement-clarifier/SKILL.md) | 检测并澄清模糊需求，确保需求可拆解为具体任务 | 用户描述模糊、范围不明确时自动触发 |
| [task-review-executor](/.trae/skills/task-review-executor/SKILL.md) | 多 Agent 协作审查执行，流程审批、产出验收、问题修正 | 任务复杂度高、用户多次反馈不符时自动触发 |
| [bug-fix](/.trae/skills/bug-fix/SKILL.md) | 先诊断再开药，分支隔离，自测闭环 | 说出 fix/修复/报错/debug 等关键词自动触发 |
| [blog-writer](/.trae/skills/blog-writer/SKILL.md) | 生成结构清晰、内容深度的中文技术博客/文档 | 用户说"写博客"、"写文档"、"整理成文章"时触发 |
| [hexo-front-matter](/.trae/skills/hexo-front-matter/SKILL.md) | 为Hexo博客Markdown添加YAML front matter头部 | 用户需要给博客文章添加front matter时触发 |

---

## 技能机制详解

### 1. requirement-clarifier（需求澄清）

**目标：** 将用户模糊描述转化为可拆解、可执行的具体任务。

**触发条件：**
- 显式模糊：动作无对象（"优化一下"）、动作无标准（"做得更好"）、范围不明确（"处理一下"）、冲突需求（"要简单但功能全"）
- 隐式判断：先结合上下文推断意图，仅在推断后仍有不确定项时才询问用户

**三阶段澄清机制：**
1. **主动追问** — 同一模糊点最多 2 次，主动提供选项 + 自定义输入
2. **计划确认** — 追问 2 次后仍不清晰，生成执行计划供用户修改（最多 2 次）
3. **直接执行** — 修改也达 2 次上限时，按当前最佳理解直接执行

**输出：** 标准化需求描述（目标、范围、输出格式、约束、澄清记录）

---

### 2. task-review-executor（任务审查执行）

**目标：** 通过多 Agent 协作确保复杂任务高质量完成。

**触发条件（满足任一即触发）：**

| 维度 | 阈值 |
|------|------|
| 子任务数 | > 6个 |
| 预估执行时间 | > 10分钟 |
| 涉及文件数 | > 5个文件 或 存在大文件 |
| 跨领域操作 | 是（如前端+后端+数据库） |
| 用户反馈产出不符 | ≥ 2次 |

**协作循环流程：**

```
主Agent 分解任务 → 审查Agent 审批流程 → 执行Agent 执行子任务 → 审查Agent 验收产出
       ↑                                                         ↓
       └────────────── 不通过则返回修正，循环往复 ────────────────┘
```

**三个角色：**
- **主Agent（调度者）**：理解需求、分解任务、调度子 Agent、修正流程、投票仲裁
- **审查Agent**：审查流程规划、验收产出物、给出修改建议、投票仲裁
- **执行Agent**：按阶段执行任务、执行前确认历史状态、完成汇报

**投票机制：** 审查与执行意见冲突时，三方各 1 票，多数票采纳，平票时主 Agent 最终决定。

**执行模式：** 串行（默认，子任务有依赖）或并行（子任务前后无关）。

**日志机制：** 讨论历史写入 `_logs/task-review-{YYYYMMDD-HHmmss}.md`，审查通过后仅保留最终流程。

---

### 3. bug-fix（Bug 修复）

**目标：** 从「有人说有 Bug」到「修复完成并记录日志」的完整闭环。

**触发关键词：** `fix` · `修改bug` · `修复` · `修一下` · `解决报错` · `不工作` · `报错了` · `异常` · `debug` · `not working` · `error`

**核心原则：**
1. 先诊断，再开药 — 根因未确认前禁止动手
2. 最小影响 — 修改前评估对其他模块影响，引入新 bug 一并修复
3. 分支隔离 — 创建 `fix/issue-<编号>-<描述>` 分支，禁止在主分支直接改
4. 自测通过再交付 — 先模拟验证，再浏览器实测
5. 失败不钻死角 — 方案级失败换方案，代码级失败就地修，连续 3 次失败暂停
6. 全程记录 — 双写项目日志 + Memory 日志

**九步流程：** 收集信息 → 根因分析 → 难度评估 → 方案设计（仅复杂） → 修复计划 → 安全漏洞专项 → 实施修复 → 验证测试 → 迭代修复

**简单 vs 复杂 Bug：**
- 简单（≤5 行、单文件）：跳过方案设计，直接修复
- 复杂（其余所有情况）：必须产出 ≥2 个对比方案，用户选择后动手

**双写日志：**
- 项目日志：`<项目根目录>/BUGFIX_LOG.md` — 修复前读取，完成后更新
- Memory 日志：`project` 类型 — 追踪跨会话迭代过程

---

## 协作关系

```
需求澄清 ──→ 任务审查执行 ──→ Bug 修复
  │              │                │
  │  模糊需求     │  复杂任务       │  报错/Bug
  │  缺少标准     │  多文件操作     │  修复请求
  │  范围不明     │  跨领域工作     │
  │              │                │
  ▼              ▼                ▼
标准化需求   审查+执行闭环    诊断+修复+验证
```

五个技能相互协作形成完整闭环：
- **requirement-clarifier** 在 task-review-executor 审查阶段检测到模糊需求时被调用
- **bug-fix** 可被 task-review-executor 在执行过程中遇到 Bug 时作为子任务调度
- **blog-writer** 可独立使用，也可在任务完成后生成技术文档或博客
- **hexo-front-matter** 在 blog-writer 完成博客写作后，为 Hexo 格式文章添加 front matter
- 所有技能均支持中文交互

---

## 安装

```bash
# 克隆仓库
git clone https://github.com/LI-S-H/my-skills.git

# 复制技能到 Claude 目录（以 bug-fix 为例）
mkdir -p ~/.claude/skills/bug-fix
cp my-skills/.trae/skills/bug-fix/SKILL.md ~/.claude/skills/bug-fix/SKILL.md

# 或通过 Cowork 的 save_skill 接口直接导入各 SKILL.md
```

---

## 项目结构

```
my-skills/
├── .gitignore
├── README.md
└── .trae/
    └── skills/
        ├── blog-writer/
        │   └── SKILL.md
        ├── bug-fix/
        │   └── SKILL.md
        ├── hexo-front-matter/
        │   └── SKILL.md
        ├── requirement-clarifier/
        │   └── SKILL.md
        └── task-review-executor/
            └── SKILL.md
```

---

## 许可

MIT © LI-S-H
