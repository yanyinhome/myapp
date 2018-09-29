import React,{Component} from 'react';
import './Head_Foot.css';
import {Link} from 'react-router-dom';
import logo from '../img/logo.png';
import set from '../img/set.png';
import Config from '../config';
import{Input,Select,Button} from "element-react";
import "element-theme-default";
import {Itemlist} from "./publicConponent";
// 搜索框
class SearchInput extends Component{
    render() {
        return (
          <div className="left">
            <Input placeholder="请输入内容" size="small" prepend={
              <Select value="">
                {
                  ['区块号', '账户地址', '交易hax'].map((item, index) => <Select.Option key={index} label={item} value={index} />)
                }
              </Select>
            } append={<Button type="primary" icon="search">搜索</Button>} />
          </div>
        )
      }      
}

// 头部输出
class Head extends  Component{
    constructor(props){
        super(props);
        this.state={
            imgarry:Config.imgarry,
        }
    }
    showvalue(e){console.log(e.target.value)}
    render(){
        return(
            <div className="top">
                <div className="title"><img src={logo} alt=""></img></div>
                <div className='container'>
                    <div className='left'>
                        <Itemlist imgarry={this.state.imgarry}/>
                    </div>
                    <div className='right'>
                    <SearchInput/>
                    <Link to={Config.routerconfig.pathconfig.shezhi.url}><img src={set} alt=""></img></Link>
                    </div>
                </div>
            </div>
        );
    }
}
// 底部输出
class Foot extends  Component{
    render(){
        return(
            <div>
                
            </div>
        );
    }
}
export {Head,Foot} 