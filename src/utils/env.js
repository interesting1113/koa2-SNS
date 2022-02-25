/**
 * @description env
 * @author sylviayang
 */

const ENV = process.env.NODE_ENV

module.exports = {
  isDev: ENV === 'dev',
  notDEV: ENV !== 'dev',
  isProd: ENV === 'production',
  notProd: ENV !== 'production'
}