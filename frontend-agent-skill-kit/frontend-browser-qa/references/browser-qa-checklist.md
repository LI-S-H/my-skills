# 浏览器 QA 取证清单

`frontend-browser-qa` 只负责真实浏览器取证：视觉显示问题、基础交互、Playwright 流程和 DOM 断言。截图用于视觉证据；点击、输入、跳转、表单校验、loading、disabled、toast 等动态交互优先用 Playwright 测试或 Playwright MCP 断言验证。PRD、业务流程、用户角色和数据流转是否合理，交给 `frontend-product-acceptance` 判断。

## 1. 准备

1. 明确路由、页面、变更组件和基础流程。
2. 先判断验证类型：

   | 验证类型 | 优先方式 | 输出证据 |
   | --- | --- | --- |
   | 视觉/布局问题 | 浏览器截图 | 截图目录、关键截图、视口和场景 |
   | 动态交互问题 | Playwright 测试或 Playwright MCP | 点击/输入/跳转步骤、DOM 断言结果、失败日志 |
   | 用户截图反馈 | 复现截图 + 必要 DOM 断言 | 对应标注的复现证据和回归场景 |

3. 只有需要截图取证时才创建截图目录（存放在目标项目 `docs/qa-screenshots/` 下）：

   ```bash
   node <frontend-browser-qa>/scripts/manage-screenshots.cjs create --name=feature-or-bug
   ```

   脚本会在目标项目 `docs/qa-screenshots/<时间戳>-<名称>/` 下创建本次截图目录。

4. 启动或复用开发服务。
5. 使用稳定测试数据：长名称、长编号、长备注、空值、多行数据和一个非法表单场景。
6. 用户反馈截图中的每条标注都要转成 QA 场景或 DOM 断言。

## 2. 视口和截图场景

默认视口：`1440x900`、`1115x838`；响应式变化时加 `390x844` 或等价窄视口。

宽表额外覆盖：左侧列、右侧操作列、横向滚动、向下滚动后的 sticky 表头。

常用场景：

- `list-initial`、`list-loading`、`list-filtered`、`list-empty`
- `list-right`、`detail-expanded`
- `dialog-create-empty`、`dialog-create-filled`
- `dialog-edit-prefilled`、`dialog-detail`、`dialog-confirm`

文件名包含路由、视口和场景，例如 `orders-1440x900-list-right.png`。

## 3. 动态交互验证

动态交互不要求默认截图，优先用 Playwright 测试或 Playwright MCP 执行点击、输入、跳转和 DOM 断言。

必须覆盖：

- 查询、重置、刷新、分页、每页条数切换。
- 下拉展开、关闭、选项选择；打开第二个浮层时第一个关闭。
- 行展开和收起。
- 非法新增、有效新增、编辑预填、详情只读。
- 保存后刷新或打开详情确认回显。
- 确认、审核、删除、停用类预览或二次确认。
- 弹窗和确认弹窗取消。
- 系统生成、审计、只读字段不可编辑。

推荐断言：URL/路由变化、按钮 disabled 状态、loading 出现和消失、toast 文案、错误提示位置、表单值回显、请求完成后列表或详情刷新、二次确认弹窗出现和关闭。

动态交互失败时输出步骤、选择器或元素描述、断言条件、实际结果和失败日志；只有失败表现属于视觉/布局问题时才补截图。

这里只证明页面表面可用；按钮是否该出现、流程是否合理，由产品验收判断。

## 4. 视觉检查

- 页面不贴边，首屏结构稳定。
- 表格列不重叠、不漂移；时间列、状态列、操作列不挤压。
- sticky 表头不透明，z-index 正确。
- 横向滚动条在表格视口可操作。
- 长文本截断合理，并可通过悬停、展开或详情看到全文。
- 弹窗字段完整，长弹窗正文滚动，底部按钮可见。
- 二次确认出现时底层弹窗不可点击、不可聚焦。

## 5. Playwright 要求

截图前等待最终 UI 状态：

```js
await page.waitForLoadState('networkidle').catch(() => undefined);
await page.waitForTimeout(250);
```

动态交互验证必须优先使用可重复执行的 Playwright 测试；没有项目测试脚本时，可用 Playwright MCP 临时执行同等步骤，但输出中必须写清点击路径、输入值、断言点和结果，便于后续沉淀为项目测试。

推荐 DOM 断言：横向滚动存在、操作列不重叠、sticky 背景不透明、弹窗底部按钮可见、必填校验存在、loading 出现、提交按钮请求中禁用、toast 出现、路由跳转正确、保存后数据回显。

## 6. 失败处理和输出

失败时写清页面、视口、元素、实际表现和期望表现；问题交给 `frontend-fix-loop` 修复后，由 fix-loop 重新跑同一流程取证。视觉/布局问题必须重新截图，动态交互问题必须重新跑同一 Playwright 测试或 MCP 断言，不能用旧截图或旧断言证明新状态。

输出：开发服务 URL、测试路由、验证类型、视口（如有）、基础流程、截图目录（如有，目标项目 `docs/qa-screenshots/<时间戳>-<名称>/`）、关键截图（如有）、Playwright/MCP 点击路径和 DOM 断言结果、显示/基础交互问题清单、未覆盖场景，以及是否建议交给 `frontend-product-acceptance`。发现的问题不在此阶段修复，交给 `frontend-fix-loop`。

## 7. 规范缺口沉淀

发现本文件规则缺失或表达不清时，更新本文件（`frontend-browser-qa/references/browser-qa-checklist.md`）。

无论触发场景是 fix-loop 沉淀、用户直接指出还是 Agent 自发现，都按 `frontend-fix-loop/references/fix-loop.md` 第6节"文档更新指引"执行：全文搜索→判断有无相似规则→强化/改写/新增→输出沉淀文件和动作。