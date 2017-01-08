/**
 * Created by Administrator on 2016/11/30.
 */
var arr = window.location.hash.substring(1).split("?")[1];
$('#_id').val(arr);
$('#save').click(function(){
    var formData = new FormData($(".consignee_form")[0]);
    $.ajax({
        url: 'http://localhost:8888/saveEditAddress',
        type: 'POST',
        data: formData,
        cache: false,
        contentType:false,
        processData: false,
        success: function (returndata) {
            if(returndata){
                window.location='http://localhost:8888/#/myInformations/deliverAddress';
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
});