/**
 * Created by lx on 2016/10/5.
 */
$(function() {
    $("#file_upload").change(function() {
        var $file = $(this);
        var fileObj = $file[0];
        var windowURL = window.URL || window.webkitURL;
        var dataURL;
        var $img = $("#preview");
        if(fileObj && fileObj.files && fileObj.files[0]){
            dataURL = windowURL.createObjectURL(fileObj.files[0]);
            console.log(dataURL);
            $img.attr('src',dataURL);
        }else{
            dataURL = $file.val();
            var imgObj = document.getElementById("preview");
// 两个坑:
// 1、在设置filter属性时，元素必须已经存在在DOM树中，动态创建的Node，也需要在设置属性前加入到DOM中，先设置属性在加入，无效；
// 2、src属性需要像下面的方式添加，上面的两种方式添加，无效；
            imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
            imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;

        }
    });
});



$('.save_photo').click(function(){
    $('#userName').val(getUser());
    var formData = new FormData($("#headImgLoad")[0]);
    $.ajax({
        url: 'http://localhost:8888/headImgLoad',
        type: 'POST',
        data: formData,
        cache: false,
        contentType:false,
        processData: false,
        success:function(result){
           if(result){
               console.log(result);
               $('.personal_detail').append('<div class="CPM">成功修改头像</div>');

           }
        },
        error:function(err){
        }
    });
});
