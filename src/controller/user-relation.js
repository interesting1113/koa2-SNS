/**
 * @description 用户关系 controller
 * @author sylviayang
 */

const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { 
  getUserfByFollower, 
  getFollowersByUser, 
  addFollower, 
  deleteFollower 
} = require('../services/user-relation')
const { addFollowerFailInfo, deleteFollowerFailInfo } = require('../model/ErrorInfo')

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
 * 根据userId获取关注列表
 * @param {number} userId 
 */
async function getFollowers(userId) {
  const { count, userList } = await getFollowersByUser(userId)

  return new SuccessModel({
    count,
    followerList: userList
  })
}

/**
 * 关注
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

/**
 * 取消关注
 * @param {number} myUserId 当前登陆的用户 id
 * @param {number} curUserId 要被关注的用户 id
 */
async function unFollow(myUserId, curUserId) {
  const result = await deleteFollower(myUserId, curUserId)
  if (result) {
    return new SuccessModel()
  }
  return new ErrorModel(deleteFollowerFailInfo)
}

module.default = {
  getFans,
  getFollowers,
  follow
}