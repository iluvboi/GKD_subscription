import fs from 'node:fs';
import JSON5 from 'json5';

const EXPECTED_UPSTREAM_ID = Number(process.env.GKD_EXPECTED_UPSTREAM_ID ?? 667);
const EXPECTED_CLEANED_ID = Number(process.env.GKD_EXPECTED_CLEANED_ID ?? 668);
const candidatePath = process.argv[2] ?? 'upstream.json5';
const upstreamPath = 'upstream.json5';
const cleanedPath = 'gkd.json5';
const reportPath = 'audit/REPORT.md';
const generatedAt = new Date().toISOString();

function stable(value) {
  if (value === undefined) return 'undefined';
  if (typeof value === 'number' && Number.isNaN(value)) return 'NaN';
  if (value === Infinity) return 'Infinity';
  if (value === -Infinity) return '-Infinity';
  if (Array.isArray(value)) return '[' + value.map(stable).join(',') + ']';
  if (value && typeof value === 'object') {
    return '{' + Object.keys(value).sort().map((key) =>
      JSON.stringify(key) + ':' + stable(value[key])).join(',') + '}';
  }
  return JSON.stringify(value);
}

function diffKeys(left, right, excluded = []) {
  const ignored = new Set(excluded);
  const keys = new Set([
    ...Object.keys(left ?? {}),
    ...Object.keys(right ?? {})
  ]);
  return [...keys].filter((key) =>
    !ignored.has(key) && stable(left?.[key]) !== stable(right?.[key])
  ).sort();
}

function writeBlockedReport(reason, details = []) {
  fs.mkdirSync('audit', { recursive: true });
  const lines = [
    '# GKD 规则审计报告',
    '',
    '- 检查时间：' + generatedAt,
    '- 状态：阻塞，未更新上游镜像',
    '- 原因：' + reason,
    '',
    '## 阻塞详情',
    '',
    ...details.map((item) => '- ' + item),
    '',
    '## 安全处理',
    '',
    '- upstream.json5 保持原样。',
    '- gkd.json5 保持原样。',
    '- 未删除、合并或改写任何规则。',
    '- 请先解决上述问题，再重新运行审计。'
  ];
  fs.writeFileSync(reportPath, lines.join('\n') + '\n');
  console.error(reason);
  process.exitCode = 1;
}

function collectGroups(root) {
  const groups = [];
  for (const [appIndex, app] of (root.apps ?? []).entries()) {
    for (const [groupIndex, group] of (app.groups ?? []).entries()) {
      if (!Array.isArray(group.rules)) continue;
      groups.push({
        scope: 'app',
        appId: String(app.id ?? 'unknown-app-' + appIndex),
        appName: String(app.name ?? ''),
        path: '$.apps[' + appIndex + '].groups[' + groupIndex + ']',
        group,
        rules: group.rules
      });
    }
  }
  for (const [groupIndex, group] of (root.globalGroups ?? []).entries()) {
    if (!Array.isArray(group.rules)) continue;
    groups.push({
      scope: 'global',
      appId: '',
      appName: '全局',
      path: '$.globalGroups[' + groupIndex + ']',
      group,
      rules: group.rules
    });
  }
  return groups;
}

function groupIdentity(item) {
  const owner = item.scope === 'app' ? 'app:' + item.appId : 'global';
  const token = item.group.key !== undefined
    ? 'key:' + stable(item.group.key)
    : 'name:' + String(item.group.name ?? '');
  return owner + '|' + token;
}

function groupLabel(item) {
  const owner = item.scope === 'app'
    ? item.appName + ' (' + item.appId + ')'
    : '全局规则';
  return owner + ' / ' + String(item.group.name ?? '(未命名规则组)');
}

function bucketGroups(groups) {
  const buckets = new Map();
  for (const group of groups) {
    const identity = groupIdentity(group);
    const bucket = buckets.get(identity) ?? [];
    bucket.push(group);
    buckets.set(identity, bucket);
  }
  return buckets;
}

function pairGroups(upstreamGroups, cleanedGroups) {
  const upstreamBuckets = bucketGroups(upstreamGroups);
  const cleanedBuckets = bucketGroups(cleanedGroups);
  const identities = new Set([
    ...upstreamBuckets.keys(),
    ...cleanedBuckets.keys()
  ]);
  const matched = [];
  const missing = [];
  const extra = [];
  const ambiguous = [];

  for (const identity of identities) {
    const upstream = upstreamBuckets.get(identity) ?? [];
    const cleaned = [...(cleanedBuckets.get(identity) ?? [])];
    if (upstream.length === 0) {
      extra.push(...cleaned);
      continue;
    }
    if (cleaned.length === 0) {
      missing.push(...upstream);
      continue;
    }
    for (const item of upstream) {
      let index = cleaned.findIndex((candidate) =>
        String(candidate.group.name ?? '') === String(item.group.name ?? '')
      );
      if (index < 0 && upstream.length === 1 && cleaned.length === 1) {
        index = 0;
      }
      if (index < 0) {
        ambiguous.push({ identity, upstream: item, cleanedCandidates: cleaned });
      } else {
        matched.push({ upstream: item, cleaned: cleaned[index], identity });
        cleaned.splice(index, 1);
      }
    }
    extra.push(...cleaned);
  }
  return { matched, missing, extra, ambiguous };
}

function ruleSummary(rule) {
  const parts = [];
  if (rule?.key !== undefined) parts.push('key=' + String(rule.key));
  if (rule?.name) parts.push('name=' + String(rule.name));
  return parts.join(' / ') || '(无 key/name)';
}

function compareRules(upstreamRules, cleanedRules) {
  const usedUpstream = new Set();
  const usedCleaned = new Set();
  const modifiedByKey = [];
  const upstreamKeyed = new Map();
  const cleanedKeyed = new Map();

  upstreamRules.forEach((rule, index) => {
    if (rule?.key === undefined) return;
    const key = stable(rule.key);
    const list = upstreamKeyed.get(key) ?? [];
    list.push({ rule, index });
    upstreamKeyed.set(key, list);
  });
  cleanedRules.forEach((rule, index) => {
    if (rule?.key === undefined) return;
    const key = stable(rule.key);
    const list = cleanedKeyed.get(key) ?? [];
    list.push({ rule, index });
    cleanedKeyed.set(key, list);
  });

  for (const [key, upstreamList] of upstreamKeyed) {
    const cleanedList = cleanedKeyed.get(key);
    if (upstreamList.length !== 1 || cleanedList?.length !== 1) continue;
    const upstream = upstreamList[0];
    const cleaned = cleanedList[0];
    usedUpstream.add(upstream.index);
    usedCleaned.add(cleaned.index);
    if (stable(upstream.rule) !== stable(cleaned.rule)) {
      modifiedByKey.push({
        key: upstream.rule.key,
        upstream: upstream.rule,
        cleaned: cleaned.rule,
        changedFields: diffKeys(upstream.rule, cleaned.rule)
      });
    }
  }

  const cleanedByFingerprint = new Map();
  cleanedRules.forEach((rule, index) => {
    if (usedCleaned.has(index)) return;
    const fingerprint = stable(rule);
    const list = cleanedByFingerprint.get(fingerprint) ?? [];
    list.push(index);
    cleanedByFingerprint.set(fingerprint, list);
  });
  upstreamRules.forEach((rule, index) => {
    if (usedUpstream.has(index)) return;
    const list = cleanedByFingerprint.get(stable(rule));
    if (list?.length) {
      usedUpstream.add(index);
      usedCleaned.add(list.shift());
    }
  });

  let upstreamOnly = upstreamRules
    .map((rule, index) => ({ rule, index }))
    .filter((item) => !usedUpstream.has(item.index));
  let cleanedOnly = cleanedRules
    .map((rule, index) => ({ rule, index }))
    .filter((item) => !usedCleaned.has(item.index));
  const modifiedUnkeyed = [];

  if (
    upstreamOnly.length === 1 &&
    cleanedOnly.length === 1 &&
    upstreamOnly[0].rule?.key === undefined &&
    cleanedOnly[0].rule?.key === undefined
  ) {
    modifiedUnkeyed.push({
      upstream: upstreamOnly[0].rule,
      cleaned: cleanedOnly[0].rule,
      changedFields: diffKeys(upstreamOnly[0].rule, cleanedOnly[0].rule)
    });
    upstreamOnly = [];
    cleanedOnly = [];
  }

  const commonKeys = new Set(
    [...upstreamKeyed.keys()].filter((key) =>
      cleanedKeyed.has(key) &&
      upstreamKeyed.get(key).length === 1 &&
      cleanedKeyed.get(key).length === 1
    )
  );
  const upstreamOrder = upstreamRules
    .filter((rule) => rule?.key !== undefined && commonKeys.has(stable(rule.key)))
    .map((rule) => rule.key);
  const cleanedOrder = cleanedRules
    .filter((rule) => rule?.key !== undefined && commonKeys.has(stable(rule.key)))
    .map((rule) => rule.key);

  return {
    modifiedByKey,
    modifiedUnkeyed,
    upstreamOnly,
    cleanedOnly,
    orderChanged: stable(upstreamOrder) !== stable(cleanedOrder)
  };
}

const selectorKeys = [
  'matches', 'anyMatches', 'allMatches', 'noneMatches', 'excludeMatches',
  'activityIds', 'matchTime', 'preKeys', 'key'
];

function inspect(groups) {
  const exactDuplicates = [];
  const selectorDuplicates = [];
  const exactGlobal = new Map();
  const selectorGlobal = new Map();

  for (const group of groups) {
    const exactLocal = new Map();
    const selectorLocal = new Map();
    group.rules.forEach((rule, index) => {
      const info = {
        group,
        rule,
        path: group.path + '.rules[' + index + ']'
      };
      const fingerprint = stable(rule);
      if (exactLocal.has(fingerprint)) {
        exactDuplicates.push({
          scope: '同一规则组',
          first: exactLocal.get(fingerprint),
          candidate: info
        });
      } else {
        exactLocal.set(fingerprint, info);
      }
      const exactPrevious = exactGlobal.get(fingerprint);
      if (exactPrevious && exactPrevious.group.path !== group.path) {
        exactDuplicates.push({
          scope: '跨规则组',
          first: exactPrevious,
          candidate: info
        });
      } else if (!exactPrevious) {
        exactGlobal.set(fingerprint, info);
      }

      const selectorSignature = stable(Object.fromEntries(
        selectorKeys.filter((key) => Object.hasOwn(rule ?? {}, key))
          .map((key) => [key, rule[key]])
      ));
      if (selectorSignature === '{}') return;
      if (selectorLocal.has(selectorSignature)) {
        const previous = selectorLocal.get(selectorSignature);
        selectorDuplicates.push({
          scope: '同一规则组',
          first: previous,
          candidate: info,
          ruleDiffKeys: diffKeys(previous.rule, rule, selectorKeys),
          groupDiffKeys: diffKeys(previous.group.group, group.group, ['rules'])
        });
      } else {
        selectorLocal.set(selectorSignature, info);
      }
      const selectorPrevious = selectorGlobal.get(selectorSignature);
      if (selectorPrevious && selectorPrevious.group.path !== group.path) {
        selectorDuplicates.push({
          scope: '跨规则组',
          first: selectorPrevious,
          candidate: info,
          ruleDiffKeys: diffKeys(selectorPrevious.rule, rule, selectorKeys),
          groupDiffKeys: diffKeys(selectorPrevious.group.group, group.group, ['rules'])
        });
      } else if (!selectorPrevious) {
        selectorGlobal.set(selectorSignature, info);
      }
    });
  }
  return { exactDuplicates, selectorDuplicates };
}

function countFields(items, fieldName) {
  const counts = new Map();
  for (const item of items) {
    for (const key of item[fieldName] ?? []) {
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

function clip(items, formatter, limit = 120) {
  return [
    ...items.slice(0, limit).map(formatter),
    ...(items.length > limit
      ? ['…另有 ' + (items.length - limit) + ' 项未展开']
      : [])
  ];
}

function main() {
  let candidateText;
  let cleanedText;
  let existingText = null;
  try {
    candidateText = fs.readFileSync(candidatePath, 'utf8');
    cleanedText = fs.readFileSync(cleanedPath, 'utf8');
    if (fs.existsSync(upstreamPath)) {
      existingText = fs.readFileSync(upstreamPath, 'utf8');
    }
  } catch (error) {
    writeBlockedReport('无法读取审计所需文件：' + error.message);
    return;
  }

  let upstream;
  let cleaned;
  let existingUpstream;
  try {
    upstream = JSON5.parse(candidateText);
    cleaned = JSON5.parse(cleanedText);
    if (existingText !== null) existingUpstream = JSON5.parse(existingText);
  } catch (error) {
    writeBlockedReport('JSON5 解析失败：' + error.message, [
      '候选上游文件：' + candidatePath,
      '清理版文件：' + cleanedPath,
      '未将候选文件写入 upstream.json5。'
    ]);
    return;
  }

  const validationErrors = [];
  for (const [label, data, expectedId] of [['上游', upstream, EXPECTED_UPSTREAM_ID], ['清理版', cleaned, EXPECTED_CLEANED_ID]]) {
    if (data.id !== expectedId) {
      validationErrors.push(label + '订阅 ID 应为 ' + expectedId + '，实际为 ' + String(data.id));
    }
    if (!Number.isInteger(data.version) || data.version <= 0) {
      validationErrors.push(label + '版本号无效：' + String(data.version));
    }
  }
  if (
    existingUpstream &&
    Number.isInteger(existingUpstream.version) &&
    upstream.version < existingUpstream.version
  ) {
    validationErrors.push(
      '候选上游版本 ' + upstream.version +
      ' 低于仓库现有版本 ' + existingUpstream.version + '，拒绝回退覆盖。'
    );
  }
  if (validationErrors.length) {
    writeBlockedReport('订阅 ID/版本校验失败。', validationErrors);
    return;
  }

  const upstreamGroups = collectGroups(upstream);
  const cleanedGroups = collectGroups(cleaned);
  const upstreamRuleCount = upstreamGroups.reduce((sum, group) => sum + group.rules.length, 0);
  const cleanedRuleCount = cleanedGroups.reduce((sum, group) => sum + group.rules.length, 0);
  const paired = pairGroups(upstreamGroups, cleanedGroups);
  const groupMetaChanges = [];
  const ruleChanges = [];

  for (const pair of paired.matched) {
    const upstreamMeta = Object.fromEntries(
      Object.entries(pair.upstream.group).filter(([key]) => key !== 'rules')
    );
    const cleanedMeta = Object.fromEntries(
      Object.entries(pair.cleaned.group).filter(([key]) => key !== 'rules')
    );
    const metaFields = diffKeys(upstreamMeta, cleanedMeta);
    const rules = compareRules(pair.upstream.rules, pair.cleaned.rules);
    if (metaFields.length) {
      groupMetaChanges.push({
        identity: pair.identity,
        label: groupLabel(pair.upstream),
        fields: metaFields
      });
    }
    if (
      rules.modifiedByKey.length ||
      rules.modifiedUnkeyed.length ||
      rules.upstreamOnly.length ||
      rules.cleanedOnly.length ||
      rules.orderChanged
    ) {
      ruleChanges.push({
        identity: pair.identity,
        label: groupLabel(pair.upstream),
        upstreamPath: pair.upstream.path,
        cleanedPath: pair.cleaned.path,
        ...rules
      });
    }
  }

  const upstreamAudit = inspect(upstreamGroups);
  const cleanedAudit = inspect(cleanedGroups);
  const selectorPairs = upstreamAudit.selectorDuplicates;
  const sameApp = selectorPairs.filter((item) =>
    item.first.group.scope === 'app' &&
    item.candidate.group.scope === 'app' &&
    item.first.group.appId === item.candidate.group.appId
  ).length;
  const crossApp = selectorPairs.filter((item) =>
    item.first.group.scope === 'app' &&
    item.candidate.group.scope === 'app' &&
    item.first.group.appId !== item.candidate.group.appId
  ).length;
  const ruleContextCounts = countFields(selectorPairs, 'ruleDiffKeys');
  const groupContextCounts = countFields(selectorPairs, 'groupDiffKeys');
  const sameContent = stable(upstream) === stable(cleaned);
  const warnings = [];
  if (upstream.version > cleaned.version) {
    warnings.push('清理版版本落后上游 ' + (upstream.version - cleaned.version) + ' 个版本；按要求不自动覆盖。');
  } else if (upstream.version === cleaned.version && !sameContent) {
    warnings.push('上游与清理版版本号相同但内容不同，需要人工确认。');
  }
  if (paired.ambiguous.length) {
    warnings.push('存在规则组身份冲突，相关组未强行配对。');
  }

  const lines = [
    '# GKD 规则审计报告',
    '',
    '- 检查时间：' + generatedAt,
    '- 上游订阅 ID/版本：' + upstream.id + ' / v' + upstream.version,
    '- 清理版订阅 ID/版本：' + cleaned.id + ' / v' + cleaned.version,
    '- 上游候选文件：' + candidatePath,
    '- 比较结果：' + (sameContent ? '上游与清理版 JSON 结构完全一致' : '上游与清理版存在差异'),
    '- 更新策略：校验通过后才写入 upstream.json5；绝不自动覆盖 gkd.json5。',
    '',
    '## 校验结果',
    '',
    '- JSON5 解析：通过',
    '- 上游订阅 ID：' + (upstream.id === EXPECTED_UPSTREAM_ID ? '通过' : '失败'),
    '- 清理版订阅 ID：' + (cleaned.id === EXPECTED_CLEANED_ID ? '通过' : '失败'),
    '- 上游版本号：' + (Number.isInteger(upstream.version) && upstream.version > 0 ? '通过' : '失败'),
    '- 清理版版本号：' + (Number.isInteger(cleaned.version) && cleaned.version > 0 ? '通过' : '失败'),
    '',
    '## 结构统计',
    '',
    '| 指标 | 上游 | 清理版 |',
    '|---|---:|---:|',
    '| 应用数 | ' + (upstream.apps?.length ?? 0) + ' | ' + (cleaned.apps?.length ?? 0) + ' |',
    '| 规则组 | ' + upstreamGroups.length + ' | ' + cleanedGroups.length + ' |',
    '| 规则总数 | ' + upstreamRuleCount + ' | ' + cleanedRuleCount + ' |',
    '| 同组完全重复对象候选 | ' + upstreamAudit.exactDuplicates.filter((item) => item.scope === '同一规则组').length + ' | ' + cleanedAudit.exactDuplicates.filter((item) => item.scope === '同一规则组').length + ' |',
    '| 跨组完全重复对象候选 | ' + upstreamAudit.exactDuplicates.filter((item) => item.scope === '跨规则组').length + ' | ' + cleanedAudit.exactDuplicates.filter((item) => item.scope === '跨规则组').length + ' |',
    '| 同组选择器条件相同候选 | ' + upstreamAudit.selectorDuplicates.filter((item) => item.scope === '同一规则组').length + ' | ' + cleanedAudit.selectorDuplicates.filter((item) => item.scope === '同一规则组').length + ' |',
    '| 跨组选择器条件相同候选 | ' + upstreamAudit.selectorDuplicates.filter((item) => item.scope === '跨规则组').length + ' | ' + cleanedAudit.selectorDuplicates.filter((item) => item.scope === '跨规则组').length + ' |',
    '',
    '## 规则组与规则级差异（按稳定身份匹配）',
    '',
    '规则组优先按应用包名 + group.key 匹配；没有 key 时退回应用包名 + group.name。数组索引仅用于定位，不作为身份。这样可避免新增应用或规则组导致后续索引整体偏移而产生误报。',
    '',
    '- 上游有、清理版缺失的规则组：' + paired.missing.length,
    '- 清理版额外规则组：' + paired.extra.length,
    '- 规则组元数据变化：' + groupMetaChanges.length,
    '- 存在规则内容变化的匹配组：' + ruleChanges.length,
    '- 身份冲突、无法安全配对的组：' + paired.ambiguous.length,
    '',
    ...clip(paired.missing, (item) =>
      '- 上游新增规则组：' + groupLabel(item) + '（' + groupIdentity(item) + '，' + item.rules.length + ' 条规则）'),
    ...clip(paired.extra, (item) =>
      '- 清理版额外规则组：' + groupLabel(item) + '（' + groupIdentity(item) + '）'),
    ...clip(groupMetaChanges, (item) =>
      '- 规则组配置变化：' + item.label + '；字段：' + item.fields.join(', ')),
    ...clip(ruleChanges, (item) => {
      const parts = [];
      for (const rule of item.modifiedByKey) {
        parts.push('key=' + String(rule.key) + ' 字段变化[' + rule.changedFields.join(', ') + ']');
      }
      for (const rule of item.modifiedUnkeyed) {
        parts.push('无 key 规则可能修改，字段变化[' + rule.changedFields.join(', ') + ']');
      }
      if (item.upstreamOnly.length) {
        parts.push('上游独有：' + item.upstreamOnly.map((entry) => ruleSummary(entry.rule)).join('; '));
      }
      if (item.cleanedOnly.length) {
        parts.push('清理版独有：' + item.cleanedOnly.map((entry) => ruleSummary(entry.rule)).join('; '));
      }
      if (item.orderChanged) parts.push('共同 key 的顺序变化');
      return '- 规则变化：' + item.label + '；' + parts.join('；');
    }),
    ...clip(paired.ambiguous, (item) =>
      '- 配对阻塞：' + item.identity + '（存在重复身份，未推断对应关系）'),
    '',
    '## 完全重复规则对象候选',
    '',
    '完整规则对象相同仍不等于可删除；不同应用、不同规则组、组级 enable、Activity、执行顺序和前置规则均可能使其具有不同作用。',
    '',
    ...clip(upstreamAudit.exactDuplicates, (item) =>
      '- [' + item.scope + '] ' + groupLabel(item.first.group) + '：' +
      item.first.path + ' ↔ ' + item.candidate.path +
      '；组上下文差异：' + diffKeys(item.first.group.group, item.candidate.group.group, ['rules']).join(', ')),
    '',
    '## 选择器条件字段完全相同候选',
    '',
    '比较字段：' + selectorKeys.join(', ') + '。签名相同仅表示这些字段的值相同，不代表动作、规则组或实际 UI 行为相同。',
    '',
    '- 上游选择器候选总数：' + selectorPairs.length,
    '- 同一应用包名内候选：' + sameApp,
    '- 不同应用包名之间候选：' + crossApp,
    '- 同一规则组内候选：' + selectorPairs.filter((item) => item.scope === '同一规则组').length,
    '- 跨规则组候选：' + selectorPairs.filter((item) => item.scope === '跨规则组').length,
    '',
    '### 候选对中的规则级上下文差异字段（出现次数）',
    '',
    ...ruleContextCounts.slice(0, 30).map(([key, count]) => '- ' + key + '：' + count),
    '',
    '### 候选对中的规则组级上下文差异字段（出现次数）',
    '',
    ...groupContextCounts.slice(0, 30).map(([key, count]) => '- ' + key + '：' + count),
    '',
    ...clip(selectorPairs, (item) =>
      '- [' + item.scope + '] ' + groupLabel(item.first.group) + '：' +
      item.first.path + ' ↔ ' + item.candidate.path +
      '；规则级差异：' + item.ruleDiffKeys.join(', ') +
      '；组级差异：' + item.groupDiffKeys.join(', ')),
    '',
    '## 行为等价审查与安全结论',
    '',
    '- 逐项核对时必须同时考虑 matches、anyMatches、allMatches、noneMatches、excludeMatches、activityIds、preKeys、matchTime、key。',
    '- 还必须核对 action/actionCd/actionMaximum/resetMatch、priorityTime/forcedTime、order、actionDelay、position、规则组 enable、disableIfAppGroupMatch 及应用包名。',
    '- snapshotUrls、excludeSnapshotUrls、exampleUrls 是理解规则真实 UI 上下文的重要证据；快照相同或缺失都不能单独证明规则冗余。',
    '- 当前静态审计只能定位候选，不能替代设备上的可复现触发测试，也不能证明不同选择器表达式之间的包含、交集或可达性。',
    '- 不确定项一律保留；只有完整上下文与可复现测试均证明行为不变时，才允许人工删除。',
    '- 本轮未自动删除、合并或改写任何规则。'
  ];

  if (warnings.length) {
    lines.splice(6, 0, ...warnings.map((warning) => '- 注意：' + warning));
  }

  const report = lines.join('\n') + '\n';
  fs.mkdirSync('audit', { recursive: true });
  fs.writeFileSync(reportPath, report);
  if (candidatePath !== upstreamPath && candidateText !== existingText) {
    fs.writeFileSync(upstreamPath, candidateText);
  }
  console.log(report);
}

try {
  main();
} catch (error) {
  writeBlockedReport('审计脚本执行异常：' + error.message, [
    '未执行规则删除。',
    '请检查 audit/audit.mjs 和输入文件后重试。'
  ]);
}