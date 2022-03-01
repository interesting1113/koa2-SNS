/**
 * @description jest server
 * @author sylviayang
 */

const request = require('supertest')
const server = require('../src/app').callback()

module.exports = request(server)