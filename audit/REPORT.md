# GKD 规则审计报告

- 检查时间：2026-11-26T06:59:34.476Z
- 上游订阅 ID/版本：667 / v645
- 清理版订阅 ID/版本：667 / v640
- 上游候选文件：/tmp/upstream-candidate.json5
- 注意：清理版版本落后上游 5 个版本；按要求不自动覆盖。
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
| 应用数 | 1013 | 1008 |
| 规则组 | 2515 | 2501 |
| 规则总数 | 3982 | 3962 |
| 同组完全重复对象候选 | 0 | 0 |
| 跨组完全重复对象候选 | 22 | 22 |
| 同组选择器条件相同候选 | 1 | 1 |
| 跨组选择器条件相同候选 | 158 | 155 |

## 规则组与规则级差异（按稳定身份匹配）

规则组优先按应用包名 + group.key 匹配；没有 key 时退回应用包名 + group.name。数组索引仅用于定位，不作为身份。这样可避免新增应用或规则组导致后续索引整体偏移而产生误报。

- 上游有、清理版缺失的规则组：14
- 清理版额外规则组：0
- 规则组元数据变化：8
- 存在规则内容变化的匹配组：7
- 身份冲突、无法安全配对的组：0

- 上游新增规则组：JavDB (xxx.pornhub.fuck) / 更新提示（app:xxx.pornhub.fuck|key:2，1 条规则）
- 上游新增规则组：Luna (com.mt.luna) / 功能类-自动确认下载（app:com.mt.luna|key:1，1 条规则）
- 上游新增规则组：(小米)应用包管理组件 (com.miui.packageinstaller) / 功能类-关闭[未验证应用]提示（app:com.miui.packageinstaller|key:20，1 条规则）
- 上游新增规则组：测测 (com.xxwolo.cc5) / 权限提示-通知权限（app:com.xxwolo.cc5|key:0，2 条规则）
- 上游新增规则组：测测 (com.xxwolo.cc5) / 全屏广告-小组件弹窗（app:com.xxwolo.cc5|key:1，1 条规则）
- 上游新增规则组：测测 (com.xxwolo.cc5) / 局部广告-右下角浮窗（app:com.xxwolo.cc5|key:2，1 条规则）
- 上游新增规则组：豆包 (com.larus.nova) / 全屏广告（app:com.larus.nova|key:2，1 条规则）
- 上游新增规则组：番茄小说 (com.dragon.read.oversea.gp) / 权限提示-通知权限（app:com.dragon.read.oversea.gp|key:1，3 条规则）
- 上游新增规则组：快对AI (com.kuaiduizuoye.scan) / 局部广告-讲解视频浮窗（app:com.kuaiduizuoye.scan|key:2，1 条规则）
- 上游新增规则组：微博 (com.sina.weibo) / 全屏广告-小组件弹窗（app:com.sina.weibo|key:28，1 条规则）
- 上游新增规则组：微博 (com.sina.weibo) / 全屏广告-发现页弹窗（app:com.sina.weibo|key:29，1 条规则）
- 上游新增规则组：小米服务框架 (com.xiaomi.xmsf) / 权限提示-b站申请通知权限（app:com.xiaomi.xmsf|key:1，1 条规则）
- 上游新增规则组：UU远程 (com.netease.uuremote) / 更新提示（app:com.netease.uuremote|key:2，1 条规则）
- 上游新增规则组：VIVO服务 (com.vivo.daemonService) / 功能类-自动关闭温度过低提示（app:com.vivo.daemonService|key:1，1 条规则）
- 规则组配置变化：(小米)应用包管理组件 (com.miui.packageinstaller) / 功能类-安装来源不可信；字段：enable
- 规则组配置变化：(小米)应用包管理组件 (com.miui.packageinstaller) / 功能类-无视风险继续安装；字段：enable
- 规则组配置变化：(小米)应用包管理组件 (com.miui.packageinstaller) / 功能类-自动勾选[已了解此应用存在风险]；字段：enable
- 规则组配置变化：大麦 (cn.damai) / 开屏广告；字段：desc
- 规则组配置变化：红果免费短剧 (com.phoenix.read) / 功能类-[上滑]继续看短剧；字段：desc
- 规则组配置变化：红果免费短剧 (com.phoenix.read) / 权限提示-通知权限；字段：actionMaximumKey, desc
- 规则组配置变化：快手极速版 (com.kuaishou.nebula) / 全屏广告；字段：activityIds, name
- 规则组配置变化：系统升级(VIVO) (com.bbk.updater) / 更新提示；字段：desc, name
- 规则变化：JavDB (xxx.pornhub.fuck) / 通知提示-公告弹窗；无 key 规则可能修改，字段变化[activityIds, exampleUrls, matches, snapshotUrls]
- 规则变化：豆瓣 (com.douban.frodo) / 开屏广告；key=4 字段变化[actionCdKey]；key=10 字段变化[actionCdKey, anyMatches, matches]；key=11 字段变化[anyMatches, matches]；key=12 字段变化[anyMatches, matches, snapshotUrls]；key=13 字段变化[anyMatches, matches]
- 规则变化：番茄免费小说 (com.dragon.read) / 功能类-自动[展开更多]评论；无 key 规则可能修改，字段变化[activityIds, snapshotUrls]
- 规则变化：红果免费短剧 (com.phoenix.read) / 权限提示-通知权限；上游独有：key=0; key=1；清理版独有：(无 key/name)
- 规则变化：快手极速版 (com.kuaishou.nebula) / 全屏广告；key=0 字段变化[activityIds, matches]；key=1 字段变化[activityIds]；上游独有：key=2
- 规则变化：淘宝 (com.taobao.taobao) / 全屏广告-弹窗广告；上游独有：key=6
- 规则变化：腾讯文档 (com.tencent.docs) / 开屏广告；key=0 字段变化[matches, snapshotUrls]

## 完全重复规则对象候选

完整规则对象相同仍不等于可删除；不同应用、不同规则组、组级 enable、Activity、执行顺序和前置规则均可能使其具有不同作用。

- [跨规则组] Gemini (com.google.android.apps.bard) / 其他-⚠️请移步至Google应用规则页(壳App)：$.apps[45].groups[0].rules[0] ↔ $.apps[59].groups[0].rules[0]；组上下文差异：desc, name
- [跨规则组] Gemini (com.google.android.apps.bard) / 其他-⚠️请移步至Google应用规则页(壳App)：$.apps[45].groups[0].rules[0] ↔ $.apps[60].groups[0].rules[0]；组上下文差异：desc, name
- [跨规则组] OMOFUN (com.cyl.musiccy.ou) / 开屏广告：$.apps[82].groups[0].rules[1] ↔ $.apps[83].groups[0].rules[1]；组上下文差异：fastQuery
- [跨规则组] 哔哩哔哩 (tv.danmaku.bili) / 功能类-视频自动x1.5倍速(⚠️三选一)：$.apps[224].groups[23].rules[0] ↔ $.apps[224].groups[24].rules[0]；组上下文差异：desc, key, name
- [跨规则组] 哔哩哔哩 (tv.danmaku.bili) / 功能类-视频自动x1.5倍速(⚠️三选一)：$.apps[224].groups[23].rules[1] ↔ $.apps[224].groups[24].rules[1]；组上下文差异：desc, key, name
- [跨规则组] 哔哩哔哩 (tv.danmaku.bili) / 功能类-视频自动x1.5倍速(⚠️三选一)：$.apps[224].groups[23].rules[2] ↔ $.apps[224].groups[24].rules[2]；组上下文差异：desc, key, name
- [跨规则组] 丁香园 (cn.dxy.idxyer) / 功能类-📋病例视频自动x0.8倍速(⚠️四选一)：$.apps[280].groups[9].rules[0] ↔ $.apps[280].groups[10].rules[0]；组上下文差异：desc, key, name
- [跨规则组] 丁香园 (cn.dxy.idxyer) / 功能类-📋病例视频自动x0.8倍速(⚠️四选一)：$.apps[280].groups[9].rules[0] ↔ $.apps[280].groups[11].rules[0]；组上下文差异：desc, key, name
- [跨规则组] Blued X (com.danlan.xiaolan) / 开屏广告：$.apps[13].groups[0].rules[0] ↔ $.apps[392].groups[0].rules[0]；组上下文差异：priorityTime
- [跨规则组] Blued X (com.danlan.xiaolan) / 开屏广告：$.apps[13].groups[0].rules[0] ↔ $.apps[608].groups[0].rules[0]；组上下文差异：actionMaximumKey, desc, priorityTime
- [跨规则组] 系统界面 (com.android.systemui) / 功能类-自动允许网易云音乐共享整个屏幕：$.apps[735].groups[0].rules[1] ↔ $.apps[735].groups[1].rules[1]；组上下文差异：key, name
- [跨规则组] 系统界面 (com.android.systemui) / 功能类-自动允许网易云音乐共享整个屏幕：$.apps[735].groups[0].rules[2] ↔ $.apps[735].groups[1].rules[2]；组上下文差异：key, name
- [跨规则组] 系统界面 (com.android.systemui) / 功能类-自动允许网易云音乐共享整个屏幕：$.apps[735].groups[0].rules[1] ↔ $.apps[735].groups[2].rules[1]；组上下文差异：key, name
- [跨规则组] 系统界面 (com.android.systemui) / 功能类-自动允许网易云音乐共享整个屏幕：$.apps[735].groups[0].rules[2] ↔ $.apps[735].groups[2].rules[2]；组上下文差异：key, name
- [跨规则组] 系统界面 (com.android.systemui) / 功能类-自动允许USB调试：$.apps[735].groups[3].rules[1] ↔ $.apps[735].groups[4].rules[1]；组上下文差异：desc, key, name
- [跨规则组] 小红书 (com.xingin.xhs) / 功能类-自动倍速⏩x1.25⚠️五选一：$.apps[756].groups[11].rules[0] ↔ $.apps[756].groups[12].rules[0]；组上下文差异：desc, key, name
- [跨规则组] 小红书 (com.xingin.xhs) / 功能类-自动倍速⏩x1.25⚠️五选一：$.apps[756].groups[11].rules[0] ↔ $.apps[756].groups[13].rules[0]；组上下文差异：desc, key, name
- [跨规则组] 小红书 (com.xingin.xhs) / 功能类-自动倍速⏩x1.25⚠️五选一：$.apps[756].groups[11].rules[0] ↔ $.apps[756].groups[14].rules[0]；组上下文差异：desc, key, name
- [跨规则组] Blued X (com.danlan.xiaolan) / 开屏广告：$.apps[13].groups[0].rules[0] ↔ $.apps[1005].groups[0].rules[0]；组上下文差异：key, priorityTime
- [跨规则组] X(推特) (com.twitter.android) / 分段广告-帖子详情页、搜索页信息流广告：$.apps[1008].groups[1].rules[0] ↔ $.apps[1008].groups[2].rules[0]；组上下文差异：activityIds, desc, key, name
- [跨规则组] X(推特) (com.twitter.android) / 分段广告-帖子详情页、搜索页信息流广告：$.apps[1008].groups[1].rules[1] ↔ $.apps[1008].groups[2].rules[1]；组上下文差异：activityIds, desc, key, name
- [跨规则组] X浏览器 (com.mmbox.xbrowser) / 功能类-自动允许打开外部App：$.apps[1009].groups[0].rules[0] ↔ $.apps[1010].groups[0].rules[0]；组上下文差异：

## 选择器条件字段完全相同候选

比较字段：matches, anyMatches, allMatches, noneMatches, excludeMatches, activityIds, matchTime, preKeys, key。签名相同仅表示这些字段的值相同，不代表动作、规则组或实际 UI 行为相同。

- 上游选择器候选总数：159
- 同一应用包名内候选：24
- 不同应用包名之间候选：134
- 同一规则组内候选：1
- 跨规则组候选：158

### 候选对中的规则级上下文差异字段（出现次数）

- snapshotUrls：145
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

- key：102
- name：57
- desc：43
- fastQuery：42
- activityIds：32
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

- [跨规则组] OMOFUN (com.cyl.musiccy.ou) / 开屏广告：$.apps[82].groups[0].rules[1] ↔ $.apps[83].groups[0].rules[1]；规则级差异：；组级差异：fastQuery
- [跨规则组] Blued X (com.danlan.xiaolan) / 开屏广告：$.apps[13].groups[0].rules[0] ↔ $.apps[113].groups[0].rules[0]；规则级差异：action, fastQuery, snapshotUrls；组级差异：actionMaximumKey, fastQuery, key, priorityTime
- [跨规则组] Telegram (org.telegram.messenger) / 权限提示-通讯录权限：$.apps[120].groups[2].rules[0] ↔ $.apps[121].groups[2].rules[0]；规则级差异：snapshotUrls；组级差异：key
- [跨规则组] Telegram (org.telegram.messenger) / 功能类-更多-保存到相册：$.apps[120].groups[3].rules[0] ↔ $.apps[121].groups[3].rules[0]；规则级差异：excludeSnapshotUrls, snapshotUrls；组级差异：key
- [跨规则组] Telegram (org.telegram.messenger) / 功能类-只保存单个媒体：$.apps[120].groups[4].rules[0] ↔ $.apps[121].groups[4].rules[0]；规则级差异：snapshotUrls；组级差异：key
- [跨规则组] YouTube (com.google.android.youtube) / 功能类-退出自动关闭小窗：$.apps[143].groups[11].rules[0] ↔ $.apps[146].groups[2].rules[0]；规则级差异：exampleUrls, snapshotUrls；组级差异：key
- [跨规则组] Blued X (com.danlan.xiaolan) / 开屏广告：$.apps[13].groups[0].rules[0] ↔ $.apps[148].groups[0].rules[0]；规则级差异：exampleUrls, snapshotUrls；组级差异：key, priorityTime
- [跨规则组] 爱奇艺极速版 (com.qiyi.video.lite) / 开屏广告：$.apps[182].groups[0].rules[0] ↔ $.apps[184].groups[0].rules[0]；规则级差异：exampleUrls, snapshotUrls；组级差异：desc
- [跨规则组] Blued X (com.danlan.xiaolan) / 开屏广告：$.apps[13].groups[0].rules[0] ↔ $.apps[205].groups[0].rules[0]；规则级差异：exampleUrls, snapshotUrls；组级差异：key, priorityTime
- [跨规则组] Blued X (com.danlan.xiaolan) / 开屏广告：$.apps[13].groups[0].rules[0] ↔ $.apps[216].groups[0].rules[0]；规则级差异：snapshotUrls；组级差异：key, priorityTime
- [跨规则组] 哔哩哔哩 (tv.danmaku.bili) / 功能类-视频自动x1.25倍速(⚠️三选一)：$.apps[224].groups[22].rules[0] ↔ $.apps[224].groups[23].rules[0]；规则级差异：excludeSnapshotUrls, snapshotUrls；组级差异：desc, key, name
- [跨规则组] 哔哩哔哩 (tv.danmaku.bili) / 功能类-视频自动x1.25倍速(⚠️三选一)：$.apps[224].groups[22].rules[1] ↔ $.apps[224].groups[23].rules[1]；规则级差异：snapshotUrls；组级差异：desc, key, name
- [跨规则组] 哔哩哔哩 (tv.danmaku.bili) / 功能类-视频自动x1.25倍速(⚠️三选一)：$.apps[224].groups[22].rules[2] ↔ $.apps[224].groups[23].rules[2]；规则级差异：snapshotUrls；组级差异：desc, key, name
- [跨规则组] 哔哩哔哩 (tv.danmaku.bili) / 功能类-视频自动x1.25倍速(⚠️三选一)：$.apps[224].groups[22].rules[0] ↔ $.apps[224].groups[24].rules[0]；规则级差异：excludeSnapshotUrls, snapshotUrls；组级差异：key, name
- [跨规则组] 哔哩哔哩 (tv.danmaku.bili) / 功能类-视频自动x1.25倍速(⚠️三选一)：$.apps[224].groups[22].rules[1] ↔ $.apps[224].groups[24].rules[1]；规则级差异：snapshotUrls；组级差异：key, name
- [跨规则组] 哔哩哔哩 (tv.danmaku.bili) / 功能类-视频自动x1.25倍速(⚠️三选一)：$.apps[224].groups[22].rules[2] ↔ $.apps[224].groups[24].rules[2]；规则级差异：snapshotUrls；组级差异：key, name
- [跨规则组] 百词斩 (com.jiongji.andriod.card) / 开屏广告：$.apps[202].groups[0].rules[0] ↔ $.apps[228].groups[0].rules[0]；规则级差异：action, exampleUrls, excludeActivityIds, excludeSnapshotUrls, snapshotUrls；组级差异：actionMaximum, key
- [跨规则组] Avmini (com.hongjing.avmini) / 全屏广告：$.apps[8].groups[1].rules[0] ↔ $.apps[236].groups[1].rules[0]；规则级差异：exampleUrls, name, snapshotUrls；组级差异：activityIds, key, name
- [跨规则组] Blued X (com.danlan.xiaolan) / 开屏广告：$.apps[13].groups[0].rules[0] ↔ $.apps[256].groups[0].rules[0]；规则级差异：exampleUrls, fastQuery, snapshotUrls；组级差异：fastQuery, key, priorityTime
- [跨规则组] Blued X (com.danlan.xiaolan) / 开屏广告：$.apps[13].groups[0].rules[0] ↔ $.apps[264].groups[0].rules[0]；规则级差异：action, snapshotUrls；组级差异：actionMaximumKey, key, priorityTime
- [跨规则组] Soul (cn.soulapp.android) / 开屏广告：$.apps[113].groups[0].rules[1] ↔ $.apps[267].groups[0].rules[1]；规则级差异：snapshotUrls；组级差异：actionMaximumKey, fastQuery
- [跨规则组] Blued X (com.danlan.xiaolan) / 开屏广告：$.apps[13].groups[0].rules[0] ↔ $.apps[273].groups[0].rules[0]；规则级差异：fastQuery, snapshotUrls；组级差异：fastQuery, key, priorityTime
- [跨规则组] 刺猬猫阅读 (com.kuangxiangciweimao.novel) / 开屏广告：$.apps[256].groups[0].rules[2] ↔ $.apps[273].groups[0].rules[1]；规则级差异：exampleUrls, snapshotUrls；组级差异：
- [跨规则组] 丁香园 (cn.dxy.idxyer) / 功能类-📋病例视频自动x0.5倍速(⚠️四选一)：$.apps[280].groups[8].rules[0] ↔ $.apps[280].groups[9].rules[0]；规则级差异：snapshotUrls；组级差异：desc, key, name
- [跨规则组] 丁香园 (cn.dxy.idxyer) / 功能类-📋病例视频自动x0.5倍速(⚠️四选一)：$.apps[280].groups[8].rules[0] ↔ $.apps[280].groups[10].rules[0]；规则级差异：snapshotUrls；组级差异：desc, key, name
- [跨规则组] 丁香园 (cn.dxy.idxyer) / 功能类-📋病例视频自动x0.5倍速(⚠️四选一)：$.apps[280].groups[8].rules[0] ↔ $.apps[280].groups[11].rules[0]；规则级差异：snapshotUrls；组级差异：desc, key, name
- [跨规则组] 丁香园 (cn.dxy.idxyer) / 功能类-📖课程视频自动x1.2倍速(❗三选一)：$.apps[280].groups[12].rules[0] ↔ $.apps[280].groups[13].rules[0]；规则级差异：actionCd, actionMaximum；组级差异：desc, key, name
- [跨规则组] 丁香园 (cn.dxy.idxyer) / 功能类-📖课程视频自动x1.2倍速(❗三选一)：$.apps[280].groups[12].rules[0] ↔ $.apps[280].groups[14].rules[0]；规则级差异：actionCd, actionMaximum, snapshotUrls；组级差异：desc, key, name
- [跨规则组] Blued X (com.danlan.xiaolan) / 开屏广告：$.apps[13].groups[0].rules[0] ↔ $.apps[286].groups[0].rules[0]；规则级差异：action, snapshotUrls；组级差异：key, priorityTime
- [跨规则组] 百度地图 (com.baidu.BaiduMap) / 开屏广告：$.apps[205].groups[0].rules[1] ↔ $.apps[289].groups[0].rules[1]；规则级差异：exampleUrls, snapshotUrls；组级差异：key, matchRoot
- [跨规则组] 百词斩 (com.jiongji.andriod.card) / 开屏广告：$.apps[202].groups[0].rules[0] ↔ $.apps[295].groups[0].rules[0]；规则级差异：exampleUrls, excludeActivityIds, excludeSnapshotUrls, snapshotUrls；组级差异：key
- [跨规则组] 抖音 (com.ss.android.ugc.aweme) / 功能类-自动开启[自动连播]：$.apps[295].groups[30].rules[0] ↔ $.apps[296].groups[12].rules[0]；规则级差异：excludeSnapshotUrls, snapshotUrls；组级差异：activityIds, desc, key
- [跨规则组] 抖音 (com.ss.android.ugc.aweme) / 功能类-自动开启[自动连播]：$.apps[295].groups[30].rules[1] ↔ $.apps[296].groups[12].rules[1]；规则级差异：snapshotUrls；组级差异：activityIds, desc, key
- [跨规则组] 抖音 (com.ss.android.ugc.aweme) / 功能类-自动开启[自动连播]：$.apps[295].groups[30].rules[2] ↔ $.apps[296].groups[12].rules[2]；规则级差异：snapshotUrls；组级差异：activityIds, desc, key
- [跨规则组] Avmini (com.hongjing.avmini) / 全屏广告：$.apps[8].groups[1].rules[0] ↔ $.apps[306].groups[0].rules[0]；规则级差异：exampleUrls, fastQuery, name, snapshotUrls；组级差异：activityIds, fastQuery, name
- [跨规则组] 番茄免费小说 (com.dragon.read) / 权限提示-通知权限：$.apps[312].groups[7].rules[0] ↔ $.apps[313].groups[0].rules[0]；规则级差异：snapshotUrls；组级差异：activityIds, key
- [跨规则组] 番茄免费小说 (com.dragon.read) / 权限提示-通知权限：$.apps[312].groups[7].rules[1] ↔ $.apps[313].groups[0].rules[1]；规则级差异：snapshotUrls；组级差异：activityIds, key
- [跨规则组] 番茄免费小说 (com.dragon.read) / 权限提示-通知权限：$.apps[312].groups[7].rules[2] ↔ $.apps[313].groups[0].rules[2]；规则级差异：snapshotUrls；组级差异：activityIds, key
- [跨规则组] OmoFun (com.xifeng.fun) / 全屏广告-弹窗广告：$.apps[84].groups[0].rules[0] ↔ $.apps[316].groups[0].rules[0]；规则级差异：actionDelay, fastQuery, snapshotUrls；组级差异：desc, fastQuery, name
- [跨规则组] 懂球帝 (com.dongqiudi.news) / 全屏广告-弹窗广告：$.apps[286].groups[3].rules[1] ↔ $.apps[317].groups[0].rules[1]；规则级差异：exampleUrls, snapshotUrls；组级差异：desc, key, name
- [跨规则组] 777影视 (com.changyou.app.qi) / 全屏广告-弹窗广告：$.apps[173].groups[0].rules[1] ↔ $.apps[323].groups[1].rules[1]；规则级差异：exampleUrls, fastQuery, snapshotUrls；组级差异：desc, fastQuery, key, name
- [跨规则组] Avmini (com.hongjing.avmini) / 全屏广告：$.apps[8].groups[1].rules[0] ↔ $.apps[324].groups[0].rules[0]；规则级差异：exampleUrls, fastQuery, name, snapshotUrls；组级差异：actionMaximum, activityIds, fastQuery, matchTime, name, resetMatch
- [跨规则组] 懂球帝 (com.dongqiudi.news) / 全屏广告-数据页弹窗广告：$.apps[286].groups[4].rules[1] ↔ $.apps[324].groups[0].rules[2]；规则级差异：name, snapshotUrls；组级差异：activityIds, key, matchTime, name
- [跨规则组] 百词斩 (com.jiongji.andriod.card) / 开屏广告：$.apps[202].groups[0].rules[0] ↔ $.apps[334].groups[0].rules[0]；规则级差异：exampleUrls, excludeActivityIds, excludeSnapshotUrls, fastQuery, snapshotUrls；组级差异：fastQuery, key
- [跨规则组] Blued X (com.danlan.xiaolan) / 开屏广告：$.apps[13].groups[0].rules[0] ↔ $.apps[337].groups[0].rules[0]；规则级差异：snapshotUrls；组级差异：key, priorityTime
- [跨规则组] 车e兴 (com.anshibo.activity) / 开屏广告：$.apps[244].groups[0].rules[0] ↔ $.apps[338].groups[0].rules[0]；规则级差异：exampleUrls, excludeSnapshotUrls, fastQuery, snapshotUrls；组级差异：fastQuery
- [跨规则组] Blued X (com.danlan.xiaolan) / 开屏广告：$.apps[13].groups[0].rules[0] ↔ $.apps[339].groups[0].rules[0]；规则级差异：action, snapshotUrls；组级差异：actionMaximumKey, priorityTime
- [跨规则组] 百词斩 (com.jiongji.andriod.card) / 开屏广告：$.apps[202].groups[0].rules[0] ↔ $.apps[380].groups[0].rules[0]；规则级差异：action, exampleUrls, excludeActivityIds, excludeSnapshotUrls, fastQuery, snapshotUrls；组级差异：fastQuery
- [跨规则组] 百词斩 (com.jiongji.andriod.card) / 开屏广告：$.apps[202].groups[0].rules[0] ↔ $.apps[385].groups[0].rules[0]；规则级差异：action, exampleUrls, excludeActivityIds, excludeSnapshotUrls, snapshotUrls；组级差异：
- [跨规则组] 百词斩 (com.jiongji.andriod.card) / 开屏广告：$.apps[202].groups[0].rules[0] ↔ $.apps[387].groups[0].rules[0]；规则级差异：action, exampleUrls, excludeActivityIds, excludeSnapshotUrls, fastQuery, snapshotUrls；组级差异：fastQuery, key
- [跨规则组] 华为视频 (com.huawei.himovie) / 开屏广告：$.apps[382].groups[0].rules[0] ↔ $.apps[388].groups[0].rules[0]；规则级差异：snapshotUrls；组级差异：actionMaximumKey
- [跨规则组] Blued X (com.danlan.xiaolan) / 开屏广告：$.apps[13].groups[0].rules[0] ↔ $.apps[392].groups[0].rules[0]；规则级差异：；组级差异：priorityTime
- [跨规则组] 大学搜题酱 (com.zmzx.college.search) / 分段广告-底部卡片广告：$.apps[264].groups[7].rules[1] ↔ $.apps[401].groups[0].rules[1]；规则级差异：name, snapshotUrls；组级差异：activityIds, desc, key, name
- [跨规则组] 海尔智家 (com.haier.uhome.uplus) / 权限提示-通知权限：$.apps[354].groups[1].rules[1] ↔ $.apps[403].groups[1].rules[1]；规则级差异：exampleUrls, snapshotUrls；组级差异：activityIds, fastQuery, key, name
- [跨规则组] 百词斩 (com.jiongji.andriod.card) / 开屏广告：$.apps[202].groups[0].rules[0] ↔ $.apps[404].groups[0].rules[0]；规则级差异：action, exampleUrls, excludeActivityIds, excludeSnapshotUrls, snapshotUrls；组级差异：key
- [跨规则组] 百词斩 (com.jiongji.andriod.card) / 开屏广告：$.apps[202].groups[0].rules[0] ↔ $.apps[406].groups[0].rules[0]；规则级差异：exampleUrls, excludeActivityIds, excludeSnapshotUrls, snapshotUrls；组级差异：
- [跨规则组] Blued X (com.danlan.xiaolan) / 开屏广告：$.apps[13].groups[0].rules[0] ↔ $.apps[417].groups[0].rules[0]；规则级差异：excludeActivityIds, excludeSnapshotUrls, fastQuery, snapshotUrls；组级差异：fastQuery, key, priorityTime
- [跨规则组] Soul (cn.soulapp.android) / 开屏广告：$.apps[113].groups[0].rules[1] ↔ $.apps[417].groups[0].rules[1]；规则级差异：excludeActivityIds, excludeSnapshotUrls, snapshotUrls；组级差异：actionMaximumKey
- [跨规则组] 777影视 (com.changyou.app.qi) / 全屏广告-弹窗广告：$.apps[173].groups[0].rules[1] ↔ $.apps[435].groups[0].rules[1]；规则级差异：exampleUrls, fastQuery, snapshotUrls；组级差异：fastQuery
- [跨规则组] OMOFUN (com.ksf.yyx) / 全屏广告-插屏广告：$.apps[83].groups[2].rules[1] ↔ $.apps[438].groups[0].rules[2]；规则级差异：snapshotUrls；组级差异：key, name
- [跨规则组] 看剧 (com.bx.game.dgg) / 全屏广告-弹窗广告：$.apps[438].groups[0].rules[3] ↔ $.apps[440].groups[0].rules[3]；规则级差异：actionDelay, fastQuery, name, snapshotUrls；组级差异：desc, fastQuery
- [跨规则组] Blued X (com.danlan.xiaolan) / 开屏广告：$.apps[13].groups[0].rules[0] ↔ $.apps[445].groups[0].rules[0]；规则级差异：action, exampleUrls, fastQuery, snapshotUrls；组级差异：actionMaximum, fastQuery, key, priorityTime
- [跨规则组] 安全服务/小米手机管家 (com.miui.securitycenter) / 功能类-高敏感权限自动确定：$.apps[191].groups[4].rules[1] ↔ $.apps[458].groups[0].rules[1]；规则级差异：exampleUrls, snapshotUrls；组级差异：actionMaximum, activityIds, desc, key, matchTime, name, resetMatch
- [跨规则组] Avmini (com.hongjing.avmini) / 全屏广告：$.apps[8].groups[1].rules[0] ↔ $.apps[462].groups[0].rules[0]；规则级差异：exampleUrls, name, snapshotUrls；组级差异：activityIds, desc, key, name
- [跨规则组] 懂球帝 (com.dongqiudi.news) / 全屏广告-数据页弹窗广告：$.apps[286].groups[4].rules[1] ↔ $.apps[463].groups[0].rules[2]；规则级差异：name, snapshotUrls；组级差异：actionMaximum, activityIds, key, name, resetMatch
- [跨规则组] 刺猬猫阅读 (com.kuangxiangciweimao.novel) / 开屏广告：$.apps[256].groups[0].rules[2] ↔ $.apps[464].groups[0].rules[2]；规则级差异：exampleUrls, fastQuery, snapshotUrls；组级差异：fastQuery
- [跨规则组] 美团 (com.sankuai.meituan) / 局部广告-直播讲解悬浮窗：$.apps[495].groups[10].rules[0] ↔ $.apps[496].groups[2].rules[0]；规则级差异：exampleUrls, snapshotUrls；组级差异：key, name
- [跨规则组] OmoFun (com.xifeng.fun) / 全屏广告-弹窗广告：$.apps[84].groups[0].rules[0] ↔ $.apps[512].groups[0].rules[0]；规则级差异：exampleUrls, fastQuery, snapshotUrls；组级差异：actionMaximum, desc, fastQuery, matchTime, resetMatch
- [跨规则组] 百度网盘-三星版本 (com.baidu.netdisk.samsung) / 全屏广告-弹窗广告：$.apps[210].groups[0].rules[0] ↔ $.apps[514].groups[2].rules[0]；规则级差异：fastQuery, name, snapshotUrls；组级差异：activityIds, desc, key, name
- [跨规则组] Avmini (com.hongjing.avmini) / 全屏广告：$.apps[8].groups[1].rules[0] ↔ $.apps[520].groups[0].rules[0]；规则级差异：exampleUrls, name, snapshotUrls；组级差异：actionMaximum, activityIds, desc, matchTime, name
- [跨规则组] 京东读书 (com.jd.app.reader) / 开屏广告：$.apps[419].groups[0].rules[0] ↔ $.apps[526].groups[0].rules[0]；规则级差异：exampleUrls, snapshotUrls；组级差异：key
- [跨规则组] OmoFun (com.xifeng.fun) / 全屏广告-弹窗广告：$.apps[84].groups[0].rules[0] ↔ $.apps[527].groups[1].rules[0]；规则级差异：exampleUrls, fastQuery, snapshotUrls；组级差异：fastQuery
- [跨规则组] 大学搜题酱 (com.zmzx.college.search) / 分段广告-底部卡片广告：$.apps[264].groups[7].rules[1] ↔ $.apps[528].groups[7].rules[1]；规则级差异：snapshotUrls；组级差异：activityIds, desc, key, name
- [跨规则组] 百词斩 (com.jiongji.andriod.card) / 开屏广告：$.apps[202].groups[0].rules[0] ↔ $.apps[529].groups[0].rules[0]；规则级差异：exampleUrls, excludeActivityIds, excludeSnapshotUrls, snapshotUrls；组级差异：
- [跨规则组] 京东读书 (com.jd.app.reader) / 开屏广告：$.apps[419].groups[0].rules[0] ↔ $.apps[539].groups[0].rules[0]；规则级差异：exampleUrls, snapshotUrls；组级差异：
- [跨规则组] 番茄免费小说 (com.dragon.read) / 功能类-看广告自动领奖励：$.apps[312].groups[9].rules[3] ↔ $.apps[539].groups[3].rules[14]；规则级差异：name, snapshotUrls；组级差异：desc, key, name
- [同一规则组] 汽水音乐 (com.luna.music) / 功能类-全自动看广告领VIP_单日：$.apps[539].groups[8].rules[8] ↔ $.apps[539].groups[8].rules[9]；规则级差异：actionMaximum, name, order, position；组级差异：
- [跨规则组] (三星)应用商店 (com.sec.android.app.samsungapps) / 开屏广告：$.apps[154].groups[0].rules[0] ↔ $.apps[543].groups[0].rules[0]；规则级差异：action, exampleUrls, snapshotUrls；组级差异：
- [跨规则组] 123云盘 (com.mfcloudcalculate.networkdisk) / 全屏广告：$.apps[161].groups[0].rules[5] ↔ $.apps[546].groups[1].rules[5]；规则级差异：exampleUrls, snapshotUrls；组级差异：key, name
- [跨规则组] 解压专家 (com.fileunzip.zxwknight) / 全屏广告-弹窗广告：$.apps[410].groups[0].rules[1] ↔ $.apps[551].groups[0].rules[1]；规则级差异：name, snapshotUrls；组级差异：actionMaximum, activityIds, key, matchTime, resetMatch
- [跨规则组] OMOFUN (com.cyl.musiccy.ou) / 开屏广告：$.apps[82].groups[0].rules[0] ↔ $.apps[570].groups[0].rules[0]；规则级差异：fastQuery, snapshotUrls；组级差异：fastQuery
- [跨规则组] 百词斩 (com.jiongji.andriod.card) / 开屏广告：$.apps[202].groups[0].rules[0] ↔ $.apps[588].groups[0].rules[0]；规则级差异：action, exampleUrls, excludeActivityIds, excludeSnapshotUrls, snapshotUrls；组级差异：
- [跨规则组] 百词斩 (com.jiongji.andriod.card) / 开屏广告：$.apps[202].groups[0].rules[0] ↔ $.apps[602].groups[0].rules[0]；规则级差异：action, exampleUrls, excludeActivityIds, excludeSnapshotUrls, snapshotUrls；组级差异：key
- [跨规则组] Blued X (com.danlan.xiaolan) / 分段广告-卡片广告：$.apps[13].groups[1].rules[1] ↔ $.apps[603].groups[0].rules[1]；规则级差异：snapshotUrls；组级差异：activityIds, key
- [跨规则组] Blued X (com.danlan.xiaolan) / 开屏广告：$.apps[13].groups[0].rules[0] ↔ $.apps[608].groups[0].rules[0]；规则级差异：；组级差异：actionMaximumKey, desc, priorityTime
- [跨规则组] 水果派 (com.oneshareclap.malaysian) / 开屏广告：$.apps[618].groups[0].rules[0] ↔ $.apps[620].groups[0].rules[0]；规则级差异：exampleUrls, fastQuery, matchDelay, snapshotUrls；组级差异：fastQuery
- [跨规则组] Blued X (com.danlan.xiaolan) / 开屏广告：$.apps[13].groups[0].rules[0] ↔ $.apps[628].groups[0].rules[0]；规则级差异：snapshotUrls；组级差异：forcedTime, priorityTime
- [跨规则组] OMOFUN (com.cyl.musiccy.ou) / 通知提示-公告弹窗：$.apps[82].groups[1].rules[0] ↔ $.apps[647].groups[0].rules[0]；规则级差异：snapshotUrls；组级差异：key
- [跨规则组] 百度网盘-三星版本 (com.baidu.netdisk.samsung) / 全屏广告-弹窗广告：$.apps[210].groups[0].rules[0] ↔ $.apps[662].groups[1].rules[0]；规则级差异：exampleUrls, fastQuery, snapshotUrls；组级差异：activityIds, desc, fastQuery, key, name
- [跨规则组] MyComic (com.qc.mycomic) / 开屏广告：$.apps[78].groups[0].rules[0] ↔ $.apps[678].groups[0].rules[0]；规则级差异：exampleUrls, fastQuery, snapshotUrls；组级差异：actionMaximum, fastQuery, key, matchTime, resetMatch
- [跨规则组] 荣耀天气 (com.hihonor.android.totemweather) / 分段广告-卡片广告：$.apps[576].groups[1].rules[1] ↔ $.apps[688].groups[0].rules[1]；规则级差异：exampleUrls, snapshotUrls；组级差异：activityIds, key, name
- [跨规则组] 百度贴吧 (com.baidu.tieba) / 开屏广告：$.apps[208].groups[0].rules[1] ↔ $.apps[699].groups[0].rules[1]；规则级差异：snapshotUrls；组级差异：
- [跨规则组] 百度贴吧 (com.baidu.tieba) / 开屏广告：$.apps[208].groups[0].rules[1] ↔ $.apps[700].groups[0].rules[1]；规则级差异：snapshotUrls；组级差异：
- [跨规则组] 京东读书 (com.jd.app.reader) / 开屏广告：$.apps[419].groups[0].rules[2] ↔ $.apps[700].groups[0].rules[2]；规则级差异：exampleUrls, position, snapshotUrls；组级差异：
- [跨规则组] 微博极速版 (com.sina.weibolite) / 分段广告-信息流广告：$.apps[706].groups[0].rules[0] ↔ $.apps[707].groups[1].rules[0]；规则级差异：name, snapshotUrls；组级差异：activityIds, desc, forcedTime, key, matchRoot
- [跨规则组] 爱其意 (com.taitedi.hdd.ayi) / 全屏广告-弹窗广告：$.apps[180].groups[1].rules[0] ↔ $.apps[729].groups[0].rules[0]；规则级差异：exampleUrls, snapshotUrls；组级差异：key
- [跨规则组] 系统界面 (com.android.systemui) / 功能类-自动允许网易云音乐共享整个屏幕：$.apps[735].groups[0].rules[1] ↔ $.apps[735].groups[1].rules[1]；规则级差异：；组级差异：key, name
- [跨规则组] 系统界面 (com.android.systemui) / 功能类-自动允许网易云音乐共享整个屏幕：$.apps[735].groups[0].rules[2] ↔ $.apps[735].groups[1].rules[2]；规则级差异：；组级差异：key, name
- [跨规则组] 系统界面 (com.android.systemui) / 功能类-自动允许网易云音乐共享整个屏幕：$.apps[735].groups[0].rules[1] ↔ $.apps[735].groups[2].rules[1]；规则级差异：；组级差异：key, name
- [跨规则组] 系统界面 (com.android.systemui) / 功能类-自动允许网易云音乐共享整个屏幕：$.apps[735].groups[0].rules[2] ↔ $.apps[735].groups[2].rules[2]；规则级差异：；组级差异：key, name
- [跨规则组] 系统界面 (com.android.systemui) / 功能类-自动允许USB调试：$.apps[735].groups[3].rules[1] ↔ $.apps[735].groups[4].rules[1]；规则级差异：；组级差异：desc, key, name
- [跨规则组] Soul (cn.soulapp.android) / 开屏广告：$.apps[113].groups[0].rules[1] ↔ $.apps[737].groups[0].rules[1]；规则级差异：snapshotUrls；组级差异：actionMaximumKey, fastQuery
- [跨规则组] Soul (cn.soulapp.android) / 开屏广告：$.apps[113].groups[0].rules[1] ↔ $.apps[744].groups[0].rules[1]；规则级差异：fastQuery, snapshotUrls；组级差异：actionMaximumKey, key
- [跨规则组] 小红书 (com.xingin.xhs) / 功能类-自动倍速⏩x0.75⚠️五选一：$.apps[756].groups[10].rules[0] ↔ $.apps[756].groups[11].rules[0]；规则级差异：exampleUrls, snapshotUrls；组级差异：desc, key, name
- [跨规则组] 小红书 (com.xingin.xhs) / 功能类-自动倍速⏩x0.75⚠️五选一：$.apps[756].groups[10].rules[0] ↔ $.apps[756].groups[12].rules[0]；规则级差异：exampleUrls, snapshotUrls；组级差异：desc, key, name
- [跨规则组] 小红书 (com.xingin.xhs) / 功能类-自动倍速⏩x0.75⚠️五选一：$.apps[756].groups[10].rules[0] ↔ $.apps[756].groups[13].rules[0]；规则级差异：exampleUrls, snapshotUrls；组级差异：desc, key, name
- [跨规则组] 小红书 (com.xingin.xhs) / 功能类-自动倍速⏩x0.75⚠️五选一：$.apps[756].groups[10].rules[0] ↔ $.apps[756].groups[14].rules[0]；规则级差异：exampleUrls, snapshotUrls；组级差异：desc, key, name
- [跨规则组] 百词斩 (com.jiongji.andriod.card) / 开屏广告：$.apps[202].groups[0].rules[0] ↔ $.apps[770].groups[0].rules[0]；规则级差异：action, exampleUrls, excludeActivityIds, excludeSnapshotUrls, snapshotUrls；组级差异：priorityTime
- [跨规则组] OmoFun (com.xifeng.fun) / 全屏广告-弹窗广告：$.apps[84].groups[0].rules[0] ↔ $.apps[779].groups[0].rules[0]；规则级差异：fastQuery, name, snapshotUrls；组级差异：actionMaximum, desc, fastQuery, matchTime, resetMatch
- [跨规则组] Soul (cn.soulapp.android) / 开屏广告：$.apps[113].groups[0].rules[1] ↔ $.apps[791].groups[0].rules[1]；规则级差异：fastQuery, snapshotUrls；组级差异：actionMaximumKey
- [跨规则组] 刺猬猫阅读 (com.kuangxiangciweimao.novel) / 开屏广告：$.apps[256].groups[0].rules[2] ↔ $.apps[791].groups[0].rules[2]；规则级差异：exampleUrls, snapshotUrls；组级差异：
- [跨规则组] Avmini (com.hongjing.avmini) / 全屏广告：$.apps[8].groups[1].rules[0] ↔ $.apps[797].groups[1].rules[0]；规则级差异：exampleUrls, fastQuery, name, snapshotUrls；组级差异：actionDelay, actionMaximum, activityIds, desc, fastQuery, key, matchTime, name, resetMatch
- [跨规则组] 豆瓣 (com.douban.frodo) / 全屏广告-弹窗广告：$.apps[299].groups[5].rules[1] ↔ $.apps[797].groups[1].rules[1]；规则级差异：snapshotUrls；组级差异：actionDelay, actionMaximum, activityIds, key, matchTime, resetMatch
- [跨规则组] OMOFUN (com.cyl.musiccy.ou) / 通知提示-公告弹窗：$.apps[82].groups[1].rules[0] ↔ $.apps[804].groups[1].rules[0]；规则级差异：snapshotUrls；组级差异：key
- [跨规则组] EASI (com.easi.customer) / 全屏广告：$.apps[33].groups[0].rules[0] ↔ $.apps[806].groups[0].rules[0]；规则级差异：snapshotUrls；组级差异：
- [跨规则组] Blued X (com.danlan.xiaolan) / 开屏广告：$.apps[13].groups[0].rules[0] ↔ $.apps[813].groups[0].rules[0]；规则级差异：excludeActivityIds, excludeSnapshotUrls, snapshotUrls；组级差异：key, priorityTime
- [跨规则组] 刺猬猫阅读 (com.kuangxiangciweimao.novel) / 开屏广告：$.apps[256].groups[0].rules[2] ↔ $.apps[813].groups[0].rules[2]；规则级差异：exampleUrls, fastQuery, snapshotUrls；组级差异：fastQuery
- [跨规则组] 小猿搜题 (com.fenbi.android.solar) / 评价提示：$.apps[790].groups[0].rules[0] ↔ $.apps[815].groups[0].rules[0]；规则级差异：exampleUrls, snapshotUrls；组级差异：activityIds, desc, key, name
- [跨规则组] 百词斩 (com.jiongji.andriod.card) / 开屏广告：$.apps[202].groups[0].rules[0] ↔ $.apps[817].groups[0].rules[0]；规则级差异：exampleUrls, excludeActivityIds, excludeSnapshotUrls, snapshotUrls；组级差异：
- [跨规则组] 糖豆 (com.bokecc.dance) / 局部广告-信息流广告：$.apps[640].groups[3].rules[0] ↔ $.apps[818].groups[0].rules[0]；规则级差异：exampleUrls, fastQuery, snapshotUrls；组级差异：actionMaximum, desc, fastQuery, key, matchTime, name, resetMatch
…另有 39 项未展开

## 行为等价审查与安全结论

- 逐项核对时必须同时考虑 matches、anyMatches、allMatches、noneMatches、excludeMatches、activityIds、preKeys、matchTime、key。
- 还必须核对 action/actionCd/actionMaximum/resetMatch、priorityTime/forcedTime、order、actionDelay、position、规则组 enable、disableIfAppGroupMatch 及应用包名。
- snapshotUrls、excludeSnapshotUrls、exampleUrls 是理解规则真实 UI 上下文的重要证据；快照相同或缺失都不能单独证明规则冗余。
- 当前静态审计只能定位候选，不能替代设备上的可复现触发测试，也不能证明不同选择器表达式之间的包含、交集或可达性。
- 不确定项一律保留；只有完整上下文与可复现测试均证明行为不变时，才允许人工删除。
- 本轮未自动删除、合并或改写任何规则。
