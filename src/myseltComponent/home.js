import {Head,Foot} from "./Head_Foot";
import React,{Component} from 'react';
import './bodycontent.css';
import './home.css';
import config from "../config";
import{Button,Icon,Tag,Table} from "element-react";
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
               <ul style={{marginBottom:0}}>
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
// elementui table组件
class TableList extends Component{      
    render() {
      return (
        <Table
          style={{width: '100%'}}
          columns={this.props.columns}
          data={this.props.data}
          border={true}
          height={250}
          highlightCurrentRow={true}
          onCurrentChange={item=>{console.log(item)}}
          stripe={true}
        />
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
                    <TableList data={this.props.data} columns={this.props.columns}/>   
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
            columns: [{
                label:"账户",
                className:"index",
                width:"70rem",
                align:"center",
                render: function(data){
                    return (                   
                      <span style={{display:"inline-block",width:"100%"}}>{data.index}</span>
                    )
                  }
            },
                {
                  label: "账户地址",
                  prop: "address",
                  width: "470rem",
                  align:"center",
                  render: function(data){
                    return (                   
                      <span style={{width:"100%"}}>{data.address}</span>
                    )
                  }
                },
                {
                  label: "以太币",
                  prop: "number",
                  width: "400rem",
                  align:"center",
                  render: function(data){
                    return <Tag style={{width:"100%"}} type="primary">{data.number}</Tag>
                  }
                },
                {
                  label: "锁定/解锁",
                  prop: "locked",
                  align:"center",
                  minwidth:"80rem",
                  render: function(){
                    return (
                      <span>
                       <Button plain={true} type="info" size="small">锁定</Button>
                       <Button type="warning" size="small">解锁</Button>
                      </span>
                    )
                  }
                }
              ],
            data:config.accounts,
               highlightCurrentRow:"ture",           
        }
    }
    componentDidMount(){
        this.timer=setInterval(
            ()=>{
                this.setState={
                    titlearry:config.BodyTitle_arry,
                    accountarry:config.accounts,
                    data:[],
            }},1000)
    }
    componentWillUnmount(){
        clearInterval(this.timer)
    }
    render(){
        return(
            <div>
                <BodyTitle titlearry={this.state.titlearry}/>
                <BodyContent accountarry={this.state.accountarry} data={this.state.data} columns={this.state.columns}/>
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