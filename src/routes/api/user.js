/**
 * @description user api router
 */

const router = require('koa-router')()
const { isExist, register } = require('../../controller/user')
const userValidate = require('../../validator/user')

router.prefix('/api/user')

// 注册路由
router.post('/register', async (ctx, next) => {
  // 校验
  userValidate(ctx.request.body)
}, async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body
  ctx.body = await register ({
    userName,
    password,
    gender
  })
})

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})

module.exports = router
