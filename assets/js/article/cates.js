$(function () {
    // 渲染初始化文章分类面板
    const layer = layui.layer
    const form = layui.form
    initCates()
    function initCates() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: res => {
                if (res.status !== 0) {
                    return layer.msg('获取文章分类列表失败！')
                }
                const htmlStr = template('catesList', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    let indexAdd = null
    // 添加分类按钮 弹出确认框事件
    $('.addCate').on('click', () => {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#addInput').html()
        })


    })
    // 通过委托事件代理提交添加分类表单
    $('body').on('submit', '.addForm', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('新增分类失败！')
                }

                initCates()
                layer.msg('新增分类成功！')
                // 根据索引，关闭对应的弹出层
                layer.close(indexAdd)
            }
        })
    })

    // 修改按钮 事件委托
    $('tbody').on('click', '.editBtn', function () {

        // 获取点击对应的 id 然后渲染弹出层表格
        const Id = $(this).attr('data-id')
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + Id,
            success: res => {
                if (res.status !== 0) {
                    return layer.msg('获取文章分类数据失败！')
                }
                form.val('form-edit', res.data)
            }
        })

        // 弹出层
        layer.confirm($('#editInput').html(), { title: '修改文章分类' }, function (index) {
            // 弹出层 确认后的操作 修改文章数据
            $.ajax({
                method: "POST",
                url: '/my/article/updatecate',
                data: $('.editForm').serialize(),
                success: res => {
                    if (res.status !== 0) {
                        return layer.msg('更新分类信息失败')
                    }
                    layer.msg('更新分类信息成功')
                    initCates()
                    layer.close(index);
                }
            })
        });

    })

    // 删除按钮
    $('tbody').on('click', '.delBtn', function () {
        const Id = $(this).attr('data-id')
        layer.confirm('确认删除此分类吗？', { icon: 0, title: '提示' }, function (index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + Id,
                success: res => {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                    layer.close(index);
                    initCates()
                }
            })

        })
    })

})