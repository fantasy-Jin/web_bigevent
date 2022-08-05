// 每次调用 Ajax 请求时 都会先调用  ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    // options.url = 'http://www.liulongbin.top:3007' + options.url
    // options.url = 'http://127.0.0.1:3007' + options.url

    // 为有权限的接口统一加headers
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 防止没有权限的 进入后台主页
    // 全局统一挂载 complete 回调函数
    options.complete = res => {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1. 强制清空 token
            localStorage.removeItem('token')
            // 2. 强制跳转到登录页面
            location.href = '/login.html'
        }
    }
})