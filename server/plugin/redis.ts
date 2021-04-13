// 引入reids
'use strict'
import ioredis from 'ioredis'
import { redisConfig, nodeEnv } from '../config'
class Redis extends ioredis {}
const client = (() => {
  let client
  try {
    client = new Redis(redisConfig)
  } catch (err) {
    console.log('new Redis(redisConfig) 出错了', err)
  }
  return client
})()
export default client
