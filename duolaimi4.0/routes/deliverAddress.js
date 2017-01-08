/**
 * Created by Administrator on 2016/11/30.
 */
var express = require('express');
var router = express.Router();
var queryData = require('../database/queryData');
var insertData = require('../database/insertData');
var upData = require('../database/upData');
var deleteData = require('../database/deleteData');
var ObjectId=require('mongodb').ObjectID;
//添加收货地址
router.post('/addDeliverAddress', function(req, res) {
    console.log(req.body);
    var data=req.body;
    if(data.defaultAddress=='on'){
        upData('deliverAddress',{userName:data.userName,defaultAddress:'on'},{defaultAddress:'off'},function(callback) {

        });
    }
    insertData('deliverAddress',data,function(callback){
        res.send(JSON.stringify(callback));
    });
});
//读取收货地址
router.post('/readDeliverAddress', function(req, res) {
    console.log(req.body);
    var data=req.body;
    queryData('deliverAddress',{userName:data.userName},function(callback) {
            res.send(callback);
        });
});
//修改收货地址
router.post('/editAddress', function(req, res) {
    console.log(req.body);
    var data=req.body;
    queryData('deliverAddress',{_id:ObjectId(data.id)},function(callback) {
        res.send(callback[0]);
    });
});
//保存修改收货地址
router.post('/saveEditAddress', function(req, res) {
    console.log(req.body);
    var data=req.body;
    upData('deliverAddress',{_id:ObjectId(data.id)},data,function(callback) {
        res.send(true);
    });
});

//删除收货地址
router.post('/deleteAddress', function(req,res) {
    var data=req.body;
    console.log(data._id);
    deleteData('deliverAddress',{_id:ObjectId(data._id)},function(callback){
        res.send(true);
    });
});
module.exports = router;