const health = (app) => {
  app.use('/home/health', async (req, res) => {
    res.status(200).set({ 'Content-Type': 'text/html' }).end('hi, i am health')
  })
}
export { health }
