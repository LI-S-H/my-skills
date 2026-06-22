# 浏览器 QA 清单

这是可重复执行的浏览器验收流程。不要只证明路由能打开，要证明变更后的 UI 可用，且截图里没有可见缺陷。

## 以前 QA 容易漏的原因

需要特别防止这些问题：

- 只检查路由加载，不检查工作流是否可用。
- 截了图但没有自己看图，就汇报通过。
- 只看宽表左侧，漏掉右侧操作列重叠。
- 开了 sticky 表头却没有向下滚动检查。
- 没有用真实行数据打开编辑弹窗。
- 没测非法输入、空值、长文本和窄视口。
- 留着旧截图，误当成本轮证据。
- 只靠肉眼看，明明可以用 DOM 断言抓问题。
- 弹窗或表格动画还没稳定就截图，误判透明或遮挡。
- 改共享组件后没有回归旧页面。

## 1. 准备本次验收

1. 明确路由、用户流程和变更组件。
2. 创建新的截图目录：

   ```bash
   node <frontend-browser-qa>/scripts/manage-screenshots.cjs create --name=feature-or-bug
   ```

   将 `<frontend-browser-qa>` 替换为当前 skill 文件夹的绝对路径；如果已经在该 skill 根目录内，可以直接运行 `node scripts/manage-screenshots.cjs ...`。

3. 启动或复用开发服务。
4. 可重复流程优先用 Playwright 或浏览器自动化。只有自动化受阻时才手动截图。
5. 使用稳定测试数据：长名称、长编号、空值、多行数据，以及至少一个非法表单场景。
6. 如果用户反馈带标注截图，每条评论都要转成一个 QA 场景。

## 2. 标准视口

除非项目有更严格要求，至少截图：

- `1440x900`：主桌面视口
- `1115x838`：中等笔记本视口
- `390x844` 或等价尺寸：响应式行为变化时的移动/窄视口

宽表还要截图：

- 左侧列
- 横向滚动后的右侧操作列
- 向下滚动后 sticky 表头仍可见的状态

## 3. 标准截图场景

每个变更页面至少覆盖：

- `list-initial`：首次加载状态
- `list-loading`：查询/刷新/分页后的加载状态
- `list-filtered`：筛选后结果
- `list-empty`：空结果，若可达
- `list-right`：右侧表格列和操作按钮
- `dialog-create-empty`：新增弹窗必填为空与校验
- `dialog-create-filled`：新增弹窗有效数据保存前
- `dialog-edit-prefilled`：编辑弹窗带出原数据
- `dialog-detail`：详情弹窗/抽屉
- `dialog-confirm`：确认、审核、删除等预览或二次确认
- `detail-expanded`：展开行或明细区

文件名包含路由、视口和场景，例如：

```text
orders-1440x900-list-right.png
orders-1115x838-dialog-edit-prefilled.png
orders-1440x900-dialog-confirm.png
```

## 4. 如何用 Playwright 截图

最小脚本结构：

```js
const { chromium } = require('playwright');

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://127.0.0.1:5173/your-route', { waitUntil: 'domcontentloaded' });
await page.screenshot({ path: 'qa-artifacts/browser/<run>/route-1440x900-list-initial.png', fullPage: true });
await browser.close();
```

需要登录的应用，先登录，再回到目标路由。项目已有 smoke helper 时优先复用，不要重复手写登录流程。

验证修复时，相同场景尽量使用相同文件名；需要保留过程时可加 `attempt-2` 或 `fixed`，方便对比。

截图前等待最终 UI 状态：

```js
await page.waitForLoadState('networkidle').catch(() => undefined);
await page.waitForTimeout(250); // 等短动画稳定
```

只在已知动画或异步过渡需要时使用更长等待；不要用随意长等待掩盖真实加载问题。

## 5. 如何核验截图

同时做 DOM 断言和人工看图。DOM 断言抓可度量问题，截图抓人眼可见问题。

推荐 DOM 断言：

- 内容宽于视口时，表格容器存在横向滚动。
- 操作列和相邻时间/状态列不重叠。
- sticky 表头背景不透明。
- 展开明细的 z-index 低于主表 sticky 表头。
- 弹窗正文高度低于视口，底部按钮可见。
- 必填标签和校验信息存在。
- 异步动作后 loading overlay 立即出现。
- 提交/确认按钮在请求中禁用。

Playwright 断言示例：

```js
const boxA = await locatorA.boundingBox();
const boxB = await locatorB.boundingBox();
if (boxA && boxB && boxA.x + boxA.width > boxB.x) throw new Error('columns overlap');

const bg = await header.evaluate(el => getComputedStyle(el).backgroundColor);
if (bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') throw new Error('sticky header is transparent');
```

推荐人工看图：

- 没有文字重叠或压到 sticky 表头下面。
- 值落在对应表头下方。
- 相关字段之间没有异常大间距。
- 长文本不会撑开布局。
- 按钮颜色和标签颜色符合设计系统。
- 弹窗间距和字段分组清楚。
- 详情/展开行和主行有明显区别。

## 6. 交互流程

实际点击和输入：

1. 查询、重置、刷新
2. 分页和每页条数切换
3. 下拉展开/关闭和选项选择
4. 行展开/收起
5. 用非法数据新增，再用有效数据新增
6. 编辑已有数据并确认预填值
7. 保存后打开详情，比对数值
8. 触发提交/审核/确认/删除/停用类预览
9. 从弹窗和确认弹窗取消
10. 验证状态变化后的按钮集合
11. 打开一个下拉，再打开另一个，确认前一个会关闭
12. 验证系统生成/只读字段不可编辑
13. 验证单位/货币提示可见，且不会污染提交值

异步操作期间，要确认加载反馈可见，并禁用重复触发。

## 7. 失败处理

如果截图或断言失败：

1. 把缺陷写成具体事实：页面、视口、元素、实际表现、期望表现。
2. 修复根因。
3. 重新跑同一个浏览器流程。
4. 用同名场景或更高 attempt 后缀保存新截图。
5. 不能用修复前的旧截图汇报成功。

最终回复前自查：

```text
我是否检查了所有引用的截图？
我是否把宽表滚到右侧？
我是否打开了新增、编辑、详情和确认界面？
我是否测试了加载态和非法输入？
我是否在每次修复后替换了旧截图？
我是否等动画稳定后再截图弹窗？
我是否把每条浏览器评论转成场景或断言？
还有什么没测？
```

## 8. 截图卫生

- 不要把截图保存到项目根目录。
- 每次 QA 使用 `qa-artifacts/browser/` 下的独立目录。
- 调试时可以保留失败截图，但文件名要带 `failed` 或 `attempt`。
- 用户确认结果后，再清理不再需要的旧目录：

  ```bash
  node <frontend-browser-qa>/scripts/manage-screenshots.cjs cleanup --approved --run-dir=qa-artifacts/browser/<run>
  ```

- 用户查看或确认前，不要删除唯一证据。

## 9. 长期维护位置

浏览器测试流程和证据要写到固定位置：

- 通用浏览器验收清单：更新 `frontend-browser-qa/references/frontend-product-qa-checklist.md`。
- 本 skill 的详细浏览器 QA 流程：更新 `frontend-browser-qa/references/browser-qa-checklist.md`。
- 截图目录管理脚本：更新 `frontend-browser-qa/scripts/manage-screenshots.cjs`。
- 截图产物：统一放到 `qa-artifacts/browser/<timestamp>-<name>/`，不要散放在项目根目录。
- 用户认可后的重复视觉问题和修法：更新 `frontend-fix-loop/references/frontend-issue-record.md`。

如果某类页面反复漏测，就把它补成标准截图场景或 DOM 断言；如果只是某项目特有流程，写到项目自己的 QA 文档。
