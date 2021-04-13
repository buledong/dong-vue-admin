import { createStore, ModuleTree } from 'vuex'

/**
 * 程序 Store Module.
 */
const modules = {}

/**
 * Store module 类型转换函数.
 * 请无视此函数，这个是用来屁眼 TSC 的.
 *
 * @param {any} storeModules
 * @returns
 */
function convert(storeModules) {
  return <ModuleTree<any>>storeModules
}

export default createStore({
  modules: convert(modules),
})
