/**
 * Created by Administrator on 2016/11/29.
 */
$('.allshoppinglist').on('keyup','.purchaseNum',function(){
    if(this.value.length==1){
        this.value=this.value.replace(/[^0-9]/g,'')
    }
    else{
        this.value=this.value.replace(/\D/g,'')
    }
    if(/^0+/.test(this.value)){
        this.value='1';
        $(this).parent().parent().next().children().children()[1].innerHTML=$(this).parent().parent().prev().children().children()[1].innerHTML;
    }
    if(/^\.+/.test(this.value)){
        this.value='1';
        $(this).parent().parent().next().children().children()[1].innerHTML=$(this).parent().parent().prev().children().children()[1].innerHTML;
    }
    if(this.value==''){
        this.value=1;
        $(this).parent().parent().next().children().children()[1].innerHTML=$(this).parent().parent().prev().children().children()[1].innerHTML;
    }
    if(parseInt(this.value)>this.max){
        this.value=this.max;
        $(this).parent().parent().next().children().children()[1].innerHTML=$(this).parent().parent().prev().children().children()[1].innerHTML*this.max;
    }
});
//$('.allshoppinglist').on('blur','.purchaseNum',function(){
//    if(this.value==''){
//
//
//    }
//});
//$('.allshoppinglist').on('keydown','.purchaseNum',function(){
//    console.log( $(this).index());
//
//});
//$('.allshoppinglist').on('click','.reduceNum',function(){
//
//    if($(this).next()[0].value==1){
//        $(this).next().val(1);
//    }else{
//        $(this).next()[0].value=parseInt($(this).next()[0].value)-1;
//    }
//});
//
//$('.allshoppinglist').on('click','.addNum',function(){
//
//    if($(this).prev()[0].value==''){
//        $(this).prev().val(1);
//    }else{
//        $(this).prev()[0].value=parseInt($(this).prev()[0].value)+1;
//    }
//});
//$('#purchaseNum').keyup(function(){
//    $('#selectInfo').text('');
//});
$('.allshoppinglist').on('change','.singleSelect',function(){
    if(this.checked==false){
        $('#allSelect').prop("checked", false);
    }
    if($(".singleSelect:checked").length>=1){
    $('#accounts').css({background:'red'}).removeAttr("disabled");
    }
    else{
        $('#accounts').css({background:'#B0B0B0'}).attr("disabled","disabled");
    }
});

$('#allSelect').change(function(){
    if(this.checked == true){
        $('.singleSelect').prop("checked", true);
        $('#accounts').css({background:'red'}).removeAttr("disabled");
    }
    else{
        $('.singleSelect').prop("checked", false);
        $('#accounts').css({background:'#B0B0B0'}).attr("disabled","disabled");

    }

});