import { redis } from '../plugin'
const midd = (req, res, next) => {
  try {
    if (!req.redis && redis) {
      req.redis = redis
    }
    next()
  } catch (err) {
    console.log('redis  中间件出错了', err)
    next()
  }
}

export default midd
