import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import{Button,Icon,Tag,Table} from "element-react";
// 头部的菜单列表组件
    // 单个列表组件
class Item extends Component{
    render(){
        return(
            <li><img src={this.props.img} alt=""></img><Link to={this.props.link}>{this.props.title}</Link></li>
        )
    }
}
    // 整个列表组件
class Itemlist extends Component{
    render(){
        let itemlist=this.props.imgarry.map((item)=><Item title={item.value} key={item.id} img={item.img} link={item.link}/>);
        return(
                <ul>{itemlist}</ul>            
        )
    }
}
// 列表组件
class TableList extends Component{
    constructor(props) {
        super(props);
      
        this.state = {
          columns: [
            {
              type: 'index'
            },
            {
              label: "日期",
              prop: "date",
              width: 150,
              render: function(data){
                return (
                <span>
                  <Icon name="time"/>
                  <span style={{marginLeft: '10px'}}>{data.date}</span>
                </span>)
              }
            },
            {
              label: "姓名",
              prop: "name",
              width: 160,
              render: function(data){
                return <Tag>{data.name}</Tag>
              }
            },
            {
              label: "操作",
              prop: "address",
              render: function(){
                return (
                  <span>
                   <Button plain={true} type="info" size="small">编辑</Button>
                   <Button type="danger" size="small">删除</Button>
                  </span>
                )
              }
            }
          ],
          data: [{
            date: '2016-05-02',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
           }, {
            date: '2016-05-02',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
           }, {
            date: '2016-05-02',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
           }, {
            date: '2016-05-02',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
           }, {
            date: '2016-05-02',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
           }, {
            date: '2016-05-02',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
           }, {
            date: '2016-05-02',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
           }]
        }
      }
      
      render() {
        return (
          <Table
            style={{width: '100%'}}
            columns={this.state.columns}
            data={this.state.data}
            border={true}
            height={250}
            highlightCurrentRow={true}
            onCurrentChange={item=>{console.log(item)}}
          />
        )
      }
      
}
export {Itemlist,TableList};