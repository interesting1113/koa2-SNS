/**
 * @description 用户关系 controller
 * @author sylviayang
 */

const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { getUserfByFollower, addFollower } = require('../services/user-relation')
const { addFollowerFailInfo } = require('../model/ErrorInfo')

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

/**
 * 
 * @param {number} myUserId 当前登陆的用户 id
 * @param {number} curUserId 要被关注的用户 id
 */
async function follow(myUserId, curUserId) {
  try {
    await addFollower(myUserId, curUserId)
    return new SuccessModel()
  } catch(ex) {
    return new ErrorModel(addFollowerFailInfo)
  }
}

module.default = {
  getFans,
  follow
}