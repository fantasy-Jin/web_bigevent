$(function () {
    const form = layui.form
    const layer = layui.layer
    // 输入框自定义规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致！'
            }
        }
    })

    // 表单提交

    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: res => {
                if (res.status !== 0) {
                    return layer.msg('更新密码失败')
                }
                return layer.msg('更新密码成功')
            }
        })
    })

})