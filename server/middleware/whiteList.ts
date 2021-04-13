const midd = (req, res, next) => {
  try {
    return next()
  } catch (err) {
    console.log('白名单中间件 中间件出错了', err)

    next()
  }
}

export default midd
