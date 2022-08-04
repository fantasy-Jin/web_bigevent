const experss = require("express")
// 创建路由对象
const router = experss.Router()

// 导入处理函数
const userHandler = require('../router_handler/user')

// 导入表单验证的中间间
const experssJoi = require('@escook/express-joi')
// 导入验证规则对象
const { reg_login_schema } = require('../schema/user')

// 注册新用户 采用局部中间件验证表单
router.post('/reguser', experssJoi(reg_login_schema), userHandler.regUser)

// 登录 采用局部中间件验证表单
router.post('/login', experssJoi(reg_login_schema), userHandler.login)

// 导出共享
module.exports = router