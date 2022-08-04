/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */
// 导入数据库
const db = require('../db/index')

// 导入生成 token 的包
const jwt = require('jsonwebtoken')
// 导入配置 token 配置文件
const config = require('../config')



// 加密密码 bcrypt 模块
const bcrypt = require('bcryptjs')
// 注册用户处理函数
exports.regUser = (req, res) => {

    // 注册
    // 接受表单信息
    const userinfo = req.body

    // 1.检测表单数据是否合法
    // if (!userinfo.username || !userinfo.password) {
    //     // return res.send({ status: 1, message: '用户名或密码不能为空！' })
    //     return res.cc('用户名或密码不能为空！')
    // }
    // 2.检测用户名是否被占用
    // 定义sql语句
    const sql = `select * from ev_users where username=?`
    // 执行sql语句判断
    db.query(sql, [userinfo.username], (err, results) => {
        // sql 失败
        if (err) {
            // return res.send({ status: 1, message: err.message })
            return res.cc(err)
        }
        // 用户名被占用
        if (results.length > 0) {
            // return res.send({ status: 1, message: '用户名被占用，请更换用户名！' })
            return res.cc('用户名被占用，请更换用户名！')
        }
        // 3.对密码进行加密处理
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        // 4.插入新用户
        // 定义插入新用户的 sql 语句
        const sql = 'insert into ev_users set ?'
        db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
            if (err) {
                // return res.send({ status: 1, message: err.message })
                return res.cc(err)
            }
            if (results.affectedRows !== 1) {
                // return res.send({ status: 1, message: '注册失败！' })
                return res.cc('注册失败！')
            }
            // res.send({ status: 0, message: '注册成功' })
            res.cc('注册成功', 0)
        })

    })


}


// 登录处理函数
exports.login = (req, res) => {
    // 表单信息
    const userinfo = req.body
    // sql 语句 查询名字
    const sql = `select * from ev_users where username=?`
    // 执行 sql 语句查询
    db.query(sql, userinfo.username, (err, results) => {
        // sql 失败
        if (err) return res.css(err)
        // sql 成功
        if (results.length !== 1) {
            return res.cc('登录失败，用户不存在！')
        }
        // 验证密码
        // crypt.compareSync(用户提交的密码, 数据库中的密码) 方法比较密码是否一致 返回值是布尔值
        // 拿着用户输入的密码,和数据库中存储的密码进行对比
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        // 如果对比的结果等于 false, 则证明用户输入的密码错误
        if (!compareResult) {
            return res.cc('登录失败，密码错误')
        }
        //  去除结果中的密码和头像，用于生成token
        const user = { ...results[0], password: '', user_pic: '' }
        // 生成加密字符串 token
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: '10h', //token 有效期
        })

        // 响应给客户端
        res.send({
            status: 0,
            message: '登录成功！',
            token: 'Bearer ' + tokenStr
        })
    })


}