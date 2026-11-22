# GKD 规则审计报告

- 检查时间：2026-11-22 18:15 UTC
- 上游订阅：ID 667 / v641
- 清理版订阅：ID 667 / v640
- 上游文件 Git Blob SHA：a5768fffa081fbd70e6c34e363239d4e215bd02b
- 清理版文件 Git Blob SHA：22da2de5dc03f0ef455a962ce60c7792e90a0fec
- 处理结果：上游镜像已是最新已发布版本 v641；本轮没有新的已发布订阅可同步。
- 安全策略：未覆盖 gkd.json5，未删除、合并或改写任何规则。

## 上游版本与项目状态

- GitHub 最新 Release：v641，发布于 2026-11-21 23:30:22 UTC。
- dist/gkd.version.json5：{id:667,version:641}，最后修改于 2026-11-21 23:30:07 UTC。
- GitHub main 相对 v641 标签领先 4 个提交；最新提交为 9e1e64771734083eb5a21626f7b8dbe130a5defa，时间为 2026-11-22 12:51:56 UTC。
- v641 之后的 main 源码变更尚未形成 v642 发布版本。本轮只使用已发布订阅产物，不把未发布源码直接拼入订阅。
- 仓库最近一次 GitHub Actions 运行 44988831045 于 2026-11-22 05:18:40 UTC 成功完成，下载、JSON5 安装、校验审计和提交步骤均为绿色。

## JSON5 与订阅校验

| 检查项 | 上游 | 清理版 |
|---|---:|---:|
| JSON5 解析 | 通过 | 通过 |
| 订阅 ID | 667 | 667 |
| 版本 | 641 | 640 |
| 应用数 | 1009 | 1008 |
| 规则组 | 2503 | 2501 |
| 规则总数 | 3965 | 3962 |

上游比清理版新 1 个版本。upstream.json5 已包含 v641；gkd.json5 仍保留 v640 基线，符合不自动覆盖清理版的约定。

## 规则组与规则级差异

本轮使用应用包名 + group.key 作为规则组稳定身份；没有 key 时才退回应用包名 + group.name。数组索引仅用于定位，不作为身份。

旧版审计报告按数组路径直接匹配规则组。上游新增应用后，后续 apps 数组索引整体偏移，导致旧报告中大量“缺失/额外规则组”是假阳性。旧报告中的 21 个缺失组、19 个额外组及相应规则差异不应作为真实删改结论。本报告已按稳定身份重新核对。

- 上游新增、清理版尚无的规则组：2
- 清理版额外规则组：0
- 已匹配规则组的元数据变化：1
- 存在规则内容变化的已匹配规则组：2
- 无法安全配对的规则组：0

### 上游新增的规则组

1. UU远程（com.netease.uuremote），group key 2「通知提示-更新提示」：1 条规则，限定 ComposeMainActivity，匹配“不更新/更新”提示。
2. VIVO服务（com.vivo.daemonService），group key 1「功能类-自动关闭温度过低提示」：1 条规则，匹配温度过低提示中的“确定”按钮。

### 规则组元数据变化

- 快手极速版（com.kuaishou.nebula），group key 3：名称由「全屏广告-红包弹窗」变为「全屏广告」；Activity 限制移动到组级，覆盖 HomeActivity 和 SearchActivity。

### 规则内容变化

- 番茄免费小说（com.dragon.read），group key 21「功能类-自动[展开更多]评论」：同一条无 key 规则的 Activity 范围由 4 项缩至 2 项，快照由 5 个缩至 3 个；actionCd 仍为 500。属于规则适配变化，不是可删除冗余。
- 快手极速版（com.kuaishou.nebula），group key 3：key 0、key 1 的 Activity/选择器上下文发生调整；新增 key 2「口令已复制」相关规则。组级 Activity 范围也有变化。

这些差异都保留在清理版与上游的版本对照中；没有自动把 v641 合并进 gkd.json5。

## 完全重复规则对象候选

| 范围 | 上游 | 清理版 |
|---|---:|---:|
| 同一规则组 | 0 | 0 |
| 跨规则组 | 22 | 22 |

人工复核观察：

- 两个空规则对象出现在 Gemini、InstallerX/InstallerX Revived 的禁用占位组中；它们是不同应用的导航/占位配置，不能仅因对象为空而删除。
- 哔哩哔哩、丁香园、小红书的倍速预设组共享部分步骤，但目标倍速、组 key、描述、快照或后续 preKeys 不同。
- SystemUI 的网易云音乐、白描、QQ音乐屏幕共享授权流程共享部分点击步骤，但分别服务于不同应用场景。
- X 的帖子/搜索页与用户资料页规则，以及 X 浏览器普通版和 Play 版规则，虽有相同对象，应用或 Activity 上下文不同。
- 其他跨应用开屏规则即使完整规则对象相同，也仍受各自应用包名、规则组启用状态、matchTime、actionMaximum、resetMatch、priorityTime 和执行顺序约束。

22 项均为候选，不存在已通过完整上下文和可复现设备测试证明可安全删除的项目。

## 选择器条件字段完全相同候选

签名字段：matches、anyMatches、allMatches、noneMatches、excludeMatches、activityIds、matchTime、preKeys、key。

| 候选范围 | 数量 |
|---|---:|
| 总数 | 156 |
| 同一应用包名内 | 24 |
| 不同应用包名之间 | 132 |
| 同一规则组内 | 1 |
| 跨规则组 | 155 |

候选对中的规则级上下文差异字段出现次数（不同字段统计可能重叠）：

- snapshotUrls：142；exampleUrls：78；excludeSnapshotUrls：24。
- fastQuery：40；action：20；excludeActivityIds：19；name：18。
- actionMaximum：3；actionCd：2；actionDelay：2；position：2；order：1；matchDelay：1。

候选对中的规则组级上下文差异字段出现次数：

- key：99；name：57；desc：43；fastQuery：42。
- activityIds：29；priorityTime：26；actionMaximum：21；resetMatch：16；matchTime：15。
- actionMaximumKey：13；matchRoot：3；forcedTime：3；actionDelay：2；actionCdKey：1；disableIfAppGroupMatch：1；apps：1。

这说明选择器条件相同的候选经常具有不同的动作、快照、Activity、动作上限、冷却、重置、优先级和组配置。相同选择器不构成合并或删除证明。

## 审计工具与工作流维护

本轮修正了审计工具的规则组匹配口径，改为按稳定身份比较，避免应用列表新增导致路径错位误报。

工作流现已先下载候选上游到临时文件，JSON5、订阅 ID、版本和回退检查通过后才写入 upstream.json5。若校验失败，只提交阻塞报告，不提交候选上游文件；gkd.json5 始终不参与自动写入。

审计脚本和工作流的修改已提交，但新版本工作流尚未经过下一次 Actions 实际运行验证。最近一次绿色运行发生在本轮脚本/工作流修正之前，不能视为新版本已验证。

## 最终安全结论

- 未删除任何规则。
- 未合并任何规则。
- 未修改 gkd.json5。
- upstream.json5 保持已发布 v641。
- 22 个完全重复对象候选与 156 个选择器条件相同候选全部保留。
- 只有完整上下文审查和可复现测试同时证明行为不变，才允许后续人工清理。
