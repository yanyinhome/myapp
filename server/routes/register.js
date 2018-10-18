var express = require('express');
var router = express.Router();
// web3可以使用
// var Web3=require("web3");
// var web3;
//创建web3对象
// if (typeof web3 !== 'undefined') {
//    web3 = new Web3(web3.currentProvider);
// } else {
//   // set the provider you want from Web3.providers
//    web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.124.2:8486"));
// };
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
client.connect((err,result)=>{
  if(err){
    console.log(err);
  }else{
    console.log(result)
  }
});

// load 处理登录事件
router.post('/load', function(req, res, next) {
  let query='SELECT * FROM message where telnumber = ? and password = ?';
  let addparams=[]; 
  // 解析提交数据
  const data=req.body;
  for(let item in data){    
    if(item=="username"||item=="pass"){
      console.log(item,data[item])
      addparams.push(data[item])
    }
  }
  if(req.session.username||req.cookies.username){
    res.json("ture");
  }else{
    // 使用数据库验证登录内容
    client.query(query,addparams,function(err,result){
      if(err){
        console.log(err)     
      }else{
        console.log(result)
        req.session.username=req.body.username;
        res.cookie('username', req.body.username, { maxAge: 60 * 1000, singed: true})
        res.json("ture");
      }
    })
      }
});
router.get('/', function(req, res, next) {
  if(req.session){
    console.log(req.session.username)
    res.send(req.session.username);
  } else{
    res.send("登录")
  }  
});
// 处理注册事件
router.post('/', function(req, res, next) {
  let query='INSERT INTO message(telnumber,password,email) VALUES (?,?,?)';
  let addparams=[];
  const data=req.body;
  for(let item in data){    
    if(item!=="check"){
      console.log(item,data[item])
      addparams.push(data[item])
    }
  }
  if(addparams.length!==0){
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

module.exports = router;
