var express = require('express');
var router = express.Router();
var url=require('url');
var fs=require('fs');
var insertData = require('../database/insertData');
var queryData = require('../database/queryData');
var upData=require('../database/upData');
var ObjectID = require('mongodb').ObjectID;
/* GET home page. */
router.get('/', function(req, res) {
  //console.log(req.url);
  res.render('index');
});
router.get('/index.html', function(req, res) {
  //console.log(req.url);
  res.render('index');
});
/* login */
router.get('/register.html', function(req, res) {
  console.log('进去register页面');
  res.render('register', { title: 'register' });
});
router.get('/ucenter.html', function(req, res) {
  console.log('进去ucenter页面');
  res.render('ucenter', { title: 'ucenter' });
});
router.get('/dredgePromot.html', function(req, res) {
  console.log('进去dredgePromot页面');
  res.render('dredgePromot');
});
/* ucenter */
router.post('/ucenter', function(req, res) {
  //console.log(req.body);
  //console.log('进入center');
  //console.log(req.body.userName);
    var userCollection={
      userName:req.body.userName,
      userPwd:req.body.userPwd,
      userPhone:req.body.userPhone,
      ifSeller:'no',
      headImg:'default.jpg'
    };
  insertData('userInfo',userCollection,function(callback){
    //console.log(callback);
    res.send(userCollection);
  });
});
router.post('/usercheck', function(req, res) {
  queryData('userInfo',{userName:req.body.userName},function(data){
    //console.log('数据集',data);
    res.send(data);
  });
});
router.post('/ifSeller', function(req, res) {
  queryData('userInfo',{userName:req.body.userName},function(callback){
    //console.log(callback[0].ifSeller);
    res.send(callback[0].ifSeller);
  });
});
router.post('/allCommodity', function(req, res) {
  queryData('commodity',{},function(callback){
    //console.log(callback);
    res.send(callback);
  });
});
router.post('/headImg', function(req, res) {
  //console.log(req.body);
  queryData('userInfo',req.body,function(callback){
    //console.log(callback[0].headImg);
    res.send(callback[0].headImg);
  });
});
//交易状态
router.post('/tradeState', function(req, res) {
  //console.log(req.body);
  queryData('userInfo',req.body,function(callback){
    //console.log(callback[0]);
    res.send(JSON.stringify(callback[0]));
  });
});
//个人资料
router.post('/personalData', function(req, res) {
  //console.log(req.body);
  queryData('userInfo',req.body,function(callback){
    //console.log(callback[0]);
    res.send(JSON.stringify(callback[0]));
  });
});
//保存个人资料
router.post('/saveData', function(req,res) {
  console.log(req.body);
  upData('userInfo',{userName:req.body.userName},req.body,function(callback){

    //console.log(callback);
    res.send(JSON.stringify(true));
  });
});
//头像上传
router.post('/photoUpLoad', function(req, res) {
  //console.log(req.body);
  queryData('userInfo',req.body,function(callback){
    //console.log(callback[0]);
    res.send(JSON.stringify(callback[0]));
  });
});
router.post('/headImgLoad', function(req, res) {
  //console.log(req.files.headImg.name);
  console.log(req.body);
  fs.renameSync(req.files.headImg.path,__dirname+"/../public/images/headImg/"+req.files.headImg.name);
  upData('userInfo',req.body,{headImg:req.files.headImg.name},function(callback){

    //console.log(callback);
    res.send(JSON.stringify(true));
  });
});
module.exports = router;