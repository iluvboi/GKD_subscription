import fs from 'node:fs';
import JSON5 from 'json5';

const upstream = JSON5.parse(fs.readFileSync('upstream.json5', 'utf8'));
const cleaned = JSON5.parse(fs.readFileSync('gkd.json5', 'utf8'));

const stable = (value) => {
  if (Array.isArray(value)) return '[' + value.map(stable).join(',') + ']';
  if (value && typeof value === 'object') {
    return '{' + Object.keys(value).sort().map((key) =>
      JSON.stringify(key) + ':' + stable(value[key])).join(',') + '}';
  }
  return JSON.stringify(value);
};

const selectorKeys = [
  'matches', 'anyMatches', 'allMatches', 'noneMatches', 'excludeMatches',
  'activityIds', 'matchTime', 'preKeys', 'key'
];

function collect(root) {
  const groups = [];
  const walk = (value, path = '$') => {
    if (!value || typeof value !== 'object') return;
    if (Array.isArray(value)) {
      value.forEach((child, index) => walk(child, path + '[' + index + ']'));
      return;
    }
    if (Array.isArray(value.rules)) {
      const identity = [
        value.name ?? '', value.key ?? '', value.id ?? '', value.groupKey ?? ''
      ].map(String).join('|');
      const groupPath = path + '.rules';
      const rules = value.rules.map((rule, index) => ({
        index,
        path: groupPath + '[' + index + ']',
        value: rule,
        fingerprint: stable(rule),
        selectorSignature: stable(Object.fromEntries(
          selectorKeys.filter((key) => Object.hasOwn(rule ?? {}, key))
            .map((key) => [key, rule[key]])
        ))
      }));
      groups.push({
        path,
        label: identity || path,
        rules
      });
    }
    for (const [key, child] of Object.entries(value)) {
      if (key !== 'rules') walk(child, path + '.' + key);
    }
  };
  walk(root);
  return groups;
}

function inspect(root) {
  const groups = collect(root);
  const exactDuplicates = [];
  const selectorDuplicates = [];
  const exactGlobal = new Map();
  const selectorGlobal = new Map();
  let ruleCount = 0;

  for (const group of groups) {
    const exactSeen = new Map();
    const selectorSeen = new Map();
    ruleCount += group.rules.length;
    for (const rule of group.rules) {
      if (exactSeen.has(rule.fingerprint)) {
        exactDuplicates.push({
          scope: '同一规则组',
          group: group.label,
          first: exactSeen.get(rule.fingerprint),
          duplicate: rule.path
        });
      } else exactSeen.set(rule.fingerprint, rule.path);

      if (rule.selectorSignature !== '{}') {
        if (selectorSeen.has(rule.selectorSignature)) {
          selectorDuplicates.push({
            scope: '同一规则组',
            group: group.label,
            first: selectorSeen.get(rule.selectorSignature),
            candidate: rule.path
          });
        } else selectorSeen.set(rule.selectorSignature, rule.path);
      }

      const exactKey = rule.fingerprint;
      if (exactGlobal.has(exactKey)) {
        exactDuplicates.push({
          scope: '跨规则组',
          group: group.label,
          first: exactGlobal.get(exactKey),
          duplicate: rule.path
        });
      } else exactGlobal.set(exactKey, rule.path);

      const selectorKey = rule.selectorSignature;
      if (selectorKey !== '{}') {
        if (selectorGlobal.has(selectorKey)) {
          selectorDuplicates.push({
            scope: '跨规则组',
            group: group.label,
            first: selectorGlobal.get(selectorKey),
            candidate: rule.path
          });
        } else selectorGlobal.set(selectorKey, rule.path);
      }
    }
  }

  return { groups, ruleCount, exactDuplicates, selectorDuplicates };
}

const up = inspect(upstream);
const cl = inspect(cleaned);
const upGroupMap = new Map(up.groups.map((group) => [group.path, group]));
const clGroupMap = new Map(cl.groups.map((group) => [group.path, group]));
const missingGroups = up.groups.filter((group) => !clGroupMap.has(group.path));
const extraGroups = cl.groups.filter((group) => !upGroupMap.has(group.path));
const removedRules = [];
const addedRules = [];

for (const group of up.groups) {
  const other = clGroupMap.get(group.path);
  if (!other) continue;
  const cleanedCounts = new Map();
  for (const rule of other.rules) {
    cleanedCounts.set(rule.fingerprint, (cleanedCounts.get(rule.fingerprint) ?? 0) + 1);
  }
  for (const rule of group.rules) {
    const count = cleanedCounts.get(rule.fingerprint) ?? 0;
    if (count > 0) cleanedCounts.set(rule.fingerprint, count - 1);
    else removedRules.push({ group: group.label, path: rule.path, fingerprint: rule.fingerprint });
  }
  const upstreamCounts = new Map();
  for (const rule of group.rules) {
    upstreamCounts.set(rule.fingerprint, (upstreamCounts.get(rule.fingerprint) ?? 0) + 1);
  }
  for (const rule of other.rules) {
    const count = upstreamCounts.get(rule.fingerprint) ?? 0;
    if (count > 0) upstreamCounts.set(rule.fingerprint, count - 1);
    else addedRules.push({ group: other.label, path: rule.path, fingerprint: rule.fingerprint });
  }
}

const sameContent = stable(upstream) === stable(cleaned);
const clip = (items, formatter, limit = 100) => [
  ...items.slice(0, limit).map(formatter),
  ...(items.length > limit ? ['…另有 ' + (items.length - limit) + ' 项未展开'] : [])
];

const lines = [
  '# GKD 规则审计报告',
  '',
  '## 基本信息',
  '',
  '- 上游订阅 ID：' + String(upstream.id ?? '未知'),
  '- 上游版本：' + String(upstream.version ?? '未知'),
  '- 清理版订阅 ID：' + String(cleaned.id ?? '未知'),
  '- 清理版版本：' + String(cleaned.version ?? '未知'),
  '- 比较结果：' + (sameContent ? '清理版与上游 JSON 结构完全一致' : '清理版与上游存在差异'),
  '',
  '## 结构统计',
  '',
  '| 指标 | 上游 | 清理版 |',
  '|---|---:|---:|',
  '| 规则组 | ' + up.groups.length + ' | ' + cl.groups.length + ' |',
  '| 规则总数 | ' + up.ruleCount + ' | ' + cl.ruleCount + ' |',
  '| 完全重复规则候选 | ' + up.exactDuplicates.length + ' | ' + cl.exactDuplicates.length + ' |',
  '| 选择器条件签名相同候选 | ' + up.selectorDuplicates.length + ' | ' + cl.selectorDuplicates.length + ' |',
  '',
  '## 清理版与上游差异',
  '',
  '- 上游有、清理版缺失的规则组：' + missingGroups.length,
  '- 清理版额外规则组：' + extraGroups.length,
  '- 清理版缺失的上游规则：' + removedRules.length,
  '- 清理版额外规则：' + addedRules.length,
  '',
  ...clip(missingGroups, (item) => '- 缺失规则组：' + item.path),
  ...clip(extraGroups, (item) => '- 额外规则组：' + item.path),
  ...clip(removedRules, (item) => '- 缺失规则：' + item.path + '（' + item.group + '）'),
  ...clip(addedRules, (item) => '- 额外规则：' + item.path + '（' + item.group + '）'),
  '',
  '## 完全重复规则候选',
  '',
  '完全重复仅表示规则对象序列化后相同；跨规则组仍可能因应用、组配置或执行上下文不同而具有不同作用。',
  '',
  ...clip(up.exactDuplicates, (item) =>
    '- [' + item.scope + '] ' + item.group + '：' + item.first + ' ↔ ' + item.duplicate),
  '',
  '## 选择器条件签名相同候选',
  '',
  '仅比较 matches/anyMatches/allMatches/noneMatches/excludeMatches/activityIds/matchTime/preKeys/key 等字段的完全相同情况；不代表选择器语义等价或动作冗余。',
  '',
  ...clip(up.selectorDuplicates, (item) =>
    '- [' + item.scope + '] ' + item.group + '：' + item.first + ' ↔ ' + item.candidate),
  '',
  '## 安全结论与限制',
  '',
  '- 本工具只生成候选和结构差异，不会自动删除或改写任何 GKD 规则。',
  '- 相同选择器条件可能配置不同动作、冷却、上限、重置方式或优先级，不能据此合并。',
  '- 选择器表达式之间的包含、交集、可达性及真实 UI 树效果无法仅靠静态字符串可靠证明。',
  '- Activity、应用包名、规则组启用状态、前置按键、执行顺序、matchTime、actionCd、actionMaximum、resetMatch、snapshotUrls 等上下文都可能改变实际行为。',
  '- 不确定项一律保留；只有结合规则上下文和可复现测试证明行为不变后，才允许人工清理。',
  '',
  '## 本次处理',
  '',
  '未自动删除任何规则。'
];

fs.mkdirSync('audit', { recursive: true });
const report = lines.join('\n') + '\n';
fs.writeFileSync('audit/REPORT.md', report);
console.log(report);
