/**
 * @description sequelize sync
 * @author sylviayang
 */
const seq = require('./seq')
require('./model/index')

seq.authenticate().then(() => {
  console.log('auth ok')
}).catch(() => {
  console.log('auth err')
})
 
seq.sync({force: true}).then(() => {
  console.log('sync ok')
  process.exit()
})
