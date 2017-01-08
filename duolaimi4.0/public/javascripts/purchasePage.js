/**
 * Created by lx on 2016/10/10.
 */
var heightNum='';
var colorNum='';
    $(".jqzoom").imagezoom();
$('#thumblist').on('click', '.commodityImages', function () {
    //增加点击的li的class:tb-selected，去掉其他的tb-selecte
    $(this).parents("li").addClass("bg").siblings().removeClass("bg");
    //赋值属性
    $(".jqzoom").attr('src',$(this).find("img").attr("mid"));
    $(".jqzoom").attr('rel',$(this).find("img").attr("big"));
});
successLoginAfter();



$('#purchaseNum').keyup(function(){
    if(this.value.length==1){
        this.value=this.value.replace(/[^1-9]/g,'')
    }
else{
    this.value=this.value.replace(/\D/g,'')
}
    if(/^0+/.test(this.value)){
        this.value='';
    }
});

function reduceNum(){
    if($('#purchaseNum').val()==1){
        $('#purchaseNum').val(1);
    }else{
        $('#purchaseNum')[0].value=parseInt($('#purchaseNum')[0].value)-1;
    }
}
function addNum(){
    $('#selectInfo').text('');
    if($('#purchaseNum').val()==''){
        $('#purchaseNum').val(1);
    }else{
        $('#purchaseNum')[0].value=parseInt($('#purchaseNum')[0].value)+1;
    }
}
$('#purchaseNum').keyup(function(){
    $('#selectInfo').text('');
});
//尺寸点击事件
$('#heightUl').on('click', '.height', function () {
    $(this).addClass("heightli").siblings().removeClass("heightli");
    heightNum=$(this).index();
    console.log(heightNum);
    $('#selectInfo').text('');
});
//颜色点击事件
$('#colorUl').on('click', '.colorLi', function () {
    $(this).addClass("colorRed").siblings().removeClass("colorRed");
    colorNum=$(this).index();
    console.log(colorNum);
    $('#selectInfo').text('');
});
function addShopping(){

    if(getUser()==null){
        $('.loginPhoneBox').css({display:'block'});
    }
    else if(heightNum===''||colorNum===''||$('#purchaseNum')[0].value==''){
        $('#selectInfo').text('请勾选完整的商品信息');
    }else{
        $('#selectInfo').text('');
        collection();
    }
}
function collection(){
    var search=window.location.hash;
    search=search.split('?')[1];
console.log(search);
    var date=new Date();
    var  timer=date.toLocaleDateString();
    var Min=date.getMinutes();
    if(Min<10){
        Min='0'+Min;
    }
    timer=timer+"/"+date.getHours()+":"+Min;
    $.ajax({
        url:'http://localhost:8888/addShoppingCar',
        method:'post',
        //headers:{'content-type':'application/x-www-form-urlencoded'},
        dataType: "json",
        data:{
            id:search,
            colorNum:colorNum,
            heightNum:heightNum,
            quantity:$('#purchaseNum').val(),
            userName:getUser(), //在opreateCookie.js中定义
            addTime:timer
        },
        success:function(result){
            if(result){
                $('#msg').css({display:'block'});
                setTimeout(function(){
                    $('#msg').fadeOut().css({display:'none'});
                },1500);

            }
        },
        error:function(err){
            console.log(err);
        }
    });
}



/**
 * 文本框根据输入内容自适应高度
 * @param                {HTMLElement}        输入框元素
 * @param                {Number}             设置光标与输入框保持的距离(默认0)
 * @param                {Number}             设置最大高度(可选)
 */
var autoTextarea = function(elem, extra, maxHeight) {
    extra = extra || 0;
    var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
        isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
        addEvent = function(type, callback) {
            elem.addEventListener ?
                elem.addEventListener(type, callback, false) :
                elem.attachEvent('on' + type, callback);
        },
        getStyle = elem.currentStyle ? function(name) {
            var val = elem.currentStyle[name];
            if (name === 'height' && val.search(/px/i) !== 1) {
                var rect = elem.getBoundingClientRect();
                return rect.bottom - rect.top -
                    parseFloat(getStyle('paddingTop')) -
                    parseFloat(getStyle('paddingBottom')) + 'px';
            };

            return val;
        } : function(name) {
            return getComputedStyle(elem, null)[name];
        },
        minHeight = parseFloat(getStyle('height'));


    elem.style.resize = 'none';

    var change = function() {
        var scrollTop, height,
            padding = 0,
            style = elem.style;

        if (elem._length === elem.value.length) return;
        elem._length = elem.value.length;

        if (!isFirefox && !isOpera) {
            padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
        };
        scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

        elem.style.height = minHeight + 'px';
        if (elem.scrollHeight > minHeight) {
            if (maxHeight && elem.scrollHeight > maxHeight) {
                height = maxHeight - padding;
                style.overflowY = 'auto';
            } else {
                height = elem.scrollHeight - padding;
                style.overflowY = 'hidden';
            };
            style.height = height + extra + 'px';
            scrollTop += parseInt(style.height) - elem.currHeight;
            document.body.scrollTop = scrollTop;
            document.documentElement.scrollTop = scrollTop;
            elem.currHeight = parseInt(style.height);
        };
    };

    // propertychange，只要当前对象属性发生改变。（IE专属的)
    addEvent('propertychange', change);
    // oninput是标准浏览器的事件，一般应用于input元素。当input的value发生变化时就会发生无论是键盘输入还是鼠标粘贴的改变都能即时监听到。
    addEvent('input', change);
    addEvent('focus', change);
    change();
};
var text = document.getElementById("textarea");
autoTextarea(text); // 调用


function shareToCommunity(){
    $('.jumplog').css({'display':'block'});
}
$('#cancal').click(function(){
    $('.jumplog').css({'display':'none'});
});
