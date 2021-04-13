const port = 80
const indexProd = ''
import * as fs from 'fs'
const manifest = {}
import { resolve, rootPath, middlewares } from './base.config'
const vite = require('vite')

const viteServer = vite.createServer({
  root: rootPath,
  // todo isTest
  logLevel: 'error',
  server: {
    middlewareMode: true,
    port,
  },
})
const viteMidd = new Promise(async (res, rej) => {
  const mid = await viteServer
  res(mid.middlewares)
})
const middlewaresDev = [...middlewares, viteMidd]

const getTemplate = async (url?: string) => {
  let template = fs.readFileSync(resolve('./index.html'), 'utf-8')
  const viteInstance = await viteServer
  template = await viteInstance.transformIndexHtml(url, template)

  return template
}
const getRender = async () => {
  const viteInstance = await viteServer
  const result = await viteInstance.ssrLoadModule(
    resolve('./src/entry-server.js')
  )
  return result.render
}

export {
  port,
  indexProd,
  manifest,
  middlewaresDev as middlewares,
  getTemplate,
  getRender,
}
