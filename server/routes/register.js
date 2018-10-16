var express = require('express');
var router = express.Router();
// var mysql=require("mysql-promise")()
// 解决跨域问题
router.use(require('cors')());
// 引入数据库
var mysql=require("mysql");
const hjznconfig={
  host:"127.0.0.1",
  user:"root",
  password:"123456",
  database:'test',
  port:"3306"
}
// 创建客户端
const client=mysql.createConnection(hjznconfig);
function mysqlsave(query,res){
  
}
client.connect((err)=>{
  if(err){
    console.log(err);
  }else{
    console.log(client)
  }
});
/* GET users listing. */
router.post('/', function(req, res, next) {
  // console.log(req.body.telnumber);
  let query='INSERT INTO message(telnumber,password) VALUES (?,?)';
  let addparams=[];
  for(item in req.body){
    if(item=="telnumber"||item=="pass"){
      console.log(item,req.body[item])
      addparams.push(req.body[item])
    }
  }
  if(addparams.length!=0){
    client.query(query,addparams,function(err,result){
    if(err){
      console.log(err)     
    }else{
      console.log(result)
      res.json("ture");
    }
    // client.end();
  })  
  }
});
// register 下级文件
router.get('/children', function(req, res, next) {
  console.log(req.body) 
  res.send('下级文件');
});
router.post('/children', function(req, res, next) {
  console.log(req.body) 
  res.send('下级文件');
});

module.exports = router;
