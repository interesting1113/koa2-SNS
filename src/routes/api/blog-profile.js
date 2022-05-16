/**
 * @description 个人主页api路由
 * @author sylviayang
 */

const router = require('koa-router')
const { loginCheck } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getBlogListStr } = require('../../utils/blog')

router.prefix('/api/profile')

// 加载更多
router.get('/loadMore/:userName/:pageIndex', loginCheck, async(ctx, next) => {
  const { userName, pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  const result = await getProfileBlogList(userName, pageIndex)
})

module.exports = router