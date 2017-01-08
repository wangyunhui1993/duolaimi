/**
 * Created by lx on 2016/11/17.
 */
var express = require('express');
var router = express.Router();
queryData=require('../database/queryData');
router.post('/hot', function(req,res) {
    queryData('commodity',{commodityApplyToSeason:'秋季'},function(callback){
        res.send(callback);
    });
});
router.post('/NMC', function(req,res) {
    queryData('commodity',{commodityAppleTocrowd:'男中童'},function(callback){
    res.send(callback);
    });
});
router.post('/WMC', function(req,res) {
    queryData('commodity',{commodityAppleTocrowd:'女中童'},function(callback){
        res.send(callback);
    });
});

router.post('/NYC', function(req,res) {
    queryData('commodity',{commodityAppleTocrowd:'男幼童'},function(callback){
        res.send(callback);
    });
});

router.post('/WYC', function(req,res) {
    queryData('commodity',{commodityAppleTocrowd:'女幼童'},function(callback){
        res.send(callback);
    });
});

router.post('/BC', function(req,res) {
    queryData('commodity',{commodityAppleTocrowd:'婴童'},function(callback){
        res.send(callback);
    });
});

router.post('/shoes', function(req,res) {
    queryData('commodity',{$or:[{commodityType:'传统布鞋'},{commodityType:'帆布鞋'},{commodityType:'凉鞋'},{commodityType:'棉鞋'},{commodityType:'皮鞋'},{commodityType:'亲子鞋'},{commodityType:'拖鞋'},{commodityType:'舞蹈鞋'},{commodityType:'学步鞋'},{commodityType:'靴子/雪地鞋'},{commodityType:'运动鞋'},{commodityType:'雨鞋'}]},function(callback){
        res.send(callback);
    });
});

router.post('/UC', function(req,res) {
    queryData('commodity',{$or:[{commodityType:'内衣裤'},{commodityType:'袜子'},{commodityType:'配饰'},{commodityType:'帽子/围巾/手套'},{commodityType:'传统布鞋'}]},function(callback){
        res.send(callback);
    });
});

router.post('/new', function(req,res) {
    queryData('commodity',{commodityApplyToSeason:'冬季'},function(callback){
        res.send(callback);
    });
});

module.exports = router;