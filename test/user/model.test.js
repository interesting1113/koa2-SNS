/**
 * @description user model test
 * @author sylviayang
 */

const { User } = require('../../src/db/model/index')

test('User 模型的各个属性符合预期', () => {
  const user = User.build({
    userName: 'hyde',
    password: 'p123123',
    nickName: 'hydeee',
    // gender: 1,
    picture: '/xxx.png',
    city: 'tokyo'
  })
  // 验证各个属性
  expect(user.userName).toBe('hyde')
  expect(user.password).toBe('p123123')
  expect(user.nickName).toBe('hydeee')
  expect(user.gender).toBe(3)
  expect(user.picture).toBe('/xxx.png')
  expect(user.city).toBe('tokyo')
})