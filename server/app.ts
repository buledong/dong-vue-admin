const express = require('express')

import {
  manifest,
  port,
  middlewares,
  getTemplate,
  getRender,
  isDev,
  isProd,
} from './config'
import { router } from './router'

async function _createServer() {
  const app = express()
  /**
   * @type {import('vite').ViteDevServer}
   */

  // 注册中间件
  await Promise.all(
    middlewares.map(async (middleware) => {
      const midd = await middleware
      app.use(midd)
    })
  ).catch((err) => {
    console.log(err, '注册中间件失败')
  })

  // 注册路由
  router(app)
  // 兜底路由
  app.use('*', async (req, res) => {
    let html, FENICE

    const getTemplateFromRedis = async (url, type) => {
      try {
        const redisKey = type + url

        const template = await req.redis.get(redisKey)
        return template
      } catch {
        return null
      }
    }
    const getSSRTemplate = async (template, url) => {
      try {
        const render = await getRender()
        const [appHtml, preloadLinks] = await render(url, manifest)
        const regHtml = /(\s|\n)*<!--app-html-->(\s|\n)*/
        const regPreload = /(\s|\n)*<!--preload-links-->(\s|\n)*/
        const html =
          `<script>window.FENICE = ${JSON.stringify(FENICE)}</script>` +
          template.replace(regPreload, preloadLinks).replace(regHtml, appHtml)
        return html
      } catch {
        return null
      }
    }
    const getCsrTemplate = async (template) => {
      try {
        const html =
          `<script>window.FENICE = ${JSON.stringify(FENICE)}</script>` +
          template
        return html
      } catch {
        return null
      }
    }
    const setTemplateToRedis = async (template, url, type) => {
      try {
        const redisKey = type + url
        const defaultClearTime = 12 * 60 * 1000
        // 缓存到redis, 定时过期

        await req.redis.set(redisKey, template, 'EX', defaultClearTime, 'NX')
        // 保存待删的key
        await req.redis.sadd('cache-template-keys', redisKey)
      } catch {
        return null
      }
    }
    const url = req.originalUrl
    const query = req.query
    // @ts-ignore
    FENICE = global.FENICE = {
      trace: !isDev || query.trace, // 是否上报埋点, 不是dev都上报, dev环境下query.trace开启上报
      nodeEnv: process.env.NODE_ENV,
    }
    try {
      const type = query.csr ? 'csr-template' : 'ssr-template'

      html = await getTemplateFromRedis(url, type)

      if (!html) {
        // 没有在redis中读到缓存, 需要生成
        const template = await getTemplate(url)
        if (query.csr) {
          html = await getCsrTemplate(template)
        } else {
          html = await getSSRTemplate(template, url)
        }

        // 存入redis
        setTemplateToRedis(html, url, type)
      }
    } catch (e) {
      console.log(e.stack)
      console.log('server render error')

      if (isProd) {
        // 生产环境出错, 渲染csr
        let template = await getTemplate(url)
        template = await getCsrTemplate(template).catch((err) => {
          console.log('getTemplateFrame(url)', err)

          return ''
        })
        if (!template) {
          console.log('获取template失败')

          // return res.redirect(302, 'https://live.bilibili.com')
        }
        html =
          `<script>window.FENICE = ${JSON.stringify(FENICE)}</script>` +
          template
      } else {
        return res.status(500).end(e.stack)
      }
    }
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  })
  // 错误处理
  app.use(function errorHandler(err, req, res, next) {
    if (res.headersSent) {
      return next(err)
    }

    res.status(500)
    res.render('error', { error: err })
  })
  return { app }
}

// 全局报错
process.on('uncaughtException', function (err) {
  try {
    console.log('uncaughtException' + err)
  } catch (err) {
    console.log('全局处理错误函数出错了,uncaughtException', err)
  }
})
process.on('unhandledRejection', (err) => {
  try {
    const errObj: Error = (err as any) || {
      message: 'unhandledRejection',
      stack: 'unhandledRejection',
    }
    console.log('unhandledRejection', err)
  } catch (err) {
    console.log('全局处理错误函数出错了,unhandledRejection', err)
  }
})

const createServer = () => {
  _createServer().then(({ app }) =>
    app.listen(port, () => {
      isDev &&
        console.log(`
访问url: http://127.0.0.1:${port}/home/

      `)
    })
  )
}
if (isDev) {
  createServer()
}
export { createServer }
