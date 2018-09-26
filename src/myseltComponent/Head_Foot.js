import React,{Component} from 'react';
import './Head_Foot.css';
import {Link} from 'react-router-dom';
import logo from '../img/logo.png';
import set from '../img/set.png';
import Config from '../config';
import "./Head_Foot.css";
import {Itemlist} from "./publicConponent";
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
                    <input type="text" id="search" placeholder="输入要查找的区块数或者哈希值" onChange={(e)=>{
                        this.showvalue(e)
                    }}></input>
                    <Link to={Config.routerconfig.pathconfig.shezhi.url}><img src={set} alt=""></img></Link>
                    </div>
                </div>
            </div>
        );
    }
}
class Foot extends  Component{
    render(){
        return(
            <div>
                
            </div>
        );
    }
}
export {Head,Foot} 