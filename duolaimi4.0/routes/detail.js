/**
 * Created by lx on 2016/11/10.
 */
var express = require('express');
var router = express.Router();
var queryData = require('../database/queryData');
var insertData = require('../database/insertData');
var upData = require('../database/upData');
var ObjectId=require('mongodb').ObjectID;

router.get('/purchasePage.html', function(req, res) {
    console.log(req.url);
    res.render('purchasePage');
});
router.post('/detail', function(req, res) {

    var data=req.body;
    //console.log(data._id);
        queryData('commodity',{_id:ObjectId(data._id)},function(callback){
            res.send(callback);
});
    });
router.post('/addShoppingCar', function(req, res) {
    console.log(req.body);
    var data=req.body;
    data.limitState=true;
    var commodityInfo='';
     queryData('commodity',{_id:ObjectId(data.id)},function(callback) {
        //commodityInfo=callback[0];
        var  mongodb = require('mongodb');
        var  server  = new mongodb.Server('localhost', 27017, {auto_reconnect:true});
        var  db = new mongodb.Db('duolaimidatabase', server, {safe:true});
            db.open(function (err, db) {
                if (!err) {
                    console.log('打开数据库成功！');
                    db.collection('shoppingCar', function (err, collection) {
                        if (err) {
                            throw err;
                            console.log("连接数据集合出错");
                        } else {
                            console.log("成功连接数据集合");
                            //find
                            collection.find({id:data.id,colorNum:data.colorNum,heightNum:data.heightNum,limitState:true}).toArray(function (err, docs) {
                                if (err) {
                                    throw err;
                                }
                                else {
                                    console.log(123,docs);
                                    if(docs.length==0){
                                    console.log(docs.length);
                                    data.shopName=callback[0].shopName;
                                    data.commodityImages=callback[0].commodityImages[0];
                                    data.color=callback[0].commodityColor[data.colorNum];
                                    data.height=callback[0].referenceHeight[data.heightNum];
                                    data.price=callback[0].commodityPrice[data.colorNum];
                                    data.commodityTitle=callback[0].commodityTitle;
                                        data.maxNum=callback[0].commodityQuantity[data.colorNum];
                                    console.log(data);
                                            insertData('shoppingCar',data,function(callback1){
                                                console.log(callback1);
                                                res.send(true);
                                            });
                                    }
                                     else{
                                        num=parseInt(docs[0].quantity)+parseInt(data.quantity);
                                        console.log(num);
                                        upData('shoppingCar',{id:data.id,colorNum:data.colorNum,heightNum:data.heightNum,limitState:true},{quantity:num},function(callback2){
                                            res.send(true);
                                        });
                                    }
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
        //queryData('shoppingCar',{_id:ObjectId(data.id),color:data.colorNum,height:data.heightNum},function(callback){
            //res.send(true);

            //if(callback.length==0){
                //console.log(callback.length);
                //data.shopName=commodityInfo.shopName;
                //data.commodityImages=commodityInfo.commodityImages[0];
                //data.color=commodityInfo.commodityColor[data.colorNum];
                //data.height=commodityInfo.referenceHeight[data.heightNum];
                //data.price=commodityInfo.commodityPrice[data.colorNum];
                ////data.limitState=true;
                //console.log(data);
            //        insertData('shoppingCar',data,function(callback1){
            //            console.log(callback1);
            //
            //        });
            //}
                // else{
            //    num=parseInt(callback[0].quantity)+parseInt(data.quantity);
            //    upData('shoppingCar',{_id:ObjectId(data.id),color:data.color,height:data.height,state:true},{quantity:num},function(callback2){
            //        res.send(true);
            //    });
            //
            //}

        //});

    //});

});


//分享到社区
router.post('/shareToCommunity', function(req, res) {

    var data=req.body;
    console.log(data);
    queryData('userInfo',{userName:data.userName},function(callback){
        data.headImg=callback[0].headImg;
        data.support=0;
        data.turnSend=0;
        data.supportUserName=[];
        data.commentContent=[];
        insertData('community',data,function(callback){
            res.send(true);
        });
    });
});
module.exports = router;