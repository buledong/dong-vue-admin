import { parseReq } from '../utils'
const midd = (req, res, next) => {
  try {
    const isIE = parseReq.isIE11(req)
    const lowEdge = parseReq.lowVerEdge(req)

    if (parseReq.isHtmlQuery(req) && (isIE || lowEdge)) {
      // 请求的是html, 在这里判断, 如果是 IE11 或低版本edge 重定向
      // (只需要处理IE11, 因为新版不支持IE11, 但是如果低于IE11的会被重定向到)

      // 是ie11, 需要重定向
      res.end('')
      return
    }
    next()
  } catch (err) {
    console.log('ie11 判断 中间件出错了', err)

    next()
  }
}

export default midd
