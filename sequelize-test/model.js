const Sequelize = require('sequelize')
const seq = require('./seq')

// User, table name: users
const User = seq.define('user', {
  userName: {
    type: Sequelize.STRING, // varchar(255)
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nickName: {
    type: Sequelize.STRING
  }
});

module.exports = {
  User
}