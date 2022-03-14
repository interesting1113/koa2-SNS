/**
 * @description user view router
 * @author sylviayang
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')

/**
 * 
 * @param {Object} ctx ctx
 */
function getLoginInfo(ctx) {
  let data = {
    isLogin: false // 默认未登陆
  }

  const userInfo = ctx.session.userInfo
  if (userInfo) {
    data = {
      isLogin: true,
      userName: userInfo.userName
    }
  }
}

router.get('/login', async (ctx, next) => {
  await ctx.render('login', getLoginInfo(ctx))
})

router.get('/register', async (ctx, next) => {
  await ctx.render('register', getLoginInfo(ctx))
})

router.get('/setting', loginRedirect, async (ctx, next) => {
  await ctx.render('setting', ctx.session.userInfo)
})
module.exports = router