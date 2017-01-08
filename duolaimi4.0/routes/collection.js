/**
 * Created by Administrator on 2016/12/11.
 */
var express = require('express');
var router = express.Router();
var queryData = require('../database/queryData');
var insertData = require('../database/insertData');
var upData = require('../database/upData');
var deleteData=require('../database/deleteData');
var ObjectId=require('mongodb').ObjectID;

router.post('/moveCollect', function(req, res) {
    console.log(req.body);
    var data=req.body;
    queryData('collection',data,function(callback){
        if(callback.length==0){
            console.log(callback.length);
            insertData('collection',data,function(callback){
                queryData('commodity',{_id:ObjectId(data.id)},function(callback){
                    var num=parseInt(callback[0].collectionNum)+1;
                    console.log(123,num);
                upData('commodity',{_id:ObjectId(data.id)},{collectionNum:num.toString()},function(callback){

                });
            });
            });
            res.send(true);
        }


    });


});
//收藏商品展示
router.post('/showCollection', function(req, res) {
    console.log(req.body);
    var data=req.body;
    queryData('collection',data,function(callback){
        res.send(JSON.stringify(callback));
    });


});
module.exports = router;