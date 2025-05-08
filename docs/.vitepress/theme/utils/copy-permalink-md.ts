// docs/.vitepress/theme/utils/copy-permalink-md.ts

import { promises as fs } from 'fs'
import { join, extname, resolve } from 'path'
import matter from 'gray-matter'
import fg from 'fast-glob'
import path from 'path'

interface CopyPermalinkOptions {
  sourceDir: string
  targetDir: string
}

export default function copyPermalinkMdPlugin(options: CopyPermalinkOptions) {
  return {
    name: 'vitepress-plugin-copy-permalink-md',
    configResolved(config: any) {

      const { sourceDir, targetDir } = options

      copyFiles(sourceDir, targetDir).then(async () => {
        await generateRewrites(sourceDir)
      })

    },
  }
}

async function copyFiles(sourceDir: string, targetDir: string) {
  try {
    await fs.mkdir(targetDir, { recursive: true });
    const files = await readMdFiles(sourceDir);

    for (const file of files) {
      const content = await fs.readFile(file, 'utf-8');
      const { data, content: body } = matter(content);

      if (data.permalink) {
        const match = data.permalink.match(/^\/pages\/([a-z0-9]+)/i);
        if (match && match[1]) {
          const newFileName = `${match[1]}.md`;
          const targetPath = join(targetDir, newFileName);

          // 检查是否已存在目标文件
          try {
            await fs.access(targetPath);
            continue;
          } catch {
            // 文件不存在，继续复制
          }

          // 添加 search: false 到 frontmatter
          const newContent = matter.stringify(body, {
            ...data,
            search: false
          });

          await fs.writeFile(targetPath, newContent);
        }
      }
    }
  } catch (err) {
    console.error('文件复制失败:', err);
  }
}

async function readMdFiles(dir: string): Promise<string[]> {
  let files: string[] = []
  const items = await fs.readdir(dir)

  for (const item of items) {
    const fullPath = join(dir, item)
    const stat = await fs.stat(fullPath)

    if (stat.isDirectory()) {
      files = [...files, ...(await readMdFiles(fullPath))]
    } else if (extname(item).toLowerCase() === '.md') {
      files.push(fullPath)
    }
  }

  return files
}

async function generateRewrites(targetDir: string) {
  try {
    const rewrites = {};
    const pages = await fg(['**/*.md'], {
      cwd: targetDir,
      ignore: ['node_modules/**', '.vitepress/**', "pages/**"]
    });

    for (const page of pages) {
      const fullPath = join(targetDir, page);
      const file = matter.read(fullPath);
      const permalink = file.data?.permalink;

      if (permalink) {
        // 将相对路径转为 URL 风格
        const relativePath = path.relative(process.cwd(), fullPath).replace(/\\/g, '/');
        rewrites[relativePath] = permalink;
      }
    }

    const rewriteFilePath = resolve(__dirname, '../../rewrites.json');

    await fs.writeFile(rewriteFilePath, JSON.stringify(rewrites, null, 2), 'utf-8');
    console.log(`✅ rewrites.json 生成成功 → ${rewriteFilePath}`);
  } catch (err) {
    console.error('生成 rewrites.json 失败:', err);
  }
}

