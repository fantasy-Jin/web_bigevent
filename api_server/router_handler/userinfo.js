// 导入数据库
const db = require('../db/index')
// 密码加密模块
const bcrypt = require('bcryptjs')
// 获取用户基本信息
exports.getUserinfo = (req, res) => {
    //    定义 sql 查询语句 排除密码
    const sql = `select id, username, nickname, email, user_pic from ev_users where id=?`
    // 执行 sql
    // req 对象上的 user 属性，是 Token 解析成功
    // express-jwt 中间件帮我们挂载上去的
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) {
            return res.cc('获取用户信息失败')
        }
        // 成功后响应给客户端
        res.send({
            status: 0,
            message: '获取用户信息成功',
            data: results[0],
        })
    })
}

// 更新用户信息
exports.updataUserinfo = (req, res) => {
    //    定义执行的 sql 语句
    const sql = `update ev_users set ? where id=?`
    db.query(sql, [req.body, req.body.id], (err, results) => {
        if (err) { return res.cc(err) }
        if (results.affectedRows !== 1) { return res.cc('修改基本信息失败') }
        // 执行成功
        return res.cc('修改用户信息成功', 0)
    })
}

// 重置密码
exports.updataPassword = (req, res) => {
    //    定义 sql语句  查询用户是否存在
    const sql = `select * from ev_users where id=?`
    db.query(sql, req.user.id, (err, results) => {
        if (err) { return res.cc(err) }
        if (results.length !== 1) { return res.cc('用户不存在！') }
        // 判断提交的旧密码是否正确
        const compareResults = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if (!compareResults) { return res.cc('原密码错误') }

        // 旧密码正确
        // 定义更新密码的 sql
        const sql = `update ev_users set password=? where id=?`
        // 对新密码就行加密
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        // 执行 sql 更新对应 id 用户的密码
        db.query(sql, [newPwd, req.user.id], (err, results) => {
            if (err) { return res.cc(err) }
            if (results.affectedRows !== 1) { return res.cc('更新密码失败！') }
            res.cc('更新密码成功')
        })

    })
}

// 更新头像
exports.updateAvatar = (req, res) => {
    //  定义 sql 语句
    const sql = `update ev_users set user_pic=? where id=?`
    db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
        if (err) { return res.cc(err) }
        if (results.affectedRows !== 1) { return res.cc('更新头像失败') }
        return res.cc('更新头像成功')
    })
}