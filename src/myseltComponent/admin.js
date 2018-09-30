import {Head,Foot} from "./Head_Foot";
import React,{Component} from 'react';
import {BodyTitle,Welcome} from './home';
import config from "../config";
import  "./admin.css";
import app from "./app1";
//  let contractarry=app.contractarry(config.contracts);
let contract1=config.contracts[0].abi;
let address1=config.contracts[0].address;
// 实例化代币合约，后期改数组
const myconstract=app.web3.eth.contract(contract1).at(address1);
console.log( myconstract.buyPrice.call())
const myconstractfunction={
    address:address1,
    name:myconstract.name.call(),
    number:myconstract.totalSupply.call().c[0],
    log:myconstract.symbol.call(),
    buyprice:myconstract.buyPrice.call().toString(),
    sellprice:myconstract.sellPrice.call().toString(),
    getbalance:(address)=>{return myconstract.balanceOf.call(address)},
}
const tokenMessage=[];
tokenMessage.push(myconstractfunction)
// 代币标题组件
class Title extends Component{
    render(){
        return(
            <h3 className="tokentitle">{this.props.TokenName}合约</h3>
        )
    }
}
// 代币详情显示组件
class TokenShow extends Component{
    render(){
        const TokenMessage=this.props.TokenMessage.map((item)=>(<tr key={item.address}><td>{item.name}</td><td>{item.number}</td><td>{item.log}</td><td>{item.buyprice}</td><td>{item.sellprice}</td></tr>))
        return(
            <div className="token_show">
                <table>
                    <thead>
                        <tr>
                            <td>代币名称</td><td>代币数量</td><td>代币标志</td><td>买入价格</td><td>卖出价格</td>
                        </tr>
                    </thead>
                    <tbody>
                        {TokenMessage}
                    </tbody>
                </table>
            </div>
        )
    }
}
//代币查询账户信息组件
class TokenSearch extends Component{
    render(){
        return(
            <div>
                <input type="text" placeholder="请输入账号，点击确定查询" id="getBalance_address"/>
                <button onClick={this.props.getbalance}>确定</button>
                <span>账号代币数量{this.props.accounttoken}</span> 
            </div>
        )
    }
}
// 代币对外功能组件
class TokenPublicMethod extends Component{
    render(){
        return(
            <div>
                <ul>
                <li><h4>从合约购买代币</h4><label >购买数量</label><input type="text" id="buynum" placeholder="购买代币的以太币数量"/><label >购买地址</label><input type="text" id="buyaccount" placeholder="请先解锁账户"/><button id="buyok">确定</button></li>
                <li><h4>向合约出售代币</h4><label >出售数量</label><input type="text" id="sellnum" placeholder="出售的代币数量"/><label >出售地址</label><input type="text" id="sellaccount" placeholder="请先解锁账户"/><button id="sellok">确定</button></li>
                <li><h4>解锁账户</h4><label >账户地址</label><input type="text" id="unlockaddress"/><label >密码</label><input type="text" id="unlockkeyword"/><label >解锁时间</label><input type="text" id="unlocktime"/><button id="unlockok">确定</button></li>
                <li><h4>代币转移</h4><label >转入地址</label><input type="text" name="" id="transfer_to"/><label >转出地址</label><input type="text" id="transfer_from"/><label >转移数量</label><input type="text" id="transfer_val"/><button id="transferok">确定</button></li>
                </ul>
            </div>
        )
    }
}
//代币OWER功能组件
class TokenPrivateMethod extends Component{
    render(){
        return(
            <div>
                <li>
                    <h4>设置GAS阈值信息</h4>
                    <label>阈值</label><input type="text" id="yuval"/>
                    <button id="yuok">确定</button>
                </li>
                <li>
                    <h4>代币增发</h4>
                    <label>增发数量</label><input type="text" id="zengfashuliang"/>
                    <label >增发地址</label><input type="text" id="zengfaaddress"/>
                    <button id="zengfaok">确定</button>
                </li>
                <li>
                    <h4>冻结账户</h4>
                    <label>冻结/解冻的账号</label><input type="text" id="freezeaccount"/>
                    <label  >冻结0解冻1</label><input type="text" id="zhuangtaival"/>
                    <button id="freezeok">确定</button>
                </li>
                <li>
                    <h4>设置买卖价格</h4>
                    <label>买入价格</label><input type="text" id="buyprice"/>
                    <label >卖出价格</label><input type="text" id="sellprice"/>
                    <button id="priceok">确定</button>
                </li>
            </div>
        )
    }
}
// 代币功能组件集合
class Token extends Component{
    constructor(props){
        super(props);
        this.state={
            TokenName:null,
            TokenMessage:[],
            accounttoken:null,
        }
    }
    componentDidMount(){
        this.setState({TokenName:"汇金",TokenMessage:tokenMessage})
    }
    getbalance=()=>{
        let address=document.getElementById("getBalance_address").value;
        console.log(address)
        let number=myconstractfunction.getbalance(address).toString();
        console.log(number)
        this.setState({accounttoken:number})
    }
    render(){
        return(
            <div className="container">
            <Welcome/>
            <Title TokenName={this.state.TokenName?this.state.TokenName:"无名称"}/>
            <TokenShow TokenMessage={this.state.TokenMessage}/>
            <TokenSearch getbalance={this.getbalance} accounttoken={this.state.accounttoken}/>
            <TokenPublicMethod/>
            <TokenPrivateMethod/>
            </div>
        )
    }
}
// 组合后导出的组件
class RiZhi extends  Component{
    render(){
        return(
            <div>
                <Head/>
                <BodyTitle titlearry={config.BodyTitle_arry}/>
                <Token/>
                <Foot/>
            </div>
        )
    }
}
export default RiZhi;