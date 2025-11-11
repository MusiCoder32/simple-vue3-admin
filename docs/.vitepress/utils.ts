import type { DefaultTheme, PageData, TransformPageContext } from 'vitepress'
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const isMdFile = (filename) => path.extname(filename) === '.md'

export function getDocsFrontmatter(filePath: string): string {
    const matterResult = matter(fs.readFileSync(filePath, 'utf8'))
    return matterResult.data
}

export function createNav(lang: string, conf: [string, string][]): DefaultTheme.NavItem[] {
    const docsRootPath = path.resolve(import.meta.dirname, '..', lang)
    return conf.map(([text, dir]) => {
        const dirPath = path.resolve(docsRootPath, dir)
        const mdFiles = fs.readdirSync(path.resolve(docsRootPath, dir)).filter((file) => isMdFile(file))

        const items = mdFiles.map((fileName) => {
            const fullPath = path.resolve(dirPath, fileName)
            const fileBaseName = path.basename(fileName, '.md')
            const { title, sort } = getDocsFrontmatter(fullPath)
            return {
                link: fileBaseName,
                text: title || fileBaseName,
                sort,
                items: [],
            }
        }).sort((a, b) => a.sort - b.sort)

        let link = `${dir}/${path.basename(items[0].link)}`
        
        if (lang !== 'zh-cn') {
            link = `${lang}/${link}`
        }
        return {
            text,
            activeMatch: `/${dir}/`,
            link,
        }
    })
}

export function createSideBar(lang: string, conf: [string, string][]): DefaultTheme.SidebarItem[] {
    const docsRootPath = path.resolve(import.meta.dirname, '..', lang)
    return conf.map(([text, dir]) => {
        const dirPath = path.resolve(docsRootPath, dir)
        const mdFiles = fs.readdirSync(dirPath).filter((file) => isMdFile(file))
        const items = mdFiles.map((fileName) => {
            const fullPath = path.resolve(dirPath, fileName)
            const fileBaseName = path.basename(fileName, '.md')
            const { title, sort } = getDocsFrontmatter(fullPath)
            return {
                link: fileBaseName,
                text: title || fileBaseName,
                sort,
                items: [],
            }
        })
        let base = `${dir}/`
        if (lang !== 'zh-cn') {
            base = `${lang}/${base}`
        }
        return {
            text,
            items: items.sort((a, b) => a.sort - b.sort),
            base,
            // link: items[0]?.link,
        }
    })
}

export function injectPreAndNextLink(pageData: PageData, ctx: TransformPageContext): PageData {
    if (pageData.frontmatter.layout === 'home') return pageData

    const lang = pageData.filePath.match(/^[^/]+/)![0]
    const locales = ctx.siteConfig.userConfig.locales
    const localeConf = locales![lang!] ?? locales!.root
    const sidebar = localeConf.themeConfig!.sidebar

    if (!Array.isArray(sidebar)) return pageData

    // TODO: support n-level sidebar
    const flatMapSidebar = (sidebar) =>
        sidebar.flatMap((conf) => {
            return conf.items.map((item) => ({ ...item, link: conf.base + item.link }))
        })
    const allSides = flatMapSidebar(sidebar)
    const finallyFilePath = ctx.siteConfig.rewrites.map[pageData.filePath] ?? pageData.filePath
    const index = allSides.findIndex((side) => `${side.link}.md` === finallyFilePath)

    if (pageData.frontmatter.prev === undefined) {
        const pre = allSides[index - 1]

        pageData.frontmatter.prev = pre
            ? {
                  text: pre.text,
                  link: pre.link,
              }
            : false
    }

    if (pageData.frontmatter.next === undefined) {
        const next = allSides[index + 1]
        pageData.frontmatter.next = next
            ? {
                  text: next.text,
                  link: next.link,
              }
            : false
    }

    return pageData
}
