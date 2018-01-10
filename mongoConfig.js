var mongo = require("mongodb"); //引入mongodb模块
var assert = require("assert"); //引入断言模块
var MongoClient = mongo.MongoClient; //开启服务
var url = "mongodb://localhost:27017"; //url储存  放在连接池中。

//添加数据
const add = function (client, dbname, collections, selector, fn) {
    const db = client.db(dbname);
    db.collection(collections).insertMany(selector, function (err, result) { //连接到数据库上面，并使用参数传入集合
        assert.equal(null, err);
        fn(result);
    });
    client.close()
}

//更新数据
const update = function (client, dbname, collections, selector, fn) {
    const db = client.db(dbname);
    db.collection(collections).update(selector[0], selector[1], function (err, result) { //连接到数据库上面，并使用参数传入集合
        assert.equal(null, err);
        assert.equal(1, result.result.n);
        fn(result);
    });
    client.close();
}

//删除数据
const deletes = function (client, dbname, collections, selector, fn) {
    const db = client.db(dbname);
    db.collection(collections).deleteOne(selector, function (err, result) { //连接到数据库上面，并使用参数传入集合
        try {
            assert.equal(err, null)
        } catch (e) {
            console.log(e);
        }
        fn(result);
    });
    client.close();
}

//查询数据
const find = function (client, dbname, collections, selector, fn) {
    const db = client.db(dbname);
    db.collection(collections).find(selector).toArray(function (err, result) { //连接到数据库上面，并使用参数传入集合
        try {
            assert.equal(err, null)
        } catch (e) {
            console.log(e);
        }
        fn(result);
    });
    client.close();
}

const methodType = {
    add: add,
    update: update,
    deletes: deletes,
    find: find
};

/**
 * 
 * @param {*} method //操作类型
 * @param {*} dbname //数据库名
 * @param {*} collections //表
 * @param {*} selector //操作
 * @param {*} fn //回调函数
 */

module.exports = function (method, dbname, collections, selector, fn) {
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err); //使用断言模块代替以前的 if判断
        console.log("Connected correctly to server");
        methodType[method](client, dbname, collections, selector, fn);
    });
};