import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { defineConfig, runnerImport, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

const SITE_URL = 'https://massivedreamers.com'
const DEFAULT_IMAGE = '/og/default.jpg'

interface PageMeta {
  path: string
  title: string
  description: string
  image?: string
  type?: 'website' | 'article'
}

// Social sites (Facebook, X, LinkedIn, Telegram...) don't run JavaScript, so link
// previews only see the static HTML. Each route below gets its own HTML file with
// its own title, description and image.
const PAGES: PageMeta[] = [
  {
    path: '/',
    title: 'Massive Dreamers | Independent Game Studio',
    description:
      'Massive Dreamers is an independent game studio making Mind Your Stay, a noir narrative RPG coming to PC in 2027.',
  },
  {
    path: '/games',
    title: 'Games | Massive Dreamers',
    description:
      'Small, dense, handcrafted games. One in development, two in planning, all built for players who remember the games they finish.',
  },
  {
    path: '/mind-your-stay',
    title: 'Mind Your Stay | Massive Dreamers',
    description:
      'A noir management adventure inside Hotel Safe Haven during an escalating revolution. Talk to guests, weigh moral tradeoffs, and see who you are when the corridors get quiet.',
    image: '/og/mind-your-stay.jpg',
  },
  {
    path: '/news',
    title: 'News | Massive Dreamers',
    description:
      'Development writing, announcements, and design diaries from Massive Dreamers.',
  },
  {
    path: '/about',
    title: 'About | Massive Dreamers',
    description:
      'We build worlds not to be completed, but to be felt and remembered. Meet the team behind Massive Dreamers.',
  },
  {
    path: '/contact',
    title: 'Contact | Massive Dreamers',
    description: 'Press, publishing, playtesting, or a note. We read everything.',
  },
  {
    path: '/links',
    title: 'Mind Your Stay | Links',
    description:
      'A noir narrative RPG inside Hotel Safe Haven, during an escalating revolution. Wishlist on Steam and follow the studio.',
    image: '/og/mind-your-stay.jpg',
  },
]

interface DispatchMeta {
  id: string
  title: string
  excerpt: string
  ogImage?: string
}

async function loadArticlePages(root: string): Promise<PageMeta[]> {
  try {
    // configFile: false so this doesn't load vite.config.ts again.
    const { module } = await runnerImport<{ dispatches: DispatchMeta[] }>(
      path.join(root, 'src/data/dispatches.ts'),
      { root, configFile: false, logLevel: 'silent' },
    )
    return module.dispatches.map((d) => ({
      path: `/news/${d.id}`,
      title: `${d.title} | Massive Dreamers`,
      description: d.excerpt,
      image: d.ogImage,
      type: 'article',
    }))
  } catch (err) {
    // A broken preview shouldn't break the deploy: articles fall back to the default tags.
    console.warn('[seo] could not load articles for link previews:', err)
    return []
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function seoTags(page: PageMeta) {
  const title = escapeHtml(page.title)
  const description = escapeHtml(page.description)
  const url = `${SITE_URL}${page.path === '/' ? '/' : `${page.path}/`}`
  const image = `${SITE_URL}${page.image ?? DEFAULT_IMAGE}`

  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<meta property="og:type" content="${page.type ?? 'website'}" />`,
    `<meta property="og:site_name" content="Massive Dreamers" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  ].join('\n    ')
}

const SEO_BLOCK = /<!--seo:start-->[\s\S]*?<!--seo:end-->/

// GitHub Pages has no server-side rewrite: a direct hit on /games serves 404.html.
// Shipping a copy of index.html there lets BrowserRouter resolve the route client-side.
// Every known route also gets a real file (so it answers 200, which link-preview
// crawlers require) with its own preview tags.
function spaFallback(): Plugin {
  let root = process.cwd()
  let outDir = 'dist'

  return {
    name: 'spa-404-fallback',
    apply: 'build',
    configResolved(config) {
      root = config.root
      outDir = config.build.outDir
    },
    async closeBundle() {
      const dir = path.resolve(root, outDir)
      const indexPath = path.join(dir, 'index.html')
      copyFileSync(indexPath, path.join(dir, '404.html'))

      const template = readFileSync(indexPath, 'utf8')
      if (!SEO_BLOCK.test(template)) {
        console.warn('[seo] <!--seo:start--> marker missing from index.html; skipping page tags')
        return
      }

      const pages = [...PAGES, ...(await loadArticlePages(root))]
      for (const page of pages) {
        const html = template.replace(SEO_BLOCK, () => `<!--seo:start-->\n    ${seoTags(page)}\n    <!--seo:end-->`)
        const pageDir = path.join(dir, page.path)
        mkdirSync(pageDir, { recursive: true })
        writeFileSync(path.join(pageDir, 'index.html'), html)
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), spaFallback()],
  server: {
    host: '::',
    port: 5173,
    strictPort: true,
  },
})
