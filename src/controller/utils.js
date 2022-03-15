/**
 * @description utils controller
 * @author sylviayang
 */

const { ErrorModel } = require("../model/ResModel")
const { uploadFileSizeFailInfo } = require("../model/ErrorInfo")
const fse = require('fs-extra')

const MAX_SIZE = 1024 * 1024 * 1024

/**
 * 保存文件
 * @param {string} name 
 * @param {string} type 
 * @param {number} size 
 * @param {string} filePath 
 * @returns 
 */
async function saveFile({ name, type, size, filePath }) {
  if (size > MAX_SIZE) {
    await fse.remove(filePath)
    return new ErrorModel(uploadFileSizeFailInfo)
  }
}

module.exports = {
  saveFile
}