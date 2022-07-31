$(function () {
    // 获取用户信息
    getUserInfo()
    const layer = layui.layer
    // 退出按钮
    $('.btnLogout').on('click', () => {
        // 弹出确认框
        layer.confirm('确定是否要退出？', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
        });
    })
});

function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'get',
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: res => {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // console.log(res);
            // 渲染头像
            randerUser(res.data)
        }
    })
}
function randerUser(user) {
    const name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        const nameFirst = name[0].toUpperCase()
        $('.text-avatar').html(nameFirst).show()
        $('.layui-nav-img').hide()
    }
}
