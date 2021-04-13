const path = require('path')
const rootPath = process.cwd() // 项目根目录
const resolve = (p) => path.resolve(rootPath, p)
const DistClientPath = './dist/client'
const DistServerPath = './dist/server'
const StaticPath = 'dist/client'
import { middlewares } from '../middleware'
export {
  rootPath,
  resolve,
  DistClientPath,
  DistServerPath,
  StaticPath,
  middlewares,
}
