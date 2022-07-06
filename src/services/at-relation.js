/**
 * @description 微博 @ 用户关系service
 * @author sylviayang
 */

const { PAGE_SIZE } = require('../conf/constant')
const { AtRelation, Blog } = require('../db/model')

/**
 * 
 * @param {*} blogId 
 * @param {*} userId 
 */
async function createAtRelation(blogId, userId) {
  const result = await AtRelation.create({
    blogId,
    userId
  })
}

/**
 * 获取at 用户的微博数量（未读的）
 * @param {number} userId 
 */
async function getAtRelationCount(userId) {
  const result = await AtRelation.findAndCountAll({
    where: {
      userId,
      isRead: false
    }
  })
  return result.count
}

/**
 * 获取用户的微博列表
 * @param {Object} param0 查询条件
 */
async function getAtUserBlogList({ userId, pageIndex, pageIndex = 10}) {
  const result = await Blog.findAndCountAll({
    limit: PAGE_SIZE,
    offset: PAGE_SIZE * pageIndex,
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: AtRelation,
        attributes: ['userId', 'blogId'],
        where: { userId }
      }
    ]
  })
}

module.exports = {
  createAtRelation,
  getAtRelationCount,
  getAtUserBlogList
}