'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var sessionStore = {
  version: "0.0.1",
  session: window.sessionStorage
};

var api = {
  /**
   * 写入某条缓存
   * @param {*} key 
   * @param {*} val 
   */
  set: function set(key, val) {
    return this.session.setItem(key, val);
  },

  /**
   * 读取某条缓存数据
   * @param {*} key 
   * @param {*} def 
   */
  get: function get(key) {
    return this.session.getItem(key);
  },
  has: function has(key) {
    return this.get(key) !== undefined;
  },

  /**
   * 删除某条缓存
   * @param {*} key 
   */
  remove: function remove(key) {
    return this.session.removeItem(key);
  },

  /**
   * 清空所有
   */
  clear: function clear() {
    this.session.clear();
  },

  /**
   * 获取所有缓存数据
   */
  getAll: function getAll() {
    if (this.disabled) {
      return null;
    }
    var ret = {};
    this.forEach(function (key, val) {
      ret[key] = val;
    });
    return ret;
  },

  /**
   * 遍历缓存，并执行回调
   * @param {*} callback 
   */
  each: function each(callback) {
    for (var i = this.session.length - 1; i >= 0; i--) {
      var key = this.session.key(i);
      fn(read(key), key);
    }
  }
};

Object.assign(sessionStore, api);

try {
  if (!sessionStore.session) alert('浏览器不支持sessionStorage');
} catch (oException) {
  store.disabled = true;

  if (oException.name == 'QuotaExceededError') {
    console.log('超出本地存储限额！');
    // TODO
  }
}

window.sessionStore = sessionStore;

exports.default = sessionStore;