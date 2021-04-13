import * as fs from 'fs'
import { resolve, DistClientPath, middlewares, StaticPath } from './base.config'
const port = 8088
const indexProd = fs.readFileSync(
  resolve(DistClientPath + '/home/index.html'),
  'utf-8'
)

const manifest = require(resolve(DistClientPath + '/home/ssr-manifest.json'))
const middlewaresProp = [
  ...middlewares,
  require('compression')(),
  require('serve-static')(resolve(StaticPath), {
    index: false,
  }),
]
const getTemplate = async (url?: string) => {
  return fs.readFileSync(resolve('dist/client/home/index.html'), 'utf-8')
}
const getRender = async () => {
  return require(resolve('./dist/server/entry-server.js')).render
}

export {
  port,
  indexProd,
  manifest,
  middlewaresProp as middlewares,
  getTemplate,
  getRender,
}
