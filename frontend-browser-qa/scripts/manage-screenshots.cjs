#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');

const args = process.argv.slice(2);
const command = args[0];

function valueOf(name, fallback = '') {
  const hit = args.find(arg => arg.startsWith(`${name}=`));
  return hit ? hit.slice(name.length + 1) : fallback;
}

function has(flag) {
  return args.includes(flag);
}

function slugify(input) {
  return String(input || 'frontend-qa')
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'frontend-qa';
}

function timestamp() {
  const now = new Date();
  const pad = value => String(value).padStart(2, '0');
  return [
    now.getFullYear(),
    pad(now.getMonth() + 1),
    pad(now.getDate()),
    `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`,
  ].join('-');
}

function usage() {
  console.log([
    '用法：',
    '  node <frontend-browser-qa>/scripts/manage-screenshots.cjs create --name=feature-name',
    '  node <frontend-browser-qa>/scripts/manage-screenshots.cjs list',
    '  node <frontend-browser-qa>/scripts/manage-screenshots.cjs cleanup --approved --run-dir=qa-artifacts/browser/<run>',
    '',
    '说明：',
    '  create 会输出本次浏览器 QA 应使用的截图目录。',
    '  cleanup 必须带 --approved，避免用户确认前误删证据。',
  ].join('\n'));
}

const root = process.cwd();
const baseDir = path.join(root, 'qa-artifacts', 'browser');

if (!command || has('--help')) {
  usage();
  process.exit(command ? 0 : 1);
}

if (command === 'create') {
  const name = slugify(valueOf('--name', 'frontend-qa'));
  const runDir = path.join(baseDir, `${timestamp()}-${name}`);
  fs.mkdirSync(runDir, { recursive: true });
  console.log(runDir);
  process.exit(0);
}

if (command === 'list') {
  if (!fs.existsSync(baseDir)) {
    console.log('未找到浏览器 QA 截图目录。');
    process.exit(0);
  }
  for (const entry of fs.readdirSync(baseDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const dir = path.join(baseDir, entry.name);
    const files = fs.readdirSync(dir).filter(file => /\.(png|jpg|jpeg|webp)$/i.test(file));
    console.log(`${dir} (${files.length} image${files.length === 1 ? '' : 's'})`);
  }
  process.exit(0);
}

if (command === 'cleanup') {
  if (!has('--approved')) {
    console.error('拒绝清理：缺少 --approved。只有用户确认后才能清理截图。');
    process.exit(1);
  }
  const runDirArg = valueOf('--run-dir');
  if (!runDirArg) {
    console.error('缺少 --run-dir=qa-artifacts/browser/<run>');
    process.exit(1);
  }
  const target = path.resolve(root, runDirArg);
  const resolvedBase = path.resolve(baseDir);
  if (!target.startsWith(resolvedBase + path.sep)) {
    console.error(`拒绝清理 ${resolvedBase} 之外的目录：${target}`);
    process.exit(1);
  }
  if (!fs.existsSync(target)) {
    console.log(`无需清理，目录不存在：${target}`);
    process.exit(0);
  }
  fs.rmSync(target, { recursive: true, force: true });
  console.log(`已删除 ${target}`);
  process.exit(0);
}

console.error(`未知命令：${command}`);
usage();
process.exit(1);
