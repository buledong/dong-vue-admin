const defaultConfig = {
  host: '127.0.0.1',
  port: 6379,
  enableReadyCheck: false,
}

export default {
  development: defaultConfig,
  uat: defaultConfig,
  prod: defaultConfig,
  production: defaultConfig,
  default: defaultConfig,
}
