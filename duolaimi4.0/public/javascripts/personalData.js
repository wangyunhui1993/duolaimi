/**
 * Created by lx on 2016/10/5.
 */


$.ajax({
    url: 'http://localhost:8888/personalData',
    type: 'POST',
    data:{userName:getUser()},
    success:function(result){
        result=JSON.parse(result);
        console.log(result);
        $(function() {
            if(result.address==undefined){
                $("#adress").citySelect({
                    prov:'',
                    city: '',
                    dist:''
                });
            }else{
                $("#adress").citySelect({
                    prov:result.address[0],
                    city: result.address[1],
                    dist: result.address[2]
                });
            }
                if(result.homeTown==undefined){
                    $("#hometown").citySelect({
                        prov:'',
                        city: '',
                        dist:''
                    });
                }else{
                    $("#hometown").citySelect({
                        prov: result.homeTown[0],
                        city: result.homeTown[1],
                        dist: result.homeTown[2]
                    });
                }

            $('input[name=realName]').val(result.realName);
            $('input[name=userName]').val(result.userName);
            $('#headImg').attr("src","images/headImg/"+result.headImg);
            $('input[name=birthDay]').val(result.birthDay);
            $('#userName').html(result.userName);
            if(result.sex=='男'){
                $('input[name=sex]')[0].checked='checked';
            }else{
                $('input[name=sex]')[1].checked='checked';
            }
        });
    },
    error:function(err){

    }
});

$('#submit').click(function(){
    var formData = new FormData($("#dataForm")[0]);
    $.ajax({
        url: 'http://localhost:8888/saveData',
        type: 'POST',
        data: formData,
        cache: false,
        contentType:false,
        processData: false,
        success:function(result){
            if(result){
                console.log(result);
                $('.personal_detail').append('<div class="CPM">资料修改成功</div>');

            }
        },
        error:function(err){

        }
    });
});



