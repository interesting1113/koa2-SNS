/**
 * @description db config
 * @author sylviayang
 */

let MYSQL_CONF = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'koa2_weibo'
}

let REDIS_CONIF = {
  port: 6379,
  host: '127.0.0.1'
}

if (isProd) {
  let MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'koa2_weibo'
  }

  let REDIS_CONIF = {
    port: 6379,
    host: '127.0.0.1'
  }
}

module.exports = {
  REDIS_CONIF,
  MYSQL_CONF
}