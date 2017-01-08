(function($) {
    $.fn.extend({
        insertContent: function(myValue, t) {
            var $t = $(this)[0];
            if (document.selection) { //ie
                this.focus();
                var sel = document.selection.createRange();
                sel.text = myValue;
                this.focus();
                sel.moveStart('character', -l);
                var wee = sel.text.length;
                if (arguments.length == 2) {
                    var l = $t.value.length;
                    sel.moveEnd("character", wee + t);
                    t <= 0 ? sel.moveStart("character", wee - 2 * t - myValue.length) : sel.moveStart("character", wee - t - myValue.length);
  
                    sel.select();
                }
            } else if ($t.selectionStart || $t.selectionStart == '0') {
                var startPos = $t.selectionStart;
                var endPos = $t.selectionEnd;
                var scrollTop = $t.scrollTop;
                $t.value = $t.value.substring(0, startPos) + myValue + $t.value.substring(endPos, $t.value.length);
                this.focus();
                $t.selectionStart = startPos + myValue.length;
                $t.selectionEnd = startPos + myValue.length;
                $t.scrollTop = scrollTop;
                if (arguments.length == 2) {
                    $t.setSelectionRange(startPos - t, $t.selectionEnd + t);
                    this.focus();
                }
            }
            else {
                this.value += myValue;
                this.focus();
            }
        }
    })
})(jQuery);

$(document).ready(function(){
	$(".img-icon").click(function(){
		$(".cont-box .text").insertContent('<img src="请在这里输入图片地址" alt=""/>', -10);
	});
});





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
        imgObj += '<label class="upLoadLabel" title="点击上传图片"><div class="addNewUpLoad" >╋</div><input type="file"  name="contentImages" accept="image/jpeg,image/png,image/gif"  onchange="upload(this)" ></label>';
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



//发表按钮
$('#clickIssued').click(function(){
    var formData = new FormData($("#issuedContent")[0]);
    $.ajax({
        url: 'http://localhost:8888/issuedContent' ,
        type: 'POST',
        data: formData,
        cache: false,
        contentType:false,
        processData: false,
        success: function (returndata) {
                console.log(returndata);
            history.go(0);
            //console.log('123');
            //if(JSON.parse(returndata).result=='true'){
            //    document.body.scrollTop =0;
            //    $(document.body).css({
            //        "overflow-x":"hidden",
            //        "overflow-y":"hidden"
            //    });
            //    show("<h2>发布成功！</h2><a href='#/sellerPage/test'>返回到卖家中心</a><a href='javascript:void(0)' onclick='hide()'>继续发布</a>");
            //}
        },
        error: function (err) {
            console.log('456');
            console.log(err);
        }
    });
});

//隐藏用户名名表单设置值
$('input[name=userName]').val(getUser());