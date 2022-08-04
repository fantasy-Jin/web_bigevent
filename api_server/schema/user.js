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