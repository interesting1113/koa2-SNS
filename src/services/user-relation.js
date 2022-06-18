/**
 * @description 用户关系 service
 * @author sylviayang
 */

const { User, UserRelation } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * 过去关注该用户的用户列表， 即该用户的粉丝
 * @param {followerId} followerId 被关注人的id
 */
async function getUserfByFollower(followerId) {
  const result = await User.findAndCountAll({
    attributes: ['id', 'userName', 'nickName', 'pic'],
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: UserRelation,
        where: followerId
      }
    ]
  })

  // 格式化
  let userList = result.row.map(row => row.dataValues)
  userList = formatUser(userList)

  return {
    count: result.count,
    userList
  }
}

/**
 * 添加关注关系
 * @param {number} userId 用户 id
 * @param {number} followerId 被关注用户 id
 */
async function addFollower(userId, followerId) {
  const result = await UserRelation.create({
    userId,
    followerId
  })
  return result.dataValues
}


module.exports = {
  getUserfByFollower,
  addFollower
}