// 点击注册
$('#link_reg').on('click',function(){
  $('.login-box').hide()
  $('.reg-box').show()
})
// 点击登录
$('#link_login').on('click',function(){
  $('.login-box').show()
  $('.reg-box').hide()
})
/* 自定义验证 */
/* 获取验证对象 */
const form = layui.form
// 通过form.verify()定义验证规则
form.verify({
  pwd: [/^[\S]{6,12}$/, '密码必须6到12位且不能出现空格'],
  repwd:function(value){
    const pwd =$('.reg-box [name=password]').val()
    if(pwd !== value){
      return '两次密码不一致'
    }
  }
}
  
)
// 发起ajax注册请求
// 注册layer
const layer = layui.layer
// 监听事件
$('#form_reg').on('submit',function(e){
  // 1. 阻止默认的提交行为
e.preventDefault()

// 2. 发起Ajax的POST请求
const data = {
  username:$('#form_reg [name=username]').val(),
  password:$('#form_reg [name=password]').val()
}
$.post('/api/reguser', data,
function(res){
  if (res.status !== 0) {
    return layer.msg(res.message)
    }
    layer.msg('注册成功，请登录！')
    $('#link_login').click()
}
)
})

// 登录事件
$('#form_login').on('submit',function(e){
  // 1. 阻止默认的提交行为
e.preventDefault()
  $.ajax({
    url:'/api/login',
    method:'POST',
    // 快速获取表单的数据
    data:$(this).serialize(),
    success:function(res){
      if (res.status !== 0){
        return layer.msg('登录失败')
      }
      layer.msg('登录成功')
      // 将token保管在本地
      localStorage.setItem('tolen',res.token)
      // 调转后台
      location.href = '/code/index.html'
    }
    

  })
})
