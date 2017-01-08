/**
 * Created by lx on 2016/10/25.
 */
window.onload=function(){
    var i=3;
    setInterval(function(){
        $('#timer').html(i);
        i--;
        if(i==0){
            window.location='http://localhost:8888/index.html';
        }
    },1000);
}