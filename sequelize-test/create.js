const { Blog, User } = require('./model')

!(async function() {
  const hyde = await User.create({
    userName: 'hyde',
    password: '123',
    nickName: 'HYDE'
  })

  console.log('hyde', hyde.dataValues)
  const hydeId = hyde.dataValues.id

  const blog = await Blog.create({
    title: 'title1',
    content: 'content1',
    userId: hydeId
  })
})()