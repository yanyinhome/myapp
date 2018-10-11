var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
   
  res.send("00");
});
// register 下级文件
router.get('/children', function(req, res, next) {
  res.send('下级文件');
});

module.exports = router;
