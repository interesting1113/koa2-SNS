const { User } = require('./model')

!(async function () {

  const updateRes = await User.update({
    nickName: 'HYDE'
  }, {
    where : {
      userName: 'hyde'
    }
  })
  console.log('updateRes...', updateRes[0] > 0)
})()