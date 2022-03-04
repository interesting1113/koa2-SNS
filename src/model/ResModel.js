/**
 * @description res model
 * @author sylviayang
 */

/**
 * 基础模块
 */
class BaseModel {
  constructor ({errno, data, message}) {
    this.errno = errno
    if (data) {
      this.data = data
    }
    if (message) {
      this.message = message
    }
  }
}

/**
 *成功数据类型
 */
class SuccessModel extends BaseModel {
  constructor(data = {}) {
    super({
      errno: 0,
      data
    })
  }
}

/**
 * 失败数据类型
 */
class ErrorModel extends BaseModel {
  constructor({ error, message}) {
    super({
      error,
      message
    })
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}