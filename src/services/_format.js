/**
 * @description 数据格式化
 * @author sylviayang
 */

const { DEFAULT_PICTURE, REG_FOR_AT_WHO } = require('../conf/constant')
const {timeFormat} = require('../utils/dt')
/**
 * 用户默认头像
 * @param {Object} obj 
 * @returns 
 */
function _formatUserPicture(obj) {
  if (obj.picture == null) {
    obj.picture = DEFAULT_PICTURE
  }
  return obj
}

/**
 * 格式化用户信息
 * @param {Array|Object} list 
 */
function formatUser(list) {
  if (list == null) {
    return list
  }

  if (list instanceof Array) {
    // 数组 用户列表
    return list.map(_formatUserPicture)
  }

  // 单个对象
  let result = list
  result = _formatUserPicture(result)
  return result
}

/**
 * 
 * @param {Object} obj 数据
 */
function _formatDBTime(obj) {
  obj.createdAtFormat = timeFormat(obj.createdAt)
  obj.updatedAtFormat = timeFormat(obj.updatedAt)
}

/**
 * 
 * @param {Object} obj 微博数据对象 
 */
function _formatContent(obj) {
  obj.contentFormat = obj.content

  // 格式化 @
  // from '哈喽 @张三 - zhangsan 你好'
  // to '哈喽 <a href="/profile/zhangsan">张三</a> 你好'
  obj.contentFormat = obj.contentFormat.replace(
    REG_FOR_AT_WHO,
    (matchStr, nickName, userName) => {
      return `<a href="/profile/${userName}">@${nickName}</a>`
    }
  )

  return obj
}

/**
 * 格式化微博信息
 * @param {Array|Object} list 
 */
function formatBlog(list) {
  if (list == null) return
  if (list instanceof Array) {
    return list.map(_formatDBTime).map(_formatContent)
  }
  // 对象
  let result = list 
  result = _formatDBTime (list)
  result = _formatContent(result)
  return result
}

module.exports = {
  formatUser
}