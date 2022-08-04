const express = require('express')
// 创建路由对象
const router = express.Router()

// 导入处理函数
const userinfo_handler = require('../router_handler/userinfo')

// 获取用户基本信息
router.get('/userinfo', userinfo_handler.getUserinfo)


// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入验证更新规则对象
const { updata_userinfo_schema } = require('../schema/user')

// 更新用户信息
router.post('/userinfo', expressJoi(updata_userinfo_schema), userinfo_handler.updataUserinfo)


// 导入重置密码规则对象
const { update_password_schema } = require('../schema/user')
// 更新重置密码
router.post('/updatepwd', expressJoi(update_password_schema), userinfo_handler.updataPassword)

// 更新头像
// 导入头像格式验证的模块对象
const { updata_avatar_schema } = require('../schema/user')
router.post('/update/avatar', expressJoi(updata_avatar_schema), userinfo_handler.updateAvatar)

// 共享
module.exports = router