/**
 * Created by lx on 2016/11/2.
 */
var title=false;
var type=false;
var Tocrowd=false;
var Brand=false;
var Season=false;
var address=false;
var Age=false;
var Height=false;
var commodityTypeArr=['传统布鞋','帆布鞋','凉鞋','棉鞋','皮鞋','亲子鞋','拖鞋','舞蹈鞋','学步鞋','靴子/雪地鞋','运动鞋','雨鞋'];
var reference_height_list=$('#reference_height_list_ul')[0];
//身高选择
    $('#commodityType').change(function(){

//console.log(reference_height_list);
        var test=false;
        for(var j=0;j<commodityTypeArr.length;j++){
            if($('#commodityType').val()==commodityTypeArr[j]){
                test=true;
                reference_height_list.innerHTML='';
                $('#hieghtTitle').html("<span class='if_must'>* </span>参考尺寸：");
                for(var i=15.5;i<=40;i+=0.5){
                    var HeightLi=document.createElement('li');
                    HeightLi.innerHTML="<input type='checkbox' name='referenceHeight' value="+i+"><label for=''>"+i+"</label>";
                    reference_height_list.appendChild(HeightLi);
                }
            }
        }
        if(!test){
            $('#hieghtTitle').html("<span class='if_must'>* </span>参考身高：");
            reference_height_list.innerHTML='';
            for(var i=40;i<=185;i+=5){
                var HeightLi=document.createElement('li');
                HeightLi.innerHTML="<input type='checkbox' name='referenceHeight' value="+i+"cm><label for=''>"+i+"cm</label>";
                reference_height_list.appendChild(HeightLi);
            }
        }
    });
for(var i=40;i<=185;i+=5){
    var HeightLi=document.createElement('li');
    HeightLi.innerHTML="<input type='checkbox' name='referenceHeight' value="+i+"cm><label for=''>"+i+"cm</label>";
    reference_height_list.appendChild(HeightLi);
}



    //颜色选择
var colorTable=$('.color_table');
    var lastColorTableTr=$('input[class=select_color]:last')[0];
lastColorTableTr.addEventListener('keyup',aa);
    function aa(){
        if(lastColorTableTr.value!=''){
            var colorTr=document.createElement('tr');
            colorTr.innerHTML="<td><input type='text' class='select_color'name='commodityColor' placeholder='填写颜色'></td><td><input class='select_images' type='button' value='本地上传'><input type='file' name='commodityColorImages'  class='select_images select_up'><div class='small_img_show'><img src=''><a>删除</a></div></td><td><input type='text' name='commodityPrice' class='commodityPrice'></td> <td><input type='text' name='commodityQuantity' value='' class='commodityQuantity'></td> ";
            colorTable.append(colorTr);
            lastColorTableTr=$('input[class=select_color]:last')[0];
            lastColorTableTr.addEventListener('keyup',aa);
            //console.log(lastColorTableTr);
            Price();
            Quantity();
            imgUpLoad();
//<td><input type='text' name='commodityPrice' class='commodityPrice'></td> <td><input type='text' name='commodityQuantity' class='commodityQuantity'></td>
            $('.select_color').blur(function(){
              if(this!=$('input[class=select_color]:last')[0]){
                  if(this.value==''){
                      //console.log($('.color_table')[0].children[0]);
                      //console.log(this.parentNode.parentNode);
                      $('.color_table')[0].children[0].removeChild(this.parentNode.parentNode);
                  }
              }

            });
        }
    };
var colorarr=[];
$('.select_color').blur(function(){
    if(this.value!=''){
        //colorarr.push(this.value);
        console.log(colorarr.index);
    }
});
//发布按钮
$('#issueButton').click(function(){

    if(title==false){
        $('#commodityTitle').css({'border':'red 1px solid'});
    } if(type==false){
        $('#commodityType').css({'border':'red 1px solid'});
    } if(Tocrowd==false){
        $('#appleTocrowd').css({'border':'red 1px solid'});
    } if(Brand==false){
        $('#commodityBrand').css({'border':'red 1px solid'});
    } if(Season==false){
        $('#applyToSeason').css({'border':'red 1px solid'});
    } if(address==false){
        $('#address').css({'border':'red 1px solid'});
    } if(Age==false){
        $('.applyTo_Age_div').css({
            'border':'1px red solid'
        });
    }if(Height==false){
        $('.reference_height_list').css({
            'border':'1px red solid'
        });
    } if($('.loadLi').length==0){
        $('.uploadArea').css({
            'border':'1px red solid'
        });
    }
    imgjustify();
    quantityjustify();
    if(pricejustify()&&imgjustify()&&quantityjustify()&&justify()){
        console.log('发布');
        hideform();

        var formData = new FormData($("#uploadForm")[0]);
                $.ajax({
                    url: 'http://localhost:8888/upload' ,
                    type: 'POST',
                    data: formData,
                    //async: false,
                    cache: false,
                    contentType:false,
                    processData: false,
                    success: function (returndata) {
                        console.log('123');
                       if(JSON.parse(returndata).result=='true'){
                           document.body.scrollTop =0;
                           $(document.body).css({
                               "overflow-x":"hidden",
                               "overflow-y":"hidden"
                           });
                           show("<h2>发布成功！</h2><a href='#/sellerPage/test'>返回到卖家中心</a><a href='javascript:void(0)' onclick='hide()'>继续发布</a>");
                       }
                    },
                    error: function (err) {
                        console.log('456');
                        console.log(err);
                    }
                });
    }else{
        console.log('填写完整信息');

    }
});
//内容长度限制函数
 function lengthLimit(contentId,length,proId){
    $(contentId).keyup(function(){
        if($(contentId).val().length<=length){
            $(proId).html($(contentId).val().length+'/'+length);
        }
        else {
            $(contentId).val($(contentId).val().substr(0,length));
        }
    });
 }
//标题长度限制
lengthLimit('#commodityTitle',60,'#commodityTitleLength');
//亮点长度限制
lengthLimit('#commodityBright',150,'#commodityBrightLength');

//宝贝详情图片上传
//$('.commodityImg').change(function(){
//    var imgUrl=window.URL.createObjectURL(this.files[0]);
//    this.parentNode.style.background="url("+imgUrl+") no-repeat center";
//    this.parentNode.style.backgroundSize='contain';
//    //console.dir(window.URL.createObjectURL(this.files[0]));
//    //console.log(this.value);
//});
//图片上传显示功能设计
function upload(img) {
    //var sum = img.files.length;
    var imgObj = '';
    if(0 <= 12-$(".loadImgShow li").length){
        //for(var i = 0; i < sum; i++) {
            //获取图片的url路径是一个blob类型，BLOB就是使用二进制保存数据。如：保存位图。
            var imgUrl = window.URL.createObjectURL(img.files[0]);
            console.log(imgUrl);
            //获取图片的名称
            var imgName = img.files.name;
            imgObj += '<li class="loadLi" style="background:url('+ imgUrl +') ' + 'no-repeat center;background-size:contain" title="图片名称：'+imgName+'">';
            imgObj +='<div class="imgCover">';
            imgObj +='<div class="delImg" title="删除图片">'+"×"+'</div>';
            imgObj +='</div>';
            imgObj += '</li>';
        //}
        imgObj += '<label class="upLoadLabel" title="点击上传图片"><div class="addNewUpLoad" >╋</div><input type="file"  name="commodityImages" accept="image/jpeg,image/png,image/gif"  onchange="upload(this)" ></label>';
        $(".upLoadLabel").hide();
        $(".loadImgShow").append(imgObj);
        $(".loadImgNum").text(12-$(".loadImgShow li").length);
    }else{
        alert("上传的图片超出限制");
    }
}
//删除上传图片的功能设计
$(".loadImgShow").on('click','.delImg',function(){
    $(this).parent().parent().prev().remove();
    $(this).parent().parent().remove();


    //console.log( $(this));
    $(".loadImgNum").text(12-$(".loadImgShow li").length);
});

//隐藏的表单(用户名和上传时间)
function hideform(){
    $('#UserName').val(localStorage.getItem('localUserName'));
    var date=new Date();
    var  timer=date.toLocaleDateString();
    var Min=date.getMinutes();
    if(Min<10){
        Min='0'+Min;
    }
    timer=timer+"/"+date.getHours()+":"+Min;
    console.log(timer);
    $('#issuedTime').val(timer);
}


//图片上传显示功能设计
function detailupload(img) {
    //var sum = img.files.length;
    var imgObj = '';
    if(0 <= 20-$(".detailloadImgShow li").length){
        //for(var i = 0; i < sum; i++) {
            //获取图片的url路径是一个blob类型，BLOB就是使用二进制保存数据。如：保存位图。
            var imgUrl = window.URL.createObjectURL(img.files[0]);
            console.log(imgUrl);
            //获取图片的名称
            var imgName = img.files[0].name;
            imgObj += '<li style="background:url('+ imgUrl +') ' + 'no-repeat center;background-size:contain" title="图片名称：'+imgName+'">';
            imgObj +='<div class="detailimgCover">';
            imgObj +='<div class="detaildelImg" title="删除图片">'+"×"+'</div>';
            imgObj +='</div>';
            imgObj += '</li>';
        //}
        imgObj += '<label class="detailupLoadLabel" title="点击上传图片"><div class="detailaddNewUpLoad" >╋</div><input type="file"  name="commodityImgDetail"  accept="image/jpeg,image/png,image/gif" onchange="detailupload(this)" ></label>';
        $(".detailupLoadLabel").hide();
        $(".detailloadImgShow").append(imgObj);
        $(".detailloadImgNum").text(20-$(".detailloadImgShow li").length);
    }else{
        alert("上传的图片超出限制");
    }
}

//删除上传图片的功能设计
$(".detailloadImgShow").on('click','.detaildelImg',function(){
    $(this).parent().parent().prev().remove();
    $(this).parent().parent().remove();
    $(".detailloadImgNum").text(20-$(".detailloadImgShow li").length);
});

//价格校验
function Price(){
    $('.commodityPrice').blur(function(){
        console.log(this.value);
        if(/^[0-9]+(\.[0-9]{2})?$/.test(this.value)){
            console.log('ok');
        }
        else{
            this.value='';
        }
    });
}

function Quantity(){
    $('.commodityQuantity').blur(function(){
        var num=0;
        if(/^[0-9]{1,8}$/.test(this.value)){
            console.log('ok');
        }
        else {
            this.value='';
        }
        for(var i=0;i<$('.commodityQuantity').length;i++){
            num+=Number($('.commodityQuantity')[i].value);
        }
        $('#commodityTitleQuantity').val(num);
    });
}
function imgUpLoad(){
    $('.select_up').change(function(){
        //console.log(window.URL.createObjectURL(this.files[0]));
        //console.log($(this).next()[0].children[0]);
        var imgfiles=window.URL.createObjectURL(this.files[0]);
        var imgshow=$(this).next()[0].children[0];
        imgshow.src=imgfiles;
        //console.log($(this).next()[0].children[1]);
        $(this).next()[0].children[1].onclick=function(){
            //console.log( img);
            imgfiles='';
            imgshow.src='';
            console.log();
        };
    });
}
Price();
Quantity();
imgUpLoad();
$(function() {
    $("#commodityAddress").citySelect({
        prov: "",
        city: "",
        dist: "",
        nodata: "none"
    });
});

function justify(){
    if(title&&type&&Tocrowd&&Brand&&Season&&address&&Age&&Height){
       if($('.loadLi').length>0){
          return true;
       }else{
           $('.loadImgShow').css({
               'border':'red 1px solid'
           });
           return false;
       }
    }else{return false;}
}
$('#commodityTitle').blur(function(){
    if(this.value.toString().trim()==''){
        this.style.border='red 1px solid';
        title=false;
    }
    else {
        this.style.border='rgb(179, 179, 179) 1px solid';
        title=true;
    }
});
$('#commodityType').blur(function(){
    if(this.value.toString().trim()==''){
        this.style.border='red 1px solid';
         type=false;
    }
    else {
        this.style.border='rgb(179, 179, 179) 1px solid';
         type=true;
    }
});
$('#appleTocrowd').blur(function(){
    if(this.value.toString().trim()==''){
        this.style.border='red 1px solid';
        Tocrowd=false;
    }
    else {
        this.style.border='rgb(179, 179, 179) 1px solid';
        Tocrowd=true;
    }
});

$('#commodityBrand').blur(function(){
    if(this.value.toString().trim()==''){
        this.style.border='red 1px solid';
        Brand=false;
    }
    else {
        this.style.border='rgb(179, 179, 179) 1px solid';
        Brand=true;
    }
});

$('#applyToSeason').blur(function(){
    if(this.value.toString().trim()==''){
        this.style.border='red 1px solid';
        Season=false;
    }
    else {
        this.style.border='rgb(179, 179, 179) 1px solid';
        Season=true;
    }
});

$('#address').blur(function(){
    if(this.value.toString().trim()==''){
        this.style.border='red 1px solid';
        address=false;
    }
    else {
        this.style.border='rgb(179, 179, 179) 1px solid';
        address=true;
    }
});
    $('input[name=applyToAge]').change(function(){
        if(!$('input[name=applyToAge]').is(':checked')){
            $('.applyTo_Age_div').css({
                'border':'1px red solid'
            });
            Age=false;
        }else{
            $('.applyTo_Age_div').css({
                'border':'none'
            });
            Age=true;
        }
    });
$(".reference_height").on('change','input[name=referenceHeight]',function(){
    if(!$('input[name=referenceHeight]').is(':checked')){
        $('.reference_height_list').css({
            'border':'1px red solid'
        });
        Height=false;
    }else{
        $('.reference_height_list').css({
            'border':'none'
        });
        Height=true;
    }
});
$(".loadImgShow").on('change','input[name=commodityImages]',function(){
    $('.uploadArea').css({
                'border':'1px white solid'
            });
});
$(".color_table").on('change','.commodityPrice',function(){
   if(this.value!=''){
       this.style.border='1px rgb(179, 179, 179) solid';
   }
});
$(".color_table").on('change','.commodityQuantity',function(){
    if(this.value!=''){
        this.style.border='1px rgb(179, 179, 179) solid';
    }
});
function pricejustify(){
    var price=true;
    var pro=$('input[name=commodityPrice]');
    for(var i=0;i<pro.length-1;i++){
        if(pro[i].value.toString().trim()==''){
            pro[i].style.border='1px red solid';
            price=false;
        }
        else{
            pro[i].style.border='1px rgb(179, 179, 179) solid';
        }
    }
    return price;
}
function quantityjustify(){
    var quantity=true;
    var pro=$('input[name=commodityQuantity]');
    for(var i=0;i<pro.length-1;i++){
        if(pro[i].value.toString().trim()==''){
            pro[i].style.border='1px red solid';
            quantity=false;
        }
        else{
            pro[i].style.border='1px rgb(179, 179, 179) solid';
        }
    }
    return quantity;
}


function imgjustify(){
    var img=true;
    var pro=$('.small_img_show img');
    for(var i=0;i<pro.length-1;i++){
        if(pro[i].src=='http://localhost:8888/seller.html'){
            pro[i].style.border='1px red solid';
            img=false;
        }
        else{
            pro[i].style.border='1px rgb(179, 179, 179) solid';
        }
    }
    return img;
}
$(".color_table").on('change','input[name=commodityColorImages]',function(){
  $(this).next().children()[0].style.border='1px rgb(179, 179, 179) solid';
});


//蒙版
    function show(html){
        //var loader=$("#div_maskContainer");
        //if(loader.length==0){
            loader=$("<div id='div_maskContainer'><div id='div_Mask' ></div><div id='div_loading' ></div></div>");
            $("body").append(loader);
        //}
        self.loader=loader;
        var w=$(window).width();
        var h=$(window).height();
        var divMask=$("#div_Mask");
        divMask.css("top",0).css("left",0).css("width",w).css("height",h);
        var tipDiv=$("#div_loading");
        if(html==undefined)
            html="";
        tipDiv.html(html);
        loader.show();
        var x=(w-tipDiv.width())/2;
        var y=(h-tipDiv.height())/2;
        tipDiv.css("left",x);
        tipDiv.css("top",y);
    }
       function hide(){
            //var loader=$("#div_maskContainer");
            //if(loader.length==0) return ;
            //loader.remove();
           location.reload();
        }
//延迟关闭
        //autoDelayHide=function(html,timeOut){
        //    var loader=$("#div_maskContainer");
        //    if(loader.length==0) {
        //        this.show(html);
        //    }
        //    else{
        //        var tipDiv=$("#div_loading");
        //        tipDiv.html(html);
        //    }
        //    if(timeOut==undefined) timeOut=3000;
        //    window.setTimeout(this.hide,timeOut);
        //}
