# GKD 规则审计报告

- 检查时间：2026-11-23T05:56:48.541Z
- 上游订阅 ID/版本：667 / v642
- 清理版订阅 ID/版本：667 / v640
- 上游候选文件：/tmp/upstream-candidate.json5
- 注意：清理版版本落后上游 2 个版本；按要求不自动覆盖。
- 比较结果：上游与清理版存在差异
- 更新策略：校验通过后才写入 upstream.json5；绝不自动覆盖 gkd.json5。

## 校验结果

- JSON5 解析：通过
- 上游订阅 ID：通过
- 清理版订阅 ID：通过
- 上游版本号：通过
- 清理版版本号：通过

## 结构统计

| 指标 | 上游 | 清理版 |
|---|---:|---:|
| 应用数 | 1010 | 1008 |
| 规则组 | 2505 | 2501 |
| 规则总数 | 3967 | 3962 |
| 同组完全重复对象候选 | 0 | 0 |
| 跨组完全重复对象候选 | 22 | 22 |
| 同组选择器条件相同候选 | 1 | 1 |
| 跨组选择器条件相同候选 | 155 | 155 |

## 规则组与规则级差异（按稳定身份匹配）

规则组优先按应用包名 + group.key 匹配；没有 key 时退回应用包名 + group.name。数组索引仅用于定位，不作为身份。这样可避免新增应用或规则组导致后续索引整体偏移而产生误报。

- 上游有、清理版缺失的规则组：4
- 清理版额外规则组：0
- 规则组元数据变化：2
- 存在规则内容变化的匹配组：3
- 身份冲突、无法安全配对的组：0

- 上游新增规则组：快对AI (com.kuaiduizuoye.scan) / 局部广告-讲解视频浮窗（app:com.kuaiduizuoye.scan|key:2，1 条规则）
- 上游新增规则组：小米服务框架 (com.xiaomi.xmsf) / 权限提示-b站申请通知权限（app:com.xiaomi.xmsf|key:1，1 条规则）
- 上游新增规则组：UU远程 (com.netease.uuremote) / 更新提示（app:com.netease.uuremote|key:2，1 条规则）
- 上游新增规则组：VIVO服务 (com.vivo.daemonService) / 功能类-自动关闭温度过低提示（app:com.vivo.daemonService|key:1，1 条规则）
- 规则组配置变化：快手极速版 (com.kuaishou.nebula) / 全屏广告；字段：activityIds, name
- 规则组配置变化：系统升级(VIVO) (com.bbk.updater) / 更新提示；字段：desc, name
- 规则变化：JavDB (xxx.pornhub.fuck) / 通知提示-公告弹窗；无 key 规则可能修改，字段变化[activityIds, exampleUrls, matches, snapshotUrls]
- 规则变化：番茄免费小说 (com.dragon.read) / 功能类-自动[展开更多]评论；无 key 规则可能修改，字段变化[activityIds, snapshotUrls]
- 规则变化：快手极速版 (com.kuaishou.nebula) / 全屏广告；key=0 字段变化[activityIds, matches]；key=1 字段变化[activityIds]；上游独有：key=2

## 完全重复规则对象候选

完整规则对象相同仍不等于可删除；不同应用、不同规则组、组级 enable、Activity、执行顺序和前置规则均可能使其具有不同作用。

- [跨规则组] Gemini (com.google.android.apps.bard) / 其他-⚠️请移步至Google应用规则页(壳App)：$.apps[45].groups[0].rules[0] ↔ $.apps[59].groups[0].rules[0]；组上下文差异：desc, name
- [跨规则组] Gemini (com.google.android.apps.bard) / 其他-⚠️请移步至Google应用规则页(壳App)：$.apps[45].groups[0].rules[0] ↔ $.apps[60].groups[0].rules[0]；组上下文差异：desc, name
- [跨规则组] OMOFUN (com.cyl.musiccy.ou) / 开屏广告：$.apps[81].groups[0].rules[1] ↔ $.apps[82].groups[0].rules[1]；组上下文差异：fastQuery
- [跨规则组] 哔哩哔哩 (tv.danmaku.bili) / 功能类-视频自动x1.5倍速(⚠️三选一)：$.apps[223].groups[23].rules[0] ↔ $.apps[223].groups[24].rules[0]；组上下文差异：desc, key, name
- [跨规则组] 哔哩哔哩 (tv.danmaku.bili) / 功能类-视频自动x1.5倍速(⚠️三选一)：$.apps[223].groups[23].rules[1] ↔ $.apps[223].groups[24].rules[1]；组上下文差异：desc, key, name
- [跨规则组] 哔哩哔哩 (tv.danmaku.bili) / 功能类-视频自动x1.5倍速(⚠️三选一)：$.apps[223].groups[23].rules[2] ↔ $.apps[223].groups[24].rules[2]；组上下文差异：desc, key, name
- [跨规则组] 丁香园 (cn.dxy.idxyer) / 功能类-📋病例视频自动x0.8倍速(⚠️四选一)：$.apps[278].groups[9].rules[0] ↔ $.apps[278].groups[10].rules[0]；组上下文差异：desc, key, name
- [跨规则组] 丁香园 (cn.dxy.idxyer) / 功能类-📋病例视频自动x0.8倍速(⚠️四选一)：$.apps[278].groups[9].rules[0] ↔ $.apps[278].groups[11].rules[0]；组上下文差异：desc, key, name
- [跨规则组] Blued X (com.danlan.xiaolan) / 开屏广告：$.apps[13].groups[0].rules[0] ↔ $.apps[389].groups[0].rules[0]；组上下文差异：priorityTime
- [跨规则组] Blued X (com.danlan.xiaolan) / 开屏广告：$.apps[13].groups[0].rules[0] ↔ $.apps[605].groups[0].rules[0]；组上下文差异：actionMaximumKey, desc, priorityTime
- [跨规则组] 系统界面 (com.android.systemui) / 功能类-自动允许网易云音乐共享整个屏幕：$.apps[732].groups[0].rules[1] ↔ $.apps[732].groups[1].rules[1]；组上下文差异：key, name
- [跨规则组] 系统界面 (com.android.systemui) / 功能类-自动允许网易云音乐共享整个屏幕：$.apps[732].groups[0].rules[2] ↔ $.apps[732].groups[1].rules[2]；组上下文差异：key, name
- [跨规则组] 系统界面 (com.android.systemui) / 功能类-自动允许网易云音乐共享整个屏幕：$.apps[732].groups[0].rules[1] ↔ $.apps[732].groups[2].rules[1]；组上下文差异：key, name
- [跨规则组] 系统界面 (com.android.systemui) / 功能类-自动允许网易云音乐共享整个屏幕：$.apps[732].groups[0].rules[2] ↔ $.apps[732].groups[2].rules[2]；组上下文差异：key, name
- [跨规则组] 系统界面 (com.android.systemui) / 功能类-自动允许USB调试：$.apps[732].groups[3].rules[1] ↔ $.apps[732].groups[4].rules[1]；组上下文差异：desc, key, name
- [跨规则组] 小红书 (com.xingin.xhs) / 功能类-自动倍速⏩x1.25⚠️五选一：$.apps[753].groups[11].rules[0] ↔ $.apps[753].groups[12].rules[0]；组上下文差异：desc, key, name
- [跨规则组] 小红书 (com.xingin.xhs) / 功能类-自动倍速⏩x1.25⚠️五选一：$.apps[753].groups[11].rules[0] ↔ $.apps[753].groups[13].rules[0]；组上下文差异：desc, key, name
- [跨规则组] 小红书 (com.xingin.xhs) / 功能类-自动倍速⏩x1.25⚠️五选一：$.apps[753].groups[11].rules[0] ↔ $.apps[753].groups[14].rules[0]；组上下文差异：desc, key, name
- [跨规则组] Blued X (com.danlan.xiaolan) / 开屏广告：$.apps[13].groups[0].rules[0] ↔ $.apps[1002].groups[0].rules[0]；组上下文差异：key, priorityTime
- [跨规则组] X(推特) (com.twitter.android) / 分段广告-帖子详情页、搜索页信息流广告：$.apps[1005].groups[1].rules[0] ↔ $.apps[1005].groups[2].rules[0]；组上下文差异：activityIds, desc, key, name
- [跨规则组] X(推特) (com.twitter.android) / 分段广告-帖子详情页、搜索页信息流广告：$.apps[1005].groups[1].rules[1] ↔ $.apps[1005].groups[2].rules[1]；组上下文差异：activityIds, desc, key, name
- [跨规则组] X浏览器 (com.mmbox.xbrowser) / 功能类-自动允许打开外部App：$.apps[1006].groups[0].rules[0] ↔ $.apps[1007].groups[0].rules[0]；组上下文差异：

## 选择器条件字段完全相同候选

比较字段：matches, anyMatches, allMatches, noneMatches, excludeMatches, activityIds, matchTime, preKeys, key。签名相同仅表示这些字段的值相同，不代表动作、规则组或实际 UI 行为相同。

- 上游选择器候选总数：156
- 同一应用包名内候选：24
- 不同应用包名之间候选：131
- 同一规则组内候选：1
- 跨规则组候选：155

### 候选对中的规则级上下文差异字段（出现次数）

- snapshotUrls：142
- exampleUrls：78
- fastQuery：40
- excludeSnapshotUrls：24
- action：20
- excludeActivityIds：19
- name：18
- actionMaximum：3
- actionCd：2
- actionDelay：2
- position：2
- order：1
- matchDelay：1

### 候选对中的规则组级上下文差异字段（出现次数）

- key：99
- name：57
- desc：43
- fastQuery：42
- activityIds：29
- priorityTime：26
- actionMaximum：21
- resetMatch：16
- matchTime：15
- actionMaximumKey：13
- matchRoot：3
- forcedTime：3
- actionDelay：2
- actionCdKey：1
- apps：1
- disableIfAppGroupMatch：1

- [跨规则组] OMOFUN (com.cyl.musiccy.ou) / 开屏广告：$.apps[81].groups[0].rules[1] ↔ $.apps[82].groups[0].rules[1]；规则级差异：；组级差异：fastQuery
- [跨规则组] Blued X (com.danlan.xiaolan) / 开屏广告：$.apps[13].groups[0].rules[0] ↔ $.apps[112].groups[0].rules[0]；规则级差异：action, fastQuery, snapshotUrls；组级差异：actionMaximumKey, fastQuery, key, priorityTime
- [跨规则组] Telegram (org.telegram.messenger) / 权限提示-通讯录权限：$.apps[119].groups[2].rules[0] ↔ $.apps[120].groups[2].rules[0]；规则级差异：snapshotUrls；组级差异：key
- [跨规则组] Telegram (org.telegram.messenger) / 功能类-更多-保存到相册：$.apps[119].groups[3].rules[0] ↔ $.apps[120].groups[3].rules[0]；规则级差异：excludeSnapshotUrls, snapshotUrls；组级差异：key
- [跨规则组] Telegram (org.telegram.messenger) / 功能类-只保存单个媒体：$.apps[119].groups[4].rules[0] ↔ $.apps[120].groups[4].rules[0]；规则级差异：snapshotUrls；组级差异：key
- [跨规则组] YouTube (com.google.android.youtube) / 功能类-退出自动关闭小窗：$.apps[142].groups[11].rules[0] ↔ $.apps[145].groups[2].rules[0]；规则级差异：exampleUrls, snapshotUrls；组级差异：key
- [跨规则组] Blued X (com.danlan.xiaolan) / 开屏广告：$.apps[13].groups[0].rules[0] ↔ $.apps[147].groups[0].rules[0]；规则级差异：exampleUrls, snapshotUrls；组级差异：key, priorityTime
- [跨规则组] 爱奇艺极速版 (com.qiyi.video.lite) / 开屏广告：$.apps[181].groups[0].rules[0] ↔ $.apps[183].groups[0].rules[0]；规则级差异：exampleUrls, snapshotUrls；组级差异：desc
- [跨规则组] Blued X (com.danlan.xiaolan) / 开屏广告：$.apps[13].groups[0].rules[0] ↔ $.apps[204].groups[0].rules[0]；规则级差异：exampleUrls, snapshotUrls；组级差异：key, priorityTime
- [跨规则组] Blued X (com.danlan.xiaolan) / 开屏广告：$.apps[13].groups[0].rules[0] ↔ $.apps[215].groups[0].rules[0]；规则级差异：snapshotUrls；组级差异：key, priorityTime
- [跨规则组] 哔哩哔哩 (tv.danmaku.bili) / 功能类-视频自动x1.25倍速(⚠️三选一)：$.apps[223].groups[22].rules[0] ↔ $.apps[223].groups[23].rules[0]；规则级差异：excludeSnapshotUrls, snapshotUrls；组级差异：desc, key, name
- [跨规则组] 哔哩哔哩 (tv.danmaku.bili) / 功能类-视频自动x1.25倍速(⚠️三选一)：$.apps[223].groups[22].rules[1] ↔ $.apps[223].groups[23].rules[1]；规则级差异：snapshotUrls；组级差异：desc, key, name
- [跨规则组] 哔哩哔哩 (tv.danmaku.bili) / 功能类-视频自动x1.25倍速(⚠️三选一)：$.apps[223].groups[22].rules[2] ↔ $.apps[223].groups[23].rules[2]；规则级差异：snapshotUrls；组级差异：desc, key, name
- [跨规则组] 哔哩哔哩 (tv.danmaku.bili) / 功能类-视频自动x1.25倍速(⚠️三选一)：$.apps[223].groups[22].rules[0] ↔ $.apps[223].groups[24].rules[0]；规则级差异：excludeSnapshotUrls, snapshotUrls；组级差异：key, name
- [跨规则组] 哔哩哔哩 (tv.danmaku.bili) / 功能类-视频自动x1.25倍速(⚠️三选一)：$.apps[223].groups[22].rules[1] ↔ $.apps[223].groups[24].rules[1]；规则级差异：snapshotUrls；组级差异：key, name
- [跨规则组] 哔哩哔哩 (tv.danmaku.bili) / 功能类-视频自动x1.25倍速(⚠️三选一)：$.apps[223].groups[22].rules[2] ↔ $.apps[223].groups[24].rules[2]；规则级差异：snapshotUrls；组级差异：key, name
- [跨规则组] 百词斩 (com.jiongji.andriod.card) / 开屏广告：$.apps[201].groups[0].rules[0] ↔ $.apps[227].groups[0].rules[0]；规则级差异：action, exampleUrls, excludeActivityIds, excludeSnapshotUrls, snapshotUrls；组级差异：actionMaximum, key
- [跨规则组] Avmini (com.hongjing.avmini) / 全屏广告：$.apps[8].groups[1].rules[0] ↔ $.apps[235].groups[1].rules[0]；规则级差异：exampleUrls, name, snapshotUrls；组级差异：activityIds, key, name
- [跨规则组] Blued X (com.danlan.xiaolan) / 开屏广告：$.apps[13].groups[0].rules[0] ↔ $.apps[254].groups[0].rules[0]；规则级差异：exampleUrls, fastQuery, snapshotUrls；组级差异：fastQuery, key, priorityTime
- [跨规则组] Blued X (com.danlan.xiaolan) / 开屏广告：$.apps[13].groups[0].rules[0] ↔ $.apps[262].groups[0].rules[0]；规则级差异：action, snapshotUrls；组级差异：actionMaximumKey, key, priorityTime
- [跨规则组] Soul (cn.soulapp.android) / 开屏广告：$.apps[112].groups[0].rules[1] ↔ $.apps[265].groups[0].rules[1]；规则级差异：snapshotUrls；组级差异：actionMaximumKey, fastQuery
- [跨规则组] Blued X (com.danlan.xiaolan) / 开屏广告：$.apps[13].groups[0].rules[0] ↔ $.apps[271].groups[0].rules[0]；规则级差异：fastQuery, snapshotUrls；组级差异：fastQuery, key, priorityTime
- [跨规则组] 刺猬猫阅读 (com.kuangxiangciweimao.novel) / 开屏广告：$.apps[254].groups[0].rules[2] ↔ $.apps[271].groups[0].rules[1]；规则级差异：exampleUrls, snapshotUrls；组级差异：
- [跨规则组] 丁香园 (cn.dxy.idxyer) / 功能类-📋病例视频自动x0.5倍速(⚠️四选一)：$.apps[278].groups[8].rules[0] ↔ $.apps[278].groups[9].rules[0]；规则级差异：snapshotUrls；组级差异：desc, key, name
- [跨规则组] 丁香园 (cn.dxy.idxyer) / 功能类-📋病例视频自动x0.5倍速(⚠️四选一)：$.apps[278].groups[8].rules[0] ↔ $.apps[278].groups[10].rules[0]；规则级差异：snapshotUrls；组级差异：desc, key, name
- [跨规则组] 丁香园 (cn.dxy.idxyer) / 功能类-📋病例视频自动x0.5倍速(⚠️四选一)：$.apps[278].groups[8].rules[0] ↔ $.apps[278].groups[11].rules[0]；规则级差异：snapshotUrls；组级差异：desc, key, name
- [跨规则组] 丁香园 (cn.dxy.idxyer) / 功能类-📖课程视频自动x1.2倍速(❗三选一)：$.apps[278].groups[12].rules[0] ↔ $.apps[278].groups[13].rules[0]；规则级差异：actionCd, actionMaximum；组级差异：desc, key, name
- [跨规则组] 丁香园 (cn.dxy.idxyer) / 功能类-📖课程视频自动x1.2倍速(❗三选一)：$.apps[278].groups[12].rules[0] ↔ $.apps[278].groups[14].rules[0]；规则级差异：actionCd, actionMaximum, snapshotUrls；组级差异：desc, key, name
- [跨规则组] Blued X (com.danlan.xiaolan) / 开屏广告：$.apps[13].groups[0].rules[0] ↔ $.apps[284].groups[0].rules[0]；规则级差异：action, snapshotUrls；组级差异：key, priorityTime
- [跨规则组] 百度地图 (com.baidu.BaiduMap) / 开屏广告：$.apps[204].groups[0].rules[1] ↔ $.apps[287].groups[0].rules[1]；规则级差异：exampleUrls, snapshotUrls；组级差异：key, matchRoot
- [跨规则组] 百词斩 (com.jiongji.andriod.card) / 开屏广告：$.apps[201].groups[0].rules[0] ↔ $.apps[293].groups[0].rules[0]；规则级差异：exampleUrls, excludeActivityIds, excludeSnapshotUrls, snapshotUrls；组级差异：key
- [跨规则组] 抖音 (com.ss.android.ugc.aweme) / 功能类-自动开启[自动连播]：$.apps[293].groups[30].rules[0] ↔ $.apps[294].groups[12].rules[0]；规则级差异：excludeSnapshotUrls, snapshotUrls；组级差异：activityIds, desc, key
- [跨规则组] 抖音 (com.ss.android.ugc.aweme) / 功能类-自动开启[自动连播]：$.apps[293].groups[30].rules[1] ↔ $.apps[294].groups[12].rules[1]；规则级差异：snapshotUrls；组级差异：activityIds, desc, key
- [跨规则组] 抖音 (com.ss.android.ugc.aweme) / 功能类-自动开启[自动连播]：$.apps[293].groups[30].rules[2] ↔ $.apps[294].groups[12].rules[2]；规则级差异：snapshotUrls；组级差异：activityIds, desc, key
- [跨规则组] Avmini (com.hongjing.avmini) / 全屏广告：$.apps[8].groups[1].rules[0] ↔ $.apps[304].groups[0].rules[0]；规则级差异：exampleUrls, fastQuery, name, snapshotUrls；组级差异：activityIds, fastQuery, name
- [跨规则组] OmoFun (com.xifeng.fun) / 全屏广告-弹窗广告：$.apps[83].groups[0].rules[0] ↔ $.apps[313].groups[0].rules[0]；规则级差异：actionDelay, fastQuery, snapshotUrls；组级差异：desc, fastQuery, name
- [跨规则组] 懂球帝 (com.dongqiudi.news) / 全屏广告-弹窗广告：$.apps[284].groups[3].rules[1] ↔ $.apps[314].groups[0].rules[1]；规则级差异：exampleUrls, snapshotUrls；组级差异：desc, key, name
- [跨规则组] 777影视 (com.changyou.app.qi) / 全屏广告-弹窗广告：$.apps[172].groups[0].rules[1] ↔ $.apps[320].groups[1].rules[1]；规则级差异：exampleUrls, fastQuery, snapshotUrls；组级差异：desc, fastQuery, key, name
- [跨规则组] Avmini (com.hongjing.avmini) / 全屏广告：$.apps[8].groups[1].rules[0] ↔ $.apps[321].groups[0].rules[0]；规则级差异：exampleUrls, fastQuery, name, snapshotUrls；组级差异：actionMaximum, activityIds, fastQuery, matchTime, name, resetMatch
- [跨规则组] 懂球帝 (com.dongqiudi.news) / 全屏广告-数据页弹窗广告：$.apps[284].groups[4].rules[1] ↔ $.apps[321].groups[0].rules[2]；规则级差异：name, snapshotUrls；组级差异：activityIds, key, matchTime, name
- [跨规则组] 百词斩 (com.jiongji.andriod.card) / 开屏广告：$.apps[201].groups[0].rules[0] ↔ $.apps[331].groups[0].rules[0]；规则级差异：exampleUrls, excludeActivityIds, excludeSnapshotUrls, fastQuery, snapshotUrls；组级差异：fastQuery, key
- [跨规则组] Blued X (com.danlan.xiaolan) / 开屏广告：$.apps[13].groups[0].rules[0] ↔ $.apps[334].groups[0].rules[0]；规则级差异：snapshotUrls；组级差异：key, priorityTime
- [跨规则组] 车e兴 (com.anshibo.activity) / 开屏广告：$.apps[242].groups[0].rules[0] ↔ $.apps[335].groups[0].rules[0]；规则级差异：exampleUrls, excludeSnapshotUrls, fastQuery, snapshotUrls；组级差异：fastQuery
- [跨规则组] Blued X (com.danlan.xiaolan) / 开屏广告：$.apps[13].groups[0].rules[0] ↔ $.apps[336].groups[0].rules[0]；规则级差异：action, snapshotUrls；组级差异：actionMaximumKey, priorityTime
- [跨规则组] 百词斩 (com.jiongji.andriod.card) / 开屏广告：$.apps[201].groups[0].rules[0] ↔ $.apps[377].groups[0].rules[0]；规则级差异：action, exampleUrls, excludeActivityIds, excludeSnapshotUrls, fastQuery, snapshotUrls；组级差异：fastQuery
- [跨规则组] 百词斩 (com.jiongji.andriod.card) / 开屏广告：$.apps[201].groups[0].rules[0] ↔ $.apps[382].groups[0].rules[0]；规则级差异：action, exampleUrls, excludeActivityIds, excludeSnapshotUrls, snapshotUrls；组级差异：
- [跨规则组] 百词斩 (com.jiongji.andriod.card) / 开屏广告：$.apps[201].groups[0].rules[0] ↔ $.apps[384].groups[0].rules[0]；规则级差异：action, exampleUrls, excludeActivityIds, excludeSnapshotUrls, fastQuery, snapshotUrls；组级差异：fastQuery, key
- [跨规则组] 华为视频 (com.huawei.himovie) / 开屏广告：$.apps[379].groups[0].rules[0] ↔ $.apps[385].groups[0].rules[0]；规则级差异：snapshotUrls；组级差异：actionMaximumKey
- [跨规则组] Blued X (com.danlan.xiaolan) / 开屏广告：$.apps[13].groups[0].rules[0] ↔ $.apps[389].groups[0].rules[0]；规则级差异：；组级差异：priorityTime
- [跨规则组] 大学搜题酱 (com.zmzx.college.search) / 分段广告-底部卡片广告：$.apps[262].groups[7].rules[1] ↔ $.apps[398].groups[0].rules[1]；规则级差异：name, snapshotUrls；组级差异：activityIds, desc, key, name
- [跨规则组] 海尔智家 (com.haier.uhome.uplus) / 权限提示-通知权限：$.apps[351].groups[1].rules[1] ↔ $.apps[400].groups[1].rules[1]；规则级差异：exampleUrls, snapshotUrls；组级差异：activityIds, fastQuery, key, name
- [跨规则组] 百词斩 (com.jiongji.andriod.card) / 开屏广告：$.apps[201].groups[0].rules[0] ↔ $.apps[401].groups[0].rules[0]；规则级差异：action, exampleUrls, excludeActivityIds, excludeSnapshotUrls, snapshotUrls；组级差异：key
- [跨规则组] 百词斩 (com.jiongji.andriod.card) / 开屏广告：$.apps[201].groups[0].rules[0] ↔ $.apps[403].groups[0].rules[0]；规则级差异：exampleUrls, excludeActivityIds, excludeSnapshotUrls, snapshotUrls；组级差异：
- [跨规则组] Blued X (com.danlan.xiaolan) / 开屏广告：$.apps[13].groups[0].rules[0] ↔ $.apps[414].groups[0].rules[0]；规则级差异：excludeActivityIds, excludeSnapshotUrls, fastQuery, snapshotUrls；组级差异：fastQuery, key, priorityTime
- [跨规则组] Soul (cn.soulapp.android) / 开屏广告：$.apps[112].groups[0].rules[1] ↔ $.apps[414].groups[0].rules[1]；规则级差异：excludeActivityIds, excludeSnapshotUrls, snapshotUrls；组级差异：actionMaximumKey
- [跨规则组] 777影视 (com.changyou.app.qi) / 全屏广告-弹窗广告：$.apps[172].groups[0].rules[1] ↔ $.apps[432].groups[0].rules[1]；规则级差异：exampleUrls, fastQuery, snapshotUrls；组级差异：fastQuery
- [跨规则组] OMOFUN (com.ksf.yyx) / 全屏广告-插屏广告：$.apps[82].groups[2].rules[1] ↔ $.apps[435].groups[0].rules[2]；规则级差异：snapshotUrls；组级差异：key, name
- [跨规则组] 看剧 (com.bx.game.dgg) / 全屏广告-弹窗广告：$.apps[435].groups[0].rules[3] ↔ $.apps[437].groups[0].rules[3]；规则级差异：actionDelay, fastQuery, name, snapshotUrls；组级差异：desc, fastQuery
- [跨规则组] Blued X (com.danlan.xiaolan) / 开屏广告：$.apps[13].groups[0].rules[0] ↔ $.apps[442].groups[0].rules[0]；规则级差异：action, exampleUrls, fastQuery, snapshotUrls；组级差异：actionMaximum, fastQuery, key, priorityTime
- [跨规则组] 安全服务/小米手机管家 (com.miui.securitycenter) / 功能类-高敏感权限自动确定：$.apps[190].groups[4].rules[1] ↔ $.apps[455].groups[0].rules[1]；规则级差异：exampleUrls, snapshotUrls；组级差异：actionMaximum, activityIds, desc, key, matchTime, name, resetMatch
- [跨规则组] Avmini (com.hongjing.avmini) / 全屏广告：$.apps[8].groups[1].rules[0] ↔ $.apps[459].groups[0].rules[0]；规则级差异：exampleUrls, name, snapshotUrls；组级差异：activityIds, desc, key, name
- [跨规则组] 懂球帝 (com.dongqiudi.news) / 全屏广告-数据页弹窗广告：$.apps[284].groups[4].rules[1] ↔ $.apps[460].groups[0].rules[2]；规则级差异：name, snapshotUrls；组级差异：actionMaximum, activityIds, key, name, resetMatch
- [跨规则组] 刺猬猫阅读 (com.kuangxiangciweimao.novel) / 开屏广告：$.apps[254].groups[0].rules[2] ↔ $.apps[461].groups[0].rules[2]；规则级差异：exampleUrls, fastQuery, snapshotUrls；组级差异：fastQuery
- [跨规则组] 美团 (com.sankuai.meituan) / 局部广告-直播讲解悬浮窗：$.apps[492].groups[10].rules[0] ↔ $.apps[493].groups[2].rules[0]；规则级差异：exampleUrls, snapshotUrls；组级差异：key, name
- [跨规则组] OmoFun (com.xifeng.fun) / 全屏广告-弹窗广告：$.apps[83].groups[0].rules[0] ↔ $.apps[509].groups[0].rules[0]；规则级差异：exampleUrls, fastQuery, snapshotUrls；组级差异：actionMaximum, desc, fastQuery, matchTime, resetMatch
- [跨规则组] 百度网盘-三星版本 (com.baidu.netdisk.samsung) / 全屏广告-弹窗广告：$.apps[209].groups[0].rules[0] ↔ $.apps[511].groups[2].rules[0]；规则级差异：fastQuery, name, snapshotUrls；组级差异：activityIds, desc, key, name
- [跨规则组] Avmini (com.hongjing.avmini) / 全屏广告：$.apps[8].groups[1].rules[0] ↔ $.apps[517].groups[0].rules[0]；规则级差异：exampleUrls, name, snapshotUrls；组级差异：actionMaximum, activityIds, desc, matchTime, name
- [跨规则组] 京东读书 (com.jd.app.reader) / 开屏广告：$.apps[416].groups[0].rules[0] ↔ $.apps[523].groups[0].rules[0]；规则级差异：exampleUrls, snapshotUrls；组级差异：key
- [跨规则组] OmoFun (com.xifeng.fun) / 全屏广告-弹窗广告：$.apps[83].groups[0].rules[0] ↔ $.apps[524].groups[1].rules[0]；规则级差异：exampleUrls, fastQuery, snapshotUrls；组级差异：fastQuery
- [跨规则组] 大学搜题酱 (com.zmzx.college.search) / 分段广告-底部卡片广告：$.apps[262].groups[7].rules[1] ↔ $.apps[525].groups[7].rules[1]；规则级差异：snapshotUrls；组级差异：activityIds, desc, key, name
- [跨规则组] 百词斩 (com.jiongji.andriod.card) / 开屏广告：$.apps[201].groups[0].rules[0] ↔ $.apps[526].groups[0].rules[0]；规则级差异：exampleUrls, excludeActivityIds, excludeSnapshotUrls, snapshotUrls；组级差异：
- [跨规则组] 京东读书 (com.jd.app.reader) / 开屏广告：$.apps[416].groups[0].rules[0] ↔ $.apps[536].groups[0].rules[0]；规则级差异：exampleUrls, snapshotUrls；组级差异：
- [跨规则组] 番茄免费小说 (com.dragon.read) / 功能类-看广告自动领奖励：$.apps[310].groups[9].rules[3] ↔ $.apps[536].groups[3].rules[14]；规则级差异：name, snapshotUrls；组级差异：desc, key, name
- [同一规则组] 汽水音乐 (com.luna.music) / 功能类-全自动看广告领VIP_单日：$.apps[536].groups[8].rules[8] ↔ $.apps[536].groups[8].rules[9]；规则级差异：actionMaximum, name, order, position；组级差异：
- [跨规则组] (三星)应用商店 (com.sec.android.app.samsungapps) / 开屏广告：$.apps[153].groups[0].rules[0] ↔ $.apps[540].groups[0].rules[0]；规则级差异：action, exampleUrls, snapshotUrls；组级差异：
- [跨规则组] 123云盘 (com.mfcloudcalculate.networkdisk) / 全屏广告：$.apps[160].groups[0].rules[5] ↔ $.apps[543].groups[1].rules[5]；规则级差异：exampleUrls, snapshotUrls；组级差异：key, name
- [跨规则组] 解压专家 (com.fileunzip.zxwknight) / 全屏广告-弹窗广告：$.apps[407].groups[0].rules[1] ↔ $.apps[548].groups[0].rules[1]；规则级差异：name, snapshotUrls；组级差异：actionMaximum, activityIds, key, matchTime, resetMatch
- [跨规则组] OMOFUN (com.cyl.musiccy.ou) / 开屏广告：$.apps[81].groups[0].rules[0] ↔ $.apps[567].groups[0].rules[0]；规则级差异：fastQuery, snapshotUrls；组级差异：fastQuery
- [跨规则组] 百词斩 (com.jiongji.andriod.card) / 开屏广告：$.apps[201].groups[0].rules[0] ↔ $.apps[585].groups[0].rules[0]；规则级差异：action, exampleUrls, excludeActivityIds, excludeSnapshotUrls, snapshotUrls；组级差异：
- [跨规则组] 百词斩 (com.jiongji.andriod.card) / 开屏广告：$.apps[201].groups[0].rules[0] ↔ $.apps[599].groups[0].rules[0]；规则级差异：action, exampleUrls, excludeActivityIds, excludeSnapshotUrls, snapshotUrls；组级差异：key
- [跨规则组] Blued X (com.danlan.xiaolan) / 分段广告-卡片广告：$.apps[13].groups[1].rules[1] ↔ $.apps[600].groups[0].rules[1]；规则级差异：snapshotUrls；组级差异：activityIds, key
- [跨规则组] Blued X (com.danlan.xiaolan) / 开屏广告：$.apps[13].groups[0].rules[0] ↔ $.apps[605].groups[0].rules[0]；规则级差异：；组级差异：actionMaximumKey, desc, priorityTime
- [跨规则组] 水果派 (com.oneshareclap.malaysian) / 开屏广告：$.apps[615].groups[0].rules[0] ↔ $.apps[617].groups[0].rules[0]；规则级差异：exampleUrls, fastQuery, matchDelay, snapshotUrls；组级差异：fastQuery
- [跨规则组] Blued X (com.danlan.xiaolan) / 开屏广告：$.apps[13].groups[0].rules[0] ↔ $.apps[625].groups[0].rules[0]；规则级差异：snapshotUrls；组级差异：forcedTime, priorityTime
- [跨规则组] OMOFUN (com.cyl.musiccy.ou) / 通知提示-公告弹窗：$.apps[81].groups[1].rules[0] ↔ $.apps[644].groups[0].rules[0]；规则级差异：snapshotUrls；组级差异：key
- [跨规则组] 百度网盘-三星版本 (com.baidu.netdisk.samsung) / 全屏广告-弹窗广告：$.apps[209].groups[0].rules[0] ↔ $.apps[659].groups[1].rules[0]；规则级差异：exampleUrls, fastQuery, snapshotUrls；组级差异：activityIds, desc, fastQuery, key, name
- [跨规则组] MyComic (com.qc.mycomic) / 开屏广告：$.apps[77].groups[0].rules[0] ↔ $.apps[675].groups[0].rules[0]；规则级差异：exampleUrls, fastQuery, snapshotUrls；组级差异：actionMaximum, fastQuery, key, matchTime, resetMatch
- [跨规则组] 荣耀天气 (com.hihonor.android.totemweather) / 分段广告-卡片广告：$.apps[573].groups[1].rules[1] ↔ $.apps[685].groups[0].rules[1]；规则级差异：exampleUrls, snapshotUrls；组级差异：activityIds, key, name
- [跨规则组] 百度贴吧 (com.baidu.tieba) / 开屏广告：$.apps[207].groups[0].rules[1] ↔ $.apps[696].groups[0].rules[1]；规则级差异：snapshotUrls；组级差异：
- [跨规则组] 百度贴吧 (com.baidu.tieba) / 开屏广告：$.apps[207].groups[0].rules[1] ↔ $.apps[697].groups[0].rules[1]；规则级差异：snapshotUrls；组级差异：
- [跨规则组] 京东读书 (com.jd.app.reader) / 开屏广告：$.apps[416].groups[0].rules[2] ↔ $.apps[697].groups[0].rules[2]；规则级差异：exampleUrls, position, snapshotUrls；组级差异：
- [跨规则组] 微博极速版 (com.sina.weibolite) / 分段广告-信息流广告：$.apps[703].groups[0].rules[0] ↔ $.apps[704].groups[1].rules[0]；规则级差异：name, snapshotUrls；组级差异：activityIds, desc, forcedTime, key, matchRoot
- [跨规则组] 爱其意 (com.taitedi.hdd.ayi) / 全屏广告-弹窗广告：$.apps[179].groups[1].rules[0] ↔ $.apps[726].groups[0].rules[0]；规则级差异：exampleUrls, snapshotUrls；组级差异：key
- [跨规则组] 系统界面 (com.android.systemui) / 功能类-自动允许网易云音乐共享整个屏幕：$.apps[732].groups[0].rules[1] ↔ $.apps[732].groups[1].rules[1]；规则级差异：；组级差异：key, name
- [跨规则组] 系统界面 (com.android.systemui) / 功能类-自动允许网易云音乐共享整个屏幕：$.apps[732].groups[0].rules[2] ↔ $.apps[732].groups[1].rules[2]；规则级差异：；组级差异：key, name
- [跨规则组] 系统界面 (com.android.systemui) / 功能类-自动允许网易云音乐共享整个屏幕：$.apps[732].groups[0].rules[1] ↔ $.apps[732].groups[2].rules[1]；规则级差异：；组级差异：key, name
- [跨规则组] 系统界面 (com.android.systemui) / 功能类-自动允许网易云音乐共享整个屏幕：$.apps[732].groups[0].rules[2] ↔ $.apps[732].groups[2].rules[2]；规则级差异：；组级差异：key, name
- [跨规则组] 系统界面 (com.android.systemui) / 功能类-自动允许USB调试：$.apps[732].groups[3].rules[1] ↔ $.apps[732].groups[4].rules[1]；规则级差异：；组级差异：desc, key, name
- [跨规则组] Soul (cn.soulapp.android) / 开屏广告：$.apps[112].groups[0].rules[1] ↔ $.apps[734].groups[0].rules[1]；规则级差异：snapshotUrls；组级差异：actionMaximumKey, fastQuery
- [跨规则组] Soul (cn.soulapp.android) / 开屏广告：$.apps[112].groups[0].rules[1] ↔ $.apps[741].groups[0].rules[1]；规则级差异：fastQuery, snapshotUrls；组级差异：actionMaximumKey, key
- [跨规则组] 小红书 (com.xingin.xhs) / 功能类-自动倍速⏩x0.75⚠️五选一：$.apps[753].groups[10].rules[0] ↔ $.apps[753].groups[11].rules[0]；规则级差异：exampleUrls, snapshotUrls；组级差异：desc, key, name
- [跨规则组] 小红书 (com.xingin.xhs) / 功能类-自动倍速⏩x0.75⚠️五选一：$.apps[753].groups[10].rules[0] ↔ $.apps[753].groups[12].rules[0]；规则级差异：exampleUrls, snapshotUrls；组级差异：desc, key, name
- [跨规则组] 小红书 (com.xingin.xhs) / 功能类-自动倍速⏩x0.75⚠️五选一：$.apps[753].groups[10].rules[0] ↔ $.apps[753].groups[13].rules[0]；规则级差异：exampleUrls, snapshotUrls；组级差异：desc, key, name
- [跨规则组] 小红书 (com.xingin.xhs) / 功能类-自动倍速⏩x0.75⚠️五选一：$.apps[753].groups[10].rules[0] ↔ $.apps[753].groups[14].rules[0]；规则级差异：exampleUrls, snapshotUrls；组级差异：desc, key, name
- [跨规则组] 百词斩 (com.jiongji.andriod.card) / 开屏广告：$.apps[201].groups[0].rules[0] ↔ $.apps[767].groups[0].rules[0]；规则级差异：action, exampleUrls, excludeActivityIds, excludeSnapshotUrls, snapshotUrls；组级差异：priorityTime
- [跨规则组] OmoFun (com.xifeng.fun) / 全屏广告-弹窗广告：$.apps[83].groups[0].rules[0] ↔ $.apps[776].groups[0].rules[0]；规则级差异：fastQuery, name, snapshotUrls；组级差异：actionMaximum, desc, fastQuery, matchTime, resetMatch
- [跨规则组] Soul (cn.soulapp.android) / 开屏广告：$.apps[112].groups[0].rules[1] ↔ $.apps[788].groups[0].rules[1]；规则级差异：fastQuery, snapshotUrls；组级差异：actionMaximumKey
- [跨规则组] 刺猬猫阅读 (com.kuangxiangciweimao.novel) / 开屏广告：$.apps[254].groups[0].rules[2] ↔ $.apps[788].groups[0].rules[2]；规则级差异：exampleUrls, snapshotUrls；组级差异：
- [跨规则组] Avmini (com.hongjing.avmini) / 全屏广告：$.apps[8].groups[1].rules[0] ↔ $.apps[794].groups[1].rules[0]；规则级差异：exampleUrls, fastQuery, name, snapshotUrls；组级差异：actionDelay, actionMaximum, activityIds, desc, fastQuery, key, matchTime, name, resetMatch
- [跨规则组] 豆瓣 (com.douban.frodo) / 全屏广告-弹窗广告：$.apps[297].groups[5].rules[1] ↔ $.apps[794].groups[1].rules[1]；规则级差异：snapshotUrls；组级差异：actionDelay, actionMaximum, activityIds, key, matchTime, resetMatch
- [跨规则组] OMOFUN (com.cyl.musiccy.ou) / 通知提示-公告弹窗：$.apps[81].groups[1].rules[0] ↔ $.apps[801].groups[1].rules[0]；规则级差异：snapshotUrls；组级差异：key
- [跨规则组] EASI (com.easi.customer) / 全屏广告：$.apps[33].groups[0].rules[0] ↔ $.apps[803].groups[0].rules[0]；规则级差异：snapshotUrls；组级差异：
- [跨规则组] Blued X (com.danlan.xiaolan) / 开屏广告：$.apps[13].groups[0].rules[0] ↔ $.apps[810].groups[0].rules[0]；规则级差异：excludeActivityIds, excludeSnapshotUrls, snapshotUrls；组级差异：key, priorityTime
- [跨规则组] 刺猬猫阅读 (com.kuangxiangciweimao.novel) / 开屏广告：$.apps[254].groups[0].rules[2] ↔ $.apps[810].groups[0].rules[2]；规则级差异：exampleUrls, fastQuery, snapshotUrls；组级差异：fastQuery
- [跨规则组] 小猿搜题 (com.fenbi.android.solar) / 评价提示：$.apps[787].groups[0].rules[0] ↔ $.apps[812].groups[0].rules[0]；规则级差异：exampleUrls, snapshotUrls；组级差异：activityIds, desc, key, name
- [跨规则组] 百词斩 (com.jiongji.andriod.card) / 开屏广告：$.apps[201].groups[0].rules[0] ↔ $.apps[814].groups[0].rules[0]；规则级差异：exampleUrls, excludeActivityIds, excludeSnapshotUrls, snapshotUrls；组级差异：
- [跨规则组] 糖豆 (com.bokecc.dance) / 局部广告-信息流广告：$.apps[637].groups[3].rules[0] ↔ $.apps[815].groups[0].rules[0]；规则级差异：exampleUrls, fastQuery, snapshotUrls；组级差异：actionMaximum, desc, fastQuery, key, matchTime, name, resetMatch
- [跨规则组] OmoFun (com.xifeng.fun) / 全屏广告-弹窗广告：$.apps[83].groups[0].rules[0] ↔ $.apps[838].groups[0].rules[0]；规则级差异：name, snapshotUrls；组级差异：actionMaximum, matchTime, resetMatch
- [跨规则组] OmoFun (com.xifeng.fun) / 全屏广告-弹窗广告：$.apps[83].groups[0].rules[1] ↔ $.apps[838].groups[0].rules[1]；规则级差异：exampleUrls, snapshotUrls；组级差异：actionMaximum, matchTime, resetMatch
- [跨规则组] Blued X (com.danlan.xiaolan) / 开屏广告：$.apps[13].groups[0].rules[0] ↔ $.apps[846].groups[0].rules[0]；规则级差异：fastQuery, snapshotUrls；组级差异：fastQuery, key, priorityTime
…另有 36 项未展开

## 行为等价审查与安全结论

- 逐项核对时必须同时考虑 matches、anyMatches、allMatches、noneMatches、excludeMatches、activityIds、preKeys、matchTime、key。
- 还必须核对 action/actionCd/actionMaximum/resetMatch、priorityTime/forcedTime、order、actionDelay、position、规则组 enable、disableIfAppGroupMatch 及应用包名。
- snapshotUrls、excludeSnapshotUrls、exampleUrls 是理解规则真实 UI 上下文的重要证据；快照相同或缺失都不能单独证明规则冗余。
- 当前静态审计只能定位候选，不能替代设备上的可复现触发测试，也不能证明不同选择器表达式之间的包含、交集或可达性。
- 不确定项一律保留；只有完整上下文与可复现测试均证明行为不变时，才允许人工删除。
- 本轮未自动删除、合并或改写任何规则。
