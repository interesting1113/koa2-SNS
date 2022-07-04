/**
 * @description 微博 @ 用户关系service
 * @author sylviayang
 */

const { AtRelation } = require('../db/model')

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

module.exports = {
  createAtRelation,
  getAtRelationCount
}