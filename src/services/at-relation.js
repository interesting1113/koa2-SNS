/**
 * @description 微博 @ 用户关系service
 * @author sylviayang
 */

const { AtRelation, Blog, User } = require('../db/model')
const { formatBlog, formatUser } = require('./_format')

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
async function getAtUserBlogList({ userId, pageIndex, pageSize = 10}) {
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageSize * pageIndex,
    order: [
      ['id', 'desc']
    ],
    include: [
      // @ 关系
      {
        model: AtRelation,
        attributes: ['userId', 'blogId'],
        where: { userId }
      },
      // user
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture']
      }
    ]
  })

  // 格式化
  let blogList = result.rows.map(row => row.dataValues)
  blogList = formatBlog(blogList)
  blogList = blogList.map(blogItem => {
    blogItem.user = formatUser(blogItem.user.dataValues)
    return blogItem
  })
  return {
    count: result.count,
    blogList
  }
}

/**
 * 更新 AtRelation
 * @param {Object} param0 更新内容
 * @param {Object} param1 查询条件
 */
async function updateAtRelation(
  { newIsRead }, // 要更新的内容
  { userId, isRead } // 条件
) {
  const updateData = {}
  if (newIsRead) {
    updateData.isRead = newIsRead
  }

  const whereData = {}
  if(userId) {
    whereData.userId = userId
  }
  if (newIsRead) {
    whereData.isRead = newIsRead
  }

  const result = await AtRelation.update(updateData, {
    where: whereData
  })
  return result[0] > 0
}

module.exports = {
  createAtRelation,
  getAtRelationCount,
  getAtUserBlogList,
  updateAtRelation
}