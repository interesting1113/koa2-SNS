const Sequelize = require('sequelize')

const conf = {
  host: 'localhost',
  dialect: 'mysql'
}

conf.pool = {
  max: 5, // 连接池中最大的连接数量
  min: 3, // 最小
  idle: 10000 // 如果一个线程 10s 之内没有被使用则释放
}

const seq = new Sequelize('koa2_weibo', 'root', '123456', conf)

module.exports = seq
