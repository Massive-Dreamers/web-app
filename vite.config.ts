import { copyFileSync } from 'node:fs'
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
