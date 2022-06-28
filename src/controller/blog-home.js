/**
 * @description 首页 controller
 * @author sylviayang
 */

const { xss } = require('xss')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlog, getFollowersBlogList } = require('../services/blog')
const { PAGE_SIZE } = require('../conf/constant')
/**
 * 创建微博
 * @param {Object} param0 创建微博所需的数据 { userId, content, inage }
 */
async function create({ userId, content, inage }) {
  try {
    // 创建微博
    const blog = await createBlog({
      userId,
      content: xss(content),
      image
    })
    return new SuccessModel(blog)
  } catch (ex) {
    console.log(ex.message, ex.stack)
    return new ErrorModel(createBlogFailInfo)
  }
}

/**
 * 获取首页微博列表
 * @param {number} userId userId
 * @param {number} userId userId
 */
async function getHomeBlogList(userId, pageIndex = 0) {
  const result = await getFollowersBlogList(
    {
      userId,
      pageIndex,
      pageSize: PAGE_SIZE
    }
  )
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
  create,
  getHomeBlogList
}