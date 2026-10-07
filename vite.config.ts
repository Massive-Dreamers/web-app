import { copyFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages has no server-side rewrite: a direct hit on /games serves 404.html.
// Shipping a copy of index.html there lets BrowserRouter resolve the route client-side.
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
    closeBundle() {
      const dir = path.resolve(root, outDir)
      copyFileSync(path.join(dir, 'index.html'), path.join(dir, '404.html'))

      // /links is printed on a QR code, so it gets a real file and a 200 response
      // instead of relying on the 404 fallback like the other routes.
      mkdirSync(path.join(dir, 'links'), { recursive: true })
      copyFileSync(path.join(dir, 'index.html'), path.join(dir, 'links', 'index.html'))
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
