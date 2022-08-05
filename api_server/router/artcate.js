const express = require('express')
// 创建路由对象
const router = express.Router()

// 导入处理函数
const artcate_handler = require('../router_handler/artcate')

// 导入验证数据
const expressJoi = require('@escook/express-joi')
const { add_cate_schema } = require('../schema/artcate')
// 获取文章分类
router.get('/cates', artcate_handler.getArticleCates)
// 新增文章分类
router.post('/addcates', expressJoi(add_cate_schema), artcate_handler.addArticleCates)

// 删除文章分类
// 导入验证 id 规则
const { delete_cate_schema } = require('../schema/artcate')
router.get('/deletecate/:id', expressJoi(delete_cate_schema), artcate_handler.deleteCateById)

// 获取文章分类 通过id
// 导入验证 id 规则
const { get_cate_schema } = require('../schema/artcate')
router.get('/cates/:id', expressJoi(get_cate_schema), artcate_handler.getArtCateById)

// 更新文章分类
const { update_cate_schema } = require('../schema/artcate')
router.post('/updatecate', expressJoi(update_cate_schema), artcate_handler.updataCates)
// 共享
module.exports = router