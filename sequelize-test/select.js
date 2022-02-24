const { Blog, User } = require('./model')

!(async function() {
  // 查询一条记录
  const hyde = await User.findOne({
    where: {
      userName: 'hyde'
    }
  })
  console.log('hyde', hyde.dataValues)

  // 查询特定的列
  const hydeName = await User.findOne({
    attributes: ['userName', 'nickName'],
    where: {
      userName: 'hyde'
    }
  })
  console.log('hydeName', hydeName.dataValues)

  // 查询一个列表
  const hydeBlogList = await Blog.findAll({
    where: {
      userId: 1
    },
    order: [
      ['id', 'desc']
    ]
  })
  console.log(
    'hydeBlogList',
     hydeBlogList.map(blog => blog.dataValues)
  )

  // pagination
  const blogPageList = await Blog.findAll({
    limit: 2, // 限制本次查询两条
    offset: 4, // 跳过多少条
    order: [
      ['id', 'desc']
    ]
  })
  console.log(
    'blogPageList',
    blogPageList.map(blog => blog.dataValues)
  )

  //　查询总数
  const blogListAndCount = await Blog.findAndCountAll({
    limit: 2, // 限制本次查询两条
    offset: 4, // 跳过多少条
    order: [
      ['id', 'desc']
    ]
  })
  console.log(
    'blogListAndCount',
    blogListAndCount.count, // 所有的总数，不考虑分页
    blogListAndCount.rows.map(blog => blog.dataValues)
  )
})()