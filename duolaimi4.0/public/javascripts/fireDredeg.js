/**
 * Created by lx on 2016/11/8.
 */
var pass= true;



$('#userName').val(getUser());
$('#realName').focus(function(){
    $('#realNameInfo').html('').removeClass('fa fa-info-circle');
});
$('#realName').blur(function(){
    if(this.value.toString().trim()==''){
        $('#realNameInfo').html(' 请输入你的真实姓名').attr('class','fa fa-info-circle').css('color','red');
        console.log('123');
    }
    else {
        $('#realNameInfo').html('').removeClass('fa fa-info-circle');
        console.log('456');
    }
});
$('#cardID').focus(function(){
    $('#cardIDInfo').html('').removeClass('fa fa-minus-circle');
});
$('#cardID').blur(function(){
    var num=this.value;

    IdentityCodeValid(num);
});
function IdentityCodeValid(code) {
    var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
    var tip = "";


    if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
        tip = "身份证号格式错误";
        pass = false;
    }

    else if(!city[code.substr(0,2)]){
        tip = "地址编码错误";
        pass = false;
    }
    else{
        //18位身份证需要验证最后一位校验位
        if(code.length == 18){
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
            //校验位
            var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++)
            {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }
            var last = parity[sum % 11];
            if(parity[sum % 11] != code[17]){
                tip = "校验位错误";
                pass =false;
            }
        }
    }
    if(!pass) {
        $('#cardIDInfo').html(' 你输入的身份证号码不合法').attr('class','fa fa-info-circle').css('color','red');
    }
    return pass;
}
$('#shopName').focus(function(){
    $('#shopNameInfo').html('').removeClass('fa fa-info-circle');
});
$('#shopName').blur(function(){
    if(!/^[\u4E00-\u9FA5A-Za-z0-9_]+$/.test($('#shopName').val())){
        $('#shopNameInfo').html(' 你输入的店铺名不合法').attr('class','fa fa-info-circle').css('color','red');
    }else {
        $('#shopNameInfo').html('').removeClass('fa fa-info-circle');
    }

});


//$('#argument').is(':checked')
$('#argument').change(function(){
    if($('#argument').is(':checked')==true){
        $('#argumentInfo').html('').removeClass('fa fa-info-circle');
    }
});
$('#freeDredge').click(function(){
    if($('#realName').val().toString().trim()==''){
        $('#realNameInfo').html(' 请输入你的真实姓名').attr('class','fa fa-info-circle').css('color','red');
    }else if($('#cardID').val().toString().trim()==''){
        $('#cardIDInfo').html(' 请输入你的省份证号码').attr('class','fa fa-info-circle').css('color','red');
    }else if($('#shopName').val().toString().trim()==''){
        $('#shopNameInfo').html(' 请输入你的店铺名').attr('class','fa fa-info-circle').css('color','red');
    }else  if($('#argument').is(':checked')==false){
        $('#argumentInfo').html(' 请勾选协议').attr('class','fa fa-info-circle').css('color','red');
    }else if(pass){
        var formData = new FormData($("#submitForm")[0]);
        $.ajax({
            url: 'http://localhost:8888/freeDredge' ,
            type: 'POST',
            data: formData,
            cache: false,
            contentType:false,
            processData: false,
            success: function (returndata) {
                console.log(returndata);
            },
            error: function (returndata) {
                console.log(returndata);
            }
        });
    }

});