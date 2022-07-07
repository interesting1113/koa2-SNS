/**
 * @description 微博 @ 用户关系controller
 * @author sylviayang
 */

const { PAGE_SIZE } = require('../conf/constant')
const { getAtRelationCount, getAtUserBlogList } = require('../controller/user-relation')
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
  const reuslt = await getAtUserBlogList({
    userId,
    pageIndex,
    pageSize: PAGE_SIZE
  })
  const { count, blogList } = result

  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count
  })
}

module.exports = {
  getAtMeCount,
  getAtMeBlogList
}