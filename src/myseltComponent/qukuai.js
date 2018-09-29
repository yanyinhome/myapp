import {Head,Foot} from "./Head_Foot";
import React,{Component} from 'react';
import './bodycontent.css';
import {BodyTitle} from './home';
import './qukuai.css';
import config from '../config';
import {Tabs,Table,Tag} from "element-react";
import app from "./app1";
import "element-theme-default";
// 实例化代币合约并导出
let contract1=config.contracts[0].abi;
let address1=config.contracts[0].address;
// 实例化代币合约，后期改数组
const myconstract=app.web3.eth.contract(contract1).at(address1);
// 交易Tabs组件
class TokenTransaction extends Component{
    render() {
        return (
          <Tabs activeName="1" onTabClick={ (tab) => console.log(tab.props.name) }>
            <Tabs.Pane label="账户列表" name="1">
            <TableList data={this.props.data} columns={this.props.columns}/>
            </Tabs.Pane>
            <Tabs.Pane label="购买汇金币" name="2">
            <HuijinBuy/>
            </Tabs.Pane>
            <Tabs.Pane label="出售汇金币" name="3">
            <HuijinSell/>
            </Tabs.Pane>
            <Tabs.Pane label="汇金币转账" name="4">
            <HuijinTransction/>
            </Tabs.Pane>
          </Tabs>
        )
      }
}
// 账户列表组件与home。js内的相同，没有再引入，后期改到公共组件
class TableList extends Component{
    render(){
        return(
            <Table
            style={{width: '100%'}}
            columns={this.props.columns}
            data={this.props.data}
            border={true}
            height={this.props.height}
            highlightCurrentRow={true}
            onCurrentChange={item=>{console.log(item)}}
            stripe={true}
          />
        )
    }
}
// 汇金币购买函数
class HuijinBuy extends Component{
    render(){
        return(
            <div>
                购买汇金币
            </div>
        )
    }
}
// 汇金币购买函数
class HuijinSell extends Component{
    render(){
        return(
            <div>
                出售汇金币
            </div>
        )
    }
}
// 汇金币转账函数
class HuijinTransction extends Component{
    render(){
        return(
            <div>
                转账汇金币
            </div>
        )
    }
}
class QuKuai extends  Component{
    constructor(props){
        super(props);
        this.state={
            titlearry:config.BodyTitle_arry,
            columns:[{
                label:"账户",
                prop:"index",
                className:"index",
                width:"70rem",
                align:"center",
                
            },
                {
                  label: "账户地址",
                  prop: "address",
                  align:"center",
                
                },
                {
                  label: "汇金币",
                  prop: "number",
                  align:"center",
                    render:function(data){
                        return(
                            <span>
                            <Tag color="Light Blue">{data.number}</Tag>
                            </span>
                        )
                    }
                },],
                data:config.Tokenlist,
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
                    accountsmessageitem.number=myconstract.balanceOf.call(item).toString();
                    accountsmessageitem.address=item;
                    accountsmessage.push(accountsmessageitem);
                }
              )}
              this.setState({data:accountsmessage})
          })
    }
    componentDidMount(){
        this.timer=setInterval(
            ()=>this.tick(),30000
        )
    }
    componentWillUnmount(){
        clearInterval(this.timer)
    }
    render(){
        return(
            <div>
                <Head/>
                <BodyTitle titlearry={this.state.titlearry}/>
                <div className="container">
                <TokenTransaction columns={this.state.columns} data={this.state.data}/>
                </div>
                <Foot/>
            </div>
        )
    }
}
export default QuKuai;
export {contract1};