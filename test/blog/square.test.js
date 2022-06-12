/**
 * @description 广场test
 * @author sylviayang
 */

 const server = require('../server')
 const { COOKIE } = require('../testUserInfo') 


 test('广场页，加载第一页数据', async () => {
   const res = await server
                .get(`/api/profile/loadMore/0`)
                .set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)

  const data = res.body.data
  expect(data).toHaveProperty('isEmpty')
  expect(data).toHaveProperty('blogList')
  expect(data).toHaveProperty('pageSize')
  expect(data).toHaveProperty('pageIndex')
  expect(data).toHaveProperty('count')
 })
