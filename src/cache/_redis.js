/**
 * @description redis connection
 * @author sylviayang
 */

const redis = require('redis')
const { REDIS_CONIF } = require('../conf/db')

// create server
const redisClient = redis.createClient(REDIS_CONIF.port, REDIS_CONIF.host)
redisClient.on('error', err => {
  console.log('redis error', err)
})

/**
 * redis set
 * @param {string} key key
 * @param {string} val val
 * @param {number} timeout expire s
 */
function set(key, val, timeout = 60 * 60) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val)
  redisClient.expire(key, timeout)
}

/**
 * redis get
 * @param {string} key key
 */
function get(key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }
      if (val == null) {
        resolve(null)
        return 
      }
      try {
        resolve(
          JSON.parse(val)
        )
      } catch (ex) {
        resolve(val)
      }
    })
  })
  return promise
}

module.exports = {
  set,
  get
}