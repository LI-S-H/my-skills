#!/usr/bin/env node
const { spawnSync } = require('node:child_process');
const path = require('node:path');

const args = process.argv.slice(2);
const has = flag => args.includes(flag);
const valueOf = (name, fallback = '') => {
  const hit = args.find(arg => arg.startsWith(`${name}=`));
  return hit ? hit.slice(name.length + 1) : fallback;
};
const scriptArgv = script => {
  const parts = script.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return null;
  return ['run', ...parts];
};

if (has('--help')) {
  console.log([
    '用法：',
    '  node <frontend-code-audit>/scripts/run-frontend-gate.cjs --app-dir=web --contract=check:api --test=test --smoke=smoke:users,smoke:orders',
    '',
    '参数：',
    '  --app-dir=dir       前端应用目录，默认当前目录',
    '  --preflight=name    检查前先运行的 npm script；带参数时请加引号',
    '  --contract=name     API/schema/契约检查脚本',
    '  --build=name        构建脚本，默认 build',
    '  --test=a,b          要运行的测试脚本',
    '  --smoke=a,b         要运行的 smoke 脚本',
    '  --skip-build        跳过 npm run build',
    '  --dry-run           只打印命令，不执行',
  ].join('\n'));
  process.exit(0);
}

const appDir = path.resolve(process.cwd(), valueOf('--app-dir', '.'));
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const preflight = valueOf('--preflight', '');
const contract = valueOf('--contract', '');
const build = valueOf('--build', 'build');
const tests = valueOf('--test', '').split(',').filter(Boolean);
const smoke = valueOf('--smoke', '').split(',').filter(Boolean);
const dryRun = has('--dry-run');
const commands = [];

if (preflight) commands.push([preflight, scriptArgv(preflight)]);
if (contract) commands.push([contract, scriptArgv(contract)]);
if (!has('--skip-build') && build) commands.push([build, scriptArgv(build)]);
for (const script of tests) commands.push([script, scriptArgv(script)]);
for (const script of smoke) commands.push([script, scriptArgv(script)]);

for (const [label, argv] of commands) {
  if (!argv) continue;
  const printable = `cd ${path.relative(process.cwd(), appDir) || '.'} && ${npm} ${argv.join(' ')}`;
  if (dryRun) {
    console.log(printable);
    continue;
  }
  console.log(`\n[frontend-gate] ${label}: ${printable}`);
  const result = spawnSync(npm, argv, { cwd: appDir, stdio: 'inherit', shell: false });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
