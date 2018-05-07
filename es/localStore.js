'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('./utils');

var localStore = {
  version: "0.0.4",
  storage: window.localStorage,
  maxSize: 0,
  usedSize: 0
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
   * 检测Localstorage 已占用存储量
   * @param {*} callback 
   */
  getUsed: function getUsed(callback) {
    var size = 0;
    var rest = null;

    for (var item in this.storage) {

      if (this.storage.hasOwnProperty(item)) {
        size += this.get(item).length;
      }
    }
    this.usedSize = (size / 1024).toFixed(2);
    if (callback) callback(this.usedSize);

    return this.usedSize;
  },

  /**
   * 获取
   */
  getMaxLength: function getMaxLength() {
    var test = '0123456789';
    var maxSize = 0;
    var _this = this;

    var add = function add(num) {
      num += num;
      if (num.length == 10240) {
        test = num;
        return;
      }
      add(num);
    };
    add(test);

    var sum = test;
    var show = setInterval(function () {
      sum += test;

      try {
        _this.remove('test');
        _this.set('test', sum);
      } catch (e) {
        _this.maxSize = (sum.length / 1024).toFixed(2);

        clearInterval(show);
      }
    }, 0.05);

    return this.maxSize;
  },

  /**
   * 
   */
  getRest: function getRest() {
    return this.maxSize - this.usedSize;
  }
};

Object.assign(localStore, api);

try {
  if (!localStore.storage) alert('浏览器不支持localStorage');

  var testKey = '__tinperStorageJS__';
  localStore.set(testKey, testKey);
  if (localStore.get(testKey) !== testKey) {
    localStore.disabled = true;
    console.log('存储量满，无法操作');
  }
  localStore.remove(testKey);
} catch (oException) {
  localStore.disabled = true;

  if (oException.name == 'QuotaExceededError') {
    console.log('超出本地存储限额！');
    // TODO
  }
}

window.localStore = localStore;

exports.default = localStore;