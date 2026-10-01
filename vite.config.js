import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Serves api/chat.js locally so `npm run dev` matches production behaviour.
// In production these functions run on the host (Vercel, Netlify) instead.
function apiDevServer() {
  return {
    name: 'api-dev-server',
    apply: 'serve',
    async configureServer(server) {
      const env = loadEnv('development', server.config.root, '')
      const handler = (await server.ssrLoadModule('/api/chat.js')).default
      server.middlewares.use('/api/chat', async (req, res) => {
        const chunks = []
        for await (const chunk of req) chunks.push(chunk)
        let body = {}
        try {
          body = chunks.length ? JSON.parse(Buffer.concat(chunks).toString('utf8')) : {}
        } catch {
          res.statusCode = 400
          res.end(JSON.stringify({ error: 'Invalid JSON body' }))
          return
        }

        Object.assign(process.env, env)

        const shim = {
          statusCode: 200,
          headers: {},
          setHeader(name, value) {
            this.headers[name] = value
            res.setHeader(name, value)
          },
          status(code) {
            this.statusCode = code
            res.statusCode = code
            return this
          },
          json(payload) {
            if (!res.hasHeader('Content-Type')) res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(payload))
            return this
          },
          end() {
            res.end()
            return this
          },
        }

        try {
          await handler({ method: req.method, body }, shim)
        } catch (error) {
          server.config.logger.error(String(error))
          if (!res.writableEnded) {
            res.statusCode = 500
            res.end(JSON.stringify({ error: 'Assistant unavailable' }))
          }
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), apiDevServer()],
})
