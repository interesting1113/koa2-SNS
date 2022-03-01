/**
 * @description sequelize
 * @author sylviayang
 */
const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')
const { isProd } = require('../utils/env')

const { host, user, password, database } = MYSQL_CONF
const conf = {
  host,
  dialect: 'mysql'
}

if (isTest) {
  conf.logging = () => {}
}

// 线上环境, 使用连接池
if (isProd) {
  conf.pool = {
    max: 5, // 连接池中最大的连接数量
    min: 3, // 最小
    idle: 10000 // 如果一个线程 10s 之内没有被使用则释放
  }
}

const seq = new Sequelize(database, user, password, conf)

module.exports = seq