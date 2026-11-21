# GKD 规则审计报告

## 基本信息

- 上游订阅 ID：667
- 上游版本：640
- 清理版订阅 ID：667
- 清理版版本：640
- 比较结果：清理版与上游 JSON 结构完全一致

## 结构统计

| 指标 | 上游 | 清理版 |
|---|---:|---:|
| 规则组 | 2501 | 2501 |
| 规则总数 | 3962 | 3962 |
| 完全重复规则候选 | 22 | 22 |
| 选择器条件签名相同候选 | 156 | 156 |

## 清理版与上游差异

- 上游有、清理版缺失的规则组：0
- 清理版额外规则组：0
- 清理版缺失的上游规则：0
- 清理版额外规则：0


## 完全重复规则候选

完全重复仅表示规则对象序列化后相同；跨规则组仍可能因应用、组配置或执行上下文不同而具有不同作用。

- [跨规则组] 其他-⚠️请移步软件包安装程序|0||：$.apps[45].groups[0].rules[0] ↔ $.apps[59].groups[0].rules[0]
- [跨规则组] 其他-⚠️请移步软件包安装程序|0||：$.apps[45].groups[0].rules[0] ↔ $.apps[60].groups[0].rules[0]
- [跨规则组] 开屏广告|0||：$.apps[81].groups[0].rules[1] ↔ $.apps[82].groups[0].rules[1]
- [跨规则组] 功能类-视频自动x2.0倍速(⚠️三选一)|25||：$.apps[223].groups[23].rules[0] ↔ $.apps[223].groups[24].rules[0]
- [跨规则组] 功能类-视频自动x2.0倍速(⚠️三选一)|25||：$.apps[223].groups[23].rules[1] ↔ $.apps[223].groups[24].rules[1]
- [跨规则组] 功能类-视频自动x2.0倍速(⚠️三选一)|25||：$.apps[223].groups[23].rules[2] ↔ $.apps[223].groups[24].rules[2]
- [跨规则组] 功能类-📋病例视频自动x1.5倍速(⚠️四选一)|11||：$.apps[278].groups[9].rules[0] ↔ $.apps[278].groups[10].rules[0]
- [跨规则组] 功能类-📋病例视频自动x2.0倍速(⚠️四选一)|12||：$.apps[278].groups[9].rules[0] ↔ $.apps[278].groups[11].rules[0]
- [跨规则组] 开屏广告|1||：$.apps[13].groups[0].rules[0] ↔ $.apps[389].groups[0].rules[0]
- [跨规则组] 开屏广告|1||：$.apps[13].groups[0].rules[0] ↔ $.apps[605].groups[0].rules[0]
- [跨规则组] 功能类-自动允许白描共享整个屏幕|2||：$.apps[732].groups[0].rules[1] ↔ $.apps[732].groups[1].rules[1]
- [跨规则组] 功能类-自动允许白描共享整个屏幕|2||：$.apps[732].groups[0].rules[2] ↔ $.apps[732].groups[1].rules[2]
- [跨规则组] 功能类-自动允许QQ音乐共享整个屏幕|3||：$.apps[732].groups[0].rules[1] ↔ $.apps[732].groups[2].rules[1]
- [跨规则组] 功能类-自动允许QQ音乐共享整个屏幕|3||：$.apps[732].groups[0].rules[2] ↔ $.apps[732].groups[2].rules[2]
- [跨规则组] 功能类-自动允许无线调试(真我📱)|5||：$.apps[732].groups[3].rules[1] ↔ $.apps[732].groups[4].rules[1]
- [跨规则组] 功能类-自动倍速⏩x1.5⚠️五选一|12||：$.apps[753].groups[11].rules[0] ↔ $.apps[753].groups[12].rules[0]
- [跨规则组] 功能类-自动倍速⏩x2.0⚠️五选一|13||：$.apps[753].groups[11].rules[0] ↔ $.apps[753].groups[13].rules[0]
- [跨规则组] 功能类-自动倍速⏩x3.0⚠️五选一|14||：$.apps[753].groups[11].rules[0] ↔ $.apps[753].groups[14].rules[0]
- [跨规则组] 开屏广告|0||：$.apps[13].groups[0].rules[0] ↔ $.apps[1000].groups[0].rules[0]
- [跨规则组] 分段广告-用户资料页信息流广告|3||：$.apps[1003].groups[1].rules[0] ↔ $.apps[1003].groups[2].rules[0]
- [跨规则组] 分段广告-用户资料页信息流广告|3||：$.apps[1003].groups[1].rules[1] ↔ $.apps[1003].groups[2].rules[1]
- [跨规则组] 功能类-自动允许打开外部App|1||：$.apps[1004].groups[0].rules[0] ↔ $.apps[1005].groups[0].rules[0]

## 选择器条件签名相同候选

仅比较 matches/anyMatches/allMatches/noneMatches/excludeMatches/activityIds/matchTime/preKeys/key 等字段的完全相同情况；不代表选择器语义等价或动作冗余。

- [跨规则组] 开屏广告|0||：$.apps[81].groups[0].rules[1] ↔ $.apps[82].groups[0].rules[1]
- [跨规则组] 开屏广告|0||：$.apps[13].groups[0].rules[0] ↔ $.apps[112].groups[0].rules[0]
- [跨规则组] 权限提示-通讯录权限|3||：$.apps[119].groups[2].rules[0] ↔ $.apps[120].groups[2].rules[0]
- [跨规则组] 功能类-更多-保存到相册|4||：$.apps[119].groups[3].rules[0] ↔ $.apps[120].groups[3].rules[0]
- [跨规则组] 功能类-只保存单个媒体|5||：$.apps[119].groups[4].rules[0] ↔ $.apps[120].groups[4].rules[0]
- [跨规则组] 功能类-退出自动关闭小窗|3||：$.apps[142].groups[11].rules[0] ↔ $.apps[145].groups[2].rules[0]
- [跨规则组] 开屏广告|0||：$.apps[13].groups[0].rules[0] ↔ $.apps[147].groups[0].rules[0]
- [跨规则组] 开屏广告|0||：$.apps[181].groups[0].rules[0] ↔ $.apps[183].groups[0].rules[0]
- [跨规则组] 开屏广告|-1||：$.apps[13].groups[0].rules[0] ↔ $.apps[204].groups[0].rules[0]
- [跨规则组] 开屏广告|0||：$.globalGroups[0].rules[1] ↔ $.apps[207].groups[0].rules[1]
- [跨规则组] 开屏广告|0||：$.apps[13].groups[0].rules[0] ↔ $.apps[215].groups[0].rules[0]
- [跨规则组] 功能类-视频自动x1.5倍速(⚠️三选一)|24||：$.apps[223].groups[22].rules[0] ↔ $.apps[223].groups[23].rules[0]
- [跨规则组] 功能类-视频自动x1.5倍速(⚠️三选一)|24||：$.apps[223].groups[22].rules[1] ↔ $.apps[223].groups[23].rules[1]
- [跨规则组] 功能类-视频自动x1.5倍速(⚠️三选一)|24||：$.apps[223].groups[22].rules[2] ↔ $.apps[223].groups[23].rules[2]
- [跨规则组] 功能类-视频自动x2.0倍速(⚠️三选一)|25||：$.apps[223].groups[22].rules[0] ↔ $.apps[223].groups[24].rules[0]
- [跨规则组] 功能类-视频自动x2.0倍速(⚠️三选一)|25||：$.apps[223].groups[22].rules[1] ↔ $.apps[223].groups[24].rules[1]
- [跨规则组] 功能类-视频自动x2.0倍速(⚠️三选一)|25||：$.apps[223].groups[22].rules[2] ↔ $.apps[223].groups[24].rules[2]
- [跨规则组] 开屏广告|1||：$.apps[201].groups[0].rules[0] ↔ $.apps[227].groups[0].rules[0]
- [跨规则组] 全屏广告-弹窗广告|2||：$.apps[8].groups[1].rules[0] ↔ $.apps[235].groups[1].rules[0]
- [跨规则组] 开屏广告|0||：$.apps[13].groups[0].rules[0] ↔ $.apps[254].groups[0].rules[0]
- [跨规则组] 开屏广告|0||：$.apps[13].groups[0].rules[0] ↔ $.apps[262].groups[0].rules[0]
- [跨规则组] 开屏广告|0||：$.apps[112].groups[0].rules[1] ↔ $.apps[265].groups[0].rules[1]
- [跨规则组] 开屏广告|0||：$.apps[13].groups[0].rules[0] ↔ $.apps[271].groups[0].rules[0]
- [跨规则组] 开屏广告|0||：$.apps[254].groups[0].rules[2] ↔ $.apps[271].groups[0].rules[1]
- [跨规则组] 功能类-📋病例视频自动x0.8倍速(⚠️四选一)|10||：$.apps[278].groups[8].rules[0] ↔ $.apps[278].groups[9].rules[0]
- [跨规则组] 功能类-📋病例视频自动x1.5倍速(⚠️四选一)|11||：$.apps[278].groups[8].rules[0] ↔ $.apps[278].groups[10].rules[0]
- [跨规则组] 功能类-📋病例视频自动x2.0倍速(⚠️四选一)|12||：$.apps[278].groups[8].rules[0] ↔ $.apps[278].groups[11].rules[0]
- [跨规则组] 功能类-📖课程视频自动x1.5倍速(❗三选一)|14||：$.apps[278].groups[12].rules[0] ↔ $.apps[278].groups[13].rules[0]
- [跨规则组] 功能类-📖课程视频自动x2.0倍速(❗三选一)|15||：$.apps[278].groups[12].rules[0] ↔ $.apps[278].groups[14].rules[0]
- [跨规则组] 开屏广告|0||：$.apps[13].groups[0].rules[0] ↔ $.apps[284].groups[0].rules[0]
- [跨规则组] 开屏广告|1||：$.apps[204].groups[0].rules[1] ↔ $.apps[287].groups[0].rules[1]
- [跨规则组] 开屏广告|-1||：$.apps[201].groups[0].rules[0] ↔ $.apps[293].groups[0].rules[0]
- [跨规则组] 功能类-自动开启[自动连播]|19||：$.apps[293].groups[30].rules[0] ↔ $.apps[294].groups[12].rules[0]
- [跨规则组] 功能类-自动开启[自动连播]|19||：$.apps[293].groups[30].rules[1] ↔ $.apps[294].groups[12].rules[1]
- [跨规则组] 功能类-自动开启[自动连播]|19||：$.apps[293].groups[30].rules[2] ↔ $.apps[294].groups[12].rules[2]
- [跨规则组] 全屏广告-弹窗广告|1||：$.apps[8].groups[1].rules[0] ↔ $.apps[304].groups[0].rules[0]
- [跨规则组] 全屏广告|1||：$.apps[83].groups[0].rules[0] ↔ $.apps[313].groups[0].rules[0]
- [跨规则组] 全屏广告|1||：$.apps[284].groups[3].rules[1] ↔ $.apps[314].groups[0].rules[1]
- [跨规则组] 全屏广告-首页弹窗广告|6||：$.apps[172].groups[0].rules[1] ↔ $.apps[320].groups[1].rules[1]
- [跨规则组] 全屏广告-首页弹窗广告|1||：$.apps[8].groups[1].rules[0] ↔ $.apps[321].groups[0].rules[0]
- [跨规则组] 全屏广告-首页弹窗广告|1||：$.apps[284].groups[4].rules[1] ↔ $.apps[321].groups[0].rules[2]
- [跨规则组] 开屏广告|-1||：$.apps[201].groups[0].rules[0] ↔ $.apps[331].groups[0].rules[0]
- [跨规则组] 开屏广告|0||：$.apps[13].groups[0].rules[0] ↔ $.apps[334].groups[0].rules[0]
- [跨规则组] 开屏广告|1||：$.apps[242].groups[0].rules[0] ↔ $.apps[335].groups[0].rules[0]
- [跨规则组] 开屏广告|1||：$.apps[13].groups[0].rules[0] ↔ $.apps[336].groups[0].rules[0]
- [跨规则组] 开屏广告|0||：$.apps[201].groups[0].rules[0] ↔ $.apps[377].groups[0].rules[0]
- [跨规则组] 开屏广告|0||：$.apps[201].groups[0].rules[0] ↔ $.apps[382].groups[0].rules[0]
- [跨规则组] 开屏广告|1||：$.apps[201].groups[0].rules[0] ↔ $.apps[384].groups[0].rules[0]
- [跨规则组] 开屏广告|0||：$.apps[379].groups[0].rules[0] ↔ $.apps[385].groups[0].rules[0]
- [跨规则组] 开屏广告|1||：$.apps[13].groups[0].rules[0] ↔ $.apps[389].groups[0].rules[0]
- [跨规则组] 分段广告-导出界面底部广告|0||：$.apps[262].groups[7].rules[1] ↔ $.apps[398].groups[0].rules[1]
- [跨规则组] 更新提示|2||：$.apps[351].groups[1].rules[1] ↔ $.apps[400].groups[1].rules[1]
- [跨规则组] 开屏广告|-1||：$.apps[201].groups[0].rules[0] ↔ $.apps[401].groups[0].rules[0]
- [跨规则组] 开屏广告|0||：$.apps[201].groups[0].rules[0] ↔ $.apps[403].groups[0].rules[0]
- [跨规则组] 开屏广告|0||：$.apps[13].groups[0].rules[0] ↔ $.apps[414].groups[0].rules[0]
- [跨规则组] 开屏广告|0||：$.apps[112].groups[0].rules[1] ↔ $.apps[414].groups[0].rules[1]
- [跨规则组] 全屏广告-弹窗广告|1||：$.apps[172].groups[0].rules[1] ↔ $.apps[432].groups[0].rules[1]
- [跨规则组] 全屏广告-弹窗广告|1||：$.apps[82].groups[2].rules[1] ↔ $.apps[435].groups[0].rules[2]
- [跨规则组] 全屏广告-弹窗广告|1||：$.apps[435].groups[0].rules[3] ↔ $.apps[437].groups[0].rules[3]
- [跨规则组] 开屏广告|0||：$.apps[13].groups[0].rules[0] ↔ $.apps[442].groups[0].rules[0]
- [跨规则组] 通知提示-通知弹窗|5||：$.apps[190].groups[4].rules[1] ↔ $.apps[455].groups[0].rules[1]
- [跨规则组] 全屏广告-弹窗广告|2||：$.apps[8].groups[1].rules[0] ↔ $.apps[459].groups[0].rules[0]
- [跨规则组] 全屏广告-弹窗广告|1||：$.apps[284].groups[4].rules[1] ↔ $.apps[460].groups[0].rules[2]
- [跨规则组] 开屏广告|0||：$.apps[254].groups[0].rules[2] ↔ $.apps[461].groups[0].rules[2]
- [跨规则组] 局部广告-直播悬浮窗|4||：$.apps[492].groups[10].rules[0] ↔ $.apps[493].groups[2].rules[0]
- [跨规则组] 全屏广告-弹窗广告|1||：$.apps[83].groups[0].rules[0] ↔ $.apps[509].groups[0].rules[0]
- [跨规则组] 全屏广告-文章内容页面弹窗广告|3||：$.apps[209].groups[0].rules[0] ↔ $.apps[511].groups[2].rules[0]
- [跨规则组] 全屏广告-弹窗广告|1||：$.apps[8].groups[1].rules[0] ↔ $.apps[517].groups[0].rules[0]
- [跨规则组] 开屏广告|-1||：$.apps[416].groups[0].rules[0] ↔ $.apps[523].groups[0].rules[0]
- [跨规则组] 全屏广告-弹窗广告|1||：$.apps[83].groups[0].rules[0] ↔ $.apps[524].groups[1].rules[0]
- [跨规则组] 分段广告-信息流广告|11||：$.apps[262].groups[7].rules[1] ↔ $.apps[525].groups[7].rules[1]
- [跨规则组] 开屏广告|0||：$.apps[201].groups[0].rules[0] ↔ $.apps[526].groups[0].rules[0]
- [跨规则组] 开屏广告|0||：$.apps[416].groups[0].rules[0] ↔ $.apps[536].groups[0].rules[0]
- [跨规则组] 功能类-全自动看广告领VIP|8||：$.apps[310].groups[9].rules[3] ↔ $.apps[536].groups[3].rules[14]
- [同一规则组] 功能类-全自动看广告领VIP_单日|13||：$.apps[536].groups[8].rules[8] ↔ $.apps[536].groups[8].rules[9]
- [跨规则组] 开屏广告|0||：$.apps[153].groups[0].rules[0] ↔ $.apps[540].groups[0].rules[0]
- [跨规则组] 全屏广告-弹窗广告|2||：$.apps[160].groups[0].rules[5] ↔ $.apps[543].groups[1].rules[5]
- [跨规则组] 全屏广告-弹窗广告|0||：$.apps[407].groups[0].rules[1] ↔ $.apps[548].groups[0].rules[1]
- [跨规则组] 开屏广告|0||：$.apps[81].groups[0].rules[0] ↔ $.apps[567].groups[0].rules[0]
- [跨规则组] 开屏广告|0||：$.apps[201].groups[0].rules[0] ↔ $.apps[585].groups[0].rules[0]
- [跨规则组] 开屏广告|1||：$.apps[201].groups[0].rules[0] ↔ $.apps[599].groups[0].rules[0]
- [跨规则组] 分段广告-卡片广告|1||：$.apps[13].groups[1].rules[1] ↔ $.apps[600].groups[0].rules[1]
- [跨规则组] 开屏广告|1||：$.apps[13].groups[0].rules[0] ↔ $.apps[605].groups[0].rules[0]
- [跨规则组] 开屏广告|0||：$.apps[615].groups[0].rules[0] ↔ $.apps[617].groups[0].rules[0]
- [跨规则组] 开屏广告|1||：$.apps[13].groups[0].rules[0] ↔ $.apps[625].groups[0].rules[0]
- [跨规则组] 通知提示-公告弹窗|2||：$.apps[81].groups[1].rules[0] ↔ $.apps[644].groups[0].rules[0]
- [跨规则组] 分段广告-浮窗广告|2||：$.apps[209].groups[0].rules[0] ↔ $.apps[659].groups[1].rules[0]
- [跨规则组] 开屏广告|1||：$.apps[77].groups[0].rules[0] ↔ $.apps[675].groups[0].rules[0]
- [跨规则组] 分段广告-首页卡片广告|1||：$.apps[573].groups[1].rules[1] ↔ $.apps[685].groups[0].rules[1]
- [跨规则组] 开屏广告|0||：$.globalGroups[0].rules[1] ↔ $.apps[696].groups[0].rules[1]
- [跨规则组] 开屏广告|0||：$.globalGroups[0].rules[1] ↔ $.apps[697].groups[0].rules[1]
- [跨规则组] 开屏广告|0||：$.apps[416].groups[0].rules[2] ↔ $.apps[697].groups[0].rules[2]
- [跨规则组] 分段广告-信息流广告|0||：$.apps[703].groups[0].rules[0] ↔ $.apps[704].groups[1].rules[0]
- [跨规则组] 全屏广告-弹窗广告|1||：$.apps[179].groups[1].rules[0] ↔ $.apps[726].groups[0].rules[0]
- [跨规则组] 功能类-自动允许白描共享整个屏幕|2||：$.apps[732].groups[0].rules[1] ↔ $.apps[732].groups[1].rules[1]
- [跨规则组] 功能类-自动允许白描共享整个屏幕|2||：$.apps[732].groups[0].rules[2] ↔ $.apps[732].groups[1].rules[2]
- [跨规则组] 功能类-自动允许QQ音乐共享整个屏幕|3||：$.apps[732].groups[0].rules[1] ↔ $.apps[732].groups[2].rules[1]
- [跨规则组] 功能类-自动允许QQ音乐共享整个屏幕|3||：$.apps[732].groups[0].rules[2] ↔ $.apps[732].groups[2].rules[2]
- [跨规则组] 功能类-自动允许无线调试(真我📱)|5||：$.apps[732].groups[3].rules[1] ↔ $.apps[732].groups[4].rules[1]
- [跨规则组] 开屏广告|0||：$.apps[112].groups[0].rules[1] ↔ $.apps[734].groups[0].rules[1]
…另有 56 项未展开

## 安全结论与限制

- 本工具只生成候选和结构差异，不会自动删除或改写任何 GKD 规则。
- 相同选择器条件可能配置不同动作、冷却、上限、重置方式或优先级，不能据此合并。
- 选择器表达式之间的包含、交集、可达性及真实 UI 树效果无法仅靠静态字符串可靠证明。
- Activity、应用包名、规则组启用状态、前置按键、执行顺序、matchTime、actionCd、actionMaximum、resetMatch、snapshotUrls 等上下文都可能改变实际行为。
- 不确定项一律保留；只有结合规则上下文和可复现测试证明行为不变后，才允许人工清理。

## 本次处理

未自动删除任何规则。
