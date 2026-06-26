---
name: "hexo-front-matter"
description: "为Hexo博客的Markdown笔记添加YAML front matter头部。当用户需要给博客文章添加Hexo格式的front matter时调用。"
---

# Hexo Front Matter 添加器

为Hexo博客的Markdown笔记添加符合格式的YAML front matter头部。

## 触发条件

当用户要求给博客文章添加front matter、添加Hexo头部信息、或提到"front matter"时调用此skill。

## Front Matter 格式

```yaml
---
title: <文章标题>
date: <日期时间，格式 YYYY-MM-DD HH:mm:ss>
tags: [<标签1>, <标签2>, ...]
description: <文章摘要描述>
categories: <分类>
cover: <封面图片路径>
---
```

## 执行步骤

1. **读取目标文件**：读取用户指定的Markdown文件，确认当前内容
2. **检查是否已有front matter**：如果文件开头已有 `---` 包裹的YAML块，则更新而非重复添加
3. **推断字段**：从文件名和文件内容推断以下字段的建议值：
   - `title`：从文件名推断（如 `Hot 100 --- 三数之和.md` → `Hot 100 --- 三数之和`）
   - `date`：使用当前时间
   - `tags`：从文章内容推断算法类型等标签
   - `description`：从文章内容生成摘要描述
4. **向用户确认**：使用 AskUserQuestion 工具，将推断的字段值作为选项展示给用户，让用户选择或自行输入：
   - `title`：展示推断值，用户可确认或修改
   - `date`：展示当前时间，用户可确认或修改
   - `tags`：展示推断的标签列表，用户可确认或修改
   - `description`：展示推断的描述，用户可确认或修改
   - `categories`：**必须向用户询问**，不做任何默认推断
   - `cover`：**必须向用户询问**，不做任何默认推断
5. **生成front matter**：按格式生成YAML头部
6. **写入文件**：将front matter插入到文件最开头（在已有内容之前）

## 关键规则

- **`categories` 和 `cover` 没有默认值**，必须向用户询问，不能自行推断或填充
- **所有字段都必须让用户确认**，推断值仅作为建议选项展示，不能静默填入
- 使用 AskUserQuestion 工具与用户交互，不要自行决定任何字段的最终值

## 注意事项

- front matter 必须位于文件最开头
- `---` 与内容之间不要有多余空行
- front matter 结束的 `---` 后面需要空一行再接正文
- `tags` 使用YAML数组格式 `[tag1, tag2]`
- `date` 格式必须为 `YYYY-MM-DD HH:mm:ss`
- 如果文件已有front matter，只更新用户指定的字段，保留未指定的原字段
