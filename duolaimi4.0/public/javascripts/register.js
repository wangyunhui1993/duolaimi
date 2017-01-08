//var allTest=false;
var user_name_status=false;
var form_password_status=false;
var form_password_re_status=false;
var form_phone_status=false;
var form_autocode_status=false;
var phoneCode_status=false;
var argument=true;
var justify=true;
var phoneTest;
//用户名验证
$('#form_counter')[0].onfocus=function(){//得到焦点的事件
	if(this.value==''){
		this.setAttribute("placeholder","");
		$('#form_counter_error').html('支持中文、字母、数字、"-""_"的组合，4-20个字符').removeClass('fa fa-minus-circle').attr('class','fa fa-info-circle').css('color','#c0c0c0');
	}
}
$('#form_counter')[0].onblur=function(){//失去焦点的事件
	if(this.value==''){
		this.setAttribute("placeholder","您的账户名和登录名");
		$('#form_counter_error')[0].innerHTML='';
		$('#form_counter_error')[0].removeAttribute('class','fa fa-info-circle');
		user_name_status=false;
	}
	else if (20 < this.value.length || this.value.length < 4) {
			$('#form_counter_error')[0].removeAttribute('class', 'fa fa-info-circle');
			$('#form_counter_error')[0].setAttribute('class', 'fa fa-minus-circle');
			$('#form_counter_error')[0].innerHTML = '长度只能在4到20个字符之间';
			$('#form_counter_error')[0].style.color = 'red';
		user_name_status=false;
		}

	else{ if(4<=this.value.length&&this.value.length<=20) {
		$.ajax({
			url:'http://localhost:8888/usercheck',
			method:'post',
			headers:{'content-type':'application/x-www-form-urlencoded'},
			dataType: "json",
			data:{
				userName:$('#form_counter').val()
			},
			success:function(result){
				console.log(result);
				if(result.length>=1){
					$('#form_counter_error')[0].removeAttribute('class', 'fa fa-info-circle');
					$('#form_counter_error')[0].setAttribute('class', 'fa fa-minus-circle');
					$('#form_counter_error')[0].innerHTML = '此用户名已被占用！';
					$('#form_counter_error')[0].style.color = 'red';
				}
				else{
					$('#form_counter_error')[0].removeAttribute('class', 'fa fa-info-circle');
					$('#form_counter_error')[0].removeAttribute('class', 'fa fa-minus-circle');
					$('#form_counter_error')[0].innerHTML = '';
					user_name_status=true;

				}
			},
			error:function(err){
				console.log(err);
			}
		});

	}
	else {user_name_status=false;}
}
}
$('#form_counter').keyup(function(){//键盘事件
	var reg=/\w|-|_|[\u4e00-\u9fa5]/;
	if(this.value==''){
		$('#form_counter_error')[0].removeAttribute('class','fa fa-minus-circle');
		$('#form_counter_error')[0].innerHTML='支持中文、字母、数字、"-""_"的组合，4-20个字符';
		$('#form_counter_error')[0].setAttribute('class','fa fa-info-circle');
		$('#form_counter_error')[0].style.color='#c0c0c0';
	}else if(this.value.length>20){
		this.value=this.value.substr(0,20);
	}
	else{
		for(var i=0;i<this.value.length;i++){
			if(reg.test(this.value.substr(i,1))==false){
				$('#form_counter_error')[0].removeAttribute('class','fa fa-info-circle');
				$('#form_counter_error')[0].setAttribute('class','fa fa-minus-circle');
				$('#form_counter_error')[0].innerHTML='格式错误，仅支持汉字、字母、数字、“-”“_”的组合';
				$('#form_counter_error')[0].style.color='red';	
			}
			else{
				$('#form_counter_error')[0].removeAttribute('class','fa fa-minus-circle');
				$('#form_counter_error')[0].innerHTML='支持中文、字母、数字、"-""_"的组合，4-20个字符';
				$('#form_counter_error')[0].setAttribute('class','fa fa-info-circle');
				$('#form_counter_error')[0].style.color='#c0c0c0';
			}
		}
	}
	
});
//密码验证
$('#form_password').focus(function(){
	if(this.value==''){
		this.setAttribute("placeholder","");
		$('#form_password_info').removeClass('fa fa-minus-circle').attr('class','fa fa-info-circle').css('color','#c0c0c0').html('建议使用字母、数字和符号两种以上的组合，6-20个字符');
	}
});
$('#form_password').blur(function(){
	if(this.value==''){
		form_password_status = false;
		this.setAttribute("placeholder"," 建议至少使用两种字符组合");
		$('#form_password_info').removeClass('fa fa-minus-circle fa-info-circle').html('');

	}
	else if(this.value.length>20||this.value.length<6){
		$('#form_password_info').html(' 长度只能在6-20个字符之间').css('color','red').attr('class','fa fa-minus-circle').removeClass('fa-info-circle');
		form_password_status = false;
	}
	else {
		if (this.value.length >= 6 && this.value.length <= 20) {
			$('#form_password_info').removeClass('fa fa-minus-circle fa-info-circle').html('');
			form_password_status = true;
		}
		else {
			form_password_status = false;
		}
	}
});
$('#form_password').keyup(function(){
	$('#form_password_info').removeClass('fa fa-minus-circle').attr('class','fa fa-info-circle').css('color','#c0c0c0').html(' 建议使用字母、数字和符号两种以上的组合，6-20个字符');
});



$('#form_password').keyup(function(){
	if(this.value>=6){
		$('#form_password_info').removeClass('fa fa-minus-circle fa-info-circle').html('');
	}
});
//确认密码验证
$('#form_password_re').focus(function(){
	if(this.value==''){
		this.setAttribute("placeholder","");
		$('#form_password_re_info').removeClass('fa fa-minus-circle').attr('class','fa fa-info-circle').css('color','#c0c0c0').html(' 请再次输入密码');
	}
});
$('#form_password_re').blur(function(){
	if(this.value==''){
		this.setAttribute("placeholder","请再次输入密码");
		form_password_re_status=false;
	}
	if($('#form_password').val()!=$('#form_password_re').val()){
		$('#form_password_re_info').html(' 两次密码输入不一致').css('color','red').attr('class','fa fa-minus-circle');
		form_password_re_status=false;
	}
	else{
		$('#form_password_re_info').html('').removeClass('fa fa-minus-circle fa-info-circle');
		form_password_re_status=true;
	}
});
//手机号
$('#form_phone').focus(function(){
	this.setAttribute("placeholder","");
	$('#form_phone_info').html('完成验证后，可以使用改手机号登录和找会密码').removeClass('fa fa-minus-circle').attr('class','fa fa-info-circle').css('color','#c0c0c0');
});
$('#form_phone').blur(function(){
	if(this.value==''){
		form_phone_status=false;
		this.setAttribute("placeholder","建议使用常用手机");
		$('#form_phone_info').html('').removeClass('fa fa-minus-circle fa-info-circle');
	}else{
		var phoneHead=[134,135,136,137,138,139,150,151,152,158,159,157,182,187,188,147,130,131,132,155,156,185,186,133,153,180,189];
	var reg=/\d{11}/;
	if(!(reg.test(this.value))){
		$('#form_phone_info').html('格式有误').css('color','red').removeClass('fa-info-circle').attr('class','fa fa-minus-circle');
	}
	else{

		var phoneHeadStr=this.value.substr(0,3);
		for(var i=0;i<phoneHead.length;i++){
			if(phoneHead[i]==phoneHeadStr){
				justify=false;
			}
		}
		if(justify){
			$('#form_phone_info').html('格式有误').css('color','red').removeClass('fa-info-circle').attr('class','fa fa-minus-circle');
			form_phone_status=false;
		}else{
			$('#form_phone_info').html('').removeClass('fa fa-minus-circle fa-info-circle');
			form_phone_status=true;
		}
	}
	}
	
});

//验证码
onload=function(){
	createCode();
}
$('#creatCode').click(function(){ 
	createCode();
});
function createCode(){
	form_autocode_status=false;
	$('#form_autocode').val('').attr("placeholder","请输入验证码");
	$('#form_autocode_info>span').html('').removeClass('fa fa-minus-circle fa-info-circle');

	code = new Array();
var codeLength = 4;//验证码的长度
var checkCode = document.getElementById("creatCode");
checkCode.value = "";

var selectChar = new Array(2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z');

for(var i=0;i<codeLength;i++) {
   var charIndex = Math.floor(Math.random()*32);
   code +=selectChar[charIndex];
}
if(code.length != codeLength){
   createCode();
}
checkCode.innerHTML = code;
}
$('#form_autocode').focus(function(){
	if(this.value=='') {
		form_autocode_status=false;
		this.setAttribute("placeholder", "");
		$('#form_autocode_info>span').html(' 看不清楚？点击图片更换验证码').removeClass('fa fa-minus-circle').attr('class', 'fa fa-info-circle').css('color','#c0c0c0');
	}else{

	}
});
$('#form_autocode').blur(function(){
	if(this.value==''){
		this.setAttribute("placeholder","请输入验证码");
		$('#form_autocode_info>span').html('').removeClass('fa fa-minus-circle fa fa-info-circle');
		form_autocode_status=false;
	}else{
		if(this.value.toUpperCase()!=code){
			//console.log(code);
			$('#form_autocode_info>span').html(' 验证码错误').removeClass('fa fa-info-circle').attr('class','fa fa-minus-circle').css('color','red');
			form_autocode_status=false;
		}
		else{
			$('#form_autocode_info>span').html('').removeClass('fa fa-minus-circle fa fa-info-circle');
			form_autocode_status=true;
		}
	}
});



//手机验证码
$('#phoneCode').click(function(){
	if(!justify){
		var timer=120;
//发送验证码请求
		phoneTest=Math.ceil(Math.random()*9)*1000+Math.floor(Math.random()*10)*100+Math.floor(Math.random()*10)*10+Math.floor(Math.random()*10);
		var phonecode=$('#form_phone').val();
		var contenttext='您好，您的验证码是：'+phoneTest+'，请不要告诉其他人，如果不是您本人操作，请忽略本条短信！';
		var contentUri=encodeURI(contenttext);
		//console.log(phonecode);
		console.log(phoneTest);
		var url = 'http://m.5c.com.cn/api/send/index.php?format=json&data={"type":"send","apikey":"e1edb78fa377c55cd10e6661fd34d8a3","' +
			'username":"duolami","password_md5":"d68197098e5ffeed3f2a89d165ad60f2","encode":"UTF-8","mobile":"'+phonecode+'",' +
			'"content":"'+contentUri+'"}';
		$.ajax({
			url:url,
			type:'POST',
			data:'aa',
			success:function(result){
				console.log(JSON.parse(result));
			},
			error:function(e){
				console.log(e);
			}
		});
//	this.style.disabled='disabled';
		$('#phoneCode').attr('disabled','disabled');
		var settime=setInterval(function(){
			$('#phoneCode').val(timer+'s后重新获取');
			if(timer==0){
				$('#phoneCode').removeAttr('disabled');
				clearInterval(settime);
				$('#phoneCode').val('获取验证码');
			}
			timer--;
		},1000);
	}else{
		$('#form_phone_info').html(' 请输入正确的手机号').css('color','red').removeClass('fa-info-circle').attr('class','fa fa-minus-circle');
	}

});
$('#xieyi').click(function(){
	if(this.checked==false){
		console.log(this.parentNode);
	document.getElementById('agreement').style.border='1px red solid';
		argument=false;
	}
	else if (this.checked==true){
		document.getElementById('agreement').style.border='1px white solid';
		argument=true;
	}
});
$('#instantregister').click(function(){
	//console.log(':用户名'+user_name_status);
	//console.log('密码:'+form_password_status);
	//console.log('确认密码:'+form_password_re_status);
	//console.log('手机号:'+form_phone_status);
	//console.log('验证码:'+form_autocode_status);
	//console.log('协议:'+argument);
if(user_name_status&&form_password_status&&form_password_re_status&&form_phone_status&&form_autocode_status&&argument){
	if(phoneTest==$('#form_phonecode').val()){
		$.ajax({
			url:'http://localhost:8888/ucenter',
			method:'post',
			headers:{'content-type':'application/x-www-form-urlencoded'},
			dataType: "json",
			data:{
				userName:$('#form_counter').val(),
				userPwd:$('#form_password').val(),
				userPhone:$('#form_phone').val()
			},
			success:function(result){
				console.log('成功');
				localStorage.setItem('localUserName',$('#form_counter').val());
				localStorage.setItem('localUserPwd',$('#form_password').val());
				window.location='http://localhost:8888/ucenter.html';
			},
			error:function(err){
				console.log(err);
			}
		});

	}
	else {
		$('#form_phone_test_info').html(' 手机验证码错误').css('color','red').removeClass('fa-info-circle').attr('class','fa fa-minus-circle');
	}


}
    //
	//if(phoneTest==$('#form_phonecode').val()){
    //
	//}
	//else {
	//	$('#form_phone_test_info').html(' 手机验证码错误').css('color','red').removeClass('fa-info-circle').attr('class','fa fa-minus-circle');
	//}
	//console.log(user_name_status&&form_password_status&&form_password_re_status&&form_phone_status&&form_autocode_status&&argument);
});


