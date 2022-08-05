const joi = require("joi");

// 定义分类名称和别名的规则
const name = joi.string().required()
const alias = joi.string().alphanum().required()

// 校验规则对象 - 添加分类
exports.add_cate_schema = {
    body: {
        name,
        alias,
    },
}

// 定义 id 的校验
const id = joi.number().integer().min(1).required()
// 删除
exports.delete_cate_schema = {
    params: {
        id,
    }
}
// 获取分类
exports.get_cate_schema = {
    params: {
        id,
    }
}

// 更新分类
exports.update_cate_schema = {
    body: {
        Id: id,
        name,
        alias,
    }
}