/**
 * @description 微博 @ 用户关系controller
 * @author sylviayang
 */

const { getAtRelationCount } = require('../controller/user-relation')
const { SuccessModel } = require('../model/ResModel')
/**
 * 获取at 我的微博数量
 * @param {number} userId 
 */
async function getAtMeCount(userId) {
  const count = await getAtRelationCount(userId)
  return new SuccessModel({
    count
  })
}

/**
 * 获取 @ 用户的微博列表
 * @param {nubmer} userId 
 * @param {number} pageIndex 
 */
async function getAtMeBlogList(userId, pageIndex = 0) {

}

module.exports = {
  getAtMeCount,
  getAtMeBlogList
}