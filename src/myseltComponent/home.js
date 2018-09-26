import {Head,Foot} from "./Head_Foot";
import React,{Component} from 'react';
import './bodycontent.css';
import './home.css';
import config from "../config";
import {Button} from "element-react";
// import "element-them-default";
// 账户列表的标题，显示节点信息
class BodyTitle extends Component{
    render(){
        let itemlist=this.props.titlearry.map(
            (item)=>(<li key={item.id} id={item.id}>
            <p className="item_title">{item.value}</p>
            <p className="item-content">{item.content}</p>
            </li>
            ))
        return(
            <div className="body_title">
               <div className="container">
               <ul>
                {itemlist}
                </ul>
               </div>
            </div> 
        )
    }
}
// 欢迎语组件
class Welcome extends Component{
    render(){
        return(
            <div className="info">欢迎进入汇金币智能代币系统</div>
        )
    }
}
//账户列表头部
class BodyContent extends Component{
    render(){
        return(
            <div className="container">
                <Welcome/>
                <div>                   
                    <BodyFoot accountarry={this.props.accountarry}/>   
                </div>
            </div>
        )
    }
}
// 账户列表底部，接收父组件从数据库获得的信息并显示
class BodyFoot extends Component{
    render(){
        let itemlist=this.props.accountarry.map(item=>(<tr key={item.id}><td>{item.accountaddress}</td><td>{item.accountnumber}</td><td>{item.lockd.toString()}</td></tr>))
        return(
            <div className="accounts">
                <table>
                    <thead>
                        <tr><th>账户地址</th><th>代币数</th><th>解锁</th></tr>
                    </thead>
                    <tbody>
                        {itemlist}
                    </tbody>
                </table>
            </div>
        )
    }
}
// 组件叠放，对外输出，从数据库获取信息并传递给子组件
class Homebody extends Component{
    constructor(props){
        super(props);
        this.state={
            titlearry:config.BodyTitle_arry,
            accountarry:config.accounts,            
        }
    }
    render(){
        return(
            <div>
                <BodyTitle titlearry={this.state.titlearry}/>
                <BodyContent accountarry={this.state.accountarry}/>
            </div>
        )
    }
}
class Home extends  Component{
    render(){
        return(
            <div>
                <Head/>
                <Homebody/>
                <Foot/>
            </div>
        )
    }
}
export default Home;
export {BodyTitle,Welcome};