import JsonP from 'jsonp';
import axios from 'axios';
import {Modal} from 'antd';
import Utils from '../utils/utils';

export default class Axios {

    static requestList(_this,url,params,isMock){
        var data = {
            params:params
        }
        this.ajax({
            url,
            data,
            isMock
        }).then((data)=>{
            if (data && data.result) {
                let list = data.result.item_list.map((item,index)=>{
                    item.key = index;
                    return item;
                });
                _this.setState({
                    list,
                    pagination: Utils.pagination(data,(current)=>{
                      _this.params.page = current;
                      _this.requestList();  
                    })
                })
            }
        });
    }

    static jsonp(options){
        return new Promise((resolve,reject)=>{
            JsonP(options.url,{
                param:'callback'
            },function(err,response){
                if(response.status === 'success'){
                    resolve(response);
                }else{
                    reject(err);
                }
            })
        })
    }

    static ajax(options){
        let loading;
        if(options.data && options.data.loading !== false){
            loading = document.querySelector('#ajaxLoading');
            loading.style.display = 'block';
        }
        let baseUrl = '';
        if(options.isMock){
            //mock地址
            baseUrl = 'https://www.easy-mock.com/mock/5c8246d326a5083c0637fcf1/mockapi';
        }else{
            //后台api接口地址
            baseUrl = 'https://www.easy-mock.com/mock/5c8246d326a5083c0637fcf1/mockapi';
        }
        return new Promise((resolve,reject)=>{
            axios({
                 url:options.url,
                 method:'get',
                 baseURL:baseUrl,
                 timeout:5000,
                 params: (options.data && options.data.params) || '',
            }).then((response)=>{
                if(options.data && options.data.isShowLoading !== false){
                    loading = document.querySelector('#ajaxLoading');
                    loading.style.display = 'none';
                }
                if(response.status === 200){
                    let res = response.data;
                    if(res.code === 0){
                        resolve(res);
                    }else{
                        Modal.info({
                            title:'提示',
                            content:res.msg
                        })
                    }
                }else{
                    reject(response);
                }
            });
        });
    }
}