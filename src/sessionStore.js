
let sessionStore = {
  version: "0.0.1",
  session: window.sessionStorage
}
  
const api = {
  /**
   * 写入某条缓存
   * @param {*} key 
   * @param {*} val 
   */
  set(key, val) {
    return this.session.setItem(key, val)
  },
  /**
   * 读取某条缓存数据
   * @param {*} key 
   * @param {*} def 
   */
  get(key) {
    return this.session.getItem(key)
  },

  has(key) {
    return this.get(key) !== undefined
  },
  /**
   * 删除某条缓存
   * @param {*} key 
   */
  remove(key) {
    return this.session.removeItem(key)
  },
  /**
   * 清空所有
   */
  clear() {
    this.session.clear()
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
    for (var i = this.session.length - 1; i >= 0; i--) {
      var key = this.session.key(i)
      fn(read(key), key)
    }
  }
}

Object.assign(sessionStore, api)


try {
  if(!sessionStore.session) alert('浏览器不支持sessionStorage');

} catch (oException) {
  store.disabled = true

  if(oException.name == 'QuotaExceededError'){
		console.log('超出本地存储限额！');
		// TODO
	}
}


window.sessionStore = sessionStore


export default sessionStore