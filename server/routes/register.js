var express = require('express');
var router = express.Router();
var Web3=require("web3");
var web3;
//创建web3对象
if (typeof web3 !== 'undefined') {
   web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
   web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.124.2:8486"));
};
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
client.connect((err,result)=>{
  if(err){
    console.log(err);
  }else{
    console.log(result)
  }
});
/* GET users listing. */
router.post('/', function(req, res, next) {
  // console.log(req.body.telnumber);
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
// register 下级文件
router.get('/children', function(req, res, next) {
  // let result=web3.personal.newAccount("123456");
  console.log(req.cookies)
  res.cookie("sessionid",1);
  if(req.cookies&&req.cookies.sessionid){
    res.send("你已经登录")
  }else{
    res.send("你还未登录，请登录")
  }
});
router.post('/children', function(req, res, next) {
  console.log(req.body) 
  res.send('下级文件');
});

module.exports = router;
