/**
 * Created by Administrator on 2016/11/26.
 */
$('.loginPhoneBoxTop').on('click','.closeBox',function(){
    $('.loginPhoneBox').css({display:'none'});
});



var logVerIsOk=false;
var logPwdIsOk=false;
//登录时，对密码进行的简单初步检测
$(".phoneBoxPwd input").keyup(function(){
    if(!$(this).val()){
        $(".passwordTip").text("");
    }else{
        if($(this).val().length < 6 || $(this).val().length > 16){
            $(".passwordTip").text("长度为6-16个字符");
            $(".passwordTip").css("color", "#e33232");
            logPwdIsOk = false;
        }else{
            $(".passwordTip").text("长度合法");
            $(".passwordTip").css("color", "#69b946");
            logPwdIsOk = true;
        }
    }
});
//点击登录时，执行的操作
$(".loginBtn input[type='button']").click(function(){
    var logBtnIsOk = logPwdIsOk && logVerIsOk;
    if(!$(".phoneBoxText input").val()){
        $(".accountTip").text("帐号不能为空");
        $(".accountTip").css("color", "#e33232");
    }else if(!$(".phoneBoxPwd input").val()){
        $(".passwordTip").text("密码不能为空");
        $(".passwordTip").css("color", "#e33232");
    }else if(!$(".loginValidateInput").val()){
        $(".logVerCodeTip").text("验证码不能为空");
        $(".logVerCodeTip").css("color", "#e33232");
    }else if(logBtnIsOk){
        drawCode();
//登录请求
        $.ajax({
            url:'http://localhost:8888/homePage',
            method:'post',
            headers:{'content-type':'application/x-www-form-urlencoded'},
            dataType: "json",
            data:{
                userName:$('.phoneBoxText input').val(),
                userPwd:$('.phoneBoxPwd input').val()
            },
            success:function(result){
                console.log('成功');
                if(result.length==1){
                    console.log('用户存在');
                        console.log('保存密码');
                        console.log(result[0]);
                        localStorage.setItem('localUserName',result[0].userName);
                        localStorage.setItem('localUserPwd',result[0].userPwd);
                        $('.loginPhoneBox').css({display:'none'});
                    successLoginAfter();
                }
                else {
                    $('.loginInfo').css({display:'block'});
                    drawCode();
                    logVerIsOk=false;
                }
            },
            error:function(err){
                console.log(err);
            }
        });




    }else{
        drawCode();
        alert("登录失败，请检查输入的信息是否正确");
    }
});

//页面加载的时候就生成一个验证码
window.onload = function(){
    drawCode();
};
//点击验证码的时候刷新验证码
$("#myCan").click(function(){
    drawCode();
    //并将验证码输入框和验证码输入提示信息置空
    $(".logVerCodeTip").text("");
    $(".loginValidateInput").val("");
});
//随机生成一个最大值和一个最小值的函数
function randomNum(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}
//随机生成一个颜色的函数
function randomColor(min,max){
    var _r = randomNum(min,max);
    var _g = randomNum(min,max);
    var _b = randomNum(min,max);
    return "rgb("+_r+","+_g+","+_b+")";
}
//绘制验证码的函数
function drawCode(){
    var myCanvas = document.getElementById("myCan");
    var ctx = myCanvas.getContext("2d");
    //生成验证码的源数据
    var _str = "azxcvbnmsdfghjklqwertyuiopZXCVBNMASDFGHJKLQWERTYUIOP0123456789";
    //初始化验证码
    var _picTxt = "";
    //验证码的长度
    var _num = 4;
    //获取canvas的宽和高
    var _width = myCanvas.width;
    var _height = myCanvas.height;
    //绘制验证码的文字对齐方式
    ctx.textBaseline = "bottom";
    //绘制canvas的颜色
    ctx.fillStyle = randomColor(150,240);
    //绘制canvas
    ctx.fillRect(0,0,_width,_height);
    //绘制验证码
    for(var i=0; i<_num; i++){
        var x = (_width-10)/_num*i+5;
        var y = randomNum(_height/2,_height);
        var deg = randomNum(-30,30);
        var txt = _str[randomNum(0,_str.length)];
        _picTxt += txt;
        ctx.fillStyle = randomColor(10,100);
        ctx.font = randomNum(16,30)+"px SimHei";
        ctx.translate(x,y);
        ctx.rotate(deg*Math.PI/180);
        ctx.fillText(txt, 0,0);
        ctx.rotate(-deg*Math.PI/180);
        ctx.translate(-x,-y);
    }
    //在输入验证码时判断是否输入正确
    $(".loginValidateInput").blur(function(){
        if(!$(this).val()){
            $(".logVerCodeTip").text("");
        }else{
            if($(this).val().toLowerCase() == _picTxt.toLowerCase()){
                $(".logVerCodeTip").text("验证码输入正确");
                $(".logVerCodeTip").css("color", "#69b946");
                logVerIsOk = true;
            }else{
                $(".logVerCodeTip").text("验证码输入错误");
                $(".logVerCodeTip").css("color", "#e33232");
                logVerIsOk = false;
            }
        }
    });
    $(".loginValidateInput").focus(function(){
        $(".logVerCodeTip").text("");
    });
    //随机画num条干扰线
    for(var j=0; j<_num; j++){
        ctx.strokeStyle = randomColor(100,180);
        ctx.beginPath();
        ctx.moveTo(randomNum(0,_width), randomNum(0,_height));
        ctx.lineTo(randomNum(0,_width), randomNum(0,_height));
        ctx.stroke();
    }
    //随机生成_num*15个干扰点
    for(var k=0; k<_num*15; k++){
        ctx.fillStyle = randomColor(0,255);
        ctx.beginPath();
        ctx.arc(randomNum(0,_width),randomNum(0,_height), 1, 0, 2*Math.PI);
        ctx.fill();
    }
    return _picTxt;
}
// 为closeBox和other添加点击事件，点击时输入的内容及提示信息置空，登录界面消失
var closeLoginBox = function(){
    //关闭登录框并将输入内容和提示信息置空
    $(".loginPhoneBox").css("display","none");
    $(".phoneBoxText input").val("");
    $(".phoneBoxPwd input").val("");
    $(".accountTip").text("");
    $(".passwordTip").text("");
    $(".loginValidateInput").val("");
    $(".logVerCodeTip").text("");
    //关闭注册框并将输入内容和提示信息置空
    $(".registerBox").css("display","none");
    $(".registerAccInput").val("");
    $(".registerPwdInput").val("");
    $(".validateInput").val("");
    $(".registerAccountTip").text("");
    $(".registerPwdTip").text("");
    $(".validate .verCode").text("");
    $(".validate .verCodeTip").text("");

};
//$(".closeBox").click(function(){
//    closeLoginBox();
//    reGetValidate();
//    $(".validate .getValidate").val("获取短信");
//});
