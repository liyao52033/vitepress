import fs from 'fs/promises'
import fg from 'fast-glob'
import matter from 'gray-matter'
import path from 'path'

async function generateRewrites() {
    const rewrites = {}
    const pages = await fg('**/*.md', {
        ignore: ['node_modules/**', '.vitepress/**', "pages/**"]
    })

    for (const absPagePath of pages) {
        const file = matter.read(absPagePath)
        const permalink = file.data?.permalink

        if (permalink) {
            const relativePath = path.relative(process.cwd(), absPagePath).replace(/\\/g, '/')
            rewrites[relativePath] = permalink
        }
    }

    return rewrites
}

async function main() {
    const rewrites = await generateRewrites()
    await fs.writeFile('docs/rewrites.json', JSON.stringify(rewrites, null, 2), 'utf-8')
    console.log('✅ rewrites.json 生成成功')
}

main().then(r => {})
