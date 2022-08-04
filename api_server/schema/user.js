// 用户信息验证规则模块 不采用if...else判断
const joi = require("joi");

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */

// 用户名
const username = joi.string().alphanum().min(1).max(10).required()
// 密码
const password = joi
    .string()
    .pattern(/^[\S]{6,12}$/)
    .required()


// 共享对象出去
exports.reg_login_schema = {
    body: {
        username,
        password
    },
}

// 用户更新信息的表单数据规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

// 共享
exports.updata_userinfo_schema = {
    body: {
        id,
        nickname,
        email,
    },
}

// 重置密码：新旧密码不一致
exports.update_password_schema = {
    body: {
        // 使用 password 这个规则，验证 req.body.oldPwd 的值
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password)
        // 解读：
        // 1. joi.ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
        // 2. joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
        // 3. .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则

    }
}

// 用户头像 base64 格式
// dataUri() 指的是如下格式的字符串数据：
// data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=

const avatar = joi.string().dataUri().required()
exports.updata_avatar_schema = {
    body: {
        avatar,
    },
}