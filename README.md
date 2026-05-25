# My Skills

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-Compatible-blue)](https://claude.ai/code)
[![Claude Cowork](https://img.shields.io/badge/Claude%20Cowork-Compatible-green)](https://claude.ai)

适用于 **Claude Code / Claude Cowork** 的技能合集，覆盖开发全流程：需求澄清 → 任务审查执行 → Bug 修复。

---

## 技能总览

| 技能 | 用途 | 触发方式 |
|------|------|----------|
| [requirement-clarifier](/.trae/skills/requirement-clarifier/SKILL.md) | 检测并澄清模糊需求，确保需求可拆解为具体任务 | 用户描述模糊、范围不明确时自动触发 |
| [task-review-executor](/.trae/skills/task-review-executor/SKILL.md) | 多 Agent 协作审查执行，流程审批、产出验收、问题修正 | 任务复杂度高、用户多次反馈不符时自动触发 |
| [bug-fix](/.trae/skills/bug-fix/SKILL.md) | 先诊断再开药，分支隔离，自测闭环 | 说出 fix/修复/报错/debug 等关键词自动触发 |

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

三个技能相互协作形成完整闭环：
- **requirement-clarifier** 在 task-review-executor 审查阶段检测到模糊需求时被调用
- **bug-fix** 可被 task-review-executor 在执行过程中遇到 Bug 时作为子任务调度
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
        ├── bug-fix/
        │   └── SKILL.md
        ├── requirement-clarifier/
        │   └── SKILL.md
        └── task-review-executor/
            └── SKILL.md
```

---

## 许可

MIT © LI-S-H
