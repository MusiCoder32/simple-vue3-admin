#!/usr/bin/env node
/**
 * 根据 export-structure.js 导出的 JSON 重建项目结构与文件内容。
 *
 * 用法：
 *   node reconstruct-structure.js <structure_json> <destination_root> [--overwrite] [--skip-symlinks] [--no-root-dir]
 *
 * 参数说明：
 *   --overwrite      已存在同名文件时覆盖写入（默认不覆盖）
 *   --skip-symlinks  跳过创建符号链接（默认尝试创建）
 *   --no-root-dir    不再额外创建最外层根目录；直接在目标目录下展开 children
 *
 * 说明：
 * - 文件节点如包含 node.content（utf8 文本），将写入内容；否则创建空文件。
 * - 若 node.truncated === true，表示导出时内容被截断，仅能恢复已导出的部分。
 */

const fs = require('fs');
const path = require('path');

function parseArgs(argv) {
  const args = argv.slice(2);
  if (args.length < 2) {
    console.error('Usage: node reconstruct-structure.js <structure_json> <destination_root> [--overwrite] [--skip-symlinks] [--no-root-dir]');
    process.exit(1);
  }
  const jsonFile = path.resolve(args[0]);
  const destRoot = path.resolve(args[1]);
  const overwrite = args.includes('--overwrite');
  const skipSymlinks = args.includes('--skip-symlinks');
  const noRootDir = args.includes('--no-root-dir');
  return { jsonFile, destRoot, overwrite, skipSymlinks, noRootDir };
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  const e = String(enc).toLowerCase();
  return e === 'utf-8' ? 'utf8' : e;
}

function writeFile(target, content, { overwrite, encoding }) {
  if (fs.existsSync(target) && !overwrite) {
    // 不覆盖则跳过
    return;
  }
  // 确保父目录存在
  ensureDir(path.dirname(target));
  fs.writeFileSync(target, content, { encoding });
}

function touchFile(target, { overwrite }) {
  if (fs.existsSync(target) && !overwrite) return;
  ensureDir(path.dirname(target));
  fs.writeFileSync(target, '');
}

function createSymlink(targetPath, linkPath) {
  try {
    // 直接尝试创建符号链接；在 Windows 上可能需要管理员权限或开发者模式

    fs.symlinkSync(targetPath, linkPath);
  } catch (err) {
    // 回退：如果是已存在则忽略；其它错误给出信息
    if (err.code !== 'EEXIST') {
      console.warn(`[WARN] Failed to create symlink '${linkPath}' -> '${targetPath}': ${err.message}`);
    }
  }
}

/**
 * 递归重建
 * @param {object} node 结构 JSON 的节点
 * @param {string} base 展开到的父级绝对路径
 * @param {object} opts { overwrite:boolean, skipSymlinks:boolean }
 */
function restoreNode(node, base, opts) {
  const name = node && node.name;
  const type = node && node.type;
  if (!name || !type) {
    console.warn('[WARN] Invalid node (missing name or type), skipped:', node);
    return;
  }
  const dest = path.join(base, name);

  if (type === 'directory') {
    ensureDir(dest);
    const children = Array.isArray(node.children) ? node.children : [];
    for (const child of children) {
      restoreNode(child, dest, opts);
    }
    return;
  }

  if (type === 'file') {
    if (typeof node.content === 'string') {
      const encoding = normalizeEncoding(node.encoding || 'utf8');
      writeFile(dest, node.content, { overwrite: opts.overwrite, encoding });
      if (node.truncated) {
        console.warn(`[WARN] File restored with truncated content: ${path.relative(process.cwd(), dest)}`);
      }
    } else {
      touchFile(dest, { overwrite: opts.overwrite });
    }
    return;
  }

  if (type === 'symlink') {
    if (opts.skipSymlinks) return;
    const target = node.target;
    if (!target) {
      console.warn(`[WARN] Symlink node without target: ${name}, skipped`);
      return;
    }
    // 确保父目录
    ensureDir(path.dirname(dest));
    createSymlink(target, dest);
    return;
  }

  console.warn(`[WARN] Unknown node type '${type}' for: ${name}`);
}

function main() {
  const { jsonFile, destRoot, overwrite, skipSymlinks, noRootDir } = parseArgs(process.argv);

  if (!fs.existsSync(jsonFile)) {
    console.error(`Error: JSON file '${jsonFile}' not found.`);
    process.exit(2);
  }

  const raw = fs.readFileSync(jsonFile, 'utf8');
  let tree;
  try {
    tree = JSON.parse(raw);
  } catch (e) {
    console.error(`Error: invalid JSON - ${e.message}`);
    process.exit(3);
  }

  // 创建目标根目录
  ensureDir(destRoot);

  // 决定展开的根目录
  let mountPoint = destRoot;
  if (!noRootDir) {
    const rootName = tree.name || 'root';
    mountPoint = path.join(destRoot, rootName);
  }
  ensureDir(mountPoint);

  // 如果根是目录，展开其 children；若根是文件，也允许直接恢复为文件
  if (tree.type === 'directory') {
    const children = Array.isArray(tree.children) ? tree.children : [];
    for (const child of children) {
      restoreNode(child, mountPoint, { overwrite, skipSymlinks });
    }
  } else {
    // 根是文件或符号链接
    restoreNode(tree, mountPoint, { overwrite, skipSymlinks });
  }

  console.log('Reconstruction finished.');
  console.log(`- destination: ${mountPoint}`);
  console.log(`- overwrite: ${overwrite ? 'yes' : 'no'}`);
  console.log(`- symlinks: ${skipSymlinks ? 'skipped' : 'created if present'}`);
  console.log(`- root dir mode: ${noRootDir ? 'flatten (no root folder)' : 'with root folder'}`);
}

if (require.main === module) {
  main();
}