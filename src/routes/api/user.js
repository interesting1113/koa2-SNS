/**
 * @description user api router
 */

const router = require('koa-router')()

router.prefix('/api/user')

// 注册路由
router.post('/register', async (ctx, next) => {

})

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  
})

module.exports = router
