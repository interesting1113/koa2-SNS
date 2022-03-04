/**
 * @description user services
 * @author sylviayang
 */

const { User } = require('../db/model/index')

/**
 * 获取用户信息
 * @param {string} userName 
 * @param {string} password 
 */
async function getUserInfo(userName, password) {
  // 查询条件
  const whereOpt = {
    userName
  }
  if (password) {
    Object.assign(whereOpt, { password })
  }
  // 查询
  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'pucture', 'city'],
    where: whereOpt
  })
  // 未找到
  if (result == null) {
    return result
  }

  // 格式化
  
  return  result.dataValues
}

module.exports = {
  getUserInfo
}