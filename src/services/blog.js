/**
 * @description 微博 service
 * @author sylviayang
 */

const { Blog } = require('../db/model/index')

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

module.exports = {
  createBlog
}