/**
 * @description 微博 service
 * @author sylviayang
 */

const { Blog, User } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * 
 * @param {Object} param0 创建微博所需的数据 { userId, content, inage }
 */
async function createBlog({ userId, content, inage }) {
  const result = await Blog.create({
    userId,
    content,
    image
  })
  return result.dataValues
}

/**
 * 根据用户获取微博列表
 * @param {Object} param0 查询参数{ userName, pageIndex = 0, pageSize = 10}
 */
async function getBlogListByUser(
  { userName, pageIndex = 0, pageSize = 10}
) {
  const userWhereOpts = {}
  if (userName) {
    userWhereOpts.userName = userName
  }

  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageSize * pageIndex,
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture'],
        where: userWhereOpts
      }
    ]
  })

  // 获取dataValues
  let blogList = result.rows.map(row => row.dataValues)

  blogList = blogList.map(blogItem => {
    const user = blogItem.user.dataValues
    blogItem.user = formatUser(user)
    return blogItem
  })

  return {
    count: result.count,
    blogList
  }
}

module.exports = {
  createBlog,
  getBlogListByUser
}