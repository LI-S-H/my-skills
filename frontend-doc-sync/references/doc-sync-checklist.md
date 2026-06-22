# 契约同步清单

UI 和数据契约互相影响时使用本清单。

## 1. 字段清单

每个字段记录：

- UI 名称
- API/schema 字段名
- 类型和是否可空
- 可编辑或只读
- 来源：用户输入、系统生成、关联、聚合、派生、字典
- 校验规则
- 空值展示

超过 5 个字段变化时，用矩阵，不要写散文：

```text
UI 标签 | API/schema 字段 | 类型 | 来源 | 可编辑 | 必填 | 空值展示 | 测试数据
```

## 2. API 和 Schema

按项目实际情况更新：

- OpenAPI、GraphQL schema、tRPC router、REST 文档、protobuf、JSON schema
- 请求和响应 DTO
- API 适配器或 client mapper
- Mock 服务、fixtures、seed data
- 示例 payload 和错误响应

## 3. 状态和动作契约

工作流页面要记录：

- 页面展示的所有状态
- 每个状态允许的动作
- 权限要求
- 每个状态下哪些字段可编辑
- 是否需要预览/二次确认
- 终态和反向/撤销规则

状态动作表：

```text
状态 | 可见动作 | 可编辑字段 | 动作前必填字段 | 确认方式 | 结果状态
```

这可以避免列表显示了动作，但编辑/详情弹窗不支持；也可以避免状态被做成自由下拉。

## 4. 测试和数据

测试要同步：

- 正确新增/编辑 payload
- 必填字段为空 payload
- 包含长文本和空值的列表响应
- 详情响应
- 权限不足或动作禁用响应
- 冲突或校验失败响应

测试数据至少包含：

- 长文本
- 可空字段为空
- 停用/不可选的关联选项
- 多种状态
- 足够触发分页和滚动的行数

## 5. 停止条件

遇到这些情况先停下来澄清：

- UI 需要的字段没有任何契约能提供。
- 契约暴露了不应该编辑的字段。
- Mock 数据和文档 API 不一致。
- 前端只能靠猜后端行为才能工作。
- 页面想展示需要昂贵全量聚合的摘要，但用户其实只需要当前页决策；除非产品明确需要总数，否则优先当前页业务指标或无总数分页。

## 6. 长期维护位置

契约类规则按文件职责更新：

- 通用字段来源、DTO、Mock、schema 规则：更新 `frontend-dev-standards/references/frontend-dev-must-read.md`。
- 本契约同步清单：更新 `frontend-doc-sync/references/doc-sync-checklist.md`。
- 浏览器或功能验收因契约变化需要新增场景：更新 `frontend-browser-qa/references/frontend-product-qa-checklist.md`。
- 已确认的契约错误案例和修法：更新 `frontend-fix-loop/references/frontend-issue-record.md`。
- 具体项目的 OpenAPI、数据库设计、Mock 或接口说明：更新该项目自己的 API/schema/database 文档，不写进通用 skill。

不要把项目专属字段、业务表名或接口路径沉淀到通用 skill；这里只记录可迁移的前端契约方法。
