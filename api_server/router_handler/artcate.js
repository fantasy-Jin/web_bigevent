const db = require('../db/index')
// 获取文章列表
exports.getArticleCates = (req, res) => {
    // 定义 sql 语句
    const sql = `select * from ev_article_cate where is_delete=0 order by id asc`
    // 执行
    db.query(sql, (err, results) => {
        if (err) { return res.cc(err) }
        // 成功
        res.send({
            status: 0,
            message: '获取文章列表成功',
            data: results,
        })
    })
}

// 新增文章分类
exports.addArticleCates = (req, res) => {
    // 定义查询 分类名称与别名是否被占用的 sql 语句
    const sql = `select * from ev_article_cate where name=? or alias=?`
    db.query(sql, [req.body.name, req.body.alias], (err, results) => {
        if (err) { return res.cc(err) }

        // 分类名字和别名都被占用
        if (results.length === 2) { return res.cc('分类名称和别名都被占用了') }
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) { return res.cc('分类名称和别名都被占用了') }
        // 分类名称或别名被占用
        if (results.length === 1 && results[0].name === req.body.name) { return res.cc('分类名称被占用') }
        if (results.length === 1 && results[0].alias === req.body.alias) { return res.cc('分类别名被占用') }

        // 没有重复的名称和别名
        // 定义新增的 sql 语句
        const sql = `insert into ev_article_cate set ?`
        db.query(sql, req.body, (err, results) => {
            if (err) { return res.cc(err) }
            if (results.affectedRows !== 1) { return res.cc('新增文章分类失败') }
            res.cc('新增文章分类成功', 0)
        })

    })
}

// 删除文章分类
exports.deleteCateById = (req, res) => {
    // 定义 sql 语句
    const sql = `update ev_article_cate set is_delete=1 where id=?`
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) { return res.cc('删除文章分类失败') }
        res.cc('删除文章分类成功', 0)
    })
}

// 获取文章分类信息
exports.getArtCateById = (req, res) => {
    //    定义查询分类 sql
    const sql = `select * from ev_article_cate where id=?`
    db.query(sql, req.params.id, (err, results) => {
        if (err) { return res.cc(err) }
        if (results.length !== 1) { return res.cc('获取文章分类数据失败') }
        res.send({
            status: 0,
            message: '获取文章分类数据成功',
            data: results[0],
        })
    })
}

// 更新分类
exports.updataCates = (req, res) => {
    //排除此 id 的名称和别名后 查询 分类名称 与 分类别名 是否被占用的 SQL 语句 
    const sql = `select * from ev_article_cate where Id<>? and (name=? or alias=?)`
    db.query(sql, [req.body.Id, req.body.name, req.body.alias], (err, results) => {
        if (err) { return res.cc(err) }

        // 分类名字和别名都被占用
        if (results.length === 2) { return res.cc('分类名称和别名都被占用了') }
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) { return res.cc('分类名称和别名都被占用了') }
        // 分类名称或别名被占用
        if (results.length === 1 && results[0].name === req.body.name) { return res.cc('分类名称被占用') }
        if (results.length === 1 && results[0].alias === req.body.alias) { return res.cc('分类别名被占用') }

        // 没有重复的名称和别名
        // 定义更新的 sql 语句
        const sql = `update ev_article_cate set ? where Id=?`
        db.query(sql, [req.body, req.body.Id], (err, results) => {
            if (err) { return res.cc(err) }
            // SQL 语句执行成功，但是影响行数不等于 1
            if (results.affectedRows !== 1) return res.cc('更新文章分类失败！')
            // 更新文章分类成功
            res.cc('更新文章分类成功！', 0)
        })
    })
}