/**
 * @description user controller
 * @author sylviayang
 */

const { getUserInfo, createUser, deleteUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  loginFailInfo,
  deleteUserFailInfo
} = require('../model/ErrorInfo')
const doCrypto = require('../utils/cryp')

/**
 * 用户名是否存在
 * @param {string} userName 
 */
async function isExist(userName) {
  const userInfo = await getUserInfo(userName)

  if (userInfo) {
    return new SuccessModel(userInfo)
  } else {
    return new ErrorModel(registerUserNameNotExistInfo)
  }
}

/**
 * 注册
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别 （1 男， 2 女， 3 保密）
 */
async function register({ userName, password, gender }) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    // 用户名已存在
    return new ErrorModel(registerUserNameExistInfo)
  }

  // 注册 service
  try {
    await createUser({
      userName,
      password: doCrypto(password),
      gender 
    })
    return new SuccessModel()
  } catch (ex) {
    console.log(ex.message, ex.stack)
    return new ErrorModel(registerFailInfo)
  }
}

/**
 * 登陆
 * @param {Object} ctx koa2 ctx
 * @param {string} userName username
 * @param {string} password password
 */
async function login(ctx, userName, password) {
  // 获取用户信息
  const userInfo = await getUserInfo(userName, doCrypto(password))
  if (!userInfo) {
    // 登录失败
    return new ErrorModel(loginFailInfo)
  }

  // 登录成功
  if (ctx.session.userInfo == null) {
    ctx.session.userInfo = userInfo
  }
  return new SuccessModel()
}

/**
 * 删除当前用户
 */
async function deleteCurUser(userName) {
  // service
  const result = await deleteUser(userName)
  if (result) {
    // 成功
    return new SuccessModel()
  }
  // 失败
  return new ErrorModel(deleteUserFailInfo)
}

module.exports = {
  isExist,
  register,
  login,
  deleteCurUser
}