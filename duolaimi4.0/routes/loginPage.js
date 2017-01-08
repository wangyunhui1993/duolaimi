var express = require('express');
var router = express.Router();
/* GET users listing. */
/* login */
var queryData = require('../database/queryData');
router.get('/loginPage.html', function(req, res) {
  res.render('loginPage', { title: 'loginPage' });
});
router.get('/homePage.html', function(req, res) {
  res.render('homePage', { title: 'homePage' });
});
router.post('/homePage', function(req, res) {
  //console.log(req.body.form_counter);
  console.log('进入homePage');
  console.log(req.body.userName);
  var userCollection = {
    userName: req.body.userName,
   userPwd: req.body.userPwd
  };
  console.log(userCollection);
  queryData('userInfo',{userName:userCollection.userName,userPwd:userCollection.userPwd},function(data){
    console.log('数据集',data);
    res.send(data);
  });

});
module.exports = router;
