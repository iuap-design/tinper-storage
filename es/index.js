'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('./utils');

var store = {
  version: __VERSION__,
  storage: window.localStorage
};

var api = {
  /**
   * 写入某条缓存
   * @param {*} key 
   * @param {*} val 
   */
  set: function set(key, val) {
    if (this.disabled) {
      return;
    }
    if (val === undefined) {
      return this.remove(key);
    }
    this.storage.setItem(key, (0, _utils.serialize)(val));
    return val;
  },

  /**
   * 读取某条缓存数据
   * @param {*} key 
   * @param {*} def 
   */
  get: function get(key, def) {
    if (this.disabled) {
      return def;
    }
    var val = (0, _utils.deserialize)(this.storage.getItem(key));
    return val === undefined ? def : val;
  },
  has: function has(key) {
    return this.get(key) !== undefined;
  },

  /**
   * 删除某条缓存
   * @param {*} key 
   */
  remove: function remove(key) {
    if (this.disabled) {
      return;
    }
    this.storage.removeItem(key);
  },

  /**
   * 清空所有
   */
  clear: function clear() {
    if (this.disabled) {
      return;
    }
    this.storage.clear();
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
    if (this.disabled) {
      return;
    }
    for (var i = 0; i < this.storage.length; i++) {
      var key = this.storage.key(i);
      callback(key, this.get(key));
    }
  },

  /**
   * 检测Localstorage 剩余存储量
   * @param {*} callback 
   */
  checkRest: function checkRest(callback) {}
};

Object.assign(store, api);

try {
  var testKey = '__storejs__';
  store.set(testKey, testKey);
  if (store.get(testKey) !== testKey) {
    store.disabled = true;
  }
  store.remove(testKey);
} catch (e) {
  store.disabled = true;
}

exports.default = store;