import fs from 'node:fs';
import JSON5 from 'json5';

const upstream = JSON5.parse(fs.readFileSync('upstream.json5', 'utf8'));
const cleaned = JSON5.parse(fs.readFileSync('gkd.json5', 'utf8'));
const stable = (v) => Array.isArray(v)
  ? '[' + v.map(stable).join(',') + ']'
  : v && typeof v === 'object'
    ? '{' + Object.keys(v).sort().map(k => JSON.stringify(k) + ':' + stable(v[k])).join(',') + '}'
    : JSON.stringify(v);

function inspect(root) {
  const stats = { groups: 0, rules: 0, exactDuplicateRuleCandidates: 0 };
  const walk = (value) => {
    if (!value || typeof value !== 'object') return;
    if (Array.isArray(value)) { value.forEach(walk); return; }
    if (Array.isArray(value.rules)) {
      stats.groups++;
      stats.rules += value.rules.length;
      const seen = new Set();
      for (const rule of value.rules) {
        const key = stable(rule);
        if (seen.has(key)) stats.exactDuplicateRuleCandidates++;
        else seen.add(key);
      }
    }
    for (const [key, child] of Object.entries(value)) if (key !== 'rules') walk(child);
  };
  walk(root);
  return stats;
}

const up = inspect(upstream);
const cl = inspect(cleaned);
const report = [
  '# GKD 订阅结构审计', '',
  '- 审计方式：JSON5 解析 + 规则组/规则数量统计 + 同一规则组内完全相同规则对象候选检测。',
  '- 安全策略：只报告候选，不自动删除。完全相同的规则文本也需要结合应用、上下文和执行顺序确认。',
  '- 上游版本：' + String(upstream.version ?? '未知'),
  '- 上游订阅 ID：' + String(upstream.id ?? '未知'), '',
  '| 指标 | upstream.json5 | gkd.json5 |',
  '|---|---:|---:|',
  '| 规则组 | ' + up.groups + ' | ' + cl.groups + ' |',
  '| 规则数 | ' + up.rules + ' | ' + cl.rules + ' |',
  '| 组内完全重复规则候选 | ' + up.exactDuplicateRuleCandidates + ' | ' + cl.exactDuplicateRuleCandidates + ' |', '',
  '## 结论',
  up.groups === cl.groups && up.rules === cl.rules && stable(upstream) === stable(cleaned)
    ? '当前清理版与上游结构完全一致；尚未执行规则删除。'
    : '清理版与上游存在结构差异。差异不自动等于冗余清理，需逐项审阅。',
  '',
  '本报告不判断选择器在真实设备上的可达性，也不证明候选规则可安全删除。'
].join('\n');
fs.mkdirSync('audit', { recursive: true });
fs.writeFileSync('audit/REPORT.md', report + '\n');
console.log(report);
