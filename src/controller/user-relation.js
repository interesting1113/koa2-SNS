/**
 * @description 用户关系 controller
 * @author sylviayang
 */

const { SuccessModel } = require('../model/ResModel')
const { getUserfByFollower } = require('../services/user-relation')
/**
 * 根据userId获取粉丝列表
 * @param {number} userId 
 */
async function getFans(userId) {
  const { count, userList } = await getUserfByFollower(userId)

  return new SuccessModel({
    fansCount: count,
    fansList: userList
  })
}

module.default = getFans