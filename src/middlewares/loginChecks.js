/**
 * @description 登陆验证的中间件
 * @author sylviayang
 */

 const { ErrorModel } = require('../model/ResModel')
 const { jsonSchemaFileInfo, loginCheckFailInfo } = require('../model/ErrorInfo')

/**
 * API 登陆验证
 * @param {Object} ctx 
 * @param {function} next 
 */
async function loginCheck(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    // 已登陆
    await next()
    return
  }
  // 未登陆
  ctx.body = new ErrorModel(loginCheckFailInfo)
}

/**
 * 页面登陆验证
 * @param {Object} ctx 
 * @param {function} next 
 */
async function loginRedirect(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    // 已登陆
    await next()
    return
  }
  // 未登陆
  const curUrl = ctx.curUrl
  ctx.redirect('/login?url=' + encodeURIComponent(curUrl))
}

module.exports = {
  loginCheck,
  loginRedirect
}