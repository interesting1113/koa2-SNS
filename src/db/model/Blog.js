/**
 * @description 微博数据模型
 * @author sylviayang
 */

 const seq = require('../seq')
 const { INTEGER, STRING, TEXT } = require('../types')

 const Blog = seq.define('blog', {
  userId: {
    type: INTEGER,
    allowNull: false,
    Comment: '用户 ID'
  },
  content: {
    type: TEXT,
    allowNull: false,
    comment: 'sns 内容'
  },
  image: {
    type: STRING,
    comment: '图片地址'
  }
 })

 module.exports = Blog
