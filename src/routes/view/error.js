/**
 * @description error 404 route
 * @author sylviayang
 */

const router = require('koa-router')()

// error
router.get('/error', async (ctx, error) => {
  await ctx.render('error')
})

// 404
router.get('*', async (ctx, error) => {
  await ctx.render('404')
})

module.exports = router