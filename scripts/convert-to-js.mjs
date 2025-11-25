import fs from "node:fs/promises";
import path from "node:path";
import ts from "typescript";

const rootDir = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
const SKIP_DIRS = new Set(["node_modules", ".git", "dist"]);

const collected = [];

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    if (SKIP_DIRS.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath);
    } else {
      collected.push(fullPath);
    }
  }
}

await walk(rootDir);

const convertableExts = new Set([".ts", ".tsx"]);

for (const filePath of collected) {
  if (filePath.endsWith(".d.ts")) {
    await fs.unlink(filePath);
    continue;
  }

  const ext = path.extname(filePath);
  if (!convertableExts.has(ext)) continue;

  const source = await fs.readFile(filePath, "utf8");
  const compilerOptions = {
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.ESNext,
    jsx: ext === ".tsx" ? ts.JsxEmit.Preserve : undefined,
    useDefineForClassFields: true,
    importsNotUsedAsValues: ts.ImportsNotUsedAsValues.Preserve,
  };

  const { outputText } = ts.transpileModule(source, { compilerOptions });
  const newExt = ext === ".tsx" ? ".jsx" : ".js";
  const newPath = path.join(path.dirname(filePath), path.basename(filePath, ext) + newExt);

  await fs.writeFile(newPath, outputText, "utf8");
  await fs.unlink(filePath);
}

