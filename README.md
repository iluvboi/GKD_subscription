# GKD_subscription

本仓库用于跟踪上游 GKD 订阅，并在不改变有效规则行为的前提下维护独立订阅。

## 文件

- `upstream.json5`：上游原始订阅镜像，原则上不做人工修改。
- `gkd.json5`：当前可用订阅基线；未经人工审核不自动覆盖。
- `audit/audit.mjs`：JSON5 校验、结构统计、规则差异和重复候选审计。
- `audit/REPORT.md`：最近一次自动审计报告。

## 审计范围

每天检查上游订阅，并执行：

- JSON5 解析与订阅 ID、版本信息检查。
- 规则组和规则总数统计。
- 上游与清理版之间的规则组、规则级差异定位。
- 同一规则组及跨规则组的完全重复规则对象候选检查。
- 选择器条件字段完全相同的候选检查。

## 安全原则

审计结果是候选线索，不是自动删除依据。相同选择器不等于行为相同；应用包名、Activity、规则组配置、前置按键、排除条件、匹配时间、动作冷却、执行上限、重置方式、优先级和执行顺序都可能影响行为。

静态脚本不能可靠证明不同选择器表达式之间的包含关系、交集、可达性或真实 UI 树效果。因此：

- 不自动删除规则、不自动合并规则。
- 不确定项一律保留并写入报告。
- 只有结合规则上下文和可复现测试证明行为不变后，才进行人工清理。
- 上游更新只更新 `upstream.json5` 和审计报告，不覆盖 `gkd.json5`。

## 个人修正版订阅

- GKD 订阅地址：<https://raw.githubusercontent.com/iluvboi/GKD_subscription/main/gkd.json5>
- 版本检测文件：<https://raw.githubusercontent.com/iluvboi/GKD_subscription/main/gkd.version.json5>
- 当前订阅 ID：668（与上游 ID 667 独立）

## 上游

- 项目：<https://github.com/Lin-arm/GKD_subscription>
- 订阅：<https://gkd-subscription-667.pages.dev/gkd.json5>

GitHub Actions 每天 UTC 00:00 检查一次，也可以在 Actions 页面手动触发。
