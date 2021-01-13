$(function(){
    $('.login-submit').click(async()=>{
       const username=$('#userName').val()
       const password=$('#password').val()
       if (!username || !password) return alert('请完整填写表单')
       if (!/^[a-z0-9]\w{4,11}$/i.test(username) || !/^\w{6,12}$/i.test(password)) return alert('表单不符合规则')
       const { code, nickname } = await $.post('./server/login.php', { username, password }, null, 'json')
       if (!code) return alert('用户名密码错误')
       setCookie('nickname', nickname, 60 * 60 * 24)
       const url = window.sessionStorage.getItem('url')
       window.location.href = `./${ url ? url : 'sy' }.html`
    })
    $('#FREE_TO_REG').click(()=>{
        window.location.href = './zcy.html'
    })

})