/**
 * @description 用户关系 service
 * @author sylviayang
 */

const { User, UserRelation } = require('../db/model/index')
const { formatUser } = require('./_format')
const Sequelize = require('sequelize')

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
        where: {
          followerId,
          userId: {
            [Sequelize.Op.ne]: followerId
          }
        }
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
 * 获取关注人列表
 * @param {number} userId userId
 */
async function getFollowersByUser(userId) {
  const result = await UserRelation.findAndCountAll({
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['id', 'userName', 'nickName', 'picture']
      }
    ],
    where: {
      userId,
      followerId: {
        [Sequelize.Op.ne]: userId
      }
    }
  })

  let userList = result.rows.map(row => row.dataValues)

  userList = userList.map(item => {
    let user = item.user
    user = user.dataValues
    user = formatUser(user)
    return user
  })

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

async function deleteFollower(userId, followerId) {
  const result = await UserRelation.destory({
    userId,
    followerId
  })
  return result > 0
}

module.exports = {
  getUserfByFollower,
  getFollowersByUser,
  addFollower,
  deleteFollower
}