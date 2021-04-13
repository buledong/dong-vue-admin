import ie11Midd from './ie11'
import redisMidd from './redis'
import whiteList from './whiteList'
var cookieParser = require('cookie-parser')
const middlewares = [cookieParser(), whiteList, ie11Midd, redisMidd]
export { middlewares }
