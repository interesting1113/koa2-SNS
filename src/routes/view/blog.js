/**
 * @description 微博 view 路由
 * @author sylviayang
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')

// 首页
router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {})
})

// 个人主页
router.get('/profile', loginRedirect, async (ctx, next) => {
  const { userName } = ctx.session.userInfo
  ctx.redirect(`/profile/${userName}`)
})
router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
  await ctx.render('profile', {

  })
})

module.exports = router