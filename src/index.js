
import { serialize, deserialize } from './utils'


let store = {
  version: "0.0.2",
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
    let size = 0;
    let rest = null;

    for(let item in this.storage) {
      
      if(this.storage.hasOwnProperty(item)) {
        size += this.get(item).length;
      }
      
    }
    rest = (size / 1024).toFixed(2)
    if (callback) callback(rest)
    
    return rest;
  },
  /**
   * 获取
   */
  getMaxLength(){
    var test = '0123456789';
    var add = function(num) {
       num += num;
       if(num.length == 10240) {
         test = num;
        return;
      }
      add(num);
    }
    add(test);

    var sum = test;
    var show = setInterval(function(){
       sum += test;
       try {
        this.remove('test');
        this.set('test', sum);
        console.log(sum.length / 1024 + 'KB');
       } catch(e) {
        console.log(sum.length / 1024 + 'KB超出最大限制');
        clearInterval(show);
       }
    }, 0.1)
  }
}

Object.assign(store, api)

try {
  if(!store.storage) alert('浏览器不支持localStorage');

  const testKey = '__tinperStorageJS__'
  store.set(testKey, testKey)
  if (store.get(testKey) !== testKey) {
    store.disabled = true
  }
  store.remove(testKey)
} catch (oException) {
  store.disabled = true

  if(oException.name == 'QuotaExceededError'){
		console.log('超出本地存储限额！');
		// TODO
	}
}

window.store = store

export default store