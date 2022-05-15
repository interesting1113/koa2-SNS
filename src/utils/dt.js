/**
 * @description 时间相关的工具函数
 * @author sylviayang
 */
const { format } = require('date-fns')

/**
 * 格式化时间
 * @param {string} str 时间字符串
 * @returns 
 */
function timeFormat(str) {
  return format(new Date(str), 'MM.dd HH:mm')
}

module.exports = {
  timeFormat
}