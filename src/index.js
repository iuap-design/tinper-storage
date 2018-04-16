
import { serialize, deserialize } from './utils'

let store = {
  version: __VERSION__,
  storage: window.localStorage
}
  
const api = {
  /**
   * 写入某条缓存
   * @param {*} key 
   * @param {*} val 
   */
  set(key, val) {
    if (this.disabled) {
      return
    }
    if (val === undefined) {
      return this.remove(key)
    }
    this.storage.setItem(key, serialize(val))
    return val
  },
  /**
   * 读取某条缓存数据
   * @param {*} key 
   * @param {*} def 
   */
  get(key, def) {
    if (this.disabled) {
      return def
    }
    let val = deserialize(this.storage.getItem(key))
    return (val === undefined ? def : val)
  },

  has(key) {
    return this.get(key) !== undefined
  },
  /**
   * 删除某条缓存
   * @param {*} key 
   */
  remove(key) {
    if (this.disabled) {
      return
    }
    this.storage.removeItem(key)
  },
  /**
   * 清空所有
   */
  clear() {
    if (this.disabled) {
      return
    }
    this.storage.clear()
  },
  /**
   * 获取所有缓存数据
   */
  getAll() {
    if (this.disabled) {
      return null
    }
    let ret = {}
    this.forEach((key, val) => {
      ret[key] = val
    })
    return ret
  },
  /**
   * 遍历缓存，并执行回调
   * @param {*} callback 
   */
  each(callback) {
    if (this.disabled) {
      return
    }
    for (let i = 0; i < this.storage.length; i++) {
      let key = this.storage.key(i)
      callback(key, this.get(key))
    }
  },
  /**
   * 检测Localstorage 剩余存储量
   * @param {*} callback 
   */
  checkRest(callback) {

  },
  /**
   * 
   */
}

Object.assign(store, api)

try {
  const testKey = '__storejs__'
  store.set(testKey, testKey)
  if (store.get(testKey) !== testKey) {
    store.disabled = true
  }
  store.remove(testKey)
} catch (e) {
  store.disabled = true
}
  
  export default store