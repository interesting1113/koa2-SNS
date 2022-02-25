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

// set

// get