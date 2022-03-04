/**
 * @description 数据格式化
 * @author sylviayang
 */

/**
 * 用户默认头像
 * @param {Object} obj 
 * @returns 
 */
function _formatUserPicture(obj) {
  if (obj.picture == null) {
    obj.picture = 'https://dwz.cn/rnTnftZs'
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

module.exports = {
  formatUser
}