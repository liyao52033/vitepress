import fs from "fs";
import path from "path";
import chalk from "chalk";

const EXISTING_PERMALINKS = new Set();

const DEFAULT_AUTHOR = {
  name: "华总",
  link: "https://xiaoying.org.cn/"
};


// 生成 6 位随机字母数字字符串
function generateRandomId() {
  return (Math.random() + Math.random()).toString(16).slice(2, 8)
}


// 生成唯一的 permalink
function generateUniquePermalink() {
  let id;
  do {
    id = generateRandomId();
  } while (EXISTING_PERMALINKS.has(id));
  EXISTING_PERMALINKS.add(id);
  return `/pages/${id}/`;
}

// 解析已有文件，避免 permalink 重复
function loadExistingPermalinks(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      loadExistingPermalinks(filePath); // 递归处理子目录
    } else if (file.endsWith(".md")) {
      const content = fs.readFileSync(filePath, "utf-8");
      const match = content.match(/permalink:\s*(\/pages\/\w{6}\/)/);
      if (match) {
        EXISTING_PERMALINKS.add(match[1].replace("/pages/", "").replace("/", ""));
      }
    }
  });
}

// 递归处理 Markdown 文件
export default function processMarkdownFiles(dir) {

  loadExistingPermalinks(dir);

  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      processMarkdownFiles(filePath); // 递归处理子目录
      return;
    }

    if (!file.endsWith(".md")) return; // 只处理 Markdown 文件

    let content = fs.readFileSync(filePath, "utf-8");

    let hasPermalink = /permalink:\s*(\/pages\/\w{6}\/)/.test(content);
   // let hasDate = /date:\s*(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})/.test(content);
    let hasAuthor = /author:\s*\n\s*name:\s*(.+)\n\s*link:\s*(.+)/.test(content);

    if (hasPermalink && hasAuthor) {
      console.log(chalk.green(`文件 ${filePath} 已经包含所有 Front Matter 字段，跳过`));
      return;
    }

    const permalink = hasPermalink ? content.match(/permalink:\s*(\/pages\/\w{6}\/)/)[1] : generateUniquePermalink();
    const authorName = hasAuthor ? content.match(/name:\s*(.+)/)[1] : DEFAULT_AUTHOR.name;
    const authorLink = hasAuthor ? content.match(/link:\s*(.+)/)[1] : DEFAULT_AUTHOR.link;

    const frontMatter = `---\npermalink: ${permalink}\nauthor:\n  name: ${authorName}\n  link: ${authorLink}\n---\n\n`;

    fs.writeFileSync(filePath, frontMatter + content, "utf-8");
    console.log(chalk.green(`已更新 ${filePath}`));
  });
}


