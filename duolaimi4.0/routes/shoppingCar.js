/**
 * Created by Administrator on 2016/11/28.
 */
var express = require('express');
var router = express.Router();
var queryData = require('../database/queryData');
var insertData = require('../database/insertData');
var upData = require('../database/upData');
var deleteData=require('../database/deleteData');
var ObjectId=require('mongodb').ObjectID;

router.post('/shoppingCar', function(req, res) {
    //console.log(req.body);
    var data=req.body;
    queryData('shoppingCar',data,function(callback){
       res.send(JSON.stringify(callback));
    });
});
router.post('/deleteShoppingCar', function(req, res) {
    console.log(req.body);
    var data=req.body;
    deleteData('shoppingCar',{_id:ObjectId(data._id)},function(callback){
        res.send(true);
    });
});
router.post('/limitDeleteShoppingCar', function(req, res) {
    console.log(req.body);
    var data=req.body;
    deleteData('shoppingCar',{_id:ObjectId(data._id)},function(callback){
        res.send(true);
    });
});
module.exports = router;