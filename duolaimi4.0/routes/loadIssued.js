/**
 * Created by lx on 2016/11/3.
 */


var express = require('express');
var router = express.Router();
var url=require('url');
var fs=require('fs');
var insertData = require('../database/insertData');
var queryData = require('../database/queryData');

router.get('/issuedCommodity.html', function(req, res) {
    console.log(req.url);
    res.render('issuedCommodity', { title: 'issuedCommodity' });
});
router.post("/upload",function(req,res){
    console.log('进入发表');
    var file = req.files;
    var data=req.body;
    //console.log(data);
    console.log(file);
    var commodityImagesfile=[];
    if(file.commodityImages instanceof Array){
        for(var i=0;i<file.commodityImages.length;i++){
            console.log(file.commodityImages[0].path);
            commodityImagesfile.push(file.commodityImages[i].name);
            fs.renameSync(file.commodityImages[i].path,__dirname+"/../public/images/commodityImages/"+file.commodityImages[i].name);
        }
    }else {
        commodityImagesfile.push(file.commodityImages.name);
        fs.renameSync(file.commodityImages.path,__dirname+"/../public/images/commodityImages/"+file.commodityImages.name);
    }
    var commodityImgDetailFile=[];
    if(file.commodityImgDetail instanceof Array){
        for(var i=0;i<file.commodityImgDetail.length;i++){
            commodityImgDetailFile.push(file.commodityImgDetail[i].name);
            fs.renameSync(file.commodityImgDetail[i].path,__dirname+"/../public/images/commodityImages/"+file.commodityImgDetail[i].name);
        }
    }else {
        commodityImgDetailFile.push(file.commodityImgDetail.name);
        fs.renameSync(file.commodityImgDetail.path,__dirname+"/../public/images/commodityImages/"+file.commodityImgDetail.name);
    }
    var commodityColorImagesFile=[];
    if(file.commodityColorImages instanceof Array){
        for(var i=0;i<file.commodityColorImages.length;i++){
            commodityColorImagesFile.push(file.commodityColorImages[i].name);
            fs.renameSync(file.commodityColorImages[i].path,__dirname+"/../public/images/commodityImages/"+file.commodityColorImages[i].name);
        }
    }else {
        commodityColorImagesFile.push(file.commodityColorImages.name);
        fs.renameSync(file.commodityColorImages.path,__dirname+"/../public/images/commodityImages/"+file.commodityColorImages.name);
    }
if(!(data.commodityColor instanceof Array)){
    var commodityColor=[];
    commodityColor.push(data.commodityColor);
    data.commodityColor=commodityColor;
}
    if(!(data.commodityPrice instanceof Array)){
        var commodityPrice=[];
        commodityPrice.push(data.commodityPrice);
        data.commodityPrice=commodityPrice;
    }
    if(!(data.commodityQuantity instanceof Array)){
        var commodityQuantity=[];
        commodityQuantity.push(data.commodityQuantity);
        data.commodityQuantity=commodityQuantity;
    }
    if(!(data.referenceHeight instanceof Array)){
        var referenceHeight=[];
        referenceHeight.push(data.referenceHeight);
        data.referenceHeight=referenceHeight;
    }
    data.commodityImages=commodityImagesfile;
    data.commodityColorImages=commodityColorImagesFile;
    data.commodityImgDetail=commodityImgDetailFile;
    data.collectionNum=0;
    data.salesNum=0;
    data.commodityComment=0;
    data.collectionNum=0;
    //console.log(allFiles);
    //for(var r in allFiles){
    //    eval("data."+r+"=allFiles."+r);
    //}
    console.log(data);
    //console.log('123'+__dirname);
    queryData('userInfo',{userName:data.shopUserName},function(callback){
        data.shopName=callback[0].shopName;
        insertData('commodity',data,function(callback){
            console.log('成功');
            res.send(JSON.stringify({'result':'true'}));

        });
    });
});


module.exports = router;