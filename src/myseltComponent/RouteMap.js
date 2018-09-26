import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import React,{Component} from 'react';
// 引入配置文件
import Config from "../config";
const Loading = () => <div>Loading...</div>;
const home=Loadable({
        loader:()=> import("./home"),
        loading:Loading});
const qukuai=Loadable({
        loader:()=> import('./qukuai'),
        loading:Loading});   
const jiaoyi=Loadable({
        loader:()=> import('./jiaoyi'),
        loading:Loading});   
const rizhi=Loadable({
        loader:()=> import('./rizhi'),
        loading:Loading}); 
const token=Loadable({
        loader:()=> import('./token'),
        loading:Loading}); 
const shezhi=Loadable({
        loader:()=> import('./shezhi'),
        loading:Loading}); 
class RouteMap extends Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route exact path={Config.routerconfig.pathconfig.home.path} component={home}/>
                    <Route  path={Config.routerconfig.pathconfig.qukuai.path} component={qukuai}/>
                    <Route  path={Config.routerconfig.pathconfig.jiaoyi.path} component={jiaoyi}/>
                    <Route  path={Config.routerconfig.pathconfig.rizhi.path} component={rizhi}/>
                    <Route  path={Config.routerconfig.pathconfig.token.path} component={token}/>
                    <Route  path={Config.routerconfig.pathconfig.shezhi.path} component={shezhi}/>
                </Switch>
            </Router>
        )
    }
}
export default RouteMap;

