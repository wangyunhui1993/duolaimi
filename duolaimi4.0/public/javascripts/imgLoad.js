/**
 * Created by lx on 2016/10/27.
 */
$('#ssi-upload').ssi_uploader({url:'http://localhost:8888/uc',maxFileSize:6,allowed:['jpg','gif','txt','png','pdf']});
$('#ssi-upload2').ssi_uploader({url:'http://localhost:8888/uc',preview:false,allowed:['jpg','gif','txt','png','pdf']});
$('#ssi-upload3').ssi_uploader({url:'http://localhost:8888/uc',dropZone:false,allowed:['jpg','gif','txt','png','pdf']});