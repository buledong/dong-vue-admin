# dong-vue-admin

基于 vite, element-ui3 和 vue3 开发的后台管理系统, 我会努力一直更新的

### 启动

<!--
注意:
./server 中的ts文件是ts打包的,
./src 下的文件是 vite打包的, vite打包会替换掉  process.env.NODE_ENV

所以, 不想被替换掉, 可以使用
      const p = process
      const { env } = p
      const { NODE_ENV } = env

 -->

本地

```sh
# 环境变量 NODE_ENV=development
npm run dev

```

生产 & uat

```sh
# 生产 环境变量 NODE_ENV=production
# 打包
npm run build
# 启动入口
entrance.config.js
```

### 自定义

- server 目录 config 下可以定制 port 和 path

### 其他

- 大概够用了，有新需求可以沟通

### redis

window 启动 redis

```shell
 redis-server
```

### 关闭所有 node 程序

taskkill /F /IM node.exe
