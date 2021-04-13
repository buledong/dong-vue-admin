const test = (app) => {
  app.use('/home/test/redis', async (req, res) => {
    try {
      const redis = await req.redis.get('redis')

      if (typeof redis === 'string') {
        await req.redis.set('redis', +redis + 1)
        res.end('redis ===      >' + redis)
      } else {
        await req.redis.set('redis', 1)
        res.end('redis ===>', redis)
      }
    } catch (err) {
      res.end(err.msg + err.stack)
    }
  })
}
export { test }
