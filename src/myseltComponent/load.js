import React,{Component} from 'react';
import './bodycontent.css';
import{Head,Foot} from "./Head_Foot";
import{Button,Form,Input,Layout} from "element-react";
import "element-theme-default";
import {usercontext} from "./context";
import axios from "axios";
axios.defaults.withCredentials = true;
// 登录组件
class Login extends Component{
    constructor(props) {
        super(props);      
        this.state = {
          form: {
            username: '',
            pass: ''
          },
          rules: {
            pass: [
              { required: true, message: '请输入密码', trigger: 'blur' },
              { validator: (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('请输入密码'));
                } else {
                    let number=/^[0-9]{8}$/;
                    if(!number.test(value)){
                        callback(new Error("请输入正确的密码"))
                    }
                  callback();
                }
              } }
            ],
            username: [
              { required: true, message: '请输入用户名', trigger: 'blur' },
              { validator: (rule, value, callback) => {
                if(value===""){
                  callback(new Error("请输入用户名"))
                }else{
                let number=/^13[0-9]{9}$/;
                let email=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
                if(number.test(value)||email.test(value)){
                    callback()
                }else{
                    callback( new Error("用户名格式不正确"))
                }
                }
              }, trigger: 'change' }
            ]
          }
        };
      }
      axiospost=(option)=>{
        const self=this; 
        axios.post(option.url,option.data).then(function(response) {
            if(response){
                if(response.data==="ture"){
                  console.log(response)
                    alert("登录成功"); 
                    self.props.history.push("/");                
                } else{
                    console.log(response)
                }               
                
            }
        }).catch(error => console.error('Error:', error));
    }
    // 点击确定验证登录
      handleSubmit(e) {
        e.preventDefault();
        const option={
          url:"http://localhost:3005/register/load",
          data:this.state.form,
      }
        this.refs.form.validate((valid) => {
          if (valid) {
            this.axiospost(option);
          } else {
            alert("验证错误")
            return false;
          }
        });
      }
      
      handleReset(e) {
        e.preventDefault();
      
        this.refs.form.resetFields();
      }
      
      onChange(key, value) {
        this.setState({
          form: Object.assign({}, this.state.form, { [key]: value })
        });
      }
      
      render() {
        return (
          <div style={{marginTop:"10rem"}}>
              <Layout.Row >
                  <Layout.Col span="8" offset="8">
                    <div>
                    <Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="100" className="demo-ruleForm">
                        <Form.Item prop="username" >
                        <Input value={this.state.form.username} onChange={this.onChange.bind(this, 'username')} autoComplete="off" placeholder="请输入手机或者邮箱" style={{width:"15rem"}}/>
                        </Form.Item>
                        <Form.Item prop="pass">
                        <Input value={this.state.form.pass} onChange={this.onChange.bind(this, 'pass')} placeholder="请输入密码" style={{width:"15rem"}}></Input>
                        </Form.Item>
                        <Form.Item>
                        <Button type="primary" onClick={this.handleSubmit.bind(this)} style={{width:"15rem"}}>登录</Button>
                        </Form.Item>
                    </Form>
                    </div>
                </Layout.Col>
              </Layout.Row>
          </div>
        )
      }
      
}
// load导出组件
class Load extends Component {
  constructor(props){
    super(props);
    this.state={
      userstate:{
        username:"登录",
        load:"false",
    },
    }
  }
  componentDidMount(){
    const self=this;
    const option={
      url:"http://localhost:3005/register",
    }
    axios.get(option.url).then(function(response){
      console.log(response)
      if(response.data!==""){       
        self.setState({userstate:{username:response.data}});
        alert("你已经登录");
        self.props.history.push('/');
      }
    })
  }
    render(){
        return(
            <div>
                <usercontext.Provider value={this.state.userstate}>
                <usercontext.Consumer>
                    {data=><Head loadstate={data.username}/>}
                </usercontext.Consumer>
                </usercontext.Provider>
                <Login history={this.props.history}/>
                <Foot/>
            </div>
        )
    }
}
export default Load;