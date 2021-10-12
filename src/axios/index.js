
import { Modal } from "antd";
import axios from "axios";
import Utils from "../utils/utils";


export default class Axios {

    static requestList(_this, url, params, isMock) {
        var data = {
            params: params,
            isMock//是否是接口
        }
        this.ajax({
            url,
            data
        }).then((data) => {
            if (data && data.result) {
                let list = data.result.item_list.map((item, index) => {
                    item.key = index;
                    return item;
                })
                _this.setState({
                    list,
                    //current--页码换页的时候，可以回调到下一次
                    pagination: Utils.pagination(data, (current) => {
                        _this.params.page = current;
                        _this.requestList();
                    })
                })
            }
        })
    }

    static ajax(options) {
        let loading;
        if (options.data && options.data.isShowLoading !== false) {
            loading = document.getElementById("ajaxLoading");
            loading.style.display = 'block';
        }
        //切换接口地址
        let baseApi = '';
        if (options.isMock) {
            baseApi = 'https://mock.mengxuegu.com/mock/614ed7210223fb2e6d2822e3/ofoapi'
        } else {
            baseApi = 'https://mock.mengxuegu.com/mock/614ed7210223fb2e6d2822e3/ofoapi'
        }

        return new Promise((resolve, reject) => {
            axios({
                url: options.url,
                method: 'get',
                baseURL: baseApi,
                timeOut: 5000,
                params: (options.data && options.data.params) || '',

            }).then((response) => {
                if (options.data && options.data.isShowLoading !== false) {
                    loading = document.getElementById("ajaxLoading");
                    loading.style.display = 'none';
                }
                if (response.status == '200') {
                    let res = response.data;
                    if (res.code == '0') {
                        // console.log("res",res);
                        resolve(res);
                    } else {
                        Modal.info({
                            title: "提示",
                            content: res.msg
                        })
                    }
                } else {
                    reject(response.data);
                }
            })
        })
    }
}
