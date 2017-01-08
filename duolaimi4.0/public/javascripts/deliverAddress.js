/**
 * Created by lx on 2016/10/6.
 */
$(function() {
    $("#consigneeArea").citySelect({
        prov: "",
        city: "",
        dist: "",
        nodata: "none"
    });

});
$('#userName').val(getUser());

$('#save').click(function(){
var formData = new FormData($(".consignee_form")[0]);
$.ajax({
    url: 'http://localhost:8888/addDeliverAddress',
    type: 'POST',
    data: formData,
    cache: false,
    contentType:false,
    processData: false,
    success: function (returndata) {
        location.reload();
        //console.log(JSON.parse(returndata).ops[0]);
        //var result=JSON.parse(returndata).ops[0];
        //var trChild=document.create('tr');
        //if(returndata){
        //    $('.middle_content').append('<div class="CPM">操作改成功</div>');
        //}
    },
    error: function (err) {
        //console.log(err);
    }
});
});