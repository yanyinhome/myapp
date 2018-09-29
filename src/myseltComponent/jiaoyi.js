import {Head,Foot} from "./Head_Foot";
import React,{Component} from 'react';
import './bodycontent.css';
import {BodyTitle,Welcome} from './home';
import config from '../config';
import './jiaoyi.css';
import app from './app1';
// HEAD组件
class HeadTitle extends Component{
    render(){
        return(
            <h1>{this.props.title}</h1>
        )
    }
}
// 账户列表组件
class Accountlist extends Component{
    render(){
        let itemlist=this.props.accounts.map((item,index)=>(
           <tr key={item.id}><td>{`账户${index}`}</td><td>{item.accountaddress}</td><td>{item.accountnumber}</td></tr> 
        ))
        return(
            <div>
                <HeadTitle title="账户列表"/>
                <table>
                    <tbody>
                        {itemlist}
                    </tbody>
                </table>
            </div>
        )
    }
}
// 交易的组件
class Transaction extends Component{
    render(){
        return(
            <div>
                <HeadTitle title="交易"/>
                <form className="jiaoyi" action="">
                <label htmlFor="">from</label><input id="addressfrom" type="text"/>
                <label htmlFor="">to</label><input id="addressto" type="text"/>
                <label htmlFor="">数量</label><input id="transferAmount" type="text"/>
                <button id="transferButton" onClick={this.props.transfer}>确定</button>          
                <button id="quxiaoButton" onClick={this.props.cancel}>清空</button>          
                </form> 
            </div>
        )
    }
}
// 查询组件
class Search extends Component{
    render(){
        return(
            <div>
               <HeadTitle title="查询"/>
               <form className="chaxun" >
               <label htmlFor="">请输入账户地址</label><input id="addressChaxun" type="text"/>         
                <button id="chaxunButton" onClick={this.props.Searchclick}>查询余额</button ><span id="searchResult" className="info" style={{color: "red"}}></span> <br/>
                </form>
                <span id="showmessage"></span> 
            </div>
        )
    }
}
// 交易确认界面
class TransactionRecord extends Component{
    render(){
        return(
            <div>
                <HeadTitle title="交易记录"/>
                <div id="queren">
                <p className="queren">
                </p>
            </div>
            </div>
        )
    }
}
// 合并的交易组件
class JiaoYiContent extends Component{
    constructor(props){
        super(props);
        this.state={config:config};
    }
    // 交易函数
    transfer=(e)=>{ 
        e.preventDefault();
        let fromaddress=document.getElementById('addressfrom').value;
        let toaddress=document.getElementById("addressto").value;
        let val=document.getElementById("transferAmount").value;
        app.transfer(fromaddress,toaddress,val,"queren")
        
    }
    //取消函数
    cancel=(e)=>{
        e.preventDefault();
        document.getElementById('addressfrom').value="";
        document.getElementById("addressto").value="";
        document.getElementById("transferAmount").value="";
    }
    //查询函数
    Searchclick=(e)=>{
        e.preventDefault();
        let addressChaxun=document.getElementById("addressChaxun");
        let searchResult=document.getElementById('searchResult');
        let address=addressChaxun.value;
        if(!address){ alert("地址不能为空")}
            else{
                app.getBalance(address,function(err,result){
                    if(err){console.log(err)}
                        else{searchResult.innerHTML=app.web3.fromWei(result,'ether')
                            }
                })
        }               
    }    
    render(){
        return(
            <div className="container translantion" id="accountlist">
                <Welcome/>
                <Accountlist accounts={this.state.config.accounts}/>
                <Transaction transfer={this.transfer} cancel={this.cancel}/>
                <Search Searchclick={this.Searchclick}/>
                <TransactionRecord/>
            </div>
        )
    }
}
// 币币交易函数
// 汇金买以太
class Hjbeth extends Component{
    render(){
        return(
            <div>汇金币换以太币</div>
        )
    }
}
// 以太买汇金
class Ethhjb extends Component{
    render(){
        return(
            <div>以太换汇金</div>
        )
    }
}
// 输出的交易页面
class JiaoYi extends  Component{
    render(){
        return(
            <div>
                <Head/>
                <BodyTitle titlearry={config.BodyTitle_arry}/>
                {/* <JiaoYiContent/> */}
                <Ethhjb/>
                <Hjbeth/>
                <Foot/>
            </div>
        )
    }
}
export default JiaoYi;