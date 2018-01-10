var MongoAct = require('./mongoConfig');
let method = "add";
let dbname = 'test';//数据库名
let table = 'demo1';//操作的表名
let selector = [{ "name": "xiaoming" }];//操作

/**
 *  更新数据[{},{}]
 *  添加数据[{}]
 *  删除数据{}
 *  查找数据{}
 */

MongoAct(method, dbname, table, selector, function (res) {console.log(res) })