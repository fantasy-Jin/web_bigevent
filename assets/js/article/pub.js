var layer = layui.layer
var form = layui.form
$(function () {
    // 初始化富文本编辑器
    initEditor()
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)


    // 渲染 文章分类下拉列表
    function getCates() {
        $.ajax({
            method: 'GET',
            url: "/my/article/cates",
            success: res => {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                const htmlStr = template('cateList', res)
                $('[name=cate_id]').html(htmlStr)
                // 重新渲染表单
                form.render()
            }
        })
    }
    getCates()

    // 选择封面按钮 点击触发文件 input
    $('.selPic').on('click', function () {
        $('#coverFile').click()
    })

    // 监听文件上传事件
    $("#coverFile").on('change', function (e) {
        // 获取文件列表的数组
        const files = e.target.files
        // 判断用户是否选择文件
        if (files.length === 0) {
            return
        }
        // 根据文件，创建对应的 URL 地址
        var newImgURL = URL.createObjectURL(files[0])
        // 为裁剪区域重新设置图片
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域

    })
    // 定义文章的发布状态：
    var art_state = '已发布'

    $('#btnSave2').on('click', function () {
        art_state = '草稿'
    })

    // 表单提交
    $('#pubForm').on('submit', function (e) {
        e.preventDefault()
        // 基于 form 表单 转化成原生 dom 快速创建一个formData对象
        const fd = new FormData($(this)[0])

        // 3. 将文章的发布状态，存到 fd 中
        fd.append('state', art_state)

        // 4. 将封面裁剪过后的图片，输出为一个文件对象
        $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 5. 将文件对象，存储到 fd 中
                fd.append('cover_img', blob)
                // 6. 发起 ajax 数据请求
                pubSubmit(fd)
            })
    })


    // 发布文章的方法
    function pubSubmit(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            // 注意：如果向服务器提交的是 FormData 格式的数据，
            // 必须添加以下两个配置项
            contentType: false,
            processData: false,
            success: res => {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('发布文章成功！')
                location.href = '/article/article_list.html'
            }
        })
    }


});

