import React,{Component} from 'react';
import './bodycontent.css';
import{Head,Foot} from "./Head_Foot";
import{Button,Tag,Form,Input,Select,Switch} from "element-react";
import "element-theme-default";
// load导出组件
class Load extends Component {
    render(){
        return(
            <div>
                <Head/>
                this is load导出组件
                <Foot/>
            </div>
        )
    }
}
export default Load;