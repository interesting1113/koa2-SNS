/**
 * @description user view router
 * @author sylviayang
 */

const router = require('koa-router')()

/**
 * 
 * @param {Object} ctx ctx
 */
function getLoginInfo(ctx) {
  const data = {
    isLogin: false // 默认未登陆
  }

  const userInfo = ctx.session.userInfo
  if (userInfo) {
    let data = {
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

module.exports = router