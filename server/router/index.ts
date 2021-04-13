import { health } from './health'
import { test } from './test'
const router = (app) => {
  test(app)
  health(app)
}
export { router }
