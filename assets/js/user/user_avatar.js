$(function () {
    const layer = layui.layer
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }
    // 1.3 创建裁剪区域
    $image.cropper(options)

    $('.uploadBtn').on('click', e => {
        $('#file').click()

    })

    // 检测用户上传文件
    $('#file').on('change', e => {

        // 获取用户选择的文件
        var filelist = e.target.files
        if (filelist.length === 0) {
            return layer.msg('请选择照片')
        }
        // 用户的文件
        var file = e.target.files[0]

        // 根据文件创建一个url地址
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域

    })

    // 上传服务器更新头像
    $('.confirmBtn').on('click', () => {
        // 1. 要拿到用户裁剪之后的头像
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        // 调用接口
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: res => {
                if (res.status !== 0) {
                    return layer.msg('更新头像失败')
                }
                layer.msg('更新头像成功')
                window.parent.getUserInfo()
            }
        })
    })



})