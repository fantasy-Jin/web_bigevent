$(function () {
    //a链接点击事件，显示登录或注册盒子
    $(".link_reg").on('click', function () {
        $('.loginBox').hide()
        $('.regBox').show()
    })
    $(".link_login").on('click', function () {
        $('.regBox').hide()
        $('.loginBox').show()
    })

    //自定义规制
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('.regBox [name=password]').val()
            if (pwd !== value) return '两次密码不一致'
        }
    });

    //监听注册事件
    $('#formReg').on('submit', e => {
        e.preventDefault();
        const data = {
            username: $('#formReg [name=username]').val(),
            password: $('#formReg [name=password]').val(),
        }
        $.post('/api/reguser', data, res => {
            if (res.status !== 0) {
                // console.log(res);
                return layer.msg(res.message)
            }
            layer.msg('注册成功')
            $('.link_login').click()
        })
        // alert(1)
    })

    //监听登录事件
    $('#formlogin').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/api/login',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: res => {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }

                layer.msg('登录成功')
                // 本地存储 token
                localStorage.setItem('token', res.token)
                // 跳转主页 
                location.href = './index.html'
            }
        })
    })
})