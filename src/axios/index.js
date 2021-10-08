
import { Modal } from "antd";
import axios from "axios";


export default class Axios{
    static ajax(options){
        let loading;
        if(options.data && options.data.isShowLoading !==false){
            loading =document.getElementById("ajaxLoading");
            loading.style.display='block';
        }

        // let baseApi='https://mock.mengxuegu.com/mock/614ed7210223fb2e6d2822e3/ofoapi'
           let baseApi='https://mock.mengxuegu.com/mock/614ed7210223fb2e6d2822e3/ofoapi'

        return new Promise((resolve,reject)=>{
            axios({
                url:options.url,
                method:'get',
                baseURL:baseApi,
                timeOut:5000,
                params:(options.data && options.data.params) || '',

            }).then((response)=>{
                if(options.data && options.data.isShowLoading !==false){
                    loading =document.getElementById("ajaxLoading");
                    loading.style.display='none';
                }
                if(response.status == '200'){
                    let res=response.data;
                    if(res.code == '0'){
                        console.log("res",res);
                        resolve(res);
                    }else{
                        Modal.info({
                            title:"提示",
                            content:res.msg
                        })
                    }
                }else{
                    reject(response.data);
                }
            })
        })
    }
}
