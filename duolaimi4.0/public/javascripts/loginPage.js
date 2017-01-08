/**
 * Created by lx on 2016/10/25.
 */
$('#loginButton').click(function(){
    $.ajax({
        url:'http://localhost:8888/homePage',
        method:'post',
        headers:{'content-type':'application/x-www-form-urlencoded'},
        dataType: "json",
        data:{
            userName:$('#loginUserName').val(),
            userPwd:$('#loginUserPwd').val()
        },
        success:function(result){
            console.log('成功');
           if(result.length==1){
               console.log('用户存在');
               if($('#rember')[0].checked){
                   console.log('保存密码');
                   console.log(result[0]);
                   localStorage.setItem('localUserName',result[0].userName);
                   localStorage.setItem('localUserPwd',result[0].userPwd);
                   window.location='index.html';
               }
           }
            else {
                $('#tishiInfo').html(' 用户名或密码错误！').css({color:'red'}).attr('class','fa fa-minus-circle');
           }
        },
        error:function(err){
            console.log(err);
        }
    });
});