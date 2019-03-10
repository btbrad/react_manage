import React from 'react';
import {Select} from 'antd';
const Option = Select.Option;

export default {
    formatDate(time){
        if(!time) return '';
        let date = new Date(time);
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDate();
        let hour = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let dateString = `${year}年${month}月${day}日   ${hour>=10?hour:'0'+hour}:${minutes>=10?minutes:'0'+minutes}:${seconds>=10?seconds:'0'+seconds}`;
        return dateString;
    },
    pagination(data,callback){
        return{
            onChange:(current)=>{
                callback(current)
            },
            current:data.result.page,
            pageSize:data.result.page_size,
            total:data.result.total_count,
            showTotal:()=>{
                return `共${data.result.total_count}条`
            },
            showQuickJumper:true
        }
    },
    getOptionList(data){
        if(!data){
            return [];
        }
        let options = [];
        data.forEach((item)=>{
            options.push(<Option value={item.id} key={item.id}>{item.name}</Option>);
        });
        return options;
    }
}