/**
 * Created by lx on 2016/11/16.
 */
var express = require('express');
var router = express.Router();
var upData = require('../database/upData');
var queryData = require('../database/queryData');
router.get('/fireDredge.html', function(req, res) {
    console.log('进去fireDredge页面');
    res.render('fireDredge');
});
router.post('/freeDredge',function(req,res){
    var data=req.body;
    data.ifSeller='yes';
   console.log(data);
    upData('userInfo',{'userName':data.userName},data,function(callback){
        console.log(callback.length);
    });



});







module.exports = router;