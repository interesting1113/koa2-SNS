/**
 * @description 微博 @ 用户关系service
 * @author sylviayang
 */

const { AtRelation } = require("../db/model")

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

module.exports = createAtRelation