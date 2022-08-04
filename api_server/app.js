const express = require("express")
const app = express()
const joi = require('joi')
// 跨域处理 cors
const cors = require("cors")
app.use(cors())

// 配置解析表单的中间件
app.use(express.urlencoded({ extended: false }))

// 响应中间件，简化代码，实现 res.send() 功能
app.use((req, res, next) => {
    // status = 0 为成功，1为失败 ，默认1，方便处理失败的情况
    res.cc = function (err, status = 1) {
        res.send({
            // 状态
            status,
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})

// 导入 token 配置文件
const config = require('./config')

// 导入解析 token 的中间件
const experssJWT = require('express-jwt')

// 使用 unless排除 /api 接口不用 token 认证
app.use(experssJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))
// 导入注册登录路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

// 错误中间件
app.use(function (err, req, res, next) {
    // 数据验证失败
    if (err instanceof joi.ValidationError) return res.cc(err)
    // token 身份认证失败
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败')
    // 未知错误
    res.cc(err)
})
// 启动服务器
app.listen(3007, function () {
    console.log('api server running at http://127.0.0.1:3007');
})