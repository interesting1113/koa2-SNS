/**
 * @description 首页test
 * @author sylviayang
 */

const server = require('../server')
const { Z_COOKIE } = require('../testUserInfo') 

let BLOG_ID = ''

test('创建一条微博，应该成功', async () => {
  const content = '单元测试自动创建的微博_' + Date.now()
  const image = '/xxx.png'

  const res = await server
              .post('/api/blog/create')
              .send({
                content,
                image
              })
              .set('cookie', Z_COOKIE)
  expect(res.body.errno).toBe(0)
  expect(res.body.data.content).toBe(content)
  expect(res.body.data.image).toBe(image)

  BLOG_ID = res.body.data.id
})

