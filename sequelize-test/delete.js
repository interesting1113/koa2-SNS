const { User, Blog } = require('./model')


!(async function () {
  const delBlogRes = await Blog.destroy({
    where: {
      id: 4
    }
  })
  console.log('delBlogRes', delBlogRes > 0)

  const delUserRes = await User.destroy({
    where : {
      id: 1
    }
  })
  console.log('delUserRes', delUserRes)
})()