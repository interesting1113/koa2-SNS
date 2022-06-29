/**
 * @description 首页 API 路由
 * @author sylviayang
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const {create, getHomeBlogList } = require('../../controller/blog-home')
const { genValidator } = require('../../middlewares/validator')
const blogValidate = require('../../validator/blog')
const { getBlogListStr } = require('../../utils/blog')

router.prefix('/api/blog')

// 创建微博
router.post('/create', loginCheck, genValidator(blogValidate), async (ctx, next) => {
  const { content, image } = ctx.request.body
  const { id: userId } = ctx.session.userInfo
  ctx.body = await create({userId, content, image})
})

// 加载更多
router.get('/loadMore/:pageIndex', loginCheck, async(ctx, next) => {
  const { pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  const { id: userId } = ctx.session.userInfo
  const result = await getHomeBlogList(userId, pageIndex)

  result.data.blogListTpl = getBlogListStr(result.data.blogList)

  ctx.body = result
})

// 加载第一页数据
test('首页', async () => {
  const res = await server
               .get(`/api/blog/loadMore/0`)
               .set('cookie', Z_COOKIE)
 expect(res.body.errno).toBe(0)

 const data = res.body.data
 expect(data).toHaveProperty('isEmpty')
 expect(data).toHaveProperty('blogList')
 expect(data).toHaveProperty('pageSize')
 expect(data).toHaveProperty('pageIndex')
 expect(data).toHaveProperty('count')
})



module.exports = router