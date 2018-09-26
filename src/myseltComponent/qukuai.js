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
class QuKuai extends  Component{
    render(){
        return(
            <div>
                <Head/>
                <BodyTitle titlearry={config.BodyTitle_arry}/>
                <QuKuaiListTable QuKuaiList={config.qukuailist}/>
                <Foot/>
            </div>
        )
    }
}
export default QuKuai;