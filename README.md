# GKD_subscription

本仓库用于跟踪上游 GKD 订阅，并在不改变有效规则行为的前提下维护独立订阅。

## 文件

- `upstream.json5`：上游原始订阅镜像，原则上不做人工修改。
- `gkd.json5`：当前可用订阅基线。
- `audit/`：自动审计脚本与审计报告。

## 当前状态

首次导入时，`gkd.json5` 与 `upstream.json5` 完全一致。这是保守基线，不代表已经完成冗余删除。规则选择器、前置条件、Activity 限定、匹配时间和动作参数都可能影响行为；未经验证不会因为文本重复就删除规则。

## 上游

- 上游项目：<https://github.com/Lin-arm/GKD_subscription>
- 订阅地址：<https://gkd-subscription-667.pages.dev/gkd.json5>

每周自动检查上游并生成结构审计报告。上游变化后，审计报告会提示变化；清理版不会被自动覆盖，以避免未经人工语义确认就改变规则行为。
