/**
 * @description 用户关系 service
 * @author sylviayang
 */

const { User, UserRelation } = require('../db/model/index')
/**
 * 过去关注该用户的用户列表， 即该用户的粉丝
 * @param {followerId} followerId 被关注人的id
 */
async function getUserfByFollower(followerId) {
  const result = await User.findAndCountAll({
    attributes: ['id', 'userName', 'nickName', 'pic'],
    order: [
      'id', 'desc'
    ],
    include: [
      {
        model: UserRelation,
        where: followerId
      }
    ]
  })
}

module.exports = {
  getUserfByFollower
}