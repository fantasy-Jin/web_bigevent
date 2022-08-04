$(function () {
    var form = layui.form
    // 编辑文章 ，更新填入表格

    // 编辑按钮
    $('#listBody').on('click', '.btnEdit', function () {
        // 获取到文章的 id
        var id = $(this).attr('data-id')
        $.ajax({
            method: 'get',
            url: '/my/article/' + id,
            success: res => {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }


                location.href = '/article/article_pub.html'
                form.rander()
                form.val('pubForm', res.data)
            }
        })
    })

})

