const nodeEnv = process.env.NODE_ENV
const isProd = nodeEnv === 'production'
const isUat = nodeEnv === 'uat'
const isDev = nodeEnv === 'development'
import redisConfigAll from './redisConfig'
let port,
  indexProd,
  manifest,
  DistClientPath,
  DistServerPath,
  resolve,
  middlewares,
  getTemplate,
  getRender
const redisConfig = redisConfigAll[nodeEnv] || redisConfigAll['default']
console.log('redisConfig 配置是===>', redisConfig, '环境是===>', nodeEnv)

const baseConfig = require('./base.config')
const config =
  isProd || isUat ? require('./prod.config') : require('./dev.config')
const allConfig = Object.assign({}, baseConfig, config)
;({
  port,
  indexProd,
  manifest,
  DistClientPath,
  DistServerPath,
  resolve,
  middlewares,
  getTemplate,
  getRender,
} = allConfig)

export {
  redisConfig,
  isProd,
  isUat,
  isDev,
  nodeEnv,
  port,
  indexProd,
  manifest,
  DistClientPath,
  DistServerPath,
  resolve,
  middlewares,
  getTemplate,
  getRender,
}
