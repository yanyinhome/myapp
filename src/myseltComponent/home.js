import {Head,Foot} from "./Head_Foot";
import React,{Component} from 'react';
import './bodycontent.css';
import './home.css';
import config from "../config";
import{Button,Icon,Tag,Table,Tabs,Pagination} from "element-react";
import app from './app1';
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
          height={440}
          highlightCurrentRow={true}
          onCurrentChange={item=>{console.log(item)}}
          stripe={true}
        />
      )
    }
    
}
// element tabs组件
class Tabslist extends Component{
    render() {
        return (
          <Tabs activeName="2" onTabClick={ (tab) => console.log(tab.props.name) }>
            <Tabs.Pane label="查看账户" name="1">
            <TableList data={this.props.data} columns={this.props.columns}/>
            </Tabs.Pane>
            <Tabs.Pane label="查看区块" name="2">
            <TableList data={this.props.data_qukuai} columns={this.props.columns_qukuai}/>
            <Fenye/>
            </Tabs.Pane>
            <Tabs.Pane label="以太币交易" name="3">
            以太币交易
            </Tabs.Pane>
          </Tabs>
        )
      }
}
// element 分页组件
class Fenye extends Component{
    render() {
        return (
          <div className="last">
            <div className="block">
              <Pagination layout="total, sizes, prev, pager, next, jumper" total={400} pageSizes={[100, 200, 300, 400]} pageSize={100} currentPage={5}/>
            </div>
          </div>
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
                    <Tabslist data={this.props.data} columns={this.props.columns} data_qukuai={this.props.data_qukuai} columns_qukuai={this.props.columns_qukuai}/>  
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
            columns_qukuai:[
                {
                    label:"区块号",
                    prop:"qukuainumber",
                    className:"index",
                    width:"100rem",
                    align:"center",
                    
                },
                    {
                      label: "矿主",
                      prop: "qukuaiower",
                      width: "570rem",
                      align:"center",
                    
                    },
                    {
                      label: "已用GAS",
                      prop: "gasused",
                      width: "300rem",
                      align:"center",
                     
                    },
                    {
                      label: "交易数",
                      prop: "trancenumber",
                      minwidth: "200rem",
                      align:"center",
                     
                    },
            ],
            data_qukuai:config.qukuailist,
            columns: [{
                label:"账户",
                prop:"index",
                className:"index",
                width:"70rem",
                align:"center",
                
            },
                {
                  label: "账户地址",
                  prop: "address",
                  width: "470rem",
                  align:"center",
                
                },
                {
                  label: "以太币",
                  prop: "number",
                  width: "400rem",
                  align:"center",
                 
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
    tick(){
        const accountsmessage=[];
        app.web3.eth.getAccounts((err,result)=>{
          if(err){console.log(err)}
            else{result.forEach(
                (item,index)=>{
                  const accountsmessageitem={};
                  accountsmessageitem.lockd="true";
                  accountsmessageitem.index=`${index+1}`;
                  accountsmessageitem.number=app.web3.eth.getBalance(item).toString();
                  accountsmessageitem.address=item;
                  accountsmessage.push(accountsmessageitem);
              }
            )}
            this.setState({data:accountsmessage})
        })
        }
    componentDidMount(){
        this.timer=setInterval(
            ()=>this.tick(),2000
        )
    }
    componentWillUnmount(){
        clearInterval(this.timer)
    }
    render(){
        return(
            <div>
                <BodyTitle titlearry={this.state.titlearry}/>
                <BodyContent accountarry={this.state.accountarry} data={this.state.data} columns={this.state.columns} data_qukuai={this.state.data_qukuai} columns_qukuai={this.state.columns_qukuai}/>
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