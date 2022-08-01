$(function () {
    const layer = layui.layer
    const form = layui.form
    // 输入框自定义规则
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })


    // 获取用户信息
    getuserinfo()
    function getuserinfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: res => {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                // console.log(res);
                form.val('userInfoForm', res.data)
            }
        })
    }

    // 提交按钮 更新用户信息
    $('.userInfoForm').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: res => {
                if (res.status !== 0) {
                    return layer.msg('提交失败')
                }
                layer.msg('更新成功')
                console.log(res);
                // 更新主页用户名的信息
                window.parent.getUserInfo()
            }
        })
    })

    //重置按钮
    $('.btnReset').on('click', function (e) {
        e.preventDefault()
        getuserinfo()
    })
})