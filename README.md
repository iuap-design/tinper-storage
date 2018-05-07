# tinper-storage

`tinper-storage` 对 `localStorage` 和 `sessionStorage` 的使用做了进一步的易用性封装，提供删除、新增和写入、清空、读取、遍历所有、查询已用存储量等功能




[![npm version](https://img.shields.io/npm/v/tinper-storage.svg)](https://www.npmjs.com/package/tinper-storage)
[![Build Status](https://img.shields.io/travis/iuap-design/tinper-storage/master.svg)](https://travis-ci.org/iuap-design/tinper-storage)
[![Coverage Status](https://coveralls.io/repos/github/iuap-design/tinper-storage/badge.svg?branch=master)](https://coveralls.io/github/iuap-design/tinper-storage?branch=master)
[![dependencies Status](https://david-dm.org/iuap-design/tinper-storage/status.svg)](https://david-dm.org/iuap-design/tinper-storage)
[![NPM downloads](http://img.shields.io/npm/dm/tinper-storage.svg?style=flat)](https://npmjs.org/package/tinper-storage)
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/iuap-design/tinper-storage.svg)](http://isitmaintained.com/project/iuap-design/tinper-storage "Average time to resolve an issue")
[![Percentage of issues still open](http://isitmaintained.com/badge/open/iuap-design/tinper-storage.svg)](http://isitmaintained.com/project/iuap-design/tinper-storage "Percentage of issues still open")

## 如何使用

1.`npm install tinper-storage --save`
```
import localStore from 'tinper-storage/lib/localStore';
import sessionStore from 'tinper-storage/lib/sessionStore'

// 使用
localStore.set();

....
```

2.按 CDN 方式引用

- `https://design.yonyoucloud.com/static/tinper-storage/0.1.0/localStore.js`，通过 window.localStore 拿到所有 API
- `https://design.yonyoucloud.com/static/tinper-storage/0.1.0/sessionStore.js`，通过 window.sessionStore 拿到所有 API




## API

- localStore
    - set(key, val) ：写入某条缓存
    - get(key, def) : 读取某条缓存数据
    - remove(key) : 删除某条缓存
    - clear() : 清空所有
    - getAll() : 获取所有缓存数据
    - each(callback) : 遍历缓存，并执行回调
    - getUsed(callback) : 检测 Localstorage 已使用的存储量，并支持回调
    - getMaxLength() : 获取当前浏览器最大的存储量
    - getRest() : 获取剩余的存储量
- sessionStore
    - set(key, val) 
    - get(key) 
    - has(key) 
    - remove(key) 
    - clear() 
    - getAll() 
    - each(callback)

## License

MIT