/**
 * Created by lx on 2016/11/16.
 */
var express = require('express');
var router = express.Router();

router.get('/seller.html', function(req,res) {
    res.render('seller');
});

module.exports = router;