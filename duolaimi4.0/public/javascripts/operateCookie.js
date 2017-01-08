/**
 * Created by lx on 2016/11/5.
 */
successLoginAfter();

function successLoginAfter(){
var userHeadImg='images/picture/1.jpg';

    if (localStorage.getItem('localUserName') && localStorage.getItem('localUserPwd')) {
        console.log('cookie111');
        $('#navLeft').html('<ul><li><span>你好!</span></li><li><p style="background:url(\{\{headImg\}\}) no-repeat center;background-size:contain "></p></li><li><a href="#/myInformations/tradeState" class="usera">'+localStorage.getItem('localUserName')+'</a></li><li><a href="" id="exitLogin" onclick="exitLogin()">退出登录</a></li></ul>');
       }
}
function exitLogin(){
    localStorage.removeItem('localUserName');
    localStorage.removeItem('localUserPwd');
    $('#navLeft').html('<a id="pleaselogin" href="loginPage.html" target="_blank">亲，请登录</a><a id="pleaseregister" href="register.html" target="_blank">免费注册</a>');
    return false;
}

function sellerCenter(){

    if (localStorage.getItem('localUserName') && localStorage.getItem('localUserPwd')){
        $.ajax({
            url:'/ifSeller',
            type:'POST',
            data:{'userName':getUser()},
            success:function(result){
                if(result=='no'){
                    window.location='http://localhost:8888/dredgePromot.html';
                }
                else if(result=='yes'){
                    console.log('353253');
                    window.location='http://localhost:8888/#/sellerPage/test';
                }
            },
            error:function(e){
                console.log(e);
            }
        });
    }
}

//获取用户名
function getUser(){
    var userName=localStorage.getItem('localUserName');
    return userName;
}