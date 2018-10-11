import React,{Component} from 'react';
import './bodycontent.css';
import{Head,Foot} from "./Head_Foot";
import{Button,Tabs,Form,Input} from "element-react";
import "element-theme-default";
// 注册组件
class Register extends Component{
    constructor(props){
        super(props);
        this.state={
            form:{
                telnumber:"",
                pass:"",
                check:"",
                emailaddress:""
            },
            rules:{
                telnumber:[{
                    required:"ture",
                    message:"手机号不能为空",
                    trigger:"blur",
                },{
                    validator:(rule, value, callback)=>{
                        console.log("1")
                },trigger:"blur"
                }],
                emailaddress:[{
                    required:"ture",
                    message:"邮箱不能为空",
                    trigger:"blur",
                },{

                }],
                pass:[{
                    required:"ture",
                    message:"密码不能为空",
                    trigger:"blur",
                },{
                    validator: (rule, value, callback) => {
                        console.log("1")
                        if (value === '') {
                          callback(new Error('请输入密码'));
                         } 
                         else {
                          if (this.state.form.check !=='') {
                            // this.refs.form.validateField('checkPass');
                          }
                        }
                      },trigger:"blur"
                }],
                check:[{
                    required:"ture",
                    message:"密码不能为空",
                    trigger:"blur",
                },{
                    validator: (rule, value, callback) => {
                        if (value === '') {
                          callback(new Error('请输入密码'));
                        } else if (value !== this.state.form.pass) {
                          callback(new Error('两次输入密码不一致!'));
                        } else {
                          callback();
                        }
                      },trigger:"blur"
                }],
            }
        }
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        console.log("1")
    }
    handleReset=(e)=>{
        e.preventDefault();
        // this.refs.form.resetFields();
        console.log(1)
    }
    onChange(key,value){
        this.setState({
            form: Object.assign({}, this.state.form, { [key]: value })
          });
    }
    render(){
        return(
            <div className="container register">
                <h1>欢迎注册</h1>
                <Tabs activeName="1" onTabClick={ (tab) => console.log(tab.props.name) }>
                    <Tabs.Pane label="手机注册" name="1">
                        <Form ref="form" rules={this.state.rules} labelPosition="top" model={this.state.form} labelWidth="80" >
                        <Form.Item label="手机号码" prop="telnumber">
                        <Input value={this.state.form.telnumber} onChange={this.onChange.bind(this,'telnumber')} autoComplete="off" />
                        </Form.Item>
                        <Form.Item label="登录密码" prop="pass"> 
                        <Input type="password" value={this.state.form.pass} onChange={this.onChange.bind(this,'pass')} autoComplete="off" />
                        </Form.Item>
                        <Form.Item label="确认密码" prop="check">
                        <Input type="password" value={this.state.form.check} onChange={this.onChange.bind(this,'check')} autoComplete="off" />
                        </Form.Item>
                        <Button type="primary" onClick={this.handleSubmit}>提交</Button>
                        <Button  onClick={this.handleReset}>重置</Button>
                        </Form>
                    </Tabs.Pane>
                    <Tabs.Pane label="邮箱注册" name="2">
                    <Form ref="form" rules={this.state.rules} model={this.state.form} labelPosition="top" labelWidth="80" >
                        <Form.Item label="邮箱地址" prop="emailaddress">
                        <Input value={this.state.form.telnumber} onChange={this.onChange.bind(this,'emailaddress')} autoComplete="off" />
                        </Form.Item>
                        <Form.Item label="登录密码" prop="pass"> 
                        <Input type="password" value={this.state.form.pass} onChange={this.onChange.bind(this,'pass')} autoComplete="off" />
                        </Form.Item>
                        <Form.Item label="确认密码" prop="check">
                        <Input type="password" value={this.state.form.check} onChange={this.onChange.bind(this,'check')} autoComplete="off" />
                        </Form.Item>
                        <Button type="primary" onClick={this.handleSubmit}>提交</Button>
                        <Button  onClick={this.handleReset}>重置</Button>
                        </Form>
                    </Tabs.Pane>
                </Tabs>
                
            </div>
        )
    }
}
// 注册导出组件
class RegisterExoort extends Component {
    render(){
        return(
            <div>
                <Head/>
                <Register/>
                <Foot/>
            </div>
        )
    }
}
export default RegisterExoort;