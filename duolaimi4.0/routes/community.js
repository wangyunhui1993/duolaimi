/**
 * Created by Administrator on 2016/12/12.
 */
var express = require('express');
var router = express.Router();
var fs=require('fs');
var queryData = require('../database/queryData');
var insertData = require('../database/insertData');
var upData = require('../database/upData');
var ObjectId=require('mongodb').ObjectID;
//获取社区内容
router.post('/community', function(req, res) {
    var data=req.body;
    console.log(data);
    queryData('community',{},function(callback){
        res.send(JSON.stringify(callback));
    });

});
//点赞
router.post('/clickSupport', function(req, res) {

    var data=req.body;
    console.log(data);
    queryData('community',{_id:ObjectId(data._id)},function(callback){
        console.log(callback);
        var arr=callback[0].supportUserName;
        var justify=true;
        for(var i=0;i<=arr.length;i++){
            if(arr[i]==data.userName){
                justify=false;
            }
        }
        if(justify){
            callback[0].supportUserName.push(data.userName);
            upData('community',{_id:ObjectId(data._id)},{support:callback[0].support+1,supportUserName: callback[0].supportUserName},function(callback){

            });
            res.send(true);
        }else{
            res.send(false);
        }
        //res.send(JSON.stringify(callback));
    });

});

//转发
router.post('/clickTurn', function(req, res) {
    var data=req.body;
    queryData('community',{_id:ObjectId(data._id)},function(callback){
       var num= callback[0].turnSend+1;
        console.log(callback[0]);
        upData('community',{_id:ObjectId(callback[0]._id)},{turnSend:callback[0].turnSend+1},function(callback){

        });
    });
    delete data._id;
    data.turnSend+=1;
    //console.log(data);
    insertData('community',data,function(callback){
        res.send(true);
    });

});

//发表
router.post('/issuedContent', function(req, res) {
    var data=req.body;
    var file=req.files;
    console.log(data);
    console.log(file);
    queryData('userInfo',{userName:data.userName},function(callback){
        data.headImg=callback[0].headImg;
        var date=new Date();
        var  timer=date.toLocaleDateString();
        var Min=date.getMinutes();
        if(Min<10){
            Min='0'+Min;
        }
        timer=timer+"/"+date.getHours()+":"+Min;
        data.shareTime=timer;
        data.support=0;
        data.turnSend=0;
        data.supportUserName=[];
        data.commodityImages=[];
        data.commentContent=[];
        if(file.hasOwnProperty('contentImages')){

            if(file.contentImages instanceof Array){
                console.log('arr');
                for(var i=0;i<file.contentImages.length;i++){
                    data.commodityImages.push(file.contentImages[i].name);
                    fs.renameSync(file.contentImages[i].path,__dirname+"/../public/images/commodityImages/"+file.contentImages[i].name);
                }
            }else {
                console.log('obj');
                data.commodityImages.push(file.contentImages.name);
                fs.renameSync(file.contentImages.path,__dirname+"/../public/images/commodityImages/"+file.contentImages.name);
            }
        }
        insertData('community',data,function(callback){
            res.send(true);
        });
    });
});
//评论
router.post('/clickComment', function(req, res) {

    var data=req.body;
    //console.log(data);
    queryData('userInfo',{userName:data.userName},function(callback){
        //var newData=[];
        data.headImg=callback[0].headImg;
        console.log(data);






            var  mongodb = require('mongodb');
            var  server  = new mongodb.Server('localhost', 27017, {auto_reconnect:true});
            var  db = new mongodb.Db('duolaimidatabase', server, {safe:true});
            db.open(function (err, db) {
                if (!err) {
                    console.log('打开数据库成功！');
                    db.collection('community', function (err, collection) {
                        if (err) {
                            throw err;
                            console.log("连接数据集合出错");
                        } else {
                            console.log("成功连接数据集合");
                            //find
                            collection.find({_id:ObjectId(data.beId)}).toArray(function (err, docs) {
                                if (err) {
                                    throw err;
                                }
                                else {
                                    delete data.beId;
                                    var date=new Date();
                                    var  timer=date.toLocaleDateString();
                                    var Min=date.getMinutes();
                                    if(Min<10){
                                        Min='0'+Min;
                                    }
                                    timer=timer+"/"+date.getHours()+":"+Min;
                                    data.commentTime=timer;
                                     var newData=docs[0].commentContent;
                                    newData.push(data);
                                    console.log(newData);
                                    upData('community',{_id:ObjectId(docs[0]._id)},{commentContent:newData},function(callback1){
                                        res.send(JSON.stringify(data));
                                    });
                                }

                                db.close();
                            });
                        }
                    });
                }
                else {
                    console.log('打开数据库失败！');
                    console.log(err);
                }
            });





    });
    //queryData('community',{_id:ObjectId(data.beId)},function(callback){
    //    delete data.beId;
    //    var newData=callback[0].commentContent;
    //    newData.push(data);
    //    console.log(newData);
        //upData('community',{_id:ObjectId(data.beId)},{commentContent:callback[0].commentContent},function(callback1){
        //    console.log(callback1);
        //});
    //});


});
module.exports = router;