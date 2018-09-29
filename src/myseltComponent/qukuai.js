import {Head,Foot} from "./Head_Foot";
import React,{Component} from 'react';
import './bodycontent.css';
import {BodyTitle} from './home';
import './qukuai.css';
import config from '../config';
class QuKuaiListTable extends Component{
    render(){
        let itemlist=this.props.QuKuaiList.map(item=>(<tr key={item.qukuainumber}><td>{item.qukuainumber}</td><td>{item.qukuaiower}</td><td>{item.gasused}</td><td>{item.trancenumber}</td></tr>))
        return(
            <div className="container qukuai">
                <table>
                    <thead>
                        <tr><th>区块号</th><th>矿主</th><th>已用GAS</th><th>交易数</th></tr>
                    </thead>
                    <tbody>
                        {itemlist}
                    </tbody>
                </table>
            </div>
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
    render(){
        return(
            <div>
                <Head/>
                <BodyTitle titlearry={config.BodyTitle_arry}/>
                <HuijinBuy/>
                <HuijinSell/>
                <HuijinTransction/>
                <Foot/>
            </div>
        )
    }
}
export default QuKuai;